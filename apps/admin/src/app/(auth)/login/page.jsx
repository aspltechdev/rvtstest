'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid credentials");
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-red-900"></div>
                <h2 className="text-3xl font-black text-white mb-8 text-center tracking-tight">ADMIN <span className="text-brand-red">ACCESS</span></h2>
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm text-center font-medium">{error}</div>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-zinc-800 text-white p-3 rounded-lg focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black border border-zinc-800 text-white p-3 rounded-lg focus:border-brand-red focus:ring-1 focus:ring-brand-red focus:outline-none transition-all pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="bg-brand-red text-white font-bold py-3.5 rounded-lg hover:bg-red-700 hover:shadow-lg hover:shadow-brand-red/20 transition-all mt-2 transform active:scale-[0.98]">
                        SECURE LOGIN
                    </button>
                </form>
                <p className="text-zinc-600 text-xs mt-6 text-center">Restricted Access. Authorized Personnel Only.</p>
            </div>
        </div>
    )
}
