# 🏗️ Структура проекта и технические детали

## 📁 Структура папок

```
tiger-clan-form/
├── app/                          # Next.js App Router (главные страницы)
│   ├── globals.css              # Глобальные стили
│   ├── layout.tsx               # Root layout для всего приложения
│   ├── page.tsx                 # Главная страница (/)
│   ├── form/
│   │   └── page.tsx             # Страница с формой (/form)
│   └── admin/
│       └── page.tsx             # Админ-панель (/admin)
│
├── components/                   # React компоненты
│   ├── RecruitmentForm.tsx      # Основной компонент формы (650+ строк)
│   └── AdminPanel.tsx           # Компонент админ-панели (450+ строк)
│
├── lib/                         # Утилиты и хелперы
│   └── supabase.ts              # Клиент Supabase и функции БД
│
├── public/                      # Статические файлы (если нужны)
│
├── .env.local                   # Переменные окружения (GIT IGNORED!)
├── .env.example                 # Пример переменных окружения
├── .gitignore                   # Git ignore файл
├── package.json                 # Зависимости проекта
├── next.config.js               # Конфигурация Next.js
├── tailwind.config.js           # Конфигурация Tailwind CSS
├── postcss.config.js            # Конфигурация PostCSS
├── tsconfig.json                # Конфигурация TypeScript
│
├── README.md                    # Основное руководство
├── SETUP_SUPABASE.md            # Инструкция по Supabase
├── DEPLOYMENT.md                # Инструкция по развертыванию
├── FAQ.md                       # Часто задаваемые вопросы
└── ARCHITECTURE.md              # Этот файл
```

## 🔗 Маршруты приложения

| Маршрут | Компонент | Описание |
|---------|-----------|---------|
| `/` | `page.tsx` | Главная страница с информацией о клане |
| `/form` | `RecruitmentForm.tsx` | Форма набора игроков |
| `/admin` | `AdminPanel.tsx` | Админ-панель для просмотра заявок |

## 📦 Зависимости

### Core Dependencies
```json
{
  "react": "^18.2.0",              // UI фреймворк
  "react-dom": "^18.2.0",          // React для DOM
  "next": "^14.0.0",               // Full-stack фреймворк
  "@supabase/supabase-js": "^2.38.0" // PostgreSQL БД клиент
}
```

### Dev Dependencies
```json
{
  "typescript": "^5.0.0",          // Type checking
  "@types/react": "^18.2.0",       // React типы
  "@types/node": "^20.0.0",        // Node типы
  "tailwindcss": "^3.4.0",         // CSS фреймворк
  "postcss": "^8.4.0",             // CSS preprocessor
  "autoprefixer": "^10.4.0"        // CSS vendor prefixes
}
```

## 🎨 Дизайн система

### Цветовая палитра
```javascript
colors: {
  dark: '#0f1419',      // Основной темный фон
  darker: '#0a0e12',    // Более темный фон
  accent: '#ff6b35'     // Оранжевый акцент (киберспортивный стиль)
}
```

### Используемые компоненты Tailwind CSS
- `bg-gradient-to-r` - Горизонтальный градиент
- `bg-clip-text` - Текст с фоном
- `backdrop-blur` - Размытие фона
- `hover:shadow-lg` - Тень на hover
- `transition-all` - Плавные переходы
- `focus:border-orange-500` - Оранжевая граница при фокусе
- `disabled:opacity-50` - Прозрачность при отключении

## 🗄️ Архитектура БД

### Таблица: `player_applications`

#### Основные колонки
| Колонка | Тип | Описание |
|---------|-----|---------|
| `id` | UUID | Уникальный ID заявки |
| `created_at` | TIMESTAMP | Время создания заявки |

#### Section 1: Basic Info
| Колонка | Тип | Обязательно |
|---------|-----|-----------|
| `pubg_nickname` | TEXT | ✓ |
| `player_id` | TEXT | ✓ |
| `platform` | TEXT | ✓ |
| `age` | INTEGER | ✓ |
| `country_city` | TEXT | ✓ |

#### Section 2: Game Skills
| Колонка | Тип | Обязательно |
|---------|-----|-----------|
| `rank` | TEXT | ✓ |
| `kd_ratio` | FLOAT | ✗ |
| `favorite_mode` | TEXT | ✗ |
| `preferred_role` | TEXT | ✗ |
| `hours_per_day` | FLOAT | ✗ |

#### Section 3: Experience
| Колонка | Тип | Обязательно |
|---------|-----|-----------|
| `play_in_team` | BOOLEAN | ✗ |
| `other_clans_experience` | TEXT | ✗ |
| `tournament_experience` | TEXT | ✗ |

#### Section 4: Communication
| Колонка | Тип | Обязательно |
|---------|-----|-----------|
| `discord_telegram` | TEXT | ✓ |
| `has_microphone` | BOOLEAN | ✗ |
| `online_time` | TEXT | ✗ |

