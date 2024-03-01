const Image = require('../models/imageModel.js')
const User = require('../models/userModel.js')

const createImage = async (req, res) => {
    try {
        const { name, user } = req.body;
        console.log(req.file);
        const { buffer, mimetype, size, path, filename } = req.file;


        let existingUser;
        try {
            existingUser = await User.findById(user)
        } catch (error) {
            return res.status(400).json({ msg: error.message })
        }

        if (!existingUser) {
            return res.status(400).json({ msg: 'Unable to find user by this id' })
        }
        console.log(req.userId, 'from image controller 69');
        const image = await Image.create({
            name,
            photo: filename,
            user: req.userId
        });

        await User.findByIdAndUpdate(req.userId, {
            $push: { images: image._id },
        });

        return res.status(200).json({ image })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getImages = async (req, res) => {
    try {
        const images = await Image.find()

        if (!images) {
            return res.status(404).json('No such images')
        }
        res.status(200).json({
            success: true,
            data: images
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSingleImage = async (req, res) => {
    try {
        const image = await Image.findOne({ name: "image 1" }).populate('user')

        res.status(200).json({
            success: true,
            data: image
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getUser = async (req, res) => {
    console.log(req.userId, 'from getSingleUser 61');
    try {
        const singleUser = await User.findById(req.userId)
            .populate('images')

        if (!singleUser) {
            return res.status(500).json({ error: 'No user found by this id', msg: error.message });
        }
        res.status(200).json({
            success: true,
            data: singleUser
        })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
}

module.exports = { createImage, getImages, getSingleImage, getUser }