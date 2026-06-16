const { body, validationResult } = require("express-validator")


// HANDLE VALIDATION ERRORS
function handleValidationErrors(req,res,next){

    const errors = validationResult(req)


    if(!errors.isEmpty()){

        return res.status(400).json({

            message:"Validation failed",

            errors:errors.array()

        })

    }


    next()

}



// REGISTER VALIDATION
const registerValidator = [

    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isLength({min:3})
        .withMessage("Username must be minimum 3 characters"),


    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),


    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({min:6})
        .withMessage("Password must be minimum 6 characters"),


    body("role")
        .optional()
        .isIn(["user","artist"])
        .withMessage("Role must be user or artist"),


    handleValidationErrors

]




// LOGIN VALIDATION
const loginValidator = [

    body("password")
        .notEmpty()
        .withMessage("Password is required"),


    body().custom((value)=>{

        if(!value.email && !value.username){

            throw new Error(
                "Email or username is required"
            )

        }

        return true

    }),


    handleValidationErrors

]




// MUSIC UPLOAD VALIDATION
const musicValidator = [

    body("title")
        .notEmpty()
        .withMessage("Music title is required")
        .isLength({min:2})
        .withMessage("Title too short"),


    handleValidationErrors

]




// ALBUM VALIDATION
const albumValidator = [

    body("title")
        .notEmpty()
        .withMessage("Album title required"),


    body("musicIds")
        .isArray({min:1})
        .withMessage("Album needs at least one song"),


    handleValidationErrors

]



module.exports = {

    registerValidator,

    loginValidator,

    musicValidator,

    albumValidator

}