/* ─────────────────────────────────────────
   1. MOBILE NAVBAR & MENU TOGGLE
   ──────────────────────────────────────── */
function toggleMenu(forceState) {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (typeof forceState === 'boolean') {
    if (forceState) {
      menuToggle.classList.add('active');
      navLinks.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  } else {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');

    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

// Shrink header on scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.classList.add('shrink');
  } else {
    nav.classList.remove('shrink');
  }
});

/* ─────────────────────────────────────────
   2. SCROLL REVEAL (INTERSECTION OBSERVER)
   ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});

/* ─────────────────────────────────────────
   3. HONEST DIALOGUES (Q&A ACCORDIONS)
   ──────────────────────────────────────── */
function toggleQA(cardElement) {
  const allCards = document.querySelectorAll('.dialogue-qa-card');

  // Close all other cards
  allCards.forEach(card => {
    if (card !== cardElement) {
      card.classList.remove('active');
    }
  });

  // Toggle current card
  cardElement.classList.toggle('active');
}

/* ─────────────────────────────────────────
   4. STATE NAVIGATOR (DYNAMIC SWITCHING)
   ──────────────────────────────────────── */
function switchState(stateId, btnElement) {
  // Remove active state from all buttons
  const allButtons = document.querySelectorAll('.nav-state-btn');
  allButtons.forEach(btn => btn.classList.remove('active'));

  // Add active state to clicked button
  btnElement.classList.add('active');

  // Fade out current active slide and fade in target slide
  const allSlides = document.querySelectorAll('.resonance-slide');
  allSlides.forEach(slide => {
    slide.classList.remove('active');
  });

  const targetSlide = document.getElementById(`slide-${stateId}`);
  if (targetSlide) {
    targetSlide.classList.add('active');
  }
}

/* ─────────────────────────────────────────
   5. BESPOKE STATE AUTOMATION & PRE-FILLING
   ──────────────────────────────────────── */
function selectBespokeState(specName, isFormatOnly = false) {
  const messageInput = document.getElementById('f-message');
  const formatSelect = document.getElementById('f-format');

  // Pre-fill request message only if it is NOT format-only
  if (messageInput && !isFormatOnly) {
    messageInput.value = specName;
  }

  // Intelligent selection mapping based on service name
  if (formatSelect) {
    if (specName.includes('онлайн') || specName.includes('Онлайн')) {
      formatSelect.value = 'Онлайн';
    } else if (specName.includes('Таганрог') || specName.includes('Таганроге')) {
      formatSelect.value = 'Очно (Таганрог)';
    } else if (specName.includes('очно') || specName.includes('Очно') || specName.includes('кабинет') || specName.includes('Ростов')) {
      formatSelect.value = 'Очно (Ростов)';
    } else if (specName.includes('Семейная') || specName.includes('семейную') || specName.includes('семейный') || specName.includes('ребенком') || specName.includes('родите')) {
      formatSelect.value = 'Семейная';
    } else if (specName.includes('роды') || specName.includes('родам') || specName.includes('родов') || specName.includes('Подготовка к родам')) {
      formatSelect.value = 'Подготовка к родам';
    } else if (specName.includes('Супервизия') || specName.includes('супервизи') || specName.includes('коллег')) {
      formatSelect.value = 'Супервизия';
    } else {
      formatSelect.value = 'Пока не знаю';
    }
  }

  // Smooth scroll to the Booking Lounge section
  const bookingSection = document.getElementById('booking');
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Premium soft gold highlight glow on the conversational card container
  const conversationalCard = document.querySelector('.conversational-card');
  if (conversationalCard) {
    conversationalCard.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    conversationalCard.style.boxShadow = '0 0 50px rgba(197, 168, 128, 0.45)';
    setTimeout(() => {
      conversationalCard.style.boxShadow = '';
    }, 1800);
  }

  // Focus name field smoothly
  setTimeout(() => {
    const nameInput = document.getElementById('f-name');
    if (nameInput) nameInput.focus();
  }, 800);
}

/* ─────────────────────────────────────────
   6. DIPLOMAS & CERTIFICATES CAROUSEL
   ──────────────────────────────────────── */
function slideCerts(direction) {
  const carousel = document.getElementById('certsCarousel');
  if (!carousel) return;

  const scrollAmount = 180; // card width (140px) + gap (16px) + extra scroll padding
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Certificate array paths
const certsList = [
  'img/certificates/1.jpg',
  'img/certificates/2.jpg',
  'img/certificates/3.jpg',
  'img/certificates/4.jpg',
  'img/certificates/5.jpg',
  'img/certificates/6.jpg',
  'img/certificates/7.jpg'
];
let currentCertIndex = 0;

function openCert(index) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  currentCertIndex = index;
  if (currentCertIndex < 0) currentCertIndex = certsList.length - 1;
  if (currentCertIndex >= certsList.length) currentCertIndex = 0;

  lightboxImg.src = certsList[currentCertIndex];

  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = '';
}

