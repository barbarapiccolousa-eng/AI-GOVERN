#!/bin/bash
set -e

echo "================================================================="
echo "   AI GOVERN • Enterprise Legal OS (Despliegue Automatizado)     "
echo "   Fundadora & General Counsel: Barbara Piccolo                  "
echo "================================================================="

if [ ! -f .env ]; then
    echo "⚠️  Archivo .env no encontrado. Creando a partir de .env.example..."
    cp .env.example .env
    echo "ℹ️  Por favor, edita .env con tu GROQ_API_KEY antes de continuar si deseas inferencia en vivo."
fi

echo "🚀 Levantando servicios en contenedores Docker..."
docker compose down || true
docker compose up -d --build

echo ""
echo "✅ ¡Despliegue completado con éxito!"
echo "-----------------------------------------------------------------"
echo "🌐 Dashboard Taskade-Style: http://localhost:3000"
echo "⚙️  Gateway API (Swagger):   http://localhost:8000/docs"
echo "🧠 Qdrant Vector DB:        http://localhost:6333/dashboard"
echo "-----------------------------------------------------------------"
