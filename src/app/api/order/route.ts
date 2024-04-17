import { google } from "googleapis";
import { NextRequest } from "next/server";
import { package_validators } from "./(package_validation)/package_validators";
import awaitable from "@/util/asyncUtil";

type packages = "combo" | "n/a";

function calculatePrice(order_str : string, package_id : packages) {
    const [ validator, price_func ] = package_validators[package_id];
    if (!validator(order_str)) return -1;
    return price_func(order_str);
}

function getInvoiceID() {
    // Codesprint version + hex(last 6 digits of epoch time) + 2 random digits
    // 8 + 2B3C + 4D --> 8A2B-3C4D | This is unique enough

    const codesprint_version = "8";
    const epoch = (new Date().getTime() % Math.pow(10,6)).toString(16);
    const rand_num_1 = Math.floor(Math.random() * 10).toString();
    const rand_num_2 = Math.floor(Math.random() * 10).toString();

    const raw_id = `${codesprint_version}${epoch}${rand_num_1}${rand_num_2}`.toUpperCase();
    return `${raw_id.slice(0, 4)}-${raw_id.slice(4, 8)}`
}

function getOrderStr(orders: any[]) {
    const orderArray : Record<string, number> = {};

    const size_offsets = { "S": 0, "M": 1, "L": 2, "XL": 3, "2XL": 4 };
    const item_indices = { "Hoodie": 0, "T-Shirt": 10, "Notebook": 25, "Wristband": 26 };
    const hoodie_colors = { "Black": 0, "White": 1 };
    const tshirt_colors = { "Black": 0, "Ash": 1, "Blue": 2 };

    orders.forEach(order => {
        let index = 0, offset_1 = 0, offset_2 = 0;

        const item = order.item;
        const quantity = order.quantity;

        index = item_indices[item as keyof typeof item_indices];

        if (item === "Hoodie" || item === "T-Shirt") {
            offset_2 = size_offsets[order.size as keyof typeof size_offsets];
        }

        if (item === "Hoodie") {
            offset_1 = hoodie_colors[order.color as keyof typeof hoodie_colors];
        } else if (item === "T-Shirt") {
            offset_1 = tshirt_colors[order.color as keyof typeof tshirt_colors];
        }

        orderArray[`${index + offset_1 + offset_2}`] = quantity;
    });

    let order_str = "";
    for (let i = 0; i < 27; i++) {
        order_str += orderArray[`${i}`] ? orderArray[`${i}`] : 0;
        order_str += i === 26 ? "" : ",";
    }

    return order_str;
}

export async function POST(request: NextRequest) {
    const requestBody = await request.json();

    const orders = requestBody['order']!;
    const name = requestBody['name']!;
    const email = requestBody['email']!;
    const address = requestBody['address']!;
    const phone = "'" + requestBody['phone']!;
    const package_id = requestBody['package_id'] as packages;
    const invoice_id = getInvoiceID();

    const order_str = getOrderStr(orders); 
    const price = calculatePrice(order_str, package_id);

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });

    const [_, err3] = await awaitable(sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Order',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[invoice_id, name, email, phone, address, `${price} LKR`, "Pending", package_id, order_str]]
        }
    }));

    if (err3) return new Response(JSON.stringify(err3), { status: 500 })
    return new Response(JSON.stringify({ invoice_id }), { status: 200 });
}