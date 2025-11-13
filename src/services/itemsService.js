const BASE = 'https://dummyjson.com/products';

export async function searchItems(q) {
    const url = q ? `${BASE}/search?q=${encodeURIComponent(q)}` : `${BASE}?limit=30`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Search failed: ${res.status}`);
    const data = await res.json();
    return data.products ?? [];
}

export async function getItemById(id) {
    const res = await fetch(`${BASE}/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Fetch by id failed: ${res.status}`);
    return await res.json();
}
