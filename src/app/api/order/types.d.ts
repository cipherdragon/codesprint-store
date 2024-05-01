export type packages = "Prime" | "Opulence" | "Prestige";

interface RequestParams {
    name: string,
    email: string,
    phone: string,
    address: string,
    package_name: packages,
    orders: any[]
}

declare function getParams(requestBody: any): GetParamsResult;

export type GetParamsResult = [RequestParams | null, string | null];

export interface ItemOrder {
    item_id: number,
    quantity: number,
    size: string,
    color: string
}