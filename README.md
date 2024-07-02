
# Онлайн магазин (NodeJS || PostgresSQL || ReactJS)
Онлайн магазин с админ панелью


## Функции

1.Регистрация, логин <br />
2.Сброс пароля <br />
3.Подтверждение почты <br />
4.Заказ товаров <br />
5.Отслеживание заказов через почту(при заказе вся информация о нём отправляется на почту администратору) <br />
6.Добавление товаров через админ панель <br />
7.Фильтровка товаров <br />
8.Поиск <br />
9.Личный кабинет(корзина, история заказов) <br />
10.Возможность добавлять товары разных цветов, размеров <br />

## Переменные окружения

Для настройки переменных окружения откройте файл **docker-compose.yml** <br />
<br />
1.В переменных **API_URL, CLIENT_URL, REACT_APP_BASE_URL** меняете **5.35.94.55** на IP-адрес сервера, на котором запускаете проект. <br /> В случае, если вы настроили SSL сертификат, **http** меняйте на **https** <br />
<br />
2.**ADMIN1_MAIL, ADMIN1_PASS, ADMIN1_MAIL, ADMIN1_PASS** - почта и пароль двух админов для сайта(под этими данными будет осуществляться вход в админ панель). <br />
<br />
3.**SECRET_KEY** - секрет для jwt токена

## Запуск через Docker

Зайдите в каталог **server**, удалите **.env** файл и запустите команду

```bash
  docker build
```

Зайдите в каталог **client**, удалите **.env** файл. Если запускаете на **Linux**, в файле
**package.json** поменяйте **set PORT=5000 && react-scripts start** на **PORT=5000 react-scripts-start**. После чего запустите в терминале:

```bash
  docker build
```
Аналогично запустите эту команду в каталогах **nginx** и **postgres**

Перейдите в корневой каталог и запустите команду **docker-compose build**. <br />
После чего запустите команду **docker-compose up**.


