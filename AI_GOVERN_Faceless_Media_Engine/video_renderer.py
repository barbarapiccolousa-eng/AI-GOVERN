import os, subprocess, shutil
from PIL import Image, ImageDraw, ImageFont

def render_vertical_video(brief: dict, output_filename: str = "output_reel.mp4") -> str:
    work_dir = "/tmp/render_frames"
    if os.path.exists(work_dir):
        shutil.rmtree(work_dir)
    os.makedirs(work_dir, exist_ok=True)

    width, height = 1080, 1920
    fps = 24
    total_frames = 6 * fps  # 6 segundos concisos y de alto impacto

    try:
        font_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 44)
        font_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
        font_mono = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf", 26)
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_mono = ImageFont.load_default()
        font_small = ImageFont.load_default()

    for f_idx in range(total_frames):
        t = f_idx / fps
        img = Image.new('RGB', (width, height), color=(11, 15, 25))
        draw = ImageDraw.Draw(img)

        draw.rectangle([(50, 50), (width - 50, height - 50)], outline=(30, 41, 59), width=2)
        draw.rectangle([(80, 100), (width - 80, 190)], fill=(15, 23, 42), outline=(56, 189, 248), width=2)
        draw.text((120, 125), "AI GOVERN • FORENSIC BRIEF & LEGALTECH", font=font_mono, fill=(56, 189, 248))

        if t < 2.5:
            draw.rectangle([(80, 260), (450, 320)], fill=(225, 29, 72), outline=(244, 63, 94), width=1)
            draw.text((105, 275), "ALERTA REGULATORIA", font=font_mono, fill=(255, 255, 255))
            draw.text((80, 380), brief.get("hook_screen_text", "SECRETO PROFESIONAL EN RIESGO"), font=font_title, fill=(255, 255, 255))
            draw.text((80, 480), "Modelos comerciales exponen secretos en servidores foráneos.", font=font_sub, fill=(148, 163, 184))

            prog = min(1.0, t / 2.0)
            draw.text((80, 640), "Vulnerabilidad en Despachos: 82% No Regulado", font=font_mono, fill=(251, 191, 36))
            draw.rectangle([(80, 690), (width - 80, 730)], fill=(15, 23, 42), outline=(51, 65, 85))
            draw.rectangle([(80, 690), (int(80 + (width - 160) * 0.82 * prog), 730)], fill=(225, 29, 72))
        elif t < 4.5:
            draw.rectangle([(80, 260), (550, 320)], fill=(5, 150, 105), outline=(52, 211, 153), width=1)
            draw.text((105, 275), "BLINDAJE ZERO-TRUST ACTIVO", font=font_mono, fill=(255, 255, 255))
            draw.text((80, 380), "ADUANA PII & PRIVACIDAD", font=font_title, fill=(52, 211, 153))

            draw.rectangle([(80, 480), (width - 80, 1150)], fill=(2, 6, 23), outline=(30, 41, 59), width=3)
            draw.rectangle([(80, 480), (width - 80, 540)], fill=(15, 23, 42))
            draw.text((110, 500), "CONSOLA DE PROTECCIÓN DE DATOS (Art. 73 CPC)", font=font_mono, fill=(148, 163, 184))

            lines = brief.get("ui_log_lines", [])
            for idx, line in enumerate(lines):
                y_pos = 580 + (idx * 110)
                draw.rectangle([(110, y_pos), (width - 110, y_pos + 70)], fill=(15, 23, 42), outline=(51, 65, 85))
                draw.text((130, y_pos + 20), f"▶ {line}", font=font_mono, fill=(56, 189, 248) if idx==0 else (251, 191, 36) if idx==1 else (52, 211, 153))
        else:
            draw.rectangle([(80, 260), (450, 320)], fill=(14, 116, 144), outline=(56, 189, 248), width=1)
            draw.text((105, 275), "DICTAMEN TÉCNICO", font=font_mono, fill=(255, 255, 255))
            draw.text((80, 380), "AUDITA TU INFRAESTRUCTURA", font=font_title, fill=(255, 255, 255))

            draw.rectangle([(80, 480), (width - 80, 1000)], fill=(15, 23, 42), outline=(56, 189, 248), width=2)
            draw.text((120, 540), "AI GOVERN • DESPACHO PRIVADO", font=font_mono, fill=(56, 189, 248))
            draw.text((120, 620), "• Mitigación de Fuga de Datos en LLMs", font=font_sub, fill=(255, 255, 255))
            draw.text((120, 700), "• Certificación de Secreto Profesional", font=font_sub, fill=(255, 255, 255))
            draw.text((120, 780), "• Custodia Inmutable SHA-256", font=font_sub, fill=(255, 255, 255))

            draw.rectangle([(120, 870), (width - 120, 950)], fill=(56, 189, 248))
            draw.text((220, 900), "ENVÍA UN MENSAJE CON: 'AUDITORIA'", font=font_mono, fill=(11, 15, 25))

        draw.text((80, height - 120), "Fundado por Barbara Piccolo • Master LegalTech & Cyber", font=font_small, fill=(100, 116, 139))
        draw.text((width - 350, height - 120), "iagovern.space", font=font_mono, fill=(56, 189, 248))

        frame_file = os.path.join(work_dir, f"frame_{f_idx:04d}.png")
        img.save(frame_file)

    out_path = os.path.join("/tmp", output_filename)
    cmd = [
        'ffmpeg', '-y',
        '-framerate', str(fps),
        '-i', os.path.join(work_dir, 'frame_%04d.png'),
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-crf', '18',
        out_path
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    shutil.rmtree(work_dir)
    return out_path
