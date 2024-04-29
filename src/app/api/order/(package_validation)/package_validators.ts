type package_validator = (order_str: string) => boolean;
type pricing_function = (order_str: string) => number;
interface PackageValidators {
    [key : string]: [package_validator, pricing_function];
}

const prices = {
    hoodie: 2000,
    tshirt: 1000,
    notebook: 500,
    wristband: 100
}

function slice_order(order_str: string) {
    const order_arr = order_str.split(",").map(Number);

    const hoodie = order_arr.slice(0, 10);
    const tshirt = order_arr.slice(10, 25);
    const notebook = order_arr.slice(25, 26);
    const wristband = order_arr.slice(26, 27);

    return { hoodie, tshirt, notebook, wristband };
}

function get_totals(hoodie: number[], tshirt: number[], notebook: number[], wristband: number[]) {
    const hoodie_total = hoodie.reduce((acc, val) => acc + val, 0);
    const tshirt_total = tshirt.reduce((acc, val) => acc + val, 0);
    const notebook_total = notebook.reduce((acc, val) => acc + val, 0);
    const wristband_total = wristband.reduce((acc, val) => acc + val, 0);

    return { hoodie_total, tshirt_total, notebook_total, wristband_total };
}

function package_combo(order_str: string) {
    const { hoodie, tshirt, notebook, wristband } = slice_order(order_str);
    const { hoodie_total, tshirt_total, notebook_total, wristband_total } = get_totals(hoodie, tshirt, notebook, wristband);

    return (
        hoodie_total    <= 1 && 
        tshirt_total    <= 1 && 
        notebook_total  <= 1 && 
        wristband_total <= 1
    );
}

function package_na(order_str: string) {
    const order_arr = order_str.split(",").map(Number);
    if (order_arr.length !== 27) return false;
    return true;
}

function package_na_price(order_str: string) {
    const { hoodie, tshirt, notebook, wristband } = slice_order(order_str);
    const { hoodie_total, tshirt_total, notebook_total, wristband_total } = get_totals(hoodie, tshirt, notebook, wristband);

    let price = 0;
    price += hoodie_total * prices.hoodie;
    price += tshirt_total * prices.tshirt;
    price += notebook_total * prices.notebook;
    price += wristband_total * prices.wristband;

    return price;
}


export const package_validators : PackageValidators = {
    "combo": [ package_combo, (_ : string) => 3000 ],
    "n/a": [ package_na, package_na_price],
}

export const package_list = ["combo", "n/a"];