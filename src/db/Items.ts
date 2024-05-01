import type ItemData from "@/types/ItemData";

export const Items : ItemData[] = [
    {
        id: 1,
        name: "Cosmic Tee",
        price: 1500, // dont put these prices
        thumbnail: [
            "/product-thumbnails/cosmic-tee-1.webp",
            "/product-thumbnails/cosmic-tee-2.webp",
            "/product-thumbnails/cosmic-tee-3.webp",
        ],
        colors: ["black", "gray", "#11525a"],
        sizes: ["3XS","2XS","XS","S", "M", "L", "XL", "2XL", "3XL"],
    },
    {
        id: 2,
        name: "Adventurer Hoodie",
        price: 2500, // dont put these prices
        thumbnail: [
            "/product-thumbnails/adventurer-hoodie-1.webp",
            "/product-thumbnails/adventurer-hoodie-2.webp",
            "/product-thumbnails/adventurer-hoodie-3.webp",
        ],
        colors: ["black"],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    },
    {
        id: 3,
        name: "Wrist Band",
        price: 200, // dont put these prices
        thumbnail: [
            "/product-thumbnails/wristband-1.webp",
            "/product-thumbnails/wristband-2.webp",
        ],
        colors: ["black"],
        sizes: [],
    },
    {
        id: 4,
        name: "Sticker Pack (FREE!)",
        price: 500, // dont put these prices
        thumbnail: ["/product-thumbnails/stickers.webp"],
        colors: [],
        sizes: [],
    },
]