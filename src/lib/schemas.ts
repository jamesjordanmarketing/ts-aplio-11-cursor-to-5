
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
