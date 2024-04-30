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
        colors: ["white", "black"],
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
        colors: ["white", "black"],
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: 3,
        name: "CodeSprint 8 Wrist Band",
        price: 200, // dont put these prices
        thumbnail: ["https://static-01.daraz.lk/p/aaad151d06ad59bff241a44c3e5f7187.jpg_300x0q75.webp"],
        colors: ["black"],
        sizes: [],
    },
    {
        id: 4,
        name: "CodeSprint 8 Sticker Pack",
        price: 500, // dont put these prices
        thumbnail: ["https://static-01.daraz.lk/p/012dce1bce922adf41e734aa80032660.jpg_300x0q75.webp"],
        colors: [],
        sizes: [],
    },
]