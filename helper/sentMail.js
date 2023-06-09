const nodemailer = require('nodemailer')

async function main(email, username) {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass, 
        }
    })
    
    let info = await transporter.sendMail ({
        from: " 'HealthTech' <no-reply@gmail.com>",
        to: email,
        subject: "Hello ✔\nWelcome to HealthTech! What's Your Diseases?",
        text: `Welcome to our website ${username}. Please verify your account, click the button bellow!`,
        html: "<button>Verify your account</button>"
    })

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return nodemailer.getTestMessageUrl(info)
}

module.exports.main = main