---
layout: post
title: Node.js with TypeScript Project Setup Guide
place: Truckee, CA
time: 10:33 AM PDT
draft: true

categories: ['field-notes']

redirect_from:
- /journal/node-typescript-project-setup/
---

Every time I start up a new project I have to remember all of this, so I'm writing it down. I'll do my best to keep it up to date as things change.

## Initial Setup
1. Create a new directory and initialize git:
```bash
mkdir project-name
cd project-name
git init
```

2. Initialize npm project:
```bash
npm init -y
```

3. Install TypeScript and node types as dev dependencies:
```bash
npm install -D typescript @types/node tsx
```

## TypeScript Configuration
4. Initialize TypeScript configuration:
```bash
npx tsc --init
```

5. Update `tsconfig.json` with recommended settings:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "lib": ["es2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Project Structure
6. Create basic project structure:
```bash
mkdir src
mkdir src/types
mkdir src/utils
touch src/app.ts
```

## Development Environment
7. Add scripts to `package.json`:
TODO: Fix the lint scripts, they're out of date.
```json
{
  "scripts": {
    "start": "node dist/app.js",
    "dev": "tsx watch src/app.ts",
    "build": "tsc",
    "build:watch": "tsc -w",
    "clean": "rm -rf dist",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "test": "jest"
  }
}
```

## Code Quality Tools
8. Set up ESLint and Prettier:
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier
```

9. Create `eslint.config.mjs`:
```javascript
import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  prettierConfig,
];
```

10. Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "all",
  "arrowParens": "avoid"
}
```

11. Create `.gitignore`:
There are a bunch of great `.gitignore` templates available at [github](https://github.com/github/gitignore).
Here's what I use, and adjust as needed:
```
# Node modules
node_modules

# Build and compiled output directories
dist
build

# TypeScript declaration files
*.d.ts

# Logs
npm-debug.log*

# OS-specific files
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.*.local

# IDE and editor settings
.vscode

# ESLint and Prettier cache
.eslintcache

# Miscellaneous
*.log
*.tmp
*.temp

# Coverage directory
coverage

# Temp files
.tmp
.cache
```

## Testing Setup (Optional)
12. Install Jest for testing:
I admittedly don't often do this, but I should.
```bash
npm install -D jest ts-jest @types/jest
```

13. Create `jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
};
```

## Initial Source File
14. Add basic code to `src/app.ts`:
```typescript
const main = async (): Promise<void> => {
  try {
    console.log('TypeScript Node.js project initialized!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

main();
```

## Final Steps
15. Initialize the project:
```bash
npm run build
npm start
```