import os, sys, argparse

curr = os.path.dirname(os.path.abspath(__file__))
if curr not in sys.path:
    sys.path.insert(0, curr)

from script_generator import generate_legal_brief
from video_renderer import render_vertical_video
from instagram_publisher import InstagramReelsPublisher

def run_faceless_pipeline(headline: str, publish_live: bool = False):
    print("=" * 60)
    print("AI GOVERN • PIPELINE DE MEDIOS PROGRAMÁTICOS FACELESS")
    print("=" * 60)
    print("▶ 1. Procesando Alerta Regulatoria:", headline)
    brief = generate_legal_brief(headline)
    print("   ✓ Guion generado:", brief.get("title"))
    print("   ✓ Gancho en pantalla:", brief.get("hook_screen_text"))

    print("▶ 2. Renderizando video vertical (1080x1920 MP4) con estética Bloomberg...")
    video_file = render_vertical_video(brief, "latest_regulatory_brief.mp4")
    print("   ✓ Archivo listo para emisión:", video_file, "(", os.path.getsize(video_file), "bytes )")

    print("▶ 3. Protocolo de Publicación en Instagram...")
    publisher = InstagramReelsPublisher()
    simulated_public_url = "https://aigovern.space/media/latest_regulatory_brief.mp4"
    caption = brief.get("caption_instagram", "AI GOVERN • Plataforma de Gobernanza Letrada.")

    if publish_live:
        result = publisher.publish_reel(simulated_public_url, caption)
        print("   ✓ Resultado de publicación:", result)
    else:
        print("   ℹ Modo local completado. Video MP4 renderizado e inspeccionable localmente.")
        print("   ℹ Caption preparado:")
        print(caption)

    print("=" * 60)
    print("CICLO COMPLETADO CON ÉXITO")
    print("=" * 60)
    return video_file

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI GOVERN Faceless Media Pipeline")
    parser.add_argument("--headline", type=str, default="Filtración masiva de expedientes por uso de modelos de lenguaje en despachos")
    parser.add_argument("--publish", action="store_true", help="Publicar directamente a Meta Graph API")
    args = parser.parse_args()

    run_faceless_pipeline(args.headline, publish_live=args.publish)