function nextCert() {
  currentCertIndex = (currentCertIndex + 1) % certsList.length;
  openCert(currentCertIndex);
}

function prevCert() {
  currentCertIndex = (currentCertIndex - 1 + certsList.length) % certsList.length;
  openCert(currentCertIndex);
}

/* ─────────────────────────────────────────
   7. OFFICE GALLERY LIGHTBOX (SENSORY ILLUSTRATIONS)
   ──────────────────────────────────────── */
const officePhotos = [
  `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="400" fill="#FAF7F2" rx="6"/>
    <rect x="20" y="20" width="560" height="360" fill="none" stroke="#EDE9E2" stroke-width="2"/>
    <text x="300" y="80" font-family="'Cormorant Garamond', serif" font-size="28" font-style="italic" fill="#C5A880" text-anchor="middle">Зона бережной терапии</text>
    <!-- Sage green therapy chair drawing -->
    <path d="M220,320 L380,320 M300,320 L300,280" stroke="#2D2926" stroke-width="4"/>
    <path d="M250,280 Q300,290 350,280 L360,200 Q300,190 240,200 Z" fill="#7E8D79"/>
    <path d="M260,200 Q300,180 340,200" stroke="#FCFAF6" stroke-width="2" fill="none"/>
    <circle cx="300" cy="130" r="14" fill="#C5A880" opacity="0.4"/>
    <text x="300" y="350" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#8C847C" text-anchor="middle">Анатомические кресла, мягкий свет и абсолютное спокойствие</text>
  </svg>`,

  `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="400" fill="#FAF7F2" rx="6"/>
    <rect x="20" y="20" width="560" height="360" fill="none" stroke="#EDE9E2" stroke-width="2"/>
    <text x="300" y="80" font-family="'Cormorant Garamond', serif" font-size="28" font-style="italic" fill="#C5A880" text-anchor="middle">Вид из окон кабинета</text>
    <!-- Elegant windows drawing -->
    <rect x="250" y="140" width="100" height="150" fill="#FFFDFB" stroke="#2D2926" stroke-width="2"/>
    <line x1="300" y1="140" x2="300" y2="290" stroke="#2D2926" stroke-width="1"/>
    <line x1="250" y1="210" x2="350" y2="210" stroke="#2D2926" stroke-width="1"/>
    <path d="M200,320 Q230,260 260,320" fill="#7E8D79" opacity="0.8"/>
    <path d="M340,320 Q370,240 400,320" fill="#7E8D79" opacity="0.4"/>
    <text x="300" y="350" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#8C847C" text-anchor="middle">Панорамные окна в тихий зеленый дворик в центре города</text>
  </svg>`,

  `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="400" fill="#FAF7F2" rx="6"/>
    <rect x="20" y="20" width="560" height="360" fill="none" stroke="#EDE9E2" stroke-width="2"/>
    <text x="300" y="80" font-family="'Cormorant Garamond', serif" font-size="28" font-style="italic" fill="#C5A880" text-anchor="middle">Чайный уголок заземления</text>
    <!-- Tray and Kettle -->
    <path d="M260,260 L340,260 L350,300 L250,300 Z" fill="#EDE9E2" stroke="#2D2926" stroke-width="2"/>
    <circle cx="300" cy="230" r="18" fill="#C5A880"/>
    <path d="M300,212 C295,212 292,208 292,202 Q300,192 300,180 Q300,192 308,202 C308,208 305,212 300,212 Z" fill="#FFFDFB"/>
    <text x="300" y="350" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#8C847C" text-anchor="middle">Свежая вода, успокаивающий травяной чай и кофе для гостей</text>
  </svg>`
];
let currentOfficeIndex = 0;

function openOfficeGallery() {
  currentOfficeIndex = 0;
  renderOfficePhoto();
  document.getElementById('office-lightbox').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeOffice() {
  document.getElementById('office-lightbox').style.display = 'none';
  document.body.style.overflow = '';
}

function renderOfficePhoto() {
  const imgElement = document.getElementById('office-img');
  const svgContent = officePhotos[currentOfficeIndex];

  // Base64 serialize to support error-free render
  const svg64 = btoa(unescape(encodeURIComponent(svgContent)));
  imgElement.src = `data:image/svg+xml;base64,${svg64}`;
}

function nextOffice() {
  currentOfficeIndex = (currentOfficeIndex + 1) % officePhotos.length;
  renderOfficePhoto();
}

function prevOffice() {
  currentOfficeIndex = (currentOfficeIndex - 1 + officePhotos.length) % officePhotos.length;
  renderOfficePhoto();
}

/* ─────────────────────────────────────────
   8. KEYBOARD & TOUCH NAVIGATION FOR LIGHTBOXES
   ──────────────────────────────────────── */
let touchStartX = 0;
let touchEndX = 0;

function bindTouchSwipe(elementId, onSwipeLeft, onSwipeRight) {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  el.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  el.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const threshold = 50;
    if (touchEndX < touchStartX - threshold && onSwipeLeft) {
      onSwipeLeft();
    }
    if (touchEndX > touchStartX + threshold && onSwipeRight) {
      onSwipeRight();
    }
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  bindTouchSwipe('lightbox', nextCert, prevCert);
  bindTouchSwipe('office-lightbox', nextOffice, prevOffice);
});

