"use client";

import ItemData from "@/types/ItemData";
import { useState } from "react";

interface ItemPreviewProps {
    item: ItemData;
}

export default function ItemPreview({ item }: ItemPreviewProps) {
    const [thumbIndex, setThumbIndex] = useState(0);

    const thumbnails = item.thumbnail.map((src, index) => 
        <img key={index} src={src} alt={item.name} width={60} height={60}
            className={`max-w-[60px] max-h-[60px] object-cover rounded-lg
                border-2 border-green-900 cursor-pointer
                ${index === thumbIndex && "!border-green-400"}`}
            onClick={_ => setThumbIndex(index)} />
    );

    return (
        <>
            <div className="flex gap-3 items-center bg-[#36c0a9]
                rounded-xl p-[10px] box-border
                backdrop-blur-md bg-opacity-20 border border-[#36c0a9]
                border-opacity-30 shadow-lg shadow-[#000000a6]
                min-[620px]:translate-x-[-80px] min-[620px]:translate-y-[50px]
                min-[620px]:max-w-[350px] min-[620px]:w-max w-full 
                max-[620px]:mb-[20px] justify-between">
                    { thumbnails }
            </div>
            <img
                src={item.thumbnail[thumbIndex]} 
                alt={item.name} 
                width={400} 
                height={400}
                className="max-w-[400px] max-h-[400px] object-cover rounded-3xl
                    max-[620px]:w-[300px] max-[620px]:h-[300px]" />
            <h2 
                className="bg-[#36c0a9] bg-opacity-50 border border-[#36c0a9] 
                backdrop-blur-md shadow-md shadow-[#000000a6]
                w-full mx-auto text-center font-bold text-xl
                rounded-xl p-3 max-[620px]:mt-[20px]
                min-[620px]:translate-y-[-30px] min-[620px]:translate-x-[30px] text-white">
                {item.name}
            </h2>
        </>
    )
}