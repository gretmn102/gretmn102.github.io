---
tags:
  - mint
  - xmodmap
  - настройка_раскладки
  - настройка_окружения
---
# Set switch layout by Caps Lock in Mint

Мой файл `~/.Xmodmap` содержит:

```conf
remove Lock = Caps_Lock
```

Я запускаю его командой:

```bash
xmodmap ~/.Xmodmap
```

Нажимаю на `Caps Lock`, а оно все равно меняет регистр. Что я делаю не так?

***

## Решение

```bash
setxkbmap -option grp:caps_toggle
```

По-идеи, этой штуки достаточно. По крайней мере, так пишут на <!-- todo: где? -->, но нет.

Зато она устанавливает следующее (см. `setxkbmap -print -verbose 10`):

* Отключает обычное поведение (`Shift`, если включено)
* Переназначает клавишу на `ISO Next Group (0x42)` (см. `xmodmap -pm`)

Теперь нужно:

* открыть `Keyboard` (находится в пуске)
* перейти во вкладку `Layouts`
* назначить `Switch to next layout` на CapsLock
  
  Должно высветиться `Next Group`

Как этот шаг задать программно -- я не знаю. Я пробовал назначать вот это:

```bash
gsettings set org.gnome.desktop.wm.keybindings switch-input-source "['<Control>Shift']"
```

Но оно не сработало.

not:
`/etc/default/keyboard` и измените строки:

```conf
# XKBLAYOUT="us,ru"
XKBOPTIONS="grp:caps_toggle"
```

После правки выполните:

```bash
sudo service keyboard-setup restart
```

```bash
mkdir -p ~/.config
```

<!-- add `nano ~/.config/xinitrc`:

```conf
setxkbmap -option grp:caps_toggle
exec "$@"
``` -->

<!-- append to `$HOME/.profile`:

```conf
setxkbmap -option grp:caps_toggle
`` -->

* win -> "Startup Applications" -> "+" -> "Custom command
* name: set switch layout by capslock
* command: setxkbmap -option grp:caps_toggle
