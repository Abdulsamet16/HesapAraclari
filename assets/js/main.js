// ===== MAIN.JS =====

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });
}

function updateThemeIcon(theme) {
  if (!themeToggle) return;
  themeToggle.innerHTML = theme === 'dark'
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
}

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  if (question && answer) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });
      
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  }
});

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' 
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`;
  
  toast.innerHTML = `${icon}<span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Copy to Clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Panoya kopyalandı!');
  }).catch(() => {
    showToast('Kopyalanamadı', 'error');
  });
}

// Share
function shareResult(title, text) {
  if (navigator.share) {
    navigator.share({ title, text, url: window.location.href });
  } else {
    copyToClipboard(window.location.href);
    showToast('Bağlantı kopyalandı!');
  }
}

// Animate on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.tool-card, .category-card, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});

// Format number Turkish style
function formatTR(num, decimals = 2) {
  if (isNaN(num)) return '0';
  return Number(num).toLocaleString('tr-TR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// Expose globals
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;
window.shareResult = shareResult;
window.formatTR = formatTR;

// ===== DROPDOWN NAV =====
document.querySelectorAll('.nav-links li[data-dropdown]').forEach(li => {
  const btn = li.querySelector('.nav-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = li.classList.toggle('dd-open');
    btn.setAttribute('aria-expanded', isOpen);
    // Close siblings
    li.closest('ul').querySelectorAll('li[data-dropdown]').forEach(other => {
      if (other !== li) { other.classList.remove('dd-open'); other.querySelector('.nav-btn')?.setAttribute('aria-expanded','false'); }
    });
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.nav-links li.dd-open').forEach(li => {
    li.classList.remove('dd-open');
    li.querySelector('.nav-btn')?.setAttribute('aria-expanded','false');
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.nav-links li.dd-open').forEach(li => {
      li.classList.remove('dd-open');
      li.querySelector('.nav-btn')?.setAttribute('aria-expanded','false');
    });
  }
});

// ===== PDF UPLOAD ZONE =====
function initPdfUpload(zoneId, inputId, onFile) {
  const zone = document.getElementById(zoneId);
  const input = document.getElementById(inputId);
  if (!zone || !input) return;

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const files = [...e.dataTransfer.files];
    if (files.length) onFile(files);
  });
  input.addEventListener('change', () => {
    if (input.files.length) onFile([...input.files]);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(2) + ' MB';
}

function showFileInfo(infoId, files) {
  const el = document.getElementById(infoId);
  if (!el) return;
  if (files.length === 1) {
    el.querySelector('.file-info-name').textContent = files[0].name;
    el.querySelector('.file-info-size').textContent = formatBytes(files[0].size);
  } else {
    el.querySelector('.file-info-name').textContent = files.length + ' dosya seçildi';
    const total = files.reduce((a, f) => a + f.size, 0);
    el.querySelector('.file-info-size').textContent = 'Toplam: ' + formatBytes(total);
  }
  el.classList.add('show');
}

function fakeProgress(barWrapId, onDone) {
  const wrap = document.getElementById(barWrapId);
  const fill = wrap?.querySelector('.progress-bar-fill');
  if (!wrap || !fill) { onDone && onDone(); return; }
  wrap.classList.add('show');
  let pct = 0;
  const iv = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(onDone, 300); }
    fill.style.width = pct + '%';
  }, 120);
}

window.initPdfUpload = initPdfUpload;
window.formatBytes = formatBytes;
window.showFileInfo = showFileInfo;
window.fakeProgress = fakeProgress;
