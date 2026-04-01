# 🎮 TIGER KING OLD - Система набора в клан

**Полнофункциональное веб-приложение для набора игроков в киберспортивный клан**

---

## 🚀 За 5 минут до публикации

### Что вам понадобится:
- Компьютер с интернетом
- Аккаунт на [supabase.com](https://supabase.com) (бесплатный)
- Аккаунт на [vercel.com](https://vercel.com) (бесплатный)

### Три простых шага:

#### 1. Создайте Supabase проект (2 мин)
```bash
# https://supabase.com
1. Sign Up → New Project
2. Назовите: tiger-king-old-recruitment
3. Создайте пароль базы данных
4. Settings → API (скопируйте ключи)
```

#### 2. Создайте таблицу (1 мин)
```bash
# В Supabase Dashboard откройте SQL Editor
SQL Editor → New Query → (скопируйте SQL из SETUP_SUPABASE.md)
```

#### 3. Разверните на Vercel (2 мин)
```bash
# https://vercel.com
1. Sign In with GitHub
2. Import Project → Select Repository
3. Add Environment Variables (из шага 1)
4. Deploy
```

**Готово! Ваше приложение в интернет! 🎉**

URL: `https://your-project.vercel.app`

---

## 📚 Документация

| Файл | Для кого | Время чтения |
|------|----------|-------------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Новичков | 5 мин |
| **[README.md](./README.md)** | Всех | 10 мин |
| **[SETUP_SUPABASE.md](./SETUP_SUPABASE.md)** | БД администраторов | 15 мин |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | DevOps инженеров | 15 мин |
| **[Architecture.md](./ARCHITECTURE.md)** | Разработчиков | 20 мин |
| **[FAQ.md](./FAQ.md)** | Тех, кто застрял | 10 мин |

---

## ✨ Главные особенности

### 🎨 Пользовательская форма
- ✅ Темная тема с киберспортивным стилем
- ✅ 5 разделов (19 полей)
- ✅ Валидация в реальном времени
- ✅ Адаптивный дизайн (мобила, планшет, ПК)
- ✅ Плавные анимации и переходы
- ✅ Успешное уведомление после отправки

### 🔐 Админ-панель
- ✅ Защита паролем
- ✅ Таблица со всеми заявками
- ✅ Просмотр подробной информации
- ✅ Статистика (всего заявок, сегодня, с микрофоном)
- ✅ Удаление заявок
- ✅ Обновление списка в реальном времени

### 🗄️ База данных
- ✅ Supabase PostgreSQL
- ✅ Автоматические бэкапы
- ✅ Row Level Security (RLS)
- ✅ Индексы для быстрого поиска

### 🚀 Развертывание
- ✅ Vercel (автоматического развертывание с GitHub)
- ✅ Docker (для контейнеризации)
- ✅ Другие платформы (Render.com, Railway.app, и т.д.)

---

## 🎯 Процесс работы

### Для игроков:
```
1. Открывают /form
2. Заполняют форму (5-10 минут)
3. Отправляют заявку
4. Видят сообщение об успехе
5. Ждут контакта админов по Discord/Telegram
```

### Для администраторов:
```
1. Открывают /admin (вводят пароль)
2. Видят список всех заявок в таблице
3. Смотрят подробные ответы в боковой панели
4. Открывают Discord/Telegram игрока
5. Предлагают присоединиться к клану
```

---

## 💻 Технологический стек

### Frontend
- **Next.js 14** - Full-stack React фреймворк
- **React 18** - UI библиотека
- **TypeScript** - Типизация кода
- **Tailwind CSS** - Утилити-классы CSS
- **Vercel** - Хостинг (автоматическое развертывание)

### Backend
- **Next.js API Routes** - Serverless функции
- **Supabase** - PostgreSQL БД с REST API
- **Row Level Security** - Защита данных

### Инструменты разработки
- **npm** - Менеджер пакетов
- **Git** - Контроль версий
- **VS Code** - IDEеди редактор

---

## 📊 Структура базы данных

```sql
player_applications (таблица)
├── 🆔 id (UUID) - Уникальный ID
├── 📅 created_at (TIMESTAMP) - Дата создания
│
├── 👤 СЕКЦИЯ 1: Основная информация
│   ├── pubg_nickname* (TEXT)
│   ├── player_id* (TEXT)
│   ├── platform* (TEXT: PC/Mobile/Console)
│   ├── age* (INTEGER)
│   └── country_city* (TEXT)
│
├── 🎮 СЕКЦИЯ 2: Игровые навыки
│   ├── rank* (TEXT)
│   ├── kd_ratio (FLOAT)
│   ├── favorite_mode (TEXT)
│   ├── preferred_role (TEXT)
│   └── hours_per_day (FLOAT)
│
├── ⚔️ СЕКЦИЯ 3: Опыт
│   ├── play_in_team (BOOLEAN)
│   ├── other_clans_experience (TEXT)
│   └── tournament_experience (TEXT)
│
├── 💬 СЕКЦИЯ 4: Связь
│   ├── discord_telegram* (TEXT)
│   ├── has_microphone (BOOLEAN)
│   └── online_time (TEXT)
│
└── 📜 СЕКЦИЯ 5: Личное
    ├── why_join_clan* (TEXT)
    ├── what_can_provide* (TEXT)
    └── agree_rules* (BOOLEAN)

* = обязательное поле
```

---

## 🔧 Кастомизация

### Изменить цвет
```javascript
// tailwind.config.js
colors: {
  accent: '#ff6b35',  // Оранжевый на зеленый
}
```

### Добавить новое поле
```sql
-- Supabase SQL Editor
ALTER TABLE player_applications 
ADD COLUMN new_field TEXT;
```

Затем обновите форму и админ-панель.

### Изменить пароль админа
```env
# .env.local
ADMIN_PASSWORD=YourNewPassword123
```

---

## 📱 Примеры использования

### Форма для клана PUBG
```
URL: https://your-domain.com/form
Игроки заполняют анкету и отправляют заявку
```

### Форма для киберспортивных турниров
```
Добавьте поля: "Опыт в турнирах", "Серьезность участия"
```

### Форма для набора в команду
```
Добавьте поля: "Предпочитаемые партнеры", "Желаемое место"
```

---

## 🆘 Частые проблемы

| Проблема | Решение |
|----------|---------|
| "Cannot connect to Supabase" | Проверьте URL и ключи в .env.local |
| "Table does not exist" | Запустите SQL скрипт из SETUP_SUPABASE.md |
| "Form not submitting" | Посмотрите ошибки в Browser Console (F12) |
| "Admin panel shows blank" | Обновите страницу и нажмите "Refresh" кнопку |
| "Stuck on email verification" | Проверьте спам папку в почте |

Полные ответы: [FAQ.md](./FAQ.md)

---

## 🤝 Поддержка

### Если нужна помощь:
1. Прочитайте [FAQ.md](./FAQ.md)
2. Проверьте ошибки в браузере (F12 → Console)
3. Посмотрите логи Supabase (Settings → Logs)
4. Посмотрите логи Vercel (Dashboard → Deployments)
5. Прочитайте документацию [Supabase Docs](https://supabase.com/docs)

---

## 📈 Performance

- ✅ **Время загрузки**: < 2 сек (на быстром интернете)
- ✅ **Масштабируемость**: неограниченно (Supabase масштабируется)
- ✅ **Concurrent users**: тысячи одновременно (CDN от Vercel)
- ✅ **Database**: автоматические бэкапы каждый день

---

## 🔐 Безопасность

### Что защищено:
- ✅ HTTPS соединение (Vercel)
- ✅ Row Level Security в Supabase
- ✅ Пароль администратора в переменных окружения
- ✅ Нет хранения паролей пользователей

### Что рекомендуется:
- ✅ Используйте сильный пароль (12+ символов)
- ✅ Не делитесь паролем админа
- ✅ Включите 2FA на Vercel и Supabase
- ✅ Регулярно проверяйте логи

---

## 📞 Контакты для вопросов

- **Supabase Support**: https://supabase.com/support
- **Vercel Support**: https://vercel.com/support
- **Next.js Community**: https://nextjs.org/community
- **React Community**: https://react.dev/community

---

## 📄 Лицензия

MIT - Свободное использование для личных и коммерческих проектов

---

## 🎉 Начало работы

**Начните здесь**: [QUICKSTART.md](./QUICKSTART.md) (5 минут)

Потом читайте:
1. [SETUP_SUPABASE.md](./SETUP_SUPABASE.md) - настройка БД
2. [DEPLOYMENT.md](./DEPLOYMENT.md) - развертывание

Если что-то непонятно:
- [FAQ.md](./FAQ.md) - Часто задаваемые вопросы
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Техническая архитектура

---

## ⚡ Быстрая команда

```bash
# Установка и запуск за 1 минуту
git clone https://github.com/YOUR_USERNAME/tiger-king-old-recruitment.git
cd tiger-clan-form
npm install
echo "Заполните .env.local"
npm run dev
```

Откройте http://localhost:3000 в браузере.

---

**Готово! 🚀 Ваш клан в интернет!**

Делитесь ссылкой:
- 🎮 Для игроков: `https://your-domain.vercel.app/form`
- 🔐 Для админов: `https://your-domain.vercel.app/admin` (пароль: TigerKingOld2024)

**TIGER KING OLD** - Киберспортивный клан нового поколения! 👑
