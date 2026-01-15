const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: { email: 'admin@rvtech.com' },
        update: {},
        create: {
            email: 'admin@rvtech.com',
            password: 'password123',
            name: 'Admin User'
        }
    });
    console.log('Admin user seeded');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
