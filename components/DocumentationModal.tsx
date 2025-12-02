import React from 'react';
import { X, Book, Server, Terminal, GitBranch, Layers } from 'lucide-react';

interface DocumentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentationModal: React.FC<DocumentationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 dark:bg-black/80">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-200 dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 dark:text-white">
            <Book className="text-blue-500" size={24}/> Technical Documentation
          </h2>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Section 1: System Overview */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">System Overview</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
              BuildStack.dev offers a high-performance containerized hosting environment for full-stack JavaScript applications. 
              The platform utilizes Docker orchestration to isolate workloads, ensuring that your backend APIs and frontend static assets 
              run in harmony without resource contention.
            </p>
          </section>

          {/* Section 2: Deployment Workflow */}
          <section>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                <GitBranch size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Deployment Workflow</h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
              <ol className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-6">
                <li className="mb-2 ml-6">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-4 ring-white dark:bg-blue-900 dark:ring-slate-900">
                    <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                  </span>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Code Ingestion</h4>
                  <p className="text-xs text-slate-500 mt-1">Source files are parsed and validated against the supported language runtimes.</p>
                </li>
                <li className="mb-2 ml-6">
                  <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 ring-4 ring-white dark:bg-slate-800 dark:ring-slate-900">
                    <span className="h-2 w-2 rounded-full bg-slate-500"></span>
                  </span>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Container Build</h4>
                  <p className="text-xs text-slate-500 mt-1">Docker images are built using multi-stage builds to optimize artifact size.</p>
                </li>
                <li className="ml-6">
                   <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 ring-4 ring-white dark:bg-slate-800 dark:ring-slate-900">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Live Routing</h4>
                  <p className="text-xs text-slate-500 mt-1">Nginx reverse proxy maps the ephemeral container ports to a public URL.</p>
                </li>
              </ol>
            </div>
          </section>

          {/* Section 3: Architecture & Onboarding */}
          <div className="grid md:grid-cols-2 gap-6">
            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Server size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Architecture</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  Frontend: React/Vite served via Nginx
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  Backend: Node.js Express cluster
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                  Database: Sharded MongoDB Atlas
                </li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                  <Terminal size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Developer Onboarding</h3>
              </div>
              <div className="rounded bg-slate-800 p-3 font-mono text-xs text-slate-300">
                $ npm install -g buildstack-cli<br/>
                $ buildstack init<br/>
                $ buildstack deploy --prod
              </div>
            </section>
          </div>

        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex justify-end dark:border-slate-800 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
