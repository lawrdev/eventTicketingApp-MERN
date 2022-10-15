// to use env 
require('dotenv').config();

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;

// config the cloudinary object
const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = { cloudinary, cloudinaryConfig };