/**
 * ────────────────────────────────────────────────────────────────────────────
 *  LO ÚNICO QUE SE EDITA A MANO AL AÑADIR UNA APP AL SITIO.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * El resto (nombre, bundle, kit de diseño, email de soporte, Apple ID) sale de
 * `app.meta.js` de cada app: una sola fuente de verdad, sin duplicar datos.
 *
 * La clave de cada entrada es la carpeta dentro de `../apps/`.
 */

const contenido = {
  'app-hipoteca': {
    /** Una línea. Es lo que se ve en el índice. */
    tagline: 'Calcula tu cuota y descubre si te conviene reducir plazo o reducir cuota.',

    /** Se publica o no en el índice. Las apps muertas se ponen a false. */
    publicada: true,

    /**
     * QUÉ DATOS RECOGE. De aquí sale la política de privacidad, así que tiene
     * que ser EXACTO: si dice de menos, es una declaración falsa ante Apple;
     * si dice de más, espantas usuarios sin motivo.
     */
    datos: {
      /** Cosas que el usuario introduce y NO salen del dispositivo. */
      enElDispositivo: [
        'El capital pendiente, el tipo de interés y el plazo de tu hipoteca',
        'Los importes que simulas amortizar',
      ],
      /** Analítica agregada. */
      analitica: true,
      /** Compras gestionadas por Apple + RevenueCat. */
      compras: true,
      /** Cuentas de usuario. */
      cuentas: false,
      /** Publicidad o venta de datos. */
      publicidad: false,
    },

    /** Preguntas frecuentes de la página de soporte. */
    faq: [
      {
        p: '¿Los cálculos son fiables?',
        r: 'Usan el sistema francés de cuota constante, el de prácticamente todas las hipotecas en España. Están contrastados contra valores publicados y contra el método del valor presente. Aun así, la cifra que manda siempre es la de tu escritura: si no cuadra, revisa que estés usando el TIN y no la TAE.',
      },
      {
        p: '¿Por qué mi cuota no coincide exactamente con la del banco?',
        r: 'Porque la app calcula solo el préstamo. Tu recibo puede incluir seguros de hogar o de vida vinculados, comisiones o un redondeo distinto. La diferencia suele ser de unos pocos euros.',
      },
      {
        p: 'Tengo hipoteca variable. ¿Me sirve?',
        r: 'Sí, con una salvedad: introduce el tipo que tienes ahora. La app no predice revisiones futuras del euríbor, porque nadie puede. Cuando te revisen el tipo, vuelve y recalcula.',
      },
      {
        p: '¿Reducir plazo o reducir cuota?',
        r: 'Reducir plazo casi siempre ahorra más intereses, porque el interés se paga por el tiempo que el dinero está prestado. Pero reducir cuota da aire en el presupuesto de cada mes, y eso a veces vale más que el ahorro. La app te da los dos números para que decidas tú.',
      },
      {
        p: 'He pagado y he cambiado de teléfono.',
        r: 'Abre Ajustes → Restaurar compra. La compra va ligada a tu Apple ID, así que se recupera sin coste.',
      },
      {
        p: '¿Es una suscripción?',
        r: 'No. Es un pago único. No se renueva, no caduca y no hay nada que cancelar.',
      },
    ],
  },
};

module.exports = { contenido };
