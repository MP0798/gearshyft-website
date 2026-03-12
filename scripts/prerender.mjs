import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;
const ORIGIN = 'https://gearshyft.nl';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

// Parse sitemap.xml to extract all routes
function getRoutes() {
  const sitemapPath = join(DIST, 'sitemap.xml');
  const sitemap = readFileSync(sitemapPath, 'utf-8');
  const routes = [...sitemap.matchAll(/<loc>https?:\/\/[^<]+<\/loc>/g)]
    .map(m => {
      const url = m[0].replace(/<\/?loc>/g, '');
      return new URL(url).pathname;
    })
    .map(p => p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);
  return [...new Set(routes)];
}

// Minimal static file server with SPA fallback
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, decodeURIComponent(req.url));

      // Try exact file
      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(readFileSync(filePath));
        return;
      }

      // Try with index.html
      const indexPath = join(filePath, 'index.html');
      if (existsSync(indexPath)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(readFileSync(indexPath));
        return;
      }

      // SPA fallback
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(readFileSync(join(DIST, 'index.html')));
    });

    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  const routes = getRoutes();
  console.log(`\nPre-rendering ${routes.length} routes...\n`);

  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let success = 0;
  let failed = 0;

  for (const route of routes) {
    try {
      const page = await browser.newPage();

      // Block heavy resources not needed for HTML content
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const type = req.resourceType();
        if (['image', 'media', 'font'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 15000,
      });

      // Wait a bit for React to settle and meta tags to be set
      await page.evaluate(() => new Promise(r => setTimeout(r, 200)));

      let html = await page.content();

      // Fix: ensure canonical and og:url point to production domain, not localhost
      html = html.replace(
        /http:\/\/localhost:\d+/g,
        ORIGIN
      );

      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = join(DIST, 'index.html');
      } else {
        outputPath = join(DIST, route, 'index.html');
      }

      mkdirSync(dirname(outputPath), { recursive: true });
      writeFileSync(outputPath, html);
      console.log(`  ✓ ${route}`);
      success++;

      await page.close();
    } catch (err) {
      console.error(`  ✗ ${route}: ${err.message}`);
      failed++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\nDone: ${success} rendered, ${failed} failed.\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

prerender();
