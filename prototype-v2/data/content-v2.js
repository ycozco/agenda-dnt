/**
 * Catálogo de contenido público, SEO y textos informativos del prototipo v2.
 * Todo el contenido es ficticio y demostrativo.
 */
export const CONTENT_V2 = {
  meta: {
    siteName: "Sillar Dental · Odontología Especializada Arequipa",
    disclaimer: "Prototipo interactivo demostrativo. Datos, profesionales e imágenes son referencias ficticias."
  },
  hero: {
    title: "Odontología de alta precisión en Arequipa",
    subtitle: "Atención odontológica integral con tecnología digital, diagnóstico por imágenes y un equipo multidisciplinario enfocado en la salud y estética dental.",
    badge: "Sede Yanahuara · Arequipa",
    ctaPrimary: "Reservar cita en línea",
    ctaSecondary: "Conocer especialidades"
  },
  campaigns: [
    { id: "c1", title: "Evaluación Integral Ortodóncica", tag: "Ortodoncia", description: "Escaneo 3D y diagnóstico fotográfico computarizado para inicio de tratamiento.", badge: "Válido este mes" },
    { id: "c2", title: "Prevención & Profilaxis Ultrasónica", tag: "Prevención", description: "Limpieza profunda con remoción de placa y destartraje ultrasónico.", badge: "Chequeo semestral" },
    { id: "c3", title: "Diseño de Sonrisa & Estética", tag: "Estética", description: "Planificación digital y blanqueamiento clínico sin sensibilidad.", badge: "Nueva tecnología" }
  ],
  specialties: [
    { id: "ortodoncia", name: "Ortodoncia & Ortopedia Dentofacial", icon: "🦷", duration: "18 - 24 meses", steps: 4, desc: "Alineación dental con alineadores invisibles y brackets de zafiro de alta estética.", tech: "Escáner Intraoral 3D" },
    { id: "implantologia", name: "Implantología & Cirugía Guiada", icon: "🔩", duration: "3 - 6 meses", steps: 3, desc: "Rehabilitación fija mediante implantes de titanio con guiado tomográfico digital.", tech: "CBCT Panorámico" },
    { id: "endodoncia", name: "Endodoncia Microscópica", icon: "⚡", duration: "1 - 2 sesiones", steps: 2, desc: "Tratamiento de conductos preservando la pieza dental con instrumentación mecanizada.", tech: "Localizador Apical Digital" },
    { id: "estetica", name: "Estética Dental & Carillas", icon: "✨", duration: "2 - 3 sesiones", steps: 3, desc: "Diseño digital de sonrisa (DSD) y carillas ultracercanas de porcelana disilicato.", tech: "Mockup Digital 3D" },
    { id: "rehabilitacion", name: "Rehabilitación Oral Completa", icon: "👑", duration: "Variable", steps: 4, desc: "Prótesis fijas, coronas de circonio y restauración biomecánica funcional de la oclusión.", tech: "CAD/CAM Dental" },
    { id: "periodoncia", name: "Periodoncia y Salud de Encías", icon: "🌿", duration: "Tratamiento continuo", steps: 3, desc: "Tratamiento de gingivitis, periodontitis y cirugía plástica periodontal guiada.", tech: "Sonda Periodontal Digital" },
    { id: "odontopediatria", name: "Odontopediatría Especializada", icon: "🧸", duration: "Control periódico", steps: 2, desc: "Cuidado dental preventivo y adaptativo enfocado en niños con técnica de confort.", tech: "Cámara Intraoral Infantil" },
    { id: "cirugia-bucar", name: "Cirugía Maxilofacial & Terceras Molares", icon: "🛡️", duration: "1 sesión + control", steps: 2, desc: "Extracción quirúrgica de muelas del juicio e intervenciones óseas ambulatorias.", tech: "Piezosurgery Ultrasónico" }
  ],
  faq: [
    { q: "¿Cómo reservo una cita en Sillar Dental?", a: "Puedes usar nuestro sistema de reserva en línea en 4 sencillos pasos o comunicarte a través de WhatsApp institucional." },
    { q: "¿Aceptan seguros de salud o convenios?", a: "Contamos con convenios con las principales EPS de la región y ofrecemos comprobantes autorizados para reembolso." },
    { q: "¿Cuál es el protocolo para mi primera consulta?", a: "Realizamos una anamnesis digital completa, fotografía intraoral y diagnóstico radiológico inicial en la misma sede." },
    { q: "¿Cómo accedo a mis resultados y radiografías?", a: "Los pacientes tienen acceso a un portal web y móvil donde pueden revisar sus informes PDF, radiografías y estados de cuenta en tiempo real." }
  ]
};
