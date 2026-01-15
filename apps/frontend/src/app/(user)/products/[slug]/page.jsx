'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import { Play, CheckCircle, Zap, Download, ShoppingCart, FileText, Settings, Layers, Monitor, ShieldCheck, Box, X, ArrowUpRight, ChevronRight, Share2, Video, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared Components for Theme ---
const Card = ({ children, className = "" }) => (
    <div className={`relative dark:bg-white/[0.04] bg-white/50 backdrop-blur-md rounded-[40px] dark:border-white/20 border-black/20 p-6 md:p-8 group hover:border-[#ff3333]/30 transition-all duration-500 shadow-2xl border ${className}`}>
        {children}
    </div>
);

// --- Accordion Component ---
function Accordion({ title, children, isOpen, onToggle, icon: Icon }) {
    return (
        <div className="border-b dark:border-white/10 border-black/10 overflow-hidden">
            <button 
                onClick={onToggle}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <div className="flex items-center gap-4">
                    {Icon && <div className="w-10 h-10 rounded-xl dark:bg-white/5 bg-black/5 flex items-center justify-center text-[#ff3333] group-hover:scale-110 transition-transform">
                        <Icon size={20} />
                    </div>}
                    <h3 className="text-xl font-black uppercase tracking-tighter text-black dark:text-white group-hover:text-[#ff3333] transition-colors">
                        {title}
                    </h3>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronRight size={24} className="text-zinc-500" />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="pb-8">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Image/Video Gallery Component (Sticky) ---
function ProductGallery({ product, setLightboxOpen, activeMedia, setActiveMedia }) {
    if (!product) return null;

    const media = [
        ...(product.images || []).map(url => ({ type: 'image', url })),
        ...(product.videoUrl ? [{ type: 'video', url: product.videoUrl }] : []),
        ...(product.fusionUrl ? [{ type: 'fusion', url: product.fusionUrl }] : [])
    ];

    const [filter, setFilter] = useState('all'); 

    const filterOptions = ['all', 'image'];
    if (product.videoUrl) filterOptions.push('video');
    if (product.fusionUrl) filterOptions.push('3D');

    const filteredMedia = media.filter(m => {
        if (filter === 'all') return true;
        if (filter === '3D') return m.type === 'fusion';
        return m.type === filter;
    });

    return (
        <div className="flex flex-col gap-6">
            {/* Main Display Container */}
            <div className="relative w-full aspect-square lg:aspect-[4/3] group bg-white dark:bg-zinc-900 border dark:border-white/10 border-black/5 rounded-3xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeMedia?.url}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full cursor-zoom-in"
                        onClick={() => setLightboxOpen(true)}
                    >
                        {activeMedia?.type === 'video' ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-black">
                                <video 
                                    src={activeMedia.url} 
                                    className="w-full h-full object-contain"
                                    autoPlay 
                                    muted 
                                    loop 
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                                        <Play fill="white" className="text-white translate-x-1" size={32} />
                                    </div>
                                </div>
                            </div>
                        ) : activeMedia?.type === 'fusion' ? (
                             <div className="relative w-full h-full bg-white overflow-hidden">
                                <iframe 
                                    src={activeMedia.url} 
                                    className="w-full h-[calc(100%+60px)] -mt-[60px] border-0"
                                    allowFullScreen
                                />
                             </div>
                        ) : activeMedia?.type === 'image' ? (
                            <Image
                                src={activeMedia.url}
                                alt={product.name}
                                fill
                                className="object-contain p-4 md:p-8 transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 font-black uppercase tracking-widest">
                                Processing Media...
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Media Type Badge */}
                <div 
                    className="absolute top-6 left-6 z-20 cursor-pointer group/badge"
                    onClick={() => setLightboxOpen(true)}
                >
                    <div className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full flex items-center gap-2 group-hover/badge:bg-[#ff3333] transition-all">
                        {activeMedia?.type === 'video' ? <Video size={14} className="text-[#ff3333] group-hover/badge:text-white" /> : 
                         activeMedia?.type === 'fusion' ? <Box size={14} className="text-[#ff3333] group-hover/badge:text-white" /> :
                         <ImageIcon size={14} className="text-[#ff3333] group-hover/badge:text-white" />}
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">
                            {activeMedia?.type === 'fusion' ? '3D View' : activeMedia?.type}
                        </span>
                    </div>
                </div>
            </div>

            {/* Media Selector Strip */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    {filterOptions.map(f => (
                        <button 
                            key={f}
                            onClick={() => {
                                setFilter(f);
                                const firstInCategory = media.find(m => {
                                    if (f === 'all') return true;
                                    if (f === '3D') return m.type === 'fusion';
                                    return m.type === f;
                                });
                                if (firstInCategory) setActiveMedia(firstInCategory);
                            }}
                            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${
                                filter === f ? 'text-[#ff3333] border-[#ff3333]' : 'text-zinc-500 border-transparent hover:text-black dark:hover:text-white'
                            }`}
                        >
                            {f}{f !== 'all' && f !== '3D' ? 's' : ''}
                        </button>
                    ))}
                </div>
                
                <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1">
                    {filteredMedia.map((m, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveMedia(m)}
                            className={`relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                                activeMedia?.url === m.url 
                                ? 'border-[#ff3333] shadow-[0_0_20px_rgba(255,51,51,0.4)] scale-110 z-10' 
                                : 'dark:border-white/30 border-black/10 hover:border-[#ff3333]/50 hover:scale-105'
                            }`}
                        >
                            {m.type === 'video' ? (
                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                    <Play size={24} className="text-[#ff3333]" />
                                </div>
                            ) : m.type === 'fusion' ? (
                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                                    <Box size={24} className="text-[#ff3333]" />
                                </div>
                            ) : (
                                <Image src={m.url} alt="thumbnail" fill className="object-cover" />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Tabs Content ---
function OverviewTab({ product }) {
    return (
        <div className="space-y-12 py-6 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter flex items-center gap-4">
                        <Settings className="text-[#ff3333]" size={28} /> Engineering Overview
                    </h3>
                    <p className="dark:text-zinc-300 text-zinc-600 text-base leading-relaxed font-medium">{product.whatDoesItDo || "No engineering overview available for this module."}</p>
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-2xl font-black text-black dark:text-white uppercase tracking-tighter flex items-center gap-4">
                        <ShieldCheck className="text-[#ff3333]" size={28} /> Deployment Advantages
                    </h3>
                    <p className="dark:text-zinc-300 text-zinc-600 text-base leading-relaxed font-medium">{product.whyThisProduct || "Technical advantages and deployment profiles for this solution."}</p>
                 </div>
            </div>

            {product.features && product.features.length > 0 && (
                 <div className="pt-12 border-t dark:border-white/10 border-black/5">
                    <h4 className="text-xs font-black text-[#ff3333] uppercase tracking-[0.4em] mb-8 text-center md:text-left font-bold">Key Technical Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.features.map((feat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 dark:bg-white/[0.03] bg-black/5 p-4 rounded-2xl border dark:border-white/10 border-black/5"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#ff3333]/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-4 h-4 text-[#ff3333]" />
                                </div>
                                <span className="text-black dark:text-white text-sm font-black uppercase tracking-tight">{feat}</span>
                            </motion.div>
                        ))}
                    </div>
                 </div>
            )}
        </div>
    );
}

function TechSpecsTab({ product }) {
    const fields = [
        { label: "Model SKU", value: product.sku },
        { label: "VESA Range", value: product.vesa },
        { label: "Weight Cap", value: product.maxWeight },
        { label: "Screen Range", value: product.screenSize },
        { label: "Articulation", value: product.adjustments },
        { label: "Material Structure", value: product.material },
        { label: "Standardization", value: product.certifications?.join(', ') || 'N/A' },
    ].filter(f => f.value);

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field, i) => (
                    <div key={i} className="flex justify-between items-center dark:bg-white/[0.05] bg-black/5 p-6 rounded-2xl border dark:border-white/10 border-black/5 hover:border-[#ff3333]/40 transition-all">
                        <span className="text-[10px] font-black text-[#ff3333] uppercase tracking-[0.2em]">{field.label}</span>
                        <span className="text-sm font-black text-black dark:text-white uppercase tracking-tighter">{field.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function DownloadsTab({ product }) {
    const docs = [
        { id: 'manual', label: 'Installation Manual', icon: <FileText />, url: product.installationManual },
        { id: 'datasheet', label: 'Technical Data Sheet', icon: <Layers />, url: product.technicalDataSheet },
        { id: 'drawing', label: 'Engineering Drawing', icon: <Box />, url: product.technicalDrawing }
    ].filter(d => d.url);

    if (docs.length === 0) return <p className="text-center py-12 text-zinc-500 font-bold uppercase tracking-widest text-sm">No Technical Documents Registered</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 px-4 md:px-8">
            {docs.map((doc, i) => (
                <a key={i} href={doc.url} target="_blank" rel="noopener noreferrer" className="dark:bg-white/[0.05] bg-black/5 p-8 rounded-[30px] border-2 dark:border-white/10 border-black/5 hover:border-[#ff3333] hover:shadow-[0_0_30px_rgba(255,51,51,0.2)] transition-all group text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#ff3333]/10 rounded-2xl flex items-center justify-center text-[#ff3333] mb-6 group-hover:scale-110 transition-transform">
                        {doc.icon}
                    </div>
                    <h4 className="text-black dark:text-white font-black uppercase tracking-tight mb-2">{doc.label}</h4>
                    <span className="text-[10px] text-[#ff3333] font-bold uppercase tracking-widest flex items-center gap-2">Download PDF <Download size={12}/></span>
                </a>
            ))}
        </div>
    );
}

export default function ProductDetailsPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openSection, setOpenSection] = useState('overview'); // Toggle accordion state
    const [activeMedia, setActiveMedia] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:3002/api/products?slug=${slug}`);
                if (res.data && !res.data.error) {
                    setProduct(res.data);
                    // Set initial active media
                    if (res.data.images?.length > 0) {
                        setActiveMedia({ type: 'image', url: res.data.images[0] });
                    } else if (res.data.fusionUrl) {
                        setActiveMedia({ type: 'fusion', url: res.data.fusionUrl });
                    } else if (res.data.videoUrl) {
                        setActiveMedia({ type: 'video', url: res.data.videoUrl });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch product", err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchProduct();
    }, [slug]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        }
    };

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    if (loading) {
        return (
            <div className="min-h-screen dark:bg-[#050505] bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-[#ff3333] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[#ff3333] font-black uppercase tracking-[0.5em] animate-pulse">Syncing Database...</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen dark:bg-[#050505] bg-white flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-5xl font-black uppercase tracking-tighter text-black dark:text-white mb-4">Module Not Found</h1>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-8">The requested hardware ID is not in our active registry.</p>
                <button 
                    onClick={() => window.history.back()}
                    className="px-8 py-4 bg-[#ff3333] text-white font-black rounded-2xl uppercase tracking-widest text-xs shadow-2xl"
                >
                    Return to Collection
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-[#050505] bg-white selection:bg-[#ff3333] selection:text-white">
            
            <div className="max-w-[1500px] mx-auto px-4 md:px-8 pt-8 pb-12">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* --- LEFT SIDE: FIXED GALLERY & META --- */}
                    <div className="w-full lg:w-[450px] xl:w-[550px] shrink-0">
                        <div className="lg:sticky lg:top-28 space-y-8">
                            
                            {/* Category & Share (Moved here) */}
                            <div className="flex items-center justify-between">
                                <div className="px-5 py-2 dark:bg-[#ff3333]/10 bg-[#ff3333]/5 rounded-full text-[10px] text-[#ff3333] uppercase font-black tracking-[0.3em] border border-[#ff3333]/20">
                                    {product.category || 'Professional AV'}
                                </div>
                                <button 
                                    onClick={handleShare}
                                    className="p-3 dark:bg-white/5 bg-black/5 rounded-full hover:bg-[#ff3333] hover:text-white transition-all border dark:border-white/10 border-black/10 flex items-center gap-2 group"
                                >
                                    <Share2 size={18} />
                                    <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover:block px-2">Share</span>
                                </button>
                            </div>

                            <ProductGallery 
                                product={product} 
                                setLightboxOpen={setLightboxOpen}
                                activeMedia={activeMedia}
                                setActiveMedia={setActiveMedia}
                            />
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: SCROLLABLE CONTENT --- */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            {/* Header */}
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-black dark:text-white leading-[0.9] tracking-tighter">
                                    {product.name}
                                </h1>

                                <p className="dark:text-zinc-300 text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl font-medium">
                                    {product.description}
                                </p>

                                {/* Action Console */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button className="flex-1 max-w-xs px-10 py-5 bg-[#ff3333] text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl shadow-[0_15px_35px_rgba(255,51,51,0.25)] hover:scale-[1.05] transition-all flex items-center justify-center gap-3">
                                        Order Configuration
                                        <ShoppingCart size={18} />
                                    </button>
                                    {product.technicalDataSheet && (
                                        <a href={product.technicalDataSheet} target="_blank" rel="noopener noreferrer" className="flex-1 max-w-xs px-10 py-5 border-2 dark:border-white/20 border-black/20 dark:text-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-[#ff3333] hover:border-[#ff3333] hover:text-white transition-all flex items-center justify-center gap-3">
                                            Documentation
                                            <Download size={18} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Quick Specs (Row) */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-y dark:border-white/10 border-black/10">
                                {[
                                    { label: 'VESA', value: product.vesa || 'Custom' },
                                    { label: 'Max Load', value: product.maxWeight || 'Standard' },
                                    { label: 'Model', value: product.sku || 'R-100' },
                                    { label: 'Condition', value: 'Certified' }
                                ].map((spec, i) => (
                                    <div key={i}>
                                        <span className="text-[9px] font-black text-[#ff3333] uppercase tracking-[0.3em] block mb-2 opacity-100">{spec.label}</span>
                                        <span className="text-lg font-black dark:text-white text-black uppercase tracking-tighter">{spec.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Accordions Section */}
                            <div className="pt-4">
                                <Accordion 
                                    title="Project Overview" 
                                    icon={Settings}
                                    isOpen={openSection === 'overview'} 
                                    onToggle={() => toggleSection('overview')}
                                >
                                    <OverviewTab product={product} />
                                </Accordion>

                                <Accordion 
                                    title="Technical Profile" 
                                    icon={Layers}
                                    isOpen={openSection === 'specs'} 
                                    onToggle={() => toggleSection('specs')}
                                >
                                    <TechSpecsTab product={product} />
                                </Accordion>

                                <Accordion 
                                    title="Registry Downloads" 
                                    icon={Download}
                                    isOpen={openSection === 'downloads'} 
                                    onToggle={() => toggleSection('downloads')}
                                >
                                    <DownloadsTab product={product} />
                                </Accordion>

                                {product.useCases && product.useCases.length > 0 && (
                                    <Accordion 
                                        title="Ideal Applications" 
                                        icon={Zap}
                                        isOpen={openSection === 'applications'} 
                                        onToggle={() => toggleSection('applications')}
                                    >
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                            {product.useCases.map((useCase, i) => (
                                                <div key={i} className="dark:bg-white/[0.04] bg-black/5 p-6 rounded-2xl border dark:border-white/10 border-black/10 hover:border-[#ff3333] transition-all flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-[#ff3333]/10 rounded-xl flex items-center justify-center shrink-0">
                                                        <Zap size={18} className="text-[#ff3333]" />
                                                    </div>
                                                    <span className="text-black dark:text-white font-black uppercase text-[11px] tracking-widest leading-snug">{useCase}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center p-4 md:p-10"
                        onClick={() => setLightboxOpen(false)}
                    >
                        {/* Improved Close Button */}
                        <button 
                            className="absolute top-6 right-6 z-[10000] w-14 h-14 bg-white/5 hover:bg-[#ff3333] text-white rounded-full transition-all border border-white/10 flex items-center justify-center group shadow-2xl backdrop-blur-md" 
                            onClick={() => setLightboxOpen(false)}
                        >
                            <X size={32} className="group-hover:scale-110 transition-transform" />
                        </button>

                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full h-full flex items-center justify-center bg-white dark:bg-zinc-900 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {activeMedia?.type === 'video' ? (
                                <video src={activeMedia.url} className="max-w-full max-h-full" controls autoPlay />
                            ) : activeMedia?.type === 'fusion' ? (
                                <div className="w-full h-full relative overflow-hidden">
                                     <iframe 
                                        src={activeMedia.url} 
                                        className="w-full h-[calc(100%+80px)] -mt-[80px] border-0"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <Image src={activeMedia?.url} alt={product.name} fill className="object-contain" />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
