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
        from: '"Chuck Norris 🧔" <chuck.norris@chuck.norris>',
        to: recepients,
        subject: "Hello ✔",
        text: joke
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}



router.post("/", function(req, res) {
    if (!Array.isArray(req.body.emails)) {
        res.status(500).send({
            error: "You've provided an invalid array of e-mails. Please check the array and try again."
        });
    } else {
        const validEmails = [];
        const invalidEmails = [];
        let message = "";

        for (let email of req.body.emails) {
            if (isEmail(email)) {
                console.log(`${email} is a valid email.`)
                validEmails.push(email);
            } else {
                console.log(`${email} is an invalid email.`)
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