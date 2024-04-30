import { google } from "googleapis";
import { NextRequest } from "next/server";
import { package_list, package_validators } from "./(package_validation)/package_validators";
import awaitable from "@/util/asyncUtil";

import { packages, GetParamsResult } from "./types";

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
    const hoodie_colors = { "Black": 0, "White": 5 };
    const tshirt_colors = { "Black": 0, "Ash": 5, "Blue": 10 };

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

function getParams(requestBody: any) : GetParamsResult {
    const orders = requestBody['order'];
    const name = requestBody['name']! as string;
    const email = requestBody['email'];
    const address = requestBody['address'];
    const phone = "'" + requestBody['phone'];
    const package_id = requestBody['package_id'] as packages;

    if (!orders || !name || !email || !address || !phone || !package_id)
        return [null, "Missing required fields"];

    // Name validation (only alphabets and spaces, 200 char limit)
    if (!/^[a-zA-Z ]{1,200}$/.test(name))
        return [null, "Invalid name"];

    // Email validation (simple regex, 200 char limit no equals sign)
    if (!/^[^=]{1,200}$/.test(email))
        return [null, "Invalid email"];

    // Address validation (1000 char limit, no equals sign)
    if (!/^[^=]{1,1000}$/.test(address))
        return [null, "Invalid address"];

    // Phone validation (11 chars, starts with ' followed by 10 digits)
    if (!/^'[0-9]{10}$/.test(phone))
        return [null, "Invalid phone number"];

    // Package ID validation (only 'combo' or 'n/a')
    if (!package_list.includes(package_id))
        return [null, "Invalid package ID"];

    // Orders validation (array of objects, at least 1 such order)
    if (!Array.isArray(orders) || orders.length === 0)
        return [null, "Invalid orders"];

    return [{name, email, phone, address, package_id, orders}, null]
}

export async function POST(request: NextRequest) {
    const [requestBody, err] = await awaitable(request.json());
    if (err) return new Response(JSON.stringify({ error: "Bad JSON" }), { status: 400 });

    const [params, err2] = getParams(requestBody);
    if (err2) return new Response(JSON.stringify({ error: err2 }), { status: 400 });

    const { name, email, phone, address, package_id, orders } = params!;
    const invoice_id = getInvoiceID();

    const order_str = getOrderStr(orders); 
    const price = calculatePrice(order_str, package_id);

    if (price < 0) 
        return new Response(JSON.stringify({ error: "Invalid order" }), { status: 400 });

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