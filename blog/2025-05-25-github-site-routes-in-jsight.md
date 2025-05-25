---
tags:
  - webdev
  - backend
  - jsight
  - GitHub
authors:
  - fering
---
# Роуты сайта GitHub в JSight формате

<!-- todo: написать предисловие -->

<!-- truncate -->

```jsight
GET /
  Description
    Возвращает главную страницу.

GET /404.html

GET /login
  Description
    Возвращает страницу входа в аккаунт.

GET /singup
  Description
    Возвращает страницу регистрации аккаунта.

GET /{username}
  Description
    Возвращает страницу профиля пользователя или организации.

GET /{username}/{repo}/blob/{ref}/*
  Description
    Возвращает страницу просмотра указанного ref'а и файлового пути в `*` хранилища.

GET /{username}/{repo}/realizes
  Description
    Возвращает страницу с релизами проекта.
```
