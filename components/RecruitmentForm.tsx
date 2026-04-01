'use client'

import { useState } from 'react'
import { insertApplication, Application } from '@/lib/supabase'

// ===== Компоненты вынесены ЗА пределы функции =====

interface FormSectionProps {
  icon: string
  title: string
  children: React.ReactNode
}

const FormSection = ({ icon, title, children }: FormSectionProps) => (
  <div className="bg-gray-800 bg-opacity-30 border border-gray-700 rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-white">
      <span>{icon}</span> {title}
    </h2>
    <div className="space-y-4">{children}</div>
  </div>
)

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: any; label: string }> | null
  value: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  error?: string | null
}

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  options = null,
  value,
  onChange,
  error: fieldError = null,
}: FormFieldProps) => (
  <div>
    <label className="block text-sm font-semibold mb-2 text-gray-200">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none ${
          fieldError ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
        }`}
        rows={4}
      />
    ) : type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none ${
          fieldError ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
        }`}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={type === 'number' ? 0 : undefined}
        className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-500 focus:outline-none ${
          fieldError ? 'border-red-500' : 'border-gray-600 focus:border-orange-500'
        }`}
      />
    )}
    {fieldError && <p className="text-red-400 text-sm mt-1">{fieldError}</p>}
  </div>
)

interface RadioGroupProps {
  label: string
  name: string
  options: Array<{ value: boolean | string; label: string }>
  value: boolean | string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  error?: string | null
}

const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  error: fieldError = null,
}: RadioGroupProps) => (
  <div>
    <label className="block text-sm font-semibold mb-3 text-gray-200">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={String(opt.value)} className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={String(opt.value)}
            checked={value === opt.value}
            onChange={onChange}
            className="w-4 h-4"
          />
          <span className="text-gray-300">{opt.label}</span>
        </label>
      ))}
    </div>
    {fieldError && <p className="text-red-400 text-sm mt-2">{fieldError}</p>}
  </div>
)

// ===== Основной компонент формы =====

const RecruitmentForm = () => {
  const [formData, setFormData] = useState<Omit<Application, 'id' | 'created_at'>>({
    pubg_nickname: '',
    player_id: '',
    platform: 'PC',
    age: 18,
    location: '',
    rank: '',
    kd: 0,
    favorite_mode: 'классика',
    role: 'универсал',
    hours_per_day: 0,
    team_play: false,
    previous_clans: '',
    tournament_exp: '',
    contacts: '',
    has_mic: false,
    online_time: '',
    why_join: '',
    what_can_give: '',
    ready_to_follow_rules: false,
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Validation
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.pubg_nickname.trim()) newErrors.pubg_nickname = 'Обязательное поле'
    if (!formData.player_id.trim()) newErrors.player_id = 'Обязательное поле'
    if (!formData.location.trim()) newErrors.location = 'Обязательное поле'
    if (!formData.rank.trim()) newErrors.rank = 'Обязательное поле'
    if (formData.age < 13 || formData.age > 120) newErrors.age = 'Введите корректный возраст'
    if (!formData.contacts.trim()) newErrors.contacts = 'Обязательное поле'
    if (!formData.why_join.trim()) newErrors.why_join = 'Обязательное поле'
    if (!formData.what_can_give.trim()) newErrors.what_can_give = 'Обязательное поле'
    if (!formData.ready_to_follow_rules) newErrors.ready_to_follow_rules = 'Вы должны согласиться с правилами'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error for this field
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[name]
      return newErrors
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validate()) {
      setError('Пожалуйста, заполните все обязательные поля')
      return
    }

    setLoading(true)
    try {
      await insertApplication(formData)
      setSuccess(true)
      setFormData({
        pubg_nickname: '',
        player_id: '',
        platform: 'PC',
        age: 18,
        location: '',
        rank: '',
        kd: 0,
        favorite_mode: 'классика',
        role: 'универсал',
        hours_per_day: 0,
        team_play: false,
        previous_clans: '',
        tournament_exp: '',
        contacts: '',
        has_mic: false,
        online_time: '',
        why_join: '',
        what_can_give: '',
        ready_to_follow_rules: false,
      })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error('Error:', err)
      setError('Ошибка при отправке формы. Проверьте соединение с интернетом.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            TIGER KING OLD
          </h1>
          <p className="text-gray-400 text-lg">Форма приема в киберспортивный клан</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-900 border border-green-600 text-green-100 px-6 py-4 rounded-lg mb-6 flex items-center gap-3">
            <span className="text-2xl">✓</span>
            <div>
              <p className="font-bold">Заявка успешно отправлена!</p>
              <p className="text-sm">Спасибо за интерес к нашему клану. Мы скоро свяжемся с вами.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 border border-red-600 text-red-100 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <FormSection icon="🎮" title="Основная информация">
            <FormField
              label="Ник в PUBG"
              name="pubg_nickname"
              placeholder="Введите ваш ник"
              required
              value={formData.pubg_nickname}
              onChange={handleChange}
              error={errors.pubg_nickname}
            />

            <FormField
              label="ID игрока"
              name="player_id"
              placeholder="Введите ID"
              required
              value={formData.player_id}
              onChange={handleChange}
              error={errors.player_id}
            />

            <FormField
              label="Платформа"
              name="platform"
              type="select"
              value={formData.platform}
              onChange={handleChange}
              options={[
                { value: 'PC', label: 'PC' },
                { value: 'Mobile', label: 'Mobile' },
                { value: 'Console', label: 'Console' },
              ]}
            />

            <FormField
              label="Возраст"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              error={errors.age}
            />

            <FormField
              label="Страна / Город"
              name="location"
              placeholder="Например: Украина, Киев"
              required
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
            />
          </FormSection>

          {/* Section 2: Game Skills */}
          <FormSection icon="🔥" title="Игровые навыки">
            <FormField
              label="Ваш ранг (сезон / текущий)"
              name="rank"
              placeholder="Например: Diamond 2"
              required
              value={formData.rank}
              onChange={handleChange}
              error={errors.rank}
            />

            <FormField
              label="K/D (примерно)"
              name="kd"
              type="number"
              placeholder="Например: 2.5"
              value={formData.kd}
              onChange={handleChange}
              min="0"
              step="0.1"
            />

            <FormField
              label="Любимый режим"
              name="favorite_mode"
              type="select"
              value={formData.favorite_mode}
              onChange={handleChange}
              options={[
                { value: 'классика', label: 'Классика' },
                { value: 'аркада', label: 'Аркада' },
                { value: 'метро_рояль', label: 'Метро рояль' },
                { value: 'TDM', label: 'TDM' },
                { value: 'другое', label: 'Другое' },
              ]}
            />

            <FormField
              label="Предпочитаемая роль"
              name="role"
              type="select"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'снайпер', label: 'Снайпер' },
                { value: 'рашер', label: 'Рашер' },
                { value: 'саппорт', label: 'Саппорт' },
                { value: 'универсал', label: 'Универсал' },
              ]}
            />

            <FormField
              label="Сколько часов в день играете"
              name="hours_per_day"
              type="number"
              placeholder="Например: 3"
              value={formData.hours_per_day}
              onChange={handleChange}
              min="0"
              step="0.5"
            />
          </FormSection>

          {/* Section 3: Experience */}
          <FormSection icon="⚔️" title="Опыт">
            <RadioGroup
              label="Играете ли вы в команде"
              name="team_play"
              options={[
                { value: true, label: 'Да' },
                { value: false, label: 'Нет' },
              ]}
              value={formData.team_play}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  team_play: e.target.value === 'true',
                }))
              }
            />

            <FormField
              label="Были ли в других кланах (если да — каких и почему ушли)"
              name="previous_clans"
              type="textarea"
              placeholder="Расскажите о вашем опыте в других кланах..."
              value={formData.previous_clans}
              onChange={handleChange}
            />

            <FormField
              label="Опыт участия в турнирах (если есть)"
              name="tournament_exp"
              type="textarea"
              placeholder="Опишите ваш опыт участия в турнирах..."
              value={formData.tournament_exp}
              onChange={handleChange}
            />
          </FormSection>

          {/* Section 4: Communication */}
          <FormSection icon="💬" title="Связь и активность">
            <FormField
              label="Discord / Telegram (укажите ник)"
              name="contacts"
              placeholder="Например: Discord#1234 или @username"
              required
              value={formData.contacts}
              onChange={handleChange}
              error={errors.contacts}
            />

            <RadioGroup
              label="Есть ли микрофон"
              name="has_mic"
              options={[
                { value: true, label: 'Да' },
                { value: false, label: 'Нет' },
              ]}
              value={formData.has_mic}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  has_mic: e.target.value === 'true',
                }))
              }
            />

            <FormField
              label="В какое время обычно онлайн"
              name="online_time"
              placeholder="Например: 18:00 - 23:00 по MSK"
              value={formData.online_time}
              onChange={handleChange}
            />
          </FormSection>

          {/* Section 5: Personal */}
          <FormSection icon="📜" title="Личная информация">
            <FormField
              label="Почему хотите вступить в клан"
              name="why_join"
              type="textarea"
              placeholder="Расскажите о своих мотивациях..."
              required
              value={formData.why_join}
              onChange={handleChange}
              error={errors.why_join}
            />

            <FormField
              label="Что можете дать клану (скилл, онлайн, помощь и т.д.)"
              name="what_can_give"
              type="textarea"
              placeholder="Опишите, что вы можете предложить клану..."
              required
              value={formData.what_can_give}
              onChange={handleChange}
              error={errors.what_can_give}
            />

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="ready_to_follow_rules"
                checked={formData.ready_to_follow_rules}
                onChange={handleChange}
                className="w-4 h-4 mt-1"
              />
              <span className="text-gray-300">
                Я готов соблюдать правила клана и слушать лидера <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.ready_to_follow_rules && <p className="text-red-400 text-sm mt-2">{errors.ready_to_follow_rules}</p>}
          </FormSection>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Отправляем...' : 'ОТПРАВИТЬ ЗАЯВКУ'}
            </button>
            <button
              type="reset"
              disabled={loading}
              className="px-8 py-4 border border-gray-500 text-gray-300 font-bold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              Очистить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecruitmentForm
