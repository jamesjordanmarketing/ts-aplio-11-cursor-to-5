const fs = require('fs').promises;
const path = require('path');

const baseDir = 'src';

const structure = {
  app: {
    '(auth)': {
      login: {
        'page.tsx': ''
      },
      register: {
        'page.tsx': ''
      }
    },
    '(dashboard)': {
      'page.tsx': ''
    },
    api: {},
    'layout.tsx': '',
    'page.tsx': ''
  },
  components: {
    common: {},
    layout: {},
    ui: {}
  },
  hooks: {},
  lib: {},
  styles: {},
  types: {}
};

async function createStructure(currentPath, structure) {
  for (const [key, value] of Object.entries(structure)) {
    const newPath = path.join(currentPath, key);
    if (typeof value === 'object') {
      await fs.mkdir(newPath, { recursive: true });
      await createStructure(newPath, value);
    } else {
      await fs.writeFile(newPath, '');
    }
  }
}

async function main() {
  try {
    await createStructure(baseDir, structure);
    console.log('Folder structure created successfully!');
  } catch (error) {
    console.error('Error creating folder structure:', error);
  }
}

main();