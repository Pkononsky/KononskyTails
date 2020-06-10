import React from 'react';

import {AppProps} from 'next/app';

import './index.css';
import './scene.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
