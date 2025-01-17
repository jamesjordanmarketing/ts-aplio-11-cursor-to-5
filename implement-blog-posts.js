import fs from 'fs/promises';
import path from 'path';

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

async function implementBlogPosts() {
  try {
    // Create individual post page
    const postPageContent = `
import { getPost } from '@/lib/api'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/posts"
          className="inline-flex items-center mb-4 text-blue-600 hover:underline"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Posts
        </Link>
        <article className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-600 mb-4">By {post.author}</p>
          <div className="prose max-w-none">{post.content}</div>
          <p className="text-sm text-gray-500 mt-4">
            Posted on {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </article>
      </div>
    </div>
  )
}
`;
    await createFile(path.join(projectRoot, 'src', 'app', 'posts', '[id]', 'page.tsx'), postPageContent);

    // Update PostCard component
    await updateFile(
      path.join(projectRoot, 'src', 'components', 'PostCard.tsx'),
      (content) => {
        return content.replace(
          'export const PostCard: React.FC<PostCardProps> = ({ post }) => {',
          `export const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
  )`
        );
      }
    );

    // Update api.ts with more detailed content
    await updateFile(
      path.join(projectRoot, 'src', 'lib', 'api.ts'),
      (content) => {
        return content.replace(
          'const mockPosts: Post[] = [',
          `const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications. In this post, we\\'ll explore the basics of Next.js and how to get started with your first project.\\n\\nFirst, let\\'s install Next.js by running \`npx create-next-app@latest\`. This command will set up a new Next.js project with all the necessary dependencies and configuration files.\\n\\nOnce your project is set up, you can start developing by running \`npm run dev\`. This will start the development server, and you can view your application at \`http://localhost:3000\`.\\n\\nNext.js provides features like automatic code splitting, optimized prefetching, and built-in CSS support, making it an excellent choice for modern web development.',
    author: 'John Doe',
    createdAt: '2025-01-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'The Power of TypeScript in React Applications',
    content: 'TypeScript has become increasingly popular in the React ecosystem, and for good reason. It brings static typing to JavaScript, which can help catch errors early in the development process and improve code quality.\\n\\nTo use TypeScript with React, you\\'ll need to install a few dependencies: \`npm install --save-dev typescript @types/react @types/react-dom\`.\\n\\nOnce installed, you can start writing your React components with TypeScript. Here\\'s a simple example:\\n\\n\`\`\`typescript\\ninterface Props {\\n  name: string;\\n}\\n\\nconst Greeting: React.FC<Props> = ({ name }) => {\\n  return <h1>Hello, {name}!</h1>;\\n};\\n\`\`\`\\n\\nBy using TypeScript, you get better tooling support, improved refactoring capabilities, and more robust code overall.',
    author: 'Jane Smith',
    createdAt: '2025-01-16T14:30:00Z',
  },`
        );
      }
    );

    console.log('Blog post functionality implemented successfully!');
  } catch (error) {
    console.error('Error implementing blog post functionality:', error);
  }
}

implementBlogPosts();