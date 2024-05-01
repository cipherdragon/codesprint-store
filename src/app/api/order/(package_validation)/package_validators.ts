import { Items } from "@/db/Items";
import { decodeOrderString } from "../OrderStrings";
import { ItemOrder } from "../types";
import { Packages } from "@/db/Packages";

type package_validator = (order_str: string) => boolean;
type pricing_function = (order_str: string) => number;
interface PackageValidators {
    [key : string]: [package_validator, pricing_function];
}

function getItemValidity(items: ItemOrder[]) {
    for (let i = 0; i < items.length; i++) {
        const order_item = items[i];
        const item = Items.find(item => item.id === order_item.item_id);

        if (!item) return false;

        const { size, color, quantity } = order_item;
        if (!size || !color || !quantity) return false;

        const item_sizes = item.sizes.length > 0 ? item.sizes : ["N/A"];
        const item_colors = item.colors.length > 0 ? item.colors : ["N/A"];

        if (!item_sizes.includes(size)) return false;
        
        if (!item_colors.includes(color)) return false;
        if (quantity < 1) return false;
    }
    
    return true;
}

function package_cosmic(order_str: string) {
    const items : ItemOrder[] = decodeOrderString(order_str);
    if (!getItemValidity(items)) return false;

    const allowed_items = Packages.find(pkg => pkg.name === "Cosmic Collection")!.items;

    for (let i = 0; i < items.length; i++) {
        const order_item = items[i];
        const item = Items.find(item => item.id === order_item.item_id);

        if (!allowed_items.includes(item!)) return false;
        if (order_item.quantity > 1) return false;
    }

    return true;
}

function package_adventure(order_str: string) {
    const items : ItemOrder[] = decodeOrderString(order_str);
    if (!getItemValidity(items)) return false;

    const allowed_items = Packages.find(pkg => pkg.name === "Adventurer Attire")!.items;

    for (let i = 0; i < items.length; i++) {
        const order_item = items[i];
        const item = Items.find(item => item.id === order_item.item_id);

        if (!allowed_items.includes(item!)) return false;
        if (order_item.quantity > 1) return false;
    }

    return true;
}

function package_prestige(order_str: string) {
    const items : ItemOrder[] = decodeOrderString(order_str);
    if (!getItemValidity(items)) return false;

    const allowed_items = Packages.find(pkg => pkg.name === "Prestige Combo")!.items;

    for (let i = 0; i < items.length; i++) {
        const order_item = items[i];
        const item = Items.find(item => item.id === order_item.item_id);

        if (!allowed_items.includes(item!)) return false;
        if (order_item.quantity > 1) return false;
    }

    return true;
}

export const package_validators : PackageValidators = {
    "Cosmic Collection" : [ package_cosmic,    (_ : string) => Packages.find(pkg => pkg.name === "Cosmic Collection")!.price ],
    "Adventurer Attire"  : [ package_adventure, (_ : string) => Packages.find(pkg => pkg.name === "Adventurer Attire")!.price ],
    "Prestige Combo"    : [ package_prestige,  (_ : string) => Packages.find(pkg => pkg.name === "Prestige Combo")!.price ],
}

export const package_list = Object.keys(package_validators);