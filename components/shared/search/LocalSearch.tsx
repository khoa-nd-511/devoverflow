"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { cn, constructURLFromQueryString } from "@/lib/utils";
import { useParsedSearchParams } from "@/lib/hooks";

interface ILocalSearch {
    route?: string;
    iconPosition?: "left" | "right";
    placeholder?: string;
    imgURL?: string;
    otherClasses?: string;
}

const LocalSearch = ({
    placeholder = "",
    iconPosition = "left",
    imgURL = "/assets/icons/search.svg",
    otherClasses = "",
}: ILocalSearch) => {
    const router = useRouter();

    const { q, searchParamsString } = useParsedSearchParams();

    const [search, setSearch] = useState(q);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const newURL = constructURLFromQueryString({
                searchParams: searchParamsString,
                key: "q",
                value: search.trim(),
            });

            router.push(newURL, { scroll: false });
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [router, search, searchParamsString]);

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    "background-light800_dark300 text-dark300_light900 relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4",
                    iconPosition === "right" && "flex-row-reverse",
                    otherClasses
                )}
            >
                <Image
                    src={imgURL}
                    alt="Search"
                    width={24}
                    height={24}
                    className="cursor-pointer"
                />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="paragraph-regular no-focus placeholder ml-4 border-none bg-transparent shadow-none outline-none"
                />
            </div>
        </div>
    );
};

export default LocalSearch;
