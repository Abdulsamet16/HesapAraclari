// ===== TOOLS.JS =====

// ===========================
// KDV HESAPLAMA
// ===========================
function initKDV() {
  const form = document.getElementById('kdvForm');
  const result = document.getElementById('kdvResult');
  if (!form) return;

  const tabs = document.querySelectorAll('.radio-tab');
  let mode = 'haric'; // hariç or dahil

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      mode = tab.dataset.mode;
      calculate();
    });
  });

  form.addEventListener('input', calculate);

  function calculate() {
    const amount = parseFloat(document.getElementById('kdvAmount').value) || 0;
    const rate = parseFloat(document.getElementById('kdvRate').value) || 18;

    if (amount <= 0) {
      result.classList.remove('show');
      return;
    }

    let baseAmount, vatAmount, totalAmount;

    if (mode === 'haric') {
      baseAmount = amount;
      vatAmount = amount * (rate / 100);
      totalAmount = amount + vatAmount;
    } else {
      totalAmount = amount;
      baseAmount = amount / (1 + rate / 100);
      vatAmount = amount - baseAmount;
    }

    document.getElementById('kdvBase').textContent = formatTR(baseAmount) + ' ₺';
    document.getElementById('kdvTutar').textContent = formatTR(vatAmount) + ' ₺';
    document.getElementById('kdvTotal').textContent = formatTR(totalAmount) + ' ₺';
    document.getElementById('kdvMainResult').textContent = formatTR(mode === 'haric' ? totalAmount : baseAmount) + ' ₺';
    document.getElementById('kdvMainLabel').textContent = mode === 'haric' ? 'KDV Dahil Toplam' : 'KDV Hariç Tutar';

    result.classList.add('show');

    // Copy button
    const copyBtn = document.getElementById('copyKDV');
    if (copyBtn) {
      copyBtn.onclick = () => copyToClipboard(
        `Matrah: ${formatTR(baseAmount)} ₺\nKDV (%${rate}): ${formatTR(vatAmount)} ₺\nToplam: ${formatTR(totalAmount)} ₺`
      );
    }
  }
}

// ===========================
// FAİZ HESAPLAMA
// ===========================
function initFaiz() {
  const form = document.getElementById('faizForm');
  const result = document.getElementById('faizResult');
  if (!form) return;

  form.addEventListener('input', calculate);

  function calculate() {
    const anapara = parseFloat(document.getElementById('anapara').value) || 0;
    const faizOrani = parseFloat(document.getElementById('faizOrani').value) || 0;
    const sure = parseInt(document.getElementById('faizSure').value) || 0;
    const periyot = document.getElementById('faizPeriyot').value;

    if (anapara <= 0 || faizOrani <= 0 || sure <= 0) {
      result.classList.remove('show');
      return;
    }

    let sureFactor = periyot === 'ay' ? sure / 12 : sure;
    const faizTutar = anapara * (faizOrani / 100) * sureFactor;
    const toplam = anapara + faizTutar;

    document.getElementById('faizTutar').textContent = formatTR(faizTutar) + ' ₺';
    document.getElementById('faizToplam').textContent = formatTR(toplam) + ' ₺';
    document.getElementById('faizAnapara').textContent = formatTR(anapara) + ' ₺';
    document.getElementById('faizMainResult').textContent = formatTR(faizTutar) + ' ₺';

    result.classList.add('show');
  }
}

// ===========================
// YÜZDE HESAPLAMA
// ===========================
function initYuzde() {
  const tabs = document.querySelectorAll('.radio-tab[data-yuzde]');
  let mode = 'oran';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      mode = tab.dataset.yuzde;
      showPanel(mode);
      calculate();
    });
  });

  showPanel(mode);

  document.querySelectorAll('.yuzde-panel input').forEach(el => {
    el.addEventListener('input', calculate);
  });

  function showPanel(m) {
    document.querySelectorAll('.yuzde-panel').forEach(p => {
      p.style.display = p.dataset.panel === m ? 'block' : 'none';
    });
  }

  function calculate() {
    const result = document.getElementById('yuzdeResult');
    if (!result) return;
    
    let answer = 0, desc = '';

    if (mode === 'oran') {
      const sayi = parseFloat(document.getElementById('y1').value) || 0;
      const toplam = parseFloat(document.getElementById('y2').value) || 1;
      answer = (sayi / toplam) * 100;
      desc = `${formatTR(sayi, 0)} sayısı, ${formatTR(toplam, 0)} sayısının`;
    } else if (mode === 'artis') {
      const eski = parseFloat(document.getElementById('y3').value) || 0;
      const yeni = parseFloat(document.getElementById('y4').value) || 0;
      if (eski === 0) return;
      answer = ((yeni - eski) / eski) * 100;
      desc = answer >= 0 ? 'Artış oranı' : 'Azalış oranı';
    } else if (mode === 'uygula') {
      const sayi = parseFloat(document.getElementById('y5').value) || 0;
      const yuzde = parseFloat(document.getElementById('y6').value) || 0;
      answer = sayi * (yuzde / 100);
      desc = `${formatTR(sayi, 0)} sayısının %${yuzde}'si`;
    }

    if (isNaN(answer)) {
      result.classList.remove('show');
      return;
    }

    document.getElementById('yuzdeMainResult').textContent = 
      mode === 'uygula' ? formatTR(answer) : '%' + formatTR(answer);
    document.getElementById('yuzdeDesc').textContent = desc;
    result.classList.add('show');
  }
}

