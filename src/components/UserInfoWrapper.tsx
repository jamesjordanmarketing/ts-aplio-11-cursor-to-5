"use client"

import { UserInfo } from './UserInfo'
import { AppProvider } from '@/lib/AppContext'

export const UserInfoWrapper: React.FC = () => {
  return (
    <AppProvider>
      <UserInfo />
    </AppProvider>
  )
}