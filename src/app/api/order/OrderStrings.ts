import { ItemOrder } from "./types";

const sizes = {
    "N/A": 0b0000,
    "3XS": 0b0001,
    "2XS": 0b0010,
    "XS" : 0b0011,
    "S"  : 0b0100,
    "M"  : 0b0101,
    "L"  : 0b0110,
    "XL" : 0b0111,
    "2XL": 0b1000,
    "3XL": 0b1001,
}

const colors = {
    "N/A"  : 0b000,
    "white": 0b001,
    "black": 0b010,
}

export function getOrderStr(orders: ItemOrder[]) {
    const orderArray : string[] = [];

    orders.forEach(order => {
        const item_id = +order.item_id;
        const quantity = order.quantity;
        const size = order.size;
        const color = order.color;

        const size_bits = sizes[size as keyof typeof sizes];
        const color_bits = colors[color as keyof typeof colors];

        const order_numeral = 
            size_bits | (color_bits << 4) | (item_id << 7) | (quantity << 11) | (1 << 19);

        orderArray.push(order_numeral.toString(16));
    });

    return orderArray.join(",");
}

export function decodeOrderString(order_str : string) : ItemOrder[] {
    const order_arr = order_str.split(",");

    return order_arr.map(order_str => {
        let order = parseInt(order_str, 16);

        const size_bits  = (order >> 0)  & ((1 << 4) - 1);
        const color_bits = (order >> 4)  & ((1 << 3) - 1);
        const item_id    = (order >> 7)  & ((1 << 4) - 1);
        const quantity   = (order >> 11) & ((1 << 8) - 1);

        type Size = keyof typeof sizes;
        type Color = keyof typeof colors;

        const size = Object.keys(sizes)
            .find(key => sizes[key as Size] === size_bits)!;
        const color = Object.keys(colors)
            .find(key => colors[key as Color] === color_bits)!;

        return { item_id, quantity, size, color };
    });
}