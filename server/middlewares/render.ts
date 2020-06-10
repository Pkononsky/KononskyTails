import config from "config";
import {NextFunction as Next, Request, Response} from 'express';
import nextjs from 'next';

export default (nextApp: ReturnType<typeof nextjs>) => (req: Request, res: Response, next: Next) => {
    req.nextApp = nextApp;
    res.renderPage = (pathname, query) => {
        nextApp.render(req, res, pathname, query);
    };

    req.locals = {
        meta: {
            charset: 'utf-8',
            description: 'Adventures'
        },
        title: 'Adventures',
        staticBasePath: config.get('staticBasePath'),
        logo: {
            firstHalf: 'Kononsky',
            secondHalf: 'Games'
        },
    };

    next();
};
