export async function getProductBySlug(slug) {
    try {
        const res = await fetch(`http://localhost:3002/api/products/${slug}`, {
            cache: 'no-store', // or ISR
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        return null;
    }
}
