'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function createAdmin(state, formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password || !name) {
        return { error: "All fields are required" };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return { error: "User already exists with this email" };
        }

        const otp = formData.get("otp");
        if (!otp) return { error: "Email verification is required" };

        const { verifyOtp } = await import("./otp");
        const verification = await verifyOtp(email, otp);
        if (verification.error) {
            return { error: verification.error };
        }

        await prisma.user.create({
            data: {
                name,
                email,
                password: await bcrypt.hash(password, 10),
            }
        });

        revalidatePath('/admins');
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to create admin" };
    }
}
