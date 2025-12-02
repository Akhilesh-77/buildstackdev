import React, { useState } from 'react';
import { Folder, File, ChevronRight, ChevronDown, Copy, Download, Box } from 'lucide-react';
import { FileNode } from '../types';
import { PROJECT_STRUCTURE } from '../constants';

const TreeNode: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="select-none">
      <div 
        className={`flex items-center gap-1 py-1 px-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded cursor-pointer transition-colors ${level > 0 ? 'ml-4' : ''}`}
        onClick={() => node.type === 'folder' && setIsOpen(!isOpen)}
      >
        {node.type === 'folder' && (
          <span className="text-slate-400 dark:text-slate-500">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {node.type === 'folder' ? (
          <Folder size={16} className="text-blue-500 dark:text-blue-400" />
        ) : (
          <File size={16} className="text-slate-400" />
        )}
        <span className={`text-sm ${node.type === 'folder' ? 'text-slate-700 font-medium dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>
          {node.name}
        </span>
      </div>
      {isOpen && node.children && (
        <div className="border-l border-slate-200 ml-3 dark:border-slate-800">
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FolderStructure: React.FC = () => {
  const [minimized, setMinimized] = useState(false);

  const generateStructureText = (node: FileNode, depth = 0): string => {
    let text = `${'  '.repeat(depth)}${node.name}${node.type === 'folder' ? '/' : ''}\n`;
    if (node.children) {
      node.children.forEach(child => {
        text += generateStructureText(child, depth + 1);
      });
    }
    return text;
  };

  const handleCopyStructure = () => {
    const text = generateStructureText(PROJECT_STRUCTURE);
    navigator.clipboard.writeText(text);
    alert('Structure copied to clipboard!');
  };

  const handleDownloadZip = async () => {
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
        node.children.forEach(child => addToZip(newFolder, child));
      }
    };

    addToZip(zip, PROJECT_STRUCTURE);

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'full-stack-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to generate zip', err);
      alert('Failed to generate ZIP file.');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between bg-slate-50/80 px-4 py-3 border-b border-slate-200 dark:bg-slate-800/80 dark:border-slate-700">
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <Box size={18} className="text-blue-500 dark:text-blue-400" />
          <h3 className="font-semibold text-sm">Project Structure</h3>
        </div>
        <div className="flex items-center gap-2">
           <button 
            onClick={handleCopyStructure}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
            title="Copy Structure"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={handleDownloadZip}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
            title="Download as ZIP"
          >
            <Download size={16} />
          </button>
          <button 
            onClick={() => setMinimized(!minimized)}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded dark:hover:text-white dark:hover:bg-slate-700 transition-colors"
          >
            {minimized ? <ChevronDown size={16} /> : <ChevronRight size={16} className="rotate-90" />}
          </button>
        </div>
      </div>
      
      {!minimized && (
        <div className="p-4 bg-slate-50 font-mono text-sm overflow-x-auto max-h-[400px] dark:bg-[#0f172a]">
          <TreeNode node={PROJECT_STRUCTURE} level={0} />
          
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 mb-2 font-sans">
              * This structure is auto-generated for your MERN stack deployment. 
              The backend and frontend folders are isolated for Docker containerization.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
