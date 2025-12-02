import React, { useState } from 'react';
import { Rocket, Server, Shield, Database, Layout, Terminal, Folder, File, ChevronRight, ChevronDown, FileCode, FileJson } from 'lucide-react';
import { DocumentationModal } from './DocumentationModal';

interface LandingHeaderProps {
  onStartHosting: () => void;
}

interface LandingFileNode {
  name: string;
  type: 'file' | 'folder';
  children?: LandingFileNode[];
}

const LANDING_TREE_DATA: LandingFileNode = {
  name: 'simple-project',
  type: 'folder',
  children: [
    { name: 'docker-compose.yml', type: 'file' },
    {
      name: 'backend',
      type: 'folder',
      children: [
        { name: 'server.js', type: 'file' },
        { name: 'package.json', type: 'file' },
        { name: 'Dockerfile', type: 'file' }
      ]
    },
    {
      name: 'frontend',
      type: 'folder',
      children: [
        { name: 'App.jsx', type: 'file' },
        { name: 'index.html', type: 'file' },
        { name: 'Dockerfile', type: 'file' }
      ]
    }
  ]
};

const LandingTreeNode: React.FC<{ node: LandingFileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.type === 'folder' && node.children && node.children.length > 0;

  const getIcon = (name: string, type: 'file' | 'folder') => {
    if (type === 'folder') return <Folder size={18} className="text-blue-500 fill-blue-500/20" />;
    if (name.includes('docker')) return <File size={18} className="text-blue-400" />;
    if (name.endsWith('js') || name.endsWith('jsx')) return <FileCode size={18} className="text-yellow-500" />;
    if (name.endsWith('html')) return <FileCode size={18} className="text-orange-500" />;
    if (name.endsWith('json')) return <FileJson size={18} className="text-green-500" />;
    return <File size={18} className="text-slate-400" />;
  };

  return (
    <div className="select-none">
      <div 
        className="group flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer transition-colors"
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        <span className={`text-slate-400 transition-transform duration-200 ${hasChildren && isOpen ? 'rotate-90' : ''} ${!hasChildren ? 'invisible' : ''}`}>
          <ChevronRight size={14} />
        </span>
        
        {getIcon(node.name, node.type)}
        
        <span className={`text-sm font-mono ${node.type === 'folder' ? 'font-semibold text-slate-700 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400'} group-hover:text-slate-900 dark:group-hover:text-white transition-colors`}>
          {node.name}
        </span>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {node.children?.map((child, index) => (
          <LandingTreeNode key={index} node={child} level={level + 1} />
        ))}
      </div>
    </div>
  );
};

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onStartHosting }) => {
  const [showDocs, setShowDocs] = useState(false);

  return (
    <div className="w-full mb-12 space-y-12 animate-fade-in">
      <DocumentationModal isOpen={showDocs} onClose={() => setShowDocs(false)} />
      
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-8 pb-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v2.0 Now Available
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Deploy Your Frontend + Backend <br className="hidden md:block" />
          Using Docker & MongoDB  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400"> Instantly</span>.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          The all-in-one platform for developers to containerize MERN apps, 
          generate Docker builds instantly, set up MongoDB services, 
          and deploy full-stack projects with zero complexity.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            onClick={onStartHosting}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20"
          >
            Start Deployment
          </button>
          <button 
            onClick={() => setShowDocs(true)}
            className="rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-800 dark:hover:border-slate-600 transition-all"
          >
            View Documentation
          </button>
        </div>
      </div>

      {/* Feature Tree View */}
      <div className="relative mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-blue-500/10 dark:hover:shadow-blue-900/10">
        <div className="bg-white dark:bg-[#0f172a] rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          {/* Mac-style Window Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50/50 dark:bg-slate-900/50">
             <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
             </div>
             <div className="text-xs font-mono text-slate-400 select-none">buildstack-explorer</div>
             <div className="w-10"></div>
          </div>

          {/* Tree Content */}
          <div className="p-4 min-h-[300px] overflow-auto">
             <LandingTreeNode node={LANDING_TREE_DATA} level={0} />
          </div>
        </div>
      </div>

      {/* 3 Steps Section */}
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-4">
        <div className="group rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40 hover:border-blue-500/30 hover:shadow-lg dark:hover:bg-slate-800/60 transition-all duration-300">
          <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Layout size={24} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">1. Structure</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Organize your frontend and backend. We provide the perfect folder template for Dockerized MERN apps.
          </p>
        </div>
        
        <div className="group rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40 hover:border-emerald-500/30 hover:shadow-lg dark:hover:bg-slate-800/60 transition-all duration-300">
          <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/10 p-3 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
            <Terminal size={24} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">2. Paste Code</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Upload your `server.js`, `App.tsx`, and configs. Our intelligent editor handles syntax highlighting.
          </p>
        </div>

        <div className="group rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40 hover:border-purple-500/30 hover:shadow-lg dark:hover:bg-slate-800/60 transition-all duration-300">
          <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-500/10 p-3 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Rocket size={24} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">3. Deploy</h3>
          <p className="text-slate-600 dark:text-slate-400">
            Hit deploy. We containerize your app using Docker and serve it globally with auto-scaling.
          </p>
        </div>
      </div>

      {/* Data Storage Info Panel */}
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0b1121] overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center gap-3 dark:border-slate-800 dark:bg-slate-900/50">
          <Shield className="text-emerald-500 dark:text-emerald-400" size={20} />
          <h3 className="font-semibold text-slate-900 dark:text-white">Secure Data Architecture</h3>
        </div>
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex gap-3">
              <Database className="text-slate-400 dark:text-slate-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-200">MongoDB Storage</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Your code snippets and metadata are stored in a sharded MongoDB cluster. 
                  Images are converted to <strong>Base64</strong> strings for portability or hosted via optimized CDNs.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Server className="text-slate-400 dark:text-slate-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-slate-900 dark:text-slate-200">Dockerized Isolation</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Each deployment runs in an isolated container. Docker Compose orchestrates the network bridge between your <code>frontend</code> and <code>backend</code> services automatically.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-600 border border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800/50">
            <div className="text-slate-400 dark:text-slate-500 mb-2"># Docker Network Config</div>
            <div className="text-purple-600 dark:text-purple-400">networks:</div>
            <div className="pl-4">
              <div className="text-blue-600 dark:text-blue-400">app-network:</div>
              <div className="pl-4">
                <div className="text-emerald-600 dark:text-emerald-400">driver: <span className="text-orange-600 dark:text-orange-300">bridge</span></div>
              </div>
            </div>
            <div className="mt-2 text-slate-400 dark:text-slate-500"># Database Connection</div>
            <div>
              <span className="text-blue-600 dark:text-blue-400">MONGO_URI</span>=
              <span className="text-orange-600 dark:text-orange-300">mongodb://mongo:27017/devhost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};