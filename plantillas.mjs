/**
 * Plantillas HTML del sitio. Sin frameworks, sin build: son cadenas.
 *
 * El motivo no es purismo. Este sitio existe para que Apple no rechace las apps
 * por un 404 en la URL de privacidad; tiene que seguir en pie dentro de tres
 * años sin que nadie haya actualizado una dependencia.
 */

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Fecha en español, para los "última actualización". */
export function fechaLarga(iso) {
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} de ${meses[m - 1]} de ${a}`;
}

/**
 * Estilos. Se generan a partir del kit de diseño de la app para que la web y
 * la app se parezcan. Con modo oscuro, porque en 2026 no ponerlo se nota.
 */
export function estilos(kit) {
  const v = (p) =>
    Object.entries(p)
      .map(([k, hex]) => `    --${k}: ${hex};`)
      .join('\n');

  return `/* Generado por generar.mjs. No editar a mano. */
:root {
${v(kit.light)}
  --radio: ${kit.radius.card}px;
}
@media (prefers-color-scheme: dark) {
  :root {
${v(kit.dark)}
  }
}

*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0 24px 96px;
  background: var(--canvas);
  color: var(--ink);
  font: 17px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

main { max-width: 680px; margin: 0 auto; }

header { padding: 64px 0 40px; }

h1 { font-size: 40px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 12px; }
h2 { font-size: 24px; line-height: 1.25; letter-spacing: -0.01em; margin: 48px 0 12px; }
h3 { font-size: 19px; margin: 32px 0 8px; }

p, li { color: var(--ink); }
.muted { color: var(--muted); }

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

.tarjeta {
  display: block;
  padding: 24px;
  margin: 16px 0;
  border: 1px solid var(--line);
  border-radius: var(--radio);
  background: var(--surface);
  color: inherit;
  transition: border-color .15s;
}
.tarjeta:hover { border-color: var(--accent); text-decoration: none; }
.tarjeta h3 { margin: 0 0 4px; }
.tarjeta p { margin: 0; color: var(--muted); font-size: 15px; }

.icono {
  width: 56px; height: 56px;
  border-radius: 13px;
  float: left; margin: 0 16px 0 0;
}

.aviso {
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  border-radius: 8px;
  background: var(--surface);
  font-size: 15px;
}

ul { padding-left: 20px; }
li { margin: 6px 0; }

footer {
  max-width: 680px;
  margin: 80px auto 0;
  padding-top: 24px;
  border-top: 1px solid var(--line);
  font-size: 14px;
  color: var(--muted);
}
footer a { color: var(--muted); text-decoration: underline; }

#core-contacto {
  --cc-boton: var(--accent);
  --cc-boton-texto: var(--canvas);
  --cc-borde: var(--line);
  --cc-fondo: var(--surface);
  --cc-texto: var(--ink);
}

.volver { display: inline-block; margin-bottom: 32px; font-size: 15px; }
`;
}

function envoltorio({ titulo, descripcion, cuerpo, base = '', anio }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descripcion)}">
<meta name="color-scheme" content="light dark">
<link rel="stylesheet" href="${base}estilos.css">
</head>
<body>
<main>
${cuerpo}
</main>
<footer>
  <p>© ${anio} Alberto Lezaun · <a href="${base}">Todas las apps</a></p>
</footer>
</body>
</html>
`;
}

export function paginaIndice({ apps, anio }) {
  const tarjetas = apps
    .map(
      (a) => `  <a class="tarjeta" href="${a.slug}/">
    <h3>${esc(a.storeName)}</h3>
    <p>${esc(a.tagline)}</p>
  </a>`
    )
    .join('\n');

  return envoltorio({
    titulo: 'Apps de Alberto Lezaun',
    descripcion: 'Apps de utilidad para iPhone. Pago único, sin suscripciones y sin cuentas.',
    anio,
    cuerpo: `<header>
  <h1>Apps</h1>
  <p class="muted">Herramientas pequeñas para iPhone. Cada una resuelve una cosa
  concreta. Pago único, sin suscripciones y sin pedirte una cuenta.</p>
</header>

${tarjetas}`,
  });
}

export function paginaApp({ app, anio }) {
  const tienda = app.appStoreId
    ? `<p><a href="https://apps.apple.com/es/app/id${app.appStoreId}">Ver en la App Store →</a></p>`
    : '<p class="muted">Próximamente en la App Store.</p>';

  return envoltorio({
    titulo: app.storeName,
    descripcion: app.tagline,
    base: '../',
    anio,
    cuerpo: `<a class="volver" href="../">← Todas las apps</a>
<header>
  <h1>${esc(app.storeName)}</h1>
  <p class="muted">${esc(app.tagline)}</p>
</header>

${tienda}

<h2>Ayuda</h2>
<p><a href="soporte.html">Soporte y preguntas frecuentes</a></p>
<p><a href="privacidad.html">Política de privacidad</a></p>`,
  });
}

