# 🌐 GBADIA UNIVERTY

**Générateur IA de Sites Web & Applications** — plateforme Dark Futuristic 100% française : génération instantanée (Site Web, E-Commerce, App Mobile PWA, SaaS), édition par chat IA, aperçu multi-écrans, publication cloud + QR Code, exports .ZIP (Web + PWA) et .HTML autonome.

## 🚀 Démarrage local

```bash
npm start
# → http://localhost:3000
```

## ☁️ Déploiement Render

La configuration est automatique grâce à `render.yaml` :

1. **Dashboard Render** → **New → Blueprint Instance** → sélectionnez ce dépôt.
2. Render lit `render.yaml` : *Node runtime · build `npm install` · start `npm start` · health check `/api/health`*.
3. Cliquez **Apply** → votre site est en ligne : `https://gbadia-univerty.onrender.com`

> ⚠️ Plan gratuit Render : l'app se met en veille après ~15 min d'inactivité (premier chargement = 30-60 s, ensuite instantané).

## 📂 Architecture

| Chemin | Rôle |
|---|---|
| `server.js` | Serveur Node pur (zéro dépendance requise) : API projets, hébergement `/p/:slug/`, export ZIP |
| `src/engine/` | Moteur IA de génération + édition conversationnelle + compilateur multi-fichiers |
| `src/components/` | Interface React (Launchpad, Studio Live IA, Modales, Galerie) |
| `public/` | Shell HTML + assets compilés (`app.css`, `app.js`) |

---
© GBADIA UNIVERTY — Générateur de Sites Web & Applications
