import type PackageData from "@/types/PackageData";
import { Items } from "./Items";

export const Packages :PackageData[] = [
    {
        id: 1,
        name: "T + Hoodie",
        price: 3500,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/Builders_white_750x.jpg?v=1707475443",
        items: [Items[0], Items[1]]
    },
    {
        id: 2,
        name: "T + Hoodie + Wrist Band",
        price: 3700,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/hat_750x.jpg?v=1710341375",
        items: [Items[0], Items[1], Items[2]]
    },
    {
        id: 3,
        name: "All 3 Combo",
        price: 4200,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/hoodie_white_750x.jpg?v=1707475471",
        items: [Items[0], Items[1], Items[2], Items[3]]
    }
]