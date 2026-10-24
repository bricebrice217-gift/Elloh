const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_DIR = path.join(ROOT_DIR, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const SAVED_PROJECTS_DIR = path.join(ROOT_DIR, 'saved-projects');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(SAVED_PROJECTS_DIR, { recursive: true });

// Standard IEEE 802.3 CRC32 table for valid PKZIP export without external dependencies
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function buildZipBuffer(files) {
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;

  for (const file of files) {
    const nameBuf = Buffer.from(file.name.replace(/\\/g, '/'), 'utf8');
    const dataBuf = Buffer.isBuffer(file.content)
      ? file.content
      : Buffer.from(file.content || '', 'utf8');
    const crc = crc32(dataBuf);
    const size = dataBuf.length;

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034B50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(0, 8);
    localHeader.writeUInt16LE(0x4821, 10);
    localHeader.writeUInt16LE(0x5557, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(size, 18);
    localHeader.writeUInt32LE(size, 22);
    localHeader.writeUInt16LE(nameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localChunks.push(localHeader, nameBuf, dataBuf);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014B50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(0, 10);
    centralHeader.writeUInt16LE(0x4821, 12);
    centralHeader.writeUInt16LE(0x5557, 14);
    centralHeader.writeUInt32LE(crc, 16);
    centralHeader.writeUInt32LE(size, 20);
    centralHeader.writeUInt32LE(size, 24);
    centralHeader.writeUInt16LE(nameBuf.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralChunks.push(centralHeader, nameBuf);
    offset += localHeader.length + nameBuf.length + size;
  }

  const centralDirBuf = Buffer.concat(centralChunks);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054B50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(files.length, 8);
  endRecord.writeUInt16LE(files.length, 10);
  endRecord.writeUInt32LE(centralDirBuf.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...localChunks, centralDirBuf, endRecord]);
}

function slugify(str) {
  return (
    String(str || 'projet-gbadia')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48) || 'projet-gbadia'
  );
}

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({ projects: [] }, null, 2), 'utf8');
      return { projects: [] };
    }
    const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    return { projects: Array.isArray(parsed.projects) ? parsed.projects : [] };
  } catch {
    return { projects: [] };
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

function writeProjectFilesToDisk(project) {
  if (!project || !project.slug || !project.files) return;
  const projectDir = path.join(SAVED_PROJECTS_DIR, project.slug);
  fs.mkdirSync(path.join(projectDir, 'css'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'js'), { recursive: true });

  const f = project.files;
  if (f.html) fs.writeFileSync(path.join(projectDir, 'index.html'), f.html, 'utf8');
  if (f.standaloneHtml) fs.writeFileSync(path.join(projectDir, 'standalone.html'), f.standaloneHtml, 'utf8');
  if (f.css) fs.writeFileSync(path.join(projectDir, 'css', 'styles.css'), f.css, 'utf8');
  if (f.js) fs.writeFileSync(path.join(projectDir, 'js', 'app.js'), f.js, 'utf8');
  if (f.manifest) fs.writeFileSync(path.join(projectDir, 'manifest.json'), f.manifest, 'utf8');
  if (f.sw) fs.writeFileSync(path.join(projectDir, 'sw.js'), f.sw, 'utf8');
  if (f.iconSvg) fs.writeFileSync(path.join(projectDir, 'icon.svg'), f.iconSvg, 'utf8');
  if (f.readme) fs.writeFileSync(path.join(projectDir, 'LISEZ-MOI.md'), f.readme, 'utf8');
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.zip': 'application/zip'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 12 * 1024 * 1024) {
        reject(new Error('Charge utile trop volumineuse'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const str = Buffer.concat(chunks).toString('utf8');
        resolve(str ? JSON.parse(str) : {});
      } catch {
        reject(new Error('JSON invalide'));
      }
    });
    req.on('error', reject);
  });
}

