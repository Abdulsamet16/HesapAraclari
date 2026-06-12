
# 🧮 Hesap Araçları (All-in-One Calculation Hub)

> Günlük hayatta, finans dünyasında ve matematiksel işlemlerde ihtiyaç duyulan tüm hesaplama araçlarını tek bir minimalist arayüzde toplayan, modern ve hızlı bir web platformu.

🔗 **[Live Demo / Canlı Önizleme](https://hesaparaclari.netlify.app/)**

---

## 📝 Project Overview (Proje Hakkında)

**Hesap Araçları**, kullanıcıların karmaşık formüllerle uğraşmadan finansal, matematiksel ve kişisel verilerini anlık olarak hesaplayabilmeleri için tasarlanmış bir web uygulamasıdır. Saf **HTML5, CSS3 ve JavaScript (Vanilla JS)** kullanılarak geliştirilen bu platform, harici ağır kütüphaneler (React, Vue vb.) yerine tamamen tarayıcı odaklı, optimize ve yüksek performanslı çalışacak şekilde mimari edilmiştir.

---

## ✨ Modüller ve Özellikler (Modules & Features)

Platform içerisinde barındırdığı modüller sayesinde çok yönlü bir kullanım sunar:

*   **📈 Finansal Hesaplamalar:** Kredi faiz oranları, taksit tutarları, döviz çevrimleri ve anlık kur takibi.
*   **🔢 Matematiksel Araçlar:** Yüzde hesaplama (artış/azalış), oran-orantı ve temel fonksiyonel matematik araçları.
*   **🩺 Sağlık & Yaşam:** Vücut Kitle İndeksi (VKI/BMI), günlük kalori ihtiyacı ve ideal kilo hesaplama araçları.
*   **⚡ Anlık Dinamik Sonuçlar (Real-time):** Kullanıcı verileri girdikçe sayfa yenilenmeden, arka plandaki matematiksel algoritmalar sayesinde sonuçlar milisaniyeler içinde ekrana yansıtılır.
*   **📱 Responsive & Fluid UI:** Masaüstü bilgisayarlardan en küçük mobil ekranlara kadar her cihazda kusursuz çalışan, modern kart (card) tabanlı arayüz tasarımı.

---

## 📁 Proje Yapısı (Project Structure)

hesap-araclari/
├── index.html       → Ana sayfa yapısı ve modüllerin iskeleti
├── css/
│   └── style.css    → Modern responsive grid yapısı ve UI tasarımları
├── js/
│   ├── main.js      → Modül geçişleri ve genel uygulama yönetimi
│   └── modules/     → Her hesaplama aracının kendi matematiksel mantığı
└── README.md        → Bu bilgilendirme dosyası


---

## 🛠️ Kullanılan Teknolojiler (Technologies Used)

*   **HTML5:** Semantik, SEO dostu ve erişilebilir web yapısı.
*   **CSS3:** Özel modern temalandırma, CSS Grid & Flexbox düzeni, interaktif hover efektleri.
*   **JavaScript (ES6+):** Gelişmiş DOM manipülasyonu, olay dinleyicileri (event listeners) ve dinamik matematiksel formül işletimleri.
*   **Deployment:** Kesintisiz ve hızlı CDN dağıtımı için **Netlify**.

---

## 🚀 Nasıl Çalıştırılır? (How to Run Locally)

Bu proje herhangi bir paket yöneticisi (npm, yarn) veya kurulum **gerektirmez**. Local bilgisayarınızda çalıştırmak için:

1. Bu depoyu klonlayın:
```bash
   git clone [https://github.com/kullaniciadi/hesap-araclari.git](https://github.com/kullaniciadi/hesap-araclari.git)
Proje klasörünün içine girin.

index.html dosyasını favori tarayıcınızda çift tıklayarak veya VS Code Live Server uzantısı ile çalıştırın.

🧱 Teknik Detaylar (Technical Highlights)
Clean Code Architecture: Her hesaplama aracı (örneğin yüzde hesaplama veya kredi hesaplama) kendi içinde izole edilerek temiz ve sürdürülebilir bir kod yapısı (clean code) hedeflenmiştir.

Zero Dependencies: Üçüncü parti hiçbir ağır framework veya kütüphane kullanılmadığı için site anında yüklenir ve yüksek performans skoru (Lighthouse) verir.

Input Validation: Kullanıcıların hatalı veya negatif veri girmesini engelleyen regex ve JS kontrolleri mevcuttur.
