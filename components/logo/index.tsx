import Link from "next/link";
import React from "react";

import {LogoData} from '../../server/types';

interface LogoProps {
    logo: LogoData;
    fetchData: Function;
}

export default function Logo({logo, fetchData}: LogoProps) {
    const linkHref = {pathname: '/adventuresList'};

    function handleClick(): void {
        fetchData();
    }

    return (
        <Link as='/' href={linkHref}>
            <a className="logo" onClick={handleClick}>
                <img src="https://i.pinimg.com/originals/90/9a/08/909a08d7caa58998f3f844e8c64f531d.png" alt="logo"
                     className="logo__picture"/>
                <p className="logo__companyName">
                    <span className="logo__firstHalf">
                        {logo.firstHalf}
                    </span>{logo.secondHalf}
                </p>
            </a>
        </Link>
    );
}
