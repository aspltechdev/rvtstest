import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="w-full bg-black border-t border-zinc-900 pt-20 pb-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                {/* Brand */}
                <div>
                    <h2 className="text-3xl font-black text-white italic mb-6">
                        <span className="text-brand-red">RV</span> TECH
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                        Redefining the digital landscape with innovative audio-visual solutions. We bring the future to your workspace.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-brand-red hover:text-white transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-bold uppercase mb-6 tracking-wider">Quick Links</h4>
                    <ul className="space-y-3">
                        {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map((link) => (
                            <li key={link}>
                                <a href="#" className="text-zinc-500 hover:text-brand-red text-sm transition-colors">{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-bold uppercase mb-6 tracking-wider">Contact</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3 text-zinc-500 text-sm">
                            <MapPin className="shrink-0 text-brand-red" size={18} />
                            <span>123 Tech Park, Innovation Blvd<br />Silicon Valley, CA 94000</span>
                        </li>
                        <li className="flex items-center gap-3 text-zinc-500 text-sm">
                            <Phone className="shrink-0 text-brand-red" size={18} />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex items-center gap-3 text-zinc-500 text-sm">
                            <Mail className="shrink-0 text-brand-red" size={18} />
                            <span>contact@rvtech.com</span>
                        </li>
                    </ul>
                </div>

                {/* Map Placeholder */}
                <div className="w-full h-48 bg-zinc-900 rounded-xl overflow-hidden relative border border-zinc-800">
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs text-center p-4">
                        [GOOGLE MAP API]
                    </div>
                    {/* Simulated Pin */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <MapPin className="text-brand-red drop-shadow-lg" size={32} fill="currentColor" />
                    </div>
                </div>
            </div>

            <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
                <p>&copy; 2024 RV Tech Services. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    )
}
