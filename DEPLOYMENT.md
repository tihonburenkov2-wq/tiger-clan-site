# 🚀 Развертывание на Vercel

Это руководство для развертывания приложения в интернет за несколько минут.

## Способ 1: Развертывание через Vercel Dashboard (САМЫЙ ПРОСТОЙ)

### Шаг 1: Подготовка GitHub

1. Создайте аккаунт на [github.com](https://github.com)
2. Создайте новый репозиторий с названием `tiger-king-old-recruitment`
3. Загрузите код проекта:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Tiger King Old recruitment system"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/tiger-king-old-recruitment.git
   git push -u origin main
   ```

### Шаг 2: Развертывание на Vercel

1. Откройте [vercel.com](https://vercel.com)
2. Нажмите **"Sign Up"** и создайте аккаунт (можно через GitHub)
3. Нажмите **"Add New..."** → **"Project"**
4. Выберите **"Import from Git"**
5. Подключите ваш GitHub аккаунт
6. Найдите репозиторий `tiger-king-old-recruitment` и нажмите **"Import"**
7. В окне **"Configure Project"**:
   - **Framework Preset**: Next.js (выбирается автоматически)
   - **Root Directory**: `./` (оставьте как есть)
8. Нажмите **"Environment Variables"** и добавьте:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ADMIN_PASSWORD=TigerKingOld2024
   ```
9. Нажмите **"Deploy"**
10. Ждите завершения (обычно 2-3 минуты)
11. ✅ Готово! Получите ссылку на ваше приложение (например: `https://tiger-king-old.vercel.app`)

## Способ 2: Развертывание через Vercel CLI

### Если у вас уже установлен Node.js:

```bash
# 1. Установите Vercel CLI
npm i -g vercel

# 2. Авторизуйтесь (откроется браузер)
vercel login

# 3. Разворачивайте проект
vercel

# 4. Ответьте на вопросы:
# - "Link to existing project?" → No
# - "What's your project's name?" → tiger-king-old-recruitment
# - "In which directory is your code?" → ./
# - "Want to override the settings?" → No

# 5. После этого откроется интерактивный диалог для добавления переменных окружения
# Добавьте переменные (см. выше)

# 6. Готово! Ссылка на приложение будет показана в терминале
```

## Способ 3: Развертывание на других платформах

### Render.com

1. Откройте [render.com](https://render.com)
2. Создайте аккаунт
3. Нажмите **"New"** → **"Web Service"**
4. Подключите GitHub репозиторий
5. Добавьте переменные окружения
6. Нажмите **"Deploy"**

### Railway.app

1. Откройте [railway.app](https://railway.app)
2. Нажмите **"New Project"** → **"Deploy from GitHub repo"**
3. Выберите ваш репозиторий
4. Добавьте переменные окружения в Settings
5. Готово!

### Heroku (требует платную подписку)

1. Откройте [heroku.com](https://heroku.com)
2. Нажмите **"New"** → **"Create new app"**
3. Следуйте инструкциям
4. Добавьте Config Vars (переменные окружения)
5. Подключите GitHub репозиторий и нажмите **"Deploy Branch"**

## Способ 4: Docker контейнер

Если вы хотите разворачивать в контейнере (для продвинутых):

### Создайте Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Создайте .dockerignore

```
node_modules
.next
.git
.gitignore
README.md
```

### Команды:

```bash
# Сборка образа
docker build -t tiger-king-old .

# Запуск контейнера
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your-url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key \
  tiger-king-old
```

## Проверка развернутого приложения

После развертывания:

1. Откройте ссылку на ваше приложение
2. Вы должны увидеть главную страницу TIGER KING OLD
3. Нажмите "Подать заявку" и проверьте, работает ли форма
4. Заполните и отправьте тестовую заявку
5. Откройте админ-панель (`/admin`) и проверьте, видна ли заявка

## Обновление приложения

### Способ 1: Через GitHub (самый простой)

1. Отредактируйте файлы локально
2. Закоммитьте и запушьте на GitHub:
   ```bash
   git add .
   git commit -m "Update form fields"
   git push origin main
   ```
3. Vercel автоматически переразворачивает приложение (~1-2 мин)

### Способ 2: Через Vercel CLI

```bash
vercel --prod
```

## Домен для приложения

### Если у вас свой домен:

1. В Vercel Dashboard → Project Settings → **Domains**
2. Нажмите **"Add"**
3. Введите ваш домен (например: `recruitment.tigerking.com`)
4. Следуйте инструкциям для подключения DNS

### Примеры доменов:
- Бесплатные: `.vercel.app` (дается автоматически)
- Платные: `.ru`, `.com` (покупаются на Namecheap, GoDaddy, и т.д.)

## ⚠️ Важное: Переменные окружения на продакшене

**НИКОГДА** не коммитьте `.env.local` на GitHub!

Переменные окружения добавляются:
- На Vercel: Settings → Environment Variables
- На других платформах: аналогично в Settings

## Мониторинг приложения

На Vercel вы можете смотреть:
- **Deployments**: История развертываний
- **Analytics**: Посещения приложения
- **Logs**: Ошибки и логи сервера
- **Monitor**: Производительность

## Автоматические развертывания

По умолчанию на Vercel:
- Каждый `push` в `main` → развертывание на продакшене
- Каждый `push` в другую ветку → превью версия

## Откат версии

Если что-то пошло не так:

1. В Vercel Dashboard → **Deployments**
2. Найдите старое, рабочее развертывание
3. Нажмите на три точки → **Promote to Production**
4. Готово! Вы вернулись на старую версию

---

## Итоговая ссылка для администраторов

Поделитесь этими ссылками:
- **Форма для игроков**: `https://ваш-домен.vercel.app/form`
- **Админ-панель**: `https://ваш-домен.vercel.app/admin` (пароль: `TigerKingOld2024`)

**Готово! Ваше приложение в интернет! 🎮**
