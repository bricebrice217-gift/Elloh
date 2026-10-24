import React, { useState } from 'react';
import {
  Sparkles,
  Globe,
  ShoppingBag,
  Smartphone,
  LayoutDashboard,
  Mic,
  ArrowRight,
  Cpu,
  QrCode,
  FileArchive,
  Sun,
  Moon
} from 'lucide-react';
import { THEME_PALETTES, GALLERY_PRESETS } from '../engine/gbadiaEngine';

const TARGET_MODES = [
  {
    id: 'web',
    label: 'Site Web Complet',
    sub: 'Vitrine, entreprise, agence, portail',
    icon: Globe
  },
  {
    id: 'ecommerce',
    label: 'Boutique E-Commerce',
    sub: 'Catalogue, panier actif & code promo',
    icon: ShoppingBag
  },
  {
    id: 'mobile',
    label: 'Application Mobile',
    sub: 'Android & iOS (PWA installable)',
    icon: Smartphone
  },
  {
    id: 'saas',
    label: 'Logiciel / App SaaS',
    sub: 'Tableau de bord, gestion & données',
    icon: LayoutDashboard
  }
];

const QUICK_IDEAS = [
  {
    label: '🍔 App Livraison Repas',
    target: 'mobile',
    dark: true,
    prompt: 'Application mobile de commande et livraison rapide de burgers et grillades appelée Braise Express avec panier et suivi'
  },
  {
    label: '🚗 Location Voitures VIP',
    target: 'web',
    dark: true,
    prompt: 'Site moderne de location et vente de voitures SUV et berlines appelé AutoDrive VIP avec réservation en ligne'
  },
  {
    label: '🛍️ Boutique Montres & Tech',
    target: 'ecommerce',
    dark: true,
    prompt: 'Boutique e-commerce de montres connectées et accessoires tech appelée ChronoLuxe avec panier et code promo'
  },
  {
    label: '📊 Logiciel Gestion & Caisse',
    target: 'saas',
    dark: true,
    prompt: 'Application web SaaS de facturation, stock et trésorerie appelée NovaGest Pro'
  },
  {
    label: '💬 App Réseau Social',
    target: 'mobile',
    dark: true,
    prompt: 'Application mobile communautaire et réseau social appelée VibeConnect avec publications en direct'
  }
];

const BUILD_STEPS = [
  'Analyse de votre concept & architecture cible...',
  'Génération des écrans Web & Mobile adaptatifs...',
  'Intégration des modules dynamiques (Panier, formulaires, PWA)...',
  'Compilation terminée — Ouverture du Studio GBADIA UNIVERTY !'
];

