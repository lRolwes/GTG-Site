"use client";
import { Popover, Transition } from "@headlessui/react";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import Image from 'next/image'
import { Josefin_Sans } from 'next/font/google'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLink from "@/app/components/NavLink";
import Button from "./Button";
import MobileDropdown from "./MobileDropdown";

const josefinSans = Josefin_Sans({ subsets: ['latin'] })


export default function Header() {
    const path = usePathname();
    const popoverButtonRef = useRef<HTMLButtonElement>(null);
    const [dropdownShowing, setDropdownShowing] = useState<
        string | undefined
    >();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [path]);

    // close the mobile menu when the user clicks a link
    useEffect(() => {
        popoverButtonRef.current?.click();
    }, [path]);

    return (
        <Popover
            className={` h-[150px] pl-10 ${josefinSans.className} transition ease-out duration-200 fixed top-0 w-screen z-40 bg-white border-b border-gray-200`}
        >
            <div className="relative w-full h-full ">
                <div className="relative z-20 flex items-center justify-between py-6">
                    <div>
                        <Link href="/" className="flex cursor-pointer">
                            <Image
                                priority
                                className=""
                                src="/GTG_Logo.png"
                                alt="Gentry Homes"
                                width={200}
                                height={200}
                            />
                        </Link>
                    </div>
                    <div className="lg:hidden">
                        <Popover.Button className="inline-flex items-center justify-center p-2 rounded-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary">
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <nav className="hidden text-base font-medium lg:flex lg:flex-1 lg:items-center lg:justify-end pr-10">
                        <nav className="flex items-center space-x-10">
                            <div className="flex-col items-end justify-center pt-1 space-y-1">
                                <div className="flex items-center space-x-10">
                                    <Popover className="relative">
                                        <Popover.Button
                                            onMouseEnter={() =>
                                                setDropdownShowing("Iowa Homes")
                                            }
                                            onMouseLeave={() =>
                                                setDropdownShowing(undefined)
                                            }
                                            className="inline-flex items-center gap-x-1"
                                        >
                                            <NavLink href="/">
                                                Home
                                            </NavLink>
                                        </Popover.Button>

                                        
                                    </Popover>
                                    <Popover className="relative">
                                        <Popover.Button
                                            onMouseEnter={() =>
                                                setDropdownShowing(
                                                    "Your Land Our Plan"
                                                )
                                            }
                                            onMouseLeave={() =>
                                                setDropdownShowing(undefined)
                                            }
                                            className="inline-flex items-center gap-x-1"
                                        >
                                            <NavLink href="/about">
                                               About Us
                                            </NavLink>
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            show={
                                                dropdownShowing ===
                                                "Your Land Our Plan"
                                            }
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                onMouseEnter={() =>
                                                    setDropdownShowing(
                                                        "Your Land Our Plan"
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setDropdownShowing(
                                                        undefined
                                                    )
                                                }
                                                className="absolute z-10 flex w-screen max-w-min mt-0.5"
                                            >
                                                <div className="w-56 p-2 text-sm font-semibold leading-6 text-gray-900 bg-white rounded-md shadow-md shrink ring-1 ring-gray-900/5">
                                                    <Link
                                                        href={`/about`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                      Who We Are
                                                    </Link>
                                                    <Link
                                                        href={`/pricing`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                      Pricing
                                                    </Link>
                                                    <Link
                                                        href={`/traveltips`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                      Travel Tips
                                                        
                                                    </Link>
                                                    <Link
                                                        href={`/blog`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                      Blog
                                                    </Link>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                    <Popover className="relative">
                                        <Popover.Button
                                            onMouseEnter={() =>
                                                setDropdownShowing("Trips")
                                            }
                                            onMouseLeave={() =>
                                                setDropdownShowing(undefined)
                                            }
                                            className="inline-flex items-center gap-x-1"
                                        >
                                            <NavLink href="/findyourtrip">
                                              Trips
                                            </NavLink>
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            show={
                                                dropdownShowing === "Trips"
                                            }
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel
                                                onMouseEnter={() =>
                                                    setDropdownShowing(
                                                        "Trips"
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setDropdownShowing(
                                                        undefined
                                                    )
                                                }
                                                className="absolute z-10 flex w-screen max-w-min mt-0.5"
                                            >
                                                <div className="w-56 p-2 text-sm font-semibold leading-6 text-gray-900 bg-white rounded-md shadow-md shrink ring-1 ring-gray-900/5">
                                                    <Link
                                                        href={`/findyourtrip`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                        Find your trip
                                                    </Link>
                                                    <Link
                                                        href={`/destinations`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                       Destinations
                                                    </Link>
                                                    <Link
                                                        href={`/allinclusives`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                       All Inclusives
                                                    </Link>
                                                    <Link
                                                        href={`/grouptrips`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                       Group Trips
                                                    </Link>
                                                    <Link
                                                        href={`/cruises`}
                                                        className="block p-2 hover:text-secondary"
                                                    >
                                                       Cruises
                                                    </Link>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>
                                </div>
                            </div>
                            <Link href="/contact" className="">
                                <Button
                                    icon={
                                        <EnvelopeIcon className="w-5 h-5 mr-2" />
                                    }
                                    className="text-white bg-secondary hover:scale-105"
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </nav>
                    </nav>
                </div>
                <Transition
                    as={Fragment}
                    enter="duration-200 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="absolute inset-x-0 top-0 z-20 p-2 transition origin-top-right transform lg:hidden "
                    >
                        <div className="bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5">
                            <div className="p-5">
                                <div className="flex items-center justify-between">
                                    <Link href="/" className="focus:ring-0">
                                        <Image
                                            priority
                                            className="w-auto h-10"
                                            src="/GTG_Logo.png"
                                            alt="GTG Vacations"
                                            width={250}
                                            height={250}
                                        />
                                    </Link>
                                    <Popover.Button
                                        ref={popoverButtonRef}
                                        className="inline-flex items-center justify-center p-2 text-primary hover:text-secondary focus:outline-none"
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <XMarkIcon
                                            className="w-6 h-6"
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>
                                </div>
                                
                            </div>
                            <div className="z-50 px-5 pb-5 text-primary font-medium">
                                <nav className="grid grid-cols-1 gap-2 justify-items-start sm:grid-cols-2">
                                    <MobileDropdown
                                        links={[
                                            {
                                                label: "Who We Are",
                                                href: "/about",
                                            },
                                            {
                                                label: "Pricing",
                                                href: "/pricing",
                                            },
                                            {
                                                label: "Travel Tips",
                                                href: "/traveltips",
                                            },
                                            {
                                                label: "Blog",
                                                href: "/blog",
                                            },
                                        ]}
                                    >
                                        About Us
                                    </MobileDropdown>

                                    <MobileDropdown
                                        links={[
                                            {
                                                label: "Find Your Trip",
                                                href: "/findyourtrip",
                                            },
                                            {
                                                label: "Destinations",
                                                href: "/destinations",
                                            },
                                            {
                                                label: "All Inclusives",
                                                href: "/allinclusives",
                                            },
                                            {
                                                label: "Group Trips",
                                                href: "/grouptrips",
                                            },
                                            {
                                                label: "Cruises",
                                                href: "/cruises",
                                            },
                                        ]}
                                    >
                                        Trips
                                    </MobileDropdown>

                                    
                                </nav>
                                <div className="mt-6 ">
                                    <Link href="/contact" className="">
                                        <Button
                                            icon={
                                                <EnvelopeIcon className="w-5 h-5 mr-2" />
                                            }
                                            className="w-full text-white bg-secondary hover:scale-105"
                                        >
                                            Contact Us
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </div>
        </Popover>
    );
}
