const express = require("express");
const nodemailer = require("nodemailer");
const isEmail = require("validator/lib/isEmail");

const router = express.Router();

async function sendEmails(recepients, joke) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let info = await transporter.sendMail({
        from: '"Chuck Norris 🧔 Delivery Apparatus" <delivery@chuck.norris>',
        to: recepients,
        subject: "Your daily dose of Chuck Norris",
        text: joke
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}



router.post("/", function(req, res) {
    const validEmails = [];
    const invalidEmails = [];
    let message = "";

    if (!req.body.emails || req.body.emails.length === 0) {
        res.status(400).send({
            message: "You have not supplied any e-mail addresses."
        });
    } else if (!Array.isArray(req.body.emails)) {
        res.status(500).send({
            message: "You've provided an invalid array of e-mail addresses. Please check the array and try again."
        });
    } else {


        for (let email of req.body.emails) {
            if (isEmail(email)) {
                console.log(`${email} is a valid e-mail.`)
                validEmails.push(email);
            } else {
                console.log(`${email} is an invalid e-mail.`)
                invalidEmails.push(email);
            }
        }

        sendEmails(validEmails, req.body.joke).catch(console.error);

        if (invalidEmails.length === 0) {
            message = "All e-mails have been sent successfully."
        } else {
            message = "Some e-mails could not be sent."
        }

        res.send({message, invalidEmails});
    }
});

module.exports = router;