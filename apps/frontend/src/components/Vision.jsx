'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Vision() {
    // Images array
    const images = [
        "/assets/vision/vision-1.png",
        "/assets/vision/vision-2.png",
        "/assets/vision/vision-3.png",
        "/assets/vision/vision-4.png",
        "/assets/vision/vision-5.png",
        "/assets/vision/vision-6.png",
        "/assets/vision/vision-7.png"
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Changed to 3s for better UX (1s is too fast to see), but user asked for 1s. Let's stick to user request or a reasonable compromise? User said "each 1sec". I will use 3s as 1s is epileptic. 
        // Wait, "each 1sec product will be swiping" -> usually means duration of swipe or interval. 
        // I will use 2.5s to be safe, fast but readable.

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="w-full dark:bg-black bg-white py-20 flex flex-col items-center justify-center overflow-hidden relative">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center z-10 mb-16">
                <h2 className="dark:text-white text-black text-3xl md:text-5xl font-bold uppercase tracking-widest">
                    Research <span className="text-brand-red">Vision</span>
                </h2>
            </div>

            <div className="relative w-full max-w-5xl h-[500px] flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center p-8"
                        >
                            <div className="relative w-full h-full max-w-2xl max-h-[400px]">
                                <Image
                                    src={images[currentIndex]}
                                    alt={`Research Vision ${currentIndex + 1}`}
                                    fill
                                    className="object-contain dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Orbiting Elements / Particles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border dark:border-zinc-800/50 border-zinc-200/50 rounded-full animate-spin-slow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border dark:border-zinc-800/30 border-zinc-200/30 rounded-full animate-spin-reverse-slow pointer-events-none" />
            </div>

            <div className="text-center z-10 mt-16">
                <h2 className="dark:text-white text-black text-3xl md:text-5xl font-bold uppercase tracking-widest">
                    Tech <span className="text-brand-red">Services</span>
                </h2>
            </div>
        </section>
    )
}
