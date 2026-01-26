# Secrets Hygiene (Always-On Skill)

## Цель
Не допускать попадания секретов в git и обеспечить сохранение секретов в `secrets-backup.txt`.

## Обязательные правила
1. **Никаких секретов в коммитах.** Любые значения токенов, ключей, client secret, API ключей, паролей, JWT_SECRET — запрещены в tracked файлах.
2. **Секреты только в `secrets-backup.txt`.** Если секрет встречен в документации/коде — заменить на плейсхолдер и добавить реальное значение в `secrets-backup.txt` (файл в `.gitignore`).
3. **Проверка перед коммитом.** Перед `git commit` выполнять поиск по шаблонам: `client_secret`, `api_key`, `token`, `password`, `secret`, `jwt`, `oauth`, `bearer`, а также по известным форматам (Google OAuth, Cloudflare, etc.).
4. **Если секрет попал в историю.** Остановиться, удалить секреты из файлов, пересобрать коммиты/историю и только после этого пушить.
5. **Никогда не пушить при срабатывании push protection.** Сначала удаляем секреты, затем повторяем пуш.

## Плейсхолдеры
- Client ID: `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com`
- Client Secret: `YOUR_GOOGLE_CLIENT_SECRET`
- JWT: `YOUR_JWT_SECRET`
- API Token: `YOUR_API_TOKEN`

## Хранилище секретов
- Локально: `secrets-backup.txt` (в `.gitignore`)
- Дополнительно: менеджер паролей / локальные защищенные файлы
