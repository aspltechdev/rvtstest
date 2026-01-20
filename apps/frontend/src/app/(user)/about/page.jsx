import React from 'react';
import About from '@/components/About';
import WhyChoose from '@/components/WhyChoose';
import Partners from '@/components/Partners';

export default function AboutPage() {
    return (
        <main className="flex flex-col w-full min-h-screen">
            <About />
            <WhyChoose />
            <Partners />
        </main>
    );
}
