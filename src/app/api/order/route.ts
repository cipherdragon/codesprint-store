import { google } from "googleapis";
import { NextRequest } from "next/server";
import { package_list, package_validators } from "./(package_validation)/package_validators";
import awaitable from "@/util/asyncUtil";

import { packages, GetParamsResult } from "./types";
import { getOrderStr } from "./OrderStrings";
import { getDayOfYear, getSecondsOfDay } from "@/util/DateUtils";

function calculatePrice(order_str : string, package_name : packages) {
    const [ validator, price_func ] = package_validators[package_name];
    if (!validator(order_str)) return -1;
    return price_func(order_str);
}

function getInvoiceID() {
    const version_number = 800_000_000;

    const day_in_year = getDayOfYear();
    const secs_in_day = getSecondsOfDay();
    const rand_1 = Math.floor(Math.random() * 35).toString(36);
    const rand_2 = Math.floor(Math.random() * 35).toString(36);

    const time_portion = +`${day_in_year}${secs_in_day}`
    const calculated_portion = (+`${time_portion + version_number}`).toString(36);

    const id = `${calculated_portion}${rand_1}${rand_2}` 

    return `${id.slice(0, 4)}-${id.slice(4,8)}`.toUpperCase();
}

function getParams(requestBody: any) : GetParamsResult {
    const orders = requestBody['order'];
    const name = requestBody['name']! as string;
    const email = requestBody['email'];
    const address = requestBody['address'];
    const phone = "'" + requestBody['phone'];
    const package_name = requestBody['package_name'] as packages;

    if (!orders || !name || !email || !address || !phone || !package_name)
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

    // Package name validation
    if (!package_list.includes(package_name))
        return [null, "Invalid package name"];

    // Orders validation (array of objects, at least 1 such order)
    if (!Array.isArray(orders) || orders.length === 0)
        return [null, "Invalid orders"];

    return [{name, email, phone, address, package_name, orders}, null]
}

export async function POST(request: NextRequest) {
    const [requestBody, err] = await awaitable(request.json());
    if (err) return new Response(JSON.stringify({ error: "Bad JSON" }), { status: 400 });

    const [params, err2] = getParams(requestBody);
    if (err2) return new Response(JSON.stringify({ error: err2 }), { status: 400 });

    const { name, email, phone, address, package_name, orders } = params!;
    const invoice_id = getInvoiceID();
    const order_str = getOrderStr(orders); 
    const price = calculatePrice(order_str, package_name);

    if (price < 0) 
        return new Response(JSON.stringify({ error: "Invalid order" }), { status: 400 });

    const auth = await google.auth.getClient({ scopes: ['https://www.googleapis.com/auth/spreadsheets'] });
    const sheets = google.sheets({ version: 'v4', auth });

    const [_, err3] = await awaitable(sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'Order',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [[invoice_id, name, email, phone, address, `${price} LKR`, "Pending", package_name, order_str]]
        }
    }));

    if (err3) return new Response(JSON.stringify(err3), { status: 500 })
    return new Response(JSON.stringify({ invoice_id }), { status: 200 });
}