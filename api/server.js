import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import productRoutes from './routes/productRoute.js'
import userRoutes from './routes/userRoute.js'
import contactRoutes from './routes/contactRoute.js'
import errorHandler from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import * as url from 'url'

dotenv.config()

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'https://inventoryapp-jf7i.vercel.app',
      'http://localhost:3000',
      'https://invent-jb0qpaptr-adedipupo.vercel.app',
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  }),
)

const __dirname = dirname(fileURLToPath(import.meta.url))
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  },
)

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', { stream: accessLogStream }))
} else {
  app.use(morgan('dev'))
}

// const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const PORT = process.env.PORT || 1234

app.get('/', (req, res) => {
  res.send('api is live...')
})
app.get('/health', (req, res) => {
  res.send('api is live and fine oooo...')
})
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/contact', contactRoutes)
app.use(errorHandler)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connected to mongodb successfully,Server running on port ${PORT}`,
      )
    })
  })
  .catch((err) => console.log(err))

export default app;