import { Packages as pkg_list } from "@/db/Packages";
import { log } from "console";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";

type RootLayoutProps = Readonly<{ 
    children: React.ReactNode, 
    params: { pkg_id: string, item_id: string } 
}>;

export default function PackagePageLayout({ children, params }: RootLayoutProps) {
    const pkg = pkg_list.find((pkg) => pkg.id === +params.pkg_id);
    const item_index = pkg && pkg.items.findIndex((item) => item.id === +params.item_id);

    if (!pkg || item_index === undefined || item_index === -1) {
        return notFound();
    }

    return (
        <section className="proper-padded-container">
            <Toaster position="bottom-right" richColors expand={false} />
            { children }
        </section>
    );
}