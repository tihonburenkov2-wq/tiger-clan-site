# ⚡ Quick Start Guide

Самый быстрый способ запустить приложение.

## 1️⃣ Минимальная установка (5 мин)

### Вариант A: Если у вас нет Node.js

1. Скачайте и установите [Node.js](https://nodejs.org/) (LTS версию)
2. Перезагрузите компьютер
3. Откройте терминал/PowerShell в папке проекта

### Вариант B: Если у вас уже есть Node.js

Просто откройте терминал в папке проекта.

## 2️⃣ Установка зависимостей

```bash
npm install
```

**Ожидаемое время**: 2-3 минуты

## 3️⃣ Создание Supabase проекта (если нет)

### Быстро через веб:

1. Откройте [supabase.com](https://supabase.com)
2. Sign In → New Project
3. Назовите проект `tiger-king-old-recruitment`
4. Создайте сильный пароль
5. Выберите регион
6. Ждите инициализации (~5 мин)

### Получение ключей:

1. В dashboard откройте **Settings** → **API**
2. Скопируйте:
   - `Project URL` → переменная `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` ключ → переменная `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4️⃣ Создание таблицы БД

1. В Supabase откройте **SQL Editor**
2. Нажмите **New query**
3. Скопируйте этот SQL код:

```sql
-- Создание таблицы для анкет клана TIGER KING OLD
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  nickname TEXT NOT NULL,
  age TEXT,
  experience TEXT,
  rank TEXT,
  discord TEXT,
  about TEXT
);

-- Включаем доступ на чтение и запись (чтобы форма работала)
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin read" ON applications
  FOR SELECT USING (true);
```

4. Нажмите **Run** (или Ctrl+Enter)
5. Если нет ошибок - готово!

## 5️⃣ Конфигурирование приложения

Откройте файл `.env.local` и заполните:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...
ADMIN_PASSWORD=TigerKingOld2024
```

## 6️⃣ Запуск приложения

```bash
npm run dev
```

Откроется http://localhost:3000 в браузере.

**Готово!** Приложение работает локально! 🎉

---

## ✅ Проверка работоспособности

1. Откройте http://localhost:3000
2. Нажмите "Подать заявку"
3. Заполните форму и отправьте
4. Откройте http://localhost:3000/admin
5. Введите пароль: `TigerKingOld2024`
6. Вы должны увидеть вашу заявку в списке

**Если все работает** - переходите к развертыванию на Vercel!

---

## 🚀 Развертывание на Vercel (5 мин)

### Шаг 1: GitHub репозиторий

```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

(Или создайте репозиторий на GitHub напрямую через веб)

### Шаг 2: Vercel Deploy

1. Откройте [vercel.com](https://vercel.com)
2. Sign In через GitHub
3. **Add New** → **Project** → **Import from Git**
4. Выберите ваш репозиторий
5. Нажмите **Deploy**

### Шаг 3: Переменные окружения

Если Vercel не подхватил `.env.local`:

1. В Vercel Dashboard откройте **Settings**
2. Перейдите в **Environment Variables**
3. Добавьте все переменные:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_PASSWORD`
4. Нажмите **Redeploy**

### ✨ Готово!

Приложение в интернет! Ссылка вида `https://your-project.vercel.app`

---

## 🎮 Первый день использования

### Для игроков:
1. Поделитесь ссылкой: `https://your-domain/form`
2. Они заполняют форму
3. Данные сохраняются в Supabase

### Для администраторов:
1. Откройте: `https://your-domain/admin`
2. Введите пароль: `TigerKingOld2024`
3. Просматривайте заявки
4. Контактируйте игроков через Discord/Telegram

---

## 🔧 Если что-то не работает

### Ошибка: "Cannot find module..."
```bash
npm install
```

### Ошибка: "Supabase connection failed"
1. Проверьте URL и ключи в `.env.local`
2. Убедитесь, что Supabase проект активен

### Ошибка: "Table does not exist"
1. Запустите SQL из шага 4 еще раз
2. Проверьте, что таблица создана в Supabase Table Editor

### Ошибка: "Build failed on Vercel"
1. Посмотрите логи в Vercel Dashboard → Deployments
2. Проверьте переменные окружения
3. Запустите локально: `npm run build`

---

## 📝 Полезные команды

```bash
npm run dev       # Локальный dev сервер
npm run build     # Сборка для продакшена
npm run start     # Запуск собранного приложения
npm run lint      # Проверка кода (если настроено)
```

---

## 📚 Дальше:

1. **Дизайн**: Отредактируйте `tailwind.config.js` и `app/globals.css`
2. **Поля формы**: Добавьте новые поля в `components/RecruitmentForm.tsx`
3. **Админ-панель**: Кастомизируйте в `components/AdminPanel.tsx`
4. **Пароль админа**: Измните `ADMIN_PASSWORD` в `.env.local`

---

**Готово! Теперь у вас есть полнофункциональное приложение для набора в клан! 🎮**

Читайте полные инструкции в:
- `README.md` - Основное описание
- `SETUP_SUPABASE.md` - Подробная настройка БД
- `DEPLOYMENT.md` - Развертывание на разные платформы
- `FAQ.md` - Ответы на вопросы
- `ARCHITECTURE.md` - Техническая архитектура
