---
tags:
  - Telegram
  - форматирование
---
# Форматирование в Telegram

<!-- markdownlint-disable MD033 -->
| Ввод                         | Результат       |
|------------------------------|-----------------|
| `__курсив__`                 | *курсив*        |
| `**жирный**`                 | **жирный**      |
| `~~зачеркнутый~~`            | ~~зачеркнутый~~ |
| <code>\`inline code\`</code> | `inline code`   |
| <code>\|\|спойлер\|\|</code> | спойлер         |
| <pre>\`\`\`js<br>console.log("Hello World!");<br>\`\`\`</pre> | <pre><code class="language-js">console.log("Hello World!");</code></pre> |

## Источники

* SendPulse: [Telegram Text Formatting: Tips, Font Tricks, and Shortcuts](https://sendpulse.com/blog/telegram-text-formatting)
* [Allowed entities API на официальном сайте](https://core.telegram.org/api/entities#allowed-entities) — полезна для ботов, но бесполезна для пользователей
* [markdownv2-style на оф. сайте](https://core.telegram.org/bots/api#markdownv2-style) — полезна для ботов, но бесполезна для пользователей
