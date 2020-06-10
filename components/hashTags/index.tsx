import Link from 'next/link';
import React from 'react';

import {HashTag} from '../../server/models/HashTag';

interface HashTagsProps {
    fetchAdventures: Function;
    hashTags: HashTag[];
}

const ELEMENT_CN = 'adventure';
const CN = {
    HASHTAGS: `${ELEMENT_CN}__hashTags`,
    HASHTAG: `${ELEMENT_CN}__hashTag`,
    HASHTAGTEXT: `${ELEMENT_CN}__hashTag-text`
};


export default function HashTags({hashTags, fetchAdventures}: HashTagsProps) {
    return (
        <div className={CN.HASHTAGS}>
            {
                hashTags.map(hashTag => {
                    function handleClick(): void {
                        fetchAdventures(hashTag.valueEn);
                    }

                    const linkHref = {
                        pathname: '/adventuresList',
                    };
                    const linkAs = hashTag.valueEn;

                    return (
                        <Link as={linkAs} href={linkHref} key={hashTag.id}>
                            <a className={CN.HASHTAG}
                               onClick={handleClick}>
                                <p className={CN.HASHTAGTEXT}>
                                    #{hashTag.valueRu}
                                </p>
                            </a>
                        </Link>
                    )
                })}
        </div>
    )
}
