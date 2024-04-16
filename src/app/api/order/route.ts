import { google } from "googleapis";
import { NextRequest } from "next/server";
import { package_validators } from "./(package_validation)/package_validators";

type packages = "combo" | "n/a";

function calculatePrice(order_str : string, package_id : packages) {
    const [ validator, price_func ] = package_validators[package_id];
    if (!validator(order_str)) return -1;
    return price_func(order_str);
}

function getInvoiceID() {
    const codesprint_version = "8";
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const date = new Date().getDate().toString().padStart(2, '0');
    const hours = new Date().getHours().toString().padStart(2, '0');
    const minutes = new Date().getMinutes().toString().padStart(2, '0');
    const seconds = Date.now().toString().slice(-4);
    const rand_num = Math.floor(Math.random() * 10).toString();

    return `${codesprint_version}-${month}${date}-${hours}${minutes}-${seconds}-${rand_num}`;
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

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: 'Order',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[invoice_id, name, email, phone, address, `${price} LKR`, "Pending", package_id, order_str]]
            }
        });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 })
    }

    return new Response(JSON.stringify({ invoice_id }), { status: 200});
}