import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ExternalLink,
  FileArchive,
  Trash2,
  QrCode,
  FolderKanban
} from 'lucide-react';
import { GALLERY_PRESETS } from '../engine/gbadiaEngine';

export default function ProjectsGalleryView({
  savedProjects,
  onOpenSavedProject,
  onDeleteProject,
  onShowQrModal,
  onSelectPreset
}) {
  const [search, setSearch] = useState('');

  const filteredPresets = GALLERY_PRESETS.filter((p) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.typeLabel.toLowerCase().includes(q) ||
      p.prompt.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* USER SAVED CREATIONS */}
        <section className="space-y-5">
          <div className="flex items-center gap-2.5">
            <FolderKanban className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-black text-white">
              Mes Sites Web & Applications Créés ({savedProjects.length})
            </h1>
          </div>

          {savedProjects.length === 0 ? (
            <div className="rounded-2xl bg-[#0B1224] border border-dashed border-slate-700 p-10 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-300">
                Aucun projet sauvegardé pour l’instant.
              </p>
              <p className="text-xs text-slate-500">
                Générez un site ou choisissez un modèle ci-dessous, puis cliquez sur « Publier + QR Code » dans le Studio Live.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#0B1224] border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                        ● En ligne ({proj.config?.appMode ? 'App Mobile PWA' : 'Site Web'})
                      </span>
                      <button
                        type="button"
                        onClick={() => onDeleteProject(proj.id)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg cursor-pointer"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-extrabold text-white">
                      {proj.brandName || proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {proj.config?.tagline || proj.prompt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => onOpenSavedProject(proj)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Ouvrir au Studio
                    </button>
                    <button
                      type="button"
                      onClick={() => onShowQrModal(proj)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 cursor-pointer"
                      title="QR Code Mobile & Lien"
                    >
                      <QrCode className="w-4 h-4" />
                    </button>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                        title="Voir le site en ligne"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={`/api/projects/${proj.id}/export.zip`}
                      download={`${proj.slug}-gbadia-univerty.zip`}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200"
                      title="Télécharger .ZIP"
                    >
                      <FileArchive className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* READY-TO-USE TEMPLATES */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                Catalogue GBADIA UNIVERTY
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                Modèles de Sites Web & Applications Prêts à Personnaliser
              </h2>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un modèle..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B1224] border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredPresets.map((preset) => (
              <div
                key={preset.id}
                className="bg-[#0B1224] border border-slate-800 hover:border-cyan-400/60 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all"
              >
                <div>
                  <span
                    className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white mb-3"
                    style={{ backgroundColor: preset.accent }}
                  >
                    {preset.typeLabel}
                  </span>
                  <h3 className="font-bold text-white text-base mb-1.5">{preset.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{preset.prompt}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Générer ce modèle</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
