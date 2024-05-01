// A module to store state of shopping cart in the client side

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