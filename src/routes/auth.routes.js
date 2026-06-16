    const express = require("express")
    const authController = require("../controllers/auth.controller")
    const validator = require("../middlewares/validator.middleware")
    const router= express.Router();

    router.post('/register',validator.registerValidator,authController.registerUser)

    router.post('/login',validator.loginValidator,authController.loginUser)
    router.get("/logout",authController.logoutUser);

    module.exports = router;