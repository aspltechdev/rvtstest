'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function updateProfile(state, formData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return { error: "Unauthorized" };
    }

    const name = formData.get("name");
    const password = formData.get("password");

    if (!name) {
        return { error: "Name is required" };
    }

    try {
        const data = { name };

        // Step-up Auth: Password change requires OTP
        if (password && password.trim() !== '') {
            const email = formData.get("email"); // From hidden field
            const otp = formData.get("otp");

            if (!otp) return { error: "OTP is required to change password" };

            const { verifyOtp } = await import("./otp");
            const verification = await verifyOtp(email, otp);

            if (verification.error) {
                return { error: verification.error };
            }

            data.password = await bcrypt.hash(password, 10);
        }

        const userId = session.user.id;

        await prisma.user.update({
            where: { id: userId },
            data
        });

        revalidatePath('/settings');
        revalidatePath('/dashboard'); // Update name in header if changed
        return { success: true };
    } catch (e) {
        console.error(e);
        return { error: "Failed to update profile" };
    }
}
