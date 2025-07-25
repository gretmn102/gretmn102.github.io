---
image: ./social-card.webp
tags:
  - fireurq (furq)
  - dxwnd
authors:
  - fering
---
# Изменение размера окна FireURQ

FireURQ v2.2.4 не поддерживает изменение окна, но с чудесной программой DxWnd мы можем исправить этот недостаток. Об этом и пойдет речь в данной статье.

![social-card](./social-card.webp)

<!-- truncate -->

## Установка DxWnd и настройка

* Скачать [DxWnd с sourceforge](https://sourceforge.net/projects/dxwnd/files/latest/download)

  Лично я всё это проделывал на [v2.06.00](https://sourceforge.net/projects/dxwnd/files/Latest%20build/V2_06_00_build.rar/download). Так что если что-то не работает, то попробуйте установить ее.
* Распаковать архив
* Запустить `dxwnd.exe`
* Нажать ПКМ на рабочей поверхности и выбрать "Add" в выпадающем меню
* В "Name" вписать игру
* В "Path" указать расположение FireURQ (у меня, к примеру, оно такое: `E:\Portable\furq-2.2.4\fireURQ2.exe`)
* Включить "Run in window"
* Включить "Keep aspect ratio" и "Adaptive ratio"
* Вписать ширину ("W") и высоту ("H") (у меня, например, 1360x768)

Теперь можно запускать двойным нажатием.

## Запуск с командной строки

А еще можно запускать FireURQ прямо с командной строки:

```batch
dxwnd.exe /R:1
```

, где `/R:1` означает запустить первую настроенную игру.

Или в MINGW64:

```bash
./dxwnd.exe //R:1
```

Было бы еще хорошо проталкивать путь к игре аргументом:

```bash
./dxwnd.exe //R:1 -- "Время-Х (v 0.7).qsz"
```

Но, похоже, DxWnd на это не способен. Либо же я не нашел, как это делается.