export function paginaSoporte({ app, anio }) {
  const faq = app.faq
    .map((f) => `<h3>${esc(f.p)}</h3>\n<p>${esc(f.r)}</p>`)
    .join('\n\n');

  return envoltorio({
    titulo: `Soporte — ${app.storeName}`,
    descripcion: `Ayuda y preguntas frecuentes de ${app.storeName}.`,
    base: '../',
    anio,
    cuerpo: `<a class="volver" href="./">← ${esc(app.storeName)}</a>
<header>
  <h1>Soporte</h1>
  <p class="muted">${esc(app.storeName)}</p>
</header>

<div class="aviso">
  <p style="margin:0">¿No encuentras lo que buscas? Escríbeme con el formulario
  de contacto de esta página. Contesto yo, no un bot.</p>
</div>

<h2>Preguntas frecuentes</h2>

${faq}

<h2>Si algo va mal</h2>
<p>Cuéntame qué esperabas que pasara y qué pasó, y dime tu modelo de iPhone y la
versión de iOS. Con eso suele bastar para reproducirlo. Indica también el nombre
de la app (${esc(app.storeName)}) en tu mensaje.</p>

<h2 id="contacto">Formulario de contacto</h2>
<div id="core-contacto" data-proyecto="fabrica-de-apps" data-idioma="es" data-privacidad="https://apps.albertolezaun.com/${esc(app.slug)}/privacidad.html"></div>
<script src="https://core-contacto.albertolezaun.workers.dev/form.js" async></script>`,
  });
}

export function paginaPrivacidad({ app, anio, fecha }) {
  const d = app.datos;

  const enDispositivo = d.enElDispositivo
    .map((x) => `  <li>${esc(x)}</li>`)
    .join('\n');

  return envoltorio({
    titulo: `Privacidad — ${app.storeName}`,
    descripcion: `Qué datos recoge ${app.storeName} y qué hace con ellos.`,
    base: '../',
    anio,
    cuerpo: `<a class="volver" href="./">← ${esc(app.storeName)}</a>
<header>
  <h1>Privacidad</h1>
  <p class="muted">${esc(app.storeName)} · actualizada el ${fecha}</p>
</header>

<div class="aviso">
  <p style="margin:0"><strong>Lo esencial:</strong> lo que escribes en la app se
  queda en tu iPhone. No hay cuentas, no hay publicidad y no se vende nada a
  nadie.</p>
</div>

<h2>Lo que NO sale de tu teléfono</h2>
<p>Estos datos se guardan solo en el dispositivo y no se envían a ningún
servidor, ni mío ni de terceros:</p>
<ul>
${enDispositivo}
</ul>
<p>Si borras la app, desaparecen. No tengo forma de recuperarlos porque nunca
los he tenido.</p>

<h2>Lo que sí se envía</h2>

<h3>Uso de la app (analítica)</h3>
<p>Uso ${'PostHog'} para saber qué pantallas se abren y qué botones se pulsan, de
forma agregada. Sirve para decidir qué mejorar. Estos eventos:</p>
<ul>
  <li>No incluyen ningún dato que hayas escrito en la app.</li>
  <li>No van asociados a tu nombre, tu email ni tu Apple ID.</li>
  <li>Se procesan en servidores de la Unión Europea.</li>
  <li>No se usan para seguirte por otras apps o webs.</li>
</ul>
<p>Para no contar dos veces a la misma persona, los eventos llevan un
identificador aleatorio que se genera en tu dispositivo la primera vez que
abres la app. No procede de Apple, no identifica tu teléfono y desaparece si
desinstalas. Es lo que en la ficha de App Store aparece como “ID del
dispositivo”.</p>

<h3>Compras</h3>
<p>La compra la procesa Apple. Yo no veo tu método de pago en ningún momento.
Uso ${'RevenueCat'} para saber si una compra está activa y poder restaurarla en
otro dispositivo. Recibe un identificador anónimo generado por Apple, no tu
identidad.</p>

<h2>Lo que no hago</h2>
<ul>
  <li>No hay cuentas de usuario ni registro.</li>
  <li>No hay publicidad ni redes publicitarias.</li>
  <li>No vendo ni cedo datos a terceros.</li>
  <li>No conecto con tu banco ni con ninguna entidad financiera.</li>
</ul>

<h2>Tus derechos</h2>
<p>Puedes pedirme acceso, rectificación o supresión de cualquier dato a través
del <a href="soporte.html#contacto">formulario de contacto</a> de la página de soporte. Como la
analítica es anónima, en la práctica lo único identificable sería un correo que
me hayas enviado tú por ese formulario.</p>
<p>También puedes desactivar la compartición de analítica desde
Ajustes → Privacidad y seguridad → Análisis y mejoras, en el propio iPhone.</p>

<h2>Menores</h2>
<p>La app no está dirigida a menores de 13 años y no recoge datos de ellos a
sabiendas.</p>

<h2>Cambios</h2>
<p>Si esta política cambia, actualizaré la fecha de arriba. Los cambios
importantes los avisaré también en las notas de la versión.</p>

<h2>Responsable</h2>
<p>Alberto Lezaun · contacto a través del <a href="soporte.html#contacto">formulario de contacto</a> de la página de soporte.</p>`,
  });
}
