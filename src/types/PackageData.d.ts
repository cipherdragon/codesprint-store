import type ItemData from "./ItemData";

export type PackageNameType = "Cosmic Collection" | "Adventurer Attire" | "Prestige Combo";

export default interface PackageData {
    id: number;
    name: PackageNameType;
    price: number;
    real_price: number;
    thumbnail: string;
    items: ItemData[];
}