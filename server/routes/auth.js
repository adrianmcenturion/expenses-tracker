const express = require("express");

const authController = require("../constrollers/auth");
const { authorizeAdmin, userLoggedIn } = require('../middlewares/authorization');

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

// router.delete('/users/delete/', authorizeAdmin, authController.deleteUserById)

router.get('/info', userLoggedIn, authController.getUserInfo)


router.get('/users', authorizeAdmin, authController.getUsers)

module.exports = router;