function serveStaticFile(res, filePath) {
  try {
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) return false;
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = decodeURIComponent(parsedUrl.pathname);

    if (pathname === '/api/health' && req.method === 'GET') {
      const db = readDb();
      return sendJson(res, 200, {
        status: 'ok',
        engine: 'GBADIA UNIVERTY AI Studio Engine v2.0',
        projectsCount: db.projects.length
      });
    }

    if (pathname === '/api/projects' && req.method === 'GET') {
      const db = readDb();
      return sendJson(res, 200, { projects: db.projects });
    }

    if (pathname === '/api/projects' && req.method === 'POST') {
      const body = await parseJsonBody(req);
      const db = readDb();
      const id = body.id || `app-${crypto.randomBytes(4).toString('hex')}`;
      const baseSlug = slugify(body.slug || body.brandName || body.name || 'application');
      const existingIndex = db.projects.findIndex((p) => p.id === id);

      let slug = baseSlug;
      if (existingIndex === -1 && db.projects.some((p) => p.slug === slug)) {
        slug = `${baseSlug}-${id.slice(-4)}`;
      } else if (existingIndex !== -1) {
        slug = db.projects[existingIndex].slug || slug;
      }

      const now = new Date().toISOString();
      const record = {
        id,
        slug,
        name: body.name || body.brandName || 'Nouvelle Application',
        brandName: body.brandName || body.name || 'Nouvelle Application',
        targetPlatform: body.targetPlatform || 'web',
        prompt: body.prompt || '',
        config: body.config || {},
        files: body.files || {},
        chatHistory: Array.isArray(body.chatHistory) ? body.chatHistory : [],
        liveUrl: `/p/${slug}/`,
        updatedAt: now,
        createdAt: existingIndex !== -1 ? db.projects[existingIndex].createdAt : now
      };

      if (existingIndex !== -1) {
        db.projects[existingIndex] = record;
      } else {
        db.projects.unshift(record);
      }

      writeDb(db);
      writeProjectFilesToDisk(record);
      return sendJson(res, 200, { project: record, projects: db.projects });
    }

    const zipMatch = pathname.match(/^\/api\/projects\/([^/]+)\/export\.zip$/);
    if (zipMatch && req.method === 'GET') {
      const idOrSlug = zipMatch[1];
      const db = readDb();
      const project = db.projects.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
      if (!project || !project.files) {
        return sendJson(res, 404, { error: 'Projet introuvable.' });
      }
      const f = project.files;
      const zipBuffer = buildZipBuffer([
        { name: 'index.html', content: f.html || '' },
        { name: 'css/styles.css', content: f.css || '' },
        { name: 'js/app.js', content: f.js || '' },
        { name: 'manifest.json', content: f.manifest || '{}' },
        { name: 'sw.js', content: f.sw || '' },
        { name: 'icon.svg', content: f.iconSvg || '' },
        { name: 'LISEZ-MOI.md', content: f.readme || '# Application générée par GBADIA UNIVERTY\n' }
      ]);
      res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-Length': zipBuffer.length,
        'Content-Disposition': `attachment; filename="${project.slug}-gbadia-univerty.zip"`,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(zipBuffer);
      return;
    }

    const delMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
    if (delMatch && req.method === 'DELETE') {
      const id = delMatch[1];
      const db = readDb();
      db.projects = db.projects.filter((p) => p.id !== id);
      writeDb(db);
      return sendJson(res, 200, { projects: db.projects });
    }

    // Hosted live websites & apps at /p/:slug/*
    if (pathname.startsWith('/p/')) {
      const rel = pathname.slice(3);
      const parts = rel.split('/').filter(Boolean);
      const slug = parts[0];
      if (slug) {
        if (!pathname.endsWith('/') && parts.length === 1) {
          res.writeHead(302, { Location: `/p/${slug}/` });
          res.end();
          return;
        }
        const subPath = parts.slice(1).join('/') || 'index.html';
        const safePath = path.normalize(path.join(SAVED_PROJECTS_DIR, slug, subPath));
        if (safePath.startsWith(SAVED_PROJECTS_DIR) && serveStaticFile(res, safePath)) {
          return;
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>Application non trouvée</h1>');
      return;
    }

    const cleanRel = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const candidate = path.normalize(path.join(PUBLIC_DIR, cleanRel));
    if (candidate.startsWith(PUBLIC_DIR) && serveStaticFile(res, candidate)) {
      return;
    }

    const spaIndex = path.join(PUBLIC_DIR, 'index.html');
    if (serveStaticFile(res, spaIndex)) {
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404');
  } catch (err) {
    sendJson(res, 500, { error: err.message || 'Erreur serveur' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`GBADIA UNIVERTY Engine listening on http://${HOST}:${PORT}`);
});
