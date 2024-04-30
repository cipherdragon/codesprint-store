import { Packages as pkg_list } from "@/db/Packages";
import { notFound, redirect } from "next/navigation";

export default function PackageDefaultPage({params} : {params: {pkg_id: string}}) {
    const { pkg_id } = params;
    const pkg = pkg_list.find((pkg) => pkg.id === +pkg_id);
    const item = pkg && pkg.items && pkg.items[0];

    if (!item) notFound();
    redirect(`/package/${pkg_id}/${item.id}`);
}