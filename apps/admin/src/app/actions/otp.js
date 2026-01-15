'use server';

import prisma from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/email";
import crypto from 'crypto';

export async function generateAndSendOtp(email) {
    if (!email) return { error: "Email required" };

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    try {
        // Invalidate old OTPs
        await prisma.otp.deleteMany({
            where: { email }
        });

        await prisma.otp.create({
            data: {
                email,
                code,
                expiresAt
            }
        });

        await sendOtpEmail(email, code);
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to generate OTP" };
    }
}

export async function verifyOtp(email, code) {
    try {
        const otpRecord = await prisma.otp.findFirst({
            where: {
                email,
                code
            }
        });

        if (!otpRecord) {
            return { error: "Invalid OTP" };
        }

        if (new Date() > otpRecord.expiresAt) {
            return { error: "OTP Expired" };
        }

        // Consume OTP
        await prisma.otp.delete({
            where: { id: otpRecord.id }
        });

        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Verification failed" };
    }
}
