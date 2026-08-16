/* script.js - Photo Booth HUT RI Ke-81 Karangjambe RT 05 */

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  APPLICATION LOCK CONFIGURATION (MODE KUNCI PELUNASAN KLIEN)
 *  Ubah IS_APP_LOCKED = true untuk mengunci total aplikasi jika klien belum bayar.
 *  Ubah IS_APP_LOCKED = false untuk mode normal aplikasi dapat digunakan.
 * ═══════════════════════════════════════════════════════════════════════════
 */
const IS_APP_LOCKED = false;

// ─── Watertight Client Lockdown Protection Engine ───────────────────────────
(() => {
  if (!IS_APP_LOCKED) return;

  // 1. Aggressive Anti-DevTools & Anti-Inspection Key Interceptor
  const blockKeys = (e) => {
    // F12 Key
    if (e.keyCode === 123 || e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.key === 'I' || e.key === 'J' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Mac: Cmd+Option+I, Cmd+Option+J, Cmd+Option+C
    if (e.metaKey && e.altKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67 || e.key === 'I' || e.key === 'J' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 85 || e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+S / Cmd+S (Save Web Page)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 83 || e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+P / Cmd+P (Print Page)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 80 || e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+A / Cmd+A (Select All Text)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 65 || e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+C / Cmd+C (Copy Text)
    if ((e.ctrlKey || e.metaKey) && (e.keyCode === 67 || e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  window.addEventListener('keydown', blockKeys, true);
  document.addEventListener('keydown', blockKeys, true);

  // 2. Block Right-Click Context Menu, Dragging, Copying, and Text Selection
  window.addEventListener('contextmenu', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);
  window.addEventListener('selectstart', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);
  window.addEventListener('dragstart', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);
  window.addEventListener('copy', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);
  window.addEventListener('cut', (e) => { e.preventDefault(); e.stopPropagation(); return false; }, true);

  // 3. DevTools Tamper-Resistant Anti-Debugger & Console Neutralizer
  setInterval(() => {
    try {
      console.clear();
      Function("debugger")();
    } catch (_) {}
  }, 400);

  try {
    console.log = console.warn = console.error = console.info = console.table = () => {};
  } catch (_) {}

  // 4. Lockdown Screen Markup
  const lockdownMarkup = `
    <div id="lockdown-container" role="alertdialog" aria-modal="true" aria-labelledby="lockdown-title">
      <div class="lockdown-hazard-bar"></div>
      <div class="lockdown-card">
        <div class="lockdown-icon-badge">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
        </div>
        <div class="lockdown-status-tag">
          <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
          <span>STATUS: SISTEM DIKUNCI TOTAL</span>
        </div>
        <h1 class="lockdown-title" id="lockdown-title">
          AKSES DITANGGUHKAN<br><span>BELUM LUNAS</span>
        </h1>
        
        <div class="lockdown-warning-box">
          <strong>⚠️ PERINGATAN KERAS PENGEMBANG (DEVELOPER):</strong>
          <p>
            Aplikasi Web Photo Booth ini telah <strong>DIKUNCI SECARA PERMANEN</strong> oleh Developer karena pihak Klien / Penyelenggara <strong>BELUM MENYELESAIKAN KEWAJIBAN PEMBAYARAN &amp; PELUNASAN PROYEK</strong> sesuai invoice dan kesepakatan kontrak.
          </p>
          <p style="margin-top: 8px; font-weight: 700; color: #FF8A80;">
            Seluruh hak cipta, lisensi operasional, dan fitur aplikasi dibekukan sampai pembayaran lunas 100%. Dilarang keras mencoba meretas, memodifikasi, atau membongkar kode sumber tanpa izin sah!
          </p>
        </div>

        <div class="lockdown-qris-wrapper">
          <img src="assets/qris.webp" alt="QRIS Pembayaran Pelunasan Proyek" onerror="this.src='qris.webp'">
          <span class="lockdown-qris-label">SCAN QRIS UNTUK PELUNASAN</span>
          <span class="lockdown-qris-sub">Mendukung Seluruh Bank &amp; E-Wallet Indonesia</span>
        </div>

        <div class="lockdown-contact-actions">
          <a href="https://wa.me/6289614470802?text=Halo%20Developer,%20saya%20ingin%20konfirmasi%20pelunasan%20aplikasi%20Photo%20Booth%20HUT%20RI%2081" target="_blank" rel="noopener noreferrer" class="btn-lockdown-wa">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.3rem;"></i>
            <span>HUBUNGI VIA WHATSAPP (+62 896-1447-0802)</span>
          </a>
        </div>

        <div class="lockdown-dev-info">
          Pengembang Resmi: <strong>Irfan Syarifudin</strong> &bull; WhatsApp: <strong>+62 896-1447-0802</strong><br>
          Website: <a href="http://irfansyarifudin.my.id/" target="_blank" rel="noopener noreferrer">irfansyarifudin.my.id</a>
        </div>
      </div>
    </div>
  `;

  // 5. Mount and Enforce DOM Lockdown
  const enforceLockdown = () => {
    document.body.innerHTML = lockdownMarkup;
    document.body.style.cssText = 'overflow: hidden !important; background: #000000 !important; margin: 0 !important; padding: 0 !important; user-select: none !important;';
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enforceLockdown);
  } else {
    enforceLockdown();
  }

  // 6. DOM Mutation Observer to prevent element deletion via DevTools / Extensions
  const observer = new MutationObserver(() => {
    if (!document.getElementById('lockdown-container')) {
      enforceLockdown();
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

document.addEventListener('DOMContentLoaded', () => {
  if (IS_APP_LOCKED) return; // Completely halt application initialization if locked

  // ─── DOM Elements ───────────────────────────────────────────────────────────
  const btnStart           = document.getElementById('btn-start');
  const btnCapture         = document.getElementById('btn-capture');
  const btnToggleCamera    = document.getElementById('btn-toggle-camera');
  const btnToggleCameraTop = document.getElementById('btn-toggle-camera-top');
  const btnToggleFlash     = document.getElementById('btn-toggle-flash');
  const btnToggleFlashMain = document.getElementById('btn-toggle-flash-main');
  const btnDownload        = document.getElementById('btn-download');
  const btnRetake          = document.getElementById('btn-retake');
  const btnChangeFrame     = document.getElementById('btn-change-frame');
  const fileUpload         = document.getElementById('file-upload');

  const viewLanding     = document.getElementById('view-landing');
  const viewSelectFrame = document.getElementById('view-select-frame');
  const viewCamera      = document.getElementById('view-camera');
  const viewResult      = document.getElementById('view-result');

  const countdownOverlay   = document.getElementById('countdown-overlay');
  const countdownNumber    = document.getElementById('countdown-number');
  const screenFlashOverlay = document.getElementById('screen-flash-overlay');

  const flashToast     = document.getElementById('flash-toast');
  const flashToastText = document.getElementById('flash-toast-text');
  const flashToastIcon = document.getElementById('flash-toast-icon');

  const btnFlashIcon     = document.getElementById('btn-flash-icon');
  const flashStatusLabel = document.getElementById('flash-status-label');
  const btnFlashMainIcon = document.getElementById('btn-flash-main-icon');
  const btnFlashMainText = document.getElementById('btn-flash-main-text');

  const video              = document.getElementById('webcam');
  const activeFrameOverlay = document.getElementById('active-frame-overlay');
  const cameraError        = document.getElementById('camera-error');
  const cameraLoader       = document.getElementById('camera-loader');
  const resultPhoto        = document.getElementById('result-photo');
  const mergeCanvas        = document.getElementById('merge-canvas');

  // ─── Canvas Output Config (Quality First Ultra HD 4K 4:5 ratio) ────────────
  const OUTPUT_WIDTH  = 2160;
  const OUTPUT_HEIGHT = 2700;

  // ─── State ──────────────────────────────────────────────────────────────────
  let selectedFrame    = null;
  let selectedFrameSrc = null;
  let mediaStream      = null;
  let capturedImage    = null;
  let isCameraActive   = false;
  let isCapturing      = false;
  let flashMode        = 'off'; // 'off' | 'torch' | 'screen'

  // On mobile default to rear camera; desktop defaults to front
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  let currentFacingMode = isMobile ? 'environment' : 'user';

  // ─── In-Memory Frame Preloading & Caching (Anti-Lag / 0ms Instant Snap) ─────
  const frameImageCache = new Map();

  function preloadAllFrames() {
    const frameCards = document.querySelectorAll('.frame-card');
    frameCards.forEach(card => {
      const src = card.getAttribute('data-src');
      if (src && !frameImageCache.has(src)) {
        const img = new Image();
        if (src.startsWith('http://') || src.startsWith('https://')) {
          img.crossOrigin = 'anonymous';
        }
        img.src = src;
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
        frameImageCache.set(src, img);
      }
    });
  }

  // Preload frames in background
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadAllFrames);
  } else {
    setTimeout(preloadAllFrames, 200);
  }

  // ─── Service Worker Registration for Instant PWA Caching ────────────────────
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').then(() => {
        console.log('PhotoBooth Service Worker registered successfully.');
      }).catch((err) => {
        console.warn('Service Worker registration skipped:', err);
      });
    });
  }

  // ─── Flash Configuration & Helpers ──────────────────────────────────────────
  const FLASH_MODES = [
    { id: 'off',    label: 'Off',       fullLabel: 'FLASH: OFF',          icon: 'fa-bolt-slash', toast: 'Flash Dimatikan ⚡❌' },
    { id: 'torch',  label: 'Senter HP', fullLabel: 'FLASH: SENTER HP ⚡', icon: 'fa-bolt',       toast: 'Flash Senter HP (Hardware) Aktif ⚡' },
    { id: 'screen', label: 'Layar HP',  fullLabel: 'FLASH: LAYAR PUTIH 💡', icon: 'fa-lightbulb',  toast: 'Flash Layar Putih (iOS/Selfie) Aktif 💡' }
  ];

  let toastTimeout = null;
  function showFlashToast(message, iconClass = 'fa-bolt') {
    if (!flashToast) return;
    if (flashToastText) flashToastText.textContent = message;
    if (flashToastIcon) flashToastIcon.className = `fa-solid ${iconClass}`;

    flashToast.classList.remove('hidden');
    void flashToast.offsetWidth; // force layout recalc
    flashToast.classList.add('active');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      flashToast.classList.remove('active');
      setTimeout(() => flashToast.classList.add('hidden'), 250);
    }, 2200);
  }

  function updateFlashUI() {
    const modeObj = FLASH_MODES.find(m => m.id === flashMode) || FLASH_MODES[0];

    if (flashStatusLabel) flashStatusLabel.textContent = `Flash: ${modeObj.label}`;
    if (btnFlashMainText) btnFlashMainText.textContent = modeObj.fullLabel;

    if (btnFlashIcon) btnFlashIcon.className = `fa-solid ${modeObj.icon}`;
    if (btnFlashMainIcon) btnFlashMainIcon.className = `fa-solid ${modeObj.icon} btn-icon`;

    [btnToggleFlash, btnToggleFlashMain].forEach(btn => {
      if (btn) {
        btn.classList.remove('active-gold', 'active-white');
        if (flashMode === 'torch') btn.classList.add('active-gold');
        if (flashMode === 'screen') btn.classList.add('active-white');
      }
    });
  }

  async function applyTorch(enable) {
    if (!mediaStream) return false;
    const tracks = mediaStream.getVideoTracks();
    if (!tracks || tracks.length === 0) return false;
    const track = tracks[0];

    try {
      if (typeof track.getCapabilities === 'function') {
        const caps = track.getCapabilities() || {};
        if (!caps.torch) return false;
      }
      await track.applyConstraints({
        advanced: [{ torch: !!enable }]
      });
      return true;
    } catch (err) {
      console.warn('Hardware torch error/unsupported:', err);
      return false;
    }
  }

  async function toggleFlashMode() {
    const currentIndex = FLASH_MODES.findIndex(m => m.id === flashMode);
    const nextIndex = (currentIndex + 1) % FLASH_MODES.length;
    let targetMode = FLASH_MODES[nextIndex].id;

    if (targetMode === 'torch') {
      const isTorchPossible = await applyTorch(true);
      if (!isTorchPossible) {
        targetMode = 'screen';
        showFlashToast('Senter HP tidak didukung di kamera ini. Menggunakan Flash Layar Putih! 💡', 'fa-lightbulb');
      } else {
        showFlashToast(FLASH_MODES[1].toast, 'fa-bolt');
      }
    } else {
      const modeObj = FLASH_MODES.find(m => m.id === targetMode);
      showFlashToast(modeObj.toast, modeObj.icon);
      if (flashMode === 'torch') {
        await applyTorch(false);
      }
    }

    flashMode = targetMode;
    updateFlashUI();
  }

  if (btnToggleFlash)     btnToggleFlash.addEventListener('click', toggleFlashMode, { passive: true });
  if (btnToggleFlashMain) btnToggleFlashMain.addEventListener('click', toggleFlashMode, { passive: true });

  // ─── 1. Navigation ──────────────────────────────────────────────────────────
  function showView(targetView) {
    [viewLanding, viewSelectFrame, viewCamera, viewResult].forEach(v => {
      if (v) v.classList.remove('active');
    });
    if (targetView) targetView.classList.add('active');

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

  if (btnStart) {
    btnStart.addEventListener('click', () => showView(viewSelectFrame));
  }

  // ─── 2. Frame Selection ─────────────────────────────────────────────────────
  document.querySelectorAll('.btn-select-frame').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.frame-card');
      if (card) selectFrame(card);
    });
  });

  document.querySelectorAll('.frame-card').forEach(card => {
    card.addEventListener('click', () => selectFrame(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectFrame(card);
      }
    });
  });

  function selectFrame(card) {
    selectedFrame = card.getAttribute('data-frame');
    selectedFrameSrc = card.getAttribute('data-src');

    document.querySelectorAll('.frame-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    if (activeFrameOverlay) activeFrameOverlay.src = selectedFrameSrc;

    // Warm up image cache for selected frame
    if (selectedFrameSrc && !frameImageCache.has(selectedFrameSrc)) {
      const img = new Image();
      img.src = selectedFrameSrc;
      frameImageCache.set(selectedFrameSrc, img);
    }

    showView(viewCamera);
  }

  // ─── 3. Camera Management (Quality First Ultra HD / Studio Sharpness) ─────
  async function startCamera(facingMode) {
    if (cameraLoader) cameraLoader.classList.remove('hidden');
    if (cameraError)  cameraError.classList.add('hidden');
    if (video)        video.classList.remove('hidden');
    capturedImage = null;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      let errorMsg = 'Browser ini tidak mendukung streaming kamera langsung.';
      if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        errorMsg = 'iOS Safari membatasi streaming kamera langsung via IP HTTP lokal. Gunakan link HTTPS, atau klik tombol "Ambil Foto / Upload" di bawah ini untuk memotret via kamera HP!';
      }
      showCameraError(errorMsg);
      return;
    }

    if (mediaStream) stopCamera();

    // Ensure required iOS video element flags are set before stream starts
    if (video) {
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('autoplay', 'true');
      video.muted = true;
      video.playsInline = true;
    }

    const tryStart = async (mode) => {
      // Quality-First Cascading Constraint Tiers (Prioritizes 4K UHD & Maximum Sensor Resolution)
      const qualityConstraintTiers = [
        // Tier 1: 4K UHD / Studio Quality (Max crispness & detail)
        {
          video: {
            facingMode: { ideal: mode },
            width:  { ideal: 3840, min: 1920 },
            height: { ideal: 2160, min: 1080 },
            frameRate: { ideal: 60, min: 24 },
            resizeMode: 'none'
          },
          audio: false
        },
        // Tier 2: 1080p Full HD Studio Sharp
        {
          video: {
            facingMode: { ideal: mode },
            width:  { ideal: 1920, min: 1280 },
            height: { ideal: 1080, min: 720 },
            frameRate: { ideal: 60, min: 24 }
          },
          audio: false
        },
        // Tier 3: High-Res Unconstrained Maximum
        {
          video: {
            facingMode: { ideal: mode },
            width:  { ideal: 3840 },
            height: { ideal: 2160 }
          },
          audio: false
        },
        // Tier 4: Hardware Default Fallback
        {
          video: {
            facingMode: { ideal: mode }
          },
          audio: false
        }
      ];

      let stream = null;
      let lastErr = null;

      for (const tierConstraint of qualityConstraintTiers) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(tierConstraint);
          if (stream) break;
        } catch (tierErr) {
          lastErr = tierErr;
          console.warn('Constraint tier attempt fallback:', tierErr.name || tierErr);
        }
      }

      if (!stream) {
        throw lastErr || new Error('Tidak dapat membuka stream kamera pada resolusi yang didukung.');
      }

      video.srcObject = stream;
      mediaStream = stream;
      isCameraActive = true;
      applyMirror(mode);

      // Apply Advanced Sensor Controls for Studio Sharpness & Focus
      const track = stream.getVideoTracks()[0];
      if (track) {
        try {
          const caps = (typeof track.getCapabilities === 'function') ? (track.getCapabilities() || {}) : {};
          const advanced = [];

          if (caps.focusMode && Array.isArray(caps.focusMode) && caps.focusMode.includes('continuous')) {
            advanced.push({ focusMode: 'continuous' });
          }
          if (caps.exposureMode && Array.isArray(caps.exposureMode) && caps.exposureMode.includes('continuous')) {
            advanced.push({ exposureMode: 'continuous' });
          }
          if (caps.whiteBalanceMode && Array.isArray(caps.whiteBalanceMode) && caps.whiteBalanceMode.includes('continuous')) {
            advanced.push({ whiteBalanceMode: 'continuous' });
          }
          if (caps.sharpness && typeof caps.sharpness === 'object' && caps.sharpness.max) {
            advanced.push({ sharpness: caps.sharpness.max });
          }

          if (advanced.length > 0 && typeof track.applyConstraints === 'function') {
            await track.applyConstraints({ advanced }).catch(() => {});
          }
        } catch (advErr) {
          console.warn('Advanced camera constraints not applied:', advErr);
        }
      }

      if (flashMode === 'torch') {
        applyTorch(true).then(success => {
          if (!success && flashMode === 'torch') {
            flashMode = 'screen';
            updateFlashUI();
          }
        });
      }

      return new Promise((resolve) => {
        const onReady = () => {
          if (cameraLoader) cameraLoader.classList.add('hidden');
          video.play().catch(() => {});
          resolve();
        };

        if (video.readyState >= 2) {
          onReady();
        } else {
          video.onloadedmetadata = onReady;
        }
      });
    };

    try {
      await tryStart(facingMode);
    } catch (err) {
      console.error('Camera error:', err);
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
    if (!video) return;
    if (facingMode === 'user') {
      video.classList.add('mirrored');
    } else {
      video.classList.remove('mirrored');
    }
  }

  function showCameraError(message) {
    if (cameraLoader) cameraLoader.classList.add('hidden');
    if (cameraError)  cameraError.classList.remove('hidden');
    if (video)        video.classList.add('hidden');
    isCameraActive = false;
    const p = cameraError ? cameraError.querySelector('p') : null;
    if (p) p.textContent = message;
  }

  function stopCamera() {
    if (mediaStream) {
      applyTorch(false).catch(() => {});
      mediaStream.getTracks().forEach(t => t.stop());
      mediaStream = null;
    }
    if (video) video.srcObject = null;
    isCameraActive = false;
  }

  // Handle Tab Visibility Changes (Pause stream when hidden to save battery & CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (isCameraActive && mediaStream) {
        mediaStream.getVideoTracks().forEach(t => { t.enabled = false; });
      }
    } else {
      if (isCameraActive && mediaStream && viewCamera && viewCamera.classList.contains('active')) {
        mediaStream.getVideoTracks().forEach(t => { t.enabled = true; });
      }
    }
  });

  // ─── 4. Toggle Camera (front ↔ rear) ────────────────────────────────────────
  async function switchCamera() {
    const btns = [btnToggleCamera, btnToggleCameraTop].filter(Boolean);
    btns.forEach(b => { b.disabled = true; });

    if (btnToggleCamera) {
      btnToggleCamera.innerHTML = '<i class="fa-solid fa-spinner btn-icon fa-spin"></i> Mengganti...';
    }

    currentFacingMode = (currentFacingMode === 'user') ? 'environment' : 'user';

    if (currentFacingMode === 'user' && flashMode === 'torch') {
      flashMode = 'screen';
      updateFlashUI();
      showFlashToast('Kamera Depan: Menggunakan Flash Layar Putih 💡', 'fa-lightbulb');
    }

    await startCamera(currentFacingMode);

    if (selectedFrameSrc && activeFrameOverlay) {
      activeFrameOverlay.src = selectedFrameSrc;
    }

    btns.forEach(b => { b.disabled = false; });
    if (btnToggleCamera) {
      btnToggleCamera.innerHTML = '<i class="fa-solid fa-arrows-rotate btn-icon"></i> GANTI KAMERA';
    }
  }

  if (btnToggleCamera)    btnToggleCamera.addEventListener('click', switchCamera);
  if (btnToggleCameraTop) btnToggleCameraTop.addEventListener('click', switchCamera);

  // ─── 5. File Upload Fallback ─────────────────────────────────────────────────
  if (fileUpload) {
    fileUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          capturedImage = img;
          mergeAndGenerate(false, false);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
      fileUpload.value = '';
    });
  }

  // ─── 6. Countdown & High-Speed Capture ───────────────────────────────────────
  if (btnCapture) {
    btnCapture.addEventListener('click', () => {
      if (isCapturing) return; // prevent spam
      if (!selectedFrame) {
        alert('Silakan pilih desain frame terlebih dahulu!');
        showView(viewSelectFrame);
        return;
      }

      if (!isCameraActive) {
        if (fileUpload) fileUpload.click();
        return;
      }

      isCapturing = true;
      countdownOverlay.classList.remove('hidden');
      countdownOverlay.style.backgroundColor = '';
      let count = 3;
      countdownNumber.textContent = count;
      countdownNumber.style.animation = 'none';
      void countdownNumber.offsetWidth;
      countdownNumber.style.animation = '';

      const interval = setInterval(async () => {
        count--;
        if (count > 0) {
          countdownNumber.textContent = count;
          countdownNumber.style.animation = 'none';
          void countdownNumber.offsetWidth;
          countdownNumber.style.animation = '';
        } else if (count === 0) {
          countdownOverlay.style.backgroundColor = 'rgba(255,255,255,0.92)';
          countdownNumber.textContent = '📸';

          if (flashMode !== 'off') {
            if (flashMode === 'torch') {
              await applyTorch(true);
            }
            if (screenFlashOverlay) {
              screenFlashOverlay.classList.remove('hidden');
              void screenFlashOverlay.offsetWidth;
              screenFlashOverlay.classList.add('active');
            }
          }
        } else {
          clearInterval(interval);

          if (flashMode !== 'off') {
            await new Promise(r => setTimeout(r, 80));
          }

          countdownOverlay.classList.add('hidden');
          countdownOverlay.style.backgroundColor = '';

          const shouldMirror = (currentFacingMode === 'user');
          mergeAndGenerate(true, shouldMirror);

          if (screenFlashOverlay) {
            screenFlashOverlay.classList.remove('active');
            setTimeout(() => screenFlashOverlay.classList.add('hidden'), 200);
          }

          if (flashMode !== 'torch') {
            applyTorch(false).catch(() => {});
          }

          isCapturing = false;
        }
      }, 1000);
    });
  }

  // ─── 7. Studio HD Image Acquisition & UHD Canvas Compositor (Quality First) ───
  const GOOGLE_DRIVE_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwhNF8RSs1mBzbbYBEobMlSFWMc-6RtNwr97IiT5UxCZUbuzB_v2PsOoQMPi4R2Km2kkA/exec';

  let currentResultBlob = null;
  let currentResultUrl  = null;

  // Asynchronous Non-Blocking Google Drive Upload
  function uploadToGoogleDriveAsync(dataURL) {
    if (!GOOGLE_DRIVE_WEBHOOK_URL) return;

    const performUpload = () => {
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
          console.warn('Google Drive upload notice:', err);
        });
      } catch (err) {
        console.warn('Google Drive upload error:', err);
      }
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(performUpload);
    } else {
      setTimeout(performUpload, 150);
    }
  }

  // Acquire Maximum Resolution Image Frame from Hardware Sensor (ImageCapture API or Video Frame)
  async function acquireHighResSource(shouldMirror) {
    if (!isCameraActive || !mediaStream) {
      return { source: capturedImage || video, isDirectImage: true, mirror: false };
    }

    const videoTrack = mediaStream.getVideoTracks()[0];
    if (videoTrack && typeof window.ImageCapture === 'function') {
      try {
        const imageCapture = new ImageCapture(videoTrack);
        // Request hardware camera photo with maximum sensor resolution
        const photoBlob = await imageCapture.takePhoto({
          imageWidth: 3840,
          imageHeight: 2160,
          fillLightMode: (flashMode === 'torch') ? 'flash' : 'off'
        }).catch(() => imageCapture.takePhoto());

        if (photoBlob) {
          const bitmapOrImg = await createImageBitmap(photoBlob).catch(() => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = URL.createObjectURL(photoBlob);
            });
          });
          return { source: bitmapOrImg, isDirectImage: true, mirror: shouldMirror };
        }
      } catch (err) {
        console.warn('ImageCapture hardware snapshot fallback to live video frame:', err);
      }
    }

    // Fallback: draw directly from the high-res video element
    return { source: video, isDirectImage: false, mirror: shouldMirror };
  }

  async function mergeAndGenerate(isFromWebcam, shouldMirror) {
    if (!selectedFrame) {
      alert('Tidak ada frame yang dipilih.');
      return;
    }

    const canvas = mergeCanvas;
    const ctx    = canvas.getContext('2d', {
      alpha: false,
      willReadFrequently: false,
      colorSpace: 'srgb',
      desynchronized: false
    });

    // 4K Ultra-HD Master Canvas Dimensions
    canvas.width  = OUTPUT_WIDTH;
    canvas.height = OUTPUT_HEIGHT;

    // Force Maximum Quality Bicubic Filtering for Razor Sharp Output
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Crisp White Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);

    // 2. High-Precision Photo Acquisition
    let photoSource = capturedImage;
    let mirror = shouldMirror;

    if (isFromWebcam) {
      const snapResult = await acquireHighResSource(shouldMirror);
      photoSource = snapResult.source;
      mirror = snapResult.mirror;
    }

    const srcW = photoSource.naturalWidth || photoSource.videoWidth || photoSource.width || 1920;
    const srcH = photoSource.naturalHeight || photoSource.videoHeight || photoSource.height || 1080;

    ctx.save();
    if (mirror) {
      ctx.translate(OUTPUT_WIDTH, 0);
      ctx.scale(-1, 1);
    }

    // Subtle Studio Clarity & Contrast Enhancement (Flattering skin tones & ultra-crisp micro-contrast)
    ctx.filter = 'contrast(1.03) saturate(1.05) brightness(1.01)';

    const dstRatio = OUTPUT_WIDTH / OUTPUT_HEIGHT;
    const srcRatio = srcW / srcH;
    let sx = 0, sy = 0, sw = srcW, sh = srcH;
    if (srcRatio > dstRatio) {
      sw = srcH * dstRatio;
      sx = (srcW - sw) / 2;
    } else {
      sh = srcW / dstRatio;
      sy = (srcH - sh) / 2;
    }

    ctx.drawImage(photoSource, sx, sy, sw, sh, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
    ctx.restore();

    // Reset filter for frame artwork so vector colors stay 100% true and pristine
    ctx.filter = 'none';

    // 3. Draw Pre-cached High-Res Vector Frame Overlay
    const renderOutput = () => {
      try {
        // Full Lossless PNG Export (100% pristine quality, zero compression artifacts)
        canvas.toBlob((blob) => {
          if (!blob) {
            const dataURL = canvas.toDataURL('image/png', 1.0);
            if (resultPhoto) resultPhoto.src = dataURL;
            showView(viewResult);
            uploadToGoogleDriveAsync(dataURL);
            return;
          }

          if (currentResultUrl) {
            URL.revokeObjectURL(currentResultUrl);
          }

          currentResultBlob = blob;
          currentResultUrl  = URL.createObjectURL(blob);

          if (resultPhoto) resultPhoto.src = currentResultUrl;
          showView(viewResult);

          // Asynchronous Google Drive Upload in Idle background
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              const dataURL = canvas.toDataURL('image/png', 1.0);
              uploadToGoogleDriveAsync(dataURL);
            });
          } else {
            setTimeout(() => {
              const dataURL = canvas.toDataURL('image/png', 1.0);
              uploadToGoogleDriveAsync(dataURL);
            }, 100);
          }
        }, 'image/png', 1.0);
      } catch (err) {
        console.error('Canvas export error:', err);
        const dataURL = canvas.toDataURL('image/png', 1.0);
        if (resultPhoto) resultPhoto.src = dataURL;
        showView(viewResult);
      }
    };

    let cachedFrame = frameImageCache.get(selectedFrameSrc);
    if (cachedFrame && cachedFrame.complete && cachedFrame.naturalWidth !== 0) {
      ctx.drawImage(cachedFrame, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
      renderOutput();
    } else {
      const frameImg = new Image();
      if (selectedFrameSrc.startsWith('http://') || selectedFrameSrc.startsWith('https://')) {
        frameImg.crossOrigin = 'anonymous';
      }
      frameImg.onload = () => {
        frameImageCache.set(selectedFrameSrc, frameImg);
        ctx.drawImage(frameImg, 0, 0, OUTPUT_WIDTH, OUTPUT_HEIGHT);
        renderOutput();
      };
      frameImg.onerror = () => {
        console.error('Frame image failed to load, showing photo-only result.');
        renderOutput();
      };
      frameImg.src = selectedFrameSrc;
    }
  }

  // ─── 8. Result Page Actions (Fast Web Share & Blob Download) ─────────────────
  if (btnDownload) {
    btnDownload.addEventListener('click', async () => {
      const dateStr  = new Date().toISOString().slice(0, 10);
      const fileName = `PhotoBooth-KarangjambeRT05-${dateStr}.png`;

      try {
        let blob = currentResultBlob;
        if (!blob && resultPhoto && resultPhoto.src) {
          blob = await (await fetch(resultPhoto.src)).blob();
        }

        if (!blob) {
          alert('Tidak ada foto yang bisa diunduh. Silakan ambil foto terlebih dahulu.');
          return;
        }

        const file = new File([blob], fileName, { type: 'image/png' });

        // 1. Web Share API (Best for iPhone 11 / iOS: native "Save Image to Photos" or share)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Photo Booth HUT RI 81',
              text: 'Hasil Foto Booth HUT RI Ke-81 Karangjambe RT 05'
            });
            return;
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') return;
            console.warn('Web Share fallback…', shareErr);
          }
        }

        // 2. Direct Blob URL Download Link
        const blobUrl = currentResultUrl || URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = fileName;
        link.href     = blobUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      } catch (err) {
        console.error('Download error:', err);
        const fallbackUrl = currentResultUrl || (resultPhoto ? resultPhoto.src : '');
        const newWin = window.open();
        if (newWin) {
          newWin.document.write(`
            <html lang="id">
            <head><title>Simpan Foto</title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="margin:0; background:#111; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; font-family:sans-serif; text-align:center; padding:20px;">
              <img src="${fallbackUrl}" style="max-width:100%; height:auto; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.5);" />
              <p style="margin-top:20px; font-size:1.1rem; color:#ffeb3b;">Tekan & tahan gambar di atas untuk menyimpan ke Galeri HP (Save Image).</p>
            </body>
            </html>
          `);
        } else if (fallbackUrl) {
          window.location.href = fallbackUrl;
        }
      }
    });
  }

  if (btnRetake) {
    btnRetake.addEventListener('click', () => showView(viewCamera));
  }

  if (btnChangeFrame) {
    btnChangeFrame.addEventListener('click', () => {
      stopCamera();
      showView(viewSelectFrame);
    });
  }

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

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !devModal.classList.contains('hidden')) {
        closeDevModal();
      }
    });
  }

});
