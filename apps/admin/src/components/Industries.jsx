'use client';
import { Building2, Factory, GraduationCap, Hospital, MonitorPlay, Plane } from 'lucide-react';

export default function Industries() {
    const industries = [
        { icon: Building2, label: "Corporate" },
        { icon: Hospital, label: "Healthcare" },
        { icon: GraduationCap, label: "Education" },
        { icon: Factory, label: "Industrial" },
        { icon: Plane, label: "Transportation" },
        { icon: MonitorPlay, label: "Entertainment" },
    ];

    return (
        <section className="w-full bg-black py-20 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-brand-red mb-16 uppercase tracking-wide text-center">
                    Industries We Serve
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
                    {industries.map((item, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-950 border border-zinc-900 rounded-xl hover:border-brand-red transition-all duration-300 hover:-translate-y-2 group cursor-pointer aspect-square">
                            <item.icon size={40} className="text-zinc-600 group-hover:text-brand-red transition-colors mb-4" strokeWidth={1.5} />
                            <span className="text-zinc-400 font-bold uppercase text-xs tracking-wider group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
