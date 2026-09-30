import os, json, urllib.request
from fastapi import FastAPI, Request, Response, HTTPException, Query
from pydantic import BaseModel

app = FastAPI(title="AI GOVERN • Instagram Legal Agent Webhook", version="1.0.0")

VERIFY_TOKEN = os.getenv("META_VERIFY_TOKEN", "aigovern_meta_secret_token_2026")
PAGE_ACCESS_TOKEN = os.getenv("META_PAGE_ACCESS_TOKEN", "")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

SYSTEM_PROMPT = """Eres la Asesora Técnica y Secretaria Ejecutiva Letrada de AI GOVERN, plataforma fundada por la abogada senior corporativa Barbara Piccolo (Master en LegalTech y Ciberseguridad).
Tu función es atender consultas por Mensaje Directo (DM) en Instagram dirigidas a abogados, directores legales (General Counsels), directores de auditoría y CEOs.
"""

def generate_ai_reply(user_message: str, sender_name: str = "Colega") -> str:
    msg_lower = user_message.lower()
    if "auditoria" in msg_lower or "checklist" in msg_lower or "diagnostico" in msg_lower:
        return (
            f"Estimado/a {sender_name},

"
            "Con gusto. Desde AI GOVERN hemos estructurado el Protocolo de Diagnóstico de Vulnerabilidades en Shadow AI y Secreto Profesional (conforme al Art. 73 CPC y normativas de privacidad).

"
            "Permite a firmas y empresas auditar qué herramientas de IA están utilizando sus equipos y desplegar nuestra Aduana Zero-Trust para enmascarar datos sensibles antes de cualquier procesamiento.

"
            "Puedes coordinar una sesión técnica de 15 minutos directamente con la Dra. Barbara Piccolo en: https://cv.aigovern.space o indicarnos tu correo corporativo para enviarte el dossier."
        )
    return (
        f"Estimado/a {sender_name},

"
        "Gracias por ponerte en contacto con el despacho de AI GOVERN.

"
        "Nuestra plataforma proporciona infraestructura privada Zero-Trust para que firmas jurídicas y corporaciones puedan utilizar modelos de lenguaje avanzados sin riesgo de fuga de secretos comerciales ni vulneración del secreto profesional letrado.

"
        "Si deseas evaluar un caso de uso específico o solicitar una demo técnica de la Aduana PII y Bóveda Forense, estamos a tu disposición en https://cv.aigovern.space."
    )
