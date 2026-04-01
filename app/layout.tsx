import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TIGER KING OLD - Recruitment Form',
  description: 'Форма набора игроков в киберспортивный клан TIGER KING OLD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="bg-gradient-to-br from-darker to-dark min-h-screen">
        {children}
      </body>
    </html>
  )
}
