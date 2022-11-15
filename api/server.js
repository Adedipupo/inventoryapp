import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoute.js';
import userRoutes from './routes/userRoute.js';
import errorHandler from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config()

const app = express()

app.use(express.json())
app.use(urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
  origin: '*',
  credentials: true,
}));
if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 1234

app.get('/',(req, res)=>{
  res.send("api is live...")
});
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use(errorHandler)




mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {app.listen(PORT, () => {
    console.log(`Connected to mongodb successfully,Server running on port ${PORT}`)
  })})
  .catch((err) => console.log(err))


