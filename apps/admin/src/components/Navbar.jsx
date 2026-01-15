'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Products', href: '/#products' },
        { name: 'Portfolio', href: '/#portfolio' },
        { name: 'About', href: '/#about' },
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-brand-red/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-black tracking-tighter text-white">
                    SHOW<span className="text-brand-red">CASE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-zinc-400 hover:text-white hover:text-brand-red transition-colors text-sm font-bold uppercase tracking-wide"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button className="bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-colors">
                        GET STARTED
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-t border-brand-red/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-400 hover:text-brand-red text-lg font-bold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button className="bg-brand-red text-white w-full py-3 rounded-full font-bold mt-4">
                                GET STARTED
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
