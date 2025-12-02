import React from 'react';
import { Code2, Github, Sun, Moon, Download } from 'lucide-react';
import { PROJECT_STRUCTURE } from '../constants';
import { FileNode } from '../types';

interface NavbarProps {
  onHomeClick: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHomeClick, isDark, toggleTheme }) => {
  const handleGlobalDownload = async () => {
    if (!(window as any).JSZip) {
      alert('ZIP library loading... Please try again in a moment.');
      return;
    }

    const zip = new (window as any).JSZip();
    
    const addToZip = (folder: any, node: FileNode) => {
      if (node.type === 'file') {
        folder.file(node.name, node.content || '');
      } else if (node.type === 'folder' && node.children) {
        const newFolder = folder.folder(node.name);
        node.children.forEach((child: FileNode) => addToZip(newFolder, child));
      }
    };

    addToZip(zip, PROJECT_STRUCTURE);

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'buildstack-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to generate zip', err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-950/80 backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onHomeClick}>
          <div className="rounded-lg bg-blue-600 p-2 text-white shadow-md shadow-blue-500/20">
            <Code2 size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">BuildStack.dev</span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleGlobalDownload}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
            aria-label="Download Project"
            title="Download Project ZIP"
          >
            <Download size={20} />
          </button>
          
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <a href="#" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};
