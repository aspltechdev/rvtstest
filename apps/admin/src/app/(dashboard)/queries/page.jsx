import prisma from '@/lib/prisma';
import { Mail, Calendar, User, MessageCircle, Phone, Send } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function QueriesPage() {
    const queries = await prisma.contactQuery.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Contact Queries</h1>
                    <p className="text-gray-600 dark:text-zinc-400 mt-1">Manage and respond to customer inquiries</p>
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-800 rounded-lg px-4 py-2 text-sm text-gray-600 dark:text-zinc-400 shadow-sm">
                    Total: <span className="text-gray-900 dark:text-white font-bold">{queries.length}</span>
                </div>
            </div>
            
            <div className="grid gap-6">
                {queries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 dark:border-zinc-800 rounded-2xl bg-gray-50 dark:bg-zinc-900/20 text-center">
                        <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-200 dark:border-zinc-800">
                            <MessageCircle className="text-gray-400 dark:text-zinc-600" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No queries yet</h3>
                        <p className="text-gray-500 dark:text-zinc-500">New contact form submissions will appear here.</p>
                    </div>
                ) : (
                    queries.map((query) => (
                        <div key={query.id} className="group bg-white dark:bg-zinc-900/30 border border-gray-300 dark:border-zinc-800 hover:border-brand-red/50 dark:hover:border-brand-red/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-[0_0_30px_rgba(220,38,38,0.05)] hover:bg-white dark:hover:bg-zinc-900/50">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left: User Info */}
                                <div className="md:w-1/3 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-white dark:from-zinc-800 dark:to-zinc-900 border border-gray-300 dark:border-zinc-700 flex items-center justify-center text-lg font-bold text-gray-800 dark:text-white shadow-sm">
                                            {query.firstName[0]}{query.lastName[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight group-hover:text-brand-red transition-colors">
                                                {query.firstName} {query.lastName}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-400/10 px-2 py-0.5 rounded-full w-fit border border-emerald-200 dark:border-transparent">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                                                {query.status || 'New Inquiry'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 text-sm group/link">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-zinc-950 flex items-center justify-center border border-gray-300 dark:border-zinc-800 group-hover/link:border-brand-red/50 transition-colors shadow-sm">
                                                <Mail size={14} className="text-gray-600 dark:text-zinc-400" />
                                            </div>
                                            <a href={`mailto:${query.email}`} className="font-medium hover:text-gray-900 dark:hover:text-white transition-colors truncate">
                                                {query.email}
                                            </a>
                                        </div>
                                        {query.phoneNumber && (
                                            <div className="flex items-center gap-3 text-gray-600 dark:text-zinc-400 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-zinc-950 flex items-center justify-center border border-gray-300 dark:border-zinc-800 shadow-sm">
                                                    <Phone size={14} className="text-gray-600 dark:text-zinc-400" />
                                                </div>
                                                <span className="font-medium text-gray-700 dark:text-zinc-300">{query.phoneNumber}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-gray-500 dark:text-zinc-500 text-sm">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-zinc-950 flex items-center justify-center border border-gray-300 dark:border-zinc-800 shadow-sm">
                                                <Calendar size={14} className="text-gray-600 dark:text-zinc-400" />
                                            </div>
                                            {new Date(query.createdAt).toLocaleString('en-US', { 
                                                dateStyle: 'medium', 
                                                timeStyle: 'short' 
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Message Content */}
                                <div className="md:w-2/3 md:border-l md:border-gray-200 dark:md:border-zinc-800 md:pl-6 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold text-brand-red tracking-widest uppercase">Subject</span>
                                        <span className="text-gray-400 dark:text-zinc-600">/</span>
                                        <span className="font-bold text-gray-900 dark:text-white">{query.subject}</span>
                                    </div>
                                    
                                    <div className="bg-gray-50 dark:bg-zinc-950/50 rounded-xl p-5 border border-gray-200 dark:border-zinc-800/50 flex-grow text-gray-700 dark:text-zinc-300 leading-relaxed text-sm font-medium">
                                        {query.message}
                                    </div>

                                    <div className="flex gap-3 mt-4 justify-end">
                                        <button className="px-4 py-2 bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-white text-sm font-medium rounded-lg transition-all border border-gray-300 dark:border-zinc-700 shadow-sm hover:shadow-md">
                                            Mark as Read
                                        </button>
                                        <a href={`mailto:${query.email}`} className="px-4 py-2 bg-brand-red hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2">
                                            <Send size={14} />
                                            Reply
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
