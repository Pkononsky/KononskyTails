import Link from 'next/link';
import React from 'react';
import {useInView} from 'react-intersection-observer';

import {AdventureData} from 'types';
import HashTags from '../hashTags';

interface AdventuresProps {
    adventuresData: AdventureData[];
    currentHashTag: string;
    fetchNextFive: Function;
    fetchAdventures: Function;
}

const DEFAULT_URL_IMG = 'https://s1.1zoom.ru/big0/788/Lavandula_Fields_Blue_525422_1280x778.jpg';
const ELEMENT_CN = 'adventure';
const CN = {
    META: `${ELEMENT_CN}__meta`,
    IMG: `${ELEMENT_CN}__img`,
    TEXTS: `${ELEMENT_CN}__texts`,
    TITLE: `${ELEMENT_CN}__title`,
    DESCRIPTION: `${ELEMENT_CN}__description`
};

export default function Adventures({adventuresData, currentHashTag, fetchAdventures, fetchNextFive}: AdventuresProps) {
    const [ref, inView] = useInView({
        threshold: 0
    });
    return (
        <div className="home_page__adventures">
            {
                adventuresData.map(({adventureData, hashTags}: AdventureData, index) => {
                    const linkHref = {pathname: '/adventureScene', query: {adventureName: adventureData.adventureName}};
                    const linkAs = adventureData.firstScene;

                    const imageUrl = adventureData.picture || DEFAULT_URL_IMG;

                    return adventureData.firstScene &&
                        (
                            <div className={ELEMENT_CN} ref={index === adventuresData.length - 1 ? ref : null} key={index}>
                                <meta className={CN.META} name={adventureData.adventureName}/>
                                <div className={CN.IMG}>
                                    <Link as={linkAs} href={linkHref}>
                                        <a>
                                            <img src={imageUrl}
                                                 alt="adventure"
                                                 className={CN.IMG}/>
                                        </a>
                                    </Link>
                                </div>
                                <div className={CN.TEXTS}>
                                    <Link as={linkAs} href={linkHref}>
                                        <a className={CN.TITLE}>
                                            {adventureData.adventureName}
                                        </a>
                                    </Link>
                                    {
                                        adventureData.description &&
                                        (
                                            <p className={CN.DESCRIPTION}>
                                                {adventureData.description}
                                            </p>
                                        )
                                    }
                                    {
                                        hashTags &&
                                        (
                                            <HashTags hashTags={hashTags}
                                                      fetchAdventures={fetchAdventures}/>
                                        )
                                    }
                                </div>
                                {index === adventuresData.length - 1 && inView && fetchNextFive(adventureData.adventureName, currentHashTag)}
                            </div>
                        );
                })}
        </div>
    );
}
