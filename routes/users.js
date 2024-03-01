const express = require('express');

const router = express.Router()

const { signupUser, loginUser, getUser } = require("../controllers/userControllers");
const { requireSignIn } = require('../middleware/authMiddleware');

// signup user
router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/single', requireSignIn, getUser)

module.exports = router