const express = require('express');

const router = express.Router()

const { signupUser } = require("../controllers/userControllers");

// signup user
router.post('/signup', signupUser)

module.exports = router