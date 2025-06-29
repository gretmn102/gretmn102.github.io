---
tags:
  - termux
  - clipboard
  - Redmi Note 2
  - android
authors:
  - fering
---
# Установка clipboard в Termux для старого смартфона

Установить clipboard в Termux'е достаточно просто: для этого всего лишь нужно поставить пакет `termux-api` и установить дополнительное приложение. Но с приложением беда: оно идёт только на современной ОСи, а у вас — Android 5.0.2! Попробуем решить эту задачу.

<!-- truncate -->

## Попытка установки Termux API

<!-- todo -->

https://github.com/termux/termux-api/issues/576#issuecomment-1490734240
https://apt.izzysoft.de/fdroid/index/apk/com.termux.api?repo=archive
https://f-droid.org/archive/com.termux.api_38.apk
couldn't installed reason -8

## Через левое приложение

* установить https://github.com/majido/clipper
* настроить запуск сервиса clipper'а:

  ```bash
  am startservice ca.zgrs.clipper/.ClipboardService
  ```

  возможно, для `am` может понадобиться пакет `termux-am`

Отправить данные буфер обмена:

```bash
am broadcast -a clipper.set -e text "this can be pasted now"
```

Вытащить данные из буфера обмена:

```bash
am broadcast -a clipper.get
```

### Настройка xclip

<!-- todo: написать скрипт, который:
* запускает сервис, если он не запущен
* copy
* paste -->

* [xClip (Reverse Clip) for Windows - Simulate reverse process of the clip command on Windows](https://gist.github.com/babhishek21/b0f78f57f287ca0b2611895a72aca400)
* [Windows port of xclip ](https://gist.github.com/Rapptz/9664773178da1bc397cf)
* [xclip for Cygwin/MSYS2 ](https://gist.github.com/imiric/4ddd7b669c2ac6642c53d7a4bff070e6)
