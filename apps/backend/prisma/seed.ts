
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding ...')

    const products = [
        // 1. Displays & Video walls
        {
            name: 'LED & LCD PANELS',
            slug: 'led-lcd-panels',
            title: 'Professional LED & LCD Display Panels',
            description: 'High-performance display panels for commercial and industrial use.',
            category: 'Displays & Video walls',
            images: ['/images/led_video_wall.png'],
            published: true,
        },
        {
            name: 'INTERACTIVE TOUCHSCREENS',
            slug: 'interactive-touchscreens',
            title: 'Ultra-Responsive Interactive Touchscreens',
            description: 'Advanced touch-sensitive displays for collaborative environments.',
            category: 'Displays & Video walls',
            images: ['/images/led_video_wall.png'],
            published: true,
        },
        {
            name: 'ACTIVE LED SCREENS',
            slug: 'active-led-screens',
            title: 'High-Brightness Active LED Screens',
            description: 'Vibrant and seamless LED screens for high-impact visual communication.',
            category: 'Displays & Video walls',
            images: ['/images/led_video_wall.png'],
            published: true,
        },

        // 2. Mounting Solutions
        {
            name: 'SWIVEL MOUNT',
            slug: 'swivel-mount',
            title: 'Adjustable Swivel Wall Mount',
            description: 'Versatile mounting solution with full swivel and tilt capabilities.',
            category: 'Mounting Solutions',
            images: ['/images/mounting_solutions.png'],
            published: true,
        },
        {
            name: 'CEILING MOUNT DOUBLE POLE',
            slug: 'ceiling-mount-double-pole',
            title: 'Double Pole Ceiling Mount System',
            description: 'Heavy-duty ceiling mount designed for large displays and stable installations.',
            category: 'Mounting Solutions',
            images: ['/images/mounting_solutions.png'],
            published: true,
        },
        {
            name: 'FIXED MOUNT',
            slug: 'fixed-mount',
            title: 'Slim Profile Fixed Wall Mount',
            description: 'Low-profile mounting solution for a sleek, flush-to-wall look.',
            category: 'Mounting Solutions',
            images: ['/images/mounting_solutions.png'],
            published: true,
        },
        {
            name: 'IPAD MOUNT',
            slug: 'ipad-mount',
            title: 'Secure Tablet & iPad Mount',
            description: 'Theft-resistant mounting solution for tablets in public spaces.',
            category: 'Mounting Solutions',
            images: ['/images/mounting_solutions.png'],
            published: true,
        },

        // 3. Ptz/soundbar/mobile trolley
        {
            name: 'MOBILE AV TROLLEY',
            slug: 'mobile-av-trolley',
            title: 'Heavy-Duty Mobile AV Trolley',
            description: 'Sturdy and portable stand for professional AV equipment and displays.',
            category: 'Ptz/soundbar/mobile trolley',
            images: ['/images/av_trolley_rack.png'],
            published: true,
        },
        {
            name: 'CEILING MOUNT SINGLE POLE',
            slug: 'ceiling-mount-single-pole',
            title: 'Single Pole Professional Ceiling Mount',
            description: 'Compact and reliable ceiling mounting solution for projectors and screens.',
            category: 'Ptz/soundbar/mobile trolley',
            images: ['/images/av_trolley_rack.png'],
            published: true,
        },
        {
            name: '42U RACK',
            slug: '42u-rack',
            title: 'Standard 42U Server & AV Rack',
            description: 'Full-sized floor-standing rack for organized equipment storage.',
            category: 'Ptz/soundbar/mobile trolley',
            images: ['/images/av_trolley_rack.png'],
            published: true,
        },
        {
            name: 'PTZ CAMERA MOUNT',
            slug: 'ptz-camera-mount',
            title: 'Precision PTZ Camera Wall Mount',
            description: 'Dedicated mounting bracket for professional PTZ conference cameras.',
            category: 'Ptz/soundbar/mobile trolley',
            images: ['/images/av_trolley_rack.png'],
            published: true,
        },

        // 4. Video Systems
        {
            name: 'VIDEO SWITCHERS & SPLITTERS',
            slug: 'video-switchers-splitters',
            title: 'High-Speed Video Switcher & Splitter Hub',
            description: 'Seamless signal routing and distribution for multi-display setups.',
            category: 'Video Systems',
            images: ['/images/video_switcher_processor.png'],
            published: true,
        },
        {
            name: 'EXTENDERS AND CONVERTERS',
            slug: 'extenders-converters',
            title: 'Long-Range Video Extenders & Converters',
            description: 'Reliable signal transmission over long distances with minimal latency.',
            category: 'Video Systems',
            images: ['/images/video_switcher_processor.png'],
            published: true,
        },
        {
            name: 'VIDEOWALL PROCESSORS & CONTROLLERS',
            slug: 'videowall-processors-controllers',
            title: 'Advanced Video Wall Processor',
            description: 'High-performance control for complex video wall configurations.',
            category: 'Video Systems',
            images: ['/images/video_switcher_processor.png'],
            published: true,
        },

        // 5. Control Systems
        {
            name: 'AV CONTROL INTERFACES',
            slug: 'av-control-interfaces',
            title: 'Intuitive AV Control Touch Panel',
            description: 'Centralized control interface for sophisticated AV environments.',
            category: 'Control Systems',
            images: ['/images/av_control_interface.png'],
            published: true,
        },
        {
            name: 'ROOM SCHEDULING SOLUTIONS',
            slug: 'room-scheduling-solutions',
            title: 'Smart Room Scheduling Display',
            description: 'Streamlined meeting room management and booking system.',
            category: 'Control Systems',
            images: ['/images/av_control_interface.png'],
            published: true,
        },
        {
            name: 'TURTLE AVC',
            slug: 'turtle-avc',
            title: 'Turtle AVC Control Module',
            description: 'Specialized AV control hardware for high-reliability applications.',
            category: 'Control Systems',
            images: ['/images/av_control_interface.png'],
            published: true,
        },

        // 6. Touch screen Kiosk
        {
            name: 'DIGITAL PODIUM',
            slug: 'digital-podium',
            title: 'All-in-One Interactive Digital Podium',
            description: 'Modern solution for lectures and presentations with integrated touch.',
            category: 'Touch screen Kiosk',
            images: ['/images/digital_kiosk_podium.png'],
            published: true,
        },
        {
            name: 'EXPERIENCE CENTER KIOSK',
            slug: 'experience-center-kiosk',
            title: 'Interactive Experience Center Kiosk',
            description: 'High-engagement kiosk for showrooms and visitor centers.',
            category: 'Touch screen Kiosk',
            images: ['/images/digital_kiosk_podium.png'],
            published: true,
        },
        {
            name: 'CONCEPTUAL KIOSK',
            slug: 'conceptual-kiosk',
            title: 'Custom Conceptual Kiosk Design',
            description: 'Customized interactive kiosks tailored for specific branding needs.',
            category: 'Touch screen Kiosk',
            images: ['/images/digital_kiosk_podium.png'],
            published: true,
        },

        // 7. Cables & Accessories
        {
            name: 'CAT6 HDMI RJ45 BEETEK CAT6',
            slug: 'cat6-hdmi-rj45-beetek',
            title: 'Beetek Professional CAT6 & HDMI Connectivity',
            description: 'High-quality networking and video cables for guaranteed signal integrity.',
            category: 'Cables & Accessories',
            images: ['/images/av_cables_accessories.png'],
            published: true,
        },
        {
            name: 'CABLES & ACCESSORIES',
            slug: 'cables-accessories-bundle',
            title: 'Professional Cable Management & Accessories',
            description: 'Essential accessories for a clean and organized AV installation.',
            category: 'Cables & Accessories',
            images: ['/images/av_cables_accessories.png'],
            published: true,
        }
    ]

    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: p,
            create: p,
        })
        console.log(`Upserted product: ${product.name} (${product.category})`)
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
