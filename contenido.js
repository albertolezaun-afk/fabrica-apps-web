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
  'app-nomina': {
    /** Una línea. Es lo que se ve en el índice. */
    tagline: 'Del salario bruto al dinero que llega a tu cuenta cada mes.',

    publicada: true,

    datos: {
      enElDispositivo: [
        'Tu salario bruto anual y el número de pagas',
        'Tu situación familiar: hijos a tu cargo, edad y tipo de contrato',
        'Los sueldos que comparas',
      ],
      analitica: true,
      compras: true,
      cuentas: false,
      publicidad: false,
    },

    faq: [
      {
        p: '¿Por qué mi nómina real no da exactamente esto?',
        r: 'Porque la app calcula el caso general y tu nómina puede llevar pluses, dietas, horas extra, atrasos o un convenio con cotizaciones especiales. Si la diferencia es de unos euros, es normal. Si es de cientos, revisa que hayas puesto el bruto ANUAL con las pagas extra incluidas: es el error más común.',
      },
      {
        p: '¿Meto el bruto anual o el mensual?',
        r: 'El anual, con las pagas extra incluidas. Es la cifra que aparece en tu contrato. Si solo conoces el mensual, multiplícalo por el número de pagas que cobras.',
      },
      {
        p: 'Me sale que no me retienen nada de IRPF. ¿Es un error?',
        r: 'Probablemente no. Con sueldos bajos hay dos motivos para no retener: estar por debajo del límite que fija Hacienda, o que tu mínimo personal y familiar se coma la cuota. Son dos mecanismos distintos y los dos son reales.',
      },
      {
        p: '¿Cambia algo cobrar en 12 o en 14 pagas?',
        r: 'Al año, nada: cobras lo mismo y te retienen lo mismo. Solo cambia el reparto. Con 14 pagas la mensualidad es menor y las dos extras llegan sin descuento de Seguridad Social, porque ya has cotizado por ellas mes a mes.',
      },
      {
        p: '¿Sirve para autónomos?',
        r: 'No. Está hecha para el régimen general de la Seguridad Social, es decir, para quien trabaja por cuenta ajena. Los autónomos cotizan por tramos de ingresos y el cálculo es otro.',
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
  'app-tallas': {
    tagline: 'Qué talla pedir en cada marca, y por qué no es la misma.',

    publicada: true,

    datos: {
      enElDispositivo: [
        'La marca en la que compras y la talla que gastas',
        'Las conversiones de calzado que consultas',
      ],
      analitica: true,
      compras: true,
      cuentas: false,
      publicidad: false,
    },

    faq: [
      {
        p: '¿De dónde salen las tallas de cada marca?',
        r: 'De la guía de tallas que publica cada marca en su web, que indica qué medidas corporales en centímetros corresponden a cada talla. La app no inventa equivalencias entre marcas: traduce tu talla pasando por esas medidas, que es lo único que no cambia según la tienda. Cada tabla lleva la fecha en que se comprobó.',
      },
      {
        p: '¿Esta app es de Zara, H&M o alguna otra marca?',
        r: 'No. No tiene ninguna relación con ellas. Sus nombres aparecen únicamente para indicar la equivalencia de tallas, a partir de datos que cada una publica libremente.',
      },
      {
        p: 'Pedí la talla que decía la app y no me vale.',
        r: 'Puede pasar: una prenda concreta talla distinta según el corte, el tejido y si lleva elástico. La app parte de la tabla general de la marca, que es una media. Escríbenos con la marca y la prenda y lo revisamos.',
      },
      {
        p: '¿Por qué no hay tallas de Estados Unidos en el calzado?',
        r: 'Porque las fuentes se contradicen entre sí a partir de la 41 europea, y cada marca americana aplica su propia conversión. Preferimos no darte un número en el que no confiamos. Se añadirá cuando haya una fuente fiable.',
      },
      {
        p: '¿Vais a añadir más marcas?',
        r: 'Sí, y quien haya comprado la versión completa las tendrá sin pagar otra vez. Si echas en falta alguna, dínoslo: las que más se pidan son las primeras que entran.',
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
