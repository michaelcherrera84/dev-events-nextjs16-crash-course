import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevEvent",
    description: "The Hub for Every Dev Event You Don't Want to Miss",
};

/**
 * Defines the application's root HTML layout, applying global fonts and page chrome.
 *
 * Renders the document <html> and <body> structure with global font variables and layout utilities, includes the site navigation, an animated background (LightRays) configured for top-centered origin and subtle visual effects, and a <main> container that hosts the page content.
 *
 * @param children - The page content to render inside the root layout's main area
 * @returns A JSX element representing the application's root HTML layout
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={cn(
                "min-h-screen",
                "h-full",
                "antialiased",
                schibstedGrotesk.variable,
                martianMono.variable,
                "font-sans",
                geist.variable,
            )}
        >
            <body className="flex min-h-screen flex-col">
            <Navbar />
                <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
                    <LightRays
                        raysOrigin="top-center-offset"
                        raysColor="#5dfeca"
                        raysSpeed={0.5}
                        lightSpread={0.9}
                        rayLength={0.75}
                        followMouse={true}
                        mouseInfluence={0.02}
                        noiseAmount={0}
                        distortion={0.01}
                        pulsating={false}
                        fadeDistance={0.1}
                        saturation={1}
                    />
                </div>
                <main>{children}</main>
            </body>
        </html>
    );
}
