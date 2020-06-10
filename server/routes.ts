import {Application} from 'express';

import Database from "./database";
import {getNextFiveAdventures, showAdventures} from 'controllers/adventures';
import {showScene, startAdventure} from "./controllers/scene";
import {parse} from "url";

const db = new Database();

export function getDB(): Database {
    return db;
}

export default (app: Application): void => {
    db.init().then(() => {
        app.get('/', (_req, res) => res.renderPage('/adventuresList'));

        app.get('/api/getNextFiveAdventures', getNextFiveAdventures);
        app.get('/api/startAdventure/:advName', startAdventure);
        app.get('/api/startAdventure/:advName/:sceneName', showScene);
        app.get(`/api/adventures`, showAdventures);
        app.get(`/api/:tag`, showAdventures);

        app.all('*', (req, res) => {
            const handleRequest = req.nextApp.getRequestHandler();
            const parsedUrl = parse(req.url, true);

            return handleRequest(req, res, parsedUrl);
        });
    });

};
