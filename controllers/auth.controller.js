const User = require("../models/user.model");
const Token = require("../models/token.model");

const { hashedPassword, comparePassword } = require("../utils/password.utils");
const { createJWT } = require("../utils/token.utils");
const crypto = require("crypto");
const sendEmail = require("../utils/email.sender");
const { BadRequestError, NotFoundError, UnauthenticatedError } = require("../errors/custom.error");


// REGISTER
exports.register = async (req, res) => {
    const isFirstAccount = await User.countDocuments() === 0;
    req.body.role = isFirstAccount ? 'admin' : 'customer';
    req.body.isVerified = isFirstAccount ? true : false;

    const hashedPasswords = await hashedPassword(req.body.password);
    req.body.password = hashedPasswords;

    const user = await User.create(req.body);

    if (isFirstAccount) {
        res.status(201).json({ msg: "User created" });
    }
    
    else {
        let token = await Token.create({
            token: crypto.randomBytes(16).toString('hex'),
            user: user._id
        });

        const url = `${process.env.FRONTEND_URL}/email-verification/${token.token}`;
        sendEmail({
            from: "noreply@something.com",
            to: req.body.email,
            subject: "Email Verification",
            text: "Please click on the given link to verify your account" + url,
            html: `<a href='${url}'><button>Click to Verify</button></a>`
        });
        res.status(200).json({ msg: `Email verfication link has been sent to ${user.email}` });
    }
}


// TO VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
    let token = await Token.findOne({ token: req.params.token });
    if (!token) throw new BadRequestError("Invalid token or token may have expired");

    let user = await User.findById(token.user);
    if (!user) throw new NotFoundError("User not found");

    if (user.isVerified) throw new BadRequestError("User already verified. Proceed to login");

    user.isVerified = true;
    user = await user.save();

    res.status(200).json({ msg: "User verified successfully" });
}


// RESEND VERIFICATION
exports.resendVerification = async (req, res) => {
    //check if email exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new NotFoundError("Email not registered");

    // check if already verified
    if (user.isVerified) throw new BadRequestError("User already verified. Proceed to login");

    // generate token if not verified
    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString('hex')
    });

    // send token in email
    const url = `${process.env.FRONTEND_URL}/email-verification/${token.token}`;
    sendEmail({
        from: "noreply@something.com",
        to: req.body.email,
        subject: "verification email",
        text: "Please click on the given link to verify your account" + url,
        html: `<a href='${url}'><button>Click to Verify</button></a>`
    });
    res.status(200).json({ msg: "Verfication link has been sent to your email" });
}


// FORGET PASSWORD
exports.forgetPassword = async (req, res) => {
    // check if email exists or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new NotFoundError("Email not registered");

    let token = await Token.create({
        user: user._id,
        token: crypto.randomBytes(16).toString('hex')
    });

    // send password reset link to registered email
    const url = `${process.env.FRONTEND_URL}/reset-password/${token.token}`
    sendEmail({
        from: "noreply@something.com",
        to: req.body.email,
        subject: "Password Reset Link",
        text: "Please click on the given link to reset your password" + url,
        html: `<a href='${url}'><button>Click to Reset</button></a>`
    });
    res.status(200).json({ msg: `Password reset link has been sent to ${user.email}` });
}


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
    // check if token is valid or not
    let token = await Token.findOne({ token: req.params.token });
    if (!token) throw new BadRequestError("Invalid token or token may have expired");

    // find user
    let user = await User.findById(token.user);
    if (!user) throw new NotFoundError("User not found");


    // reset password
    const hashedPasswords = await hashedPassword(req.body.password);
    user.password = hashedPasswords;
    user = await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
}


// Login
exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    const isValidUser = user && (await comparePassword(req.body.password, user.password));
    if (!isValidUser) throw new UnauthenticatedError("Invalid credenttials");

    const token = createJWT({ userId: user._id, role: user.role });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production'
    });

    res.status(200).json({ msg : "User logged in", user: user});
}

// LOGOUT
exports.logout = (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: "User logged out!"});
}