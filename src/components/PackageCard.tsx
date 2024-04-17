import type Package from "@/types/PackageData";

export default function PackageCard({ data } : { data: Package } ) {
    return (
        <div className="max-w-[250px] w-fit box-border">
            <div 
                className="w-[250px] h-[300px] bg-cover bg-center border-2 border-neutral-300 rounded-lg" 
                style={{ backgroundImage: `url(${data.thumbnail})` }}>
            </div>
            <h2 className="text-left mt-3 font-bold text-xl">
                {data.name}
            </h2>
            <span className="text-left w-full block">
                {data.price.toLocaleString('en-US')} LKR
            </span>
            <button className="text-sm underline underline-offset-2 mt-2">
                <i>Customize & Grab</i>
            </button>
        </div>
    )
}