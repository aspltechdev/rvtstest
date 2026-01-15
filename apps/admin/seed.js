const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log("DB URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    console.log("Seeding admin user...");
    const hashedPassword = await bcrypt.hash('password123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'admin@rvtech.com' },
        update: {
            password: hashedPassword
        },
        create: {
            email: 'admin@rvtech.com',
            password: hashedPassword,
            name: 'Admin User'
        }
    });
    console.log('Admin user seeded:', user.email);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
