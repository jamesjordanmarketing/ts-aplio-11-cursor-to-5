
import { NextResponse } from 'next/server'
import { userSchema } from '@/lib/schemas'
import { User } from '@/types'

export async function GET() {
  const user: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  }

  try {
    const validatedUser = userSchema.parse(user)
    return NextResponse.json(validatedUser)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid user data' }, { status: 400 })
  }
}
