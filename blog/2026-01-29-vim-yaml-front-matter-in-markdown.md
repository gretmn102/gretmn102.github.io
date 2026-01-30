---
tags:
  - yaml_front_matter
---
# vim: YAML front matter в Markdown

Открываю в Neovim следующий Markdown документ:

```md
---
tags:
  - some_tag
---
some text
```

Все символы после `_` выделяются курсивом. Как это исправить?

Init vim:

```vim
let g:vim_markdown_front_matter = 1
```
