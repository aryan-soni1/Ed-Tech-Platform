const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {

    console.log("data",email)
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // Ensure this matches your mail service port, often 587 for TLS
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: '"StudyNotion ||  by Aryan Soni" <no-reply@studynotion.com>', // Update the email address appropriately
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent: ", info.response);
        return info;
    } catch (error) {
        console.error("Error occurred while sending email: ", error.message);
        throw new Error("Failed to send email");
    }
}

module.exports = mailSender;
