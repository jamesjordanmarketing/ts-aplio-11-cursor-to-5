import fs from 'fs/promises';
import path from 'path';

const projectRoot = process.cwd();

async function updateFile(filePath, updateFunction) {
  const content = await fs.readFile(filePath, 'utf8');
  const updatedContent = updateFunction(content);
  await fs.writeFile(filePath, updatedContent, 'utf8');
  console.log(`Updated file: ${filePath}`);
}

async function createFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
  console.log(`Created file: ${filePath}`);
}

async function enhanceStyling() {
  try {
    // Update src/app/page.tsx
    await updateFile(path.join(projectRoot, 'src', 'app', 'page.tsx'), (content) => {
      return content.replace(
        '<main className="flex min-h-screen flex-col items-center justify-between p-24">',
        '<main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">'
      ).replace(
        '<h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>',
        '<div className="max-w-7xl mx-auto">\n        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Welcome to Our App</h1>'
      ).replace(
        '</main>',
        '      </div>\n    </main>'
      );
    });

    // Create new Navbar component
    const navbarContent = `"use client"

import Link from 'next/link'
import { useAppContext } from '@/lib/AppContext'

export const Navbar = () => {
  const { user } = useAppContext()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">Our App</span>
            </Link>
          </div>
          <div className="flex items-center">
            {user ? (
              <span className="text-gray-600">Welcome, {user.name}</span>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}`;
    await createFile(path.join(projectRoot, 'src', 'components', 'Navbar.tsx'), navbarContent);

    // Update src/app/layout.tsx
    await updateFile(path.join(projectRoot, 'src', 'app', 'layout.tsx'), (content) => {
      return content.replace(
        "import './globals.css'",
        "import './globals.css'\nimport { AppProvider } from '@/lib/AppContext'\nimport { Navbar } from '@/components/Navbar'"
      ).replace(
        '<body className={inter.className}>{children}</body>',
        '<body className={inter.className}>\n        <AppProvider>\n          <Navbar />\n          {children}\n        </AppProvider>\n      </body>'
      );
    });

    // Create new profile page
    const profilePageContent = `import { UserInfoWrapper } from '@/components/UserInfoWrapper'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          User Profile
        </h1>
        <UserInfoWrapper />
      </div>
    </div>
  )
}`;
    await createFile(path.join(projectRoot, 'src', 'app', 'profile', 'page.tsx'), profilePageContent);

    // Update UserInfo component
    await updateFile(path.join(projectRoot, 'src', 'components', 'UserInfo.tsx'), (content) => {
      return content.replace(
        'import React from \'react\'',
        'import React from \'react\'\nimport Link from \'next/link\''
      ).replace(
        '<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">',
        '<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">'
      ).replace(
        '<h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>',
        '<h2 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h2>\n          <Link href="/profile" className="block text-blue-600 hover:underline">\n            View Profile\n          </Link>'
      );
    });

    console.log('Styling enhancements completed successfully!');
  } catch (error) {
    console.error('Error enhancing styling:', error);
  }
}

enhanceStyling();