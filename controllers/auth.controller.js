const User = require("../models/user.model");
const Token = require("../models/token.model");
const crypto = require("crypto");
const sendEmail = require("../utils/email.sender.utils");
const { createJWT } = require("../utils/token.utils");

const {
    hashPassword,
    comparePassword
} = require("../utils/password.utils");

const {
    NotFoundError,
    UnauthenticatedError,
    BadRequestError
} = require("../errors/custom.error");




// REGISTER
exports.register = async (req, res) => {
    // check if user is first user
    const isFirstAccount = await User.countDocuments() === 0;
    if (isFirstAccount) {
        req.body.role = 'admin';
        req.body.isVerified = true;
    }

    // Hashing password 
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    if (isFirstAccount) {
        res.status(200).json({ msg: "User registered successfully" });
    } else {
        // generate token
        const token = await Token.create({
            token: crypto.randomBytes(16).toString('hex'),
            user: user._id
        });

        // send email
        const url = `${process.env.FRONTEND_URL}/verify-email/${token.token}`
        sendEmail({
            from: "noreply@something.come",
            to: req.body.email,
            subject: "Email verification",
            text: `Please click on the given link to verify your account ${url}`,
            html: `<a href='${url}'><button>Click to verify</button></a>`
        });
        res.status(200).json({ msg: `Email verification link has been sent to ${user.email}` });
    }
}


// VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
    // check for token
    const token = await Token.findOne({ token: req.params.token });
    if (!token) throw new BadRequestError("Invalid token or token may have expired");

    // find user
    const user = await User.findById(token.user);
    if (!token) throw new NotFoundError("User not found");

    // check if user is already verified
    if (user.isVerified) throw new BadRequestError("User already verified proceed to login");

    // change to verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({ msg: "User verified successfully" });
}


// RESEND VERIFICATION
exports.resendVerification = async (req, res) => {
    // check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new NotFoundError("Email not registered");

    // check if already verified
    if (user.isVerified) throw new BadRequestError("User already verified. Proceed to login.");

    // genereate token if not verified
    const token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString("hex")
    });

    // send email
    const url = `${process.env.FRONTEND_URL}/verify-email/${token.token}`
    sendEmail({
        from: "noreply@something.come",
        to: req.body.email,
        subject: "Email verification",
        text: `Please click on the given link to verify your account ${url}`,
        html: `<a href='${url}'><button>Click to verify</button></a>`
    });
    res.status(200).json({ msg: `Email verification link has been sent to ${user.email}` });
}


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
    // check user
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new NotFoundError("Email not registered");

    // generate token
    const token = await Token.create({
        token: crypto.randomBytes(16).toString('hex'),
        user: user._id
    });

    // send email
    const url = `${process.env.FRONTEND_URL}/reset-password/${token.token}`;
    sendEmail({
        from: "noreply@something.come",
        to: user.email,
        subject: "Reset Password",
        text: `Please click on the given link to reset your password ${url}`,
        html: `<a href='${url}'><button>Reset Password</button></a>`
    });
    res.status(200).json({ msg: `Password reset link has been sent to ${user.email}` });
}


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    // check token
    const token = await Token.findOne({ token: req.params.token });
    if (!token) throw new BadRequestError("Invalid token or token may have expired");

    // find user
    const user = await User.findById(token.user);
    if (!user) throw new NotFoundError("User not registere");

    // reset password
    const hashedPassword = await hashPassword(req.body.password);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
}


// LOGIN
exports.login = async (req, res) => {
    // Checking for valid user
    const user = await User.findOne({ email: req.body.email });

    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError("Invalid Credentials");

    // creating token
    const token = createJWT({ userId: user._id, role: user.role });
    const oneDay = 1000 * 60 * 60 * 24;

    // generating cookie
    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({ msg: "User logged in", user: user });
}


// LOGOUT
exports.logout = async (req, res) => {
    res.cookie("token", "logout", {
        httpOnle: true,
        expires: new Date(Date.now())
    });
    res.status(200).json({ msg: "User logged out!!!" });
}