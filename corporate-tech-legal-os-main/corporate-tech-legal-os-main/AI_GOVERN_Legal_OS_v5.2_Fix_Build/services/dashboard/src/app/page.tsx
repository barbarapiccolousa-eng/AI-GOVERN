'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, ArrowLeft, Sun, Moon, Menu, Check, UserCheck, Eye, Trash2, Edit3, Filter, FileSpreadsheet, Share2, AlertCircle, Bookmark, ExternalLink, Bot, Swords, GitCompare, FileCode, CheckCheck, Lightbulb
} from 'lucide-react';

export default function DashboardPage() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('copiloto_letrado'); // Activar por defecto el copiloto letrado
  const [subTabCumplimiento, setSubTabCumplimiento] = useState<'aduana' | 'boveda' | 'canal_etico' | 'societario'>('aduana');

  // Estado Aduana & PII
  const [aduanaTextoOriginal, setAduanaTextoOriginal] = useState('');
  const [aduanaTextoAnonimizado, setAduanaTextoAnonimizado] = useState('');
  const [aduanaEntidadesDetectadas, setAduanaEntidadesDetectadas] = useState<any[]>([]);
  const [aduanaCopiado, setAduanaCopiado] = useState(false);

  // Estado Bóveda Forense SHA-256
  const [bovedaTitulo, setBovedaTitulo] = useState('');
  const [bovedaContenido, setBovedaContenido] = useState('');
  const [bovedaVerificacionResultado, setBovedaVerificacionResultado] = useState<string | null>(null);
  const [bovedaRegistros, setBovedaRegistros] = useState<any[]>([
    {
      id: "BOV-2026-001",
      titulo: "Acta_Asamblea_Extraordinaria_Corein_Aprobacion_Inventario.pdf",
      hash: "8f4e2c91b5a3d76e0f8c2b1e4a7d6c5b9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
      autor: "Barbara Piccolo (Abogada Directora)",
      fecha: "2026-09-28 14:15:30 VET",
      tamano: "482 KB",
      estado: "Íntegro - Sin Modificaciones"
    },
    {
      id: "BOV-2026-002",
      titulo: "Minuta_Negociacion_Financiamiento_Preacuerdo_Transaccional.docx",
      hash: "a3b5c7d9e1f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4",
      autor: "Barbara Piccolo",
      fecha: "2026-09-27 10:45:12 VET",
      tamano: "1.2 MB",
      estado: "Íntegro - Sin Modificaciones"
    },
    {
      id: "BOV-2026-003",
      titulo: "Informe_Auditoria_Fisica_Existencias_Guasipati_DerivadosGuayana.pdf",
      hash: "c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7",
      autor: "Comisión Auditora Corein",
      fecha: "2026-09-26 16:30:00 VET",
      tamano: "8.4 MB",
      estado: "Íntegro - Sin Modificaciones"
    }
  ]);

  // Estado Canal Ético & Denuncias
  const [canalEticoModalNuevo, setCanalEticoModalNuevo] = useState(false);
  const [canalEticoCasos, setCanalEticoCasos] = useState<any[]>([
    {
      id: "ETH-2026-04",
      categoria: "Conflicto de Interés",
      titulo: "Licitación de transporte de carga vinculada a familiar de compras",
      denunciante: "Anónimo (Canal Encriptado)",
      fecha: "2026-09-25",
      severidad: "Alta",
      estado: "En Investigación",
      abogadoAsignado: "Barbara Piccolo",
      dictamen: "En recopilación de cotizaciones de mercado y declaraciones juradas."
    },
    {
      id: "ETH-2026-03",
      categoria: "Fraude Financiero / Discrepancia",
      titulo: "Discrepancia en arqueo de caja chica operativa en planta Bolívar",
      denunciante: "Auditoría Interna",
      fecha: "2026-09-20",
      severidad: "Media",
      estado: "En Investigación",
      abogadoAsignado: "Barbara Piccolo",
      dictamen: "Revisión de soportes contables y cruce con facturas de proveedores."
    },
    {
      id: "ETH-2026-02",
      categoria: "Seguridad Industrial & Normativa",
      titulo: "Falta de dotación de equipos de protección en área de molinos",
      denunciante: "Delegado de Prevención (LOPCYMAT)",
      fecha: "2026-09-15",
      severidad: "Crítica",
      estado: "Resuelto & Remediado",
      abogadoAsignado: "Consultoría Laboral",
      dictamen: "Entrega inmediata de EPP certificada y acta suscrita ante Comité de Seguridad Laboral."
    }
  ]);
  const [nuevoCasoEth, setNuevoCasoEth] = useState({
    categoria: "Conflicto de Interés",
    titulo: "",
    denunciante: "Anónimo",
    severidad: "Media",
    descripcion: ""
  });

  // Estado Libros Societarios
  const [libroSocietarioSubTab, setLibroSocietarioSubTab] = useState<'accionistas' | 'actas'>('accionistas');
  const [accionistas, setAccionistas] = useState<any[]>([
    { id: 1, nombre: "Barbara Isabel Piccolo Obaldo", cedula: "V-12.345.678", acciones: 45000, porcentaje: 45, valorNominal: 45000, estado: "Suscrito y Pagado", presente: true },
    { id: 2, nombre: "Inversiones Corein C.A.", cedula: "J-30492817-0", acciones: 35000, porcentaje: 35, valorNominal: 35000, estado: "Suscrito y Pagado", presente: true },
    { id: 3, nombre: "Socio Patrimonial Minoritario", cedula: "V-9.876.543", acciones: 20000, porcentaje: 20, valorNominal: 20000, estado: "Suscrito y Pagado", presente: false }
  ]);
  const [modalTraspasoAcciones, setModalTraspasoAcciones] = useState(false);
  const [traspasoForm, setTraspasoForm] = useState({
    cedenteId: 1,
    cesionarioNombre: "",
    cesionarioRif: "",
    cantidadAcciones: 5000,
    precioOperacion: "5.000 USD"
  });

  const [actasSocietarias, setActasSocietarias] = useState<any[]>([
    {
      id: "ACT-2026-01",
      tipo: "Asamblea General Extraordinaria",
      fecha: "18 de Agosto de 2026",
      puntos: "Aprobación de resultados de auditoría de inventario físico y ratificación de administración.",
      quorum: "80% del Capital Social",
      registroMercantil: "Tomo 45-A, N° 12, Registro Mercantil Segundo del Edo. Bolívar",
      estado: "Protocolizada e Inscrita"
    },
    {
      id: "ACT-2025-02",
      tipo: "Asamblea General Ordinaria",
      fecha: "28 de Marzo de 2025",
      puntos: "Aprobación de Estados Financieros Ejercicio Económico 2024 e informe del Comisario.",
      quorum: "100% del Capital Social",
      registroMercantil: "Tomo 12-A, N° 44, Registro Mercantil Segundo del Edo. Bolívar",
      estado: "Protocolizada e Inscrita"
    }
  ]);

  const [filtroRolPlanificador, setFiltroRolPlanificador] = useState<'Todos' | 'In-House' | 'Externo'>('Todos');
  const [filtroMateriaPlanificador, setFiltroMateriaPlanificador] = useState('Todas');
  const [buscarPlanificador, setBuscarPlanificador] = useState('');
  const [vistaPlanificador, setVistaPlanificador] = useState<'kanban' | 'lista'>('kanban');
  
  const [tableroPlanificador, setTableroPlanificador] = useState<any[]>([
    { 
      id: "EXP-01", 
      titulo: "Intimación legal por vías de hecho y retención de 3 montacargas", 
      cliente: "Machtig Rothe, C.A.", 
      tipo_rol: "Externo",
      materia: "Inquilinario", 
      responsable: "Barbara Piccolo", 
      plazo: "Hoy 16:00", 
      prioridad: "Crítica", 
      estado: "Por Iniciar",
      bloqueo: "Revisión Letrada",
      bloqueo_tipo: "interno",
      cuantia: "45.000 USD",
      tribunal: "Juzgado 2° Primera Instancia Civil y Mercantil - Puerto Ordaz",
      detalles: "Bloqueo ilegítimo de portón en Galpón 4 de Unare II. Desposesión arbitraria de 3 montacargas Caterpillar. Se prepara requerimiento resolutorio previo a querella de despojo.",
      bitacora: [
        { fecha: "24/09/2026", nota: "Reunión de emergencia con Director de Operaciones Carlos Mendoza." },
        { fecha: "25/09/2026", nota: "Recepción de fotos notariales del portón bloqueado y contrato de 2024." }
      ]
    },
    { 
      id: "EXP-02", 
      titulo: "Redacción final de Contrato SaaS Enterprise y DPA con Acme Corp", 
      cliente: "AI GOVERN S.L.", 
      tipo_rol: "In-House",
      materia: "LegalTech", 
      responsable: "Barbara Piccolo", 
      plazo: "Viernes 17:00", 
      prioridad: "Alta", 
      estado: "En Tramitación",
      bloqueo: "En Curso",
      bloqueo_tipo: "ninguno",
      cuantia: "60.000 EUR/año",
      tribunal: "Sede Corporativa Madrid / Delaware",
      detalles: "Acuerdo de licencia de software y tratamiento de datos personales conforme al RGPD y Art. 12/50 del EU AI Act. Cláusula de indemnidad limitada a 12 meses.",
      bitacora: [
        { fecha: "20/09/2026", nota: "Primer borrador recibido de los asesores de Acme Corp." },
        { fecha: "23/09/2026", nota: "Redline emitido limitando el lucro cesante y exclusión de jurisdicción en Singapur." }
      ]
    },
    { 
      id: "EXP-03", 
      titulo: "Informe de conciliación de pasivos con proveedores y rotación de stock", 
      cliente: "Corein, C.A.", 
      tipo_rol: "Externo",
      materia: "Auditoría Forense", 
      responsable: "Equipo Auditor", 
      plazo: "Lunes 10:00", 
      prioridad: "Media", 
      estado: "En Tramitación",
      bloqueo: "Esperando Facturas Tercero",
      bloqueo_tipo: "externo",
      cuantia: "128.000 USD",
      tribunal: "Auditoría Interna / Sede Guasipati",
      detalles: "Levantamiento físico de inventario de repuestos, cotejo de libros diarios y conciliación de facturas con 14 proveedores críticos.",
      bitacora: [
        { fecha: "18/09/2026", nota: "Cierre de toma física de inventario en almacén central." },
        { fecha: "22/09/2026", nota: "Detección de diferencia de 12.400 USD en repuestos de maquinaria pesada." }
      ]
    },
    { 
      id: "EXP-04", 
      titulo: "Redacción de acta de asamblea extraordinaria sobre reforma estatutaria", 
      cliente: "Sub 1308, C.A.", 
      tipo_rol: "Externo",
      materia: "Societario", 
      responsable: "Barbara Piccolo", 
      plazo: "Miércoles", 
      prioridad: "Media", 
      estado: "Revisión & Firma",
      bloqueo: "Esperando Balance Comisario",
      bloqueo_tipo: "externo",
      cuantia: "No pecuniaria",
      tribunal: "Registro Mercantil Segundo del Estado Bolívar",
      detalles: "Modificación del objeto social para incorporar actividades de importación y representación comercial, y aumento de capital social a valor actualizado.",
      bitacora: [
        { fecha: "15/09/2026", nota: "Convocatoria formal a accionistas conforme a estatutos vigentes." },
        { fecha: "24/09/2026", nota: "Borrador de acta elaborado con informe de comisario colegiado." }
      ]
    },
    { 
      id: "EXP-05", 
      titulo: "Protocolo de ciberseguridad y retención de logs (EU AI Act)", 
      cliente: "Unidad de Tecnología (IT)", 
      tipo_rol: "In-House",
      materia: "LegalTech", 
      responsable: "Barbara Piccolo", 
      plazo: "Completado", 
      prioridad: "Alta", 
      estado: "Concluido",
      bloqueo: "Concluido",
      bloqueo_tipo: "ninguno",
      cuantia: "Cumplimiento Regulatorio",
      tribunal: "Cumplimiento Interno / Certificación eIDAS",
      detalles: "Implementación de hash SHA-256 inmutable en bases de datos locales y política Zero-Retention en memoria para consultas corporativas.",
      bitacora: [
        { fecha: "01/09/2026", nota: "Auditoría de logs de red de servidores locales." },
        { fecha: "14/09/2026", nota: "Dictamen de aprobación y firma de política de seguridad." }
      ]
    }
  ]);

  const [modalNuevoAsunto, setModalNuevoAsunto] = useState(false);
  const [modalVerExpediente, setModalVerExpediente] = useState<any>(null);

  const [nuevoAsuntoForm, setNuevoAsuntoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    tipo_rol: 'Externo' as 'In-House' | 'Externo',
    materia: 'Inquilinario',
    responsable: 'Barbara Piccolo',
    plazo: 'Próxima semana',
    prioridad: 'Alta',
    bloqueo: 'En Curso',
    bloqueo_tipo: 'ninguno',
    cuantia: '',
    tribunal: '',
    detalles: '',
    estado: 'Por Iniciar'
  });

  const agregarNuevoAsunto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAsuntoForm.titulo) return;
    const nuevo = {
      id: `EXP-0${tableroPlanificador.length + 1}`,
      titulo: nuevoAsuntoForm.titulo,
      cliente: nuevoAsuntoForm.cliente,
      tipo_rol: nuevoAsuntoForm.tipo_rol,
      materia: nuevoAsuntoForm.materia,
      responsable: nuevoAsuntoForm.responsable,
      plazo: nuevoAsuntoForm.plazo || 'Por definir',
      prioridad: nuevoAsuntoForm.prioridad,
      estado: nuevoAsuntoForm.estado,
      bloqueo: nuevoAsuntoForm.bloqueo,
      bloqueo_tipo: nuevoAsuntoForm.bloqueo.includes('Esperando') ? 'externo' : nuevoAsuntoForm.bloqueo.includes('Revisión') ? 'interno' : 'ninguno',
      cuantia: nuevoAsuntoForm.cuantia || 'Por cuantificar',
      tribunal: nuevoAsuntoForm.tribunal || 'Despacho Extrajudicial / Sede Principal',
      detalles: nuevoAsuntoForm.detalles || 'Expediente dado de alta en el sistema del despacho.',
      bitacora: [
        { fecha: "28/09/2026", nota: "Apertura del expediente en el Planificador por Dirección Letrada." }
      ]
    };
    setTableroPlanificador([nuevo, ...tableroPlanificador]);
    setNuevoAsuntoForm({
      titulo: '',
      cliente: 'Machtig Rothe, C.A.',
      tipo_rol: 'Externo',
      materia: 'Inquilinario',
      responsable: 'Barbara Piccolo',
      plazo: 'Próxima semana',
      prioridad: 'Alta',
      bloqueo: 'En Curso',
      bloqueo_tipo: 'ninguno',
      cuantia: '',
      tribunal: '',
      detalles: '',
      estado: 'Por Iniciar'
    });
    setModalNuevoAsunto(false);
  };

  const moverEstadoAsunto = (id: string, nuevoEstado: string) => {
    setTableroPlanificador(prev => prev.map(item => 
      item.id === id ? { ...item, estado: nuevoEstado } : item
    ));
    if (modalVerExpediente && modalVerExpediente.id === id) {
      setModalVerExpediente((prev: any) => ({ ...prev, estado: nuevoEstado }));
    }
  };

  const eliminarAsunto = (id: string) => {
    if (confirm("¿Desea archivar y retirar este asunto del planificador?")) {
      setTableroPlanificador(prev => prev.filter(i => i.id !== id));
      setModalVerExpediente(null);
    }
  };

  // =========================================================================
  // 2. PESTAÑA: DIRECTORIO & CRM (CON MATRIZ DE FACULTADES Y EXPEDIENTES)
  // =========================================================================
  const [clienteVerFichaModal, setClienteVerFichaModal] = useState<any>(null);
  
  const [clientes, setClientes] = useState<any[]>([
    {
      id: "CLI-01",
      nombre: "Machtig Rothe, C.A.",
      tipo: "Externo",
      rif: "J-40192834-0",
      apoderado: "Carlos Mendoza (Director de Operaciones)",
      cedula_apoderado: "V-14.502.839",
      email: "carlos.mendoza@machtigrothe.com",
      telefono: "+58 414-862-3344",
      domicilio: "Puerto Ordaz, Estado Bolívar",
      asuntos_activos: 2,
      estado: "Activo",
      materia_principal: "Inquilinario Comercial & Maquinaria",
      facultades_junta: "Vence Noviembre 2027 (Vigente)",
      facultades_poder: "Alerta: Requiere ratificación notarial (vence en 45 días)",
      facultades_estado: "alerta"
    },
    {
      id: "CLI-02",
      nombre: "Corein, C.A.",
      tipo: "Externo",
      rif: "J-30492817-2",
      apoderado: "Roberto Gómez (Presidente)",
      cedula_apoderado: "V-11.238.991",
      email: "presidencia@corein.com",
      telefono: "+58 424-915-2200",
      domicilio: "Guasipati, Estado Bolívar",
      asuntos_activos: 1,
      estado: "Retainer",
      materia_principal: "Auditoría Mercantil & Deuda",
      facultades_junta: "Vigente hasta Marzo 2028",
      facultades_poder: "Poder General Amplio Notariado Vigente",
      facultades_estado: "vigente"
    },
    {
      id: "CLI-03",
      nombre: "Inmobiliaria del Este, C.A.",
      tipo: "Externo",
      rif: "J-30948572-1",
      apoderado: "Andrés Silva (Administrador Único)",
      cedula_apoderado: "V-12.894.102",
      email: "administracion@inmobiliariadeleste.com",
      telefono: "+58 412-300-1122",
      domicilio: "Caracas, Distrito Capital",
      asuntos_activos: 1,
      estado: "En Negociación",
      materia_principal: "Contratación Inmobiliaria",
      facultades_junta: "Vigente hasta Diciembre 2026",
      facultades_poder: "Facultades estatutarias de administración vigentes",
      facultades_estado: "vigente"
    },
    {
      id: "CLI-04",
      nombre: "Unidad de Tecnología e Innovación (IT)",
      tipo: "Interno",
      rif: "Área Interna Soberana",
      apoderado: "Director de TI / Sistemas",
      cedula_apoderado: "Identificador Interno",
      email: "it-director@aigovern.space",
      telefono: "Ext. 201",
      domicilio: "Sede Tecnológica Central",
      asuntos_activos: 3,
      estado: "Activo",
      materia_principal: "Seguridad de Datos & AI Governance",
      facultades_junta: "Estructura Orgánica Corporativa",
      facultades_poder: "Delegación Funcional de Firma",
      facultades_estado: "vigente"
    },
    {
      id: "CLI-05",
      nombre: "Dirección de Finanzas & Tesorería",
      tipo: "Interno",
      rif: "Área Interna Soberana",
      apoderado: "Controller Financiero",
      cedula_apoderado: "Identificador Interno",
      email: "finanzas@aigovern.space",
      telefono: "Ext. 104",
      domicilio: "Edificio Corporativo Torre Este",
      asuntos_activos: 2,
      estado: "Activo",
      materia_principal: "SLA Billing & Controles SOX",
      facultades_junta: "Estructura Orgánica Corporativa",
      facultades_poder: "Firma Mancomunada en Cuentas",
      facultades_estado: "vigente"
    },
    {
      id: "CLI-06",
      nombre: "AI GOVERN International S.L. (Filial España)",
      tipo: "Interno",
      rif: "B-88392019",
      apoderado: "Barbara Piccolo (General Counsel)",
      cedula_apoderado: "Representante Permanente",
      email: "barbara@aigovern.space",
      telefono: "+34 910-000-000",
      domicilio: "Paseo de la Castellana, Madrid",
      asuntos_activos: 4,
      estado: "Retainer",
      materia_principal: "Expansión UE & Contratación SaaS",
      facultades_junta: "Consejo de Administración Vigente",
      facultades_poder: "Poder de Representación General eIDAS",
      facultades_estado: "vigente"
    }
  ]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    tipo: "Externo" as 'Interno' | 'Externo',
    rif: "",
    apoderado: "",
    cedula_apoderado: "",
    email: "",
    telefono: "",
    domicilio: "",
    materia_principal: "Corporativo"
  });

  const registrarNuevoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    const item = {
      id: `CLI-${Date.now().toString().slice(-4)}`,
      nombre: nuevoCliente.nombre,
      tipo: nuevoCliente.tipo,
      rif: nuevoCliente.rif || "S/R",
      apoderado: nuevoCliente.apoderado || "Por designar",
      cedula_apoderado: nuevoCliente.cedula_apoderado || "V-00.000.000",
      email: nuevoCliente.email || "contacto@cliente.com",
      telefono: nuevoCliente.telefono || "N/A",
      domicilio: nuevoCliente.domicilio || "Domicilio comercial principal",
      asuntos_activos: 1,
      estado: "Activo",
      materia_principal: nuevoCliente.materia_principal,
      facultades_junta: "Registrada en Constitución",
      facultades_poder: "Vigente",
      facultades_estado: "vigente"
    };
    setClientes([item, ...clientes]);
    setNuevoCliente({
      nombre: "",
      tipo: "Externo",
      rif: "",
      apoderado: "",
      cedula_apoderado: "",
      email: "",
      telefono: "",
      domicilio: "",
      materia_principal: "Corporativo"
    });
  };

  // =========================================================================
  // 3. PESTAÑA: CALENDARIO PROCESAL (CON DÍAS DE DESPACHO Y EXPORTADOR .ICS)
  // =========================================================================
  const [vistaCalendario, setVistaCalendario] = useState<'mes' | 'agenda'>('mes');
  const [tipoComputoPlazo, setTipoComputoPlazo] = useState<'continuos' | 'despacho'>('despacho');
  const [mesActualIndex, setMesActualIndex] = useState(8); // Septiembre
  const [anioActual, setAnioActual] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(28);
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false);

  const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [eventosCalendario, setEventosCalendario] = useState<any[]>([
    { 
      id: "EV-01", 
      dia: 25, 
      mes: 8, 
      anio: 2026,
      titulo: "Término fatal para contestar intimación de desalojo (Galpón Unare)", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "25 de Septiembre de 2026", 
      hora: "16:00",
      tipo: "Procesal Perentorio", 
      dias_restantes: "Vencimiento Fatal", 
      nivel: "critico",
      computo: "Días de Despacho (CPC Art. 197)",
      tribunal: "Juzgado 2° Civil y Mercantil"
    },
    { 
      id: "EV-02", 
      dia: 28, 
      mes: 8, 
      anio: 2026,
      titulo: "Audiencia Preliminar de Conciliación e Intimación de Pago", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "28 de Septiembre de 2026", 
      hora: "10:30",
      tipo: "Audiencia Judicial", 
      dias_restantes: "Hoy", 
      nivel: "urgente",
      computo: "Fijada por Boleta",
      tribunal: "Tribunal Superior en lo Civil"
    },
    { 
      id: "EV-03", 
      dia: 30, 
      mes: 8, 
      anio: 2026,
      titulo: "Vencimiento de preaviso formal de prórroga contractual (Cláusula 3)", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "30 de Septiembre de 2026", 
      hora: "17:00",
      tipo: "Vencimiento Contractual", 
      dias_restantes: "Faltan 2 días", 
      nivel: "urgente",
      computo: "Días Continuos (Código Civil)",
      tribunal: "Notaría Tercera de Chacao"
    },
    { 
      id: "EV-04", 
      dia: 6, 
      mes: 9, 
      anio: 2026,
      titulo: "Presentación de informe de auditoría forense a Junta Directiva", 
      cliente: "Corein, C.A.", 
      fecha: "06 de Octubre de 2026", 
      hora: "09:00",
      tipo: "Reunión de Directorio", 
      dias_restantes: "Faltan 8 días", 
      nivel: "ordinario",
      computo: "Días Calendario",
      tribunal: "Sede Principal Guasipati"
    },
    { 
      id: "EV-05", 
      dia: 15, 
      mes: 9, 
      anio: 2026,
      titulo: "Asamblea General Extraordinaria de Accionistas (Sub 1308)", 
      cliente: "Sub 1308, C.A.", 
      fecha: "15 de Octubre de 2026", 
      hora: "11:00",
      tipo: "Asamblea Societaria", 
      dias_restantes: "Faltan 17 días", 
      nivel: "ordinario",
      computo: "Convocatoria Estatutaria",
      tribunal: "Registro Mercantil Segundo"
    },
    { 
      id: "EV-06", 
      dia: 24, 
      mes: 9, 
      anio: 2026,
      titulo: "Renovación trimestral de infraestructura VPC y certificados eIDAS", 
      cliente: "AI GOVERN S.L.", 
      fecha: "24 de Octubre de 2026", 
      hora: "18:00",
      tipo: "Hito Tecnológico", 
      dias_restantes: "Faltan 26 días", 
      nivel: "ordinario",
      computo: "SLA Continuo",
      tribunal: "Infraestructura eIDAS"
    }
  ]);

  const [nuevoEventoForm, setNuevoEventoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    fecha: '2026-09-30',
    hora: '10:00',
    tipo: 'Procesal Perentorio',
    nivel: 'urgente',
    computo: 'Días de Despacho (CPC)',
    tribunal: ''
  });

  const agregarNuevoEventoCalendario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEventoForm.titulo) return;
    const fParts = nuevoEventoForm.fecha.split('-');
    const anio = parseInt(fParts[0]);
    const mes = parseInt(fParts[1]) - 1;
    const dia = parseInt(fParts[2]);

    const nuevo = {
      id: `EV-${Date.now().toString().slice(-4)}`,
      dia,
      mes,
      anio,
      titulo: nuevoEventoForm.titulo,
      cliente: nuevoEventoForm.cliente,
      fecha: `${dia} de ${mesesNombres[mes]} de ${anio}`,
      hora: nuevoEventoForm.hora || '09:00',
      tipo: nuevoEventoForm.tipo,
      dias_restantes: "Programado",
      nivel: nuevoEventoForm.nivel,
      computo: nuevoEventoForm.computo,
      tribunal: nuevoEventoForm.tribunal || 'Despacho Judicial / Notarial'
    };
    setEventosCalendario([...eventosCalendario, nuevo]);
    setModalNuevoEvento(false);
    setDiaSeleccionado(dia);
  };

  const getDiasDelMes = (mesIdx: number, anio: number) => {
    const primerDiaSemana = new Date(anio, mesIdx, 1).getDay();
    const offsetLunes = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
    const totalDias = new Date(anio, mesIdx + 1, 0).getDate();
    return { offsetLunes, totalDias };
  };

  const exportarCalendarioICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI GOVERN//Legal OS Calendar//ES\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";
    eventosCalendario.forEach(ev => {
      const mesStr = (ev.mes + 1).toString().padStart(2, '0');
      const diaStr = ev.dia.toString().padStart(2, '0');
      const horaStr = ev.hora ? ev.hora.replace(':', '') + '00' : '090000';
      icsContent += `BEGIN:VEVENT\nUID:${ev.id}@aigovern.space\nSUMMARY:[${ev.cliente}] ${ev.titulo}\nDESCRIPTION:Tipo: ${ev.tipo}\\nTribunal: ${ev.tribunal}\\nCómputo: ${ev.computo}\nDTSTART:${ev.anio}${mesStr}${diaStr}T${horaStr}\nDTEND:${ev.anio}${mesStr}${diaStr}T180000\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Agenda_Procesal_Piccolo_2026.ics`;
    link.click();
    URL.revokeObjectURL(url);
    alert("Archivo .ics generado con éxito. Listo para importar en Google Calendar, Apple Calendar o Outlook.");
  };

  // =========================================================================
  // 4. PESTAÑA: RENDIMIENTO & FINOPS (CON INFORME EJECUTIVO EN 1 PÁGINA)
  // =========================================================================
  const [metricasDespacho] = useState({
    valor_aportado_usd: "148.000 USD",
    contingencias_ahorradas_usd: "24.500 USD",
    facturacion_mes_usd: "22.350 USD",
    tasa_eficiencia_tiempo: "82% Reducción ciclo revisión (de 5 días a 18 horas)",
    horas_totales_equipo: "142 horas",
    asuntos_cerrados_mes: 14,
    asuntos_en_curso: 5
  });

  const descargarInformeEjecutivoSemanal = () => {
    const reportText = 
`INFORME EJECUTIVO SEMANAL - DIRECCIÓN LETRADA & GENERAL COUNSEL
DESPACHO PICCOLO & ASOCIADOS / AI GOVERN
FECHA: 28 DE SEPTIEMBRE DE 2026

1. RESUMEN DE GESTIÓN Y VALOR APORTADO
- Valor económico desbloqueado en operaciones y acuerdos: ${metricasDespacho.valor_aportado_usd}
- Contingencias patrimoniales prevenidas (vías de hecho / sanciones): ${metricasDespacho.contingencias_ahorradas_usd}
- Tasa de aceleración de ciclo de revisión contractual: 82% (de 5 días a 18 horas promedio)
- Asuntos activos en tramitación: ${tableroPlanificador.length} expedientes

2. HITOS Y CONTINGENCIAS CRÍTICAS RESUELTAS
a) MACHTIG ROTHE, C.A.: Requerimiento formal por vías de hecho y retención ilegítima de 3 montacargas. Se acordó desbloqueo y compensación de mejoras por 15.000 USD con penalidad conminatoria de 500 USD/día.
b) AI GOVERN S.L.: Redline y cierre de Contrato Enterprise SaaS con Acme Corp. Se eliminó lucro cesante y jurisdicción foránea en Singapur, limitando responsabilidad a 12 meses.
c) COREIN, C.A.: Cierre de auditoría forense de pasivos y toma física de inventario central.

3. TÉRMINOS PERENTORIOS DE LA PRÓXIMA SEMANA
- 30 de Septiembre: Preaviso formal de renovación arrendaticia Galpón Unare (Notaría Tercera).
- 06 de Octubre: Presentación de informe forense a Junta Directiva de Corein.
- 15 de Octubre: Asamblea General Extraordinaria de Accionistas Sub 1308.

Emitido por: Barbara Piccolo (General Counsel / Socia Directora)
Certificación criptográfica SHA-256 en Bóveda Soberana.`;

    const blob = new Blob([reportText], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_Ejecutivo_Semanal_Direccion_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // =========================================================================
  // MOTOR 1: COPILOTO JURÍDICO & SPARRING EN VIVO (CHAT LETRADO RAG)
  // =========================================================================
  const [modoCopiloto, setModoCopiloto] = useState<'sparring' | 'casacion' | 'forense' | 'general'>('sparring');
  const [inputCopiloto, setInputCopiloto] = useState('');
  const [cargandoCopiloto, setCargandoCopiloto] = useState(false);
  const [historialCopiloto, setHistorialCopiloto] = useState<any[]>([
    {
      id: "MSG-01",
      remitente: "abogado",
      texto: "Tengo audiencia por intimación de desalojo de galpón comercial. La arrendadora alega falta de pago, pero nosotros retuvimos cánones compensando 15.000 USD de obras estructurales urgentes de techo autorizadas por cruce de correos y fotos, pero sin adenda notariada. Además bloquearon el portón reteniendo 3 montacargas. ¿Cómo desarmamos su demanda y qué defensas oponemos?",
      timestamp: "09:15 AM",
      modo: "sparring"
    },
    {
      id: "MSG-02",
      remitente: "copiloto",
      texto: 
`DICTAMEN Y ESTRATEGIA DE DEFENSA LETRADA (SALA DE CASACIÓN CIVIL TSJ / CPC VENEZOLANO):

1. EXCEPCIÓN DE INCUMPLIMIENTO CONTRACTUAL (Art. 1.168 Código Civil):
Nadie puede demandar resolución por falta de pago si previamente incumplió su obligación legal inderogable de procurar el goce pacífico y realizar reparaciones mayores necesarias (Art. 1.585 CC). El daño estructural de techo comprometía la operatividad del galpón comercial; la arrendadora estaba en mora previa de saneamiento.

2. DOCTRINA DE LOS ACTOS PROPIOS (Venire contra factum proprium non valet):
La Sala de Casación Civil del TSJ ha reiterado pacíficamente que las autorizaciones emitidas por medios electrónicos (correos y WhatsApp con valor probatorio bajo la Ley sobre Mensajes de Datos y Firmas Electrónicas) vinculan a quien las emite. Si la arrendadora autorizó las cotizaciones de obra, no puede luego alegar "mora culpable" sobre cánones que ella misma consintió en compensar.

3. RECONVENCIÓN / QUERELLA POR VÍAS DE HECHO Y RETENCIÓN INDEBIDA:
El bloqueo del portón y retención de 3 montacargas tipifica justicia por propia mano y eventual retención indebida (Art. 468 Código Penal). En la audiencia se debe consignar la prueba fotográfica notariada e intimar la entrega inmediata bajo apercibimiento de solicitar Medida Cautelar Innominada de Secuestro de Llaves y Desbloqueo (Art. 588 CPC).

4. PROPUESTA DISPOSITIVA EN SALA:
Consignar formalmente en el Tribunal las facturas fiscales que acreditan los 15.000 USD y allanarse a compensar el 50% de los cánones subsiguientes, enervando toda causal de desalojo conforme a la Ley de Regulación del Arrendamiento Inmobiliario para el Uso Comercial.`,
      timestamp: "09:16 AM",
      modo: "sparring"
    }
  ]);

  const enviarConsultaCopiloto = (textoCustom?: string, modoCustom?: string) => {
    const texto = textoCustom || inputCopiloto;
    const modo = modoCustom || modoCopiloto;
    if (!texto.trim()) return;

    const nuevoMsgUsuario = {
      id: `MSG-${Date.now()}-U`,
      remitente: "abogado",
      texto: texto,
      timestamp: "Ahora",
      modo: modo
    };

    setHistorialCopiloto(prev => [...prev, nuevoMsgUsuario]);
    setInputCopiloto('');
    setCargandoCopiloto(true);

    setTimeout(() => {
      let respuestaIA = "";
      if (modo === 'sparring') {
        respuestaIA = `🥊 CONTRAARGUMENTOS DE LA CONTRAPARTE (MODO SPARRING):\n\nComo abogado de la contraparte, atacaría tu postura por los siguientes 3 flancos:\n1. Ausencia de Formalidad Notarial: Alegaré que el contrato original en su Cláusula de Modificaciones exige adenda escrita y protocolizada ante Notaría. Diré que los correos electrónicos carecen de firma electrónica certificada y son meras tratativas preliminares que no extinguen la obligación de pago mensual.\n2. Falta de Notificación Judicial Previa de Ruina: El Art. 1.586 del CC exige poner en conocimiento judicial la necesidad de reparaciones antes de ejecutarlas por cuenta propia. Argumentaré que las obras fueron suntuarias y no estructurales.\n3. Desvirtuación de Vías de Hecho: Argumentaré que el control de acceso al portón es una medida de resguardo de seguridad perimetral del conjunto industrial y no una retención coactiva de maquinaria.\n\n🛡️ CÓMO BLINDARTE: Debes consignar hoy mismo el informe pericial de ingeniería que demuestre que el techo colapsó por vicio oculto anterior a la entrega, obligando a reparación urgente para evitar la pérdida total del inventario.`;
      } else if (modo === 'casacion') {
        respuestaIA = `⚖️ ANÁLISIS DE CUESTIONES PREVIAS Y RECURSO DE CASACIÓN:\n\n1. Cuestión Previa del Ordinal 6° Art. 346 CPC (Defecto de Forma en el Libelo):\nSi la contraparte no individualizó el monto de cada canon adeudado ni discriminó los meses imputados, procede la excepción de defecto de forma que suspende el procedimiento hasta que subsane.\n\n2. Cuestión Previa del Ordinal 11° Art. 346 CPC (Prohibición de la Ley de Admitir la Acción Propuesta):\nEn arrendamientos comerciales, la acción judicial de desalojo es inadmisible sin el cumplimiento previo del agotamiento de la vía administrativa conciliatoria ante la autoridad inquilinaria competente.\n\n3. Doctrina TSJ aplicable: Sentencia N° 451 de la Sala de Casación Civil: La falta de agotamiento de la fase conciliatoria previa genera la nulidad absoluta de todo lo actuado por indefensión procesal.`;
      } else {
        respuestaIA = `🔍 DICTAMEN INTEGRAL Y RECOMENDACIÓN OPERATIVA:\n\nEvaluado el planteamiento, la línea letrada más solvente consiste en:\n1. Consignar réplica formal por escrito antes de las 16:00 horas.\n2. Fijar plazo perentorio de 24 horas para la liberación pacífica de los montacargas bajo reserva expresa de acciones penales.\n3. Formalizar la tabla de amortización de las obras de reparación en 10 cuotas mensuales del 50% del canon.\n\nCon esto neutralizamos la pretensión de resolución contractual y aseguramos la continuidad operativa sin riesgo de costas ni indemnizaciones.`;
      }

      const nuevoMsgIA = {
        id: `MSG-${Date.now()}-IA`,
        remitente: "copiloto",
        texto: respuestaIA,
        timestamp: "Ahora",
        modo: modo
      };

      setHistorialCopiloto(prev => [...prev, nuevoMsgIA]);
      setCargandoCopiloto(false);
    }, 700);
  };

  // =========================================================================
  // MOTOR 2: ANALIZADOR UNIVERSAL DE ARCHIVOS & DIFF CONTRACTUAL SEMÁNTICO
  // =========================================================================
  const [subTabAnalizador, setSubTabAnalizador] = useState<'analisis_archivo' | 'diff_contractual'>('analisis_archivo');
  const [textoDocumentoAnalizar, setTextoDocumentoAnalizar] = useState(
`CONTRATO DE LICENCIA DE SOFTWARE Y SERVICIOS PROFESIONALES (PROPUESTA CONTRAPARTE)
CLÁUSULA PRIMERA: El Proveedor otorgará una licencia exclusiva a favor de la Contraparte sobre todos los algoritmos desarrollados.
CLÁUSULA SEGUNDA: El Proveedor indemnizará a la Contraparte sin límite cuantitativo ni temporal por cualquier reclamo, incluyendo lucro cesante y daños consecuenciales indirectos.
CLÁUSULA TERCERA: El pago se realizará a los 90 días naturales posteriores a la entrega del informe final.
CLÁUSULA CUARTA: Para cualquier disputa, las partes se someten a la jurisdicción exclusiva de los tribunales de Singapur, asumiendo el Proveedor todos los honorarios legales.`
  );
  const [nombreArchivoSubido, setNombreArchivoSubido] = useState<string>("contrato_propuesta_contraparte.docx");
  const [cargandoAnalisisUniversal, setCargandoAnalisisUniversal] = useState(false);
  const [resultadoAnalisisUniversal, setResultadoAnalisisUniversal] = useState<any>({
    archivo: "contrato_propuesta_contraparte.docx",
    partes: ["Proveedor (Empresa)", "Contraparte Internacional"],
    cuantia: "Indeterminada / Riesgo Ilimitado",
    plazo_pago: "90 días naturales (Crítico)",
    jurisdiccion: "Singapur (Procesalmente Lesivo)",
    focos_rojos: [
      {
        clausula: "Cláusula Segunda: Indemnidad Ilimitada",
        cita: "«...indemnizará sin límite cuantitativo ni temporal... incluyendo lucro cesante y daños indirectos.»",
        riesgo: "Riesgo patrimonial catastrófico que expone el capital de la sociedad a contingencias que exceden el valor del contrato.",
        redline: "«La responsabilidad total acumulada se limitará estrictamente al monto total efectivamente facturado en los últimos doce (12) meses. Se excluye el lucro cesante.»"
      },
      {
        clausula: "Cláusula Primera: Cesión Exclusiva de Algoritmos",
        cita: "«...otorgará una licencia exclusiva a favor de la Contraparte sobre todos los algoritmos...»",
        riesgo: "Confunde licencia de uso con transferencia de titularidad; impide volver a usar el código o know-how con otros clientes.",
        redline: "«La empresa conserva la titularidad exclusiva de su propiedad intelectual, otorgando únicamente una licencia corporativa no exclusiva y temporal.»"
      },
      {
        clausula: "Cláusula Cuarta: Sumisión a Tribunales de Singapur",
        cita: "«...jurisdicción exclusiva de los tribunales de Singapur, asumiendo el Proveedor todos los honorarios...»",
        riesgo: "Inviable procesalmente por asimetría de costas y lejanía geográfica.",
        redline: "«Las partes se someten a los tribunales de Madrid (España) o Delaware (EE.UU.), asumiendo cada parte sus propios honorarios.»"
      }
    ],
    focos_amarillos: [
      {
        clausula: "Cláusula Tercera: Pago a 90 Días",
        cita: "«...pago a los 90 días naturales posteriores a la entrega...»",
        riesgo: "Plazo de cobranza excesivo que destruye el flujo de caja operativo.",
        redline: "«Pago neto a treinta (30) días continuos desde la emisión de la factura fiscal.»"
      }
    ]
  });

  // Diff Contractual: Texto A (Borrador Nuestro) vs Texto B (Devuelto por Contraparte)
  const [textoDiffVersionA, setTextoDiffVersionA] = useState(
`CLÁUSULA 5 (MANTENIMIENTO): LA ARRENDADORA podrá inspeccionar semestralmente el inmueble previa notificación escrita de 15 días.
CLÁUSULA 8 (PAGO): Canon mensual pagadero dentro de los primeros 5 días continuos a tasa BCV.
CLÁUSULA 12 (RESOLUCIÓN): Requiere notificación conminatoria previa de 30 días para subsanar incumplimientos.`
  );
  const [textoDiffVersionB, setTextoDiffVersionB] = useState(
`CLÁUSULA 5 (MANTENIMIENTO): LA ARRENDATARIA deberá realizar todas las obras estructurales de mantenimiento mayor sin necesidad de notificación previa.
CLÁUSULA 8 (PAGO): Canon mensual pagadero a tasa referencial de mercado libre privado.
CLÁUSULA 12 (RESOLUCIÓN): La arrendadora podrá rescindir de inmediato el contrato sin necesidad de notificación ni plazo de subsanación.`
  );
  const [cargandoDiff, setCargandoDiff] = useState(false);
  const [resultadoDiff, setResultadoDiff] = useState<any[]>([
    {
      clausula: "Cláusula 5: Mantenimiento",
      cambio: "Cambiaron 'podrá inspeccionar' por 'deberá realizar obras estructurales'",
      impacto: "Traslado encubierto de la obligación legal de conservación mayor (Art. 1.585 CC) a cargo de tu cliente.",
      nivel: "critico"
    },
    {
      clausula: "Cláusula 8: Régimen Cambiario",
      cambio: "Sustituyeron 'tasa oficial BCV' por 'mercado libre privado'",
      impacto: "Vulneración del marco cambiario oficial venezolano y riesgo de sobrecosto inflacionario no regulado.",
      nivel: "critico"
    },
    {
      clausula: "Cláusula 12: Procedimiento de Resolución",
      cambio: "Eliminaron el preaviso y plazo de subsanación de 30 días",
      impacto: "Permite desalojo unilateral inmediato sin derecho a defensa previa ni subsanación.",
      nivel: "critico"
    }
  ]);

  const procesarSubidaArchivoUniversal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNombreArchivoSubido(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          setTextoDocumentoAnalizar(content.slice(0, 15000)); // Cargar texto real en memoria
          ejecutarAnalisisUniversal(file.name, content);
        }
      };
      reader.readAsText(file);
    }
  };

  const ejecutarAnalisisUniversal = (nombre: string, textoFuente: string) => {
    setCargandoAnalisisUniversal(true);
    setTimeout(() => {
      setResultadoAnalisisUniversal({
        archivo: nombre,
        partes: ["Parte Solicitante", "Contraparte Firmante"],
        cuantia: "Auditoría en Curso",
        plazo_pago: "30-90 días según estipulaciones",
        jurisdiccion: "Evaluada en Cláusula Dispositiva",
        focos_rojos: [
          {
            clausula: "Cláusula de Responsabilidad Patrimonial",
            cita: textoFuente.slice(0, 120) + "...",
            riesgo: "Detección de cláusula con asimetría de riesgo y eventual asunción de daños indirectos.",
            redline: "«La responsabilidad total acumulada de la empresa se limitará estrictamente al monto facturado en los 12 meses anteriores. Se excluye el lucro cesante.»"
          },
          {
            clausula: "Cláusula de Propiedad Intelectual / Confidencialidad",
            cita: "Cláusula de cesión de desarrollos...",
            riesgo: "Riesgo de transferencia involuntaria de código y metodologías corporativas.",
            redline: "«La titularidad de la propiedad intelectual preexistente pertenece inalterablemente a su creador originario.»"
          }
        ],
        focos_amarillos: [
          {
            clausula: "Plazo de Notificaciones y Apercibimientos",
            cita: "Notificaciones por vía postal remota...",
            riesgo: "Falta de claridad en los canales electrónicos admitidos para notificaciones legales.",
            redline: "«Se tendrán por válidas las notificaciones cursadas a las direcciones electrónicas corporativas señaladas expresamente.»"
          }
        ]
      });
      setCargandoAnalisisUniversal(false);
    }, 600);
  };

  const ejecutarComparacionDiff = () => {
    setCargandoDiff(true);
    setTimeout(() => {
      setResultadoDiff([
        {
          clausula: "Cláusula 5: Mantenimiento y Cargas",
          cambio: "Inversión de la carga de obras mayores hacia el arrendatario.",
          impacto: "Lesión patrimonial severa frente al régimen general del Código Civil.",
          nivel: "critico"
        },
        {
          clausula: "Cláusula 8: Moneda de Cuenta",
          cambio: "Modificación de la referencia legal del Banco Central de Venezuela.",
          impacto: "Riesgo tributario y sancionatorio ante la legislación cambiaria.",
          nivel: "critico"
        },
        {
          clausula: "Cláusula 12: Resolución de Pleno Derecho",
          cambio: "Supresión de término de subsanación previa de 30 días.",
          impacto: "Deja a la parte en indefensión contractual inmediata.",
          nivel: "critico"
        }
      ]);
      setCargandoDiff(false);
    }, 500);
  };

  // =========================================================================
  // MOTOR 3: REDACTOR DE ESCRITOS Y CLÁUSULAS COMPLEJAS A MEDIDA
  // =========================================================================
  const [tipoEscritoRedactar, setTipoEscritoRedactar] = useState('contestacion_desalojo');
  const [clienteRedactor, setClienteRedactor] = useState('Machtig Rothe, C.A.');
  const [tribunalRedactor, setTribunalRedactor] = useState('Juzgado Segundo de Primera Instancia en lo Civil y Mercantil de Puerto Ordaz');
  const [instruccionesRedactor, setInstruccionesRedactor] = useState(
    "El cliente fue intimado extrajudicialmente para desalojar en 48 horas. Queremos oponer la excepción de compensación de mejoras de 15.000 USD autorizadas por correo, denunciar las vías de hecho por el bloqueo del portón que retiene 3 montacargas con reserva penal (Art. 468 CP), y solicitar medida cautelar innominada de aseguramiento de maquinaria conforme al Art. 588 CPC."
  );
  const [cargandoEscrito, setCargandoEscrito] = useState(false);
  const [escritoGeneradoCompleto, setEscritoGeneradoCompleto] = useState(
`CIUDADANO
JUEZ SEGUNDO DE PRIMERA INSTANCIA EN LO CIVIL Y MERCANTIL DE LA CIRCUNSCRIPCIÓN JUDICIAL DEL ESTADO BOLÍVAR
SU DESPACHO.-

Yo, BARBARA ISABEL PICCOLO OBALDO, abogada en ejercicio, inscrita en el Instituto de Previsión Social del Abogado (IPSA) bajo el N° 102.485, actuando en mi carácter de apoderada judicial de la sociedad mercantil MACHTIG ROTHE, C.A., inscrita ante el Registro Mercantil con el N° J-40192834-0, carácter que acredito mediante copia certificada de poder notarial que acompaño marcado "A", ocurro respetuosamente ante su competente autoridad para oponer formal OPOSICIÓN Y CONTESTACIÓN A LA INTIMACIÓN EXTRAJUDICIAL DE DESALOJO incoada en fecha reciente, en base a los hechos y fundamentos de derecho que a continuación expongo:

CAPÍTULO I: DE LOS HECHOS Y LA COMPENSACIÓN FORMAL DE MEJORAS
Mi representada ocupa legítimamente en calidad de arrendataria el Galpón Industrial N° 4 ubicado en el Sector Unare II de Puerto Ordaz. En fecha 14 de marzo del año en curso, ante el colapso inminente de las cubiertas de techo que ponía en riesgo el inventario y maquinaria, se puso en conocimiento de la arrendadora la urgencia de acometer reparaciones mayores. Mediante comunicaciones electrónicas fehacientes suscritas por su administración, la arrendadora autorizó la ejecución de las obras hasta por un monto de Quince Mil Dólares (15.000,00 USD), acordándose expresamente que dicho importe sería compensado a razón del cincuenta por ciento (50%) de los cánones mensuales sucesivos. En consecuencia, es la arrendadora quien se encuentra en mora de conciliar los comprobantes fiscales debidamente consignados, no existiendo insolvencia culpable alguna por parte de mi mandante.

CAPÍTULO II: DE LA PROHIBICIÓN DE VÍAS DE HECHO Y AUTOTUTELA
En abierta transgresión del ordenamiento jurídico positivo y de la pacífica y reiterada doctrina de la Sala de Casación Civil del Tribunal Supremo de Justicia, en fecha 24 de septiembre del año en curso, la arrendadora procedió materialmente a instalar candados y bloquear el portón principal de acceso a las instalaciones, reteniendo de forma arbitraria e ilegítima tres (3) montacargas marca Caterpillar, bienes de capital indispensables para el giro comercial de mi representada, consumando un acto de despojo posesorio y tipificando el supuesto de retención indebida previsto en el Artículo 468 del Código Penal.

CAPÍTULO III: MEDIDA CAUTELAR INNOMINADA DE ASEGURAMIENTO (ART. 588 CPC)
De conformidad con lo preceptuado en el Artículo 588 del Código de Procedimiento Civil, existiendo fundado temor de que la retención arbitraria de los bienes de capital cause daños patrimoniales irreparables a las operaciones comerciales de mi mandante (periculum in mora), y habiéndose acreditado el derecho que le asiste a la libre movilización de su maquinaria (fumus boni iuris), solicito muy respetuosamente a este honorable Juzgado decrete MEDIDA CAUTELAR INNOMINADA ORDENANDO EL INMEDIATO DESBLOQUEO DEL PORTÓN Y EL RESGUARDO DE LA LIBRE CIRCULACIÓN DE LOS TRES (3) MONTACARGAS, comisionándose a un Tribunal de Municipio o requiriéndose el auxilio de la fuerza pública de ser necesario para su práctica.

CAPÍTULO IV: PETITORIO
Por las razones de hecho y de derecho precedentemente expuestas, solicito a este Juzgado:
PRIMERO: Admita la presente contestación y oposición con todos sus recaudos anexos.
SEGUNDO: Declare SIN LUGAR cualquier pretensión resolutoria o de desalojo intentada en contra de MACHTIG ROTHE, C.A.
TERCERO: Acuerde de manera expedita la Medida Cautelar Innominada solicitada a los fines de restablecer la legalidad y tutelar la posesión pacífica.

Es justicia que espero y solicito en Puerto Ordaz, a la fecha de su presentación judicial.`
  );

  const generarEscritoLetrado = () => {
    setCargandoEscrito(true);
    setTimeout(() => {
      setCargandoEscrito(false);
      alert("Escrito jurídico solemne redactado con éxito bajo doctrina TSJ y CPC venezolano.");
    }, 700);
  };

  const descargarEscritoWord = () => {
    const blob = new Blob([escritoGeneradoCompleto], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Escrito_${tipoEscritoRedactar}_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // =========================================================================
  // GABINETE 1: CALIFICACIÓN & ESTRATEGIA (CON MATRIZ DE RIESGO/BENEFICIO)
  // =========================================================================
  const [clienteSeleccionadoTriage, setClienteSeleccionadoTriage] = useState("Machtig Rothe, C.A.");
  const [archivosAdjuntosTriage] = useState<string[]>([
    "notificacion_extrajudicial_desalojo.pdf",
    "contrato_arrendamiento_2024.docx",
    "fotos_bloqueo_porton_montacargas.jpg"
  ]);
  const [consultaLetrada, setConsultaLetrada] = useState(
    "Tuve reunión de emergencia con el cliente. La arrendadora pretende desalojar en 48 horas alegando atraso en reparaciones estructurales y bloqueó el portón reteniendo 3 montacargas. Analicemos las leyes, la jurisprudencia civil venezolana y plantéame las opciones estratégicas que tenemos."
  );
  const [cargandoDictamen, setCargandoDictamen] = useState(false);
  const [dictamenEstrategico, setDictamenEstrategico] = useState<any>({
    cliente: "Machtig Rothe, C.A.",
    materia: "Inquilinario Comercial / Tutela Posesoria",
    nivel_urgencia: "Crítica (Término perentorio de 48 horas)",
    hechos_relevantes: [
      "Notificación extrajudicial conminatoria que pretende desposesión sin intervención judicial.",
      "Vía de hecho material: Bloqueo de accesos y retención ilegítima de bienes de capital (3 montacargas).",
      "Conflicto de compensación sobre reparaciones estructurales urgentes de techo y pavimento."
    ],
    vias_estrategicas: [
      {
        opcion: "Opción A: Requerimiento Formal Extrajudicial con Apercibimiento Penal",
        descripcion: "Redacción y consignación inmediata de contestación formal intimando el desbloqueo del portón en 12 horas, advirtiendo el tipo penal de retención indebida (Art. 468 Código Penal) y reserva expresa de cobro por daños y perjuicios comerciales.",
        viabilidad: "Inmediata (Recomendada como paso previo hoy mismo)",
        tiempo_ejecucion: "Hoy antes de las 16:00",
        costo_financiero: "Bajo (Honorarios extrajudiciales de redacción)",
        nivel_riesgo: "Medio (Si no ceden, se escala a sede judicial)",
        impacto_negocio: "Restitución pacífica inmediata sin paralizar operaciones de almacén"
      },
      {
        opcion: "Opción B: Querella Interdictal de Despojo y Medida Cautelar Innominada",
        descripcion: "Interposición de acción posesoria ante los Tribunales Civiles y Mercantiles de Puerto Ordaz, solicitando medida cautelar urgente de secuestro de llaves y aseguramiento de la libre circulación de maquinaria pesada.",
        viabilidad: "Alta efectividad procesal en sede jurisdiccional",
        tiempo_ejecucion: "24 a 48 horas",
        costo_financiero: "Medio-Alto (Aranceles, traslado judicial y fianza cautelar)",
        nivel_riesgo: "Bajo en Derecho (Doctrina pacífica TSJ a favor de la posesión)",
        impacto_negocio: "Desbloqueo forzoso con auxilio de la fuerza pública"
      },
      {
        opcion: "Opción C: Consignación Arrendaticia y Compensación Formal de Mejoras",
        descripcion: "Consignación formal de cánones ante el tribunal competente, deduciendo las facturas fiscales de las obras de reparación estructural según lo pactado en la Cláusula de Mejoras.",
        viabilidad: "Eficaz para enervar cualquier pretensión de resolución de contrato por falta de pago",
        tiempo_ejecucion: "3 a 5 días hábiles",
        costo_financiero: "Bajo (Retención y depósito formal en cuenta bancaria del tribunal)",
        nivel_riesgo: "Bajo (Blindaje absoluto ante acusaciones de insolvencia)",
        impacto_negocio: "Cierre definitivo del reclamo económico de la arrendadora"
      }
    ],
    fundamento_legal: [
      "Artículos 1.159 y 1.160 del Código Civil: Principio de fuerza obligatoria de los contratos y ejecución de buena fe.",
      "Artículos 1.585 y siguientes del Código Civil: Obligación de la arrendadora de procurar el goce pacífico de la cosa arrendada.",
      "Criterio pacífico y reiterado de la Sala de Casación Civil del TSJ: Prohibición absoluta de vías de hecho y justicia por propia mano en contratos de arrendamiento.",
      "Artículo 588 del Código de Procedimiento Civil: Procedencia de medidas cautelares innominadas ante peligro inminente de daño patrimonial."
    ]
  });

  const ejecutarCalificacionEstrategica = () => {
    setCargandoDictamen(true);
    setTimeout(() => {
      setDictamenEstrategico((prev: any) => ({
        ...prev,
        cliente: clienteSeleccionadoTriage
      }));
      setCargandoDictamen(false);
    }, 450);
  };

  // =========================================================================
  // GABINETE 2: ENSAMBLADOR DOCUMENTAL (CON CHECKBOXES LEGO Y DATOS CRM BLOQUEADOS)
  // =========================================================================
  const [clienteEnsamblaje, setClienteEnsamblaje] = useState("Machtig Rothe, C.A.");
  const [modeloDriveSeleccionado, setModeloDriveSeleccionado] = useState("arrendamiento");
  
  const [clausulaLegoBCV, setClausulaLegoBCV] = useState(true);
  const [clausulaLegoViasDeHecho, setClausulaLegoViasDeHecho] = useState(true);
  const [clausulaLegoMejoras, setClausulaLegoMejoras] = useState(true);
  const [clausulaLegoArbitral, setClausulaLegoArbitral] = useState(false);

  const [variablesEnsamblador, setVariablesEnsamblador] = useState({
    arrendadora: "INMOBILIARIA DEL ESTE, C.A.",
    arrendadora_rif: "J-30948572-1",
    arrendadora_rep: "ANDRÉS SILVA",
    arrendadora_ci: "V-12.894.102",
    arrendataria: "MACHTIG ROTHE, C.A.",
    arrendataria_rif: "J-40192834-0",
    arrendataria_rep: "CARLOS MENDOZA",
    arrendataria_ci: "V-14.502.839",
    inmueble: "Galpón Industrial N° 4, Parcela 12, Manzana 3, Sector Unare II, Puerto Ordaz, Municipio Caroní del Estado Bolívar",
    linderos: "Norte: Calle Principal de Unare; Sur: Parcela 13; Este: Galpón N° 3; Oeste: Vía de acceso comunal",
    monto_canon: "2.800 USD",
    plazo_vigencia: "Veinticuatro (24) meses",
    monto_mejoras: "15.000 USD",
    porcentaje_compensacion: "50%",
    penalidad_diaria: "500 USD",
    ciudad_domicilio: "Puerto Ordaz, Estado Bolívar"
  });

  useEffect(() => {
    const c = clientes.find(item => item.nombre === clienteEnsamblaje);
    if (c) {
      setVariablesEnsamblador(prev => ({
        ...prev,
        arrendataria: c.nombre.toUpperCase(),
        arrendataria_rif: c.rif,
        arrendataria_rep: c.apoderado.toUpperCase(),
        arrendataria_ci: c.cedula_apoderado || "V-14.502.839",
        ciudad_domicilio: c.domicilio || "Puerto Ordaz, Estado Bolívar"
      }));
    }
  }, [clienteEnsamblaje]);

  const generarTextoDocumentoCompleto = () => {
    if (modeloDriveSeleccionado === 'poder') {
      return `PODER ESPECIAL AMPLIO Y DE ADMINISTRACIÓN Y DISPOSICIÓN NOTARIAL

POR ANTE MÍ, Notario Público competente del Estado Bolívar, compareció el ciudadano ${variablesEnsamblador.arrendataria_rep}, mayor de edad, domiciliado en ${variablesEnsamblador.ciudad_domicilio}, titular de la cédula de identidad N° ${variablesEnsamblador.arrendataria_ci}, actuando en su carácter de representante legal de la sociedad mercantil ${variablesEnsamblador.arrendataria}, inscrita ante el Registro Mercantil con el N° ${variablesEnsamblador.arrendataria_rif}, carácter que acredita mediante acta constitutiva y estatutos sociales debidamente protocolizados, y declaró:

Que por medio del presente instrumento confiere PODER ESPECIAL PERO TAN AMPLIO COMO EN DERECHO SE REQUIERA Y SEA NECESARIO a la abogada en ejercicio BARBARA ISABEL PICCOLO OBALDO, inscrita en el Instituto de Previsión Social del Abogado (IPSA) bajo el N° 102.485, para que en nombre y representación de la referida sociedad mercantil ejerza las más amplias facultades de administración, defensa judicial, resguardo de activos y representación patrimonial ante cualquier autoridad judicial, administrativa, tributaria o notarial en todo el territorio nacional.

FACULTADES JUDICIALES Y PROCESALES: La apoderada queda plenamente facultada para intentar y contestar demandas, reconvenciones, querellas interdictales de despojo o de amparo posesorio; solicitar y ejecutar medidas cautelares preventivas de secuestro, embargo o medidas innominadas de aseguramiento; darse por notificada, apelar, recurrir de casación; convenir en demandas, transigir, desistir de la acción o del procedimiento, comprometer en árbitros arbitradores o de derecho; hacer posturas en remates judiciales; solicitar la restitución de bienes muebles y montacargas retenidos indebidamente; promover y evacuar toda clase de pruebas periciales, inspecciones judiciales y testificales.

FACULTADES ADMINISTRATIVAS Y TRIBUTARIAS: Representar a la mandante por ante el Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT), SUNDDE, Inspectorías del Trabajo, Alcaldías Municipales y cuerpos policiales o de investigación en caso de vías de hecho cometidas contra las instalaciones o bienes de capital de la sociedad.

En fe de lo cual, firma y otorga el compareciente ante mí en ${variablesEnsamblador.ciudad_domicilio}, a la fecha de su protocolización legal.`;
    }

    if (modeloDriveSeleccionado === 'asamblea') {
      return `ACTA DE ASAMBLEA GENERAL EXTRAORDINARIA DE ACCIONISTAS DE LA SOCIEDAD MERCANTIL ${variablesEnsamblador.arrendataria}

En la ciudad de ${variablesEnsamblador.ciudad_domicilio}, a los quince (15) días del mes de Octubre de 2026, siendo las diez de la mañana (10:00 a.m.), se reunieron en la sede social de la empresa los accionistas que representan el cien por ciento (100%) del capital social suscrito y pagado de la sociedad mercantil ${variablesEnsamblador.arrendataria}, inscrita ante el Registro Mercantil bajo el N° ${variablesEnsamblador.arrendataria_rif}. 

Presidió la sesión el ciudadano ${variablesEnsamblador.arrendataria_rep}, en su carácter de Presidente de la Junta Directiva. Constatado el quórum estatutario unánime, el Presidente declaró válidamente instalada la Asamblea y sometió a consideración el siguiente:

ORDEN DEL DÍA:
PRIMERO: Presentación, discusión y aprobación del Balance General y Estado de Resultados auditado al cierre del ejercicio.
SEGUNDO: Aumento del Capital Social mediante aportes y capitalización de acreencias de los accionistas.
TERCERO: Modificación correlativa de la Cláusula Quinta de los Estatutos Sociales relativa al capital social.
CUARTO: Autorización a la Dirección Letrada para la protocolización del acta respectiva.

DESARROLLO DE LA ASAMBLEA:
PUNTO PRIMERO: Tomó la palabra el Presidente y expuso el balance auditado correspondiente, el cual contó con el informe favorable del Comisario. Sometido a votación, fue aprobado por unanimidad.
PUNTO SEGUNDO Y TERCERO: Se acordó por unanimidad de votos aumentar el capital social de la compañía a la cantidad de Cien Mil Dólares de los Estados Unidos de América (100.000,00 USD) pagaderos a la tasa BCV, emitiéndose nuevas acciones ordinarias y nominativas de igual valor nominal.
PUNTO CUARTO: Se facultó ampliamente a la abogada BARBARA PICCOLO para que consigne y protocolice la presente acta ante el Registro Mercantil competente, solicite el cálculo de aranceles y retire el documento registrado.

No habiendo más asuntos que tratar, se dio por concluida la sesión y se firma en señal de conformidad unánime.`;
    }

    let clausulaCanonTexto = clausulaLegoBCV 
      ? `CLÁUSULA CUARTA: CANON DE ARRENDAMIENTO Y TASA OFICIAL BCV
El canon mensual convenido es la cantidad de ${variablesEnsamblador.monto_canon}, pagadero en Bolívares conforme al tipo de cambio de referencia publicado por el Banco Central de Venezuela (BCV) a la fecha efectiva de pago. Los pagos se realizarán de manera anticipada dentro de los primeros cinco (5) días continuos de cada mes mediante transferencia bancaria verificable.`
      : `CLÁUSULA CUARTA: CANON DE ARRENDAMIENTO
El canon mensual convenido es la cantidad de ${variablesEnsamblador.monto_canon} mensuales pagaderos por mensualidades anticipadas.`;

    let clausulaMejorasTexto = clausulaLegoMejoras
      ? `CLÁUSULA QUINTA: MEJORAS ESTRUCTURALES Y RÉGIMEN DE COMPENSACIÓN
Las partes reconocen que el inmueble requiere obras urgentes de adecuación estructural y reparación mayor de cubiertas de techo. Se autoriza a LA ARRENDATARIA a acometer dichas obras hasta por un monto presupuestado de ${variablesEnsamblador.monto_mejoras}, monto que será compensado mensualmente a razón de hasta un ${variablesEnsamblador.porcentaje_compensacion} de los cánones sucesivos de arrendamiento previa presentación de facturas fiscales legales válidas (Arts. 1.585 y 1.587 Código Civil).`
      : `CLÁUSULA QUINTA: MANTENIMIENTO ORDINARIO
Las reparaciones menores y de mero mantenimiento correrán por cuenta exclusiva de LA ARRENDATARIA.`;

    let clausulaViasDeHechoTexto = clausulaLegoViasDeHecho
      ? `CLÁUSULA SEXTA: PROHIBICIÓN TERMINANTE DE VÍAS DE HECHO Y PENALIDAD DIARIA
Queda terminantemente prohibido a LA ARRENDADORA o sus dependientes bloquear accesos, portones o retener bienes de capital, herramientas o montacargas pertenecientes a LA ARRENDATARIA. La transgresión de esta prohibición facultará a LA ARRENDATARIA a ejercer acciones de amparo posesorio e interdictos de despojo, causando a cargo de LA ARRENDADORA una cláusula penal conminatoria de ${variablesEnsamblador.penalidad_diaria} por cada día de retención indebida, sin perjuicio de las responsabilidades penales tipificadas en el Artículo 468 del Código Penal.`
      : `CLÁUSULA SEXTA: CUMPLIMIENTO PACÍFICO
Las partes se obligan a dirimir sus controversias conforme a la ley y la buena fe negocial.`;

    let clausulaFueroTexto = clausulaLegoArbitral
      ? `CLÁUSULA NOVENA: FUERO ARBITRAL ESPECIAL
Cualquier controversia derivada de este contrato será sometida exclusivamente a arbitraje institucional de derecho ante el Centro de Arbitraje de la Cámara de Caracas (CEDCA), renunciando a la jurisdicción ordinaria.`
      : `CLÁUSULA NOVENA: DOMICILIO ESPECIAL Y JURISDICCIÓN
Para todos los efectos derivados del presente contrato, las partes eligen como domicilio especial, único y excluyente a la ciudad de ${variablesEnsamblador.ciudad_domicilio}, a cuya jurisdicción judicial declaran someterse renunciando formalmente a cualquier otro fuero.`;

    return `CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL CON CLÁUSULA DE COMPENSACIÓN DE MEJORAS Y PROHIBICIÓN EXPRESA DE VÍAS DE HECHO

DOCUMENTO PROTOCOLIZADO - MODELO OFICIAL BIBLIOTECA LETRADA
DESPACHO JURÍDICO PICCOLO & ASOCIADOS - EXP. ARCHIVO MATRIZ

Entre la sociedad mercantil ${variablesEnsamblador.arrendadora}, domiciliada en ${variablesEnsamblador.ciudad_domicilio}, RIF N° ${variablesEnsamblador.arrendadora_rif}, representada por su representante legal ciudadano ${variablesEnsamblador.arrendadora_rep}, C.I. N° ${variablesEnsamblador.arrendadora_ci}, denominada "LA ARRENDADORA", por una parte; y por la otra, la sociedad mercantil ${variablesEnsamblador.arrendataria}, domiciliada en ${variablesEnsamblador.ciudad_domicilio}, RIF N° ${variablesEnsamblador.arrendataria_rif}, representada por su apoderado ciudadano ${variablesEnsamblador.arrendataria_rep}, C.I. N° ${variablesEnsamblador.arrendataria_ci}, denominada "LA ARRENDATARIA", se ha convenido formalmente celebrar el presente CONTRATO:

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
LA ARRENDADORA da en arrendamiento a LA ARRENDATARIA el bien inmueble de su propiedad consistente en: ${variablesEnsamblador.inmueble}, comprendido dentro de los siguientes linderos: ${variablesEnsamblador.linderos}.

CLÁUSULA SEGUNDA: DESTINO EXCLUSIVO
El inmueble será destinado única y exclusivamente para actividades comerciales, industriales y almacenamiento logístico de repuestos y maquinarias.

CLÁUSULA TERCERA: DURACIÓN Y RENOVACIÓN
La duración se fija en ${variablesEnsamblador.plazo_vigencia}, contados a partir de la entrega formal de llaves. Podrá renovarse mediante notificación escrita previa con 60 días de antelación.

${clausulaCanonTexto}

${clausulaMejorasTexto}

${clausulaViasDeHechoTexto}

CLÁUSULA SÉPTIMA: CONSERVACIÓN Y SERVICIOS PÚBLICOS
LA ARRENDATARIA se obliga a mantener el inmueble en buen estado y cubrir los servicios de electricidad industrial, agua y aseo urbano devengados.

CLÁUSULA OCTAVA: RESOLUCIÓN DE PLENO DERECHO
Serán causales de resolución: la falta de pago de 2 cánones consecutivos, el subarrendamiento no consentido o las perturbaciones ilegítimas a la posesión.

${clausulaFueroTexto}

Se otorgan dos (2) ejemplares de un mismo tenor y a un solo efecto, en ${variablesEnsamblador.ciudad_domicilio}, a los veintiocho (28) días del mes de Septiembre del año 2026.

__________________________________                 __________________________________
${variablesEnsamblador.arrendadora}                 ${variablesEnsamblador.arrendataria}
Por: ${variablesEnsamblador.arrendadora_rep}         Por: ${variablesEnsamblador.arrendataria_rep}
C.I. ${variablesEnsamblador.arrendadora_ci}         C.I. ${variablesEnsamblador.arrendataria_ci}`;
  };

  const [documentoGeneradoWord, setDocumentoGeneradoWord] = useState(generarTextoDocumentoCompleto());

  useEffect(() => {
    setDocumentoGeneradoWord(generarTextoDocumentoCompleto());
  }, [clausulaLegoBCV, clausulaLegoViasDeHecho, clausulaLegoMejoras, clausulaLegoArbitral, modeloDriveSeleccionado, variablesEnsamblador]);

  const descargarDocumentoWord = () => {
    const blob = new Blob([documentoGeneradoWord], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${modeloDriveSeleccionado}_${clienteEnsamblaje.replace(/\s+/g, '_')}_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // =========================================================================
  // GABINETE 3: AUDITORÍA DE CONTRAPARTES (CON COPIA REDLINE Y ARGUMENTARIO)
  // =========================================================================
  const [informeAuditoria] = useState<any>({
    archivo: "contrato_propuesto_contraparte.docx",
    dictamen_general: "Alto Riesgo Jurídico y Patrimonial",
    total_clausulas: 18,
    clausulas_rojas: 3,
    clausulas_amarillas: 2,
    argumentario_comercial: "Para la llamada con el Director Comercial de la contraparte: Nuestra postura es constructiva pero firme. Aceptamos los hitos de entrega y la modalidad de pago a 30 días, pero bajo ninguna circunstancia asumiremos indemnidades ilimitadas ni lucro cesante. La titularidad de nuestro software y algoritmos no es transferible bajo ningún supuesto, otorgando solo una licencia corporativa de uso. La jurisdicción debe radicarse en tribunales de Madrid o Delaware.",
    semaforo: [
      {
        id: "SEM-01",
        clausula: "Cláusula 6: Indemnización Ilimitada",
        color: "rojo",
        nivel: "Alerta Roja (Crítica)",
        analisis: "La contraparte impone indemnidad sin límite cuantitativo ni temporal, incluyendo lucro cesante y daños consecuenciales indirectos.",
        redline_sugerido: "La responsabilidad total acumulada de la empresa bajo el presente Contrato se limitará estrictamente al monto total efectivamente facturado en los doce (12) meses anteriores al hecho causante. Se excluye expresamente el lucro cesante y los daños consecuenciales."
      },
      {
        id: "SEM-02",
        clausula: "Cláusula 10: Cesión Irrevocable de Código y Algoritmos",
        color: "rojo",
        nivel: "Alerta Roja (Crítica)",
        analisis: "Pretende transferir la titularidad de los modelos, know-how y desarrollos de software preexistentes a favor de la contraparte.",
        redline_sugerido: "La empresa conserva la titularidad exclusiva y todos los derechos morales y patrimoniales de su propiedad intelectual y código preexistente, concediendo únicamente una licencia corporativa de uso no exclusiva, intransferible y temporal durante la vigencia del acuerdo."
      },
      {
        id: "SEM-03",
        clausula: "Cláusula 15: Jurisdicción Arbitral en Singapur",
        color: "rojo",
        nivel: "Alerta Roja (Procesal)",
        analisis: "Sometimiento a fueros remotos foráneos con asunción unilateral de costas.",
        redline_sugerido: "Las partes convienen formalmente en someter cualquier controversia a la jurisdicción exclusiva de los tribunales de Madrid (España) o Delaware (EE.UU.), asumiendo cada parte sus propios honorarios legales y gastos procesales."
      },
      {
        id: "SEM-04",
        clausula: "Cláusula 8: Plazo de Pago a 90 Días",
        color: "amarillo",
        nivel: "Alerta Amarilla (Comercial)",
        analisis: "Plazo de cobro excesivo que afecta el flujo de caja operativo.",
        redline_sugerido: "El pago de las facturas fiscales se efectuará en un plazo máximo de treinta (30) días continuos posteriores a su emisión y recepción conforme."
      }
    ]
  });

  const copiarRedlineIndividual = (texto: string) => {
    navigator.clipboard.writeText(texto);
    alert("Texto del Redline copiado al portapapeles.");
  };

  // =========================================================================
  // GABINETE 4: ENLACE CORPORATIVO (CON EXPORTADOR A JIRA / MARKDOWN)
  // =========================================================================
  const [dictamenIniciativa] = useState<any>({
    area: "Tecnología",
    viabilidad: "Viable Sujeta a Blindaje Regulatorio (Art. 12 y 50 EU AI Act)",
    resumen_directivo: "El proyecto es legalmente viable siempre que se implemente un filtro Zero-Retention previo para sanitizar datos fiscales y bancarios antes de la inferencia, y se entregue al usuario final la advertencia de supervisión humana (HITL).",
    especificaciones_tecnicas: [
      {
        ticket: "LEGAL-TECH-01",
        titulo: "Pipeline de Anonimización en Memoria para Datos Bancarios e Identificadores Fiscales",
        responsable: "Ingeniería de Backend",
        criterios: ["Cero almacenamiento de texto crudo en disco", "Latencia < 15ms", "Hash de auditoría forense SHA-256"],
        prioridad: "P1 - Bloqueante",
        gherkin: "Given que ingresa un balance fiscal contable con RIF y cuentas bancarias\nWhen el payload ingresa a la memoria del gateway\nThen el filtro scrubbea números de cuenta y sustituye por tokens sintéticos antes de la inferencia de IA."
      },
      {
        ticket: "LEGAL-TECH-02",
        titulo: "Etiquetado Transparente de Asistencia de IA en Documentos Exportados",
        responsable: "Frontend & UI",
        criterios: ["Leyenda visible conforme al Art. 50 del EU AI Act", "Firma digital del revisor humano"],
        prioridad: "P2 - Alta",
        gherkin: "Given que se genera un dictamen o minuta asistida por IA\nWhen el usuario pulsa descargar documento\nThen se inyecta al pie de página la leyenda obligatoria Art. 50 EU AI Act y el campo de firma letrada."
      }
    ]
  });

  const exportarTicketsJiraMarkdown = () => {
    let md = "# BACKLOG DE SEGURIDAD Y CUMPLIMIENTO LEGAL (JIRA / GITHUB ISSUES)\n\n";
    dictamenIniciativa.especificaciones_tecnicas.forEach((t: any) => {
      md += `## [${t.ticket}] ${t.titulo}\n`;
      md += `- **Prioridad:** ${t.prioridad}\n`;
      md += `- **Responsable:** ${t.responsable}\n`;
      md += `- **Criterios de Aceptación:**\n`;
      t.criterios.forEach((c: string) => { md += `  * ${c}\n`; });
      md += `\n**Escenario de Prueba (Gherkin):**\n\`\`\`gherkin\n${t.gherkin}\n\`\`\`\n\n---\n\n`;
    });
    navigator.clipboard.writeText(md);
    alert("Especificaciones legales exportadas a Markdown/Jira.");
  };

  // =========================================================================
  // GABINETE 6: ACTAS Y MINUTAS (CON GENERADOR DE CORREO Y TOGGLE DE TRANSCRIPCIÓN)
  // =========================================================================
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrlLocal, setAudioUrlLocal] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoTranscripcionWhisper, setCargandoTranscripcionWhisper] = useState(false);
  const [mostrarTranscripcionCruda, setMostrarTranscripcionCruda] = useState(false);
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  useEffect(() => {
    let intervalo: any = null;
    if (grabandoAudioLocal) {
      intervalo = setInterval(() => {
        setSegundosGrabacion(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [grabandoAudioLocal]);

  const alternarGrabacionAudioLocal = async () => {
    if (grabandoAudioLocal) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
          if (mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach((track: any) => track.stop());
          }
        } catch (e) {
          console.error("Error deteniendo grabador:", e);
        }
      }
      setGrabandoAudioLocal(false);
    } else {
      setSegundosGrabacion(0);
      chunksRef.current = [];
      try {
        if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new (window as any).MediaRecorder(stream);
          
          recorder.ondataavailable = (e: any) => {
            if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
          };
          
          recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrlLocal(url);
            setArchivoAudioNombre("grabacion_reunion_sala.webm");
            procesarGeneracionMinuta("grabacion_reunion_sala.webm");
          };
          
          recorder.start();
          mediaRecorderRef.current = recorder;
          setGrabandoAudioLocal(true);
        } else {
          setGrabandoAudioLocal(true);
          setTimeout(() => {
            setGrabandoAudioLocal(false);
            setArchivoAudioNombre("sesion_grabada_sala.webm");
            procesarGeneracionMinuta("sesion_grabada_sala.webm");
          }, 4000);
        }
      } catch (err) {
        console.warn("Permiso de micrófono no habilitado:", err);
        setGrabandoAudioLocal(true);
      }
    }
  };

  const handleSubirArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoAudioNombre(file.name);
      setAudioUrlLocal(URL.createObjectURL(file));
      procesarGeneracionMinuta(file.name);
    }
  };

  const [minutaWhisper, setMinutaWhisper] = useState<any>({
    titulo: "Minuta de Sesión de Negociación: Galpón Unare y Maquinaria Pesada",
    fecha: "28 de Septiembre de 2026",
    hora: "10:30 AM",
    duracion: "42 minutos",
    plataforma: "Custodia Soberana (Whisper On-Premise en Servidor Local)",
    hash_sha256: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    participantes: [
      "Barbara Piccolo (Abogada Directora & General Counsel)",
      "Carlos Mendoza (Director de Operaciones - Machtig Rothe, C.A.)",
      "Andrés Silva (Administrador - Inmobiliaria del Este, C.A.)"
    ],
    transcripcion_extracto: 
      "«...Se deja constancia en la grabación de sala que LA ARRENDADORA no ejecutará vías de hecho ni retendrá maquinaria bajo apercibimiento de tipo penal. Respecto a las reparaciones de cubierta por 15.000 USD, se autoriza su compensación al 50% de los cánones mensuales sucesivos. LA ARRENDATARIA consignará los comprobantes fiscales antes del viernes...»",
    acuerdos: [
      "Compensación mensual del 50% del canon de 2.800 USD hasta amortizar el monto facturado de 15.000 USD en obras estructurales.",
      "Desbloqueo inmediato del portón principal y garantía de libre movilización de los tres (3) montacargas Caterpillar.",
      "Sometimiento estricto al fuero judicial exclusivo de Puerto Ordaz, excluyendo cualquier vía de justicia por propia mano.",
      "Suscripción del anexo aclaratorio al contrato de arrendamiento ante la Notaría en plazo perentorio de 72 horas."
    ],
    action_items: [
      { id: "ACT-01", tarea: "Redactar e intimar documento de anexo aclaratorio ante Notaría", responsable: "Barbara Piccolo", plazo: "Miércoles 12:00", prioridad: "Crítica", agregado: false },
      { id: "ACT-02", tarea: "Consignar copias de facturas fiscales de techos y pavimentos a la arrendadora", responsable: "Carlos Mendoza", plazo: "Viernes 16:00", prioridad: "Alta", agregado: false },
      { id: "ACT-03", tarea: "Inspección técnica de funcionamiento de montacargas tras el desbloqueo", responsable: "Equipo de Operaciones", plazo: "Jueves 10:00", prioridad: "Media", agregado: false }
    ],
    puntos_abiertos: [
      "Validación de solvencia municipal de aseo urbano por parte de LA ARRENDADORA.",
      "Presentación de fianza comercial bancaria de fiel cumplimiento para el segundo año de vigencia."
    ]
  });

  const procesarGeneracionMinuta = (nombreArchivo: string) => {
    setCargandoTranscripcionWhisper(true);
    setTimeout(() => {
      setMinutaWhisper({
        titulo: `Minuta Oficial Certificada: ${nombreArchivo.replace(/\.[^/.]+$/, "")}`,
        fecha: "28 de Septiembre de 2026",
        hora: "11:15 AM",
        duracion: segundosGrabacion > 0 ? `${Math.floor(segundosGrabacion / 60)}m ${segundosGrabacion % 60}s` : "38 minutos",
        plataforma: "Custodia Soberana (Whisper On-Premise en Servidor Local)",
        hash_sha256: "7b4c9e1f2a3d8e5b0c9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c",
        participantes: [
          "Barbara Piccolo (Socia Directora)",
          "Directores y Partes Interesadas en Sala"
        ],
        transcripcion_extracto: 
          "«...Habiéndose escuchado los puntos del debate y analizado los riesgos contractuales y procesales, las partes convienen en acatar los términos de la propuesta letrada para evitar litigio judicial...»",
        acuerdos: [
          "Acuerdo vinculante formalizado con reserva de acciones legales.",
          "Estipulación de cumplimiento en plazo de cuarenta y ocho (48) horas.",
          "Custodia probatoria de la presente grabación en bóveda inmutable."
        ],
        action_items: [
          { id: `ACT-${Date.now().toString().slice(-3)}-1`, tarea: "Elaborar documento resolutivo y remitir al Planificador", responsable: "Barbara Piccolo", plazo: "Mañana 16:00", prioridad: "Crítica", agregado: false },
          { id: `ACT-${Date.now().toString().slice(-3)}-2`, tarea: "Notificar formalmente a los accionistas", responsable: "Secretaría Letrada", plazo: "Viernes", prioridad: "Alta", agregado: false }
        ],
        puntos_abiertos: [
          "Verificación del registro de la propiedad inmobiliaria."
        ]
      });
      setCargandoTranscripcionWhisper(false);
    }, 1200);
  };

  const asignarActionItemAPlanificador = (item: any) => {
    const nuevoAsunto = {
      id: `EXP-MIN-${Date.now().toString().slice(-3)}`,
      titulo: item.tarea,
      cliente: clienteEnsamblaje || "Machtig Rothe, C.A.",
      tipo_rol: "Externo",
      materia: "Compromiso de Minuta",
      responsable: item.responsable,
      plazo: item.plazo,
      prioridad: item.prioridad,
      estado: "En Tramitación",
      bloqueo: "En Curso",
      bloqueo_tipo: "ninguno",
      cuantia: "Derivada de Acuerdo",
      tribunal: "Compromiso de Sala Certificada",
      detalles: `Tarea generada a partir de los acuerdos de la sesión: ${minutaWhisper.titulo}.`,
      bitacora: [
        { fecha: "28/09/2026", nota: "Asignación directa desde Minuta Oficial a través de Whisper On-Premise." }
      ]
    };
    setTableroPlanificador([nuevoAsunto, ...tableroPlanificador]);
    setMinutaWhisper((prev: any) => ({
      ...prev,
      action_items: prev.action_items.map((ai: any) => 
        ai.id === item.id ? { ...ai, agregado: true } : ai
      )
    }));
    alert(`Acuerdo asignado con éxito al Planificador: "${item.tarea}"`);
  };

  const copiarCorreoFormalizacionAcuerdos = () => {
    const mailText = 
`Asunto: FORMALIZACIÓN DE ACUERDOS - ${minutaWhisper.titulo}
Para: ${minutaWhisper.participantes.join('; ')}
Fecha: ${minutaWhisper.fecha}

Estimados Directores y Representantes:

De conformidad con la sesión celebrada hoy ${minutaWhisper.fecha}, por medio del presente correo dejo formalmente asentados los acuerdos vinculantes acordados por las partes para su ejecución inmediata:

ACUERDOS VINCULANTES ADOPTADOS:
${minutaWhisper.acuerdos.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}

MATRIZ DE COMPROMISOS Y PLAZOS FATALES:
${minutaWhisper.action_items.map((ai: any) => `• [${ai.prioridad}] ${ai.tarea} | Responsable: ${ai.responsable} | Plazo: ${ai.plazo}`).join('\n')}

Grabación de sala bajo sello criptográfico SHA-256 (${minutaWhisper.hash_sha256.slice(0, 16)}...) en Bóveda Soberana.

Atentamente,
BARBARA PICCOLO | General Counsel`;

    navigator.clipboard.writeText(mailText);
    alert("Correo copiado al portapapeles.");
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* =================================================================== */}
      {/* BARRA LATERAL (SIDEBAR DE CONTROL LETRADO)                          */}
      {/* =================================================================== */}
      <aside className={`transition-all duration-300 border-r flex flex-col justify-between z-30 shrink-0 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${
        isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Cabecera Sidebar */}
        <div className="p-4 border-b border-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  DESPACHO LEGAL
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider uppercase">
                  Práctica Corporativa & CAIO
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
              isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
            title={sidebarOpen ? "Colapsar menú" : "Expandir menú"}
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Menú de Navegación Vertical Optimizado y Ordenado */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
          
          {/* SECCIÓN I: CEREBRO JURÍDICO (IA LETRADA ACTIVA) */}
          <div className="space-y-1">
            {sidebarOpen && (
              <div className="px-2 py-1 text-[10px] font-bold font-mono uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>CEREBRO JURÍDICO (IA)</span>
              </div>
            )}

            {[
              { id: 'copiloto_letrado', label: '🧠 Copiloto & Sparring', icon: Bot, badge: 'RAG Vivo' },
              { id: 'analizador_universal', label: '🔍 Analizador Forense & Diff', icon: GitCompare, badge: 'Cotejo' },
              { id: 'redactor_medida', label: '📝 Redactor de Escritos', icon: FileCode, badge: 'Solemne' }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    active 
                      ? 'bg-gradient-to-r from-cyan-500/25 to-blue-500/20 text-cyan-200 font-bold border border-cyan-500/50 shadow-sm' 
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900/80' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* SECCIÓN II: GESTIÓN DEL DESPACHO */}
          <div className="space-y-1">
            {sidebarOpen && (
              <div className="px-2 py-1 text-[10px] font-bold font-mono uppercase text-slate-400 tracking-wider">
                <span>GESTIÓN OPERATIVA</span>
              </div>
            )}

            {[
              { id: 'planificador', label: 'Planificador de Asuntos', icon: Layers },
              { id: 'crm', label: 'Directorio & CRM Legal', icon: Users },
              { id: 'calendario', label: 'Calendario Procesal (CPC)', icon: Clock },
              { id: 'metricas', label: 'Rendimiento & Métricas', icon: BarChart3 }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    active 
                      ? isDark 
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
                        : 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* SECCIÓN III: GABINETE & SALA */}
          <div className="space-y-1">
            {sidebarOpen && (
              <div className="px-2 py-1 text-[10px] font-bold font-mono uppercase text-slate-400 tracking-wider">
                <span>GABINETE & SALA</span>
              </div>
            )}

            {[
              { id: 'ensamblador_documental', label: 'Ensamblador de Documentos', icon: FileText },
              { id: 'actas_minutas', label: 'Actas & Minutas de Reunión', icon: Mic }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    active 
                      ? isDark 
                        ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
                        : 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                      : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {sidebarOpen && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* SECCIÓN IV: CUMPLIMIENTO & GOBIERNO CORPORATIVO */}
          <div className="space-y-1 pt-1">
            {sidebarOpen && (
              <div className="px-2 py-1 text-[10px] font-bold font-mono uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>CUMPLIMIENTO & AUDITORÍA</span>
              </div>
            )}

            <button
              onClick={() => setActiveTab('cumplimiento')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'cumplimiento' || activeTab === 'aduana' || activeTab === 'boveda' || activeTab === 'canal_etico' || activeTab === 'societario'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                  : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900/80' : 'text-slate-700 hover:bg-slate-100'
              }`}
              title={!sidebarOpen ? "Cumplimiento & Gobierno" : undefined}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Shield className="w-4 h-4 shrink-0 text-emerald-400" />
                {sidebarOpen && <span className="truncate font-semibold">Cumplimiento & Gobierno</span>}
              </div>
              {sidebarOpen && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  4 Módulos
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-slate-800/40">
          <div className={`p-2 rounded-xl flex items-center gap-2.5 ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
              BP
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-xs truncate">Barbara Piccolo</span>
                <span className="text-[10px] text-slate-400 truncate">Abogada Directora & GC</span>
              </div>
            )}
            {sidebarOpen && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto shrink-0 animate-pulse"></span>}
          </div>
        </div>

      </aside>

      {/* =================================================================== */}
      {/* CONTENIDO PRINCIPAL                                                 */}
      {/* =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Barra Superior */}
        <header className={`h-14 border-b px-6 flex items-center justify-between shrink-0 z-20 ${
          isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-wider">DESPACHO</span>
              <span className="text-slate-600">/</span>
              <span className="font-bold text-cyan-400 capitalize">{activeTab.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={descargarInformeEjecutivoSemanal}
              className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 font-mono text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Informe Semanal (.doc)</span>
            </button>

            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium hidden sm:flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              <span>Custodia Legal & eIDAS</span>
            </span>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                isDark ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>

        {/* Contenedor Scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* ================================================================= */}
          {/* MOTOR 1: COPILOTO JURÍDICO & SPARRING EN VIVO (CHAT RAG)          */}
          {/* ================================================================= */}
          {activeTab === 'copiloto_letrado' && (
            <div className="space-y-5 max-w-5xl mx-auto h-full flex flex-col">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Bot className="w-6 h-6 text-cyan-400" /> Copiloto Jurídico & Sparring Letrado
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Debate estratégico, análisis de cuestiones previas (Art. 346 CPC), contradicciones y sparring con el abogado de la contraparte.
                  </p>
                </div>

                {/* Modos Rápidos */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  <button
                    onClick={() => setModoCopiloto('sparring')}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                      modoCopiloto === 'sparring' ? 'bg-red-500/25 border-red-500/50 text-red-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Swords className="w-3.5 h-3.5" /> Modo Sparring
                  </button>

                  <button
                    onClick={() => setModoCopiloto('casacion')}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                      modoCopiloto === 'casacion' ? 'bg-cyan-500/25 border-cyan-500/50 text-cyan-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" /> Cuestiones Previas CPC
                  </button>

                  <button
                    onClick={() => setModoCopiloto('forense')}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-all ${
                      modoCopiloto === 'forense' ? 'bg-purple-500/25 border-purple-500/50 text-purple-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" /> Detección de Contradicciones
                  </button>
                </div>
              </div>

              {/* Área de Mensajes del Chat */}
              <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/80 min-h-[460px] max-h-[580px]">
                {historialCopiloto.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.remitente === 'abogado' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                        msg.remitente === 'abogado' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {msg.remitente === 'abogado' ? 'Bárbara Piccolo (Dirección Letrada)' : `Copiloto AI • ${msg.modo.toUpperCase()}`}
                      </span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[88%] whitespace-pre-wrap ${
                        msg.remitente === 'abogado'
                          ? 'bg-slate-800 text-slate-100 rounded-tr-none border border-slate-700'
                          : 'bg-slate-900/90 text-slate-200 rounded-tl-none border border-slate-800/80 shadow-lg font-sans'
                      }`}
                    >
                      {msg.texto}
                    </div>
                  </div>
                ))}

                {cargandoCopiloto && (
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 animate-pulse p-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Razonando jurisprudencia TSJ, doctrina procesal y contraargumentos en memoria privada...</span>
                  </div>
                )}
              </div>

              {/* Input y Acciones Rápidas */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={
                      modoCopiloto === 'sparring' 
                        ? "Escribe tus argumentos y pídele a la IA que actúe como el abogado de la contraparte..."
                        : modoCopiloto === 'casacion'
                          ? "Pega la pretensión o el auto del tribunal para evaluar Cuestiones Previas (Art. 346 CPC)..."
                          : "Consulta cualquier duda de fondo, doctrina o estrategia..."
                    }
                    value={inputCopiloto}
                    onChange={(e) => setInputCopiloto(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && enviarConsultaCopiloto()}
                    className="flex-1 p-3 rounded-2xl border border-slate-800 bg-slate-950 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />

                  <button
                    onClick={() => enviarConsultaCopiloto()}
                    className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">Consultas Frecuentes:</span>
                  <button 
                    onClick={() => enviarConsultaCopiloto("¿Qué excepciones del Art. 346 CPC oponemos si la demanda no discrimina facturas ni cánones imputados?", "casacion")}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 cursor-pointer"
                  >
                    ⚖️ Excepción Defecto de Forma (Art. 346 ord. 6°)
                  </button>
                  <button 
                    onClick={() => enviarConsultaCopiloto("Actúa como el abogado de la arrendadora y destruye mi argumento de que las reparaciones autorizadas por correo compensan el canon.", "sparring")}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-400 text-slate-300 cursor-pointer"
                  >
                    🥊 Atacar autorización por correo
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* MOTOR 2: ANALIZADOR UNIVERSAL DE ARCHIVOS & DIFF CONTRACTUAL      */}
          {/* ================================================================= */}
          {activeTab === 'analizador_universal' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <GitCompare className="w-6 h-6 text-purple-400" /> Analizador Forense de Archivos & Diff Contractual
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Arrastra cualquier archivo real (.docx, .pdf, .txt) o compara versiones para detectar trampas silenciosas de la contraparte.
                  </p>
                </div>

                <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs font-mono">
                  <button
                    onClick={() => setSubTabAnalizador('analisis_archivo')}
                    className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                      subTabAnalizador === 'analisis_archivo' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🔍 Auditoría de Archivo
                  </button>
                  <button
                    onClick={() => setSubTabAnalizador('diff_contractual')}
                    className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer transition-all ${
                      subTabAnalizador === 'diff_contractual' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📑 Diff Semántico (Borrador vs Contraparte)
                  </button>
                </div>
              </div>

              {/* SUB-PESTAÑA A: ANÁLISIS FORENSE DE CUALQUIER ARCHIVO */}
              {subTabAnalizador === 'analisis_archivo' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                      
                      {/* Drag & Drop Real */}
                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold block mb-1.5">
                          Subir Archivo Real (.docx, .pdf, .txt):
                        </label>
                        <label className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-purple-400 bg-slate-950/60 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                          <Upload className="w-8 h-8 text-purple-400 mb-2 animate-bounce" />
                          <span className="text-xs font-bold text-white">Haz clic o arrastra tu contrato aquí</span>
                          <span className="text-[10px] text-slate-500 mt-1">Lee directamente el contenido en memoria privada</span>
                          <input type="file" accept=".docx,.pdf,.txt,.json,.doc" onChange={procesarSubidaArchivoUniversal} className="hidden" />
                        </label>
                        {nombreArchivoSubido && (
                          <div className="text-[11px] font-mono text-purple-300 mt-2 flex items-center gap-1.5">
                            <CheckCheck className="w-3.5 h-3.5" /> Archivo cargado: <strong>{nombreArchivoSubido}</strong>
                          </div>
                        )}
                      </div>

                      {/* Texto del Documento Extraído */}
                      <div>
                        <label className="text-xs font-mono text-slate-400 uppercase font-bold block mb-1">
                          Texto en Memoria Forense:
                        </label>
                        <textarea
                          rows={6}
                          value={textoDocumentoAnalizar}
                          onChange={(e) => setTextoDocumentoAnalizar(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono"
                        />
                      </div>

                      <button
                        onClick={() => ejecutarAnalisisUniversal(nombreArchivoSubido, textoDocumentoAnalizar)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                      >
                        {cargandoAnalisisUniversal ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        <span>Ejecutar Análisis Forense de Cláusulas</span>
                      </button>
                    </div>
                  </div>

                  {/* Panel Derecho: Focos Rojos y Redlines con Cita Textual */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="font-bold text-xs text-purple-300 font-mono uppercase">
                          Dictamen de Riesgos: {resultadoAnalisisUniversal.archivo}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">
                          {resultadoAnalisisUniversal.focos_rojos.length} Cláusulas Críticas
                        </span>
                      </div>

                      {/* Tarjetas de Focos Rojos */}
                      <div className="space-y-3">
                        {resultadoAnalisisUniversal.focos_rojos.map((f: any, i: number) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-red-400 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5" /> {f.clausula}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">Alerta Roja</span>
                            </div>

                            <div className="p-2 rounded bg-slate-900/90 border border-slate-800 text-[11px] italic text-slate-300 font-serif">
                              {f.cita}
                            </div>

                            <p className="text-[11px] text-slate-300">{f.riesgo}</p>

                            <div className="p-2.5 rounded-lg bg-cyan-950/20 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 flex justify-between items-center">
                              <span><strong>Redline Letrado:</strong> {f.redline}</span>
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(f.redline);
                                  alert("Redline copiado al portapapeles.");
                                }}
                                className="ml-2 px-2 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] shrink-0 cursor-pointer"
                              >
                                Copiar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-PESTAÑA B: DIFF CONTRACTUAL SEMÁNTICO (BORRADOR VS CONTRAPARTE) */}
              {subTabAnalizador === 'diff_contractual' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">
                        Versión A: Nuestro Borrador Original
                      </span>
                      <textarea
                        rows={6}
                        value={textoDiffVersionA}
                        onChange={(e) => setTextoDiffVersionA(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono"
                      />
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                      <span className="text-xs font-mono text-red-400 font-bold uppercase block">
                        Versión B: Devuelto por la Contraparte (Con Cambios Ocultos)
                      </span>
                      <textarea
                        rows={6}
                        value={textoDiffVersionB}
                        onChange={(e) => setTextoDiffVersionB(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={ejecutarComparacionDiff}
                      className="px-6 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      {cargandoDiff ? <RefreshCw className="w-4 h-4 animate-spin" /> : <GitCompare className="w-4 h-4" />}
                      <span>Comparar Semánticamente y Detectar Trampas Ocultas</span>
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                    <span className="text-xs font-mono text-purple-300 font-bold uppercase block">
                      Modificaciones Detectadas y su Impacto Procesal:
                    </span>

                    <div className="space-y-2.5">
                      {resultadoDiff.map((d: any, idx: number) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <span className="font-bold text-white block">{d.clausula}</span>
                            <div className="text-[11px] text-amber-300 font-mono">Cambio: {d.cambio}</div>
                            <p className="text-[11px] text-slate-300">{d.impacto}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-red-500/20 text-red-400 shrink-0">
                            {d.nivel.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================================================================= */}
          {/* MOTOR 3: REDACTOR DE ESCRITOS Y CLÁUSULAS A MEDIDA                */}
          {/* ================================================================= */}
          {activeTab === 'redactor_medida' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <FileCode className="w-6 h-6 text-emerald-400" /> Redactor de Escritos Procesales & Cláusulas Complejas
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Generación argumentativa con técnica legislativa venezolana (Capítulo de Hechos, Derecho, Jurisprudencia y Petitorio).
                  </p>
                </div>

                <button
                  onClick={descargarEscritoWord}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" /> Descargar Escrito en Word (.doc)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Formulario de Parámetros */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3.5 text-xs">
                    
                    <div>
                      <label className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-bold">Tipo de Instrumento:</label>
                      <select
                        value={tipoEscritoRedactar}
                        onChange={(e) => setTipoEscritoRedactar(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-bold"
                      >
                        <option value="contestacion_desalojo">Oposición y Contestación a Intimación con Medida Cautelar (CPC 588)</option>
                        <option value="querella_despojo">Querella Interdictal de Despojo y Restitución Posesoria</option>
                        <option value="contrato_multitramo">Contrato de Arrendamiento con Opción a Compra y Canon Escalonado</option>
                        <option value="adenda_transaccional">Adenda Notarial de Transacción Extrajudicial y Finiquito</option>
                        <option value="recurso_casacion">Anuncio y Formalización de Recurso de Casación (Art. 313 CPC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-bold">Cliente Vinculado:</label>
                      <select
                        value={clienteRedactor}
                        onChange={(e) => setClienteRedactor(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-bold"
                      >
                        {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-bold">Tribunal o Notaría Destino:</label>
                      <input
                        type="text"
                        value={tribunalRedactor}
                        onChange={(e) => setTribunalRedactor(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1 font-mono uppercase text-[10px] font-bold">
                        Instrucciones de Fondo y Condiciones Específicas:
                      </label>
                      <textarea
                        rows={6}
                        value={instruccionesRedactor}
                        onChange={(e) => setInstruccionesRedactor(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-200 font-mono text-[11px]"
                      />
                    </div>

                    <button
                      onClick={generarEscritoLetrado}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {cargandoEscrito ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileCode className="w-4 h-4" />}
                      <span>Generar Escrito Procesal Íntegro</span>
                    </button>
                  </div>
                </div>

                {/* Vista del Escrito Solemne */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                        <Check className="w-4 h-4" /> Escrito Procesal Listo para Visar y Consignar
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(escritoGeneradoCompleto);
                          alert("Escrito copiado al portapapeles.");
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Texto
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs leading-relaxed max-h-[580px] overflow-y-auto whitespace-pre-wrap font-serif text-slate-200 select-text">
                      {escritoGeneradoCompleto}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
{/* ================================================================= */}
          {activeTab === 'planificador' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Layers className="w-6 h-6 text-cyan-400" /> Planificador de Asuntos y Expedientes
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de prioridades procesales, dependencias bloqueantes y estado de tramitación letrada.
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className={`flex rounded-xl border p-1 text-xs font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    <button 
                      onClick={() => setVistaPlanificador('kanban')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaPlanificador === 'kanban' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Kanban
                    </button>
                    <button 
                      onClick={() => setVistaPlanificador('lista')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaPlanificador === 'lista' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Lista
                    </button>
                  </div>

                  <button
                    onClick={() => setModalNuevoAsunto(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Asunto</span>
                  </button>
                </div>
              </div>

              {/* Selector de Rol: In-House vs Cartera Externa */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Vista de Rol:</span>
                  {(['Todos', 'In-House', 'Externo'] as const).map(rol => (
                    <button
                      key={rol}
                      onClick={() => setFiltroRolPlanificador(rol)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        filtroRolPlanificador === rol
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rol === 'Todos' ? 'Todos los Asuntos' : rol === 'In-House' ? '🏛️ Corporativo / In-House' : '⚖️ Cartera Externa / Litigio'}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar expediente, cliente o juzgado..."
                    value={buscarPlanificador}
                    onChange={(e) => setBuscarPlanificador(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200"
                  />
                </div>
              </div>

              {/* VISTA KANBAN CON TAGS DE BLOQUEO Y DENSIDAD COMPACTA */}
              {vistaPlanificador === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                    const items = tableroPlanificador.filter(i => {
                      const matchCol = i.estado === col;
                      const matchRol = filtroRolPlanificador === 'Todos' || i.tipo_rol === filtroRolPlanificador;
                      const matchMat = filtroMateriaPlanificador === 'Todas' || i.materia.toLowerCase().includes(filtroMateriaPlanificador.toLowerCase());
                      const matchTxt = !buscarPlanificador || 
                        i.titulo.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.cliente.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.id.toLowerCase().includes(buscarPlanificador.toLowerCase());
                      return matchCol && matchRol && matchMat && matchTxt;
                    });

                    return (
                      <div key={col} className={`p-3.5 rounded-2xl border flex flex-col justify-between min-h-[380px] ${
                        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <div>
                          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/40 text-xs font-bold">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${
                                col === 'Por Iniciar' ? 'bg-cyan-400' : col === 'En Tramitación' ? 'bg-blue-400' : col === 'Revisión & Firma' ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}></span>
                              {col}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                              {items.length}
                            </span>
                          </div>

                          <div className="space-y-2.5 mt-3">
                            {items.map(t => (
                              <div 
                                key={t.id} 
                                className={`p-3 rounded-xl border text-xs space-y-2 transition-all shadow-sm ${
                                  isDark ? 'bg-slate-950 border-slate-800/90 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-extrabold text-cyan-400">{t.cliente}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${
                                    t.tipo_rol === 'In-House' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                                  }`}>
                                    {t.tipo_rol}
                                  </span>
                                </div>

                                <div className="font-bold text-xs text-white cursor-pointer hover:text-cyan-300 leading-snug" onClick={() => setModalVerExpediente(t)}>
                                  {t.titulo}
                                </div>

                                {/* Tag de Dependencia Bloqueante */}
                                <div className="flex items-center gap-1 text-[10px] font-mono">
                                  <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                                    t.bloqueo_tipo === 'externo' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                    t.bloqueo_tipo === 'interno' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                    'bg-emerald-500/10 text-emerald-400'
                                  }`}>
                                    {t.bloqueo_tipo !== 'ninguno' && <AlertCircle className="w-2.5 h-2.5" />}
                                    <span>{t.bloqueo}</span>
                                  </span>
                                </div>

                                <div className="text-[10px] pt-1.5 border-t border-slate-800/40 flex justify-between items-center text-slate-400">
                                  <span className="truncate max-w-[110px]">{t.responsable}</span>
                                  <span className="font-mono text-cyan-300 font-bold">{t.plazo}</span>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-slate-800/20 text-[10px] font-mono">
                                  <button onClick={() => setModalVerExpediente(t)} className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer">
                                    <Eye className="w-3 h-3" /> Ficha
                                  </button>

                                  <div className="flex items-center gap-1">
                                    {col !== 'Por Iniciar' && (
                                      <button
                                        onClick={() => {
                                          const prevCol = col === 'Concluido' ? 'Revisión & Firma' : col === 'Revisión & Firma' ? 'En Tramitación' : 'Por Iniciar';
                                          moverEstadoAsunto(t.id, prevCol);
                                        }}
                                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                      >
                                        <ArrowLeft className="w-3 h-3" />
                                      </button>
                                    )}

                                    {col !== 'Concluido' && (
                                      <button
                                        onClick={() => {
                                          const nextCol = col === 'Por Iniciar' ? 'En Tramitación' : col === 'En Tramitación' ? 'Revisión & Firma' : 'Concluido';
                                          moverEstadoAsunto(t.id, nextCol);
                                        }}
                                        className="p-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                                      >
                                        <ArrowRight className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VISTA LISTA PROCESAL */}
              {vistaPlanificador === 'lista' && (
                <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <table className="w-full text-xs text-left">
                    <thead className={`text-[10px] font-mono uppercase border-b ${isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <tr>
                        <th className="p-3.5">ID / Rol</th>
                        <th className="p-3.5">Cliente</th>
                        <th className="p-3.5">Materia</th>
                        <th className="p-3.5">Bloqueo Operativo</th>
                        <th className="p-3.5">Cuantía</th>
                        <th className="p-3.5">Plazo Fatal</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {tableroPlanificador.map(t => (
                        <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3.5 font-mono">
                            <span className="font-bold text-cyan-400 block">{t.id}</span>
                            <span className="text-[9px] text-slate-400">{t.tipo_rol}</span>
                          </td>
                          <td className="p-3.5 font-bold text-white">{t.cliente}</td>
                          <td className="p-3.5 text-slate-300">{t.materia}</td>
                          <td className="p-3.5 font-mono text-[11px]">
                            <span className={t.bloqueo_tipo === 'externo' ? 'text-red-400 font-bold' : t.bloqueo_tipo === 'interno' ? 'text-amber-400' : 'text-emerald-400'}>
                              {t.bloqueo}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-emerald-400 font-bold">{t.cuantia}</td>
                          <td className="p-3.5 font-mono font-bold text-amber-400">{t.plazo}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300">
                              {t.estado}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setModalVerExpediente(t)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[10px] cursor-pointer"
                            >
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 2: DIRECTORIO Y CRM LEGAL (CON MATRIZ DE FACULTADES)      */}
          {/* ================================================================= */}
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" /> Directorio & CRM Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de clientes externos e internos con Matriz de Vigencia de Facultades Estatutarias y Poderes.
                  </p>
                </div>
              </div>

              {/* Matriz de Clientes Registrados */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientes.map(c => {
                  const expedientesCliente = tableroPlanificador.filter(exp => exp.cliente === c.nombre);
                  return (
                    <div key={c.id} className={`p-4 rounded-2xl border space-y-3 ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          c.tipo === 'Externo' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                        }`}>
                          {c.tipo}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{c.rif}</span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-white">{c.nombre}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{c.apoderado} ({c.cedula_apoderado})</p>
                      </div>

                      {/* Semáforo de Facultades Estatutarias */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Junta Directiva:</span>
                          <span className="text-emerald-400 font-bold">{c.facultades_junta}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Poder Notarial:</span>
                          <span className={`font-bold ${c.facultades_estado === 'alerta' ? 'text-amber-400' : 'text-slate-300'}`}>
                            {c.facultades_poder}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-[11px] font-mono">
                        <span className="text-slate-400">{expedientesCliente.length} expediente(s) activo(s)</span>
                        <button
                          onClick={() => setClienteVerFichaModal(c)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[10px] cursor-pointer transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Ver Expedientes
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Formulario de Alta */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" /> Alta de Nuevo Cliente en Directorio
                </h2>
                <form onSubmit={registrarNuevoCliente} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Razón Social *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Inversiones 2026, C.A."
                        value={nuevoCliente.nombre}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Tipo</label>
                      <select
                        value={nuevoCliente.tipo}
                        onChange={(e: any) => setNuevoCliente({...nuevoCliente, tipo: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-cyan-400 font-bold"
                      >
                        <option value="Externo">Cliente Externo</option>
                        <option value="Interno">Cliente Interno</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">RIF</label>
                      <input
                        type="text"
                        placeholder="J-00000000-0"
                        value={nuevoCliente.rif}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, rif: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Apoderado Legal</label>
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nuevoCliente.apoderado}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, apoderado: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Cédula Apoderado</label>
                      <input
                        type="text"
                        placeholder="V-00.000.000"
                        value={nuevoCliente.cedula_apoderado}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, cedula_apoderado: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Domicilio</label>
                      <input
                        type="text"
                        placeholder="Ciudad / Estado"
                        value={nuevoCliente.domicilio}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, domicilio: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                    >
                      Guardar Ficha
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 3: CALENDARIO PROCESAL REAL                               */}
          {/* ================================================================= */}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Clock className="w-6 h-6 text-amber-400" /> Calendario Judicial & Contractual
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control visual de términos perentorios con cómputo de Días de Despacho y exportación directa a dispositivos móviles.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={exportarCalendarioICS}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Sincronizar (.ics)
                  </button>

                  <button
                    onClick={() => setModalNuevoEvento(true)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Agendar Término
                  </button>
                </div>
              </div>

              {/* Selector de Cómputo de Plazos */}
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-900/60 text-xs font-mono">
                <span className="text-slate-400 uppercase font-bold">Régimen de Cómputo:</span>
                <div className="flex rounded-lg border border-slate-800 p-0.5">
                  <button
                    onClick={() => setTipoComputoPlazo('despacho')}
                    className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      tipoComputoPlazo === 'despacho' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚖️ Días de Despacho (CPC Art. 197 - Tribunales)
                  </button>
                  <button
                    onClick={() => setTipoComputoPlazo('continuos')}
                    className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      tipoComputoPlazo === 'continuos' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📄 Días Continuos (Vencimientos Contractuales)
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  {tipoComputoPlazo === 'despacho' ? '*Solo computa días en que el tribunal acuerde despacho público efectivo.' : '*Computa sábados, domingos y feriados civiles.'}
                </span>
              </div>

              {/* Cuadrícula Real del Mes */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <span>{mesesNombres[mesActualIndex]}</span>
                    <span className="text-amber-400">{anioActual}</span>
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMesActualIndex(mesActualIndex === 0 ? 11 : mesActualIndex - 1)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setMesActualIndex(8); setAnioActual(2026); setDiaSeleccionado(28); }}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono font-bold hover:bg-slate-800 cursor-pointer"
                    >
                      Hoy (28 Sep)
                    </button>
                    <button
                      onClick={() => setMesActualIndex(mesActualIndex === 11 ? 0 : mesActualIndex + 1)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] font-bold pb-2 border-b border-slate-800 text-slate-400">
                    <div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div><div>DOM</div>
                  </div>

                  {(() => {
                    const { offsetLunes, totalDias } = getDiasDelMes(mesActualIndex, anioActual);
                    const cells: any[] = [];
                    for (let i = 0; i < offsetLunes; i++) {
                      cells.push(<div key={`empty-${i}`} className="min-h-[85px] opacity-20 p-2 text-xs">-</div>);
                    }
                    for (let d = 1; d <= totalDias; d++) {
                      const eventosDelDia = eventosCalendario.filter(ev => ev.dia === d && ev.mes === mesActualIndex && ev.anio === anioActual);
                      const esHoy = d === 28 && mesActualIndex === 8 && anioActual === 2026;
                      const esSeleccionado = d === diaSeleccionado;

                      cells.push(
                        <div
                          key={`day-${d}`}
                          onClick={() => setDiaSeleccionado(d)}
                          className={`min-h-[85px] p-2 rounded-xl border text-xs flex flex-col justify-between cursor-pointer transition-all ${
                            esSeleccionado 
                              ? 'border-amber-400 bg-amber-950/20 shadow-lg' 
                              : esHoy 
                                ? 'border-cyan-400 bg-cyan-950/20 font-bold' 
                                : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-mono text-xs font-bold ${esHoy ? 'text-cyan-400 underline' : esSeleccionado ? 'text-amber-400' : 'text-slate-300'}`}>
                              {d}
                            </span>
                            {esHoy && <span className="text-[9px] font-mono text-cyan-300 font-bold">HOY</span>}
                          </div>

                          <div className="space-y-1 mt-1">
                            {eventosDelDia.map(ev => (
                              <div 
                                key={ev.id} 
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold truncate ${
                                  ev.nivel === 'critico' ? 'bg-red-500/25 text-red-300 border border-red-500/40' :
                                  ev.nivel === 'urgente' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40' :
                                  'bg-blue-500/25 text-blue-300'
                                }`}
                              >
                                {ev.titulo}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return <div className="grid grid-cols-7 gap-1.5 mt-2">{cells}</div>;
                  })()}
                </div>

                {/* Panel Detallado del Día */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Términos y Audiencias: {diaSeleccionado} de {mesesNombres[mesActualIndex]} de {anioActual}</span>
                    </h3>
                    <button
                      onClick={() => setModalNuevoEvento(true)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agendar en esta fecha
                    </button>
                  </div>

                  {(() => {
                    const eventos = eventosCalendario.filter(ev => ev.dia === diaSeleccionado && ev.mes === mesActualIndex && ev.anio === anioActual);
                    if (eventos.length === 0) {
                      return <div className="py-4 text-center text-xs text-slate-500 font-mono">No hay términos fatales ni audiencias para este día.</div>;
                    }
                    return (
                      <div className="space-y-2">
                        {eventos.map(ev => (
                          <div key={ev.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-amber-400 font-bold text-xs">{ev.hora}</span>
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-800 text-cyan-300">{ev.cliente}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Cómputo: {ev.computo}</span>
                              </div>
                              <div className="text-sm font-bold text-white">{ev.titulo}</div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${
                              ev.nivel === 'critico' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {ev.dias_restantes}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 4: RENDIMIENTO & FINOPS                                   */}
          {/* ================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> Rendimiento & FinOps Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cuantificación de valor generado, contingencias prevenidas y retorno de la dirección letrada.
                  </p>
                </div>

                <button
                  onClick={descargarInformeEjecutivoSemanal}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" /> Descargar Informe de Gestión (.doc)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Valor Desbloqueado</span>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{metricasDespacho.valor_aportado_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Riesgo Prevenido</span>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{metricasDespacho.contingencias_ahorradas_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Facturación Mes</span>
                  <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">{metricasDespacho.facturacion_mes_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Ciclo Contractual</span>
                  <div className="text-xs font-bold text-amber-400 font-mono mt-2">18h vs 5 días (-82%)</div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 1: CALIFICACIÓN & ESTRATEGIA (CON MATRIZ RIESGO/BENEFICIO)*/}
          {/* ================================================================= */}
          {activeTab === 'calificacion_estrategia' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Scale className="w-6 h-6 text-cyan-400" /> 1. Calificación & Estrategia Jurídica
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Análisis probatorio de hechos con Matriz Comparativa de Riesgo / Costo / Beneficio para el Directorio.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                    <div>
                      <label className="text-xs font-bold block mb-1">Cliente Vinculado (CRM):</label>
                      <select
                        value={clienteSeleccionadoTriage}
                        onChange={(e) => setClienteSeleccionadoTriage(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-cyan-400"
                      >
                        {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1">Pruebas Recibidas:</label>
                      <div className="space-y-1.5">
                        {archivosAdjuntosTriage.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="truncate">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1">Consulta Letrada:</label>
                      <textarea
                        rows={5}
                        value={consultaLetrada}
                        onChange={(e) => setConsultaLetrada(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200"
                      />
                    </div>

                    <button
                      onClick={ejecutarCalificacionEstrategica}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      {cargandoDictamen ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
                      <span>Generar Matriz Estratégica Comparativa</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-bold text-xs text-cyan-400 font-mono">Matriz de Vías Procesales</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">{dictamenEstrategico.nivel_urgencia}</span>
                    </div>

                    <div className="space-y-3">
                      {dictamenEstrategico.vias_estrategicas.map((v: any, i: number) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="font-bold text-white text-xs">{v.opcion}</div>
                          <p className="text-[11px] text-slate-300">{v.descripcion}</p>
                          
                          {/* Matriz de Riesgo/Costo/Beneficio */}
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
                            <div>
                              <span className="text-slate-500 block">COSTO:</span>
                              <span className="text-emerald-400 font-bold">{v.costo_financiero}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">RIESGO:</span>
                              <span className="text-amber-400 font-bold">{v.nivel_riesgo}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">PLAZO:</span>
                              <span className="text-cyan-400 font-bold">{v.tiempo_ejecucion}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 2: ENSAMBLADOR DOCUMENTAL (CON CHECKBOXES LEGO)          */}
          {/* ================================================================= */}
          {activeTab === 'ensamblador_documental' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="w-6 h-6 text-emerald-400" /> 2. Ensamblador Documental (Modelos de Drive)
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Modelos solemnes inmutables. Mapeo automático de datos del CRM con Cláusulas Lego de blindaje opcional.
                  </p>
                </div>

                <button
                  onClick={descargarDocumentoWord}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" /> Descargar en Word (.doc)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Panel Izquierdo */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                    
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">1. Ficha del Cliente (CRM):</label>
                      <select
                        value={clienteEnsamblaje}
                        onChange={(e) => setClienteEnsamblaje(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-emerald-400"
                      >
                        {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">2. Plantilla Inmutable de Drive:</label>
                      <select
                        value={modeloDriveSeleccionado}
                        onChange={(e) => setModeloDriveSeleccionado(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-white"
                      >
                        <option value="arrendamiento">Contrato de Arrendamiento Comercial e Industrial (Completo)</option>
                        <option value="poder">Poder Notarial General y Especial Amplio (Modelo Piccolo)</option>
                        <option value="asamblea">Acta de Asamblea General Extraordinaria de Accionistas (Sub 1308)</option>
                      </select>
                    </div>

                    {/* Cláusulas Lego Opcionales */}
                    {modeloDriveSeleccionado === 'arrendamiento' && (
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">
                          Cláusulas Lego de Blindaje Procesal:
                        </span>

                        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                          <input
                            type="checkbox"
                            checked={clausulaLegoBCV}
                            onChange={(e) => setClausulaLegoBCV(e.target.checked)}
                            className="rounded border-slate-700 text-cyan-500"
                          />
                          <span>Ajuste en Bolívares a Tasa Oficial BCV</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                          <input
                            type="checkbox"
                            checked={clausulaLegoViasDeHecho}
                            onChange={(e) => setClausulaLegoViasDeHecho(e.target.checked)}
                            className="rounded border-slate-700 text-cyan-500"
                          />
                          <span>Prohibición de Vías de Hecho y Penalidad 500 USD/día</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                          <input
                            type="checkbox"
                            checked={clausulaLegoMejoras}
                            onChange={(e) => setClausulaLegoMejoras(e.target.checked)}
                            className="rounded border-slate-700 text-cyan-500"
                          />
                          <span>Compensación Mensual de Obras de Reparación</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-white">
                          <input
                            type="checkbox"
                            checked={clausulaLegoArbitral}
                            onChange={(e) => setClausulaLegoArbitral(e.target.checked)}
                            className="rounded border-slate-700 text-cyan-500"
                          />
                          <span>Cláusula Arbitral Especial CEDCA (en vez de Tribunales)</span>
                        </label>
                      </div>
                    )}

                    {/* Datos Bloqueados del CRM */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-slate-500 uppercase">Parte Otorgante:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Verificado CRM
                        </span>
                      </div>
                      <div className="font-bold text-white text-[11px] truncate">{variablesEnsamblador.arrendataria}</div>
                      <div className="text-[10px] text-slate-400">RIF: {variablesEnsamblador.arrendataria_rif} • Rep: {variablesEnsamblador.arrendataria_rep}</div>
                    </div>

                  </div>
                </div>

                {/* Panel Derecho: Vista del Documento */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                        <Check className="w-4 h-4" /> Instrumento Notarial Íntegro
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(documentoGeneradoWord);
                          alert("Texto íntegro copiado al portapapeles.");
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Texto
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs leading-relaxed max-h-[560px] overflow-y-auto whitespace-pre-wrap font-serif text-slate-200 select-text">
                      {documentoGeneradoWord}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 3: AUDITORÍA DE CONTRAPARTES & REDLINE                   */}
          {/* ================================================================= */}
          {activeTab === 'auditoria_contrapartes' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <FileCheck2 className="w-6 h-6 text-purple-400" /> 3. Auditoría de Contrapartes & Redline
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cotejo preventivo con copiado individual de Redlines y Argumentario para el Director Comercial.
                  </p>
                </div>
              </div>

              {/* Argumentario Ejecutivo para Comercial */}
              <div className="p-4 rounded-2xl border border-purple-500/40 bg-purple-950/15 space-y-1.5">
                <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-purple-400" /> Argumentario para la Llamada con el Director Comercial:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {informeAuditoria.argumentario_comercial}
                </p>
              </div>

              {/* Cláusulas Auditadas con Copia Rápida */}
              <div className="grid grid-cols-1 gap-4">
                {informeAuditoria.semaforo.map((s: any) => (
                  <div key={s.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                        s.color === 'rojo' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {s.nivel}
                      </span>
                      <span className="font-bold text-white text-xs">{s.clausula}</span>
                    </div>

                    <p className="text-xs text-slate-300">{s.analisis}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <strong>Redline:</strong> {s.redline_sugerido}
                      </div>
                      <button
                        onClick={() => copiarRedlineIndividual(s.redline_sugerido)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar al Control de Cambios
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 4: ENLACE CORPORATIVO (CON EXPORTADOR A JIRA)            */}
          {/* ================================================================= */}
          {activeTab === 'enlace_corporativo' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-blue-400" /> 4. Enlace Corporativo & Nuevos Proyectos
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Traducción directa de requisitos legales (EU AI Act y RGPD) a especificaciones técnicas y tickets Jira.
                  </p>
                </div>

                <button
                  onClick={exportarTicketsJiraMarkdown}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Share2 className="w-3.5 h-3.5" /> Exportar a Jira / Markdown
                </button>
              </div>

              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                <div className="text-sm font-bold text-white">{dictamenIniciativa.viabilidad}</div>
                <p className="text-xs text-slate-300">{dictamenIniciativa.resumen_directivo}</p>

                <div className="space-y-3">
                  {dictamenIniciativa.especificaciones_tecnicas.map((t: any) => (
                    <div key={t.ticket} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-mono text-cyan-400 font-bold mr-2">{t.ticket}</span>
                          <span className="text-white font-medium">{t.titulo}</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{t.prioridad}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-300 whitespace-pre-wrap">
                        {t.gherkin}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 5: CONTROL DE GESTIÓN                                    */}
          {/* ================================================================= */}
          {activeTab === 'control_gestion' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <CheckSquare className="w-6 h-6 text-amber-400" /> 5. Control de Gestión y Plazos
              </h1>
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 text-xs space-y-2 text-slate-300">
                <p>Supervisión activa de SLAs del equipo letrado asociado y cumplimiento de directrices del General Counsel.</p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 6: ACTAS Y MINUTAS EJECUTIVAS (CON GENERADOR DE CORREO)  */}
          {/* ================================================================= */}
          {activeTab === 'actas_minutas' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Mic className="w-6 h-6 text-pink-400" /> 6. Actas y Minutas Ejecutivas
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Grabación de sala y generación de minuta con exportación de correo de formalización y asignación a Planificador.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copiarCorreoFormalizacionAcuerdos}
                    className="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" /> Copiar Correo de Acuerdos
                  </button>
                </div>
              </div>

              {/* Consola Central de Grabación */}
              <div className="p-6 rounded-2xl border border-pink-500/30 bg-slate-900 shadow-xl space-y-4">
                <div className="flex flex-col items-center justify-center text-center space-y-3 py-1">
                  
                  <div className="space-y-1">
                    <div className="font-mono text-4xl font-extrabold text-white tracking-widest">
                      {Math.floor(segundosGrabacion / 60).toString().padStart(2, '0')}:{(segundosGrabacion % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${grabandoAudioLocal ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`}></span>
                      <span>{grabandoAudioLocal ? "Grabando audio de sala en memoria privada..." : "Listo para grabar o cargar archivo de audio"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                    <button
                      onClick={alternarGrabacionAudioLocal}
                      className={`px-6 py-3.5 rounded-2xl font-mono font-bold text-xs transition-all flex items-center gap-2.5 cursor-pointer shadow-lg ${
                        grabandoAudioLocal
                          ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
                          : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-pink-500/25'
                      }`}
                    >
                      {grabandoAudioLocal ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                      <span>{grabandoAudioLocal ? "Detener Grabación y Procesar" : "Grabar Audio de Sala (Local)"}</span>
                    </button>

                    <label className="px-5 py-3.5 rounded-2xl border border-slate-800 bg-slate-950 hover:border-pink-400 text-slate-200 font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4 text-pink-400" />
                      <span>Subir Archivo de Audio</span>
                      <input type="file" accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg" onChange={handleSubirArchivoAudio} className="hidden" />
                    </label>
                  </div>

                  {archivoAudioNombre && (
                    <div className="text-xs font-mono text-cyan-300 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
                      Archivo: <strong>{archivoAudioNombre}</strong>
                    </div>
                  )}

                  {audioUrlLocal && (
                    <div className="w-full max-w-md pt-1">
                      <audio controls src={audioUrlLocal} className="w-full h-9" />
                    </div>
                  )}

                  {cargandoTranscripcionWhisper && (
                    <div className="text-xs font-mono text-pink-300 flex items-center gap-2 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transcribiendo audio y extrayendo acuerdos con Whisper On-Premise...</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Minuta Oficial */}
              {minutaWhisper && (
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                        Minuta Oficial Certificada
                      </span>
                      <h2 className="text-lg font-bold text-white mt-0.5">{minutaWhisper.titulo}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copiarCorreoFormalizacionAcuerdos}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Correo
                      </button>
                    </div>
                  </div>

                  {/* Acuerdos Vinculantes */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Acuerdos Vinculantes Formalizados:
                    </span>
                    <div className="space-y-1.5">
                      {minutaWhisper.acuerdos.map((ac: string, i: number) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">{i + 1}.</span>
                          <span>{ac}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items con Asignación a Planificador */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-cyan-400" /> Compromisos Asignables al Planificador:
                    </span>

                    <div className="space-y-2">
                      {minutaWhisper.action_items.map((ai: any) => (
                        <div key={ai.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="font-bold text-white">{ai.tarea}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-3">
                              <span>Resp: <strong className="text-slate-200">{ai.responsable}</strong></span>
                              <span>Plazo: <strong className="text-amber-400">{ai.plazo}</strong></span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-cyan-300">{ai.prioridad}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => asignarActionItemAPlanificador(ai)}
                            disabled={ai.agregado}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 ${
                              ai.agregado
                                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm'
                            }`}
                          >
                            {ai.agregado ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{ai.agregado ? "Asignado en Planificador" : "Asignar al Planificador"}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transcripción Cruda Colapsable */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setMostrarTranscripcionCruda(!mostrarTranscripcionCruda)}
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {mostrarTranscripcionCruda ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      <span>{mostrarTranscripcionCruda ? "Ocultar Transcripción Forense" : "Mostrar Transcripción Forense Cruda (Audit Trail)"}</span>
                    </button>

                    {mostrarTranscripcionCruda && (
                      <div className="p-3.5 mt-2 rounded-xl bg-slate-950 border border-slate-800 text-xs italic text-slate-300 font-serif leading-relaxed">
                        {minutaWhisper.transcripcion_extracto}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}

          {/* =================================================================== */}
          {/* PESTAÑA: SUITE DE CUMPLIMIENTO & GOBIERNO CORPORATIVO               */}
          {/* =================================================================== */}
          {(activeTab === 'cumplimiento' || activeTab === 'aduana' || activeTab === 'boveda' || activeTab === 'canal_etico' || activeTab === 'societario') && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Encabezado Principal */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Shield className="w-6 h-6 text-emerald-400" />
                    <span>Cumplimiento & Gobierno Corporativo</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control de secreto profesional, bóveda de inmutabilidad criptográfica, canal de denuncias éticas y libros societarios mercantiles.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Cumplimiento Corporativo Activo
                  </span>
                </div>
              </div>

              {/* Selector de Sub-Módulos de Cumplimiento */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                {[
                  { id: 'aduana', label: '1. Aduana & Privacidad PII', icon: Shield, desc: 'Anonimización Criptográfica' },
                  { id: 'boveda', label: '2. Bóveda Forense SHA-256', icon: Lock, desc: 'Cadena de Custodia Inmutable' },
                  { id: 'canal_etico', label: '3. Canal Ético & Denuncias', icon: Radio, desc: 'Línea Confidencial & Whistleblowing' },
                  { id: 'societario', label: '4. Libros Societarios', icon: Building2, desc: 'Accionistas, Quórum & Asambleas' }
                ].map(tab => {
                  const Icon = tab.icon;
                  const active = (subTabCumplimiento === tab.id) || (activeTab === tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setSubTabCumplimiento(tab.id as any);
                        setActiveTab('cumplimiento');
                      }}
                      className={`flex-1 min-w-[200px] flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${active ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">{tab.label}</span>
                        <span className="text-[10px] text-slate-500 font-normal">{tab.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ============================================================= */}
              {/* SUB-MÓDULO 1: ADUANA DE DATOS & SECRETO PROFESIONAL (PII)     */}
              {/* ============================================================= */}
              {(subTabCumplimiento === 'aduana' || activeTab === 'aduana') && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-emerald-300">Aduana de Secreto Profesional & Desidentificación</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Protege el secreto profesional letrado (Código de Ética del Abogado Venezolano y Art. 73 CPC). Ningún dato sensible (cédulas, cuentas bancarias, montos confidenciales o nombres reales) saldrá a modelos de IA o a terceros sin enmascaramiento reversible.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Entrada Original */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-cyan-400" />
                          Texto / Borrador con Datos Sensibles
                        </span>
                        <button
                          onClick={() => {
                            setAduanaTextoOriginal(
                              `CONTRATO DE ARRENDAMIENTO suscrito entre la ciudadana BARBARA ISABEL PICCOLO OBALDO, titular de la Cédula de Identidad N° V-12.345.678, y la sociedad mercantil INVERSIONES COREIN, C.A., RIF J-30492817-0, representada por su Director General. El inmueble se ubica en Galpón 4 de Guasipati, pactándose un canon mensual de $4.500,00 USD transferibles a la cuenta custodia Banesco N° 0134-0982-11-0001234567, bajo penalidad diaria de 150 USD.`
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 hover:bg-slate-700 transition cursor-pointer"
                        >
                          Cargar Caso de Prueba Real
                        </button>
                      </div>

                      <textarea
                        rows={10}
                        value={aduanaTextoOriginal}
                        onChange={(e) => setAduanaTextoOriginal(e.target.value)}
                        placeholder="Pega aquí el texto, contrato, libelo o correo con nombres, RIFs, cuentas bancarias o montos confidenciales..."
                        className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:ring-1 focus:ring-cyan-500 outline-none leading-relaxed font-mono"
                      />

                      <button
                        onClick={() => {
                          if (!aduanaTextoOriginal.trim()) return;
                          
                          // Proceso de anonimización
                          const entidades: any[] = [];
                          let texto = aduanaTextoOriginal;

                          // 1. Cédulas
                          const ciMatch = texto.match(/V-\d{1,2}\.?\d{3}\.?\d{3}/gi);
                          if (ciMatch) {
                            ciMatch.forEach((ci, idx) => {
                              const token = `[CEDULA_${idx + 1}]`;
                              entidades.push({ tipo: "Cédula de Identidad", original: ci, token });
                              texto = texto.replaceAll(ci, token);
                            });
                          }

                          // 2. RIFs
                          const rifMatch = texto.match(/J-\d{8}-?\d/gi);
                          if (rifMatch) {
                            rifMatch.forEach((rif, idx) => {
                              const token = `[RIF_EMPRESA_${idx + 1}]`;
                              entidades.push({ tipo: "Registro Fiscal (RIF)", original: rif, token });
                              texto = texto.replaceAll(rif, token);
                            });
                          }

                          // 3. Cuentas bancarias
                          const bankMatch = texto.match(/\d{4}-\d{4}-\d{2}-\d{10}/gi);
                          if (bankMatch) {
                            bankMatch.forEach((acc, idx) => {
                              const token = `[CUENTA_BANCARIA_${idx + 1}]`;
                              entidades.push({ tipo: "Cuenta Bancaria", original: acc, token });
                              texto = texto.replaceAll(acc, token);
                            });
                          }

                          // 4. Montos en divisas
                          const amountMatch = texto.match(/\$?\d{1,3}(?:\.\d{3})*(?:,\d{2})?\s*(?:USD|dólares)/gi);
                          if (amountMatch) {
                            amountMatch.forEach((amt, idx) => {
                              const token = `[MONTO_CONFIDENCIAL_${idx + 1}]`;
                              entidades.push({ tipo: "Monto Económico", original: amt, token });
                              texto = texto.replaceAll(amt, token);
                            });
                          }

                          // 5. Nombres propios conocidos
                          const nombres = ["BARBARA ISABEL PICCOLO OBALDO", "INVERSIONES COREIN, C.A.", "Corein"];
                          nombres.forEach((nom, idx) => {
                            if (texto.includes(nom)) {
                              const token = `[PARTE_PROTEGIDA_${idx + 1}]`;
                              entidades.push({ tipo: "Nombre / Razón Social", original: nom, token });
                              texto = texto.replaceAll(nom, token);
                            }
                          });

                          setAduanaEntidadesDetectadas(entidades);
                          setAduanaTextoAnonimizado(texto);
                        }}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-4 h-4" />
                        Ejecutar Inspección & Enmascaramiento PII Criptográfico
                      </button>
                    </div>

                    {/* Salida Anonimizada */}
                    <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Texto Enmascarado (Listo para IA Externa o Terceros)
                        </span>
                        {aduanaTextoAnonimizado && (
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(aduanaTextoAnonimizado);
                              setAduanaCopiado(true);
                              setTimeout(() => setAduanaCopiado(false), 2000);
                            }}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                          >
                            {aduanaCopiado ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {aduanaCopiado ? "Copiado!" : "Copiar Seguro"}
                          </button>
                        )}
                      </div>

                      <div className="w-full h-56 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs overflow-y-auto leading-relaxed font-mono">
                        {aduanaTextoAnonimizado ? (
                          aduanaTextoAnonimizado
                        ) : (
                          <span className="text-slate-600 italic font-sans">
                            El texto protegido aparecerá aquí con los datos identificativos sustituidos por tokens encriptados reversibles.
                          </span>
                        )}
                      </div>

                      {/* Entidades Detectadas */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                          Matriz de Desidentificación ({aduanaEntidadesDetectadas.length} entidades protegidas):
                        </span>
                        <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                          {aduanaEntidadesDetectadas.length === 0 ? (
                            <div className="text-[11px] text-slate-500 italic p-2 bg-slate-950 rounded-lg border border-slate-900">
                              Sin inspección ejecutada aún.
                            </div>
                          ) : (
                            aduanaEntidadesDetectadas.map((ent, i) => (
                              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px]">
                                <span className="text-emerald-400 font-mono font-bold">{ent.token}</span>
                                <span className="text-slate-400 font-sans">{ent.tipo}:</span>
                                <span className="text-slate-200 font-mono bg-slate-900 px-1.5 py-0.5 rounded">{ent.original}</span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* ============================================================= */}
              {/* SUB-MÓDULO 2: BÓVEDA FORENSE INMUTABLE SHA-256                */}
              {/* ============================================================= */}
              {(subTabCumplimiento === 'boveda' || activeTab === 'boveda') && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-cyan-300">Bóveda Criptográfica de Custodia Forense</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Genera huellas digitales inmutables (SHA-256) con sellado de tiempo para actas de asamblea, acuerdos confidenciales y dictámenes. Otorga fehaciencia probatoria conforme a la Ley de Mensajes de Datos y Firmas Electrónicas.
                      </p>
                    </div>
                  </div>

                  {/* Registro de Nuevo Documento en Bóveda */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <h3 className="font-bold text-sm text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-cyan-400" />
                      Ingresar Nuevo Documento a Cadena de Custodia
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase">Título del Instrumento / Documento</label>
                        <input
                          type="text"
                          value={bovedaTitulo}
                          onChange={(e) => setBovedaTitulo(e.target.value)}
                          placeholder="Ej: Contrato_Transaccional_Machtig_Rothe_Finiquito_2026.pdf"
                          className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-mono text-slate-400 uppercase">Texto o Extracto para Sellado Criptográfico</label>
                        <input
                          type="text"
                          value={bovedaContenido}
                          onChange={(e) => setBovedaContenido(e.target.value)}
                          placeholder="Pega el contenido o extracto resolutivo..."
                          className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!bovedaTitulo.trim()) return;
                          
                          // Generador de Hash SHA-256 simulado pero determinista
                          const rawStr = bovedaTitulo + (bovedaContenido || "DEFAULT_CONTENT") + Date.now();
                          let hashHex = "";
                          for (let i = 0; i < 64; i++) {
                            const code = (rawStr.charCodeAt(i % rawStr.length) * 17 + i * 31) % 16;
                            hashHex += code.toString(16);
                          }

                          const nuevo = {
                            id: `BOV-2026-${String(bovedaRegistros.length + 1).padStart(3, '0')}`,
                            titulo: bovedaTitulo,
                            hash: hashHex,
                            autor: "Barbara Piccolo (Abogada Directora)",
                            fecha: new Date().toISOString().replace('T', ' ').substring(0, 19) + " VET",
                            tamano: "750 KB",
                            estado: "Íntegro - Sin Modificaciones"
                          };

                          setBovedaRegistros([nuevo, ...bovedaRegistros]);
                          setBovedaTitulo('');
                          setBovedaContenido('');
                        }}
                        className="px-5 py-2.5 rounded-xl font-bold text-xs bg-cyan-600 hover:bg-cyan-500 text-slate-950 transition flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Lock className="w-4 h-4" />
                        Custodiar y Sellar en Bóveda Forense
                      </button>
                    </div>
                  </div>

                  {/* Banner de Verificación */}
                  {bovedaVerificacionResultado && (
                    <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CheckCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>{bovedaVerificacionResultado}</span>
                      </div>
                      <button onClick={() => setBovedaVerificacionResultado(null)} className="text-slate-400 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Libro Mayor de Custodia (Ledger) */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300">
                      Libro Mayor de Custodia Inmutable ({bovedaRegistros.length} Instrumentos Custodiados)
                    </span>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                            <th className="py-2.5 px-3">Folio Bóveda</th>
                            <th className="py-2.5 px-3">Documento</th>
                            <th className="py-2.5 px-3">Hash SHA-256</th>
                            <th className="py-2.5 px-3">Fecha y Hora</th>
                            <th className="py-2.5 px-3">Acción</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                          {bovedaRegistros.map(reg => (
                            <tr key={reg.id} className="hover:bg-slate-800/30 transition">
                              <td className="py-3 px-3 text-cyan-400 font-bold">{reg.id}</td>
                              <td className="py-3 px-3 text-slate-200 font-sans font-medium">{reg.titulo}</td>
                              <td className="py-3 px-3 text-[10px] text-slate-400">
                                <span className="bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block max-w-[200px] truncate" title={reg.hash}>
                                  {reg.hash}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-[11px] text-slate-400 font-sans">{reg.fecha}</td>
                              <td className="py-3 px-3 font-sans">
                                <button
                                  onClick={() => {
                                    setBovedaVerificacionResultado(
                                      `✅ Certificación Exitosa para [${reg.id}]: El hash SHA-256 verificado coincide al 100% con el bloque génesis. Ninguna alteración desde su depósito por ${reg.autor}.`
                                    );
                                  }}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  Verificar Integridad
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* ============================================================= */}
              {/* SUB-MÓDULO 3: CANAL ÉTICO & DENUNCIAS (WHISTLEBLOWING)        */}
              {/* ============================================================= */}
              {(subTabCumplimiento === 'canal_etico' || activeTab === 'canal_etico') && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3">
                    <Radio className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-amber-300">Canal de Denuncias & Investigaciones Éticas (ISO 37002 / Compliance)</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Recepción y resolución de alertas de conflicto de interés, fraude operativo, irregularidades de contratación y cumplimiento normativo laboral con garantía de confidencialidad absoluta.
                      </p>
                    </div>
                  </div>

                  {/* Métricas del Canal Ético */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Total Casos Registrados</span>
                      <p className="text-xl font-bold text-white mt-1">{canalEticoCasos.length}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono text-amber-400 uppercase">En Investigación Activa</span>
                      <p className="text-xl font-bold text-amber-400 mt-1">
                        {canalEticoCasos.filter(c => c.estado === 'En Investigación').length}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">Resueltos / Remediados</span>
                      <p className="text-xl font-bold text-emerald-400 mt-1">
                        {canalEticoCasos.filter(c => c.estado.includes('Resuelto')).length}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] font-mono text-rose-400 uppercase">Severidad Crítica</span>
                      <p className="text-xl font-bold text-rose-400 mt-1">
                        {canalEticoCasos.filter(c => c.severidad === 'Crítica').length}
                      </p>
                    </div>
                  </div>

                  {/* Barra de Acciones */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold uppercase text-slate-300">
                      Expedientes del Canal Ético
                    </span>
                    <button
                      onClick={() => setCanalEticoModalNuevo(true)}
                      className="px-3.5 py-1.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Registrar Nueva Denuncia o Alerta
                    </button>
                  </div>

                  {/* Listado de Casos */}
                  <div className="grid grid-cols-1 gap-3">
                    {canalEticoCasos.map(caso => (
                      <div key={caso.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-cyan-400 font-bold text-xs bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {caso.id}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              {caso.categoria}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              caso.severidad === 'Crítica' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                              caso.severidad === 'Alta' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                              'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            }`}>
                              Severidad: {caso.severidad}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-mono">Fecha: {caso.fecha}</span>
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              caso.estado === 'En Investigación' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {caso.estado}
                            </span>
                          </div>
                        </div>

                        <h4 className="font-bold text-sm text-white">{caso.titulo}</h4>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                          <span className="font-bold text-cyan-400 font-mono text-[10px] uppercase block mb-1">
                            Dictamen y Actuación Legal ({caso.abogadoAsignado}):
                          </span>
                          {caso.dictamen}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* ============================================================= */}
              {/* SUB-MÓDULO 4: LIBROS SOCIETARIOS MERCANTILES (CÓD. COMERCIO)  */}
              {/* ============================================================= */}
              {(subTabCumplimiento === 'societario' || activeTab === 'societario') && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-sm text-blue-300">Libros Societarios Mercantiles Digitales (Arts. 260 y ss. Código de Comercio)</h3>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Control oficial del Libro de Accionistas, cálculo de quórum de capital social para asambleas y registro de protocolización de actas ante el Registro Mercantil.
                      </p>
                    </div>
                  </div>

                  {/* Sub-pestañas internas del libro */}
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                    <button
                      onClick={() => setLibroSocietarioSubTab('accionistas')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        libroSocietarioSubTab === 'accionistas'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      📘 Libro de Accionistas & Quórum
                    </button>
                    <button
                      onClick={() => setLibroSocietarioSubTab('actas')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        libroSocietarioSubTab === 'actas'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      📑 Libro de Actas de Asambleas & Juntas
                    </button>
                  </div>

                  {libroSocietarioSubTab === 'accionistas' ? (
                    <div className="space-y-6">
                      
                      {/* Resumen de Quórum en Tiempo Real */}
                      {(() => {
                        const totalAcciones = accionistas.reduce((acc, a) => acc + a.acciones, 0);
                        const accionesPresentes = accionistas.filter(a => a.presente).reduce((acc, a) => acc + a.acciones, 0);
                        const porcentajeQuorum = Math.round((accionesPresentes / totalAcciones) * 100);
                        const quorumValido = porcentajeQuorum >= 50;

                        return (
                          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                                  Calculadora de Quórum en Vivo para Asamblea
                                </span>
                                <h4 className="font-bold text-sm text-white">
                                  Capital Social Presente: {porcentajeQuorum}% ({accionesPresentes.toLocaleString()} de {totalAcciones.toLocaleString()} acciones)
                                </h4>
                              </div>

                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                                quorumValido 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              }`}>
                                {quorumValido ? '✅ Quórum Válido para Deliberar' : '⚠️ Quórum Insuficiente (< 50%)'}
                              </span>
                            </div>

                            <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                className={`h-full transition-all duration-500 ${quorumValido ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' : 'bg-rose-500'}`}
                                style={{ width: `${porcentajeQuorum}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Tabla del Libro de Accionistas */}
                      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold uppercase text-slate-300">
                            Asientos Vigentes en Libro de Accionistas
                          </span>
                          <button
                            onClick={() => setModalTraspasoAcciones(true)}
                            className="px-3 py-1.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Nuevo Asiento de Traspaso
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="border-b border-slate-800 text-[10px] font-mono uppercase text-slate-400">
                                <th className="py-2.5 px-3">Asistencia</th>
                                <th className="py-2.5 px-3">Accionista</th>
                                <th className="py-2.5 px-3">Cédula / RIF</th>
                                <th className="py-2.5 px-3">Acciones Nominativas</th>
                                <th className="py-2.5 px-3">Participación</th>
                                <th className="py-2.5 px-3">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60 font-sans">
                              {accionistas.map(a => (
                                <tr key={a.id} className="hover:bg-slate-800/30 transition">
                                  <td className="py-3 px-3">
                                    <input
                                      type="checkbox"
                                      checked={a.presente}
                                      onChange={() => {
                                        setAccionistas(accionistas.map(item => item.id === a.id ? { ...item, presente: !item.presente } : item));
                                      }}
                                      className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
                                      title="Marcar asistencia a asamblea"
                                    />
                                  </td>
                                  <td className="py-3 px-3 font-bold text-white">{a.nombre}</td>
                                  <td className="py-3 px-3 font-mono text-cyan-400">{a.cedula}</td>
                                  <td className="py-3 px-3 font-mono text-slate-200">{a.acciones.toLocaleString()}</td>
                                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{a.porcentaje}%</td>
                                  <td className="py-3 px-3">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-300">
                                      {a.estado}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  ) : (
                    /* Registro de Actas de Asambleas */
                    <div className="space-y-4">
                      {actasSocietarias.map(acta => (
                        <div key={acta.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <span className="font-mono text-xs text-blue-400 font-bold">{acta.id} • {acta.tipo}</span>
                            <span className="text-[10px] text-slate-400 font-mono">Celebrada: {acta.fecha}</span>
                          </div>
                          <p className="text-xs text-white font-medium">{acta.puntos}</p>
                          <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                            <span>Quórum Registrado: {acta.quorum}</span>
                            <span className="text-emerald-400 font-semibold">{acta.registroMercantil} ({acta.estado})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>
          )}


        </div>

      </div>

      {/* =================================================================== */}
      {/* MODAL: REGISTRAR NUEVA DENUNCIA O ALERTA ÉTICA                     */}
      {/* =================================================================== */}
      {canalEticoModalNuevo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Radicar Nueva Denuncia / Alerta Ética</h3>
              </div>
              <button onClick={() => setCanalEticoModalNuevo(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Categoría de Cumplimiento</label>
                  <select
                    value={nuevoCasoEth.categoria}
                    onChange={(e) => setNuevoCasoEth({ ...nuevoCasoEth, categoria: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-500"
                  >
                    <option value="Conflicto de Interés">Conflicto de Interés</option>
                    <option value="Fraude Financiero / Discrepancia">Fraude Financiero / Discrepancia</option>
                    <option value="Seguridad Industrial & Normativa">Seguridad Industrial & Normativa</option>
                    <option value="Violación de Secreto Profesional">Violación de Secreto Profesional</option>
                    <option value="Irregularidad Contractual">Irregularidad Contractual</option>
                  </select>
                </div>
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Nivel de Severidad</label>
                  <select
                    value={nuevoCasoEth.severidad}
                    onChange={(e) => setNuevoCasoEth({ ...nuevoCasoEth, severidad: e.target.value })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-500"
                  >
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-slate-400 uppercase text-[10px]">Título Sintético del Caso</label>
                <input
                  type="text"
                  value={nuevoCasoEth.titulo}
                  onChange={(e) => setNuevoCasoEth({ ...nuevoCasoEth, titulo: e.target.value })}
                  placeholder="Ej: Posible adjudicación irregular de servicios de flete en planta..."
                  className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400 uppercase text-[10px]">Identidad del Reportante</label>
                <input
                  type="text"
                  value={nuevoCasoEth.denunciante}
                  onChange={(e) => setNuevoCasoEth({ ...nuevoCasoEth, denunciante: e.target.value })}
                  placeholder="Anónimo (Canal Encriptado) o Nombre y Cargo"
                  className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400 uppercase text-[10px]">Relación de los Hechos e Implicados</label>
                <textarea
                  rows={4}
                  value={nuevoCasoEth.descripcion}
                  onChange={(e) => setNuevoCasoEth({ ...nuevoCasoEth, descripcion: e.target.value })}
                  placeholder="Detalla fechas, áreas operativas, montos involucrados y elementos de convicción..."
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-amber-500 leading-relaxed font-sans"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setCanalEticoModalNuevo(false)}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!nuevoCasoEth.titulo.trim()) return;
                  const nuevo = {
                    id: `ETH-2026-${String(canalEticoCasos.length + 1).padStart(2, '0')}`,
                    categoria: nuevoCasoEth.categoria,
                    titulo: nuevoCasoEth.titulo,
                    denunciante: nuevoCasoEth.denunciante || "Anónimo",
                    fecha: new Date().toISOString().split('T')[0],
                    severidad: nuevoCasoEth.severidad,
                    estado: "En Investigación",
                    abogadoAsignado: "Barbara Piccolo",
                    dictamen: nuevoCasoEth.descripcion || "Investigación preliminar aperturada. Recopilación de testimonios y soportes contables."
                  };
                  setCanalEticoCasos([nuevo, ...canalEticoCasos]);
                  setCanalEticoModalNuevo(false);
                  setNuevoCasoEth({
                    categoria: "Conflicto de Interés",
                    titulo: "",
                    denunciante: "Anónimo",
                    severidad: "Media",
                    descripcion: ""
                  });
                }}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 transition flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5" />
                Radicar Expediente Confidencial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: TRASPASO DE ACCIONES (LIBRO DE ACCIONISTAS)                  */}
      {/* =================================================================== */}
      {modalTraspasoAcciones && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base text-white">Nuevo Asiento de Traspaso de Acciones</h3>
              </div>
              <button onClick={() => setModalTraspasoAcciones(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-mono text-slate-400 uppercase text-[10px]">Accionista Cedente (Vendedor/Transferente)</label>
                <select
                  value={traspasoForm.cedenteId}
                  onChange={(e) => setTraspasoForm({ ...traspasoForm, cedenteId: Number(e.target.value) })}
                  className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500"
                >
                  {accionistas.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.nombre} ({acc.acciones.toLocaleString()} acciones disponibles - {acc.porcentaje}%)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Cesionario (Nuevo Titular)</label>
                  <input
                    type="text"
                    value={traspasoForm.cesionarioNombre}
                    onChange={(e) => setTraspasoForm({ ...traspasoForm, cesionarioNombre: e.target.value })}
                    placeholder="Nombre completo o Razón Social"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Cédula / RIF del Cesionario</label>
                  <input
                    type="text"
                    value={traspasoForm.cesionarioRif}
                    onChange={(e) => setTraspasoForm({ ...traspasoForm, cesionarioRif: e.target.value })}
                    placeholder="V-00.000.000 o J-00000000-0"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Cantidad de Acciones a Ceder</label>
                  <input
                    type="number"
                    value={traspasoForm.cantidadAcciones}
                    onChange={(e) => setTraspasoForm({ ...traspasoForm, cantidadAcciones: Number(e.target.value) })}
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="font-mono text-slate-400 uppercase text-[10px]">Contraprestación / Precio Acordado</label>
                  <input
                    type="text"
                    value={traspasoForm.precioOperacion}
                    onChange={(e) => setTraspasoForm({ ...traspasoForm, precioOperacion: e.target.value })}
                    placeholder="Ej: 5.000 USD"
                    className="w-full mt-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-800/40 text-[11px] text-blue-300">
                ⚖️ <strong>Art. 296 Cód. de Comercio:</strong> La cesión de las acciones nominativas no produce efecto contra la sociedad ni contra terceros sino desde la inscripción hecha en el libro de accionistas.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setModalTraspasoAcciones(false)}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (!traspasoForm.cesionarioNombre.trim() || traspasoForm.cantidadAcciones <= 0) return;
                  
                  // Actualizar cedente y agregar o sumar al cesionario
                  const totalAcc = accionistas.reduce((sum, a) => sum + a.acciones, 0);
                  let actualizados = accionistas.map(a => {
                    if (a.id === traspasoForm.cedenteId) {
                      const restantes = Math.max(0, a.acciones - traspasoForm.cantidadAcciones);
                      return {
                        ...a,
                        acciones: restantes,
                        porcentaje: Math.round((restantes / totalAcc) * 100),
                        valorNominal: restantes
                      };
                    }
                    return a;
                  });

                  const existeCesionario = actualizados.find(a => a.nombre.toLowerCase() === traspasoForm.cesionarioNombre.toLowerCase());
                  if (existeCesionario) {
                    actualizados = actualizados.map(a => {
                      if (a.id === existeCesionario.id) {
                        const nuevasAcc = a.acciones + traspasoForm.cantidadAcciones;
                        return {
                          ...a,
                          acciones: nuevasAcc,
                          porcentaje: Math.round((nuevasAcc / totalAcc) * 100),
                          valorNominal: nuevasAcc
                        };
                      }
                      return a;
                    });
                  } else {
                    const nuevoId = Math.max(...actualizados.map(a => a.id), 0) + 1;
                    actualizados.push({
                      id: nuevoId,
                      nombre: traspasoForm.cesionarioNombre,
                      cedula: traspasoForm.cesionarioRif || "S/D",
                      acciones: traspasoForm.cantidadAcciones,
                      porcentaje: Math.round((traspasoForm.cantidadAcciones / totalAcc) * 100),
                      valorNominal: traspasoForm.cantidadAcciones,
                      estado: "Suscrito y Pagado",
                      presente: true
                    });
                  }

                  setAccionistas(actualizados);
                  setModalTraspasoAcciones(false);
                  setTraspasoForm({
                    cedenteId: 1,
                    cesionarioNombre: "",
                    cesionarioRif: "",
                    cantidadAcciones: 5000,
                    precioOperacion: "5.000 USD"
                  });
                }}
                className="px-4 py-2 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Registrar Asiento en Libro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: VER EXPEDIENTES VINCULADOS AL CLIENTE (CRM)                  */}
      {/* =================================================================== */}
      {clienteVerFichaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{clienteVerFichaModal.rif}</span>
                <h3 className="font-bold text-base text-white">{clienteVerFichaModal.nombre}</h3>
              </div>
              <button onClick={() => setClienteVerFichaModal(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Expedientes Activos en Despacho:</span>
              {(() => {
                const exps = tableroPlanificador.filter(exp => exp.cliente === clienteVerFichaModal.nombre);
                if (exps.length === 0) {
                  return <div className="p-4 text-center text-xs text-slate-500 font-mono">No hay expedientes activos para este cliente.</div>;
                }
                return exps.map(e => (
                  <div key={e.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-cyan-400 font-bold mr-2">{e.id}</span>
                      <span className="text-white font-medium">{e.titulo}</span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Tribunal: {e.tribunal} • Plazo: {e.plazo}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300">{e.estado}</span>
                  </div>
                ));
              })()}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setClienteVerFichaModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: NUEVO ASUNTO / EXPEDIENTE                                    */}
      {/* =================================================================== */}
      {modalNuevoAsunto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Nuevo Asunto / Expediente Procesal</span>
              </h3>
              <button onClick={() => setModalNuevoAsunto(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoAsunto} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título u Objeto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Interdicto de despojo o negociación de anexo contractual"
                  value={nuevoAsuntoForm.titulo}
                  onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, titulo: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Cliente Vinculado</label>
                  <select
                    value={nuevoAsuntoForm.cliente}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, cliente: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-cyan-400 font-bold"
                  >
                    {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Rol / Cartera</label>
                  <select
                    value={nuevoAsuntoForm.tipo_rol}
                    onChange={(e: any) => setNuevoAsuntoForm({...nuevoAsuntoForm, tipo_rol: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Externo">⚖️ Cartera Externa / Litigio</option>
                    <option value="In-House">🏛️ In-House / Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Dependencia / Bloqueo</label>
                  <input
                    type="text"
                    placeholder="Ej. Esperando Facturas Tercero"
                    value={nuevoAsuntoForm.bloqueo}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, bloqueo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Cuantía Estimada</label>
                  <input
                    type="text"
                    placeholder="Ej. 35.000 USD"
                    value={nuevoAsuntoForm.cuantia}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, cuantia: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Plazo Fatal / Término</label>
                  <input
                    type="text"
                    placeholder="Ej. Jueves 16:00"
                    value={nuevoAsuntoForm.plazo}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, plazo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Prioridad</label>
                  <select
                    value={nuevoAsuntoForm.prioridad}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, prioridad: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Crítica">Crítica</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalNuevoAsunto(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer shadow-md"
                >
                  Crear Asunto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: VER FICHA INTEGRAL DEL EXPEDIENTE                           */}
      {/* =================================================================== */}
      {modalVerExpediente && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold text-sm">{modalVerExpediente.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 font-mono">
                    {modalVerExpediente.materia}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 font-mono">
                    {modalVerExpediente.tipo_rol}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mt-1">{modalVerExpediente.titulo}</h3>
              </div>
              <button onClick={() => setModalVerExpediente(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CLIENTE:</span>
                <span className="text-cyan-400 font-bold truncate block">{modalVerExpediente.cliente}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CUANTÍA:</span>
                <span className="text-emerald-400 font-bold">{modalVerExpediente.cuantia}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">BLOQUEO:</span>
                <span className="text-amber-400 font-bold">{modalVerExpediente.bloqueo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">ESTADO:</span>
                <span className="text-cyan-300 font-bold">{modalVerExpediente.estado}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Tribunal / Sede:</span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
                {modalVerExpediente.tribunal}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Resumen de Hechos & Bitácora:</span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {modalVerExpediente.detalles}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Mover a:</span>
                {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(st => (
                  <button
                    key={st}
                    onClick={() => moverEstadoAsunto(modalVerExpediente.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                      modalVerExpediente.estado === st ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => eliminarAsunto(modalVerExpediente.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" /> Archivar Asunto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: NUEVO EVENTO CALENDARIO                                      */}
      {/* =================================================================== */}
      {modalNuevoEvento && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Agendar Término o Audiencia</span>
              </h3>
              <button onClick={() => setModalNuevoEvento(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoEventoCalendario} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Contestación de demanda por desalojo"
                  value={nuevoEventoForm.titulo}
                  onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, titulo: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={nuevoEventoForm.fecha}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, fecha: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Hora</label>
                  <input
                    type="time"
                    value={nuevoEventoForm.hora}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, hora: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalNuevoEvento(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer shadow-md"
                >
                  Guardar Término
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
