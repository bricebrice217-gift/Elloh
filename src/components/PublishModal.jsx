import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  FileArchive,
  Download,
  Smartphone
} from 'lucide-react';
import { triggerProjectZipDownload } from '../engine/clientZip';
import { compileProjectFiles } from '../engine/gbadiaEngine';

export default function PublishModal({ project, onClose, onDownloadHtml }) {
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const fullUrl = project?.liveUrl
    ? `${window.location.origin}${project.liveUrl}`
    : '';

  useEffect(() => {
    if (!fullUrl) return;
    QRCode.toDataURL(fullUrl, {
      width: 220,
      margin: 2,
      color: {
        dark: '#060913',
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrUrl(url))
      .catch(() => {});
  }, [fullUrl]);

  if (!project) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0C1326] border border-cyan-500/30 rounded-2xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              ● En ligne sur GBADIA Cloud
            </span>
            <h3 className="text-xl font-black text-white mt-2">
              {project.brandName || project.name} est publié !
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shareable Live URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400">
            Lien direct de votre site / application :
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={fullUrl}
              className="flex-1 rounded-xl bg-[#060913] border border-slate-700 px-3 py-2 text-xs font-mono text-cyan-300"
            />
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copié' : 'Copier'}</span>
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold"
            >
              <span>Ouvrir</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* QR Code for Mobile Testing & Installation */}
        <div className="bg-[#070B16] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
          {qrUrl && (
            <img
              src={qrUrl}
              alt="QR Code mobile"
              className="w-36 h-36 rounded-xl bg-white p-1.5 shrink-0"
            />
          )}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <Smartphone className="w-4 h-4" />
              <span>Test & Installation sur Smartphone</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scannez ce QR Code avec l’appareil photo de votre téléphone Android ou iPhone pour ouvrir l’application et l’installer sur votre écran d’accueil (PWA).
            </p>
          </div>
        </div>

        {/* Download Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() =>
              triggerProjectZipDownload(
                project.slug,
                project.files && project.files.html
                  ? project.files
                  : project.config
                    ? compileProjectFiles(project.config)
                    : {}
              )
            }
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white text-xs font-bold cursor-pointer"
          >
            <FileArchive className="w-4 h-4" />
            <span>Télécharger Pack .ZIP</span>
          </button>

          <button
            type="button"
            onClick={onDownloadHtml}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Fichier Unique .HTML</span>
          </button>
        </div>
      </div>
    </div>
  );
}
