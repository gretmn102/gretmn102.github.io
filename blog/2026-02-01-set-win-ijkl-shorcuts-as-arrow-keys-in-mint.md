---
tags:
   - mint
   - горячие_клавиши
   - раскладка_клавиатуры
---
# Set win+ijkl shorcuts as arrow keys in Mint

<!-- Remap in mint `win + j` shortcut to left key -->

Чтобы определить код `win`:

```
xmodmap -pke | grep -i "Super_L"
xmodmap -pke | grep -i j
```

`xmodmap` работает так:

```bash
keycode $code = $1 $2 $3 $4 $5 $6
```

Где:

1. Key
2. Shift+Key
3. Mode_switch+Key
4. Mode_switch+Shift+Key
5. ISO_Level3_Shift+Key
6. ISO_Level3_Shift+Shift+Key

Соответственно, клавишу `Win` надо сделать либо `Mode_switch`, либо `ISO_Level3_Shift`

## `Mode_switch`

На `Mode_switch` странный эффект: ОСь вешает на нее альтернативную раскладку (в моем случае -- русскую). Например:

```xmodmap
keycode  44 = j J Cyrillic_o Cyrillic_O j J
```

В итоге на английской раскладке работает как надо, но если переключиться на русскую, то клавиши "олдш" выдают стрелки.

Проверить можно так:

```bash
xmodmap -e "keycode 133 = Mode_switch"
xmodmap -e "keysym j = j J Left"
xmodmap -e "keysym l = l L Right"
xmodmap -e "keysym i = i I Up"
xmodmap -e "keysym k = k K Down"
```

## `ISO_Level3_Shift`

В итоге остается загадочный `ISO_Level3_Shift`.

А как вообще понять, какие клавиши настроены на это дело?

А вот примеры с `ISO_Level3_Shift` я не могу найти в `xmodmap -pke`

```bash
xmodmap -pk | grep Super
```

Скорее всего, вернет `133`.

```bash
xmodmap -e "keycode 133 = ISO_Level3_Shift ISO_Level3_Shift ISO_Level3_Shift ISO_Level3_Shift ISO_Level3_Shift ISO_Level3_Shift ISO_Level3_Shift"
```

Перестала работать

```bash
xmodmap -e "keycode  44 = j J Cyrillic_o Cyrillic_O Left Left"
```

xmodmap -e "clear mod3"
xmodmap -e "clear mod4"
xmodmap -e "add mod4 = ISO_Level3_Shift"
xmodmap -e "clear mod5"
xmodmap -e "add mod5 = ISO_Level3_Shift"

[Getting XKB remaped arrow keys (ISO_Level3_Shift + HJKL) to work properly with the WIN key under X11](https://superuser.com/questions/1329358/getting-xkb-remaped-arrow-keys-iso-level3-shift-hjkl-to-work-properly-with-t)

## Дополнительные модификаторы

Кстати, есть вот такая громадина:

```
keycode  74 = F8 F8 F8 F8 F8 F8 XF86Switch_VT_8 F8 F8 XF86Switch_VT_8 F8 F8 F8 F8 XF86Switch_VT_8
```

Т.е. получается, что существуют еще какие-то дополнительные колонки помимо этих шести.

попробую `q` сделать такой:

```bash
xmodmap -e "keycode  24 = q Q Cyrillic_shorti Cyrillic_SHORTI w W e E R r T t"
```

Пробовал `alt + q`, `ctrl + q`, `win + q` -- ничего не просходит

Remapping the Win (Super) key to ISO_Level3_Shift with `xmodmap`:



append `~/.Xmodmap`:

```conf
clear mod4
add mod4 = Super_L
keycode 44 = j J
```


[xmodmap doesn't work anymore after upgrading to 22.04](https://askubuntu.com/questions/1403490/xmodmap-doesnt-work-anymore-after-upgrading-to-22-04) -- э

> bind 'jikl' in combination with CAPSLOCK as my arrow keys for easy navigation.

```xmodmap
keycode 133 = Super_L NoSymbol Super_L NoSymbol Super_L
keysym j = j J Left
keysym l = l L Right
keysym i = i I Up
keysym k = k K Down
```

! keysym j = j J Left

## Через `xdotool`

install:

```bash
sudo apt install xdotool
```

1. Open **System Settings** → **Keyboard** → **Shortcuts**.
2. Choose **Custom Shortcuts** and click **+** to add a new entry.
3. Fill in:
   * **Name:** `Win+J → Left`
   * **Command:** `xdotool key Left`
4. Click **Set Shortcut**, then press **Win + J**.
5. Press **Add** to save.

xdotool key --clearmodifiers Left

unbind **Push tile left**

Чтобы проветить, что оно вообще работает (**осторожно** громкий звук!)
```
speaker-test -t sine -f 1000 -l 1
```

`xev` -- проверка

xdotool

## `setxkbmap`

```bash
mkdir -p ~/.xkb/symbols
```

create `custom` file:

```
default  partial alphanumeric_keys
xkb_symbols "mod4_j_left" {
  // Ensure Mod4 is defined as the Super/Windows key
  modifier_map Mod4 { Super_L, Super_R };

  // Map Mod4+j → Left
  key <AC07> { // <AC07> is the physical key for “j”
    type= "ONE_LEVEL",
    symbols[Group1]= [ Left ],
    actions[Group1]= [ SetMods(modifiers=Mod4) ]
  };
};
```

setxkbmap -print | xkbcomp -I$HOME/.xkb - $DISPLAY
setxkbmap -layout us -option '' -rules evdev -model pc105 -variant '' -option '' -symbols "pc+us+custom(mod4_j_left)"
```bash
setxkbmap -symbols "pc+us+custom(mod4_j_left)"

```

<!-- setxkbmap -option grp:caps_toggle -->

сейчас так:

setxkbmap -symbols "pc+us+ru:2+us:3+inet(evdev)+terminate(ctrl_alt_bksp)+group(caps_toggle)+custom(mod4_j_left)"

## `xkbcomp`

```
key <LWIN> {         [         ISO_Level3_Shift ] };
```

```xkb
key <AC07> {
    // type= "ALPHABETIC", // обязательно убрать, иначе почему-то не работает
    symbols[Group1]= [               j,               J, Left ],
    symbols[Group2]= [      Cyrillic_o,      Cyrillic_O, Left ],
    symbols[Group3]= [               j,               J, Left ]
};
```