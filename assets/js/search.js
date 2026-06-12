// ===== SEARCH.JS =====

const TOOLS_DATA = [
  { name: 'KDV Hesaplama', desc: 'KDV dahil/hariç hesaplama', icon: '🧾', url: '/tools/kdv-hesaplama.html', cat: 'Finans' },
  { name: 'Faiz Hesaplama', desc: 'Basit ve bileşik faiz', icon: '📈', url: '/tools/faiz-hesaplama.html', cat: 'Finans' },
  { name: 'Yüzde Hesaplama', desc: 'Artış, azalış, oran hesaplama', icon: '%', url: '/tools/yuzde-hesaplama.html', cat: 'Finans' },
  { name: 'İndirim Hesaplama', desc: 'İndirimli fiyat hesaplama', icon: '🏷️', url: '/tools/indirim-hesaplama.html', cat: 'Finans' },
  { name: 'Not Ortalaması', desc: 'Ağırlıklı not ortalaması', icon: '📚', url: '/tools/not-ortalamasi.html', cat: 'Öğrenci' },
  { name: 'Vize Final Hesaplama', desc: 'Geçme notu hesapla', icon: '📝', url: '/tools/vize-final-hesaplama.html', cat: 'Öğrenci' },
  { name: 'YKS Puan Hesaplama', desc: 'YKS puan tahmini', icon: '🎓', url: '/tools/yks-puan-hesaplama.html', cat: 'Öğrenci' },
  { name: 'Yaş Hesaplama', desc: 'Doğum tarihinden yaş', icon: '🎂', url: '/tools/yas-hesaplama.html', cat: 'Günlük' },
  { name: 'BMI Hesaplama', desc: 'Vücut kitle indeksi', icon: '⚖️', url: '/tools/bmi-hesaplama.html', cat: 'Günlük' },
  { name: 'PDF Birleştirme', desc: 'Birden fazla PDF tek dosyada', icon: '📎', url: '/tools/pdf/pdf-birlestir.html', cat: 'PDF' },
  { name: 'PDF Bölme', desc: 'PDF sayfalarını ayır', icon: '✂️', url: '/tools/pdf/pdf-bol.html', cat: 'PDF' },
  { name: 'PDF Sıkıştırma', desc: 'PDF dosya boyutunu küçült', icon: '🗜️', url: '/tools/pdf/pdf-sikistir.html', cat: 'PDF' },
  { name: 'PDF\'i Görsele Dönüştür', desc: 'PDF sayfalarını JPEG/PNG yap', icon: '🖼️', url: '/tools/pdf/pdf-gorsel-donustur.html', cat: 'PDF' },
  { name: 'Görsel\'den PDF', desc: 'JPEG/PNG\'yi PDF\'e çevir', icon: '📄', url: '/tools/pdf/gorsel-pdf-donustur.html', cat: 'PDF' },
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

if (searchInput && searchResults) {
  searchInput.addEventListener('input', debounce(handleSearch, 200));
  
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) handleSearch();
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('show');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchResults.classList.remove('show');
      searchInput.blur();
    }
  });
}

function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  
  if (!query) {
    searchResults.classList.remove('show');
    return;
  }

  const results = TOOLS_DATA.filter(tool =>
    tool.name.toLowerCase().includes(query) ||
    tool.desc.toLowerCase().includes(query) ||
    tool.cat.toLowerCase().includes(query)
  ).slice(0, 6);

  if (results.length === 0) {
    searchResults.innerHTML = `
      <div style="padding: 1.25rem; text-align: center; color: var(--muted); font-size: 0.875rem;">
        Sonuç bulunamadı
      </div>
    `;
  } else {
    searchResults.innerHTML = results.map(tool => `
      <a class="search-result-item" href="${tool.url}">
        <div class="search-result-icon" style="background: rgba(99,102,241,0.12);">${tool.icon}</div>
        <div class="search-result-info">
          <strong>${highlightMatch(tool.name, query)}</strong>
          <span>${tool.desc} · ${tool.cat}</span>
        </div>
      </a>
    `).join('');
  }

  searchResults.classList.add('show');
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark style="background:rgba(99,102,241,0.25);color:var(--text);border-radius:3px;padding:0 2px;">$1</mark>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

window.TOOLS_DATA = TOOLS_DATA;
