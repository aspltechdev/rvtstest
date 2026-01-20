'use client';
import { ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

export default function WhyChoose() {
    const cards = [
        { icon: ShieldCheck, title: "Reliability", desc: "Industry leading uptime and durability standards." },
        { icon: Zap, title: "Speed", desc: "Lightning fast processing and response times." },
        { icon: Globe, title: "Global", desc: "Support and service network across 50+ countries." },
        { icon: Cpu, title: "Innovation", desc: "Always ahead of the curve with latest tech integration." },
    ];

    return (
        <section className="w-full bg-black py-20 px-6 relative overflow-hidden">
            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />


            <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-16 uppercase tracking-wide">
                    Why Choose <span className="text-brand-red">RVTS?</span>
                </h2>

                {/* Central Feature Display */}
                <div className="relative w-full max-w-lg bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                    {/* Center Tech Image */}
                    <div className="w-full aspect-[4/3] bg-black rounded-xl mb-8 border border-zinc-800 relative overflow-hidden group">
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs">
                            [CENTRAL FEATURE ASSET]
                        </div>
                        <div className="absolute inset-0 bg-brand-red/5 group-hover:bg-brand-red/10 transition-colors" />
                    </div>

                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                        Our commitment to excellence and innovation separates us from the rest. Experience the future of AV technology with a partner you can trust.
                    </p>
                </div>

                {/* Grid of Advantages */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-16">
                    {cards.map((c, i) => (
                        <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-xl hover:border-brand-red/50 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-brand-red mb-4 group-hover:scale-110 transition-transform">
                                <c.icon size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-2">{c.title}</h4>
                            <p className="text-zinc-500 text-xs">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
