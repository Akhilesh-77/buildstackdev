import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CodeCard } from './components/CodeCard';
import { CodeViewer } from './components/CodeViewer';
import { UploadModal } from './components/UploadModal';
import { LandingHeader } from './components/LandingHeader';
import { FolderStructure } from './components/FolderStructure';
import { MockApi } from './services/mockApi';
import { CodeSnippet, CreateSnippetDTO } from './types';
import { Search, Loader2 } from 'lucide-react';

function App() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme management
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    setLoading(true);
    try {
      const data = await MockApi.getAllSnippets();
      setSnippets(data);
    } catch (err) {
      console.error("Failed to load snippets", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateSnippetDTO) => {
    await MockApi.createSnippet(data);
    await loadSnippets();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this snippet?')) {
      await MockApi.deleteSnippet(id);
      setSelectedId(null);
      await loadSnippets();
    }
  };

  const selectedSnippet = snippets.find(s => s.id === selectedId);

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0f172a] dark:text-slate-200 font-sans selection:bg-blue-500/30">
      <Navbar 
        onHomeClick={() => setSelectedId(null)}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {selectedSnippet ? (
          <CodeViewer 
            snippet={selectedSnippet} 
            onBack={() => setSelectedId(null)}
            onDelete={handleDelete}
          />
        ) : (
          <div className="space-y-10 animate-fade-in">
            {/* Theme Landing Header - Only shown on home when no search is active */}
            {!searchQuery && (
              <>
                <LandingHeader onStartHosting={() => setIsUploadOpen(true)} />
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                   <div className="lg:col-span-2">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Recent Deployments</h2>
                          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your active code snippets.</p>
                        </div>
                      </div>
                   </div>
                   <div className="lg:col-span-1 sticky top-24">
                      <FolderStructure />
                   </div>
                </div>
              </>
            )}

            {/* Search Section */}
            <div className={`${searchQuery ? '' : 'mt-8'}`}>
               {searchQuery && (
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Search Results</h2>
               )}
               <div className="relative w-full max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="Search snippets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all focus:w-full dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
              </div>
            ) : filteredSnippets.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-20 text-center dark:border-slate-800 dark:bg-slate-900/50">
                <div className="rounded-full bg-slate-100 p-4 mb-4 dark:bg-slate-800">
                  <Search className="text-slate-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">No snippets found</h3>
                <p className="mt-1 text-slate-500 max-w-sm">
                  {searchQuery ? 'Try adjusting your search terms.' : 'Get started by uploading your first code snippet.'}
                </p>
                {!searchQuery && (
                  <button 
                    onClick={() => setIsUploadOpen(true)}
                    className="mt-6 text-blue-600 hover:text-blue-500 font-medium dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Upload a snippet &rarr;
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSnippets.map(snippet => (
                  <CodeCard 
                    key={snippet.id} 
                    snippet={snippet} 
                    onClick={setSelectedId} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <UploadModal 
        isOpen={isUploadOpen} 
        onClose={() => setIsUploadOpen(false)} 
        onSubmit={handleCreate} 
      />
    </div>
  );
}

export default App;