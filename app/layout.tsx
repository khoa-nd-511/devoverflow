import React from "react";

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import "../styles/prism.css";
import "../lib/grafana";

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-spaceGrotest",
});

export const metadata: Metadata = {
    title: "DevOverflow",
    description: "",
    icons: {
        icon: "/assets/images/site-logo.svg",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
                <ClerkProvider
                    appearance={{
                        elements: {
                            formButtonPrimary: "primary-gradient",
                            footerActionLink:
                                "primary-text-gradient hover:text-primary-500",
                        },
                    }}
                >
                    <ThemeProvider>{children}</ThemeProvider>
                </ClerkProvider>
                <Toaster />
            </body>
        </html>
    );
}
