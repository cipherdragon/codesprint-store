// A module to store state of shopping cart in the client side

import { Packages as pkg_list } from './Packages';

interface OrderType {
    size: string;
    color: string;
    quantity: number;
}

export interface ShoppingCartType {
    [key: number]: OrderType;
}

let selected_package_id : number | undefined = undefined;
let shopping_cart: ShoppingCartType = {};

export function saveCart() {
    if (!selected_package_id || !shopping_cart) return;

    localStorage.removeItem('shopping_cart');
    localStorage.removeItem('selected_package_id');
    localStorage.setItem('shopping_cart', JSON.stringify(shopping_cart));
    localStorage.setItem('selected_package_id', selected_package_id.toString());
}

export function setPackage(pkg_id: number) {
    if (selected_package_id) {
        if (selected_package_id != pkg_id) {
            shopping_cart = {};
        }
    }

    selected_package_id = pkg_id;
}

export function getPackage() {
    return selected_package_id;
}

export function addItem(item_id: number, size: string, 
    color: string, quantity: number) {
    shopping_cart[item_id] = {size, color, quantity};
}

export function getItems() {
    return shopping_cart;
}

function isCartConsistent(current_item_id: number | null) {
    let full_check = false;

    if (!selected_package_id) {
        return false;
    }

    const pkg = pkg_list.find((pkg) => pkg.id === selected_package_id);
    if (!pkg) return false;

    if (current_item_id === null) {
        console.log("AAAA");
        current_item_id = pkg.items[pkg.items.length - 1].id;
        full_check = true;
    }
    
    const item = pkg && pkg.items.find((item) => item.id === current_item_id);
    if (!item) return false;

    for (let pkg_item of pkg.items) {
        if (pkg_item.id === current_item_id && !full_check) break;
        if (!shopping_cart[pkg_item.id]) return false;
    }

    return true;
}

export function loadCart(current_item_id: number | null, pkg_id: number | null) : boolean {
    if (isCartConsistent(current_item_id)) return true;

    const saved_cart_str = localStorage.getItem('shopping_cart');
    const saved_pkg_id_str = localStorage.getItem('selected_package_id');

    if (!saved_pkg_id_str || !saved_cart_str) return false;

    let saved_cart;
    try {
        saved_cart = JSON.parse(saved_cart_str);
    } catch (err) {
        if (err instanceof SyntaxError) return false;
        throw err;
    }

    const saved_pkg_id = parseInt(saved_pkg_id_str);

    if (!saved_pkg_id) return false;
    if (!pkg_id) pkg_id = saved_pkg_id;

    if (pkg_id !== saved_pkg_id) return false;

    selected_package_id = pkg_id;
    shopping_cart = saved_cart;
    return isCartConsistent(current_item_id);
}