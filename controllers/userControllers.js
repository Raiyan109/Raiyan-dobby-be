const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

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

module.exports = { signupUser }