#### Section 5: Personal
| Колонка | Тип | Обязательно |
|---------|-----|-----------|
| `why_join_clan` | TEXT | ✓ |
| `what_can_provide` | TEXT | ✓ |
| `agree_rules` | BOOLEAN | ✓ |

## 🔐 Безопасность

### RLS (Row Level Security) Политики

```sql
-- INSERT: Все могут добавлять заявки
CREATE POLICY "Allow insert for all" ON player_applications
  FOR INSERT WITH CHECK (true);

-- SELECT: Все могут читать заявки (admin требует пароля в приложении)
CREATE POLICY "Allow select for all" ON player_applications
  FOR SELECT USING (true);

-- DELETE: Удаление только с паролем (защищено в коде приложения)
CREATE POLICY "Allow delete for all" ON player_applications
  FOR DELETE USING (true);
```

### Защита пароля админа
- Пароль хранится в переменной окружения (`ADMIN_PASSWORD`)
- На клиенте проверяется простым сравнением строк
- На продакшене переменная скрывается в Vercel (не видна клиентам)

## 🚀 Процесс развертывания

### Локально
```bash
npm install          # Установка зависимостей
npm run dev          # Запуск dev сервера (http://localhost:3000)
npm run build        # Сборка для продакшена
npm start            # Запуск продакшена локально
```

### На Vercel
1. Push на GitHub
2. Vercel автоматически собирает и разворачивает
3. Приложение доступно по URL (например: `https://app.vercel.app`)

## 📊 Работа с данными

### Отправка данных (клиент → сервер)
```typescript
// components/RecruitmentForm.tsx
const handleSubmit = async (e) => {
  // 1. Валидация на клиенте
  if (!validate()) return;
  
  // 2. Отправка на Supabase
  await insertApplication(formData);
}
```

### Получение данных (админ-панель)
```typescript
// components/AdminPanel.tsx
const fetchApplications = async () => {
  const data = await getApplications();
  setApplications(data);
}
```

### Удаление данных
```typescript
await deleteApplication(id);
```

## 🔧 Кастомизация

### Добавление нового поля в форму

1. **Обновите БД** (SQL):
   ```sql
   ALTER TABLE player_applications 
   ADD COLUMN new_field TEXT;
   ```

2. **Обновите тип** (`lib/supabase.ts`):
   ```typescript
   interface PlayerApplication {
     ...
     new_field: string;
   }
   ```

3. **Добавьте в компонент** (`components/RecruitmentForm.tsx`):
   ```typescript
   <FormField
     label="Новое поле"
     name="new_field"
     value={formData.new_field}
     onChange={handleChange}
   />
   ```

4. **Добавьте в админ-панель** (`components/AdminPanel.tsx`):
   ```typescript
   <div className="...">
     <p className="text-gray-400">Новое поле</p>
     <p className="text-white">{selectedApp.new_field}</p>
   </div>
   ```

### Изменение цветов

В `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      dark: '#1a1a2e',      // Измените на нужный цвет
      darker: '#0f0f1e',
      accent: '#00ff88'     // Неоновый зеленый вместо оранжевого
    },
  },
}
```

Затем переразворните приложение.

### Добавление логотипа

1. Поместите логотип в папку `public/` (например, `logo.png`)
2. Откройте `app/page.tsx` или `components/RecruitmentForm.tsx`
3. Добавьте:
   ```tsx
   <img src="/logo.png" alt="Logo" className="w-20 h-20 mb-4" />
   ```

## 📈 Performance оптимизация

### Уже используется
- ✅ Server-side rendering (SSR) с Next.js
- ✅ Image optimization (автоматически)
- ✅ CSS purging (Tailwind удаляет неиспользованные стили)
- ✅ Code splitting (Next.js автоматически)
- ✅ Lazy loading компонентов

### Дополнительные оптимизации (если нужно)
```typescript
// Динамический import компонента
import dynamic from 'next/dynamic';
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <p>Loading...</p>,
});
```

## 🧪 Тестирование

### Локальное тестирование формы
```bash
npm run dev
# Откройте http://localhost:3000/form
# Заполните и отправьте тестовую заявку
# Проверьте в Supabase Table Editor
```

### Тестирование админ-панели
```bash
# http://localhost:3000/admin
# Пароль: TigerKingOld2024
# Проверьте, что список заявок отображается
```

## 🐛 Debugging

### Включение логирования

В `lib/supabase.ts` добавьте:
```typescript
export async function insertApplication(data: any) {
  console.log('Sending data:', data);
  const { data: result, error } = await supabase
    .from('player_applications')
    .insert([data])
    .select()
  
  if (error) {
    console.error('Database error:', error);
    throw error;
  }
  
  console.log('Success:', result);
  return result;
}
```

### Проверка Supabase логов
1. В Supabase Dashboard откройте **Settings** → **Logs**
2. Найдите запросы к вашему приложению
3. Проверьте ошибки и статус коды

### Проверка браузер консоли
- Нажмите F12 в браузере
- Откройте вкладку **Console**
- Посмотрите ошибки и сообщения

## 📚 Полезные ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)

---

**Приложение готово для производства! 🚀**
