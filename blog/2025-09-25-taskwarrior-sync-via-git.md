---
tags:
  - taskwarrior
  - git
  - bash
authors:
  - fering
---
# TaskWarrior: синхронизация через Git

<!-- todo: написать преамбулу -->

TaskWarrior держит свои файлы в папке `~/.task`:

* backlog.data — это, походу, все задачи и их изменения. Например, там вполне могут находиться две задачи "полежать", ID которых одинаковый, но status разный
* undo.data
* completed.data — задачи со статусом "completed" или "deleted"
* pending.data — задачи, которые нужно выполнить

Чтобы синхронизоровать ее, можно сделать так:

* На компьютере создать bare git
* На телефоне `git init`, закомитить всё и запушить на bare git
* На компьютере склонировать bare git в `.task`

Теперь, как только переключаюсь с одного устройства (X) на другое (Y), нужно проделывать следующее:

* на X: закомитить изменения и запушить
* на Y: запуллить

## скрипт `task-sync`

Для упрощения процесса можно создать скрипт:

* на X: `task-sync push` (commit и push)
* на Y: `task-sync pull`

```bash
#!/bin/bash

set -euo pipefail

task_folder= # todo: заполнить!

usage() {
  echo "Usage: $(basename "$0") (push|pull)"
  echo
  echo "Where:"
  echo "  push        commit and push to remote"
  echo "  pull        pull from remote"
  echo
  echo "Options:"
  echo "  --help, -h  Show this help."
  exit 1
}

push() {
  cd $task_folder
  git commit -a -m update
  git push
  exit 0
}

pull() {
  cd $task_folder
  git pull
  exit 0
}

if [[ $# -eq 0 ]]; then
  usage
  exit 0
fi

while [[ $# -gt 0 ]]; do
  case $1 in
    --help|-h)
      usage
      exit 0
      ;;
    push)
      push
      shift
      ;;
    pull)
      pull
      shift
      ;;
    *)
      echo "Error: unknown argument '$1'."
      echo "Type --help for details."
      exit 1
      ;;
  esac
done
```

## merge conflict

Что делать, когда свет вырубят и не успею вытащить изменения с компа, — без понятия. Придется как-то устранять конфликты слияния.
