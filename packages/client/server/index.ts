import fs from 'fs/promises'
import path from 'path'
import { pathToFileURL, fileURLToPath } from 'url'
import serialize from 'serialize-javascript'
import { HelmetData } from 'react-helmet'
import dotenv from 'dotenv'
import express, { Request as ExpressRequest } from 'express'
import { createServer as createViteServer, ViteDevServer } from 'vite'

dotenv.config()
// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 3000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  let vite: ViteDevServer | undefined

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), {
        index: false,
        setHeaders: (res, path) => {
          if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript')
          }
        },
      })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown; helmet: HelmetData }>
      let template: string

      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        template = await vite.transformIndexHtml(url, template)

        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Преобразуем путь к серверному модулю в URL-формат
        const pathToServer = pathToFileURL(
          path.join(clientPath, 'dist/server/entry-server.js')
        ).href

        render = (await import(pathToServer)).render
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState, helmet } = await render(req)

      const html = template
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`
        )
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
