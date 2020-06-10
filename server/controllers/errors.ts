import {Request, Response} from 'express';

// Код «404 Not Found» отправляют в ответ на отсутствующий HTTP-ресурс
export const error404 = (_req: Request, res: Response): void => {
    res.sendStatus(404);
};
