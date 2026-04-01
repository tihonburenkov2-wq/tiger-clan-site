'use client'

import AdminPanel from '@/components/AdminPanel'
import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-40 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← На главную
          </Link>
          <Link href="/form" className="text-gray-400 hover:text-gray-300 text-sm">
            Форма
          </Link>
        </div>
      </div>
      <AdminPanel />
    </div>
  )
}
