window.DENTAL_SEED = {
  organization: { id: 'org_sillar', organizationId: 'org_sillar', siteId: 'site_yanahuara', name: 'Sillar Dental Especialidades', tagline: 'Clínica dental especializada en Arequipa', site: 'Yanahuara', address: 'Av. Los Arces 418, Yanahuara, Arequipa', phone: '+51 954 000 418', email: 'citas@sillardental.demo', timezone: 'America/Lima', currency: 'PEN' },
  practitioners: [
    { id: 'prac_valdivia', name: 'Dra. Camila Valdivia Torres', specialty: 'Rehabilitación oral', initials: 'CV', color: 'blue' },
    { id: 'prac_bustamante', name: 'Dr. Diego Bustamante Lazo', specialty: 'Ortodoncia', initials: 'DB', color: 'teal' },
    { id: 'prac_salazar', name: 'Dra. Lucía Salazar Ponce', specialty: 'Periodoncia e implantes', initials: 'LS', color: 'terracotta' },
    { id: 'prac_huamani', name: 'Dra. Elena Huamaní Cárdenas', specialty: 'Odontopediatría', initials: 'EH', color: 'amber' }
  ],
  resources: [
    { id: 'chair_01', name: 'Sillón 1', type: 'Consultorio' },
    { id: 'chair_02', name: 'Sillón 2', type: 'Consultorio' },
    { id: 'chair_03', name: 'Sillón pediátrico', type: 'Consultorio' },
    { id: 'room_rx', name: 'Sala radiología', type: 'Diagnóstico' }
  ],
  patients: [
    { id: 'pat_maria_quispe', name: 'María Fernanda Quispe Cárdenas', short: 'María Quispe', initials: 'MQ', record: 'HC-2026-00418', age: 33, phone: '+51 950 000 418', email: 'maria.quispe@example.test', allergy: 'Ibuprofeno', flag: 'Ansiedad dental moderada', status: 'Activo', balance: 3480, planProgress: 34, practitionerId: 'prac_valdivia' },
    { id: 'pat_luis_mamani', name: 'Luis Alberto Mamani Flores', short: 'Luis Mamani', initials: 'LM', record: 'HC-2026-00392', age: 19, phone: '+51 951 000 392', email: 'luis.mamani@example.test', allergy: 'Ninguna registrada', flag: 'Ortodoncia activa', status: 'Activo', balance: 720, planProgress: 62, practitionerId: 'prac_bustamante' },
    { id: 'pat_sofia_ramos', name: 'Sofía Ramos Núñez', short: 'Sofía Ramos', initials: 'SR', record: 'HC-2026-00401', age: 9, phone: '+51 952 000 401', email: 'apoderado.ramos@example.test', allergy: 'Penicilina', flag: 'Paciente pediátrica', status: 'Activo', balance: 0, planProgress: 18, practitionerId: 'prac_huamani' },
    { id: 'pat_jorge_paredes', name: 'Jorge Paredes Medina', short: 'Jorge Paredes', initials: 'JP', record: 'HC-2026-00374', age: 52, phone: '+51 953 000 374', email: 'jorge.paredes@example.test', allergy: 'Ninguna registrada', flag: 'Periodontitis en control', status: 'Activo', balance: 0, planProgress: 78, practitionerId: 'prac_salazar' },
    { id: 'pat_ana_torres', name: 'Ana Torres Chávez', short: 'Ana Torres', initials: 'AT', record: 'HC-2026-00407', age: 41, phone: '+51 956 000 407', email: 'ana.torres@example.test', allergy: 'Látex', flag: 'Implante en laboratorio', status: 'Activo', balance: 1250, planProgress: 46, practitionerId: 'prac_valdivia' },
    { id: 'pat_carlos_condori', name: 'Carlos Condori Apaza', short: 'Carlos Condori', initials: 'CC', record: 'HC-2026-00311', age: 36, phone: '+51 957 000 311', email: 'carlos.condori@example.test', allergy: 'Ninguna registrada', flag: 'Cuota vencida', status: 'Seguimiento', balance: 430, planProgress: 55, practitionerId: 'prac_valdivia' },
    { id: 'pat_dup_maria', name: 'M. F. Quispe C.', short: 'Posible duplicado', initials: 'MQ', record: 'HC-2026-00419', age: 33, phone: '+51 950 000 418', email: '', allergy: 'Por revisar', flag: 'Coincidencia detectada', status: 'Revisión', balance: 0, planProgress: 0, practitionerId: 'prac_valdivia' }
  ],
  appointments: [
    { id: 'appt_jorge', time: '08:00', end: '09:00', patientId: 'pat_jorge_paredes', practitionerId: 'prac_salazar', resourceId: 'chair_01', type: 'Control periodontal', status: 'Completada', color: 'teal' },
    { id: 'appt_sofia', time: '09:00', end: '10:00', patientId: 'pat_sofia_ramos', practitionerId: 'prac_huamani', resourceId: 'chair_03', type: 'Evaluación infantil', status: 'En atención', color: 'amber' },
    { id: 'appt_ana', time: '10:00', end: '11:00', patientId: 'pat_ana_torres', practitionerId: 'prac_valdivia', resourceId: 'chair_02', type: 'Prueba de corona', status: 'En espera', color: 'terracotta' },
    { id: 'appt_maria', time: '10:30', end: '11:30', patientId: 'pat_maria_quispe', practitionerId: 'prac_valdivia', resourceId: 'chair_01', type: 'Evaluación integral', status: 'Confirmada', color: 'blue' },
    { id: 'appt_wait', time: '11:00', end: '12:00', patientId: 'pat_luis_mamani', practitionerId: 'prac_salazar', resourceId: 'chair_02', type: 'Control de ortodoncia', status: 'Confirmada', color: 'teal' },
    { id: 'appt_luis', time: '12:00', end: '13:00', patientId: 'pat_luis_mamani', practitionerId: 'prac_bustamante', resourceId: 'chair_01', type: 'Control mensual', status: 'Por confirmar', color: 'teal' },
    { id: 'appt_carlos', time: '15:30', end: '16:30', patientId: 'pat_carlos_condori', practitionerId: 'prac_valdivia', resourceId: 'chair_02', type: 'Revisión de avance', status: 'Pendiente', color: 'amber' }
  ],
  odontogram: { patientId: 'pat_maria_quispe', version: 1, status: 'Firmado', events: [
    { tooth: '16', label: 'Caries oclusal', kind: 'finding', status: 'Observado', color: 'terracotta', note: 'Lesión cavitada en superficie oclusal.' },
    { tooth: '26', label: 'Restauración existente', kind: 'finding', status: 'Observado', color: 'teal', note: 'Restauración en buen estado.' },
    { tooth: '36', label: 'Endodoncia + corona', kind: 'finding', status: 'Observado', color: 'blue', note: 'Tratamiento previo registrado.' },
    { tooth: '46', label: 'Ausente', kind: 'finding', status: 'Observado', color: 'amber', note: 'Espacio edéntulo.' }
  ] },
  plan: { patientId: 'pat_maria_quispe', version: 2, status: 'Aceptado parcialmente', acceptedAmount: 3780, items: [
    { id: 'tx_16', tooth: '16', name: 'Restauración con resina', category: 'Operatoria', amount: 280, status: 'Propuesto', priority: 'Alta' },
    { id: 'tx_46a', tooth: '46', name: 'Evaluación implantológica 3D', category: 'Implantología', amount: 220, status: 'Aceptado', priority: 'Media' },
    { id: 'tx_46b', tooth: '46', name: 'Implante y rehabilitación', category: 'Implantología', amount: 3280, status: 'Aceptado', priority: 'Media' }
  ] },
  documents: [
    { id: 'doc_pan_maria', patientId: 'pat_maria_quispe', name: 'Radiografía panorámica', type: 'Radiografía', date: '22 jul 2026', status: 'Final', visibility: 'Publicado', icon: 'image', file: 'assets/images/dental-reference/panoramic-xray-public-domain.jpg' },
    { id: 'doc_report_maria', patientId: 'pat_maria_quispe', name: 'Informe radiográfico', type: 'Informe PDF', date: '22 jul 2026', status: 'Final', visibility: 'Publicado', icon: 'file-text' },
    { id: 'doc_photo_16', patientId: 'pat_maria_quispe', name: 'Fotografía intraoral · pieza 16', type: 'Fotografía HQ', date: '22 jul 2026', status: 'Final', visibility: 'Solo clínica', icon: 'camera' },
    { id: 'doc_consent_implant', patientId: 'pat_maria_quispe', name: 'Consentimiento implantología v2', type: 'Consentimiento', date: '22 jul 2026', status: 'Firmado', visibility: 'Publicado', icon: 'file-check' },
    { id: 'doc_lab_ana', patientId: 'pat_ana_torres', name: 'Orden corona sobre implante', type: 'Laboratorio', date: '21 jul 2026', status: 'En proceso', visibility: 'Solo clínica', icon: 'package' }
  ],
  payments: [
    { id: 'pay_maria_advance', patientId: 'pat_maria_quispe', date: '22 jul 2026', description: 'Adelanto presupuesto v2', amount: 300, method: 'Yape / QR', status: 'Confirmado', allocation: 'Crédito a favor' },
    { id: 'pay_luis', patientId: 'pat_luis_mamani', date: '20 jul 2026', description: 'Cuota ortodoncia julio', amount: 240, method: 'Tarjeta', status: 'Confirmado', allocation: 'Cuota 7' },
    { id: 'pay_ana', patientId: 'pat_ana_torres', date: '19 jul 2026', description: 'Adelanto corona', amount: 500, method: 'Transferencia', status: 'Confirmado', allocation: 'Cargo laboratorio' }
  ],
  installments: [
    { patientId: 'pat_maria_quispe', number: 1, due: '15 ago 2026', amount: 1160, status: 'Pendiente' },
    { patientId: 'pat_maria_quispe', number: 2, due: '15 sep 2026', amount: 1160, status: 'Pendiente' },
    { patientId: 'pat_maria_quispe', number: 3, due: '15 oct 2026', amount: 1160, status: 'Pendiente' },
    { patientId: 'pat_carlos_condori', number: 2, due: '10 jul 2026', amount: 430, status: 'Vencida' }
  ],
  notifications: [
    { id: 'n1', title: 'Resultado listo para publicar', text: 'Informe radiográfico de María Quispe', time: 'Hace 12 min', tone: 'blue' },
    { id: 'n2', title: 'Cuota vencida', text: 'Carlos Condori · S/ 430.00', time: 'Hace 1 h', tone: 'terracotta' },
    { id: 'n3', title: 'Laboratorio actualizado', text: 'Corona de Ana Torres en fabricación', time: 'Ayer', tone: 'teal' }
  ]
};

window.DENTAL_STATE = { selectedPatientId: 'pat_maria_quispe', role: 'Administrador', view: 'dashboard' };
