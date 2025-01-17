import fs from 'fs/promises';
import { execSync } from 'child_process';
import path from 'path';

const projectRoot = process.cwd();

async function createFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
  console.log(`Created file: ${filePath}`);
}

async function setupTypeSafety() {
  try {
    // Install zod
    console.log('Installing zod...');
    execSync('npm install zod', { stdio: 'inherit' });

    // Create types/index.ts
    const typesContent = `
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
}

export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  authorId: string
  postId: string
  createdAt: string
}
`;
    await createFile(path.join(projectRoot, 'src', 'types', 'index.ts'), typesContent);

    // Create lib/schemas.ts
    const schemasContent = `
import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(['admin', 'user'])
})

export const postSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  content: z.string(),
  authorId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const commentSchema = z.object({
  id: z.string(),
  content: z.string(),
  authorId: z.string(),
  postId: z.string(),
  createdAt: z.string().datetime()
})

export const createUserSchema = userSchema.omit({ id: true })
export const updateUserSchema = createUserSchema.partial()

export const createPostSchema = postSchema.omit({ id: true, createdAt: true, updatedAt: true })
export const updatePostSchema = createPostSchema.partial()

export const createCommentSchema = commentSchema.omit({ id: true, createdAt: true })
`;
    await createFile(path.join(projectRoot, 'src', 'lib', 'schemas.ts'), schemasContent);

    // Update api/hello/route.ts
    const apiRouteContent = `
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
`;
    await createFile(path.join(projectRoot, 'src', 'app', 'api', 'hello', 'route.ts'), apiRouteContent);

    console.log('Type safety setup completed successfully!');
  } catch (error) {
    console.error('Error setting up type safety:', error);
  }
}

setupTypeSafety();