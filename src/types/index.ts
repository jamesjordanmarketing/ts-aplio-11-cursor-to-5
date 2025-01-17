
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
