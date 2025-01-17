export interface Post {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications. In this post, we\'ll explore the basics of Next.js and how to get started with your first project.\n\nFirst, let\'s install Next.js by running `npx create-next-app@latest`. This command will set up a new Next.js project with all the necessary dependencies and configuration files.\n\nOnce your project is set up, you can start developing by running `npm run dev`. This will start the development server, and you can view your application at `http://localhost:3000`.\n\nNext.js provides features like automatic code splitting, optimized prefetching, and built-in CSS support, making it an excellent choice for modern web development.',
    author: 'John Doe',
    createdAt: '2025-01-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'The Power of TypeScript in React Applications',
    content: 'TypeScript has become increasingly popular in the React ecosystem, and for good reason. It brings static typing to JavaScript, which can help catch errors early in the development process and improve code quality.\n\nTo use TypeScript with React, you\'ll need to install a few dependencies: `npm install --save-dev typescript @types/react @types/react-dom`.\n\nOnce installed, you can start writing your React components with TypeScript. Here\'s a simple example:\n\n\`\`\`typescript\ninterface Props {\n  name: string;\n}\n\nconst Greeting: React.FC<Props> = ({ name }) => {\n  return <h1>Hello, {name}!</h1>;\n};\n\`\`\`\n\nBy using TypeScript, you get better tooling support, improved refactoring capabilities, and more robust code overall.',
    author: 'Jane Smith',
    createdAt: '2025-01-16T14:30:00Z',
  },
];

export async function getPosts(): Promise<Post[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockPosts
}

export async function getPost(id: string): Promise<Post | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockPosts.find(post => post.id === id) || null
}

