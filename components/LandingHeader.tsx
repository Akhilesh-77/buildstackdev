import React from 'react';
import { Rocket, Server, Shield, Database, Layout, Terminal } from 'lucide-react';

interface LandingHeaderProps {
  onStartHosting: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({ onStartHosting }) => {
  return (
    <div className="w-full mb-12 space-y-12 animate-fade-in">
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
          Host your Frontend + Backend <br className="hidden md:block" />
          in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">30 Minutes</span>.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          The all-in-one platform for developers. Deploy your MERN stack apps, 
          manage code snippets, and share projects with zero configuration.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button 
            onClick={onStartHosting}
            className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20 dark:shadow-blue-900/20"
          >
            Start Hosting Free
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-8 py-3 font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:bg-slate-800 dark:hover:border-slate-600 transition-all">
            View Documentation
          </button>
        </div>
      </div>

      {/* Feature Image */}
      <div className="relative mx-auto max-w-5xl rounded-xl border border-slate-200 bg-white/50 dark:border-slate-800 dark:bg-slate-900/50 p-2 shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950 opacity-50 z-10"></div>
        <img 
          src="https://ik.imagekit.io/akhileshu/image.png" 
          alt="BuildStack Dashboard Preview" 
          className="w-full h-auto rounded-lg shadow-inner opacity-90 hover:opacity-100 transition-opacity duration-700"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
          <div className="hidden sm:block">
            <span className="text-xs font-mono text-slate-500 bg-white/90 dark:bg-slate-900/80 px-2 py-1 rounded border border-slate-200 dark:border-slate-800">
              dashboard_preview_v2.png
            </span>
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