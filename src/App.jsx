import React, { useState, useEffect } from 'react';
import HeaderBar from './components/HeaderBar';
import LaunchpadView from './components/LaunchpadView';
import StudioView from './components/StudioView';
import ProjectsGalleryView from './components/ProjectsGalleryView';
import PublishModal from './components/PublishModal';
import {
  generateFromPrompt,
  compileProjectFiles
} from './engine/gbadiaEngine';

function viewFromUrl() {
  const p = window.location.pathname;
  if (p.startsWith('/studio')) return 'studio';
  if (p.startsWith('/projets') || p.startsWith('/modeles')) return 'projects';
  return 'launchpad';
}

export default function App() {
  const [activeView, setActiveView] = useState(viewFromUrl);
  const [savedProjects, setSavedProjects] = useState([]);
  const [publishedModalProject, setPublishedModalProject] = useState(null);

  const [activeProject, setActiveProject] = useState(() => {
    const initialConfig = generateFromPrompt(
      'Application moderne appelée Mon Projet Digital avec catalogue interactif, réservation et contact WhatsApp',
      { targetPlatform: 'web', darkMode: true }
    );
    return {
      id: null,
      prompt: '',
      liveUrl: '',
      config: initialConfig,
      chatHistory: [
        {
          role: 'assistant',
          text: 'Bienvenue dans le Studio Live GBADIA UNIVERTY ! Décrivez ici toute modification souhaitée (couleurs, panier, réservation, version mobile, nom...) ou éditez directement vos blocs.'
        }
      ]
    };
  });

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.projects)) setSavedProjects(d.projects);
      })
      .catch(() => {});
  }, []);

  const navigate = (view) => {
    setActiveView(view);
    const urlMap = {
      launchpad: '/',
      studio: '/studio',
      projects: '/projets'
    };
    window.history.pushState({}, '', urlMap[view] || '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPop = () => setActiveView(viewFromUrl());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const handleLaunchGeneration = (promptText, opts = {}) => {
    const generatedConfig = generateFromPrompt(promptText, opts);
    setActiveProject({
      id: null,
      prompt: promptText,
      liveUrl: '',
      config: generatedConfig,
      chatHistory: [
        { role: 'user', text: promptText },
        {
          role: 'assistant',
          text: `Votre projet « ${generatedConfig.brandName} » (${
            generatedConfig.appMode ? 'Application Mobile PWA' : 'Site Web Responsive'
          }) est généré ! Testez l’aperçu interactif à droite ou demandez-moi des ajustements ici.`
        }
      ]
    });
    navigate('studio');
  };

  const handleSelectPreset = (preset) => {
    handleLaunchGeneration(preset.prompt, {
      targetPlatform: preset.targetPlatform,
      darkMode: true
    });
  };

  const handleUpdateProject = (patch) => {
    setActiveProject((prev) => ({
      ...prev,
      ...patch
    }));
  };

  const handlePublishProject = async (compiledFiles, openModal = true) => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: activeProject.id || undefined,
        name: activeProject.config.brandName,
        brandName: activeProject.config.brandName,
        targetPlatform: activeProject.config.targetPlatform || 'web',
        prompt: activeProject.prompt || '',
        config: activeProject.config,
        files: compiledFiles,
        chatHistory: activeProject.chatHistory || []
      })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Erreur de publication');
    setSavedProjects(data.projects || []);
    setActiveProject((prev) => ({
      ...prev,
      id: data.project.id,
      liveUrl: data.project.liveUrl
    }));
    if (openModal) {
      setPublishedModalProject(data.project);
    }
    return data.project;
  };

  const handleOpenSavedProject = (proj) => {
    setActiveProject({
      id: proj.id,
      prompt: proj.prompt || '',
      liveUrl: proj.liveUrl || '',
      config: JSON.parse(JSON.stringify(proj.config)),
      chatHistory:
        Array.isArray(proj.chatHistory) && proj.chatHistory.length > 0
          ? proj.chatHistory
          : [
              {
                role: 'assistant',
                text: `Projet « ${proj.brandName} » rechargé. Que souhaitez-vous modifier ?`
              }
            ]
    });
    navigate('studio');
  };

  const handleDeleteProject = async (id) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (Array.isArray(data.projects)) setSavedProjects(data.projects);
    if (activeProject.id === id) {
      setActiveProject((prev) => ({ ...prev, id: null, liveUrl: '' }));
    }
  };

  const downloadHtmlFromModal = () => {
    if (!publishedModalProject) return;
    const files =
      publishedModalProject.files?.standaloneHtml
        ? publishedModalProject.files
        : compileProjectFiles(publishedModalProject.config);
    const blob = new Blob([files.standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${publishedModalProject.slug}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050814] text-slate-100 font-sans antialiased">
      <HeaderBar
        activeView={activeView}
        onNavigate={navigate}
        onNewProject={() => navigate('launchpad')}
        projectsCount={savedProjects.length}
      />

      <main className="flex-1">
        {activeView === 'launchpad' && (
          <LaunchpadView
            onLaunchGeneration={handleLaunchGeneration}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeView === 'studio' && (
          <StudioView
            project={activeProject}
            onUpdateProject={handleUpdateProject}
            onPublishProject={handlePublishProject}
          />
        )}

        {activeView === 'projects' && (
          <ProjectsGalleryView
            savedProjects={savedProjects}
            onOpenSavedProject={handleOpenSavedProject}
            onDeleteProject={handleDeleteProject}
            onShowQrModal={(proj) => setPublishedModalProject(proj)}
            onSelectPreset={handleSelectPreset}
          />
        )}
      </main>

      {activeView !== 'studio' && (
        <footer className="bg-[#050814] border-t border-slate-800/80 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-black text-white tracking-wide">GBADIA UNIVERTY</span>
              <span>— Plateforme IA de Génération de Sites Web & Applications</span>
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={() => navigate('launchpad')}
                className="hover:text-cyan-400 cursor-pointer"
              >
                Créer un Projet
              </button>
              <button
                type="button"
                onClick={() => navigate('studio')}
                className="hover:text-cyan-400 cursor-pointer"
              >
                Studio Live
              </button>
              <button
                type="button"
                onClick={() => navigate('projects')}
                className="hover:text-cyan-400 cursor-pointer"
              >
                Mes Créations
              </button>
            </div>
          </div>
        </footer>
      )}

      {publishedModalProject && (
        <PublishModal
          project={publishedModalProject}
          onClose={() => setPublishedModalProject(null)}
          onDownloadHtml={downloadHtmlFromModal}
        />
      )}
    </div>
  );
}
