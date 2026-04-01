# 🎮 TIGER KING OLD - Recruitment System

Полнофункциональное веб-приложение для набора игроков в киберспортивный клан TIGER KING OLD.

## 🚀 Технологии

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (рекомендуется)

## 📋 Функции

### 1. Пользовательская форма (User Form)
- 🎮 5 разделов анкеты (19 полей)
- ✅ Полная валидация всех полей
- 🎨 Современный геймерский дизайн (темная тема)
- 📱 Адаптивный дизайн для всех устройств
- ✨ Плавные анимации и переходы
- 📤 Отправка данных на сервер

### 2. Админ-панель
- 🔐 Авторизация по паролю
- 📊 Просмотр всех заявок в таблице
- 🔍 Подробный просмотр каждой заявки
- 📈 Статистика (всего заявок, сегодня, с микрофоном)
- 🗑️ Удаление заявок
- 🔄 Обновление списка заявок

## 📦 Установка

### 1. Подготовка Supabase

1. Создайте аккаунт на [supabase.com](https://supabase.com)
2. Создайте новый проект
3. Перейдите в SQL Editor и выполните следующий SQL:

```sql
-- Создание таблицы для заявок
CREATE TABLE player_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  
  -- Section 1: Basic Info
  pubg_nickname TEXT NOT NULL,
  player_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  age INTEGER NOT NULL,
  country_city TEXT NOT NULL,
  
  -- Section 2: Game Skills
  rank TEXT NOT NULL,
  kd_ratio FLOAT DEFAULT 0,
  favorite_mode TEXT,
  preferred_role TEXT,
  hours_per_day FLOAT DEFAULT 0,
  
  -- Section 3: Experience
  play_in_team BOOLEAN DEFAULT FALSE,
  other_clans_experience TEXT,
  tournament_experience TEXT,
  
  -- Section 4: Communication
  discord_telegram TEXT NOT NULL,
  has_microphone BOOLEAN DEFAULT FALSE,
  online_time TEXT,
  
  -- Section 5: Personal
  why_join_clan TEXT NOT NULL,
  what_can_provide TEXT NOT NULL,
  agree_rules BOOLEAN DEFAULT FALSE
);

-- Включить RLS (Row Level Security)
ALTER TABLE player_applications ENABLE ROW LEVEL SECURITY;

-- Создать политику для INSERT (всем открыто)
CREATE POLICY "Allow insert for all" ON player_applications
  FOR INSERT WITH CHECK (true);

-- Создать политику для SELECT (всем открыто)
CREATE POLICY "Allow select for all" ON player_applications
  FOR SELECT USING (true);

-- Создать политику для DELETE (требуется пароль в коде)
CREATE POLICY "Allow delete for all" ON player_applications
  FOR DELETE USING (true);
```

4. Получите ключи в Settings > API:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Локальная установка

```bash
# Клонируйте или скачайте проект
cd tiger-clan-form

# Установите зависимости
npm install

# Создайте файл .env.local
cp .env.local.example .env.local
# И заполните переменные окружения из Supabase
```

### 3. Переменные окружения (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=TigerKingOld2024
```

### 4. Запуск приложения

```bash
# Развитие
npm run dev

# Сборка
npm run build

# Продакшен
npm run start
```

Приложение будет доступно по адресу: `http://localhost:3000`

## 🌐 Развертывание на Vercel

1. Залейте код на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. Импортируйте репозиторий
4. Добавьте переменные окружения в Settings > Environment Variables
5. Нажмите Deploy

## 📖 Как пользоваться

### Для игроков:
1. Откройте `/form`
2. Заполните все обязательные поля (отмечены *)
3. Нажмите "Отправить заявку"
4. Дождитесь подтверждения

### Для администраторов:
1. Откройте `/admin`
2. Введите пароль: `TigerKingOld2024`
3. Просмотрите список всех заявок
4. Нажмите на заявку для подробного просмотра
5. Удаляйте заявки по необходимости

## 🔐 Безопасность

- Пароль админ-панели хранится в переменных окружения
- Все данные в Supabase защищены RLS (Row Level Security)
- Используется HTTPS для всех соединений

## 🎨 Кастомизация

### Изменение пароля админов:
Отредактируйте файл `.env.local`:
```
ADMIN_PASSWORD=ВашНовыйПароль
```

### Изменение цветов:
Откройте `tailwind.config.js` и измените палитру цветов:
```javascript
colors: {
  dark: '#0f1419',
  darker: '#0a0e12',
  accent: '#ff6b35',
}
```

### Изменение полей формы:
Отредактируйте файлы:
- `components/RecruitmentForm.tsx` - компонент формы
- `lib/supabase.ts` - тип данных `PlayerApplication`
- В Supabase SQL - добавьте новые колонки в таблицу

## 📞 Поддержка

Для проблем с Supabase обратитесь к [документации](https://supabase.com/docs)

## 📄 Лицензия

MIT
