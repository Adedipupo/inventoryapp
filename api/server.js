import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import homeRoutes from './routes/index.js'
import userRoutes from './routes/userRoute.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

const PORT = process.env.PORT || 1234

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {app.listen(PORT, () => {
    console.log(`Connected to mongodb successfully,Server running on port ${PORT}`)
  })})
  .catch((err) => console.log(err))

app.get('/',(req, res)=>{
    res.send("api is live...")
});
app.use('/api/users',userRoutes);


