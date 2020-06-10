/* eslint-disable */

import {ParsedUrlQuery} from 'querystring';
import nextjs from 'next';
import config from "config";

declare global {
    namespace Express {
        // Расширяем интерфейс объекта Request
        interface Request {
            // Добавляем ссылку на Next.js сервер, чтобы иметь к нему доступ в роутере
            nextApp: ReturnType<typeof nextjs>;
            locals: {
                meta: {
                    charset: string,
                    description: string
                },
                title: string,
                staticBasePath: string,
                logo: {
                    firstHalf: string,
                    secondHalf: string
                },
            };
        }

        // Расширяем интерфейс объекта Response
        interface Response {
            // Добавляем функцию renderPage, которая будет использоваться для отрисовки страниц
            renderPage(pathname: string, query?: ParsedUrlQuery): void;
        }
    }
}
