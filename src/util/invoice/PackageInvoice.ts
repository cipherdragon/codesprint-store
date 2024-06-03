import { jsPDF, type CellConfig } from "jspdf";

import { ShoppingCartType } from "@/db/ShoppingCart";
import PackageData from "@/types/PackageData";

const order_instructions = 
    "YOUR ORDER WILL NOT BE DELIVERED.\n\n" +
    "We are no longer accepting orders. Site's functionality is\n" +
    "maintained only for archival purposes. Thank you!\n"

export class PackageInvoice {
    private item_list : ShoppingCartType;
    private thePackage? : PackageData;
    private invoice_id : string;
    private customer_name : string;
    private customer_email : string;
    private customer_phone : string;
    private doc : jsPDF;
    private order_complete_instructions : string;

    constructor(invoice_id : string, customer_name : string, customer_email : string, customer_phone : string) {
        this.invoice_id = invoice_id;
        this.customer_name = customer_name;
        this.customer_email = customer_email;
        this.customer_phone = customer_phone;

        this.item_list = {};
        this.order_complete_instructions = order_instructions;

        this.doc = new jsPDF({
            unit: "px",
        });

        this.thePackage = undefined;
    }

    setPackage(thePackage: PackageData) {
        this.thePackage = thePackage;
    }

    setCart(cart: ShoppingCartType) {
        this.item_list = cart;
    }

    private getCommaSeparatedNumber(number : number) : string {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    private generateInvoice() : void {
        const table_cell_height = 16;

        let y_position = 60;

        const invoice_header_config : CellConfig[] = [
            { name: "item", prompt: "Item", width: 380, align: "left", padding: 0},
            { name: "color", prompt: "Color", width: 60, align: "center", padding: 0},
            { name: "size", prompt: "Size", width: 60, align: "center", padding: 0},
            { name: "quantity", prompt: "Qnt.", width: 40, align: "center", padding: 0},
        ];

        const invoice_table_config = {
            fontSize: 11,
            headerBackgroundColor: "#dddddd",
        };

        const item_list = [];

        for (let key in this.item_list) {
            const item = this.thePackage?.items.find((i) => i.id == Number(key));
            const size = this.item_list[key].size ? this.item_list[key].size : "N/A";
            const color = this.item_list[key].color ? this.item_list[key].color : "N/A";
            const quantity = this.item_list[key].quantity;

            item_list.push({
                item: `${item?.name}`,
                size: `${size}`,
                color: `${color}`,
                quantity: `${quantity}`,
            });
        }

        this.doc.setFont("Times", "", "Bold");
        this.doc.setFontSize(24);
        this.doc.text("Invoice", 20, 30);
        this.doc.addImage("/codesprint-invoice-logo.jpg", "JPEG", 300, 19, 130, 10);

        this.doc.setFont("Helvetica", "", "Bold");
        this.doc.setFontSize(12);
        this.doc.text("Transaction ID:", 20, y_position);

        this.doc.setFont("Helvetica", "", "");
        this.doc.setFontSize(12);

        this.doc.text(`${this.invoice_id}`, 90, y_position);

        this.doc.setFont("Helvetica", "", "Bold");
        this.doc.setFontSize(12);
        y_position += 20;
        this.doc.text("Customer:", 20, y_position);

        this.doc.setFontSize(11);
        this.doc.setFont("Helvetica", "", "");
        y_position += 13;

        this.doc.text(this.customer_name, 20, y_position); // User name
        y_position += 15;
        this.doc.text(this.customer_phone, 20, y_position); // User email
        y_position += 10;
        this.doc.text(this.customer_email, 20, y_position); // User phone number
        y_position += 20;

        this.doc.setFont("Helvetica", "", "");
        this.doc.setFontSize(12);
        this.doc.text("Package", 20, y_position);
        this.doc.text(":", 58, y_position);
        this.doc.setFont("Helvetica", "", "Bold");
        this.doc.text(this.thePackage!.name, 63, y_position);
        y_position += 10;

        this.doc.setFont("Helvetica", "", "");
        this.doc.setFontSize(12);
        this.doc.text("Price", 20, y_position);
        this.doc.text(":", 58, y_position);
        this.doc.setFont("Helvetica", "", "Bold");
        this.doc.text(`${this.thePackage!.price} LKR`, 63, y_position);
        y_position += 20;

        this.doc.table(20, y_position, item_list, invoice_header_config, invoice_table_config);
        y_position += 30; // Table header
        y_position += (table_cell_height * item_list.length);
        y_position += 10; // Margin

        // Total
        this.doc.setFont("Helvetica", "", "Bold");
        this.doc.setFontSize(15);

        // this.doc.text(`Total: ${this.getCommaSeparatedNumber(total_price)} LKR`, 430, y_position, { align: "right" });

        y_position += 10;
        this.doc.line(20, y_position, 430, y_position);

        this.doc.setFont("Times", "", "");
        this.doc.setFontSize(11);

        const text_lines = this.doc.splitTextToSize(this.order_complete_instructions, 400);
        y_position += 20;
        this.doc.text(text_lines, 20, y_position, { align: "left" });
    }

    downloadInvoice() : Blob {
        this.generateInvoice();
        return this.doc.output('blob');
    }
}