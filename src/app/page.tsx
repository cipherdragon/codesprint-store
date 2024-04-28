import { Metadata } from "next";
import React from "react";

import { Packages as package_list } from "@/db/Packages";
import {Items as items_list} from "@/db/Items";

import styles from "../styles/Home.module.css"
import PackageCard from "@/components/PackageCard";
import ItemCard from "@/components/ItemCard";

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
            <div className={styles.hero}></div>
        </section>
        <section
            className="proper-padded-container">
                <div className="bg-[#ffffff22] rounded-2xl">
                    <h2 className="p-[50px] text-4xl font-bold text-center py-6">
                        Packages
                    </h2>
                    <div className="mx-auto w-fit flex gap-[20px] mt-[30px]
                        flex-wrap items-center justify-center">
                        { packages }
                    </div>
                </div>
        </section>
        </>
    );
}
