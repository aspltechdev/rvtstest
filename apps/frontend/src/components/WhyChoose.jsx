'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Zap, Globe, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChoose() {
    const features = [
        {
            icon: <ShieldCheck size={24} />,
            title: "SMART ENGINEERING",
            description: "Solutions designed with precision, efficiency, and scalability to support evolving business needs."
        },
        {
            icon: <Zap size={24} />,
            title: "FAST TURNAROUND",
            description: "Well-defined workflows and agile execution help us deliver results on time without delays."
        },
        {
            icon: <Globe size={24} />,
            title: "DEPENDABLE PARTNERSHIP",
            description: "A client-first mindset with continuous support, transparent communication, and long-term collaboration."
        }
    ];

    return (
        <section id="why-choose" className="relative w-full dark:bg-[#050505] bg-white py-12 md:py-20 px-4 overflow-hidden flex flex-col justify-center items-center">
            
            {/* Background Base */}
            <div className="absolute inset-0 z-0 pointer-events-none dark:bg-[#050505] bg-white" />

            <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center">
                
                {/* --- STANDARD HEADING --- */}
                <div className="text-center mb-12">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black dark:font-extrabold text-black dark:text-white uppercase tracking-wider"
                    >
                        WHY <span className="text-[#000000] dark:text-white">CHOOSE US?</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-[#ff3333] text-sm font-bold uppercase tracking-[0.2em] mt-2"
                    >
                        THE RVTS EDGE
                    </motion.p>
                </div>

                {/* --- MAIN CARD --- */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center w-full"
                >
                    <div className="w-full max-w-[1250px] relative dark:bg-white/[0.03] bg-white/50 backdrop-blur-md rounded-[32px] dark:border-white/40 border-black/20 p-4 md:p-6 group hover:border-[#ff3333]/30 transition-all duration-500 shadow-2xl border">
                        
                        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10">
                            
                            {/* Left Content */}
                            <div className="w-full lg:w-1/2 order-2 lg:order-1">
                                <motion.h3 
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                    className="text-2xl md:text-3xl font-bold dark:text-white text-black mb-4 uppercase tracking-wider leading-tight"
                                >
                                    ENGINEERED FOR REAL-WORLD <span className="text-[#ff3333]">IMPACT</span>
                                </motion.h3>

                                <div className="space-y-2 mb-4">
                                    {features.map((feature, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + (idx * 0.1) }}
                                            className="group/item p-2.5 rounded-2xl dark:bg-white/10 bg-zinc-100 border border-transparent hover:border-[#ff3333]/30 transition-all flex items-start gap-3"
                                        >
                                            <div className="p-2.5 rounded-xl bg-[#ff3333] text-white shadow-[0_0_10px_rgba(255,51,51,0.2)]">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold dark:text-white text-black text-base mb-0.5 uppercase tracking-wide">{feature.title}</h4>
                                                <p className="text-[13px] dark:text-zinc-400 text-zinc-600 leading-relaxed">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex items-center gap-3 p-2.5 rounded-2xl dark:bg-[#ff3333]/10 bg-[#ff3333]/5 border border-[#ff3333]/20"
                                >
                                    <div className="flex-1">
                                        <p className="text-[9px] dark:text-[#ff3333] text-red-600 font-bold uppercase tracking-[0.2em] mb-0.5">Success Metric</p>
                                        <p className="text-xl font-black dark:text-white text-black leading-none">99.8% <span className="text-xs font-bold dark:text-zinc-500 text-zinc-500">Satisfaction</span></p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#ff3333] flex items-center justify-center text-white shadow-lg">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Image Container - Flexible Height */}
                            <div className="relative w-full lg:w-1/2 h-[300px] lg:h-auto order-1 lg:order-2 flex">
                                <div className="w-full h-full dark:bg-zinc-900 bg-zinc-200 rounded-[30px] rounded-tr-[80px] overflow-hidden relative dark:border-white/30 border-black/5 border flex-1">
                                    <motion.div 
                                        initial={{ scale: 1.1 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="relative w-full h-full"
                                    >
                                        <Image 
                                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                                            alt="Why Choose RVTS" 
                                            fill
                                            className="object-cover transition-all duration-700"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-[#ff3333] mix-blend-multiply dark:opacity-40 opacity-0 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                                    
                                    {/* Inner Floating Badge */}
                                    <div className="absolute top-6 right-6">
                                         <div className="dark:bg-black/80 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full dark:border-white/10 border-black/10 border">
                                            <p className="dark:text-white text-black text-[10px] font-black tracking-[0.2em] uppercase">
                                                Certified Excellence
                                            </p>
                                         </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
