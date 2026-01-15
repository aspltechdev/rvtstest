import { Poppins } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeContext';

const poppins = Poppins({ 
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
});

export const metadata = {
    title: 'RVTS - Admin Panel',
    description: 'Next Gen Digital Solutions',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${poppins.className} font-sans`}>
                <AuthProvider>
                    <ThemeProvider>
                        {children}
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
