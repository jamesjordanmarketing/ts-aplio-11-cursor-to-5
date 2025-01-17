"use client"

import Link from 'next/link'
import { useAppContext } from '@/lib/AppContext'

export const Navbar = () => {
  const { user } = useAppContext()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link href="/posts" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Posts
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <span className="text-gray-600">Welcome, {user.name}</span>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

