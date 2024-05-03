"use client";

import ItemData from "@/types/ItemData";
import { useState } from "react";

interface ItemPreviewProps {
    item: ItemData;
}

export default function ItemPreview({ item }: ItemPreviewProps) {
    const [thumbIndex, setThumbIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [swipeStart, setSwipeStart] = useState(0);

    const thumbnails = item.thumbnail.map((src, index) => 
        <img key={index} src={src} alt={item.name} width={60} height={60}
            className={`max-w-[60px] max-h-[60px] object-cover rounded-lg
                border-2 border-green-800 cursor-pointer
                ${index === thumbIndex && "!border-green-400 !max-sm:bg-green-400"}
                max-sm:h-[3px] max-sm:bg-greeen-800 overflow-hidden max-sm:rounded-none`}
            onClick={_ => setThumbIndex(index)} />
    );

    type SwipGuestureParam = React.TouchEvent<HTMLImageElement> | 
        React.MouseEvent<HTMLImageElement>

    const swipeGuesture = (e : SwipGuestureParam) => {
        e.preventDefault();

        let clientX = ("touches" in e && e.touches.length) ? 
            e.touches[0].clientX : ((e as any).clientX ?? 0);

        const controlEvents = ["mousedown", "mouseup", "mouseleave", "touchstart", "touchend"];
        if (controlEvents.includes(e.type)) {
            setIsDragging(e.type === "mousedown" || e.type === "touchstart");
            setSwipeStart(clientX - e.currentTarget.x);
            return;
        }
        
        if (!isDragging) return;

        const x = clientX - e.currentTarget.x;
        const swipe = (x - swipeStart) * 100 / e.currentTarget.width;

        const direction = swipe < 0 ? 1 : -1; // Left -1, Right 1

        if (direction === -1 && thumbIndex < 1) return;
        if (direction === 1 && thumbIndex >= item.thumbnail.length - 1) return;

        const shouldSwipe = Math.abs(swipe) > 20;

        if (!shouldSwipe) return;
        
        setThumbIndex(thumbIndex + direction);
        setIsDragging(false);
    }

    return (
        <>
            <div className="flex gap-3 items-center bg-[#36c0a9]
                rounded-xl p-[10px] box-border
                backdrop-blur-md bg-opacity-20 border border-[#36c0a9]
                border-opacity-30 shadow-lg shadow-[#000000a6]
                min-[620px]:translate-x-[-80px] min-[620px]:translate-y-[50px]
                min-[620px]:max-w-[350px] min-[620px]:w-max w-full 
                max-[620px]:mb-[20px] justify-between max-sm:!bg-opacity-0
                max-sm:!border-none max-sm:!shadow-none max-sm:!justify-center">
                    { thumbnails }
            </div>
            <img
                src={item.thumbnail[thumbIndex]} 
                alt={item.name} 
                width={400} 
                height={400}
                className={`max-w-[400px] max-h-[400px] object-cover rounded-3xl
                    max-[620px]:w-[300px] max-[620px]:h-[300px]
                    ${thumbnails.length > 1 && "cursor-grab" || ""}`}
                onDragStart={e => e.preventDefault()}
                onMouseDown={swipeGuesture}
                onMouseMove={swipeGuesture}
                onMouseUp={swipeGuesture}
                onMouseLeave={swipeGuesture}
                onTouchStart={swipeGuesture}
                onTouchEnd={swipeGuesture}
                onTouchMove={swipeGuesture} />
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