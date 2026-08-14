# Digital Photo Booth - 81st Indonesian Independence Day Karangjambe RT 05

**Production URL**: [https://photobooth-ri.vercel.app/](https://photobooth-ri.vercel.app/)

An interactive, high-performance web-based photo booth application developed for the 81st Indonesian Independence Day celebration at Karangjambe RT 05 on August 17, 2026. The application is engineered with modern web standards, advanced Search Engine Optimization (SEO), complete Open Graph protocol integration for social media sharing, and hardware-accelerated 60 FPS rendering across mobile devices (iOS Safari and Android), tablets, and desktop environments.

---

## Technical Architecture and Performance Optimizations

### 1. Speed and Core Web Vitals Optimization
- **In-Memory Frame Caching**: Preloads and decodes all high-resolution vector and graphic frames into an in-memory map on initial page load, delivering zero-latency (0 ms) canvas compositing immediately following the capture sequence.
- **Optimized Typography Loading**: Selectively requests required font weights (`Outfit` and `Inter`) with `font-display: swap` alongside `preconnect` and `dns-prefetch` directives, eliminating render-blocking network requests.
- **Cumulative Layout Shift (CLS) Mitigation**: Enforces explicit width and height dimensions with fixed 4:5 aspect ratio containers across all preview cards and frame elements.
- **Progressive Web App (PWA) Caching**: Implements a Cache-First Service Worker (`sw.js`) enabling sub-50 ms repeat load times and full offline operational capability.

### 2. Rendering Performance and Hardware Acceleration
- **Compositor Layer Promotion**: Promotes interactive components, countdown overlays, modal dialogs, and navigation elements to dedicated GPU layers using CSS `transform: translateZ(0)` and `will-change` properties.
- **CSS Containment**: Applies `contain: layout style` to frame selection cards to isolate layout calculations and prevent global page reflows during user interaction.
- **Asynchronous Cloud Upload Processing**: Dispatches high-resolution image uploads to Google Drive via non-blocking execution (`requestIdleCallback` / deferred background queues), preventing frame drops during view transitions.
- **Resource and Power Conservation**: Monitors document visibility via the Page Visibility API to automatically suspend active `MediaStream` camera tracks when the tab is backgrounded or minimized.

### 3. Open Graph and Social Media Metadata
- **Open Graph Protocol Implementation**: Comprehensive integration of `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, and `og:locale` tags ensuring high-fidelity visual cards across WhatsApp, Facebook, Instagram, Telegram, LinkedIn, and Discord.
- **Twitter Card Specifications**: Configured `summary_large_image` card directives referencing a dedicated 1280x720 pixel high-resolution preview banner (`assets/og-preview.jpg`).
- **Application Manifest and Vector Icons**: Scalable SVG favicon (`favicon.svg`) and complete Web Application Manifest (`site.webmanifest`).

### 4. Search Engine Optimization and Structured Data
- **Schema.org JSON-LD Markup**:
  - `WebApplication`: Defines software application parameters, platform compatibility, free access tier, and developer attribution.
  - `Event`: Structured representation of the 81st Independence Day community event on August 17, 2026.
  - `BreadcrumbList`: Establishes clear navigation hierarchy for search engine indexing.
- **Crawler Directives**: Configured `robots.txt` and comprehensive XML sitemap (`sitemap.xml`) including image metadata.

---

## Core Functional Specifications

1. **Theme Landing Interface**: Independence-themed user interface honoring the national celebration with responsive glassmorphism containers.
2. **Standardized Frame Portfolio (4:5 Ratio - 8 Designs)**:
   - **Design 1 (Dirgahayu RI 81)**: Official red and white graphic composition for the 81st national anniversary.
   - **Design 2 (Pita Kemerdekaan)**: Modern patriotic ribbon design with golden laurel 81 emblem.
   - **Design 3 (Proklamasi 1945)**: Historical tribute featuring Bung Karno silhouette and authentic 1945 text.
   - **Design 4 (Garuda Indonesia)**: Royal golden layout featuring national emblem iconography.
   - **Design 5 (Merah Putih Festive)**: Celebratory design with bunting pennants, balloons, and confetti.
   - **Design 6 (Batik Nusantara)**: Traditional Indonesian batik patterns with contemporary graphical accents.
   - **Design 7 (Semangat Kemerdekaan)**: Dynamic patriotic visual layout with speed stripes and independence banners.
   - **Design 8 (Pahlawan Kemerdekaan)**: Contemporary geometric twibbon honoring national independence figures.
3. **Real-Time Camera Capture Engine**: Utilizes the native HTML5 Media Capture and Streams API (`getUserMedia`) with real-time video mirroring and transparent frame guides.
4. **Mobile and Hardware Flash Integration**:
   - **Hardware LED Flash**: Directly interfaces with device torch hardware constraints via MediaTrackConstraints on supported iOS and Android browsers.
   - **Screen Illumination Flash**: Full-screen white burst overlay designed for front-facing selfie cameras and low-light environments.
   - **Automatic Hardware Fallback**: Detects device capabilities dynamically and switches to screen illumination when hardware flash is unsupported.
5. **Synchronized Countdown Sequence**: Automated 3-2-1 timer synchronized with pre-capture flash trigger.
6. **Local File Upload Fallback**: Supports direct image selection from device storage when live camera streaming permissions are unavailable.
7. **High-Resolution Canvas Compositing**: Combines camera input or uploaded photographs with selected frames onto a fixed 1080x1350 pixel canvas (4:5 portrait ratio).
8. **Multi-Platform Image Export**: Leverages the Web Share API for native mobile "Save to Photos" / share sheet functionality alongside direct Blob Object URL downloads.
9. **Developer Portfolio Interface**: Interactive modal dialog documenting developer credentials and portfolio information for **Irfan Syarifudin** ([http://irfansyarifudin.my.id/](http://irfansyarifudin.my.id/)).

---

## Repository Structure

```text
photo-booth/
│
├── index.html          # Main HTML5 document containing semantic layout, SEO, OG, and JSON-LD
├── style.css           # Hardware-accelerated stylesheet, responsive layouts, and tokens
├── script.js           # Application logic, in-memory frame cache, canvas rendering, and camera control
├── sw.js               # Service Worker implementation for offline caching
├── site.webmanifest    # Web Application Manifest configuration
├── robots.txt          # Web crawler indexation directives
├── sitemap.xml         # XML sitemap for search engine discovery
├── favicon.svg         # Vector application icon
│
├── assets/
│   ├── og-preview.jpg  # Open Graph and Twitter Card social preview banner
│   └── frames/         # High-resolution graphic and vector SVG frame assets
│       ├── background_foto_agustusan.png  # Design 1: Dirgahayu RI 81 Official Graphic
│       ├── frame1.svg  # Design 2: Pita Kemerdekaan 81 Vector
│       ├── frame2.svg  # Design 3: Proklamasi 1945 Historical Tribute
│       ├── frame3.svg  # Design 4: Garuda Indonesia Royal Gold
│       ├── frame4.svg  # Design 5: Merah Putih Festive Celebration
│       ├── frame5.svg  # Design 6: Batik Nusantara Heritage
│       ├── frame6.svg  # Design 7: Semangat Kemerdekaan & Pejuang
│       ├── frame7.svg  # Design 8: Pahlawan Kemerdekaan Modern Twibbon
│       └── frame8.svg  # Design 8 Alternate: Nusantara Emas Luxury Edition
│
└── README.md           # Technical documentation
```

---

## Deployment and Local Execution

### Local Development Environment
1. Open the project root directory in a local web server (e.g., Python `http.server`, Node.js `http-server`, or Visual Studio Code Live Server).
2. Access `http://localhost:8080` (or assigned port) in a modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari).
3. **Note on Media Access**: Modern browser security policies mandate an HTTPS context or `localhost` origin to access user media hardware (`getUserMedia`).

### Production Deployment
The application is pre-configured for static deployment on platforms such as Vercel, Netlify, or GitHub Pages. Production builds require no compilation step and run directly via static web hosting.

---

## Application License & Lockdown Control

The application source includes a centralized security lockout mechanism (`IS_APP_LOCKED` in `script.js`):
- **Normal Operation (`IS_APP_LOCKED = false`)**: Full application features, camera streams, frame selector, and download utilities operate normally.
- **Lockdown Mode (`IS_APP_LOCKED = true`)**: Instantly freezes all application views, replaces DOM contents with a full-screen unpaid settlement notice (`assets/qris.webp`), and enforces strict anti-inspection safeguards (blocking Developer Tools shortcuts, context menu, text copying, printing, and DOM deletion).
