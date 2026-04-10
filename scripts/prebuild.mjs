import { copyFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const industries = JSON.parse(
  readFileSync(resolve(root, 'src/data/industry-slugs.json'), 'utf-8')
);

const downloadsDir = resolve(root, 'public/downloads');

mkdirSync(downloadsDir, { recursive: true });

for (const { dirName } of industries) {
  const designSrc = resolve(root, 'designs', dirName, 'DESIGN.md');

  if (!existsSync(designSrc)) {
    console.error(`Missing: ${designSrc}`);
    process.exit(1);
  }

  // zip 內含 {dirName}/DESIGN.md 資料夾結構（中文資料夾名）
  const tmpDir = resolve(downloadsDir, '_tmp', dirName);
  mkdirSync(tmpDir, { recursive: true });
  copyFileSync(designSrc, resolve(tmpDir, 'DESIGN.md'));
  const zipPath = resolve(downloadsDir, `${dirName}-DESIGN.zip`);
  execSync(`cd "${resolve(downloadsDir, '_tmp')}" && zip -r "${zipPath}" "${dirName}"`);
  console.log(`Zipped → downloads/${dirName}.zip`);
}

// 清理暫存目錄
execSync(`rm -rf "${resolve(downloadsDir, '_tmp')}"`);

console.log('Prebuild complete.');
