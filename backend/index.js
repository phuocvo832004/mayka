const express = require('express');  // Import Express
const cors = require('cors');  // Import CORS để cho phép giao tiếp giữa frontend và backend
const cloudinary = require('cloudinary').v2;  // Import Cloudinary SDK
const multer = require('multer');  // Import Multer để upload file
const { CloudinaryStorage } = require('multer-storage-cloudinary');  // Import bộ lưu trữ của Cloudinary
require('dotenv').config();  // Import dotenv để đọc biến môi trường từ file .env

const app = express();  // Khởi tạo Express app
const PORT = process.env.PORT || 5000;  // Đặt port mặc định

app.use(cors());  // Kích hoạt CORS để cho phép giao tiếp giữa frontend và backend
app.use(express.json());  // Cho phép Express xử lý JSON payloads

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cấu hình lưu trữ Multer sử dụng Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gallery',  // Thư mục trên Cloudinary để lưu ảnh
  },
});

const upload = multer({ storage: storage });  // Cấu hình Multer với CloudinaryStorage

const Image = require('./models/Image');  // Import model

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image({ url: req.file.path });
    await newImage.save();  // Lưu URL vào MongoDB

    res.json({ url: req.file.path });  // Trả về URL cho frontend
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading image');
  }
});


// Route kiểm tra
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/images', async (req, res) => {
  try {
    const images = await Image.find();  // Lấy tất cả ảnh từ MongoDB
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching images');
  }
});


// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));


  