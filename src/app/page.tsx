import { Metadata } from "next";
import React from "react";

import { Packages as package_list } from "@/db/Packages";

import styles from "../styles/Home.module.css"
import PackageCard from "@/components/PackageCard";
import StoreClosingTimer from "@/components/StoreClosingTimer";

export const metadata : Metadata = {
    title: "CodeSprint Store",
}

export default function Home() {
    const packages = package_list.map((pkg) => {
        return (
            <PackageCard key={pkg.id} data={pkg} />
        )
    })

    return (
        <>
        <section className="proper-padded-container">
            <div className="bg-[url('/hero-mobile.webp')] sm:bg-[url('/hero-desktop.webp')] w-full h-screen 
                    absolute top-0 left-0 bg-cover bg-center" />
            <div className={styles.hero}>
                <h1 className="font-black text-4xl sm:text-5xl text-center max-w-[700px] text-white">
                    <span className="text-teal-500">Explore&nbsp;</span>
                    the Celestial Collection of 
                    <span className="text-teal-500">&nbsp;CodeSprint 8</span>
                </h1>
            </div>
        </section>
        <section
            className="proper-padded-container">
                <StoreClosingTimer />

                <div className="mx-auto w-full">
                    <div className="p-10 rounded-2xl bg-teal-300 bg-opacity-10 border border-white border-opacity-30 backdrop-blur-md shadow-lg shadow-neutral-900 my-6 flex flex-col items-center space-y-4">
                            <p className="font-bold text-xl w-full text-white">
                                Looking for the payment confirmation form?&nbsp;
                                <a href="https://codesprint.lk/store-checkout" 
                                    className="text-teal-300 underline">
                                    Click here
                                </a>
                            </p>
                            <p className="font-bold">
                                Note: We are about to close the store. All payments must be made before
                                midnight, 3rd June 2024. Any payments made after will be refunded
                                and orders will not be considered.
                            </p>
                    </div>
                </div>

                <div className="bg-white bg-opacity-5 border border-white 
                    border-opacity-15 backdrop-blur-md rounded-2xl">
                    <h2 className="p-[50px] text-4xl font-bold text-center py-6 text-white">
                        Packages
                    </h2>
                    <div className="mx-auto w-fit flex gap-[20px] mt-[30px]
                        flex-wrap items-center justify-center text-white">
                        { packages }
                    </div>
                </div>
        </section>
        </>
    );
}
