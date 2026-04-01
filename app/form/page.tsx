'use client'

import RecruitmentForm from '@/components/RecruitmentForm'
import Link from 'next/link'

export default function FormPage() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-50 bg-black bg-opacity-40 backdrop-blur border-b border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Вернуться на главную
          </Link>
          <Link href="/admin" className="text-gray-400 hover:text-gray-300 text-sm">
            Админ-панель
          </Link>
        </div>
      </div>
      <RecruitmentForm />
    </div>
  )
}
