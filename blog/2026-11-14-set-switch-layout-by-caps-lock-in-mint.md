---
tags:
  - mint
  - xmodmap
  - настройка_раскладки
  - настройка_окружения
---
# Set switch layout by Caps Lock in Mint

## Через Keyboard XKB Options

* Сохранить

  ```bash
  gsettings get org.cinnamon.desktop.input-sources xkb-options
  ```

  В моем случае:

  ```bash
  ['terminate:ctrl_alt_bksp']
  ```

* Добавить к ним существующие

  ```bash
  gsettings set org.cinnamon.desktop.input-sources xkb-options \
    "['grp:caps_toggle', 'ВАШ_СУЩЕСТВУЮЩИЙ_ПАРАМЕТР']"
  ```

  В моем случае:

  ```bash
  gsettings set org.cinnamon.desktop.input-sources xkb-options \
    "['grp:caps_toggle', 'terminate:ctrl_alt_bksp']"
  ```

## Через Startup Application (не надежно)

* win -> "Startup Applications" -> "+" -> "Custom command"
* name: set switch layout by capslock
* command: setxkbmap -option grp:caps_toggle

Но оно сбрасывается, когда происходит переподключение мониторов и графического планшета.

## Ускорение переключения раскладки

По-идеи, если выключить [IBus](https://wiki.archlinux.org/title/IBus), то станет чуточку быстрее переключаться.

Одноразовая акция:

```bash
ibus exit
```

Навсегда:

Создать `~/.config/autostart/ibus-exit.desktop`:

```conf
[Desktop Entry]
Type=Application
Exec=ibus exit
X-GNOME-Autostart-enabled=true
NoDisplay=false
Hidden=false
Name[en_US]=ibus exit
Comment[en_US]=No description
X-GNOME-Autostart-Delay=0
```
