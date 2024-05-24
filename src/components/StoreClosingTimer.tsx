"use client";

import { useState } from "react";

export default function StoreClosingTimer() {
    const [timeLeft, setTimeLeft] = useState("00:00:00:00");
    const deadline = new Date("June 06, 2024 00:00:00").getTime();

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        let difference = (deadline - now) / 1000;

        const seconds_per_day = 60 * 60 * 24;
        const seconds_per_hour = 60 * 60;
        const seconds_per_minute = 60;

        const days = Math.floor(difference / seconds_per_day);
        difference -= days * seconds_per_day;

        const hours = Math.floor(difference / seconds_per_hour);
        difference -= hours * seconds_per_hour;

        const minutes = Math.floor(difference / seconds_per_minute);
        difference -= minutes * seconds_per_minute;

        const seconds = Math.floor(difference);

        setTimeLeft(`
            ${days.toString().padStart(2, '0')}:
            ${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}
        `);
    };

    setInterval(calculateTimeLeft, 1000);

    if ((new Date().getTime()) > deadline) return <></>
    return (
        <div className="bg-red-800 border bg-opacity-40 
            border-red-500 border-opacity-60 rounded-lg p-3 mb-[20px]
            backdrop-blur-md">
            <h2 className="text-center font-bold text-2xl text-white">
                Hurry Up!
            </h2>
            <h3 className="text-center font-bold text-lg mb-[15px] text-white">
                We will be closing soon.
            </h3>
            <h3 className="font-bold text-white text-center">
                {timeLeft}
            </h3>
            <h3 className="font-bold text-neutral-300 text-center">
                Closing on June 5th, 2024!
            </h3>
        </div>
    )
}