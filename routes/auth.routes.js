const express = require("express");
const router = express.Router();

const {
    register,
    verifyEmail,
    forgetPassword,
    resetPassword,
    resendVerification,
    login,
    logout
} = require("../controllers/auth.controller");

const { validateRegisterInput, validateResetPassword, validateLoginInput, validateForgotPassword } = require("../middlewares/validation.middleware");

router.post("/register", validateRegisterInput, register);
router.get("/verifyemail/:token", verifyEmail);
router.post("/resendverification", resendVerification);
router.post("/forgetpassword", validateForgotPassword, forgetPassword);
router.post("/resetpassword/:token", validateResetPassword,resetPassword);

router.post("/login", validateLoginInput, login);
router.get("/logout", logout);


module.exports = router;