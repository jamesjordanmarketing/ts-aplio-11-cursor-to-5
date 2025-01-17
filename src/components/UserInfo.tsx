"use client"

import React from 'react'
import Link from 'next/link'
import { useAppContext } from '@/lib/AppContext'
import { Button } from './ui/Button'

export const UserInfo: React.FC = () => {
  const { user, setUser } = useAppContext()

  const login = () => {
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      {user ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>
          <Link href="/profile" className="block text-blue-600 hover:underline">
            View Profile
          </Link>
          <p className="text-gray-600">Email: {user.email}</p>
          <Button onClick={logout} variant="secondary" className="w-full">Logout</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Guest!</h2>
          <p className="text-gray-600">Please log in to see your information.</p>
          <Button onClick={login} className="w-full">Login</Button>
        </div>
      )}
    </div>
  )
}