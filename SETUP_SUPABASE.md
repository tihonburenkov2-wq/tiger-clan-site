# 🗄️ Руководство по настройке Supabase

## Шаг 1: Создание проекта Supabase

1. Откройте [supabase.com](https://supabase.com)
2. Нажмите **"Sign In"** или создайте новый аккаунт
3. В dashboardе нажмите **"New project"**
4. Заполните данные:
   - **Project name**: `tiger-king-old` (или любое другое имя)
   - **Database Password**: Создайте сильный пароль (запомните его!)
   - **Region**: Выберите ближайший регион (например, Frankfurt для Европы)
5. Нажмите **"Create new project"** и дождитесь инициализации (~5 мин)

## Шаг 2: Получение API ключей

1. В левом меню нажмите **Settings** → **API**
2. Скопируйте следующие значения:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** ключ → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** ключ → `SUPABASE_SERVICE_ROLE_KEY`

Пример:
```
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Шаг 3: Создание таблицы в БД

1. Откройте **SQL Editor** в левом меню
2. Нажмите **"New query"**
3. Скопируйте и вставьте этот SQL код:

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

4. Нажмите **"Run"** (или Ctrl+Enter)
5. Если нет ошибок - таблица создана успешно!

## Шаг 4: Настройка RLS (Row Level Security) - ВАЖНО!

RLS помогает защитить базу данных. Типовая конфигурация:

## Шаг 4: Заполнение .env.local

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
ADMIN_PASSWORD=TigerKingOld2024
```

**ВАЖНО**: 
- `.env.local` никогда не коммитьте в Git!
- Он в `.gitignore` - это нормально
- На Vercel добавите эти переменные в Settings → Environment Variables

## Шаг 5: Проверка подключения

1. Запустите приложение: `npm run dev`
2. Откройте форму: http://localhost:3000/form
3. Заполните и отправьте тестовую заявку
4. Вернитесь в Supabase Dashboard → **Table Editor**
5. Выберите `applications`
6. Вы должны увидеть вашу заявку в таблице!

## Решение проблем

### Проблема: "Failed to connect to Supabase"
- ✅ Проверьте, что `NEXT_PUBLIC_SUPABASE_URL` и ключи правильные
- ✅ Проверьте интернет соединение
- ✅ Убедитесь, что Supabase проект активирован

### Проблема: "Table 'applications' does not exist"
- ✅ Проверьте, что вы выполнили SQL из шага 3
- ✅ Обновите страницу и попробуйте снова

### Проблема: Не отправляется форма
- ✅ Откройте браузер DevTools (F12) → Console
- ✅ Посмотрите ошибку, скопируйте текст
- ✅ Проверьте, что в форме все требуемые поля заполнены

### Проблема: Админ-панель не показывает заявки
- ✅ Проверьте пароль (по умолчанию: `TigerKingOld2024`)
- ✅ Убедитесь, что заявки есть в БД (в Table Editor)
- ✅ Нажмите "Обновить" в админ-панели

## Экспорт данных

Чтобы скачать все заявки в CSV:

1. В Supabase → Table Editor → `applications`
2. Нажмите кнопку **Download** (три точки вверху справа)
3. Выберите формат CSV
4. Готово! Вы получите файл со всеми заявками

## Бэкапы

Supabase автоматически делает бэкапы. Они хранятся в меню **Backups** (в Settings).

---

**Все готово!** Теперь ваше приложение полностью функционально. 🚀
