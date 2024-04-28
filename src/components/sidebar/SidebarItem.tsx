'use client'
import React from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
}


export const SidebarItem = ({ path, icon, title }: Props) => {

    const pathName = usePathname()

    return (
        <>
            <li>
                <Link href={path} className={
                    `relative px-4 py-3 flex items-center space-x-4 rounded-xl 
                    hover:bg-gradient-to-r hover:bg-sky-400 hover:text-white
                    ${path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
                    {icon}
                    <span className="-mr-1 font-medium">{title}</span>
                </Link>
            </li>

        </>
    )
}


