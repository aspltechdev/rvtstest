import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (user && user.password === credentials.password) {
                    return { id: user.id, name: user.name, email: user.email };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
