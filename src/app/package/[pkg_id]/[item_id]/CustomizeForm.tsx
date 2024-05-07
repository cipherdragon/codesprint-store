"use client";

import ItemData from "@/types/ItemData";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import Image from "next/image";
import SizeChart_T from "@/assets/size_chart_t.webp";
import SizeChart_H from "@/assets/size_chart_h.webp";
import PackageData from "@/types/PackageData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { addItem, loadCart, saveCart, setPackage } from "@/db/ShoppingCart";
import { toast } from "sonner";

type CustomizeFormProps = { thePackage: PackageData, item: ItemData }

export default function CustomizeForm({ thePackage, item } : CustomizeFormProps) {
    const item_index = thePackage.items.findIndex((i) => i.id === item.id);
    const next_item = item_index < thePackage.items.length - 1 ?
        thePackage.items[item_index + 1] : undefined;

    const is_clothing = item.colors.length > 0 && 
                        item.sizes.length > 0;
    const is_color_diversed = item.colors.length > 0;

    const [selectedColor, setOnColorChange] = useState<string>("");
    const [selectedSize, setOnSizeChange] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        setPackage(thePackage.id);

        if (!loadCart(item.id, thePackage.id)) {
            router.push(`/package/${thePackage.id}`);
        }
    }, []);

    const onCustomize = () => {
        if (is_clothing && (!selectedColor || !selectedSize)) {
            let message = "";

            if (!selectedColor && !selectedSize) 
                message = "Please select the size and color";
            else if (!selectedColor)
                message = "Please select a color";
            else if (!selectedSize)
                message = "Please select a size";

            toast.error(message);
            return;
        }

        if (is_color_diversed && !selectedColor) {
            toast.error("Please select a color");
            return;
        }

        const size = selectedSize ? selectedSize : "N/A";
        const color = selectedColor ? selectedColor : "N/A";

        // Save the customization
        setPackage(thePackage.id);
        addItem(item.id, size, color, 1);
        saveCart();

        // Redirect to next item or checkout
        const next_url = next_item ? 
            `/package/${thePackage.id}/${next_item.id}` : 
            `/package/${thePackage.id}/checkout`;
        
        router.push(next_url);
    }

    return (
        <div className="p-3 pt-[20px]">
            <h3 className="text-white text-3xl font-bold mb-[50px] text-center mobile:text-start">
                {item.name}
            </h3>
            <div className="grid grid-cols-[75px_auto] gap-3 items-center">
                <p className="font-bold text-lg w-[50px] text-white"
                    style={!is_color_diversed && {display: "none"} || {}}>
                    Color
                </p>
                <ColorSelector 
                    item={item} 
                    selectedColor={selectedColor}
                    onColorChange={setOnColorChange} />

                {
                    item.material &&
                        <p className="font-bold text-lg w-[50px] text-white"
                            style={!is_clothing && {display: "none"} || {}}>
                            Material
                        </p>
                }
                {
                    item.material &&
                        <p className="font-normal ml-[2px] text-lg text-start text-neutral-100"
                            style={!is_clothing && {display: "none"} || {}}>
                            {item.material}
                        </p>
                }

                <p className="font-bold text-lg w-[50px] text-white"
                    style={!is_clothing && {display: "none"} || {}}>
                    Size
                </p>
                <div className="ml-[3px]"
                    style={!is_clothing && {display: "none"} || {}}>
                    <SizeSelector 
                        item={item} 
                        selectedSize={selectedSize}
                        onSizeChange={setOnSizeChange} />
                </div>

                <Image 
                    src={item.name === "Adventurer Hoodie" ? SizeChart_H : SizeChart_T} 
                    alt="Size chart"
                    className="col-span-2 mt-[20px] rounded-3xl"
                    style={!is_clothing && {display: "none"} || {}} />
            </div>

            <button 
                onClick={onCustomize}
                className="bg-teal-600 mt-[50px] w-full p-3 rounded-xl
                    font-black text-lg text-white">
                { next_item ? 
                    "Grab & Go To Next" :
                    "Grab & Checkout" }
            </button>
        </div>
    );
}