import type PackageData from "@/types/PackageData";
import { Items } from "./Items";

export const Packages :PackageData[] = [
    {
        id: 1,
        name: "Prime",
        price: 2350, // preorder - 2350/=
        real_price: 2650,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/Builders_white_750x.jpg?v=1707475443",
        items: [Items[0], Items[2]]
    },
    {
        id: 2,
        name: "Opulence",
        price: 3550, // preorder - 3550/=
        real_price: 3750,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/hat_750x.jpg?v=1710341375",
        items: [Items[1], Items[2]]
    },
    {
        id: 3,
        name: "Prestige",
        price: 5250, // preorder - 5250/=
        real_price: 5500,
        thumbnail: "https://dydxmerch.shop/cdn/shop/files/hoodie_white_750x.jpg?v=1707475471",
        items: [Items[0], Items[1], Items[2], Items[3]]
    }
]