import { transporter } from "./Email.confiq.js";
import { Verification_Email_Template, Welcome_Email_Template } from "./EmailTemplate.js";


export const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Online Exam" <patlePrajju@gmail.com>',

            to: email, // list of receivers
            subject: "Verify your Email",
            text: "Verify your Email",
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}
export const sendWelcomeEmail = async (email, name) => {
    try {
        await transporter.sendMail({
            from: '"Online Exam" <patlePrajju@gmail.com>',
            to: email,
            subject: "Welcome to Online Exam Platform!",
            html: `
                <h2>Welcome, ${name || 'User'}!</h2>
                <p>Thank you for registering on our Online Exam Platform.</p>
                <p>You can now start taking exams and track your progress.</p>
                <p>Best regards,<br/>Online Exam Team</p>
            `
        });
        console.log('Welcome email sent to:', email);
    } catch (error) {
        console.error('Welcome email error:', error);
    }
};


// reset
// Password Reset Email Template
const Reset_Password_Template = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: auto; background: white; padding: 20px; }
        .code { font-size: 24px; color: #d9534f; font-weight: bold; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>Use this code to reset your password:</p>
        <div class="code">{resetToken}</div>
        <p>This code will expire in 1 hour.</p>
    </div>
</body>
</html>`

export const sendResetPasswordEmail = async (email, resetToken) => {
    try {
        await transporter.sendMail({
            from: '"Online Exam" <patlePrajju@gmail.com>',
            to: email,
            subject: "Reset Your Password",
            html: Reset_Password_Template.replace("{resetToken}", resetToken)
        })
        console.log('Reset password email sent')
    } catch (error) {
        console.log('Reset password email error:', error)
    }
}