import React, { useState } from 'react';
import {
  Zap,
  Sliders,
  FolderKanban,
  Plus,
  Menu,
  X
} from 'lucide-react';

export default function HeaderBar({
  activeView,
  onNavigate,
  onNewProject,
  projectsCount = 0
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { id: 'launchpad', label: 'Créer un Site / App', icon: Zap },
    { id: 'studio', label: 'Studio Live IA', icon: Sliders },
    {
      id: 'projects',
      label: projectsCount > 0 ? `Mes Créations (${projectsCount})` : 'Modèles & Projets',
      icon: FolderKanban
    }
  ];

  const go = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#060913]/92 backdrop-blur-xl border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 min-h-[68px] flex items-center justify-between gap-4">
        {/* Brand Emblem: GBADIA UNIVERTY */}
        <button
          type="button"
          onClick={() => go('launchpad')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-indigo-700 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full rounded-[11px] bg-[#080E1E] flex items-center justify-center">
              <span className="font-black text-sm tracking-tight bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                GU
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-white text-base sm:text-lg tracking-wide leading-none">
                GBADIA UNIVERTY
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/25">
                AI Builder
              </span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1">
              Générateur de Sites Web & Applications
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#0C1326] p-1 rounded-xl border border-slate-800">
          {items.map((it) => {
            const Icon = it.icon;
            const active = activeView === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => go(it.id)}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{it.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNewProject}
            className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-cyan-400" />
            <span>Nouveau Projet</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800"
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#090E1D] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {items.map((it) => {
            const Icon = it.icon;
            const active = activeView === it.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => go(it.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                  active
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{it.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onNewProject();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </button>
        </div>
      )}
    </header>
  );
}
