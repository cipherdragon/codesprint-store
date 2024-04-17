export type packages = "combo" | "n/a";

interface RequestParams {
    name: string,
    email: string,
    phone: string,
    address: string,
    package_id: packages,
    orders: any[]
}

declare function getParams(requestBody: any): GetParamsResult;

export type GetParamsResult = [RequestParams | null, string | null];