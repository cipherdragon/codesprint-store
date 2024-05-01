import { Metadata } from "next";
import React from "react";

import { Packages as package_list } from "@/db/Packages";

import styles from "../styles/Home.module.css"
import PackageCard from "@/components/PackageCard";
import EarlyBirdTimer from "@/components/EarlyBirdTimer";

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
                <div className="p-10 rounded-2xl bg-gradient-to-r bg-opacity-10 border border-white border-opacity-15 backdrop-blur-md shadow-lg shadow-neutral-900 my-6 flex flex-col items-center space-y-4">
                    <h2 className="text-center text-4xl font-bold text-white pb-4">Steps to Purchase</h2>
                    <ol className="list-decimal list-inside space-y-2 text-white text-xl">
                        <li>Choose your desired package from the Celestial Collection.</li>
                        <li>Customize the size and color to your preference.</li>
                        <li>Proceed to checkout by clicking &quot;Next.&quot;</li>
                        <li>Download the invoice for your purchase.</li>
                        <li>Fill out the form with your invoice details and attach the bank receipt.</li>
                        <li>You&apos;re all set! You can now go home and place another order.</li>
                    </ol>
                </div>
            </div>
                {/* This is for git */}
                <EarlyBirdTimer />

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
