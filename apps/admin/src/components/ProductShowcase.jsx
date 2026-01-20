'use client';
import PortfolioCard from './PortfolioCard';

export default function ProductShowcase() {
    const cards = [
        {
            title: "Display & Video Walls",
            subtitle: "LED & LCD Panels, interactive Screens",
            image: "/images/video-wall.png",
            buttons: [
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
            ]
        },
        {
            title: "Control System",
            subtitle: "AV Control Interface, room scheduling",
            image: "/images/control-tablet.png",
            buttons: [
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
            ]
        },
        {
            title: "Control System",
            subtitle: "AV Control Interface, room scheduling",
            image: "/images/room-scheduling.png",
            buttons: [
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
            ]
        },
        {
            title: "Control System",
            subtitle: "AV Control Interface, room scheduling",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
            buttons: [
                { label: "AV CONTROL INTERFACES", icon: true },
                { label: "ROOM SCHEDULING SOULTIONS", icon: true },
                { label: "TURTLE AVC", icon: true },
            ]
        }
    ];

    return (
        <div id="portfolio" className="min-h-screen w-full bg-[#050505] relative overflow-hidden p-4 md:p-12 font-sans selection:bg-brand-red selection:text-white flex flex-col items-center">
            {/* Background Atmosphere */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-red/10 to-transparent pointer-events-none" />

            {/* Geometric Decorations (Top Left) */}
            <div className="absolute -top-20 -left-20 w-[400px] h-[400px] border border-brand-red/10 rotate-45 pointer-events-none" />
            <div className="absolute top-20 left-20 w-[200px] h-[200px] border border-brand-red/10 rotate-45 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col gap-12 md:gap-16 mt-8">
                {/* Header */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff3333] to-[#8a0000] uppercase tracking-wide drop-shadow-[0_0_35px_rgba(208,0,0,0.4)]">
                        Product Portfolio
                    </h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {cards.map((card, i) => (
                        <PortfolioCard key={i} {...card} />
                    ))}
                </div>
            </div>

            {/* Side Accent (Blue Line from Image if exists, else Red) */}
            <div className="fixed left-0 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-500 to-blue-600 shadow-[0_0_10px_cyan] hidden 2xl:block opacity-80" />
        </div>
    )
}
