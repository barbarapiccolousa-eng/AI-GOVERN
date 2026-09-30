let isRecording = false;

document.getElementById('btnRecord').addEventListener('click', () => {
  isRecording = !isRecording;
  const btn = document.getElementById('btnRecord');
  const status = document.getElementById('sessionStatus');

  if (isRecording) {
    btn.textContent = '⏹️ Detener y Enviar a Taller Jurídico';
    btn.classList.add('recording');
    status.textContent = '🔴 Grabando audio de la reunión...';
  } else {
    btn.textContent = '🎙️ Iniciar Grabación de Llamada';
    btn.classList.remove('recording');
    status.textContent = '✅ Acta enviada al Taller Jurídico';
    alert('Reunión finalizada. El audio ha sido transmitido con éxito a AI GOVERN. Abre tu Taller Jurídico para ver el acta.');
  }
});

document.getElementById('btnCopyDisclaimer').addEventListener('click', () => {
  const disclaimer = 'Nota informativa: Se registrarán notas internas y acuerdos operativos de esta sesión bajo estricta confidencialidad corporativa (Art. 13 RGPD).';
  navigator.clipboard.writeText(disclaimer);
  alert('Aviso copiado al portapapeles. Pégalo en el chat de Google Meet / Zoom.');
});
