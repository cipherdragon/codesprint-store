import { Packages as pkg_list } from "@/db/Packages";
import ItemData from "@/types/ItemData";
import { notFound } from "next/navigation";
import CustomizeForm from "./CustomizeForm";
import ItemPreview from "./ItemPreview";

interface PackagePageProps {
    params: {
        pkg_id: string;
        item_id: string;
    }
}

export default function PackagePage(props: PackagePageProps) {
    const { pkg_id, item_id } = props.params;
    const pkg = pkg_list.find((pkg) => pkg.id === +pkg_id);
    const item_index = pkg!.items.findIndex((item) => item.id === +item_id);
    const item = pkg!.items[item_index];

    // Layout file is rendered first and it will redirect to 404 if pkg or item
    // is not found. Hence, following check is only to satisty ts-compilier.
    if (!pkg || item_index === undefined || !item) {
        return notFound();
    }

    return (
        <div className="flex flex-wrap justify-between items-center gap-[20px]">
            <div className="p-3 max-[620px]:w-full rounded-3xl 
               max-[620px]:bg-white max-[620px]:bg-opacity-10 
               max-[620px]:backdrop-blur-sm max-[620px]:py-[30px]
               max-[620px]:border border-white border-opacity-20">
                <div className="w-fit min-[620px]:pl-[80px] min-[620px]:pr-[30px] mx-auto">
                    <ItemPreview item={item} />
                </div>
            </div>

            <div 
                className="bg-white bg-opacity-10 backdrop-blur-sm border border-white
                    border-opacity-15 shadow-lg shadow-neutral-900 rounded-2xl 
                    overflow-hidden grow min-w-[300px] max-w-[500px]">
                <div 
                    className="bg-white bg-opacity-10 text-center shadow-md
                        drop-shadow-md border-b border-opacity-20 border-white">
                    <div className="p-3 font-bold text-lg opacity-90 text-white">
                        { pkg?.name }
                    </div>
                    <hr className="border-0 border-b border-b-white opacity-20"/>
                    <div className="text-sm p-1 font-bold opacity-40 text-white">
                        Item {item_index! + 1} of {pkg.items.length}
                    </div>
                    <hr className="border-0 border-b border-b-white opacity-20"/>
                    <CustomizeForm item={item} thePackage={pkg} />
                </div>
            </div>
        </div>
    );
}