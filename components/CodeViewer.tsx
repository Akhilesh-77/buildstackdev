import React, { useEffect, useRef } from 'react';
import { ArrowLeft, Copy, Download, Trash2, Check, Clock } from 'lucide-react';
import { CodeSnippet } from '../types';

interface CodeViewerProps {
  snippet: CodeSnippet;
  onBack: () => void;
  onDelete: (id: string) => void;
}

declare global {
  interface Window {
    hljs: any;
  }
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ snippet, onBack, onDelete }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (codeRef.current && window.hljs) {
      // Small delay to ensure DOM is ready and content is injected
      setTimeout(() => {
         window.hljs.highlightElement(codeRef.current);
      }, 0);
    }
  }, [snippet.code, snippet.language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([snippet.code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippet.title.replace(/\s+/g, '_')}.${snippet.language === 'javascript' ? 'js' : snippet.language}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to snippets
      </button>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{snippet.title}</h1>
          <p className="text-slate-600 dark:text-slate-400">{snippet.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
             <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded dark:bg-slate-800 dark:text-slate-300">{snippet.language}</span>
             <span className="flex items-center gap-1"><Clock size={14}/> {new Date(snippet.createdAt).toLocaleString()}</span>
             <span>By {snippet.author}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-transparent dark:text-white dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-md bg-white border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-transparent dark:text-white dark:hover:bg-slate-700 transition-colors"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={() => onDelete(snippet.id)}
            className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-500 dark:hover:bg-red-900/50 transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#282c34] dark:border-slate-800">
        <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-2">
           <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
           <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
           <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
        </div>
        <pre className="!m-0 !bg-[#282c34] !p-6 overflow-x-auto text-sm leading-6">
          <code ref={codeRef} className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
};