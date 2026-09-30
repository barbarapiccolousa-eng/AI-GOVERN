# 🛡️ AI GOVERN • Enterprise Legal OS

> **The Sovereign Legal Operating System & Zero-Trust AI Gateway for In-House Tech Counsel, Corporate Departments, and International Law.**  
> *Founder & General Counsel: Barbara Piccolo • Madrid · Miami · Caracas*

[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Qdrant](https://img.shields.io/badge/VectorDB-Qdrant-DC2626)](https://qdrant.tech/)
[![Compliance](https://img.shields.io/badge/Compliance-EU%20AI%20Act%20%26%20RGPD-10B981)](https://aigovern.space)
[![Security](https://img.shields.io/badge/Architecture-Zero--Trust%20On--Premise-00F0FF)](#)

---

## 🏛️ Propósito y Visión

**AI GOVERN** es la infraestructura privada que lleva la potencia técnica y la experiencia de usuario de **Silicon Valley (estilo Taskade)** a las asesorías jurídicas internas (*In-House Corporate Counsel*) y despachos corporativos que operan en **España (UE), Estados Unidos y Latinoamérica**.

A diferencia de las herramientas genéricas de IA que exponen secretos comerciales a nubes públicas, **AI GOVERN actúa como una aduana local Zero-Trust On-Premise**, garantizando **cero alucinaciones, cero fugas de datos y pleno cumplimiento con el EU AI Act y el RGPD**.

---

## 📐 Arquitectura de los 3 Grandes Pilares

### 📊 PILAR I: DIRECCIÓN, CAIO & MÉTRICAS (Estrategia, Negocio y Consejo)
* **Torre de Control del CAIO:** Asesor directivo de políticas y generador de *Trust Reports* ejecutivos mensuales para el Consejo de Administración.
* **Portal del General Counsel:** Visión panorámica en tiempo real de todos los asuntos, contratos y operaciones de filiales internacionales (España, EE. UU., LatAm).
* **FinOps & Control de Gasto Legal:** Monitor de consumo de cómputo/tokens de IA frente a presupuesto y auditoría automatizada de facturas de despachos externos (*Outside Counsel*).

### 💼 PILAR II: TALLER JURÍDICO CORPORATIVO (El Espacio de Trabajo Diario)
* **[PASO 0] Aduana de Entrada & Anonimizador PII en Memoria:** Sanitización de DNI, nombres de partes, cuentas bancarias y cifras de balance antes de enviar consultas a la IA.
* **Estudio de Redacción Contractual Tech:** Generador asistido y bilingüe de **SaaS MSAs, NDAs mutuos, DPAs con Cláusulas Contractuales Tipo (SCCs), SLAs, EULAs y acuerdos de cesión de IP (PIIAA)**.
* **Hub de Negociación & Playbook Redlining:** Auditoría automática de contratos de contrapartes con detección de alertas rojas (indemnidades ilimitadas, cesión de código) y redlines sugeridos.
* **Calendario de Obligaciones & Alertas:** Notificaciones en tiempo real conectadas a **Slack y WhatsApp** para preavisos de no renovación automática y plazos regulatorios.
* **Secretaría Corporativa & Filiales:** Actas de junta, acuerdos de directorio y control de poderes notariales para sociedades del grupo (SL en España, LLC en EE. UU., SAS en LatAm).
* **Due Diligence, M&A & Data Room Virtual:** Auditoría de activos para rondas de inversión, contratos SAFE y pactos de socios.
* **Biblioteca Maestra & Motor Legal RAG:** Repositorio vectorial privado (Qdrant) con silos estancos por caso y búsqueda semántica en la doctrina propia de la empresa.

### 🛡️ PILAR III: RELACIONES, COMPLIANCE & BLINDAJE ZERO-TRUST (Motor Protector)
* **Ventanilla Legal Interna (Ticketing estilo Clio):** Portal de autoservicio para canalizar consultas de Ventas, Compras y RRHH con diagnósticos de IA validados por el abogado.
* **Torre de Control de Despachos Externos:** Supervisión centralizada de litigios delegados en bufetes locales.
* **Canal Ético & Whistleblowing:** Cumplimiento de la Directiva Europea 2019/1937 y Ley 2/2023 con cifrado de extremo a extremo.
* **Radar Anti-Shadow AI Empresarial:** Monitor de red que detecta y bloquea intentos de fuga de secretos hacia ChatGPT o herramientas públicas.
* **Bóveda Forense Inmutable:** Registro criptográfico sellado en el tiempo con **Hash SHA-256** para certificar debida diligencia ante tribunales o auditorías.

---

## 🚀 Guía de Inicio Rápido (Despliegue en Docker)

### 1. Requisitos Previos
* Docker y Docker Compose instalados en tu equipo o servidor VPS.
* Una clave API de [Groq](https://console.groq.com) (o tu proveedor LLM compatible con OpenAI).

### 2. Poner en marcha en 1 clic
```bash
# 1. Clonar tu repositorio personal
git clone https://github.com/TU-USUARIO-GITHUB/ai-govern-os.git
cd ai-govern-os

# 2. Configurar variables de entorno
cp .env.example .env
# (Edita .env y coloca tu GROQ_API_KEY)

# 3. Levantar con Docker Compose
bash deploy.sh
```

### 3. Enlaces de Acceso Local
* 🌐 **Dashboard Taskade-Style:** `http://localhost:3000`
* ⚙️ **Gateway Swagger API:** `http://localhost:8000/docs`
* 🧠 **Consola Qdrant Vector DB:** `http://localhost:6333/dashboard`

---

## 🔒 Cumplimiento y Garantías
* **Zero Data Retention (ZDR):** Los prompts e inferencias nunca son almacenados ni utilizados para entrenar modelos de IA comerciales.
* **Data Residency UE:** Compatible con despliegues locales On-Premise o servidores en la nube soberana europea (Hetzner Alemania / OVH Francia).
* **Conforme a:** EU AI Act (Reglamento UE 2024/1689), RGPD (Reglamento UE 2016/679), CCPA/CPRA y Estatuto General de la Abogacía.

---
© 2026 AI GOVERN • Barbara Piccolo. Todos los derechos reservados.
