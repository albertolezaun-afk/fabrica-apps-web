#!/usr/bin/env node
/**
 * Genera el sitio de la fábrica: índice, y por cada app una página con su
 * privacidad y su soporte.
 *
 *     node generar.mjs
 *
 * La identidad de cada app (nombre, Apple ID, email, kit de diseño) sale de
 * `../apps/<carpeta>/app.meta.js`. Lo único que se escribe a mano aquí es
 * `contenido.js`: el tagline, el detalle de qué datos recoge y el FAQ.
 *
 * POR QUÉ ESTE SITIO EXISTE: Apple rechaza cualquier app cuya URL de
 * privacidad devuelva un 404. Con diez apps, mantener diez webs sería absurdo;
 * con una y dos páginas por app, es un `git push`.
 */
import { createRequire } from 'node:module';
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  estilos,
  fechaLarga,
  paginaApp,
  paginaIndice,
  paginaPrivacidad,
  paginaSoporte,
} from './plantillas.mjs';

const require = createRequire(import.meta.url);
const raiz = dirname(fileURLToPath(import.meta.url));
const dirApps = join(raiz, '..', 'apps');

const { contenido } = require('./contenido.js');

// La fecha entra por argumento para que el resultado sea reproducible: si se
// tomara del reloj, cada ejecución cambiaría el HTML y ensuciaría los diffs.
const hoy = process.argv[2] ?? new Date().toISOString().slice(0, 10);
if (!/^\d{4}-\d{2}-\d{2}$/.test(hoy)) {
  console.error(`✖ Fecha inválida: "${hoy}". Formato: AAAA-MM-DD`);
  process.exit(1);
}
const anio = hoy.slice(0, 4);

const apps = [];
let kitParaEstilos = null;

for (const carpeta of readdirSync(dirApps).sort()) {
  const meta = join(dirApps, carpeta, 'app.meta.js');
  if (!existsSync(meta)) continue;

  const extra = contenido[carpeta];
  if (!extra) {
    console.warn(`⚠ ${carpeta} no está en contenido.js — se salta`);
    continue;
  }
  if (!extra.publicada) {
    console.log(`· ${carpeta} marcada como no publicada — se salta`);
    continue;
  }

  delete require.cache[require.resolve(meta)];
  const { APP } = require(meta);

  const { kits } = require(join(dirApps, carpeta, 'src/design/kits.js'));
  if (!kitParaEstilos) kitParaEstilos = kits[APP.designKit];

  apps.push({ ...APP, ...extra, carpeta });
}

if (apps.length === 0) {
  console.error('✖ Ninguna app publicable. Revisa contenido.js.');
  process.exit(1);
}

// El sitio usa el kit de la primera app publicada. Es una decisión consciente:
// una sola identidad visual para el sitio, aunque cada app tenga la suya.
writeFileSync(join(raiz, 'estilos.css'), estilos(kitParaEstilos));

writeFileSync(join(raiz, 'index.html'), paginaIndice({ apps, anio }));

const fecha = fechaLarga(hoy);

for (const app of apps) {
  const dir = join(raiz, app.slug);
  mkdirSync(dir, { recursive: true });

  writeFileSync(join(dir, 'index.html'), paginaApp({ app, anio }));
  writeFileSync(join(dir, 'soporte.html'), paginaSoporte({ app, anio }));
  writeFileSync(join(dir, 'privacidad.html'), paginaPrivacidad({ app, anio, fecha }));

  console.log(`✔ ${app.slug}/  (${app.storeName})`);
}

console.log('');
console.log(`✔ index.html con ${apps.length} app${apps.length > 1 ? 's' : ''}`);
console.log('');
console.log('  Las URLs que van en app.meta.js de cada app:');
for (const app of apps) {
  console.log(`    privacyUrl: https://apps.albertolezaun.com/${app.slug}/privacidad.html`);
  console.log(`    supportUrl: https://apps.albertolezaun.com/${app.slug}/soporte.html`);
}
