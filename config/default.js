'use strict';

module.exports = {
    // Включаем отладочный режим приложения
    debug: true,

    // Фиксируем порт для локальной разработки
    port: 8080,

    // Статичное содержимое раздаём из приложение через express.static
    staticBasePath: '/',

    sequelizeOptions: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '',
        database: 'test',

        dialect: 'postgres'
    }
};
