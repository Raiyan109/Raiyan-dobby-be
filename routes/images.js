const express = require('express');
const { requireSignIn } = require('../middleware/authMiddleware');
const { createImage, getImages, getSingleImage, getUser } = require('../controllers/imageController');

const router = express.Router()

// Multer configuration
const multer = require('multer');
const DIR = './uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage
})

// Create a new image
router.post('/create', requireSignIn, upload.single('photo'), createImage)

router.get('/', getImages)
router.get('/single', getSingleImage)
router.get('/singleUser', requireSignIn, getUser)

module.exports = router