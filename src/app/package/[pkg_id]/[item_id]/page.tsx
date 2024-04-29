import { Packages as pkg_list } from "@/db/Packages";
import ItemData from "@/types/ItemData";
import { notFound } from "next/navigation";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import SizeChart_T from "@/assets/size_chart_t.webp";
import Image from "next/image";

interface PackagePageProps {
    params: {
        pkg_id: string;
        item_id: string;
    }
}

function ThumbnailPanel({ item, className }: { item: ItemData, className?: string }) {
    return (
        <div 
            className={className ? className : ""}>
            <img
                src={item.thumbnail} 
                alt={item.name} 
                width={60} 
                height={60}
                className="max-w-[60px] max-h-[60px] object-cover rounded-lg
                    border-2 border-green-900" />
            <img
                src={item.thumbnail} 
                alt={item.name} 
                width={60} 
                height={60}
                className="max-w-[60px] max-h-[60px] object-cover rounded-lg
                    border-2 border-neutral-400" />
            <img
                src={item.thumbnail} 
                alt={item.name} 
                width={60} 
                height={60}
                className="max-w-[60px] max-h-[60px] object-cover rounded-lg
                    border-2 border-neutral-400" />
        </div>
    );
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

    const is_clothing = pkg.items[item_index].colors.length > 0 && 
                        pkg.items[item_index].sizes.length > 0;
    const is_color_diversed = pkg.items[item_index].colors.length > 0;

    return (
        <div className="flex flex-wrap justify-between items-center gap-[20px]">
            <div className="p-3 max-[620px]:w-full rounded-3xl 
               max-[620px]:bg-white max-[620px]:bg-opacity-10 
               max-[620px]:backdrop-blur-sm max-[620px]:py-[30px]
               max-[620px]:border border-white border-opacity-20">
                <div className="w-fit min-[620px]:pl-[80px] min-[620px]:pr-[30px] mx-auto">
                    <ThumbnailPanel
                        item={item}
                        className="flex gap-3 items-center bg-[#36c0a9]
                            rounded-xl p-[10px] box-border
                            backdrop-blur-md bg-opacity-20 border border-[#36c0a9]
                            border-opacity-30 shadow-lg shadow-[#000000a6]
                            min-[620px]:translate-x-[-80px] min-[620px]:translate-y-[50px]
                            min-[620px]:max-w-[350px] min-[620px]:w-max w-full 
                            max-[620px]:mb-[20px] justify-between" />
                    <img
                        src={item.thumbnail} 
                        alt={item.name} 
                        width={400} 
                        height={400}
                        className="max-w-[400px] max-h-[400px] object-cover rounded-3xl
                            max-[620px]:w-[300px] max-[620px]:h-[300px]" />
                    <h2 
                        className="bg-[#36c0a9] bg-opacity-50 border border-[#36c0a9] 
                        backdrop-blur-md shadow-md shadow-[#000000a6]
                        w-full mx-auto text-center font-bold text-xl text-opacity-55
                        rounded-xl p-3 max-[620px]:mt-[20px]
                        min-[620px]:translate-y-[-30px] min-[620px]:translate-x-[30px]">
                        {item.name}
                    </h2>
                </div>
            </div>

            <div 
                className="bg-white bg-opacity-10 backdrop-blur-sm border border-white
                    border-opacity-15 shadow-lg shadow-neutral-900 rounded-2xl 
                    overflow-hidden grow min-w-[300px] max-w-[500px]">
                <div 
                    className="bg-white bg-opacity-10 text-center shadow-md
                        drop-shadow-md border-b border-opacity-20 border-white">
                    <div className="p-3 font-bold text-lg opacity-90">
                        { pkg?.name }
                    </div>
                    <hr className="border-0 border-b border-b-white opacity-20"/>
                    <div className="text-sm p-1 font-bold opacity-40">
                        Item {item_index! + 1} of {pkg.items.length}
                    </div>
                </div>
                <div className="p-3 pt-[20px]">
                    <h3 className="text-3xl font-bold mb-[50px] text-center mobile:text-start">
                        {item.name}
                    </h3>
                    <div className="grid grid-cols-[50px_auto] gap-3 items-center">
                        <p className="font-bold text-lg w-[50px]">
                            Color
                        </p>
                        <ColorSelector item={item} />
                        <p className="font-bold text-lg w-[50px]">
                            Size
                        </p>
                        <div className="ml-[3px]">
                            <SizeSelector item={item} />
                        </div>
                        <Image 
                            src={SizeChart_T} 
                            alt="Size chart"
                            className="col-span-2 mt-[20px] rounded-3xl" />
                    </div>
                    <button 
                        className="bg-teal-600 mt-[50px] w-full p-3 rounded-xl
                            font-black text-lg">
                        Grab & Go To Next
                    </button>
                </div>
            </div>
        </div>
    );
}