'use client'

import { useState, useEffect } from 'react'
import { getApplications, deleteApplication, Application } from '@/lib/supabase'

const AdminPanel = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Check localStorage on component mount
  useEffect(() => {
    const isAuthed = localStorage.getItem('adminAuthenticated') === 'true'
    if (isAuthed) {
      setIsAuthenticated(true)
      fetchApplications()
    }
    setIsHydrated(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'TigerKingOld2024') {
      setIsAuthenticated(true)
      localStorage.setItem('adminAuthenticated', 'true')
      setPassword('')
      setError(null)
      fetchApplications()
    } else {
      setError('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setApplications([])
    localStorage.removeItem('adminAuthenticated')
  }

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getApplications()
      setApplications(data || [])
    } catch (err) {
      console.error('Error fetching applications:', err)
      setError('Ошибка при загрузке заявок')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту заявку?')) return

    setDeleteLoading(id)
    try {
      await deleteApplication(id)
      setApplications(apps => apps.filter(app => app.id !== id))
      setSelectedApp(null)
    } catch (err) {
      console.error('Error deleting application:', err)
      setError('Ошибка при удалении заявки')
    } finally {
      setDeleteLoading(null)
    }
  }

  if (!isHydrated) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2 text-white">Admin Panel</h1>
          <p className="text-gray-400 mb-6">TIGER KING OLD</p>

          <form onSubmit={handleLogin}>
            <label className="block text-sm font-semibold mb-2 text-gray-200">
              Пароль администратора
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 mb-4"
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              Вход
            </button>
          </form>

          <p className="text-gray-500 text-xs mt-6 text-center">
            Пароль по умолчанию: TigerKingOld2024
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">TIGER KING OLD - Управление заявками</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition"
          >
            Выход
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Всего заявок</p>
            <p className="text-3xl font-bold text-orange-500">{applications.length}</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Заявок сегодня</p>
            <p className="text-3xl font-bold text-blue-500">
              {applications.filter(app => {
                const date = new Date(app.created_at || '').toDateString()
                const today = new Date().toDateString()
                return date === today
              }).length}
            </p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">С микрофоном</p>
            <p className="text-3xl font-bold text-green-500">
              {applications.filter(app => app.has_mic).length}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-600 text-red-100 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="border-b border-gray-700 p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Заявки</h2>
                  <button
                    onClick={fetchApplications}
                    className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                  >
                    Обновить
                  </button>
                </div>
              </div>

              {loading && (
                <div className="p-6 text-center text-gray-400">Загрузка...</div>
              )}

              {!loading && applications.length === 0 && (
                <div className="p-6 text-center text-gray-400">
                  Нет заявок для отображения
                </div>
              )}

              {!loading && applications.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
                          Ник
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
                          Ранг
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
                          K/D
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
                          Платформа
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-200">
                          Действие
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app, idx) => (
                        <tr
                          key={app.id || idx}
                          className="border-b border-gray-700 hover:bg-gray-700 bg-opacity-30 cursor-pointer transition"
                          onClick={() => setSelectedApp(app)}
                        >
                          <td className="px-6 py-4 text-sm text-gray-300 font-semibold">
                            {app.pubg_nickname}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-400">{app.rank || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{app.kd || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-400">{app.platform || '-'}</td>
                          <td className="px-6 py-4 text-sm">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(app.id!)
                              }}
                              disabled={deleteLoading === app.id}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs font-semibold disabled:opacity-50"
                            >
                              {deleteLoading === app.id ? 'Удаляю...' : 'Удалить'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Detail View */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 sticky top-20 max-h-[calc(100vh-200px)] overflow-y-auto">
              {!selectedApp ? (
                <p className="text-gray-400 text-center py-8">Выберите заявку для просмотра</p>
              ) : (
                <div className="space-y-5">
                  {/* Header */}
                  <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-2xl font-bold text-orange-500 mb-1">{selectedApp.pubg_nickname}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(selectedApp.created_at || '').toLocaleString('ru-RU')}
                    </p>
                  </div>

                  {/* Section 1: Основная информация */}
                  <div className="bg-gray-700 bg-opacity-30 rounded p-4">
                    <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                      🎮 Основная информация
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">ID игрока:</span>
                        <span className="text-white font-semibold">{selectedApp.player_id || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Платформа:</span>
                        <span className="text-white font-semibold">{selectedApp.platform || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Возраст:</span>
                        <span className="text-white font-semibold">{selectedApp.age || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Локация:</span>
                        <span className="text-white font-semibold">{selectedApp.location || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Игровые навыки */}
                  <div className="bg-gray-700 bg-opacity-30 rounded p-4">
                    <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                      🔥 Игровые навыки
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ранг:</span>
                        <span className="text-white font-semibold">{selectedApp.rank || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">K/D:</span>
                        <span className="text-white font-semibold">{selectedApp.kd || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Любимый режим:</span>
                        <span className="text-white font-semibold">{selectedApp.favorite_mode || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Роль:</span>
                        <span className="text-white font-semibold">{selectedApp.role || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Часов в день:</span>
                        <span className="text-white font-semibold">{selectedApp.hours_per_day || '-'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Опыт */}
                  <div className="bg-gray-700 bg-opacity-30 rounded p-4">
                    <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                      ⚔️ Опыт
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Играет в команде:</span>
                        <span className="text-white font-semibold">
                          {selectedApp.team_play ? 'Да' : 'Нет'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Опыт в кланах:</p>
                        <p className="text-white text-xs bg-gray-900 p-2 rounded max-h-16 overflow-y-auto">
                          {selectedApp.previous_clans || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Опыт турниров:</p>
                        <p className="text-white text-xs bg-gray-900 p-2 rounded max-h-16 overflow-y-auto">
                          {selectedApp.tournament_exp || '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Связь и активность */}
                  <div className="bg-gray-700 bg-opacity-30 rounded p-4">
                    <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                      💬 Связь и активность
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-gray-400 mb-1">Контакты:</p>
                        <p className="text-blue-400 font-semibold break-all bg-gray-900 p-2 rounded">
                          {selectedApp.contacts || '-'}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Микрофон:</span>
                        <span className="text-white font-semibold">
                          {selectedApp.has_mic ? 'Есть' : 'Нет'}
                        </span>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Время онлайна:</p>
                        <p className="text-white text-xs bg-gray-900 p-2 rounded">
                          {selectedApp.online_time || '-'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Личная информация */}
                  <div className="bg-gray-700 bg-opacity-30 rounded p-4">
                    <h4 className="text-sm font-bold text-orange-400 mb-3 flex items-center gap-2">
                      📜 Личная информация
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-gray-400 mb-1">Почему вступить в клан:</p>
                        <p className="text-white text-xs bg-gray-900 p-2 rounded max-h-16 overflow-y-auto">
                          {selectedApp.why_join || '-'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-1">Что может дать клану:</p>
                        <p className="text-white text-xs bg-gray-900 p-2 rounded max-h-16 overflow-y-auto">
                          {selectedApp.what_can_give || '-'}
                        </p>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-600">
                        <span className="text-gray-400">Согласен с правилами:</span>
                        <span className="text-white font-semibold">
                          {selectedApp.ready_to_follow_rules ? '✓ Да' : '✗ Нет'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(selectedApp.id!)}
                    disabled={deleteLoading === selectedApp.id}
                    className="w-full mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                  >
                    {deleteLoading === selectedApp.id ? 'Удаляю...' : 'Удалить заявку'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
