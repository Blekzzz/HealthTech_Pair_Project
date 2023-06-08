const nodemailer = require('nodemailer')

async function main(email) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        }
    })
    
    let info = await transporter.sendMail ({
        from: " 'HealthTech' <no-reply@gmail.com>",
        to: email,
        subject: "Hello ✔\nWelcome to HealthTech! What's Your Diseases?",
        text: "Please verify your account, click the button bellow!",
        html: "<button>Verify your account</button>"
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return nodemailer.getTestMessageUrl(info)
}

module.exports.main = main