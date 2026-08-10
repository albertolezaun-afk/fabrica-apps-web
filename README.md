# apps.albertolezaun.com

El sitio de la fábrica de apps. Un índice y, por cada app, su **política de
privacidad** y su **página de soporte**.

## Por qué existe

Apple rechaza cualquier app cuya URL de privacidad devuelva un 404. Con diez
apps, mantener diez webs sería absurdo; con una y dos páginas por app, es un
`git push`.

No es una web de marketing. Nadie descarga una app de utilidad porque haya
visto su landing: llegan por búsqueda en la App Store. Esto cumple el requisito
legal y da un sitio decente al que apuntar desde la ficha.

## Añadir una app

1. Crea su entrada en `contenido.js` con el tagline, qué datos recoge y el FAQ.
2. `node generar.mjs`
3. Commit y push. GitHub Pages publica solo.

El nombre, el Apple ID, el email de soporte y el kit de diseño **no se escriben
aquí**: salen de `../apps/<carpeta>/app.meta.js`. Una sola fuente de verdad.

## Regenerar

```bash
node generar.mjs            # con la fecha de hoy
node generar.mjs 2026-08-10 # con una fecha concreta
```

La fecha entra por argumento a propósito: si se tomara del reloj, cada
ejecución cambiaría el HTML y ensuciaría los diffs sin que nada haya cambiado.

## Cuidado con la política de privacidad

El bloque `datos` de `contenido.js` genera la política. **Tiene que ser exacto**:
si dice de menos es una declaración falsa ante Apple, y si dice de más espantas
usuarios sin motivo. Cuando una app empiece a enviar algo nuevo, actualiza ahí
antes que en ningún otro sitio.

Esto no es asesoramiento legal. Es una política honesta escrita para apps que
de verdad no recogen datos personales; si alguna app cambia ese modelo, hay que
revisarla con alguien que sepa.

## Alojamiento

GitHub Pages desde la rama `main`, dominio `apps.albertolezaun.com` (ver
`CNAME`). Gratis y sin depender del hosting de albertolezaun.com, que sigue
redirigiendo a Linktree sin que esto le afecte.
