
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { unlink } from 'fs/promises';
import path from 'path';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug: params.slug },
        });
        if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { slug: string } }
) {
    console.log(`[PUT] Updating product: ${params.slug}`);
    try {
        const body = await request.json();

        // Remove system fields and unique identifiers that shouldn't change via simple update
        delete body.id;
        delete body.createdAt;
        delete body.updatedAt;
        delete body.slug;

        // Ensure arrays are handled if they come as objects (legacy protection)
        if (body.features && typeof body.features[0] === 'object') {
            body.features = body.features.map((f: any) => f.value || f);
        }
        if (body.useCases && typeof body.useCases[0] === 'object') {
            body.useCases = body.useCases.map((u: any) => u.value || u);
        }
        if (body.certifications && !Array.isArray(body.certifications)) {
            body.certifications = [];
        }

        console.log(`[PUT] Payload for ${params.slug}:`, JSON.stringify(body, null, 2));

        const product = await prisma.product.update({
            where: { slug: params.slug },
            data: {
                ...body,
                updatedAt: new Date()
            },
        });

        return NextResponse.json(product, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'PUT, OPTIONS',
            }
        });
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({ error: 'Failed to update product: ' + error.message }, { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, DELETE, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

// Handler for deleting a product by ID.
// Note: We use the dynamic slug parameter as the ID here.
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    console.log(`[DELETE] Attempting to delete product ${params.slug}`);

    try {
        const productId = params.slug;

        // 1. Fetch Product 
        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        // Fallback: Try searching by slug if ID lookup fails (legacy support)
        let targetProduct = product;
        if (!targetProduct) {
            targetProduct = await prisma.product.findUnique({ where: { slug: productId } });
        }

        if (!targetProduct) {
            console.log(`[DELETE] Product ${productId} not found db`);
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        // Use the actual DB ID for deletion to be safe
        const dbId = targetProduct.id;

        // 2. Delete Linked Images
        if (targetProduct.images && targetProduct.images.length > 0) {
            const uploadDir = path.join(process.cwd(), 'public', 'uploads');

            for (const imgUrl of targetProduct.images) {
                try {
                    // Extract filename from URL (e.g. http://localhost:3002/uploads/123.png -> 123.png)
                    const filename = imgUrl.split('/').pop();
                    if (filename) {
                        const filePath = path.join(uploadDir, filename);
                        await unlink(filePath).catch((err) => console.log(`[DELETE] File ${filename} not found or error: ${err.message}`));
                    }
                } catch (e) {
                    console.error("Failed to delete image file", e);
                }
            }
        }

        // 3. Delete from Database
        await prisma.product.delete({
            where: { id: dbId },
        });

        console.log(`[DELETE] Successfully deleted product ${productId}`);
        return NextResponse.json({ message: 'Deleted successfully' }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });
    } catch (error: any) {
        console.error("[DELETE] Error:", error);
        return NextResponse.json({ error: 'Failed to delete product: ' + error.message }, { status: 500 });
    }
}
