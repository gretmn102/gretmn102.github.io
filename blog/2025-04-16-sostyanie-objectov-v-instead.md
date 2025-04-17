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

```lua
---@class TomatoModel
---@field rotted boolean
local tomato_model = {}
tomato_model.__index = tomato_model

function tomato_model:new()
  ---@type TomatoModel
  local instance = {
    rotted = false,
  }
  return setmetatable(instance, self)
end

function tomato_model:rot()
  self.rotted = true
end

room {
  nam = "main",
  disp = "Главная",
}:with {
  obj {
    nam = "помидор",
    disp = "Помидор",
    state = tomato_model:new(),
    dsc = "На полу валяется {помидор}.",
    act = function (this)
      ---@type TomatoModel
      local model = this.state
      if not model.rotted then
        pn "Хороший помидор."
        model:rot()
      else
        pn "Гнилой помидор, однако."
      end
    end
  }
}
```

Если нажать на "помидор", а потом попытаться сохраниться, то выскочит вот это:

> Во время работы произошла ошибка:
> './stead//stead/stead.lua:2420: Can not save classes'

```lua
---@class TomatoModel
---@field rotted boolean
local tomato_model = {}

---@return TomatoModel
function tomato_model:new()
  ---@type TomatoModel
  local instance = {
    rotted = false,
  }
  return instance
end

function tomato_model:rot()
  self.rotted = true
end

room {
  nam = "main",
  disp = "Главная",
}:with {
  obj {
    nam = "помидор",
    disp = "Помидор",
    state = tomato_model:new(),
    dsc = "На полу валяется {помидор}.",
    act = function (this)
      ---@type TomatoModel
      local model = this.state
      if not model.rotted then
        pn "Хороший помидор."
        tomato_model.rot(model)
      else
        pn "Гнилой помидор, однако."
      end
    end
  }
}
```
