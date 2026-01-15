'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu, Zap, LayoutGrid, ChevronRight, Search, Activity, Database } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ProductsListPage = ({ searchParams }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryQuery = searchParams?.category;
    const [selectedCategory, setSelectedCategory] = useState(categoryQuery || 'All Hardware');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: "All Hardware", icon: <LayoutGrid size={14} /> },
        { name: "Displays & Video walls", icon: <Monitor size={14} /> },
        { name: "Mounting Solutions", icon: <Zap size={14} /> },
        { name: "Ptz/soundbar/mobile trolley", icon: <Cpu size={14} /> },
        { name: "Video Systems", icon: <Zap size={14} /> },
        { name: "Control Systems", icon: <Monitor size={14} /> },
        { name: "Touch screen Kiosk", icon: <LayoutGrid size={14} /> },
        { name: "Cables & Accessories", icon: <Zap size={14} /> }
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            const sampleProduct = {
                id: 'sample-1',
                name: 'P1.2 COB LED Display',
                slug: 'p1-2-cob-led-display',
                category: 'Displays & Video walls',
                images: ['/images/video-wall.png'],
                description: 'High resolution LED wall for indoor usage.'
            };

            try {
                const res = await fetch('http://localhost:3002/api/products');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data.length > 0 ? [...data, sampleProduct] : [sampleProduct]);
            } catch (err) {
                console.error("Fetch error:", err);
                // Fallback to sample data for demo
                setProducts([sampleProduct]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(p => {
        const nameMatch = (p.name || p.title || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All Hardware' ||
            (p.category && p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()) ||
            (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase().split('&')[0].trim()));
        return nameMatch && matchesCategory;
    });

    return (
        <main className="min-h-screen dark:bg-[#050505] bg-white dark:text-white text-black selection:bg-brand-red selection:text-white relative overflow-hidden">
            {/* CINEMATIC BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-zinc-900/50 dark:via-[#050505] dark:to-[#050505] bg-zinc-50" />
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-red/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red/20 to-transparent" />
                {/* NOISE TEXTURE */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            </div>

            <div className="relative z-10 pt-12 pb-12 container mx-auto px-6">

                {/* HEAD & FILTERS - RESTORED REGISTRY LAYOUT */}
                <section className="flex flex-col items-center text-center mb-24">
                    {/* OVERHEAD LABELS */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-6 mb-8"
                    >
                        <div className="h-[1px] w-24 bg-gradient-to-l from-brand-red/50 to-transparent" />
                        <span className="text-[10px] font-black text-brand-red uppercase tracking-[0.6em] drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            Hardware Registry
                        </span>
                        <div className="h-[1px] w-24 bg-gradient-to-r from-brand-red/50 to-transparent" />
                    </motion.div>

                    {/* MAIN TITLE */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter dark:text-gray-300 text-gray-900 mb-12 relative z-10"
                    >
                        THE COLLECTION
                    </motion.h1>

                    {/* FILTER CONSOLE - GRID LAYOUT */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="w-full max-w-5xl"
                    >
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 p-6 rounded-3xl dark:bg-white/[0.02] bg-black/[0.02] dark:border-white/[0.05] border-black/[0.05] backdrop-blur-sm shadow-2xl">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`
                                        group relative flex items-center gap-3 px-6 py-4 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden
                                        ${selectedCategory === cat.name
                                            ? 'text-red-500 shadow-[0_0_25px_rgba(239,68,68,0.4)] border border-brand-red'
                                            : 'dark:bg-black/40 bg-white/40 dark:text-white-500 text-zinc-600 border dark:border-white/5 border-black/5 hover:bg-red-500/5 hover:text-red-500'
                                        }
                                    `}
                                >
                                    <span className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${selectedCategory === cat.name ? 'text-white' : 'text-brand-red opacity-70'}`}>
                                        {cat.icon}
                                    </span>
                                    <span className="relative z-10">{cat.name}</span>

                                    {/* GLOW EFFECT */}
                                    {selectedCategory === cat.name && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full -skew-x-12 animate-shimmer" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* STATUS BAR */}
                        <div className="mt-8 flex items-center justify-between px-6 py-3 border-t dark:border-white/[0.05] border-black/[0.1]">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-brand-red animate-ping opacity-50" />
                                </div>
                                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Active Database Connection</span>
                            </div>

                            {/* SEARCH INPUT INTEGRATED */}
                            <div className="hidden md:flex items-center gap-3 dark:bg-white/[0.03] bg-black/[0.05] border dark:border-white/5 border-black/10 rounded-full px-4 py-1.5 focus-within:border-brand-red/30 transition-colors">
                                <Search size={12} className="dark:text-zinc-600 text-zinc-500" />
                                <input
                                    type="text"
                                    placeholder="SEARCH ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-[10px] dark:text-white text-black uppercase w-32 dark:placeholder-zinc-700 placeholder-zinc-500"
                                />
                            </div>

                            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.3em]">{filteredProducts.length} MODULES DISCOVERED</span>
                        </div>
                    </motion.div>
                </section>

                {/* PRODUCTS GRID */}
                <section className="min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-6">
                            <Activity className="text-brand-red animate-pulse" size={48} />
                            <span className="text-[10px] font-black tracking-[0.5em] text-zinc-700 uppercase animate-flash">System initializing...</span>
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredProducts.map((p, i) => (
                                    <motion.div
                                        layout
                                        key={p.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5, delay: i * 0.05 }}
                                        className="group"
                                    >
                                        <Link href={`/products/${p.slug}`} className="block h-full">
                                            <div className="relative h-[320px] dark:bg-[#0A0A0A] bg-white border dark:border-zinc-800/80 border-zinc-200 rounded-sm overflow-hidden group-hover:border-brand-red/50 transition-colors duration-500">

                                                {/* CORNER ACCENTS */}
                                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-red/0 group-hover:border-brand-red/50 transition-all duration-500 z-20" />
                                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-red/0 group-hover:border-brand-red/50 transition-all duration-500 z-20" />

                                                {/* IMAGE AREA */}
                                                <div className="h-[65%] w-full flex items-center justify-center p-8 relative overflow-hidden dark:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] dark:from-zinc-900/40 dark:to-transparent from-zinc-100/40 to-transparent">
                                                    {p.images?.[0] ? (
                                                        <Image
                                                            src={p.images[0]}
                                                            alt={p.name}
                                                            fill
                                                            className="object-contain p-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                                        />
                                                    ) : (
                                                        <Monitor size={40} className="text-zinc-800" />
                                                    )}
                                                </div>

                                                {/* INFO PANEL */}
                                                <div className="absolute bottom-0 left-0 w-full p-6 dark:bg-black/90 bg-white/90 backdrop-blur-md border-t dark:border-zinc-800 border-zinc-200 dark:group-hover:bg-zinc-900/90 group-hover:bg-zinc-50/90 transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="text-[8px] font-black text-brand-red tracking-[0.2em] uppercase mb-2 bg-brand-red/10 inline-block px-1.5 py-0.5 rounded">
                                                                {p.category || 'N/A'}
                                                            </div>
                                                            <h3 className="text-sm font-bold dark:text-white text-black uppercase tracking-wider leading-tight line-clamp-2">
                                                                {p.name}
                                                            </h3>
                                                        </div>
                                                        <div className="w-6 h-6 rounded-full border dark:border-zinc-700 border-zinc-300 flex items-center justify-center dark:group-hover:bg-brand-red dark:group-hover:border-brand-red dark:group-hover:text-black group-hover:bg-brand-red group-hover:border-brand-red group-hover:text-white transition-all">
                                                            <ChevronRight size={12} className="dark:text-zinc-500 text-zinc-400 group-hover:text-inherit" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="py-32 flex flex-col items-center justify-center opacity-40">
                            <Database size={64} className="text-zinc-800 mb-6" />
                            <h3 className="text-2xl font-black text-zinc-700 uppercase tracking-widest">Registry Empty</h3>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default ProductsListPage;