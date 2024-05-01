"use client"

import ItemData from "@/types/ItemData";
import { useEffect, useState } from "react";

interface ColorSelectorProps {
    item: ItemData;
    selectedSize: string;
    onSizeChange: (size: string) => void;
}

export default function SizeSelector(props : ColorSelectorProps) {
    const { item, onSizeChange, selectedSize } = props;

    useEffect(() => {
        if (item.sizes.length == 1) {
            onSizeChange(item.sizes[0])
        } 
    }, [])

    return (
        <div className="flex gap-[15px] flex-wrap">
            {item.sizes.map((size) => 
                <div 
                    key={size} 
                    onClick={() => onSizeChange(size)}
                    className={`w-[75px] h-[45px] rounded-lg cursor-pointer
                        flex items-center justify-center text-white font-bold
                        border border-white border-opacity-20
                        ${size === selectedSize ? 'bg-teal-500' : 'bg-white bg-opacity-10'}`}>
                        { size }
                </div>
            )}
        </div>
    );
}
