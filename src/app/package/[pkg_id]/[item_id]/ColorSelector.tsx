"use client"

import ItemData from "@/types/ItemData";
import { useEffect, useState } from "react";

interface ColorSelectorProps {
    item: ItemData,
}

export default function ColorSelector({ item }: ColorSelectorProps) {
    const [selectedColor, setSelectedColor] = useState<string>();

    useEffect(() => {
        if (item.colors.length == 1) {
            setSelectedColor(item.colors[0])
        } 
    }, [])

    return (
        <div className="flex gap-2">
            {item.colors.map((color) => 
                <div 
                    key={color} 
                    className={`w-[80px] h-[50px] rounded-lg border-2 p-[2px] cursor-pointer
                        ${color === selectedColor ? 'border-teal-200' : 'border-transparent'}`}
                    onClick={() => setSelectedColor(color)}>
                    <div 
                        className="w-full h-full rounded-md"
                        style={{ backgroundColor: color }} />
                </div>
            )}
        </div>
    );
}
