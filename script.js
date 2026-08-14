/* script.js - Photo Booth HUT RI Ke-81 Karangjambe RT 05 */

document.addEventListener('DOMContentLoaded', () => {

  // ─── DOM Elements ───────────────────────────────────────────────────────────
  const btnStart        = document.getElementById('btn-start');
  const btnCapture      = document.getElementById('btn-capture');
  const btnToggleCamera = document.getElementById('btn-toggle-camera');
  const btnDownload     = document.getElementById('btn-download');
  const btnRetake       = document.getElementById('btn-retake');
  const btnChangeFrame  = document.getElementById('btn-change-frame');
  const fileUpload      = document.getElementById('file-upload');

  const viewLanding     = document.getElementById('view-landing');
  const viewSelectFrame = document.getElementById('view-select-frame');
  const viewCamera      = document.getElementById('view-camera');
  const viewResult      = document.getElementById('view-result');

  const countdownOverlay = document.getElementById('countdown-overlay');
  const countdownNumber  = document.getElementById('countdown-number');

  const video              = document.getElementById('webcam');
  const activeFrameOverlay = document.getElementById('active-frame-overlay');
  const cameraError        = document.getElementById('camera-error');
  const cameraLoader       = document.getElementById('camera-loader');
  const resultPhoto        = document.getElementById('result-photo');
  const mergeCanvas        = document.getElementById('merge-canvas');

  // ─── Canvas Output Config (fixed high-res, same ratio as frames) ────────────
  const OUTPUT_WIDTH  = 1080;
  const OUTPUT_HEIGHT = 1350;   // exactly 4:5 ratio

  // ─── State ──────────────────────────────────────────────────────────────────
  let selectedFrame  = null;
  let selectedFrameSrc = null;
  let mediaStream    = null;
  let capturedImage  = null;   // for gallery uploads
  let isCameraActive = false;

  // On mobile default to rear camera; desktop defaults to front
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  let currentFacingMode = isMobile ? 'environment' : 'user';

  // ─── Helper: draw image with object-fit:cover behaviour ─────────────────────
  // Fills the full (dw × dh) area at (dx, dy) on ctx, cropping src if needed.
  function drawImageCover(ctx, img, dx, dy, dw, dh) {
    const srcW = img.videoWidth  || img.naturalWidth  || img.width;
    const srcH = img.videoHeight || img.naturalHeight || img.height;
    if (!srcW || !srcH) return false;

    const dstRatio = dw / dh;
    const srcRatio = srcW / srcH;

    let sx = 0, sy = 0, sw = srcW, sh = srcH;

    if (srcRatio > dstRatio) {
      // source wider → crop width
      sw = srcH * dstRatio;
      sx = (srcW - sw) / 2;
    } else {
      // source taller → crop height
      sh = srcW / dstRatio;
      sy = (srcH - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    return true;
  }

  // ─── 1. Navigation ──────────────────────────────────────────────────────────
  function showView(targetView) {
    [viewLanding, viewSelectFrame, viewCamera, viewResult].forEach(v =>
      v.classList.remove('active')
    );
    targetView.classList.add('active');

    if (targetView === viewCamera) {
      startCamera(currentFacingMode);
    } else {
      stopCamera();
    }
  }

  // Back buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (target) showView(target);
    });
  });

  btnStart.addEventListener('click', () => showView(viewSelectFrame));

  // ─── 2. Frame Selection ─────────────────────────────────────────────────────
  // "Gunakan Desain Ini" buttons
  document.querySelectorAll('.btn-select-frame').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.frame-card');
      selectFrame(card);
    });
  });

  // Clicking anywhere on a card also selects it
  document.querySelectorAll('.frame-card').forEach(card => {
    card.addEventListener('click', () => selectFrame(card));
  });

  function selectFrame(card) {
    selectedFrame = card.getAttribute('data-frame');
    selectedFrameSrc = card.getAttribute('data-src');

    // Highlight
    document.querySelectorAll('.frame-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    // Set the camera overlay src
    activeFrameOverlay.src = selectedFrameSrc;

    showView(viewCamera);
  }

  // ─── 3. Camera Management ───────────────────────────────────────────────────
  async function startCamera(facingMode) {
    cameraLoader.classList.remove('hidden');
    cameraError.classList.add('hidden');
    video.classList.remove('hidden');
    capturedImage = null;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      let errorMsg = 'Browser ini tidak mendukung streaming kamera langsung.';
      if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        errorMsg = 'iOS Safari membatasi streaming kamera langsung via IP HTTP lokal. Gunakan link HTTPS Tunnel, atau klik tombol "Ambil Foto / Upload" di bawah ini untuk memotret via kamera HP!';
      }
      showCameraError(errorMsg);
      return;
    }

    if (mediaStream) stopCamera();

    const tryStart = async (mode) => {
      const constraints = {
        video: {
          facingMode: { ideal: mode },
          width:  { ideal: 1280 },
          height: { ideal: 960 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = stream;
      mediaStream = stream;
      isCameraActive = true;
      applyMirror(mode);
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          cameraLoader.classList.add('hidden');
          video.play().catch(() => {});
          resolve();
        };
      });
    };

    try {
      await tryStart(facingMode);
    } catch (err) {
      console.error('Camera error:', err);
      // Fallback: try the other facing mode
      if (facingMode === 'environment') {
        try {
          console.warn('Rear camera failed, trying front…');
          currentFacingMode = 'user';
          await tryStart('user');
          return;
        } catch (err2) {
          console.error('Front camera also failed:', err2);
        }
      }

      let msg = 'Tidak dapat mengakses kamera. Silakan izinkan akses kamera pada browser.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Akses kamera ditolak. Izinkan kamera di pengaturan browser lalu muat ulang.';
      } else if (err.name === 'NotFoundError') {
        msg = 'Kamera tidak ditemukan pada perangkat ini.';
      } else if (err.name === 'NotReadableError') {
        msg = 'Kamera sedang digunakan aplikasi lain. Tutup aplikasi tersebut dan coba lagi.';
      } else if (err.name === 'OverconstrainedError') {
        msg = 'Kamera belakang tidak tersedia pada perangkat ini.';
      }
      showCameraError(msg);
    }
  }

  function applyMirror(facingMode) {
    if (facingMode === 'user') {
      video.classList.add('mirrored');
    } else {
      video.classList.remove('mirrored');
    }
  }

  function showCameraError(message) {
    cameraLoader.classList.add('hidden');
    cameraError.classList.remove('hidden');
    video.classList.add('hidden');
    isCameraActive = false;
    const p = cameraError.querySelector('p');
    if (p) p.textContent = message;
  }

  function stopCamera() {
    if (mediaStream) {
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    video.srcObject = null;
    isCameraActive = false;
  }

  // ─── 4. Toggle Camera (front ↔ rear) ────────────────────────────────────────
  if (btnToggleCamera) {
    btnToggleCamera.addEventListener('click', async () => {
      btnToggleCamera.disabled = true;
      btnToggleCamera.innerHTML = '<i class="fa-solid fa-spinner btn-icon fa-spin"></i> Mengganti...';

      currentFacingMode = (currentFacingMode === 'user') ? 'environment' : 'user';
      await startCamera(currentFacingMode);

      // After camera switches, ensure overlay still fills the container
      // (just re-affirm the src; CSS does the rest)
      if (selectedFrameSrc) {
        activeFrameOverlay.src = selectedFrameSrc;
      }

      btnToggleCamera.disabled = false;
      btnToggleCamera.innerHTML = '<i class="fa-solid fa-arrows-rotate btn-icon"></i> GANTI KAMERA';
    });
  }

  // ─── 5. File Upload Fallback ─────────────────────────────────────────────────
  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload  = () => { capturedImage = img; mergeAndGenerate(false, false); };
      img.onerror = () => alert('Gagal memuat gambar. Silakan coba gambar lain.');
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  });

  // ─── 6. Countdown & Capture ──────────────────────────────────────────────────
  btnCapture.addEventListener('click', () => {
    if (!selectedFrame) {
      alert('Silakan pilih desain frame terlebih dahulu!');
      showView(viewSelectFrame);
      return;
    }
    if (!isCameraActive) {
      fileUpload.click();
      return;
    }

    // Start countdown 3 → 2 → 1 → snap
    countdownOverlay.classList.remove('hidden');
    countdownOverlay.style.backgroundColor = '';
    let count = 3;
    countdownNumber.textContent = count;
    // Restart CSS animation
    countdownNumber.style.animation = 'none';
    void countdownNumber.offsetWidth;
    countdownNumber.style.animation = '';

    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        countdownNumber.textContent = count;
        countdownNumber.style.animation = 'none';
        void countdownNumber.offsetWidth;
        countdownNumber.style.animation = '';
      } else if (count === 0) {
        countdownOverlay.style.backgroundColor = 'rgba(255,255,255,0.92)';
        countdownNumber.textContent = '📸';
      } else {
        clearInterval(interval);
        countdownOverlay.classList.add('hidden');
        countdownOverlay.style.backgroundColor = '';
        // Front camera → mirror the output so it looks natural
        const shouldMirror = (currentFacingMode === 'user');
        mergeAndGenerate(true, shouldMirror);
      }
    }, 1000);
  });

  // ─── 7. Canvas Merge: PHOTO then FRAME ─────────────────────────────────────
  //
  //   Layer order (bottom → top):
  //     1. White background
  //     2. User photo (video snapshot or gallery upload) — cover-cropped
  //     3. Frame PNG/SVG overlay (transparent photo area shows layer 2)
  //
  // ─── Google Drive Auto-Upload Configuration ────────────────────────────────
  const GOOGLE_DRIVE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwhNF8RSs1mBzbbYBEobMlSFWMc-6RtNwr97IiT5UxCZUbuzB_v2PsOoQMPi4R2Km2kkA/exec';

  function uploadToGoogleDrive(dataURL) {
    if (!GOOGLE_DRIVE_WEBHOOK_URL) return;

    const dateStr  = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `PhotoBooth-RT05-${dateStr}.png`;

    try {
      fetch(GOOGLE_DRIVE_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataURL,
          filename: fileName
        })
      }).then(() => {
        console.log('Background upload to Google Drive sent successfully!');
      }).catch(err => {
        console.warn('Google Drive upload warning:', err);
      });
    } catch (err) {
      console.warn('Google Drive upload error:', err);
    }
  }

  function mergeAndGenerate(isFromWebcam, shouldMirror) {
    if (!selectedFrame) {
      alert('Tidak ada frame yang dipilih.');
      return;
    }

    const canvas = mergeCanvas;
    const ctx    = canvas.getContext('2d');

    // Fixed output size — never varies with device or frame intrinsic size
    canvas.width  = OUTPUT_WIDTH;
    canvas.height = OUTPUT_HEIGHT;

    // ── 1. White background ──────────────────────────────────────────────────
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

    // ── 2. Draw photo with cover crop ────────────────────────────────────────
    const src = isFromWebcam ? video : capturedImage;

    const srcW = isFromWebcam
      ? (video.videoWidth || video.clientWidth || 1280)
      : (capturedImage ? (capturedImage.naturalWidth || capturedImage.width || 1280) : 1280);
    const srcH = isFromWebcam
      ? (video.videoHeight || video.clientHeight || 960)
      : (capturedImage ? (capturedImage.naturalHeight || capturedImage.height || 960) : 960);

    ctx.save();
    if (shouldMirror) {
      // Mirror horizontally around the center of the canvas
      ctx.translate(OUTPUT_WIDTH, 0);
      ctx.scale(-1, 1);
    }

    // Draw with cover behaviour
    const dstRatio = OUTPUT_WIDTH / OUTPUT_HEIGHT;
    const srcRatio = srcW / srcH;
    let sx = 0, sy = 0, sw = srcW, sh = srcH;
    if (srcRatio > dstRatio) { sw = srcH * dstRatio; sx = (srcW - sw) / 2; }
    else                      { sh = srcW / dstRatio; sy = (srcH - sh) / 2; }

    // Always draw at dx=0, dy=0 (translate + scale handles the flip)
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
    ctx.restore();

    // ── 3. Overlay the frame AFTER photo ────────────────────────────────────
    const frameImg = new Image();
    if (selectedFrameSrc.startsWith('http://') || selectedFrameSrc.startsWith('https://')) {
      frameImg.crossOrigin = 'anonymous';
    }

    frameImg.onload = () => {
      // Frame drawn at full canvas size — transparent area reveals photo below
      ctx.drawImage(frameImg, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

      // ── 4. Export & Auto-Upload to Google Drive ────────────────────────────
      try {
        const dataURL = canvas.toDataURL('image/png');
        resultPhoto.src = dataURL;
        showView(viewResult);

        // Auto-upload photo to Google Drive in the background
        uploadToGoogleDrive(dataURL);
      } catch (err) {
        console.error('Canvas export error (tainted?):', err);
        alert('Gagal mengekspor foto. Jika di iOS Safari, coba unduh secara manual.');
      }
    };

    frameImg.onerror = () => {
      // Frame failed: export photo-only result so user isn't stuck
      console.error('Frame image failed to load, showing photo-only result.');
      try {
        const dataURL = canvas.toDataURL('image/png');
        resultPhoto.src = dataURL;
        showView(viewResult);

        // Auto-upload photo to Google Drive in the background
        uploadToGoogleDrive(dataURL);
      } catch (err) {
        alert('Desain frame gagal dimuat.');
      }
    };

    // Relative path — works from any local server or hosted origin
    frameImg.src = selectedFrameSrc;
  }

  // Helper: Convert DataURL to Blob for reliable cross-platform downloading
  function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  // ─── 8. Result Page Actions ──────────────────────────────────────────────────
  btnDownload.addEventListener('click', async () => {
    const dataURL = resultPhoto.src;
    if (!dataURL || dataURL === window.location.href || dataURL.length < 100) {
      alert('Tidak ada foto yang bisa diunduh. Silakan ambil foto terlebih dahulu.');
      return;
    }

    const dateStr  = new Date().toISOString().slice(0, 10);
    const fileName = `PhotoBooth-KarangjambeRT05-${dateStr}.png`;

    try {
      const blob = dataURLtoBlob(dataURL);
      const file = new File([blob], fileName, { type: 'image/png' });

      // 1. Web Share API (Best for iPhone / Android: native "Save Image to Photos" or share)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Photo Booth HUT RI 81',
            text: 'Hasil Foto Booth HUT RI Ke-81 Karangjambe RT 05'
          });
          return; // Native share dialog handles save/share
        } catch (shareErr) {
          if (shareErr.name === 'AbortError') return; // User canceled share sheet
          console.warn('Web Share failed, falling back to blob link…', shareErr);
        }
      }

      // 2. Blob Object URL Download (Desktop Chrome, Firefox, Edge, Android)
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = fileName;
      link.href     = blobUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.error('Download error:', err);
      // 3. Fallback for iOS Safari / blocked popups: open image in new tab with save instruction
      const newWin = window.open();
      if (newWin) {
        newWin.document.write(`
          <html lang="id">
          <head><title>Simpan Foto</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
          <body style="margin:0; background:#111; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; text-align:center; padding:20px;">
            <img src="${dataURL}" style="max-width:100%; height:auto; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.5);" />
            <p style="margin-top:20px; font-size:1.1rem; color:#ffeb3b;">Tekan & tahan gambar di atas untuk menyimpan ke Galeri HP (Save Image).</p>
          </body>
          </html>
        `);
      } else {
        window.location.href = dataURL;
      }
    }
  });

  btnRetake.addEventListener('click', () => showView(viewCamera));

  btnChangeFrame.addEventListener('click', () => {
    stopCamera();
    showView(viewSelectFrame);
  });

  // ─── 9. Developer Modal Handler ──────────────────────────────────────────────
  const btnDevModal    = document.getElementById('btn-developer-modal');
  const devModal       = document.getElementById('developer-modal');
  const btnCloseDev    = document.getElementById('btn-close-dev-modal');
  const btnCloseDevAct = document.getElementById('btn-modal-close-action');

  if (btnDevModal && devModal) {
    btnDevModal.addEventListener('click', () => {
      devModal.classList.remove('hidden');
    });

    const closeDevModal = () => devModal.classList.add('hidden');

    if (btnCloseDev) btnCloseDev.addEventListener('click', closeDevModal);
    if (btnCloseDevAct) btnCloseDevAct.addEventListener('click', closeDevModal);

    devModal.addEventListener('click', (e) => {
      if (e.target === devModal) closeDevModal();
    });
  }

});
