import React from 'react';
import { Calendar, FileCode, User } from 'lucide-react';
import { CodeSnippet } from '../types';

interface CodeCardProps {
  snippet: CodeSnippet;
  onClick: (id: string) => void;
}

export const CodeCard: React.FC<CodeCardProps> = ({ snippet, onClick }) => {
  const date = new Date(snippet.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div 
      onClick={() => onClick(snippet.id)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-850 dark:hover:shadow-blue-900/10 cursor-pointer"
    >
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-400">
            {snippet.language}
          </span>
          <FileCode size={18} className="text-slate-400 group-hover:text-blue-500 dark:text-slate-600 transition-colors" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
          {snippet.title}
        </h3>
        <p className="mb-4 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
          {snippet.description}
        </p>
      </div>
      
      <div className="flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
        <div className="flex items-center gap-1">
          <User size={14} />
          <span>{snippet.author}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};