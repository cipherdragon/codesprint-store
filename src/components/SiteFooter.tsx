import Image from "next/image";
import codesprintLogo from "../assets/codesprint-logo.webp";
import { Facebook, Instagram, Linkedin, Youtube } from "react-feather";
import { useEffect } from "react";

export default function SiteFooter() {
    return (
        <footer className="proper-padded-container">
            <div
                className="bg-white bg-opacity-5 backdrop-blur-md border border-white
                    border-opacity-15 my-[20px] xsm:my-[30px] rounded-2xl">
                <div className="max-w-6xl mx-auto px-4 py-10 md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Image
                            src={codesprintLogo}
                            alt="Codesprint Logo"
                            className="max-h-[25px] w-[160px] min-[400px]:w-[200px]"
                        />
                        <div className="mt-4 space-y-4">
                            <h3 className="text-lg font-bold text-[#15c392]
                                text-opacity-50">
                                Merch Store
                            </h3>
                            <ul className="font-bold text-white text-opacity-40">
                                <li>
                                    <a href="#" className="hover:underline">
                                        T-shirt
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Hoodie
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Wrist Band
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Notebook
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-[#15c392]">SUPPORT</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="hover:underline">
                                    Payment Details
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-[#15c392]">ABOUT US</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="https://codesprint.lk/" className="hover:underline">
                                    Main website
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline"></a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline"></a>
                            </li>
                        </ul>
                    </div>

                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-semibold text-[#15c392]">CONTACT US</h3>
                        <div className="mt-4 space-y-4">
                            <p>📞 +94 76 668 4337</p>
                            <p>✉️ kavishcan2002@gmail.com</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-[#15c392]">
                                FOLLOW US
                            </h3>
                            <div className="flex space-x-4 mt-2">
                                {/* Replace with actual links and icons */}
                                <a
                                    href="https://web.facebook.com/CodeSprint"
                                    className="hover:underline"
                                >
                                    <Facebook className="cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]" />
                                </a>
                                <a
                                    href="https://www.instagram.com/codesprintlk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw"
                                    className="hover:underline"
                                >
                                    <Instagram className="cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/codesprintlk/"
                                    className="hover:underline"
                                >
                                    <Linkedin className="cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@ieeesbiit"
                                    className="hover:underline"
                                >
                                    <Youtube className="cursor-pointer w-[20px] xsm:w-[30px] xsm:h-[30px]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 text-center py-4">
                    <p>© CODESPRINT MERCH STORE - Powered by Web Team</p>
                </div>
            </div>
        </footer>
    );
}
