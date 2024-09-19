import dotenv from 'dotenv'
dotenv.config()
import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import { pathToFileURL, fileURLToPath } from 'url'

import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'

// Определяем __dirname для ES-модулей
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 80
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
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>
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

      const { html: appHtml, initialState } = await render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

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
