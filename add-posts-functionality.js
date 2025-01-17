import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = process.cwd();

async function createFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
  console.log(`Created file: ${filePath}`);
}

async function updateFile(filePath, updateFunction) {
  const content = await fs.readFile(filePath, 'utf8');
  const updatedContent = updateFunction(content);
  await fs.writeFile(filePath, updatedContent, 'utf8');
  console.log(`Updated file: ${filePath}`);
}

async function addPostsFunctionality() {
  try {
    // Create src/lib/api.ts
    const apiContent = `
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post.',
    author: 'John Doe',
    createdAt: '2025-01-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the content of the second post.',
    author: 'Jane Smith',
    createdAt: '2025-01-16T14:30:00Z',
  },
];

export async function getPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPosts;
}

export async function getPost(id: string): Promise<Post | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockPosts.find(post => post.id === id) || null;
}
`;
    await createFile(path.join(projectRoot, 'src', 'lib', 'api.ts'), apiContent);

    // Create src/components/PostCard.tsx
    const postCardContent = `
import React from 'react';
import Link from 'next/link';
import { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={\`/posts/\${post.id}\`} className="text-blue-600 hover:underline">
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>By {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};
`;
    await createFile(path.join(projectRoot, 'src', 'components', 'PostCard.tsx'), postCardContent);

    // Create src/components/PostList.tsx
    const postListContent = `
import React from 'react';
import { Post } from '@/lib/api';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
`;
    await createFile(path.join(projectRoot, 'src', 'components', 'PostList.tsx'), postListContent);

    // Create src/app/posts/page.tsx
    const postsPageContent = `
import { getPosts } from '@/lib/api';
import { PostList } from '@/components/PostList';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Blog Posts</h1>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
`;
    await createFile(path.join(projectRoot, 'src', 'app', 'posts', 'page.tsx'), postsPageContent);

    // Update src/components/Navbar.tsx
    console.log('Updating Navbar.tsx...');
    await updateFile(
      path.join(projectRoot, 'src', 'components', 'Navbar.tsx'),
      (content) => {
        return content.replace(
          '<Link href="/" className="flex-shrink-0 flex items-center">',
          `<Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Our App</span>
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link href="/posts" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
                Posts
              </Link>
            </div>`
        );
      }
    );

    console.log('Posts functionality added successfully!');
  } catch (error) {
    console.error('Error adding posts functionality:', error);
  }
}

addPostsFunctionality();