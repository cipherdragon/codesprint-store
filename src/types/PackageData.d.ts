import type ItemData from "./ItemData";

export default interface PackageData {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    items: ItemData[];
}