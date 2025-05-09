import { v2 as Cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default Cloudinary


