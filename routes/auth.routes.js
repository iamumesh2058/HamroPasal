const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
} = require("../controllers/auth.controller");

const {
    validateRegisterInputs,
    validateLoginInputs,
    validateForgotPasswordInputs,
    validateResetPasswordInputs
} = require("../middlewares/validation.middleware");


router.post("/register", validateRegisterInputs, register);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/forgotPassword", validateForgotPasswordInputs, forgotPassword);
router.post("/resetPassword/:token", validateResetPasswordInputs, resetPassword);

router.post("/login", validateLoginInputs, login);
router.get("/logout", logout);


module.exports = router;