import { CodeSnippet, CreateSnippetDTO, SupportedLanguage } from '../types';

const STORAGE_KEY = 'devhost_snippets';

// Initial seed data if storage is empty
const SEED_DATA: CodeSnippet[] = [
  {
    id: '1',
    title: 'Hello World Server',
    description: 'A simple Express.js server setup.',
    language: 'javascript',
    code: `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Example app listening on port \${port}\`);
});`,
    createdAt: new Date().toISOString(),
    author: 'Admin',
    likes: 5
  },
  {
    id: '2',
    title: 'React UseEffect Hook',
    description: 'Example of fetching data with useEffect.',
    language: 'typescript',
    code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchUser() {
      const response = await fetch('/api/user/' + userId);
      const json = await response.json();
      if (!ignore) setUser(json);
    }
    fetchUser();
    return () => { ignore = true; };
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}`,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: 'ReactDev',
    likes: 12
  }
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockApi = {
  async getAllSnippets(): Promise<CodeSnippet[]> {
    await delay(300); // Simulate latency
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    }
    return JSON.parse(stored);
  },

  async getSnippetById(id: string): Promise<CodeSnippet | null> {
    await delay(200);
    const snippets = await MockApi.getAllSnippets();
    return snippets.find(s => s.id === id) || null;
  },

  async createSnippet(data: CreateSnippetDTO): Promise<CodeSnippet> {
    await delay(500);
    const snippets = await MockApi.getAllSnippets();
    const newSnippet: CodeSnippet = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      likes: 0,
      ...data
    };
    const updatedSnippets = [newSnippet, ...snippets];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSnippets));
    return newSnippet;
  },

  async deleteSnippet(id: string): Promise<void> {
    await delay(300);
    const snippets = await MockApi.getAllSnippets();
    const filtered = snippets.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};