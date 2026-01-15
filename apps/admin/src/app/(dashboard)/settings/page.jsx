
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return <div className="text-white">Loading user...</div>;
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (!user) return <div className="text-red-500">User not found</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-white">Profile Settings</h2>
            <SettingsForm user={user} />
        </div>
    );
}
