"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const partners = [
    { name: "LG", logo: "/assets/LG-Logo.webp" },
    { name: "SONY", logo: "/assets/sony-removebg-preview.png" },
    { name: "Trueview", logo: "/assets/trueview-removebg-preview.png" },
    { name: "AET", logo: "/assets/AET-removebg-preview.png" },
    { name: "SAMSUNG", logo: "/assets/samsung-removebg-preview.png" },
    { name: "TANNOY", logo: "/assets/Tannoy-removebg-preview.png" },
    { name: "ViewSonic", logo: "/assets/viewsonic-removebg-preview.png" },
    { name: "Audio-technica", logo: "/assets/audio-technica.png" },
    { name: "Sennheiser", logo: "/assets/Sennheiser-logo-removebg-preview.png" },
    { name: "Studiomaster", logo: "/assets/studiomaster-removebg-preview.png" },
    { name: "Yamaha", logo: "/assets/yamaha-removebg-preview.png" },
    { name: "Black box", logo: "/assets/Black_Box_Logo-removebg-preview.png" },
    { name: "Datapath", logo: "/assets/datapath-removebg-preview.png" },
    { name: "Liberty", logo: "/assets/liberty_av_solution-removebg-preview.png" },
    { name: "MTC", logo: "/assets/MTC_Logo.png" },
    { name: "Turtle", logo: "/assets/turtle.png" },
    { name: "Beetek", logo: "/assets/beetek-removebg-preview.png" },
];

export default function Partners() {
    const [index, setIndex] = useState(0);
    const [itemsCount, setItemsCount] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setItemsCount(window.innerWidth < 768 ? 3 : 7);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % partners.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const getVisibleItems = () => {
        const result = [];
        const count = itemsCount;
        const half = Math.floor(count / 2);

        for (let i = -half; i <= half; i++) {
            let itemIndex = (index + i) % partners.length;
            if (itemIndex < 0) itemIndex += partners.length;
            result.push({ ...partners[itemIndex], offset: i });
        }
        return result;
    };

    const visibleItems = getVisibleItems();

    return (
        <section className="relative w-full dark:bg-black bg-zinc-50 py-12 md:py-20 overflow-hidden flex flex-col items-center justify-center">
            {/* Light Mode Ambient Glows - Navbar complementary */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden block dark:hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-red-500/20 to-zinc-200/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-red-400/20 to-zinc-100/60 blur-[130px] rounded-full" />
            </div>
            
         

            <div className="relative z-10 w-full flex flex-col items-center">
                <div className="flex flex-col items-center mb-12 text-center px-4">
                    <h2 className="text-[#ff3333] text-4xl md:text-7xl font-black uppercase leading-none tracking-wider">Our Partners</h2>
                </div>

                <div className="relative w-full h-[250px] md:h-[300px] flex items-center justify-center overflow-visible">
                    <div className="flex items-center justify-center gap-2 md:gap-10 perspective-1000">
                        <AnimatePresence mode='popLayout'>
                            {visibleItems.map((partner) => {
                                const isCenter = partner.offset === 0;
                                const isNear = Math.abs(partner.offset) === 1;

                                return (
                                    <motion.div
                                        key={partner.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.6 }}
                                        animate={{
                                            opacity: 1, // Full visibility in both modes now, but contrast handles focus
                                            scale: isCenter ? 1 : (isNear ? 0.85 : 0.7),
                                            y: Math.abs(partner.offset) * -25,
                                            z: isCenter ? 50 : Math.abs(partner.offset) * -100
                                        }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        transition={{ 
                                            duration: 1.2, // Slightly slower for more "neat" flow
                                            ease: [0.32, 0.72, 0, 1],
                                            opacity: { duration: 0.4 }
                                        }}
                                        className={`relative flex items-center justify-center rounded-[20px] md:rounded-[32px] overflow-hidden backdrop-blur-md ${
                                            isCenter 
                                                ? 'w-32 h-32 md:w-56 md:h-56 bg-white dark:bg-zinc-900 border-2 border-red-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_rgba(255,255,255,0.05)] z-30'
                                                : 'w-24 h-24 md:w-40 md:h-40 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-md z-10'
                                        }`}
                                    >
                                        <div className="flex items-center justify-center w-full h-full p-4 md:p-6 bg-white dark:bg-white rounded-[16px] md:rounded-[24px]">
                                            {partner.logo ? (
                                                <div className={`relative ${isCenter ? 'w-28 h-24 md:w-48 md:h-36' : 'w-20 h-16 md:w-32 md:h-24'}`}>
                                                    <Image 
                                                        src={partner.logo} 
                                                        alt={partner.name} 
                                                        fill 
                                                        className={`object-contain transition-all duration-500 ${isCenter ? 'brightness-100 contrast-110 saturate-100' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`} 
                                                    />
                                                </div>
                                            ) : (
                                                <span className={`font-black uppercase transition-all duration-500 ${isCenter ? 'text-zinc-900 text-lg md:text-2xl' : 'text-zinc-400 text-xs md:text-sm'}`}>
                                                    {partner.name}
                                                </span>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                    <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-transparent border-r-[12px] md:border-r-[16px] border-r-transparent border-b-[20px] md:border-b-[24px] border-b-red-500 z-30" />
                </div>
            </div>
        </section>
    );
}