document.addEventListener('keydown', (e) => {
  const certLightbox = document.getElementById('lightbox').style.display === 'flex';
  const officeLightbox = document.getElementById('office-lightbox').style.display === 'flex';

  if (e.key === 'Escape') {
    if (certLightbox) closeCert();
    if (officeLightbox) closeOffice();
  }

  if (e.key === 'ArrowRight') {
    if (certLightbox) nextCert();
    if (officeLightbox) nextOffice();
  }

  if (e.key === 'ArrowLeft') {
    if (certLightbox) prevCert();
    if (officeLightbox) prevOffice();
  }
});

/* ─────────────────────────────────────────
   9. IMASK PHONE SETUP & INLINE VALIDATION
   ──────────────────────────────────────── */
let phoneMaskInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('f-phone');
  if (phoneInput && typeof IMask !== 'undefined') {
    phoneMaskInstance = IMask(phoneInput, {
      mask: '+{7} (000) 000-00-00'
    });
  }
});

/* ─────────────────────────────────────────
   10. CONVERSATIONAL FORM LEAD HANDLING
   ──────────────────────────────────────── */
async function handleFormSubmit() {
  const btnSubmit = document.getElementById('btnSubmit');
  const feedbackEl = document.getElementById('formFeedback');

  // Reset feedback display
  feedbackEl.style.display = 'none';
  feedbackEl.className = 'form-feedback-message';

  // Honeypot spam trap check
  const honeypot = document.getElementById('f-hp-website').value;
  if (honeypot && honeypot.trim() !== '') {
    feedbackEl.classList.add('success');
    feedbackEl.textContent = '✓ Запрос успешно отправлен! Психотерапевт свяжется с вами в течение 24 часов.';
    feedbackEl.style.display = 'block';
    resetForm();
    return;
  }

  // Extract inputs
  const nameInput = document.getElementById('f-name');
  const formatSelect = document.getElementById('f-format');
  const messageInput = document.getElementById('f-message');

  const name = nameInput.value.trim();
  const format = formatSelect.value;
  const message = messageInput.value.trim();

  if (!name) {
    showFormError('Пожалуйста, укажите ваше имя в предложении.');
    return;
  }

  if (!format) {
    showFormError('Пожалуйста, выберите удобный для вас формат встречи.');
    return;
  }

  // Check phone completeness
  if (!phoneMaskInstance || !phoneMaskInstance.masked.isComplete) {
    showFormError('Пожалуйста, введите ваш номер телефона полностью.');
    return;
  }

  const phone = phoneMaskInstance.value;

  // Compile payload text
  const moscowTime = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
  const textPayload = `📬 <b>Новая заявка (Людмила Шестакова)</b>\n\n`
    + `👤 <b>Имя:</b> ${escapeHTML(name)}\n`
    + `📞 <b>Телефон:</b> ${escapeHTML(phone)}\n`
    + `🖥 <b>Формат сессии:</b> ${escapeHTML(format)}\n`
    + `💬 <b>Терапевтический запрос:</b> ${escapeHTML(message || '—')}\n\n`
    + `🕐 ${moscowTime} (МСК)`;

  // Set submitting visual states
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Отправка запроса...';

  const GOOGLE_SCRIPT_URL = '';

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        text: textPayload,
        key: '' // Shared macro key
      })
    });

    const data = await response.json();

    if (data.ok) {
      // Metrika conversion event trigger
      if (typeof ym !== 'undefined') {
        ym('вставить', 'reachGoal', 'form_lead_kovaleva');
      }

      feedbackEl.classList.add('success');
      feedbackEl.textContent = '✓ Запрос принят! Людмила свяжется с вами в течение 24 часов.';
      feedbackEl.style.display = 'block';
      resetForm();
    } else {
      throw new Error(data.error || 'Server error');
    }
  } catch (error) {
    console.error('Submit error:', error);
    feedbackEl.classList.add('error');
    feedbackEl.textContent = '⚠ Ошибка отправки. Пожалуйста, напишите напрямую в Telegram или WhatsApp.';
    feedbackEl.style.display = 'block';
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Отправить запрос терапевту →';
  }
}

