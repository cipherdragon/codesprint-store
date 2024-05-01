import { Metadata } from "next";
import React from "react";

import { Packages as package_list } from "@/db/Packages";

import styles from "../styles/Home.module.css"
import PackageCard from "@/components/PackageCard";

export const metadata : Metadata = {
    title: "Codesprint Store",
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
                <div className="mb-[30p]">
                    STEPS!!!
                </div>

                {/* This is for git */}
                <div className="bg-red-400">
                    Hello
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
