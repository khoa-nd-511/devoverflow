"use client";

import React from "react";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Theme from "./Theme";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

const NavBar = () => {
    return (
        <nav className="flex-between background-light900_dark200 fixed z-50 min-h-[104px] w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
            <Link href="/" className="flex items-center gap-2">
                <Image
                    src="/assets/images/site-logo.svg"
                    alt="DevOverflow's logo"
                    width={23}
                    height={23}
                />
                <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
                    Dev<span className="text-primary-500">Overflow</span>
                </p>
            </Link>

            <GlobalSearch />

            <div className="flex-between min-w-[120px] gap-5">
                <Theme />
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "h-10 w-10",
                            },
                            variables: {
                                colorPrimary: "#ff7000",
                            },
                        }}
                    />
                </SignedIn>
                <SignedOut>
                    <Link
                        href="/sign-in"
                        className="background-light800_dark400 flex size-[40px] rounded-full p-0 text-primary-500"
                    >
                        <UserIcon className="m-auto size-5" />
                    </Link>
                </SignedOut>
                <MobileNav />
            </div>
        </nav>
    );
};

export default NavBar;