// ===========================
// NOT ORTALAMASI
// ===========================
function initNot() {
  let dersler = [
    { ad: 'Matematik', not: 80, kredi: 3 },
    { ad: 'Türkçe', not: 90, kredi: 2 },
    { ad: 'Fizik', not: 70, kredi: 3 },
  ];

  renderDersler();

  document.getElementById('dersEkle')?.addEventListener('click', () => {
    dersler.push({ ad: 'Yeni Ders', not: 0, kredi: 3 });
    renderDersler();
    hesapla();
  });

  function renderDersler() {
    const container = document.getElementById('derslerList');
    if (!container) return;

    container.innerHTML = dersler.map((d, i) => `
      <div class="ders-row" style="display:grid; grid-template-columns: 1fr auto auto auto; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;">
        <input class="form-input" value="${d.ad}" placeholder="Ders adı" 
          oninput="updateDers(${i}, 'ad', this.value)" style="font-size:0.875rem; padding: 0.65rem 0.875rem;">
        <input class="form-input" type="number" value="${d.not}" min="0" max="100" placeholder="Not" 
          oninput="updateDers(${i}, 'not', this.value)" style="width:80px; text-align:center; font-size:0.875rem; padding: 0.65rem 0.75rem;">
        <input class="form-input" type="number" value="${d.kredi}" min="1" max="10" placeholder="Kredi" 
          oninput="updateDers(${i}, 'kredi', this.value)" style="width:75px; text-align:center; font-size:0.875rem; padding: 0.65rem 0.75rem;">
        <button onclick="silDers(${i})" style="background:rgba(239,68,68,0.12); color:#f87171; border:none; border-radius:8px; width:36px; height:36px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');

    hesapla();
  }

  window.updateDers = (i, field, val) => {
    dersler[i][field] = field === 'ad' ? val : parseFloat(val) || 0;
    hesapla();
  };

  window.silDers = (i) => {
    dersler.splice(i, 1);
    renderDersler();
  };

  function hesapla() {
    const result = document.getElementById('notResult');
    if (!result) return;

    let toplamKrediXNot = 0, toplamKredi = 0;
    dersler.forEach(d => {
      toplamKrediXNot += d.not * d.kredi;
      toplamKredi += d.kredi;
    });

    if (toplamKredi === 0) {
      result.classList.remove('show');
      return;
    }

    const ortalama = toplamKrediXNot / toplamKredi;
    const harf = getHarf(ortalama);

    document.getElementById('notOrtalama').textContent = formatTR(ortalama);
    document.getElementById('notHarf').textContent = harf;
    document.getElementById('notKredi').textContent = toplamKredi;
    result.classList.add('show');
  }

  function getHarf(not) {
    if (not >= 90) return 'AA';
    if (not >= 85) return 'BA';
    if (not >= 80) return 'BB';
    if (not >= 75) return 'CB';
    if (not >= 70) return 'CC';
    if (not >= 65) return 'DC';
    if (not >= 60) return 'DD';
    if (not >= 50) return 'FD';
    return 'FF';
  }

  hesapla();
}

// ===========================
// VİZE FİNAL HESAPLAMA
// ===========================
function initVizeFinal() {
  const form = document.getElementById('vizeForm');
  const result = document.getElementById('vizeResult');
  if (!form) return;

  form.addEventListener('input', hesapla);

  function hesapla() {
    const vize = parseFloat(document.getElementById('vizeNot').value) || 0;
    const final = parseFloat(document.getElementById('finalNot').value) || 0;
    const vizeAgirligi = parseFloat(document.getElementById('vizeAgirligi').value) || 40;
    const finalAgirligi = 100 - vizeAgirligi;

    const ortalama = (vize * vizeAgirligi / 100) + (final * finalAgirligi / 100);
    const gecme = ortalama >= 50 ? 'Geçti ✓' : 'Kaldı ✗';

    document.getElementById('vizeOrtalama').textContent = formatTR(ortalama);
    document.getElementById('vizeDurum').textContent = gecme;
    document.getElementById('vizeDurum').style.color = ortalama >= 50 ? 'var(--accent)' : '#ef4444';

    // Geçmek için gereken final notu
    const gerekliOrtalama = 50;
    const gerekliFinale = (gerekliOrtalama - (vize * vizeAgirligi / 100)) / (finalAgirligi / 100);
    const gerekliText = gerekliFinale > 100 
      ? 'Geçme imkânı yok' 
      : gerekliFinale <= 0 
        ? 'Zaten geçti' 
        : `Geçmek için final: ${formatTR(gerekliFinale)}`;

    document.getElementById('vizeGerekli').textContent = gerekliText;
    result.classList.add('show');
  }

  hesapla();
}

// ===========================
// YKS PUAN HESAPLAMA
// ===========================
function initYKS() {
  const form = document.getElementById('yksForm');
  const result = document.getElementById('yksResult');
  if (!form) return;

  form.addEventListener('input', hesapla);

  function hesapla() {
    const tur = document.getElementById('yksTur').value;
    
    let net = 0, puan = 0;

    if (tur === 'say') {
      const matNet = parseFloat(document.getElementById('matNet').value) || 0;
      const fenNet = parseFloat(document.getElementById('fenNet').value) || 0;
      net = matNet + fenNet;
      puan = 100 + (matNet * 3.0) + (fenNet * 2.85);
    } else if (tur === 'ea') {
      const matNet = parseFloat(document.getElementById('matNet').value) || 0;
      const turkNet = parseFloat(document.getElementById('turkNet').value) || 0;
      net = matNet + turkNet;
      puan = 100 + (matNet * 2.8) + (turkNet * 3.0);
    } else {
      const sosSagNet = parseFloat(document.getElementById('sosSagNet').value) || 0;
      const turkNet = parseFloat(document.getElementById('turkNet').value) || 0;
      net = sosSagNet + turkNet;
      puan = 100 + (sosSagNet * 2.7) + (turkNet * 3.2);
    }

    document.getElementById('yksPuan').textContent = formatTR(Math.max(0, puan));
    document.getElementById('yksNet').textContent = formatTR(net, 1);
    result.classList.add('show');
  }

  // Show/hide fields based on type
  const turSelect = document.getElementById('yksTur');
  if (turSelect) {
    turSelect.addEventListener('change', updateFields);
    updateFields();
  }

  function updateFields() {
    const tur = turSelect.value;
    document.querySelectorAll('.yks-field').forEach(el => {
      const types = el.dataset.tur?.split(',') || [];
      el.style.display = types.includes(tur) ? 'block' : 'none';
    });
  }

  hesapla();
}

// ===========================
// YAŞ HESAPLAMA
// ===========================
function initYas() {
  const form = document.getElementById('yasForm');
  const result = document.getElementById('yasResult');
  if (!form) return;

  form.addEventListener('input', hesapla);

  function hesapla() {
    const dogum = new Date(document.getElementById('dogumTarihi').value);
    if (isNaN(dogum)) {
      result.classList.remove('show');
      return;
    }

    const bugun = new Date();
    let yas = bugun.getFullYear() - dogum.getFullYear();
    let ay = bugun.getMonth() - dogum.getMonth();
    let gun = bugun.getDate() - dogum.getDate();

    if (gun < 0) {
      ay--;
      gun += new Date(bugun.getFullYear(), bugun.getMonth(), 0).getDate();
    }
    if (ay < 0) {
      yas--;
      ay += 12;
    }

    // Sonraki doğum günü
    let sonrakiDogumGun = new Date(bugun.getFullYear(), dogum.getMonth(), dogum.getDate());
    if (sonrakiDogumGun <= bugun) sonrakiDogumGun.setFullYear(bugun.getFullYear() + 1);
    const kalanGun = Math.ceil((sonrakiDogumGun - bugun) / (1000 * 60 * 60 * 24));

    // Toplam günler
    const toplamGun = Math.floor((bugun - dogum) / (1000 * 60 * 60 * 24));

    document.getElementById('yasYil').textContent = yas;
    document.getElementById('yasAy').textContent = ay;
    document.getElementById('yasGun').textContent = gun;
    document.getElementById('yasToplamGun').textContent = toplamGun.toLocaleString('tr-TR');
    document.getElementById('yasSonrakiDogumGun').textContent = kalanGun + ' gün';
    result.classList.add('show');
  }

  hesapla();
}

// ===========================
// İNDİRİM HESAPLAMA
// ===========================
function initIndirim() {
  const form = document.getElementById('indirimForm');
  const result = document.getElementById('indirimResult');
  if (!form) return;

  form.addEventListener('input', hesapla);

  function hesapla() {
    const fiyat = parseFloat(document.getElementById('indirimFiyat').value) || 0;
    const oran = parseFloat(document.getElementById('indirimOran').value) || 0;

    if (fiyat <= 0) {
      result.classList.remove('show');
      return;
    }

    const indirimTutar = fiyat * (oran / 100);
    const yeniFiyat = fiyat - indirimTutar;

    document.getElementById('indirimTutar').textContent = formatTR(indirimTutar) + ' ₺';
    document.getElementById('indirimYeniFiyat').textContent = formatTR(yeniFiyat) + ' ₺';
    document.getElementById('indirimMainResult').textContent = formatTR(yeniFiyat) + ' ₺';
    document.getElementById('indirimKazanc').textContent = formatTR(indirimTutar) + ' ₺ tasarruf';
    result.classList.add('show');
  }
}

// ===========================
// BMI HESAPLAMA
// ===========================
function initBMI() {
  const form = document.getElementById('bmiForm');
  const result = document.getElementById('bmiResult');
  if (!form) return;

  form.addEventListener('input', hesapla);

  function hesapla() {
    const boy = parseFloat(document.getElementById('bmiboy').value) || 0;
    const kilo = parseFloat(document.getElementById('bmikilo').value) || 0;

    if (boy <= 0 || kilo <= 0) {
      result.classList.remove('show');
      return;
    }

    const boyM = boy / 100;
    const bmi = kilo / (boyM * boyM);
    
    let kategori, renk, tavsiye;
    if (bmi < 18.5) {
      kategori = 'Zayıf';
      renk = '#60a5fa';
      tavsiye = 'Sağlıklı beslenme ile kilo almanız önerilir.';
    } else if (bmi < 25) {
      kategori = 'Normal';
      renk = '#22c55e';
      tavsiye = 'Vücut ağırlığınız sağlıklı aralıkta. Tebrikler!';
    } else if (bmi < 30) {
      kategori = 'Fazla Kilolu';
      renk = '#f59e0b';
      tavsiye = 'Hafif egzersiz ve diyet ile ideal kiloya ulaşabilirsiniz.';
    } else {
      kategori = 'Obez';
      renk = '#ef4444';
      tavsiye = 'Bir sağlık uzmanına danışmanız önerilir.';
    }

    // İdeal kilo aralığı
    const minKilo = 18.5 * boyM * boyM;
    const maxKilo = 24.9 * boyM * boyM;

    document.getElementById('bmiValue').textContent = formatTR(bmi);
    document.getElementById('bmiKategori').textContent = kategori;
    document.getElementById('bmiKategori').style.color = renk;
    document.getElementById('bmiTavsiye').textContent = tavsiye;
    document.getElementById('bmiIdealMin').textContent = formatTR(minKilo, 1) + ' kg';
    document.getElementById('bmiIdealMax').textContent = formatTR(maxKilo, 1) + ' kg';

    // BMI Bar
    const bmiBar = document.getElementById('bmiBar');
    if (bmiBar) {
      const pct = Math.min(Math.max((bmi - 15) / 25 * 100, 2), 98);
      bmiBar.style.left = pct + '%';
      bmiBar.style.background = renk;
    }

    result.classList.add('show');
  }
}

// Initialize current page tool
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  
  if (path.includes('kdv')) initKDV();
  else if (path.includes('faiz')) initFaiz();
  else if (path.includes('yuzde')) initYuzde();
  else if (path.includes('not-ortalama')) initNot();
  else if (path.includes('vize-final')) initVizeFinal();
  else if (path.includes('yks-puan')) initYKS();
  else if (path.includes('yas-hesaplama')) initYas();
  else if (path.includes('indirim')) initIndirim();
  else if (path.includes('bmi')) initBMI();
});
