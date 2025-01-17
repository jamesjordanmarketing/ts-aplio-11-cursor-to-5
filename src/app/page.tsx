import { UserInfoWrapper } from '@/components/UserInfoWrapper'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Welcome to Our App</h1>
      <UserInfoWrapper />
          </div>
    </main>
  )
}