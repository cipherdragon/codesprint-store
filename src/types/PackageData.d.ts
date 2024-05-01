import type ItemData from "./ItemData";

export type PackageNameType = "Prime" | "Opulence" | "Prestige";

export default interface PackageData {
    id: number;
    name: PackageNameType;
    price: number;
    real_price: number;
    thumbnail: string;
    items: ItemData[];
}