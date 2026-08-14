# 📸 Photo Booth Digital - HUT RI Ke-81 Karangjambe RT 05

Aplikasi web Photo Booth interaktif bertema Kemerdekaan Indonesia ke-81 untuk kegiatan perayaan warga RT 05 Karangjambe (17 Agustus 2026). Website dirancang agar modern, responsif, ceria, dan mudah digunakan oleh semua kalangan umur baik menggunakan handphone (HP), tablet, maupun laptop.

## ✨ Fitur Utama
1. **Landing Page Kemerdekaan**: Desain modern bertema merah-putih dengan ornamen kemerdekaan yang estetik.
2. **Pilih Desain (5 Bingkai)**: Tersedia 5 pilihan bingkai bertema kemerdekaan beresolusi tinggi (menggunakan format SVG agar tajam di layar apa pun):
   - **Desain 1 (Merah Putih)**: Dominasi merah putih dengan penulisan resmi HUT RI ke-81.
   - **Desain 2 (Kemerdekaan)**: Ornamen bendera gantung dan ornamen kemerdekaan tradisional yang meriah.
   - **Desain 3 (Elegan)**: Minimalis bernuansa putih, garis tipis merah, dan aksen emas premium.
   - **Desain 4 (Ceria)**: Playful dengan confetti, balon merah-putih, bintang-bintang, dan balon percikan pesta.
   - **Desain 5 (Karangjambe RT 05)**: Khusus identitas rukun tetangga dengan ornamen batik modern.
3. **Kamera Real-time**: Menggunakan API browser langsung (`getUserMedia`) dengan mirror preview dan panduan bingkai transparan secara real-time.
4. **Hitung Mundur (Countdown)**: Sistem hitung mundur visual 3-2-1 otomatis sebelum foto diambil.
5. **Fallback Upload Galeri**: Pilihan unggah foto langsung dari galeri jika perangkat tidak memiliki kamera atau izin akses ditolak.
6. **Canvas Merger (1200x1500px)**: Menggabungkan foto asli dengan bingkai secara proporsional dengan kualitas tinggi (portrait 4:5).
7. **Simpan / Unduh**: Hasil foto yang telah digabung langsung bisa diunduh ke perangkat pengguna dengan satu tombol.

## 🚀 Cara Menjalankan Aplikasi
Aplikasi ini sepenuhnya berjalan di sisi klien (Client-side / Static Web App), tidak membutuhkan server backend/database untuk dijalankan.

### Menjalankan secara Lokal:
1. Pastikan Anda memiliki browser modern (seperti Chrome, Edge, Safari, atau Firefox).
2. Buka folder `d:\foto both` di komputer Anda.
3. Klik dua kali pada file `index.html` untuk langsung membukanya di browser.
4. **Penting**: Beberapa browser membatasi akses webcam jika file dibuka langsung menggunakan protokol `file://`. Untuk performa dan kompatibilitas kamera yang optimal, jalankan aplikasi ini menggunakan server lokal (seperti ekstensi Live Server di VS Code, XAMPP, atau dev server lainnya).

## 📁 Struktur Proyek
```text
photo-booth/
│
├── index.html          # Struktur visual utama SPA
├── style.css           # Desain UI premium, responsif, dan efek glassmorphism
├── script.js           # Sistem kamera, hitung mundur, canvas merging, dan download
│
├── assets/
│   ├── frames/         # Berkas bingkai foto (SVG)
│   │   ├── frame1.svg
│   │   ├── frame2.svg
│   │   ├── frame3.svg
│   │   ├── frame4.svg
│   │   └── frame5.svg
│   │
│   └── images/
│
└── README.md           # Panduan penggunaan proyek
```

## 🛠️ Catatan Teknis
- Penggabungan foto dan bingkai menggunakan **Canvas API** HTML5.
- Orientasi default adalah **Portrait (4:5)** untuk menyesuaikan frame vertikal yang ideal untuk selfie di HP maupun laptop.
- Pengambilan foto dari webcam otomatis di-mirror agar gerakan pengguna tampak natural (seperti cermin), namun hasil akhir gabungan juga di-mirror agar tulisan baju/kiri-kanan pengguna sesuai dengan yang dilihat di cermin saat pemotretan.
- Seluruh kode ditulis dengan vanilla HTML, CSS, dan JavaScript tanpa pustaka eksternal yang berat, memastikan web berjalan dengan sangat cepat bahkan di HP dengan koneksi internet terbatas.
