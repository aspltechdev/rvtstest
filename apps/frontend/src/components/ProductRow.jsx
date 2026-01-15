'use client';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductRow({ title, products }) {
    return (
        <div className="w-full py-12 border-b dark:border-zinc-900/50 border-zinc-200">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-brand-red blur-lg opacity-40"></div>
                        <h3 className="relative text-xl md:text-2xl font-bold text-white uppercase bg-gradient-to-r from-brand-red to-red-900 px-6 py-2 rounded-r-full border-l-4 border-white inline-block shadow-2xl">
                            {title}
                        </h3>
                    </div>
                    <Link href={`/products?category=${encodeURIComponent(title)}`} className="flex items-center gap-2 dark:text-zinc-400 text-zinc-600 hover:text-brand-red transition-colors text-sm uppercase font-bold tracking-wider group">
                        View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((p, i) => {
                        const CardContent = (
                            <>
                                {/* Image Placeholder */}
                                <div className="w-full h-full bg-black/50 flex items-center justify-center relative">
                                    {p.image ? (
                                        <Image src={p.image} alt={p.name} fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                    ) : (
                                        <span className="text-zinc-700 text-xs p-4 text-center">
                                            [ASSET: {p.name}]
                                        </span>
                                    )}

                                    {/* Overlay Graphix */}
                                    <div className="absolute inset-0 bg-gradient-to-t dark:from-black from-white/10 via-transparent to-transparent opacity-90" />
                                </div>

                                {/* Title & Action */}
                                <div className="absolute bottom-0 left-0 w-full p-4 border-t dark:border-zinc-800 border-zinc-200 dark:bg-black/80 bg-zinc-50/90 backdrop-blur-sm flex items-center justify-between group-hover:border-brand-red/50 transition-colors">
                                    <span className="dark:text-zinc-300 text-zinc-700 font-medium text-sm dark:group-hover:text-white group-hover:text-black transition-colors">{p.name || "Product Name"}</span>
                                    <div className="w-6 h-6 rounded-full border dark:border-zinc-700 border-zinc-300 flex items-center justify-center dark:text-zinc-500 text-zinc-400 group-hover:border-brand-red group-hover:text-brand-red transition-all">
                                        <ChevronRight size={12} />
                                    </div>
                                </div>
                            </>
                        );

                        return (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="relative dark:bg-zinc-900 bg-white border dark:border-zinc-800 border-zinc-200 rounded-xl overflow-hidden group h-[250px] shadow-lg"
                            >
                                {p.slug ? (
                                    <Link href={`/products/${p.slug}`} className="block h-full w-full">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    <div className="h-full w-full cursor-default">
                                        {CardContent}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
