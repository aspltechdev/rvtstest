
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Creating admin user...')

    const email = 'rvts@admin.com'
    const password = '1234567890'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            email,
            password: hashedPassword,
            name: 'Admin User',
        },
    })

    console.log(`Admin user ready:`)
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
