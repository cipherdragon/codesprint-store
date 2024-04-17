import type PackageData from "@/types/PackageData";
import { Items } from "./Items";

export const Packages :PackageData[] = [
    {
        id: 1,
        name: "T + Hoodie",
        price: 3500,
        thumbnail: "https://pepperstreet.co/cdn/shop/files/BROWN_4_f0978273-0e1f-4b9c-8732-5303adb1b290.png?v=1709809133&width=750",
        items: [Items[0], Items[1]]
    },
    {
        id: 2,
        name: "T + Hoodie + Wrist Band",
        price: 3700,
        thumbnail: "https://pepperstreet.co/cdn/shop/files/GREYHEATHER_2_bd550900-7b1e-41a3-a16d-92088c799843.png?v=1709809524&width=750",
        items: [Items[0], Items[1], Items[2]]
    },
    {
        id: 3,
        name: "All 3 Combo",
        price: 4200,
        thumbnail: "https://static-01.daraz.lk/p/aaad151d06ad59bff241a44c3e5f7187.jpg_300x0q75.webp",
        items: [Items[0], Items[1], Items[2], Items[3]]
    }
]