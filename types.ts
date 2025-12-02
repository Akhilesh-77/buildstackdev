export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  createdAt: string; // ISO date string
  author: string;
  likes: number;
}

export interface CreateSnippetDTO {
  title: string;
  description: string;
  language: string;
  code: string;
  author: string;
}

export enum SupportedLanguage {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
  PYTHON = 'python',
  JAVA = 'java',
  HTML = 'xml',
  CSS = 'css',
  JSON = 'json',
  SQL = 'sql',
  BASH = 'bash',
  MARKDOWN = 'markdown',
  PLAINTEXT = 'plaintext'
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}
