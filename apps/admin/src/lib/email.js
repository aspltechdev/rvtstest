import nodemailer from 'nodemailer';

// Mock transporter for development if no env vars
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER || 'test',
        pass: process.env.SMTP_PASS || 'test'
    }
});

export async function sendOtpEmail(email, otp) {
    if (!process.env.SMTP_HOST) {
        console.log("==========================================");
        console.log(`[MOCK EMAIL] To: ${email}`);
        console.log(`[MOCK EMAIL] OTP: ${otp}`);
        console.log("==========================================");
        return; // Don't actually try to send if no config
    }

    try {
        await transporter.sendMail({
            from: '"RVTS Admin" <no-reply@rvts.com>',
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${otp}. It expires in 5 minutes.`,
            html: `<b>Your verification code is: ${otp}</b><br>It expires in 5 minutes.`
        });
    } catch (error) {
        console.error("Failed to send email", error);
        // Fallback to console for dev
        console.log(`[FALLBACK EMAIL LOG] To: ${email} | OTP: ${otp}`);
    }
}
