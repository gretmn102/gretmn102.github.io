---
tags:
  - instead
  - lua
authors:
  - fering
---
# Состояние объектов в Instead

* модель — содержит время
* view — отображает модель
* controller — связывает запросы

По сути `obj` в Instead — это и есть MVC, где:

* `dsc` — отображение
* `act`, `tak` и т.д. — обработчики событий
* все остальные поля — модель

И этого хватило бы с головой, если бы Lua поддерживал обобщенные типы. Тогда в аргументах обработчиков можно было бы возвращать пользовательский тип.

***

Так-то никто не мешает унаследоваться от `obj`, определить нужные поля и методы:

```lua
---@class Clock: Obj
---@field model ClockModel
clock.__index = clock

function clock:new()
  return obj {
    model = ...
    act = function (this)
       ---@type ClockModel
       local model = this.model
       -- ...
    end
    -- ...
  }
end

function clock:disable_interact() {
  -- todo
}
```
