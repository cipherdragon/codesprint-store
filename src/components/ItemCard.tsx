import type ItemData from "@/types/ItemData";
import React from "react";

export default function ItemCard({ data }: { data : ItemData }) {
    const color_squares = data.colors.map((color) => {
        const palette_size = 15;

        return (
            <div 
                className="color_palette border border-neutral-300" 
                style={{ 
                    width: `${palette_size}px`,
                    height: `${palette_size}px`,
                    backgroundColor: `${color}`
                } as React.CSSProperties }>
            </div>
        );
    });

    return (
        <div className="max-w-[282px] w-fit box-border p-4 rounded-2xl">
            <div 
                className="w-[250px] h-[300px] bg-cover bg-center rounded-lg" 
                style={{ backgroundImage: `url(${data.thumbnail})`}}>
            </div>
            <h2 className="text-left mt-3 font-bold text-xl">
                {data.name}
            </h2>
            <span className="text-left w-full block mt-2">
                {data.price.toLocaleString('en-US')} LKR
            </span>
            <div className="flex items-center justify-start gap-1 py-1 pt-0">
                <span className="mr-[10px]">Colors:</span> 
                { color_squares }
            </div>
                <button className="text-sm underline underline-offset-2 mt-2">
                    <i>Customize & Grab</i>
                </button>
        </div>
    );
}