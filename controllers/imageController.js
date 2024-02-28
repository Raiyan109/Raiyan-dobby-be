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

        console.log(image);

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

module.exports = { createImage, getImages }