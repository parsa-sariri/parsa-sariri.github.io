import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

// Copy index.html to 404.html for SPA fallback
fs.copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('✅ Generated 404.html & .nojekyll for GitHub Pages.');

// Prerender directory structure for direct route requests
const routes = [
  'writeups',
  'writeups/windows-artifact-triage-hayabusa'
];

routes.forEach((route) => {
  const targetDir = path.join(distDir, route);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(targetDir, 'index.html'));
  console.log(`✅ Prerendered static fallback entry: dist/${route}/index.html`);
});
