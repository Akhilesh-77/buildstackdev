import { FileNode } from './types';

export const PROJECT_STRUCTURE: FileNode = {
  name: 'simple-project',
  type: 'folder',
  children: [
    { 
      name: 'docker-compose.yml', 
      type: 'file',
      content: 'version: "3.8"\nservices:\n  web:\n    build: ./frontend\n    ports: ["3000:80"]\n  api:\n    build: ./backend\n    ports: ["5000:5000"]' 
    },
    {
      name: 'backend',
      type: 'folder',
      children: [
        { name: 'server.js', type: 'file', content: 'console.log("Server running");' },
        { name: 'package.json', type: 'file', content: '{}' },
        { name: 'Dockerfile', type: 'file', content: 'FROM node:18\nWORKDIR /app\nCOPY . .\nCMD ["node", "server.js"]' }
      ]
    },
    {
      name: 'frontend',
      type: 'folder',
      children: [
        { name: 'index.html', type: 'file', content: '<html><body>Hello</body></html>' },
        { name: 'src', type: 'folder', children: [{ name: 'App.js', type: 'file', content: '// React App' }] },
        { name: 'Dockerfile', type: 'file', content: 'FROM nginx\nCOPY . /usr/share/nginx/html' }
      ]
    }
  ]
};
