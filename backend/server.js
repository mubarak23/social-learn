import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import Multer from 'multer';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleaware.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();


const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

app.post("/api/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('API is running....');
  });
  

app.use(notFound);
app.use(errorHandler);  

app.listen(port, () => console.log(`Server Running Port ${port}`))  