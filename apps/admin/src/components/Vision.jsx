'use client';
import { motion } from 'framer-motion';

export default function Vision() {
    return (
        <section className="w-full bg-black py-20 flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center z-10 mb-16">
                <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-widest">
                    Research <span className="text-brand-red">Vision</span>
                </h2>
            </div>

            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center">
                {/* Central Floating Element Placeholder */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-64 h-64 md:w-96 md:h-64 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] relative z-10"
                >
                    <span className="text-zinc-500">[3D ELEMENT PLACEHOLDER]</span>
                    {/* Glow */}
                    <div className="absolute inset-0 bg-brand-red/5 blur-xl rounded-xl" />
                </motion.div>

                {/* Orbiting Elements / Particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-zinc-800/50 rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-zinc-800/30 rounded-full animate-spin-reverse-slow pointer-events-none" />
            </div>

            <div className="text-center z-10 mt-16">
                <h2 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-widest">
                    Tech <span className="text-brand-red">Services</span>
                </h2>
            </div>
        </section>
    )
}
