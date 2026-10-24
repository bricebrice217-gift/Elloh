// Générateur d'archives .ZIP côté client (IEEE 802.3 CRC32) — 100% autonome même hors ligne

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32Bytes(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

export function createClientZipBlob(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.name.replace(/\\/g, '/'));
    const dataBytes = encoder.encode(file.content || '');
    const crc = crc32Bytes(dataBytes);
    const size = dataBytes.length;

    const lh = new ArrayBuffer(30);
    const lv = new DataView(lh);
    lv.setUint32(0, 0x04034B50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0x4821, true);
    lv.setUint16(12, 0x5557, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);

    localParts.push(new Uint8Array(lh), nameBytes, dataBytes);

    const ch = new ArrayBuffer(46);
    const cv = new DataView(ch);
    cv.setUint32(0, 0x02014B50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0x4821, true);
    cv.setUint16(14, 0x5557, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);

    centralParts.push(new Uint8Array(ch), nameBytes);
    offset += 30 + nameBytes.length + size;
  }

  const centralLen = centralParts.reduce((s, arr) => s + arr.length, 0);
  const end = new ArrayBuffer(22);
  const ev = new DataView(end);
  ev.setUint32(0, 0x06054B50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralLen, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, new Uint8Array(end)], {
    type: 'application/zip'
  });
}

export function triggerProjectZipDownload(slug, compiledFiles) {
  const blob = createClientZipBlob([
    { name: 'index.html', content: compiledFiles.html || '' },
    { name: 'css/styles.css', content: compiledFiles.css || '' },
    { name: 'js/app.js', content: compiledFiles.js || '' },
    { name: 'manifest.json', content: compiledFiles.manifest || '{}' },
    { name: 'sw.js', content: compiledFiles.sw || '' },
    { name: 'icon.svg', content: compiledFiles.iconSvg || '' },
    { name: 'LISEZ-MOI.md', content: compiledFiles.readme || '' }
  ]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${slug || 'application'}-gbadia-univerty.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
