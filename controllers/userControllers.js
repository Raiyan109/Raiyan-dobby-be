const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body

    // Hashing
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    try {

        const user = await User.create({ name, email, password: hashedPassword, parts: [] })

        // const token = createToken(user._id)

        res.status(200).json({ user })

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password);

    try {
        // let existingUser;
        let existingUser = await User.findOne({ email })
        console.log(existingUser);
        // console.log(existingUser._id.toString(), 'from loginUser 37');
        if (!existingUser) {
            return res.status(404).json({ msg: 'Could not found user by this email' })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ msg: 'Incorrect Password' })
        }

        const token = jwt.sign({
            userId: existingUser._id.toString()
        }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).json({
            access_token: token,
            message: "Login success",
            user: existingUser
        })

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error', msg: error.message });
    }
}

module.exports = { signupUser, loginUser }