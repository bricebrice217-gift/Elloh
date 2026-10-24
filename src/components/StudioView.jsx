import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Layers,
  Palette,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Send,
  QrCode,
  FileArchive,
  Download,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Trash2,
  ChevronDown,
  ChevronRight,
  Upload,
  Copy,
  Check
} from 'lucide-react';
import {
  THEME_PALETTES,
  BLOCK_CATALOG,
  compileProjectFiles,
  applyConversationalEdit
} from '../engine/gbadiaEngine';
import { triggerProjectZipDownload } from '../engine/clientZip';

function currentProjectSlug(project) {
  return String(
    project?.config?.slug ||
      (project?.config?.brandName || 'application')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') ||
      'application'
  );
}

const QUICK_AI_ACTIONS = [
  '+ Ajouter Boutique & Panier',
  '+ Ajouter Réservation RDV',
  '+ Ajouter Grille Tarifs',
  'Change la couleur en or',
  'Passe en mode clair',
  'Transforme en application mobile'
];

export default function StudioView({
  project,
  onUpdateProject,
  onPublishProject
}) {
  const config = project.config;
  const [leftTab, setLeftTab] = useState('chat'); // 'chat' | 'blocks' | 'design'
  const [rightMode, setRightMode] = useState('preview'); // 'preview' | 'code'
  const [viewport, setViewport] = useState(config.appMode ? 'mobile' : 'desktop');
  const [chatInput, setChatInput] = useState('');
  const [expandedBlockId, setExpandedBlockId] = useState(config.sections?.[0]?.id || '');
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [codeTab, setCodeTab] = useState('html');
  const [copiedCode, setCopiedCode] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setViewport(config.appMode ? 'mobile' : 'desktop');
  }, [project.id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [project.chatHistory]);

  const compiledFiles = useMemo(() => compileProjectFiles(config), [config]);

  const sendChatCommand = (text) => {
    const clean = String(text || '').trim();
    if (!clean) return;
    const { config: updatedConfig, viewport: nextVp, reply } = applyConversationalEdit(
      config,
      clean
    );
    if (nextVp) setViewport(nextVp);
    const nextHistory = [
      ...(project.chatHistory || []),
      { role: 'user', text: clean },
      { role: 'assistant', text: reply }
    ];
    onUpdateProject({
      config: updatedConfig,
      chatHistory: nextHistory
    });
    setChatInput('');
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    sendChatCommand(chatInput);
  };

  const patchConfig = (patch) => {
    onUpdateProject({ config: { ...config, ...patch } });
  };

  const updateSection = (secId, patch) => {
    const sections = (config.sections || []).map((s) =>
      s.id === secId ? { ...s, ...patch } : s
    );
    patchConfig({ sections });
  };

  const moveSection = (idx, dir) => {
    const arr = [...(config.sections || [])];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    patchConfig({ sections: arr });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      patchConfig({ logoDataUrl: String(reader.result || '') });
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadStandaloneHtml = () => {
    const blob = new Blob([compiledFiles.standaloneHtml], {
      type: 'text/html;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(config.brandName || 'application')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handlePublishClick = async (openModal = true) => {
    setPublishing(true);
    try {
      const saved = await onPublishProject(compiledFiles, openModal);
      return saved;
    } finally {
      setPublishing(false);
    }
  };

  const handleDownloadZip = async () => {
    triggerProjectZipDownload(currentProjectSlug(project), compiledFiles);
  };

  const codeMap = {
    html: compiledFiles.html,
    css: compiledFiles.css,
    js: compiledFiles.js,
    manifest: compiledFiles.manifest,
    sw: compiledFiles.sw
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeMap[codeTab] || '');
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-[#050814] text-slate-100 flex flex-col">
      {/* STUDIO COMMAND BAR */}
      <div className="bg-[#090F1E] border-b border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Editable App Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <input
            type="text"
            value={config.brandName || ''}
            onChange={(e) => patchConfig({ brandName: e.target.value })}
            aria-label="Nom du projet"
            className="bg-transparent font-extrabold text-white text-sm sm:text-base border-b border-transparent hover:border-slate-700 focus:border-cyan-400 focus:outline-none px-1 py-0.5"
          />
        </div>

        {/* Center Preview / Code + Viewport Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl bg-[#050814] border border-slate-800 p-1">
            <button
              type="button"
              onClick={() => setRightMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                rightMode === 'preview'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aperçu Live
            </button>
            <button
              type="button"
              onClick={() => setRightMode('code')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                rightMode === 'code'
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Source</span>
            </button>
          </div>

          {rightMode === 'preview' && (
            <div className="inline-flex rounded-xl bg-[#050814] border border-slate-800 p-1">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  viewport === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bureau</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  viewport === 'tablet' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablette</span>
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                  viewport === 'mobile' ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Publish + Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handlePublishClick(true)}
            disabled={publishing}
            className="whitespace-nowrap inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-extrabold shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{publishing ? 'Publication...' : 'Publier + QR Code'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadZip}
            title="Télécharger le pack complet .ZIP (Web + Mobile PWA)"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold cursor-pointer"
          >
            <FileArchive className="w-3.5 h-3.5 text-cyan-400" />
            <span>.ZIP</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadStandaloneHtml}
            title="Télécharger en 1 fichier .HTML autonome"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.HTML</span>
          </button>
        </div>
      </div>

      {/* SPLIT WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
        {/* LEFT CONTROL PANE */}
        <aside className="lg:col-span-4 bg-[#080D1B] border-r border-slate-800 flex flex-col h-[540px] lg:h-[calc(100vh-125px)]">
          {/* Tabs */}
          <div className="grid grid-cols-3 border-b border-slate-800 bg-[#060A15]">
            {[
              { id: 'chat', label: 'Chat IA', icon: MessageSquare },
              { id: 'blocks', label: `Blocs (${config.sections?.length || 0})`, icon: Layers },
              { id: 'design', label: 'Design & Logo', icon: Palette }
            ].map((t) => {
              const Icon = t.icon;
              const active = leftTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLeftTab(t.id)}
                  className={`flex items-center justify-center gap-1.5 py-3 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
                    active
                      ? 'border-cyan-400 text-cyan-300 bg-[#080D1B]'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: CONVERSATIONAL AI BUILDER */}
          {leftTab === 'chat' && (
            <div className="flex-1 flex flex-col min-h-0 p-4 gap-3">
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {(project.chatHistory || []).map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/30 text-white ml-6'
                        : 'bg-[#0E162B] border border-slate-800 text-slate-200 mr-4'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold uppercase tracking-wider mb-1 text-cyan-400">
                      {m.role === 'user' ? 'Vous' : 'Moteur IA GBADIA UNIVERTY'}
                    </div>
                    <div>{m.text}</div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Quick Mutation Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                {QUICK_AI_ACTIONS.map((act) => (
                  <button
                    key={act}
                    type="button"
                    onClick={() => sendChatCommand(act)}
                    className="px-2.5 py-1 rounded-lg bg-[#0E162B] hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-[11px] font-semibold text-slate-300 hover:text-cyan-200 transition-colors cursor-pointer"
                  >
                    {act}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Demandez une modification ou un nouveau site..."
                  className="flex-1 rounded-xl bg-[#050814] border border-slate-700 focus:border-cyan-400 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Envoyer"
                  className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: VISUAL BLOCK EDITOR */}
          {leftTab === 'blocks' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  Modules actifs de votre application
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddBlock(!showAddBlock)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un module</span>
                </button>
              </div>

              {showAddBlock && (
                <div className="p-3 rounded-xl bg-[#0E162B] border border-cyan-500/40 space-y-1.5 max-h-60 overflow-y-auto">
                  {BLOCK_CATALOG.map((blk) => (
                    <button
                      key={blk.type}
                      type="button"
                      onClick={() => {
                        const created = blk.create(config.brandName);
                        patchConfig({ sections: [...(config.sections || []), created] });
                        setExpandedBlockId(created.id);
                        setShowAddBlock(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg bg-[#070B16] hover:border-cyan-400 border border-slate-800 cursor-pointer"
                    >
                      <div className="text-xs font-bold text-white">{blk.label}</div>
                      <div className="text-[11px] text-slate-400">{blk.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                {(config.sections || []).map((sec, idx) => {
                  const open = expandedBlockId === sec.id;
                  return (
                    <div
                      key={sec.id}
                      className={`rounded-xl border bg-[#0C1326] ${
                        open ? 'border-cyan-400/70' : 'border-slate-800'
                      }`}
                    >
                      <div className="p-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setExpandedBlockId(open ? '' : sec.id)}
                          className="flex items-center gap-2 text-left min-w-0 flex-1 cursor-pointer"
                        >
                          {open ? (
                            <ChevronDown className="w-4 h-4 text-cyan-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">
                              {sec.title || sec.type}
                            </div>
                            <div className="text-[10px] uppercase text-slate-400">{sec.type}</div>
                          </div>
                        </button>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => moveSection(idx, -1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSection(idx, 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateSection(sec.id, { enabled: sec.enabled === false })
                            }
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            {sec.enabled === false ? (
                              <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              patchConfig({
                                sections: config.sections.filter((x) => x.id !== sec.id)
                              })
                            }
                            className="p-1 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {open && (
                        <div className="px-3 pb-3 pt-2 border-t border-slate-800 space-y-2.5">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">Titre</label>
                            <input
                              type="text"
                              value={sec.title || ''}
                              onChange={(e) => updateSection(sec.id, { title: e.target.value })}
                              className="w-full rounded-lg bg-[#060913] border border-slate-700 px-2.5 py-1.5 text-xs text-white"
                            />
                          </div>

                          {sec.subtitle !== undefined && (
                            <div>
                              <label className="block text-[11px] text-slate-400 mb-1">
                                Description
                              </label>
                              <textarea
                                rows={2}
                                value={sec.subtitle || ''}
                                onChange={(e) =>
                                  updateSection(sec.id, { subtitle: e.target.value })
                                }
                                className="w-full rounded-lg bg-[#060913] border border-slate-700 px-2.5 py-1.5 text-xs text-white"
                              />
                            </div>
                          )}

                          {Array.isArray(sec.items) && sec.items.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <div className="text-[11px] font-bold text-cyan-400">
                                Éléments ({sec.items.length})
                              </div>
                              {sec.items.map((it, k) => (
                                <div
                                  key={k}
                                  className="p-2 rounded-lg bg-[#060913] border border-slate-800 space-y-1"
                                >
                                  {it.title !== undefined && (
                                    <input
                                      type="text"
                                      value={it.title}
                                      onChange={(e) => {
                                        const arr = [...sec.items];
                                        arr[k] = { ...it, title: e.target.value };
                                        updateSection(sec.id, { items: arr });
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                                    />
                                  )}
                                  {it.price !== undefined && (
                                    <input
                                      type="number"
                                      value={it.price}
                                      onChange={(e) => {
                                        const arr = [...sec.items];
                                        arr[k] = { ...it, price: Number(e.target.value || 0) };
                                        updateSection(sec.id, { items: arr });
                                      }}
                                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-cyan-300"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DESIGN, LOGO & OPTIONS */}
          {leftTab === 'design' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {/* Custom Logo Upload */}
              <div className="p-3.5 rounded-xl bg-[#0C1326] border border-slate-800 space-y-2.5">
                <div className="text-xs font-bold text-white">Logo personnalisé du projet</div>
                <label className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Importer une image (PNG / JPG / SVG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </label>
                {config.logoDataUrl && (
                  <button
                    type="button"
                    onClick={() => patchConfig({ logoDataUrl: '' })}
                    className="text-[11px] text-red-400 underline"
                  >
                    Retirer le logo importé
                  </button>
                )}
              </div>

              {/* Palettes */}
              <div>
                <div className="text-xs font-bold text-slate-300 mb-2">Palettes de couleurs</div>
                <div className="grid grid-cols-2 gap-2">
                  {THEME_PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      type="button"
                      onClick={() => patchConfig({ palette: pal })}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer ${
                        config.palette?.id === pal.id
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-slate-800 bg-[#0C1326]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: pal.primary }}
                        />
                        <span
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: pal.secondary }}
                        />
                      </div>
                      <div className="text-xs font-bold text-white">{pal.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feature Switches */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800">
                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0C1326] border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Mode Sombre du site généré</div>
                    <div className="text-[11px] text-slate-400">Basculer Sombre / Clair</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(config.darkMode)}
                    onChange={(e) => patchConfig({ darkMode: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0C1326] border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Barre d’Onglets App Mobile</div>
                    <div className="text-[11px] text-slate-400">Navigation tactile Android / iOS</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(config.appMode)}
                    onChange={(e) => {
                      patchConfig({ appMode: e.target.checked });
                      if (e.target.checked) setViewport('mobile');
                    }}
                    className="w-4 h-4 accent-cyan-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-[#0C1326] border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Bouton Flottant WhatsApp</div>
                    <div className="text-[11px] text-slate-400">Contact client instantané</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(config.whatsappEnabled)}
                    onChange={(e) => patchConfig({ whatsappEnabled: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500"
                  />
                </label>
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT LIVE PREVIEW OR SOURCE CODE STAGE */}
        <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col items-center justify-center bg-[#050814] overflow-auto">
          {rightMode === 'preview' ? (
            <div
              className={`transition-all duration-300 bg-[#0B1224] border overflow-hidden flex flex-col shadow-2xl ${
                viewport === 'mobile'
                  ? 'w-[390px] max-w-full h-[760px] rounded-[40px] border-[9px] border-slate-800'
                  : viewport === 'tablet'
                    ? 'w-[768px] max-w-full h-[770px] rounded-2xl border-slate-700'
                    : 'w-full h-[780px] rounded-2xl border-slate-800'
              }`}
            >
              {/* Device Frame Header */}
              <div className="bg-[#0B1224] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="font-mono text-cyan-300 truncate max-w-xs">
                  {project.liveUrl
                    ? `${window.location.origin}${project.liveUrl}`
                    : `gbadia-preview://${(config.brandName || 'app')
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')}`}
                </span>
                <span className="text-emerald-400 font-bold">● Live</span>
              </div>

              <iframe
                title="Aperçu en direct GBADIA UNIVERTY"
                srcDoc={compiledFiles.standaloneHtml}
                className="w-full flex-1 bg-white border-0"
              />
            </div>
          ) : (
            <div className="w-full h-[780px] bg-[#090F1E] border border-slate-800 rounded-2xl flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'html', label: 'index.html' },
                    { id: 'css', label: 'css/styles.css' },
                    { id: 'js', label: 'js/app.js' },
                    { id: 'manifest', label: 'manifest.json (PWA)' },
                    { id: 'sw', label: 'sw.js (Offline)' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCodeTab(f.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer ${
                        codeTab === f.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le fichier</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="flex-1 p-5 overflow-auto text-xs font-mono text-cyan-100 leading-relaxed">
                <code>{codeMap[codeTab]}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
