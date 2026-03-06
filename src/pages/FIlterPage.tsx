import { useLoaderData, useSearchParams } from "react-router-dom";
import { IoEarth } from "react-icons/io5";
import { LiaMapSolid } from "react-icons/lia";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdLocationCity } from "react-icons/md";
import { TfiLocationPin } from "react-icons/tfi";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { useMemo } from "react";

type Province = {
    id: number;
    name: string;
};

type Regency = {
    id: number;
    name: string;
    province_id: number;
};

type District = {
    id: number;
    name: string;
    regency_id: number;
};

type LoaderData = {
    provinces: Province[];
    regencies: Regency[];
    districts: District[];
};

export default function FilterPage() {
    const { provinces, regencies, districts } = useLoaderData() as LoaderData;

    const [params, setParams] = useSearchParams();

    const provinceId = params.get("province");
    const regencyId = params.get("regency");
    const districtId = params.get("district");

    const filteredRegencies = useMemo(() => {
        if (!provinceId) return [];
        return regencies.filter((r) => r.province_id === Number(provinceId));
    }, [provinceId, regencies]);

    const filteredDistricts = useMemo(() => {
        if (!regencyId) return [];
        return districts.filter((d) => d.regency_id === Number(regencyId));
    }, [regencyId, districts]);

    const province = provinces.find((p) => p.id === Number(provinceId));
    const regency = regencies.find((r) => r.id === Number(regencyId));
    const district = districts.find((d) => d.id === Number(districtId));

    const breadcrumbs = [
        { label: "Indonesia", show: true },
        { label: province?.name, show: !!province },
        { label: regency?.name, show: !!regency },
        { label: district?.name, show: !!district },
    ].filter((b) => b.show);

    function change(name: string, value: string) {
        const newParams = new URLSearchParams(params);

        if (value) newParams.set(name, value);
        else newParams.delete(name);

        if (name === "province") {
            newParams.delete("regency");
            newParams.delete("district");
        }

        if (name === "regency") {
            newParams.delete("district");
        }

        setParams(newParams);
    }

    function reset() {
        setParams({});
    }

    return (
        <div className="flex h-screen bg-gray-50">
            {/* SIDEBAR */}
            <aside className="w-[320px] border-r p-8 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        {/* Icon Circle */}
                        <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-100 text-blue-500">
                            <IoEarth size={22} />
                        </div>

                        {/* Title */}
                        <h2 className="font-semibold text-gray-800 text-lg">
                            Frontend Assessment
                        </h2>
                    </div>

                    <p className="text-xs tracking-widest text-gray-400 mb-6 font-semibold">
                        FILTER WILAYAH
                    </p>

                    <div className="space-y-6">
                        {/* PROVINSI */}
                        <div>
                            <label className="text-xs text-gray-400 block mb-2 font-bold">
                                PROVINSI
                            </label>
                            <div className="relative w-full">
                                {/* Map Icon */}
                                <LiaMapSolid className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

                                {/* Select */}
                                <select
                                    name="province"
                                    value={provinceId ?? ""}
                                    onChange={(e) =>
                                        change("province", e.target.value)
                                    }
                                    className="w-full border rounded-xl py-3 pl-10 pr-10 bg-gray-50 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                >
                                    <option value="">Pilih Provinsi</option>

                                    {provinces.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Dropdown Arrow */}
                                <RiArrowDropDownLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none" />
                            </div>
                        </div>

                        {/* KOTA */}
                        <div>
                            <label className="text-xs text-gray-400 block mb-2 font-bold">
                                KOTA/KABUPATEN
                            </label>

                            <div className="relative w-full">
                                {/* Icon */}
                                <MdLocationCity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

                                {/* Select */}
                                <select
                                    name="regency"
                                    value={regencyId ?? ""}
                                    disabled={!provinceId}
                                    onChange={(e) =>
                                        change("regency", e.target.value)
                                    }
                                    className="w-full border rounded-xl py-3 pl-10 pr-10 bg-gray-50 appearance-none disabled:opacity-40 cursor-pointer"
                                >
                                    <option value="">Pilih Kota</option>

                                    {filteredRegencies.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Arrow */}
                                <RiArrowDropDownLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none" />
                            </div>
                        </div>

                        {/* KECAMATAN */}
                        <div>
                            <label className="text-xs text-gray-400 block mb-2 font-bold">
                                KECAMATAN
                            </label>

                            <div className="relative w-full">
                                {/* Icon */}
                                <TfiLocationPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />

                                {/* Select */}
                                <select
                                    name="district"
                                    value={districtId ?? ""}
                                    disabled={!regencyId}
                                    onChange={(e) =>
                                        change("district", e.target.value)
                                    }
                                    className="w-full border rounded-xl py-3 pl-10 pr-10 bg-gray-50 appearance-none disabled:opacity-40 cursor-pointer"
                                >
                                    <option value="">Pilih Kecamatan</option>

                                    {filteredDistricts.map((d) => (
                                        <option key={d.id} value={d.id}>
                                            {d.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Arrow */}
                                <RiArrowDropDownLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-2xl pointer-events-none" />
                            </div>
                        </div>
                        {/* RESET BUTTON */}
                        <div className="w-full mt-15">
                            <button
                                onClick={reset}
                                className="group w-full flex items-center justify-center gap-2 border-2 border-blue-500 text-blue-500 py-3 rounded-xl hover:scale-105 hover:bg-blue-500 hover:text-white transition duration-500 cursor-pointer"
                            >
                                <MdOutlineFilterAltOff className="text-lg transition duration-500" />
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col">
                {/* BREADCRUMB */}
                <div className="breadcrumb px-10 py-6 text-sm border-b bg-white">
                    {breadcrumbs.map((b, i) => (
                        <span
                            key={i}
                            className={
                                i === breadcrumbs.length - 1
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }
                        >
                            {i !== 0 && " > "}
                            {b.label}
                        </span>
                    ))}
                </div>

                {/* MAIN */}
                <main className="flex-1 flex flex-col items-center justify-center text-center gap-20">
                    {/* PROVINSI */}
                    <div>
                        <p className="text-xs tracking-widest text-blue-400 mb-3 font-semibold">
                            PROVINSI
                        </p>

                        <h1 className="text-6xl font-bold text-gray-900">
                            {province?.name ?? "-"}
                        </h1>
                    </div>

                    <div className="text-gray-300 text-2xl">↓</div>

                    {/* KOTA */}
                    <div>
                        <p className="text-xs tracking-widest text-blue-400 mb-3 font-semibold">
                            KOTA / KABUPATEN
                        </p>

                        <h1 className="text-5xl font-bold text-gray-900">
                            {regency?.name ?? "-"}
                        </h1>
                    </div>

                    <div className="text-gray-300 text-2xl">↓</div>

                    {/* KECAMATAN */}
                    <div>
                        <p className="text-xs tracking-widest text-blue-400 mb-3 font-semibold">
                            KECAMATAN
                        </p>

                        <h1 className="text-4xl font-bold text-gray-900">
                            {district?.name ?? "-"}
                        </h1>
                    </div>
                </main>
            </div>
        </div>
    );
}
