import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createDeflateRaw } from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const industries = JSON.parse(
  readFileSync(resolve(root, 'src/data/industry-slugs.json'), 'utf-8')
);

const downloadsDir = resolve(root, 'public/downloads');
mkdirSync(downloadsDir, { recursive: true });

// Minimal zip creation using Node.js built-ins (no external dependencies)
function createZip(entries) {
  const localHeaders = [];
  const centralHeaders = [];
  let offset = 0;

  for (const { name, data } of entries) {
    const nameBuffer = Buffer.from(name, 'utf-8');
    const crc = crc32(data);
    const size = data.length;

    // Local file header
    const local = Buffer.alloc(30 + nameBuffer.length);
    local.writeUInt32LE(0x04034b50, 0); // signature
    local.writeUInt16LE(20, 4);         // version needed
    local.writeUInt16LE(0x0800, 6);     // flags (bit 11 = UTF-8)
    local.writeUInt16LE(0, 8);          // compression (store)
    local.writeUInt16LE(0, 10);         // mod time
    local.writeUInt16LE(0, 12);         // mod date
    local.writeUInt32LE(crc, 14);       // crc32
    local.writeUInt32LE(size, 18);      // compressed size
    local.writeUInt32LE(size, 22);      // uncompressed size
    local.writeUInt16LE(nameBuffer.length, 26); // name length
    local.writeUInt16LE(0, 28);         // extra length
    nameBuffer.copy(local, 30);
    localHeaders.push(Buffer.concat([local, data]));

    // Central directory header
    const central = Buffer.alloc(46 + nameBuffer.length);
    central.writeUInt32LE(0x02014b50, 0); // signature
    central.writeUInt16LE(20, 4);          // version made by
    central.writeUInt16LE(20, 6);          // version needed
    central.writeUInt16LE(0x0800, 8);      // flags (bit 11 = UTF-8)
    central.writeUInt16LE(0, 10);          // compression
    central.writeUInt16LE(0, 12);          // mod time
    central.writeUInt16LE(0, 14);          // mod date
    central.writeUInt32LE(crc, 16);        // crc32
    central.writeUInt32LE(size, 20);       // compressed size
    central.writeUInt32LE(size, 24);       // uncompressed size
    central.writeUInt16LE(nameBuffer.length, 28); // name length
    central.writeUInt16LE(0, 30);          // extra length
    central.writeUInt16LE(0, 32);          // comment length
    central.writeUInt16LE(0, 34);          // disk start
    central.writeUInt16LE(0, 36);          // internal attrs
    central.writeUInt32LE(0, 38);          // external attrs
    central.writeUInt32LE(offset, 42);     // local header offset
    nameBuffer.copy(central, 46);
    centralHeaders.push(central);

    offset += local.length + data.length;
  }

  const centralDir = Buffer.concat(centralHeaders);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);                   // signature
  eocd.writeUInt16LE(0, 4);                              // disk number
  eocd.writeUInt16LE(0, 6);                              // central dir disk
  eocd.writeUInt16LE(entries.length, 8);                  // entries on disk
  eocd.writeUInt16LE(entries.length, 10);                 // total entries
  eocd.writeUInt32LE(centralDir.length, 12);              // central dir size
  eocd.writeUInt32LE(offset, 16);                         // central dir offset
  eocd.writeUInt16LE(0, 20);                              // comment length

  return Buffer.concat([...localHeaders, centralDir, eocd]);
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

for (const { dirName } of industries) {
  const designSrc = resolve(root, 'designs', dirName, 'DESIGN.md');

  if (!existsSync(designSrc)) {
    console.error(`Missing: ${designSrc}`);
    process.exit(1);
  }

  const content = readFileSync(designSrc);
  const zip = createZip([{ name: `${dirName}/DESIGN.md`, data: content }]);
  const zipPath = resolve(downloadsDir, `${dirName}-DESIGN.zip`);
  writeFileSync(zipPath, zip);
  console.log(`Zipped → downloads/${dirName}-DESIGN.zip`);
}

console.log('Prebuild complete.');
