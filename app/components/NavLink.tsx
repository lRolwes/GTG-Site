"use client";
import Link from "next/link";
import React from "react";

export default function NavLink({
    href,
    isActive,
    children,
}: {
    href?: string;
    callback?: () => void;
    isActive?: boolean;
    children: string;
}) {
    return (
        <Link
            href={href || ""}
            className="relative inline-block font-normal transition duration-300 ease-in-out font-header group opacity-90 hover:opacity-100 text-primary hover:secondary"
        >
            {children}
            {!isActive ? (
                <span className="absolute h-[2px] w-full bg-secondary hover:bg-secondary origin-left bottom-0 right-0 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out" />
            ) : (
                <span className="absolute h-[2px] w-full bg-secondary hover:bg-secondary origin-left bottom-0 left-0 right-0" />
            )}
        </Link>
    );
}

export function SecondaryNavLink({
    href,
    children,
}: {
    href?: string;
    callback?: () => void;
    children: string;
}) {
    return (
        <Link
            href={href || ""}
            className="relative uppercase text-primary hover:text-secondary inline-block font-normal transition duration-300 ease-in-out font-header group opacity-90 hover:opacity-100 text-xs"
        >
            {children}
        </Link>
    );
}