export default function LaunchpadView({ onLaunchGeneration, onSelectPreset }) {
  const [targetPlatform, setTargetPlatform] = useState('web');
  const [brandName, setBrandName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [darkOutput, setDarkOutput] = useState(true);
  const [selectedPalette, setSelectedPalette] = useState(THEME_PALETTES[0]);
  const [listening, setListening] = useState(false);
  const [buildingStep, setBuildingStep] = useState(-1);

  const startVoiceDictation = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('La dictée vocale nécessite Chrome ou Edge. Saisissez votre description au clavier.');
      return;
    }
    const rec = new SpeechRec();
    rec.lang = 'fr-FR';
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (ev) => {
      const text = ev.results?.[0]?.[0]?.transcript || '';
      if (text) setPrompt((prev) => (prev ? `${prev} ${text}` : text));
    };
    rec.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPrompt =
      prompt.trim() ||
      `Créer ${
        targetPlatform === 'mobile'
          ? 'une application mobile moderne'
          : targetPlatform === 'ecommerce'
            ? 'une boutique en ligne complète avec panier'
            : targetPlatform === 'saas'
              ? 'un logiciel SaaS de gestion en temps réel'
              : 'un site web professionnel moderne'
      }${brandName.trim() ? ` appelé ${brandName.trim()}` : ''}`;

    setBuildingStep(0);
    setTimeout(() => setBuildingStep(1), 260);
    setTimeout(() => setBuildingStep(2), 540);
    setTimeout(() => setBuildingStep(3), 800);
    setTimeout(() => {
      setBuildingStep(-1);
      onLaunchGeneration(finalPrompt, {
        targetPlatform,
        brandName: brandName.trim(),
        darkMode: darkOutput,
        palette: selectedPalette
      });
    }, 1050);
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 relative overflow-hidden">
      {/* Subtle Futuristic Radial Glows */}
      <div
        className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 w-[900px] h-[440px] rounded-full opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, #2563EB 45%, transparent 72%)'
        }}
      />

      {/* Live Generation Overlay */}
      {buildingStep >= 0 && (
        <div className="fixed inset-0 z-50 bg-[#050814]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0B1224] border border-cyan-400/35 rounded-2xl p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center animate-pulse">
              <Cpu className="w-7 h-7 text-white" />
            </div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              Moteur IA GBADIA UNIVERTY
            </div>
            <h3 className="text-lg font-bold text-white">{BUILD_STEPS[buildingStep]}</h3>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-300"
                style={{ width: `${(buildingStep + 1) * 25}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* MAIN HERO CONSOLE */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>GBADIA UNIVERTY • GÉNÉRATEUR DE SITES WEB & APPLICATIONS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Transformez votre idée en{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Site Web ou Application
            </span>{' '}
            instantanément.
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Choisissez le type de projet, décrivez ce que vous voulez créer, puis personnalisez en direct avec l’IA et téléchargez votre application complète.
          </p>
        </div>

        {/* INTERACTIVE AI BUILDER CONSOLE */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0B1224]/95 border border-cyan-500/20 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-black/50 space-y-6"
        >
          {/* Step 1: Choose Target Type */}
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 mb-3">
              1. Que souhaitez-vous générer ?
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TARGET_MODES.map((m) => {
                const Icon = m.icon;
                const selected = targetPlatform === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setTargetPlatform(m.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      selected
                        ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                        : 'bg-[#070B16] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 mb-2 ${
                        selected ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    />
                    <div className="font-bold text-xs sm:text-sm">{m.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.sub}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Name + Theme Style */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                2. Nom de votre site ou application (optionnel)
              </label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Ex : Ivoire Market, Express Immo, Mon App..."
                className="w-full rounded-xl bg-[#060A15] border border-slate-800 focus:border-cyan-400 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                Thème du rendu
              </label>
              <div className="grid grid-cols-2 rounded-xl bg-[#060A15] border border-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setDarkOutput(true)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    darkOutput ? 'bg-slate-800 text-cyan-300' : 'text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Sombre</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDarkOutput(false)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    !darkOutput ? 'bg-white text-slate-900' : 'text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Clair</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                Couleur dominante
              </label>
              <div className="flex items-center gap-2 bg-[#060A15] border border-slate-800 rounded-xl px-3 py-2">
                {THEME_PALETTES.map((pal) => (
                  <button
                    key={pal.id}
                    type="button"
                    onClick={() => setSelectedPalette(pal)}
                    title={pal.name}
                    className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                      selectedPalette.id === pal.id
                        ? 'scale-125 ring-2 ring-white'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: pal.primary }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Prompt Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
                3. Décrivez les fonctionnalités souhaitées
              </label>
              <button
                type="button"
                onClick={startVoiceDictation}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                  listening
                    ? 'bg-red-500/20 border-red-400 text-red-300'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>{listening ? 'Écoute en cours...' : 'Dicter au micro'}</span>
              </button>
            </div>

            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez votre site web ou application : secteur d’activité, produits ou services, panier en ligne, prise de rendez-vous, espace gestion, bouton WhatsApp..."
              className="w-full rounded-2xl bg-[#060A15] border border-slate-800 focus:border-cyan-400 p-4 text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none resize-none"
            />
          </div>

          {/* Quick Ideas + Submit */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap gap-2">
              {QUICK_IDEAS.map((idea) => (
                <button
                  key={idea.label}
                  type="button"
                  onClick={() => {
                    setTargetPlatform(idea.target);
                    setDarkOutput(idea.dark);
                    setPrompt(idea.prompt);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#070B16] hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold text-slate-300 hover:text-cyan-200 transition-colors cursor-pointer"
                >
                  {idea.label}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="whitespace-nowrap inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer shrink-0"
            >
              <span>⚡ Générer maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* 3 Core Superpowers Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          <div className="p-5 rounded-2xl bg-[#0B1224]/80 border border-slate-800/90 space-y-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Modification par Chat IA en Direct</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Écrivez simplement « Ajoute un panier », « Change la couleur en or » ou « Passe en application mobile » dans le Studio Live.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1224]/80 border border-slate-800/90 space-y-2">
            <QrCode className="w-6 h-6 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Lien Cloud Instantané & QR Code Mobile</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publiez en un clic pour obtenir une adresse web active et un QR Code scannable sur Android et iPhone (PWA installable).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1224]/80 border border-slate-800/90 space-y-2">
            <FileArchive className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">Code Source 100% Libre (.ZIP & .HTML)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Téléchargez l’intégralité des fichiers HTML, CSS, JS, Service Worker hors-ligne et manifeste mobile sans aucun verrouillage.
            </p>
          </div>
        </div>
      </section>

      {/* INSTANT GALLERY PREVIEW */}
      <section className="relative z-10 border-t border-slate-800/80 bg-[#070B17] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                 Démarrage Express en 1 Clic
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Exemples de Sites Web & Applications Générables
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {GALLERY_PRESETS.map((preset) => (
              <div
                key={preset.id}
                className="group bg-[#0C1326] border border-slate-800 hover:border-cyan-400/60 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: preset.accent }}
                    >
                      {preset.typeLabel}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {preset.prompt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 text-slate-200 group-hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Ouvrir & Personnaliser →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
