import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import NavLink from "./NavLink";

export default function MobileDropdown({
    children,
    links,
}: {
    children: string;
    links: { href: string; label: string }[];
}) {
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between py-1 text-left font-medium focus:outline-none">
                        <span>{children}</span>
                        <ChevronUpIcon
                            className={`${
                                open ? "" : "rotate-180 transform"
                            } h-5 w-5 text-primary transition-all`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-2 text-sm gap-4 flex flex-col items-start">
                        {links.map((link) => (
                            <NavLink key={link.href} href={link.href}>
                                {link.label}
                            </NavLink>
                        ))}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
