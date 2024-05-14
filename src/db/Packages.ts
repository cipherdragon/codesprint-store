import type PackageData from "@/types/PackageData";
import { Items } from "./Items";

export const Packages :PackageData[] = [
    {
        id: 1,
        name: "Cosmic Collection",
        price: 2650, // preorder - 2350/=
        real_price: 2650,
        thumbnail: "/package-thumbs/cosmic-collection.webp",
        items: [Items[0], Items[2], Items[3]]
    },
    {
        id: 2,
        name: "Adventurer Attire",
        price: 3750, // preorder - 3550/=
        real_price: 3750,
        thumbnail: "/package-thumbs/adventure-attire.webp",
        items: [Items[1], Items[2], Items[3]]
    },
    {
        id: 3,
        name: "Prestige Combo",
        price: 5500, // preorder - 5250/=
        real_price: 5500,
        thumbnail: "/package-thumbs/prestige-combo.webp",
        items: [Items[0], Items[1], Items[2], Items[3]]
    }
]