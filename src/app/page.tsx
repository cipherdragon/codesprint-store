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
                <div className="mx-auto w-full">
                    <div className="p-4 rounded-lg bg-red-700 bg-opacity-40 border border-red-400 border-opacity-50 backdrop-blur-md shadow-lg shadow-neutral-900 my-6">
                            <h2 className="text-center text-2xl font-bold mb-[20px]">Store is closed!</h2>
                            <p className="font-bold max-w-[600px] text-center mx-auto">
                                Codesprint merch store is officially closed now.
                                We are no longer accepting orders.  Any payments
                                made from now on will be refunded. 
                            </p>
                            <p className="font-bold max-w-[600px] text-center mx-auto mt-[20px]">
                                Website&apos;s functionality is maintained only for archival
                                purposes.
                            </p>
                            <p className="font-bold max-w-[600px] text-center mx-auto mt-[20px]">
                                Thank you for your support! 
                            </p>
                            <p className="font-bold max-w-[600px] text-center mx-auto mt-[20px]">
                                If you accidentally made a payment after the deadline, please submit your
                                proof of payment to the&nbsp;
                                <a href="https://codesprint.lk/store-refund" 
                                    className="text-teal-300 underline">
                                        payment refund form
                                </a>
                                &nbsp;to claim a refund.
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
