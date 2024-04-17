import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Codesprint Merch Store",
    description: "Official Merchandise store fore Codesprint 8.0",
};

type RootLayoutProps = Readonly<{ children: React.ReactNode; }>;

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SiteHeader />
                {children}
            </body>
        </html>
    );
}
