"use client";

import { getPackage, getItems, ShoppingCartType } from "@/db/ShoppingCart";
import { useRouter } from "next/navigation";

import { Packages as pkg_list } from "@/db/Packages";
import { Download } from "react-feather";

import PersonalDataForm from "./PersonalDataForm";
import { useEffect, useState } from "react";
import PackageData from "@/types/PackageData";
import { PackageInvoice } from "@/util/invoice/PackageInvoice";

export default function CheckoutPage() {
    const [thePackage, setThePackage] = useState<PackageData>();
    const [items, setItems] = useState<ShoppingCartType>({});
    const router = useRouter();

    useEffect(() => {
        let package_id = getPackage();
        let thePackage = pkg_list.find((p) => p.id === package_id);
        let items = getItems();

        if (!thePackage || !Object.keys(items).length) {
            const shopping_cart = localStorage.getItem("shopping_cart");

            if (shopping_cart) {
                const cart = JSON.parse(shopping_cart);

                package_id = cart.package_id;
                thePackage = pkg_list.find((p) => p.id === package_id);
                items = cart.items;
            }
        }

        if (!thePackage || !Object.keys(items).length) {
            alert("Sorry, an error occurred. Please try again in a minute :-(");

            router.push("/");
            return;
        }

        localStorage.removeItem("shopping_cart");
        localStorage.setItem("shopping_cart", JSON.stringify({
            package_id: package_id,
            items: items
        }));

        setThePackage(thePackage);
        setItems(items);
    }, [])

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const item_list = [];
    
    if (!thePackage || !Object.keys(items).length) return <></>;

    for (let key in items) {
        const item = thePackage.items.find((i) => i.id == Number(key));
        const size = items[key].size ? `(${items[key].size})` : "";
        const color = items[key].color ? `(${items[key].color})` : "";
        const quantity = items[key].quantity;

        const li_item = <li key={key}>[x{quantity}] {item?.name} {size} {color}</li>
        item_list.push(li_item);
    }

    const onInvoiceDownload = () => {
        const invoice = new PackageInvoice("INV-123", fullName, email, phone);
        invoice.setPackage(thePackage!);
        invoice.setCart(items);

        invoice.downloadInvoice();
    }

    return (
        <div className="proper-padded-container">
            <PersonalDataForm 
                email={email} 
                onEmailChange={setEmail}
                fullName={fullName}
                onFullNameChange={setFullName}
                phone={phone}
                onPhoneChange={setPhone}
                address={address}
                onAddressChange={setAddress} />

            <div 
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl 
                    border border-white border-opacity-15 overflow-hidden
                    bg-[url('/checkout-img-2.webp')] bg-cover bg-center">

                <div 
                    className="max-w-[440px] p-3 bg-white 
                        bg-opacity-10 backdrop-blur-md border-r border-white border-opacity-15">
                    <h1
                        className="font-bold text-2xl mb-[20px]">
                        Let&rsquo;s place your order!
                    </h1>
                    
                    <h2 className="mb-[20px]">
                        Here&rsquo;s the summary of your order:
                    </h2>

                    <div className="border-dashed border-2 border-white 
                        border-opacity-50 w-fit p-3 mb-[20px]">
                        <div className="mb-[20px]">
                            <span className="w-[70px] inline-block">Package</span>:
                            <span className="inline-block ms-[20px] font-bold">{thePackage.name}</span> <br />

                            <span className="w-[70px] inline-block">Price</span>:
                            <span className="inline-block ms-[20px] font-bold">{thePackage.price} LKR</span> <br />
                        </div>
                        <ol className="list-decimal list-inside">
                            {item_list}
                        </ol>
                    </div>
                    <div className="text-lg w-full">
                        <p className="font-bold mb-[10px]">IMPORTANT!</p>
                        <p className="mb-[20px]">
                            To complete the order, please download your invoice below.
                            Then deposit the total amount to the following bank account
                            and submit both invoice and the deposit slip to the form given
                            below.
                        </p>
                        <p className="leading-6 text-base font-bold mb-[30px]">
                            Bank: Bank of Ceylon <br />
                            Account Number: 1234567890 <br />
                            Account Name: Your Name <br />
                            Branch: Colombo
                        </p>
                    </div>
                    <button 
                        onClick={onInvoiceDownload}
                        className="bg-teal-600 w-full font-bold p-3
                            rounded-lg flex justify-center gap-3">
                        Dowload invoice <Download />
                    </button>
                </div>
            </div>
        </div>
    );
}