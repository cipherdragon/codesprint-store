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
    const package_cards = package_list.map(packageItem => 
        <PackageCard data={packageItem} key={packageItem.id} />
    );

    const item_cards = items_list.map(item =>
        <ItemCard data={item} key={item.id} />
    );

    const dull_package_card = 
        <div className="pointer-events-none invisible min-[1248px]:hidden">
            <PackageCard data={package_list[0]} />
        </div>

    return (
        <>
        <section className="proper-padded-container">
            <div className={styles.hero}></div>
        </section>
        <section
            className="proper-padded-container">
            <div>
                <h2 className="text-3xl mb-[5px] text-center text-neutral-200">
                    Save with Packages
                </h2>
                <div className="thin-line mb-[30px]"></div>

                <div 
                    className="flex gap-5 gap-y-7 justify-center flex-wrap
                        max-w-[550px] mx-auto min-[660px]:max-w-[590px] min-[1248px]:max-w-fit">
                    { package_cards }
                    { package_cards.length % 2 === 0 ? null : dull_package_card }
                </div>
            </div>
            <div className="mt-[30px] min-[680px]:mt-[70px]">
                <h2 className="text-3xl mb-[5px] text-center text-neutral-200">
                    Buy what you want! 
                </h2>
                <div className="thin-line mb-[30px]"></div>

                <div 
                    className="flex gap-5 gap-y-5 justify-center flex-wrap
                        max-w-[550px] mx-auto min-[660px]:max-w-[590px] min-[1248px]:max-w-fit">
                    { item_cards }
                </div>
            </div>
            <div className="h-[30px]"></div>
        </section>
        </>
    );
}
