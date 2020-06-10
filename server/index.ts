// Удобно разделять зависимости на три группы
// В первой – встроенные модули Node.js в алфавитном порядке
import path from 'path';

// Во второй – сторонние модули в алфавитном порядке
import bodyParser from 'body-parser';
import config from 'config';
import express, {NextFunction as Next, Request, Response} from 'express';
import morgan from 'morgan';
import nextjs from 'next';

// В третьей – собственные модули в алфавитном порядке
import render from 'middlewares/render';
import routes from '../server/routes';

// Подключаем isomorphic-fetch, чтобы иметь возможность использовать fetch и на сервере
import 'isomorphic-fetch';

// Создаём экземпляр приложения
const app = express();
const nextApp = nextjs({dev: process.env.NODE_ENV !== 'production'});

// Определяем директорию для статичных файлов (изображений, стилей и скриптов)
const publicDir = path.join(__dirname, 'public');

// Логируем запросы к приложению в debug-режиме
if (config.get('debug')) {
    app.use(morgan('dev'));
}

// Отдаём статичные файлы из соответствующей директории
app.use(express.static(publicDir));

// Разбираем тело POST запроса, чтобы сохранить заметку
// Запрос приходит в urlencoded формате (обычный для HTML форм)
app.use(bodyParser.urlencoded({
    extended: true
}));

// Выводим ошибку, если не смогли разобрать POST запрос, и продолжаем работу
app.use((err: Error, _req: Request, _res: Response, next: Next) => {
    console.error(err.stack);

    next();
});

// Добавляем хелперы для отрисовки страниц
app.use(render(nextApp));

// Подключаем маршруты
routes(app);

// Фиксируем фатальную ошибку и отправляем ответ с кодом 500
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: Next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

// Подключаем директорию с отдельными частями шаблонов
// Этот метод асинхронный и мы запускаем сервер только после того,
// как все частичные шаблоны будут прочитаны
nextApp.prepare().then(() => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
