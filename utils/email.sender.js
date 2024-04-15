// "use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASS,
    },
})


const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail({
            from: mailOptions?.from, // sender address
            to: mailOptions?.to, // list of receivers
            subject: mailOptions?.subject, // Subject line
            text: mailOptions?.text, // plain text body
            html: mailOptions?.html, // html body
        });
        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = sendEmail;