const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, getUserProfile } = require("../controllers/user.controller");
const { authUser } = require("../middlewares/auth.middleware");

//user registration route
router.post('/register',[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('first name must be at least 3 charecter long'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 charecter long')
],
    registerUser
)

//user login route
router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({min: 6}).withMessage('password must be at least 6 charecter long')
], loginUser)

//profile route
router.get('/profile',authUser,getUserProfile)

//logout route
router.get('/logout',authUser,logoutUser)


module.exports = router;