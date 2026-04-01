'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            TIGER KING OLD
          </h1>
          <p className="text-gray-300 text-xl">Киберспортивный клан</p>
        </div>

        <div className="bg-gray-800 bg-opacity-40 backdrop-blur border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">
            🎮 Присоединись к нам!
          </h2>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Ищем профессиональных игроков в PUBG. Если ты уверен в своих навыках,
            готов к командной игре и хочешь стать частью лучшего клана, подай заявку.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/form"
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              Подать заявку
            </Link>
            <Link
              href="/admin"
              className="px-8 py-3 border border-gray-500 text-gray-300 font-bold rounded-lg hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              Админ-панель
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-gray-400 text-sm mt-12">
          <div>
            <div className="text-2xl mb-2">⚡</div>
            <p>Быстро</p>
          </div>
          <div>
            <div className="text-2xl mb-2">🎯</div>
            <p>Профессионально</p>
          </div>
          <div>
            <div className="text-2xl mb-2">👥</div>
            <p>В команде</p>
          </div>
        </div>
      </div>
    </main>
  )
}
