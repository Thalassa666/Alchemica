import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { checkAuthMiddleware } from './middlewares'
import { dbConnect } from './models'
import { router } from './router'

const port = Number(process.env.SERVER_PORT) || 3001
const app = express()

dotenv.config()
dbConnect()

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())
app.use(checkAuthMiddleware)

app.use(
  '/api/v2',
  createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': '',
    },
    target: 'https://ya-praktikum.tech',
  })
)

app.use('/', router)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