function showFormError(msg) {
  const feedbackEl = document.getElementById('formFeedback');
  feedbackEl.className = 'form-feedback-message error';
  feedbackEl.textContent = `⚠ ${msg}`;
  feedbackEl.style.display = 'block';
}

function resetForm() {
  document.getElementById('f-name').value = '';
  document.getElementById('f-format').selectedIndex = 0;
  document.getElementById('f-message').value = '';
  if (phoneMaskInstance) phoneMaskInstance.value = '';
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ─────────────────────────────────────────
   11. EXPOSING SYSTEM FUNCTIONS GLOBALLY
   ──────────────────────────────────────── */
window.toggleMenu = toggleMenu;
window.toggleQA = toggleQA;
window.switchState = switchState;
window.selectBespokeState = selectBespokeState;
window.slideCerts = slideCerts;
window.openCert = openCert;
window.closeCert = closeCert;
window.nextCert = nextCert;
window.prevCert = prevCert;
window.openOfficeGallery = openOfficeGallery;
window.closeOffice = closeOffice;
window.nextOffice = nextOffice;
window.prevOffice = prevOffice;
window.handleFormSubmit = handleFormSubmit;

/* ─────────────────────────────────────────
   12. HERO PORTRAIT SLIDER
   ──────────────────────────────────────── */
let currentHeroSlide = 0;
let heroInterval = null;

function showHeroSlide(index) {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  if (!heroSlides.length) return;

  currentHeroSlide = index;
  if (currentHeroSlide < 0) {
    currentHeroSlide = heroSlides.length - 1;
  } else if (currentHeroSlide >= heroSlides.length) {
    currentHeroSlide = 0;
  }

  heroSlides.forEach((slide, i) => {
    if (i === currentHeroSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  heroDots.forEach((dot, i) => {
    if (i === currentHeroSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function internalSlideHero(direction) {
  showHeroSlide(currentHeroSlide + direction);
}

function internalSetHeroSlide(index) {
  showHeroSlide(index);
}

function resetHeroTimer() {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
  heroInterval = setInterval(() => internalSlideHero(1), 6000);
}

// Complete dynamic binding for all interactive elements to bypass fragile inline HTML handlers
function bindAllInteractiveElements() {
  // 1. Hero Slider Controls
  const heroPrev = document.getElementById('heroPrevBtn');
  const heroNext = document.getElementById('heroNextBtn');
  if (heroPrev) {
    heroPrev.addEventListener('click', () => {
      resetHeroTimer();
      internalSlideHero(-1);
    });
  }
  if (heroNext) {
    heroNext.addEventListener('click', () => {
      resetHeroTimer();
      internalSlideHero(1);
    });
  }

  const heroDots = document.querySelectorAll('.hero-dot');
  heroDots.forEach((dot, index) => {
    dot.removeAttribute('onclick');
    dot.addEventListener('click', () => {
      resetHeroTimer();
      internalSetHeroSlide(index);
    });
  });

  // 2. Certificates Carousel Controls
  const certPrev = document.getElementById('certPrevBtn');
  const certNext = document.getElementById('certNextBtn');
  if (certPrev) {
    certPrev.addEventListener('click', () => {
      slideCerts(-1);
    });
  }
  if (certNext) {
    certNext.addEventListener('click', () => {
      slideCerts(1);
    });
  }

  // 3. Certificates Cards click
  const certCards = document.querySelectorAll('.cert-item-card');
  certCards.forEach((card, index) => {
    card.removeAttribute('onclick');
    card.addEventListener('click', () => {
      openCert(index);
    });
  });

  // 4. Hero Touch Swipe
  bindTouchSwipe('heroSlidesWrapper', () => {
    resetHeroTimer();
    internalSlideHero(1);
  }, () => {
    resetHeroTimer();
    internalSlideHero(-1);
  });
}

// Start auto-slider and bind all controls safely with readyState check
function initHeroSlider() {
  showHeroSlide(0); // Initialize first active slide
  resetHeroTimer();
  bindAllInteractiveElements();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroSlider);
} else {
  initHeroSlider();
}

// Expose hero slider methods globally with timer reset logic
window.slideHero = (direction) => {
  resetHeroTimer();
  internalSlideHero(direction);
};
window.setHeroSlide = (index) => {
  resetHeroTimer();
  internalSetHeroSlide(index);
};

/* ─────────────────────────────────────────
   14. LEDGER ACCORDION
   ──────────────────────────────────────── */
window.toggleLedger = function(element) {
  const item = element.closest('.ledger-item');
  
  // Close others (optional, makes it a true accordion)
  const allItems = document.querySelectorAll('.ledger-item');
  allItems.forEach(i => {
    if (i !== item) {
      i.classList.remove('active');
    }
  });

  // Toggle current
  item.classList.toggle('active');
};
