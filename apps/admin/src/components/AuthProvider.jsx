'use client';
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }) {
    return <SessionProvider refetchInterval={60 * 5} refetchOnWindowFocus={true}>{children}</SessionProvider>;
}
