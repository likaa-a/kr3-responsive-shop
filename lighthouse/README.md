# Lighthouse Accessibility Audit

Дата проверки: 9 ноября 2026 года.

Аудит выполнен Lighthouse 13.6.0 через локальный HTTP-сервер. Использована категория `accessibility`.

| Страница | Оценка Accessibility | Проваленные проверки |
| --- | ---: | --- |
| `index.html` | 100 | нет |
| `catalog.html` | 100 | нет |
| `order.html` | 100 | нет |

Сохранённые отчёты:

- `index-accessibility.html` и `index-accessibility.json`;
- `catalog-accessibility.html` и `catalog-accessibility.json`;
- `order-accessibility.html` и `order-accessibility.json`.

Пример команды проверки:

```bash
npx lighthouse http://127.0.0.1:4173/index.html \
  --only-categories=accessibility \
  --output=html \
  --output-path=lighthouse/index-accessibility.html \
  --chrome-flags="--headless --no-sandbox --disable-gpu"
```

Lighthouse дополнялся ручной проверкой структуры заголовков, skip-link, порядка фокуса, формы, таблицы, мобильного меню и модального окна.
