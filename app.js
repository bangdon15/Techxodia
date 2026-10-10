/**
 * TECHXODIA - Clean Product & Engineering Studio
 * Simple, elegant, high-performance interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientGlowFollow();
  initNavbar();
  initHeroBrandStage();
  initProjectFilter();
  initCaseStudyModal();
  initEstimator();
  initContactForm();
});

/* ==========================================================================
   0. Ambient Moving Yellow Glow Follow
   ========================================================================== */
function initAmbientGlowFollow() {
  const cursorOrb = document.getElementById('orb-cursor');
  if (!cursorOrb) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function smoothFollow() {
    currentX += (mouseX - currentX) * 0.07;
    currentY += (mouseY - currentY) * 0.07;
    cursorOrb.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(smoothFollow);
  }

  requestAnimationFrame(smoothFollow);
}

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isShown = navLinks.style.display === 'flex';
      navLinks.style.display = isShown ? 'none' : 'flex';
      if (!isShown) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#090C12';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

/* ==========================================================================
   2. Project Filter
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const cat = card.dataset.category || '';
        const categories = cat.split(/\s+/);
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. Case Study Details Modal
   ========================================================================== */
function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close');
  const bodyContent = document.getElementById('modal-body-content');

  const caseStudies = {
    valence: {
      tag: 'Curated Architectural Atelier & Real Estate',
      title: 'Valence Architectural Holdings',
      client: 'Valence & Domain Atelier',
      liveUrl: 'https://valence-realestate.vercel.app',
      challenge: 'The client needed an editorial, anti-template real estate platform rejecting generic corporate MLS templates to showcase brutalist monoliths, minimal villas, and high-value acquisitions as an architectural monograph.',
      solution: 'Engineered a bespoke web application with a simulated headless CMS property database, auto-rotating dynamic hero slider for top-valued assets, asymmetrical masonry layout, instant taxonomy filter engine, and accessible native modal quick-view system.',
      impact: [
        'Live production deployment on Vercel with sub-second page performance',
        'Dynamic query and filter engine across architectural movements and availability states',
        'High-density editorial typography paired with warm travertine and champagne accents',
        'Integrated interactive confidential dossier inquiry workflow'
      ],
      tech: ['Modern JavaScript', 'Dynamic Property DB', 'CSS Grid & Flexbox', 'Glassmorphism Scrims', 'Vercel']
    },
    casitas: {
      tag: 'Hospitality & Direct Reservation Engine',
      title: 'Casitas Resort Online Booking System',
      client: 'Casitas Resort & Private Stays',
      liveUrl: 'https://resort-booking-online.vercel.app/',
      challenge: 'The resort required a frictionless direct-booking web application where travelers can check live dates for five specific private casitas (Uno, Dos, Tres, Quatro, Singko), view rates, and obtain instant reservation codes without high third-party OTA commission fees.',
      solution: 'Developed an interactive booking engine featuring stay-date validation, automated price calculations based on casita tier, client-side booking storage engine, and a dual-view guest and administrative portal.',
      impact: [
        'Instant date conflict validation and real-time casita availability status',
        'Direct booking flow eliminating 15–20% third-party booking commissions',
        'Automated unique reservation reference code generator and guest confirmation',
        'Integrated Admin management portal to review and manage all reservations'
      ],
      tech: ['JavaScript ES6+', 'Availability Engine', 'LocalStorage State', 'Responsive UI', 'Vercel']
    },
    finpulse: {
      tag: 'Android OS & Mobile Engineering Showcase',
      title: 'FinPulse — Android Personal Finance Tracker',
      client: 'Mobile Engineering & FinTech Lab',
      image: 'finpulse.png',
      screens: [
        {
          id: 'dashboard',
          name: 'Core Dashboard & Balance',
          tag: 'Core UI • Balance Tracking',
          img: 'finpulse/1.PNG',
          highlight: 'Live ₱37,942.11 balance on signature Terracotta Sun card, quick salary ingestion, and disposable cash vs credit liability computation.',
          details: 'The central command deck for personal finance. Crafted using 100% Jetpack Compose with custom elevation and a radiant Tropical Turquoise (#40E0D0) surface contrasted with warm Terracotta Sun (#E2725B) accents. Automatically deducts credit liabilities to show real spendable cash.'
        },
        {
          id: 'weekly',
          name: 'Weekly Telemetry & Receipts',
          tag: 'Vico Engine • Spending Trends',
          img: 'finpulse/2.PNG',
          highlight: '7-day rolling spending telemetry powered by the Vico charting engine with categorized merchant transactions and inline photo receipts.',
          details: 'Displays weekly transaction velocity with dynamic bar columns. The bottom feed parses transactions with dedicated category icons (Food, Utilities, Gaming) and embeds thumbnail previews for transactions with attached photo proofs.'
        },
        {
          id: 'monthly',
          name: 'Monthly Analytics & Receipts',
          tag: 'Ledger Audit • Photo Gallery',
          img: 'finpulse/3.PNG',
          highlight: 'August 2026 Monthly Breakdown aggregating Income (₱50,000), Expenses (₱12,557), Net (₱37,442), and visual Transaction Gallery.',
          details: 'Comprehensive month-level financial health analysis. Organizes cashflow into Salary, Expense, and Credit, with an interactive visual Transaction Gallery displaying receipt proof images for frictionless bookkeeping.'
        },
        {
          id: 'fiscalyear',
          name: 'Fiscal Year Time Engine',
          tag: 'Time Navigation • Fiscal Years',
          img: 'finpulse/4.PNG',
          highlight: 'Material 3 bottom-sheet selector allowing instantaneous time travel across fiscal years (2025, 2026, 2027) with active Golden Saffron indicator.',
          details: 'Designed for deep historical audits and multi-year projection. Users can switch fiscal calendar periods in a single tap without re-querying the database, leveraging Room reactive Flow state caching.'
        },
        {
          id: 'monthpicker',
          name: 'Month & Period Selector',
          tag: 'Material 3 • Time Engine',
          img: 'finpulse/5.PNG',
          highlight: 'Dynamic month-level bottom sheet with Golden Saffron (#F4C430) active pills for immediate period filtering.',
          details: 'A clean, accessible Material 3 bottom-sheet with Golden Saffron (#F4C430) active pills. Allows users to inspect and audit past months or project upcoming financial liabilities effortlessly.'
        },
        {
          id: 'entry',
          name: 'Expense Entry & Camera Capture',
          tag: 'Transaction Flow • Receipt OCR Hook',
          img: 'finpulse/6.PNG',
          highlight: 'Log purchases with category icons, installment tracking toggles, and direct camera/gallery receipt attachment ready for ML Kit.',
          details: 'Fast, frictionless purchase creation workflow. Supports merchant name, currency amount, custom category icons, Credit Card / Installment flags, and a direct photo capture hook ready for ML Kit OCR text recognition.'
        },
        {
          id: 'liquidity',
          name: 'Liquidity & Debt Calculation',
          tag: 'Financial Health • Debt Ratio',
          img: 'finpulse/Capture.PNG',
          highlight: 'High-definition financial wellness overview computing total disposable liquidity, debt-to-income cushion, and scheduled bill obligations.',
          details: 'Provides the user with immediate clarity on spendable cash reserves after earmarking funds for upcoming credit card statements, ensuring zero surprise overdrafts or interest penalties.'
        }
      ],
      challenge: 'Personal finance apps often compromise between aesthetic vibrance and security, either relying on clunky unencrypted local databases, fragile state management, or slow web wrappers that compromise native Android touch fluency.',
      solution: 'Engineered a modern, native Android application using Jetpack Compose, Material 3, and Clean Architecture (MVVM with State-Event pattern). Hardened user privacy using encrypted Room persistence with SQLCipher and Biometric API authentication, paired with dynamic Vico charts in an authentic Terracotta Sun design system.',
      impact: [
        '100% declarative UI built with Jetpack Compose & Material 3 in a custom Terracotta Sun theme',
        'Hardware-accelerated database encryption with SQLCipher for Room persistence',
        'Biometric fingerprint & facial recognition lock for sensitive ledgers',
        'Interactive multi-year transaction tracking & dynamic Vico spending charts',
        'Receipt photo attachment pipeline with ML Kit parsing foundation'
      ],
      tech: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Clean Architecture (MVVM)', 'Hilt DI', 'Room (SQLCipher)', 'Biometric API', 'Vico Charts', 'Coroutines & Flow']
    },
    krypton: {
      tag: 'Fintech Platform',
      title: 'Krypton Capital Trading Terminal',
      client: 'Krypton Ltd. (London)',
      challenge: 'The client needed an institutional web platform capable of ingesting high-throughput market streams without UI freezes or frame drops.',
      solution: 'We engineered a high-performance React 19 and WebAssembly architecture with binary Protobuf streaming and automated order execution buffers.',
      impact: [
        'Sub-5ms tick-to-screen rendering latency',
        '$80M+ daily algorithmic trade volume handled reliably',
        'Zero dropped messages during peak global market hours'
      ],
      tech: ['React 19', 'TypeScript', 'Rust WebAssembly', 'WebSockets', 'TailwindCSS']
    },
    omnihealth: {
      tag: 'Healthcare & EHR',
      title: 'OmniHealth Telehealth Portal',
      client: 'OmniHealth Inc. (San Francisco)',
      challenge: 'Doctors were losing 3+ hours daily on manual clinical charting, and existing patient portals suffered from choppy video and poor mobile support.',
      solution: 'Built an end-to-end encrypted WebRTC telehealth portal integrated with local AI transcription that drafts clinical SOAP notes automatically.',
      impact: [
        '68% reduction in physician charting overhead',
        '100% HIPAA and SOC-2 Type II compliant on first audit',
        'Over 120,000 successful telemedicine encounters'
      ],
      tech: ['Next.js', 'WebRTC', 'FastAPI', 'AWS HealthLake', 'PostgreSQL']
    },
    vaultx: {
      tag: 'Mobile Banking',
      title: 'VaultX NeoBank iOS & Android',
      client: 'VaultX AG (Zurich)',
      challenge: 'High-net-worth mobile wealth application requiring banking-grade biometric security and instant multi-currency global settlement.',
      solution: 'Engineered native iOS (Swift) and Android (Kotlin) apps with hardware Secure Enclave encryption and multi-signature authorization keys.',
      impact: [
        '$1.2B in custody assets secured without a single breach',
        'Average transfer settlement completed in 0.4 seconds',
        '4.9-star average rating across App Store & Google Play'
      ],
      tech: ['SwiftUI', 'Kotlin Multiplatform', 'gRPC', 'AWS Key Management']
    },
    aura: {
      tag: '3D & Spatial Commerce',
      title: 'Aura 3D Product Customizer',
      client: 'Aura Studio (Milan)',
      challenge: 'Luxury custom furniture brand needed an in-browser 3D configuration tool that loaded fast on mobile devices without lag.',
      solution: 'Developed a custom Three.js renderer utilizing Draco mesh compression to deliver photorealistic interactive rendering under 1.5s.',
      impact: [
        '28% increase in direct e-commerce checkout conversion',
        '+340% increase in user session engagement time',
        'Smooth 60 FPS performance across 98% of mobile devices'
      ],
      tech: ['Three.js', 'WebGL', 'Shopify Plus', 'React', 'GLSL']
    }
  };

  document.querySelectorAll('.case-study-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.modal;
      const data = caseStudies[key];
      if (!data || !modal || !bodyContent) return;

      bodyContent.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 8px; flex-wrap: wrap;">
          <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--primary); letter-spacing: 0.05em;">
            ${data.tag}
          </div>
          ${data.liveUrl ? `
            <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-live-site" style="font-size: 0.78rem; padding: 4px 10px;">
              <span>${data.liveUrl.includes('github.com') ? 'View on GitHub' : 'Launch Live Site'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 6px; color: #FFF;">${data.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 16px;">Client: ${data.client}</p>

        ${data.screens && data.screens.length > 0 ? `
          <div class="modal-gallery-showcase">
            <div class="gallery-tabs-row">
              ${data.screens.map((s, idx) => `
                <button class="gallery-tab-btn ${idx === 0 ? 'active' : ''}" data-screen-idx="${idx}">
                  <span>${s.name}</span>
                </button>
              `).join('')}
            </div>

            <div class="gallery-display-stage">
              <div class="gallery-phone-frame">
                <img id="gallery-active-img" src="${data.screens[0].img}" alt="${data.screens[0].name}">
              </div>
              <div class="gallery-meta-panel">
                <div class="gallery-badge" id="gallery-active-tag">${data.screens[0].tag}</div>
                <h4 class="gallery-screen-title" id="gallery-active-title">${data.screens[0].name}</h4>
                <div class="gallery-screen-highlight" id="gallery-active-highlight">${data.screens[0].highlight}</div>
                <p class="gallery-screen-desc" id="gallery-active-desc">${data.screens[0].details}</p>
                
                <div class="gallery-nav-controls">
                  <button class="gallery-nav-btn prev" id="gallery-prev-btn">← Previous Screen</button>
                  <span class="gallery-counter" id="gallery-counter">1 of ${data.screens.length}</span>
                  <button class="gallery-nav-btn next" id="gallery-next-btn">Next Screen →</button>
                </div>
              </div>
            </div>

            <!-- Thumbnail strip -->
            <div class="gallery-thumbnails-strip">
              ${data.screens.map((s, idx) => `
                <div class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" data-screen-idx="${idx}" title="${s.name}">
                  <div class="thumb-img-wrap"><img src="${s.img}" alt="${s.name}"></div>
                  <span class="thumb-label">${idx + 1}. ${s.name.split('&')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : data.image ? `
          <div style="margin-bottom: 22px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(226, 114, 91, 0.35); box-shadow: 0 16px 36px rgba(0, 0, 0, 0.7), 0 0 24px rgba(226, 114, 91, 0.15); background: #07090E;">
            <img src="${data.image}" alt="${data.title}" style="width: 100%; height: auto; max-height: 480px; object-fit: contain; display: block; margin: 0 auto;">
          </div>
        ` : ''}

        <div style="margin-bottom: 18px;">
          <h4 style="font-size: 0.95rem; color: var(--primary); margin-bottom: 6px;">The Challenge</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">${data.challenge}</p>
        </div>

        <div style="margin-bottom: 18px;">
          <h4 style="font-size: 0.95rem; color: var(--primary); margin-bottom: 6px;">The Techxodia Solution</h4>
          <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.6;">${data.solution}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 0.95rem; color: #FFF; margin-bottom: 8px;">Measurable Impact</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
            ${data.impact.map((item) => `<li style="font-size: 0.88rem; color: #CBD5E1;"><span style="color:var(--primary); font-weight:bold; margin-right:6px;">✓</span>${item}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 8px; text-transform: uppercase;">Technologies Deployed</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${data.tech.map((t) => `<span style="font-size: 0.78rem; background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 4px; color: #FFF;">${t}</span>`).join('')}
          </div>
        </div>
      `;

      // Wire up interactive gallery controls if screens exist
      if (data.screens && data.screens.length > 0) {
        let currentScreenIndex = 0;
        const screens = data.screens;

        const updateScreenView = (idx) => {
          currentScreenIndex = idx;
          const s = screens[idx];
          const imgEl = bodyContent.querySelector('#gallery-active-img');
          const tagEl = bodyContent.querySelector('#gallery-active-tag');
          const titleEl = bodyContent.querySelector('#gallery-active-title');
          const highlightEl = bodyContent.querySelector('#gallery-active-highlight');
          const descEl = bodyContent.querySelector('#gallery-active-desc');
          const counterEl = bodyContent.querySelector('#gallery-counter');

          if (imgEl) {
            imgEl.style.opacity = '0';
            setTimeout(() => {
              imgEl.src = s.img;
              imgEl.style.opacity = '1';
            }, 150);
          }
          if (tagEl) tagEl.textContent = s.tag;
          if (titleEl) titleEl.textContent = s.name;
          if (highlightEl) highlightEl.textContent = s.highlight;
          if (descEl) descEl.textContent = s.details;
          if (counterEl) counterEl.textContent = `${idx + 1} of ${screens.length}`;

          bodyContent.querySelectorAll('.gallery-tab-btn').forEach((tab, i) => {
            tab.classList.toggle('active', i === idx);
          });
          bodyContent.querySelectorAll('.gallery-thumb-item').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === idx);
          });
        };

        bodyContent.querySelectorAll('.gallery-tab-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.screenIdx, 10);
            updateScreenView(idx);
          });
        });

        bodyContent.querySelectorAll('.gallery-thumb-item').forEach((thumb) => {
          thumb.addEventListener('click', () => {
            const idx = parseInt(thumb.dataset.screenIdx, 10);
            updateScreenView(idx);
          });
        });

        const prevBtn = bodyContent.querySelector('#gallery-prev-btn');
        const nextBtn = bodyContent.querySelector('#gallery-next-btn');

        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            const nextIdx = (currentScreenIndex - 1 + screens.length) % screens.length;
            updateScreenView(nextIdx);
          });
        }

        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            const nextIdx = (currentScreenIndex + 1) % screens.length;
            updateScreenView(nextIdx);
          });
        }
      }

      modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        modal.classList.remove('active');
      } else if (e.key === 'ArrowLeft') {
        const prevBtn = modal.querySelector('#gallery-prev-btn');
        if (prevBtn) prevBtn.click();
      } else if (e.key === 'ArrowRight') {
        const nextBtn = modal.querySelector('#gallery-next-btn');
        if (nextBtn) nextBtn.click();
      }
    });
  }
}

/* ==========================================================================
   4. Project Estimator
   ========================================================================== */
function initEstimator() {
  const platformChips = document.querySelectorAll('#platform-chips .chip');
  const aiChips = document.querySelectorAll('#ai-chips .chip');
  const speedChips = document.querySelectorAll('#speed-chips .chip');

  const priceRangeVal = document.getElementById('price-range-val');
  const timeRangeVal = document.getElementById('time-range-val');
  const resPlatform = document.getElementById('res-platform');
  const resAi = document.getElementById('res-ai');

  function calculate() {
    const actPlatform = document.querySelector('#platform-chips .chip.active');
    const actAi = document.querySelector('#ai-chips .chip.active');
    const actSpeed = document.querySelector('#speed-chips .chip.active');

    const pCost = parseFloat(actPlatform?.dataset.cost || 24000);
    const aCost = parseFloat(actAi?.dataset.cost || 4000);
    const mult = parseFloat(actSpeed?.dataset.mult || 1.0);

    const subtotal = (pCost + aCost) * mult;
    const min = Math.round(subtotal * 0.95);
    const max = Math.round(subtotal * 1.15);

    const pWeeks = parseInt(actPlatform?.dataset.weeks || 6);
    const aWeeks = parseInt(actAi?.dataset.weeks || 1);
    const totalWeeks = Math.round((pWeeks + aWeeks) / mult);

    if (priceRangeVal) priceRangeVal.textContent = `$${min.toLocaleString()} – $${max.toLocaleString()}`;
    if (timeRangeVal) timeRangeVal.textContent = `Typical Delivery: ${totalWeeks}–${totalWeeks + 2} Weeks`;

    if (resPlatform) resPlatform.textContent = actPlatform?.textContent || 'Web Application';
    if (resAi) resAi.textContent = actAi?.textContent || 'Standard Backend';
  }

  function bindChips(chips) {
    chips.forEach((c) => {
      c.addEventListener('click', () => {
        chips.forEach((item) => item.classList.remove('active'));
        c.classList.add('active');
        calculate();
      });
    });
  }

  bindChips(platformChips);
  bindChips(aiChips);
  bindChips(speedChips);

  const prefillBtn = document.getElementById('btn-prefill-inquiry');
  if (prefillBtn) {
    prefillBtn.addEventListener('click', () => {
      const msgField = document.getElementById('contact-msg');
      const budgetSelect = document.getElementById('contact-budget');

      if (msgField) {
        msgField.value = `Hi Techxodia team, I'd like to discuss building a project with the following scope:\n- Platform: ${resPlatform?.textContent}\n- Intelligence Tier: ${resAi?.textContent}\n- Estimated Scope: ${priceRangeVal?.textContent} (${timeRangeVal?.textContent})\n\nProject details: `;
      }

      if (budgetSelect) {
        budgetSelect.value = '50k-100k';
      }

      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  calculate();
}

/* ==========================================================================
   5. Contact Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');

  if (form && btn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      btn.disabled = true;
      const originalText = btn.textContent;
      btn.textContent = 'Sending Inquiry...';

      setTimeout(() => {
        btn.textContent = '✓ Inquiry Sent Successfully!';
        btn.style.background = '#10B981';
        btn.style.color = '#FFF';

        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 4000);
      }, 900);
    });
  }
}

/* ==========================================================================
   7. Hero Interactive Brand Logo Stage (media_1790167990411.png)
   ========================================================================== */
function initHeroBrandStage() {
  const stage = document.getElementById('hero-logo-stage');
  const container = document.getElementById('logo-interactive-container');
  const glowBackdrop = document.getElementById('hero-glow-backdrop');

  if (!stage || !container) return;

  let isHovered = false;
  let isSpinning = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetScale = 1;
  let currentScale = 1;

  // Smooth gentle 60fps physics loop
  function updatePhysics() {
    if (!isSpinning) {
      if (isHovered) {
        currentRotX += (targetRotX - currentRotX) * 0.1;
        currentRotY += (targetRotY - currentRotY) * 0.1;
        currentScale += (targetScale - currentScale) * 0.1;

        container.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;

        if (glowBackdrop) {
          const glowX = -currentRotY * 1.5;
          const glowY = currentRotX * 1.5;
          glowBackdrop.style.transform = `translate(calc(-50% + ${glowX.toFixed(1)}px), calc(-50% + ${glowY.toFixed(1)}px)) scale(1.08)`;
        }
      } else {
        // Return backdrop to neutral
        if (glowBackdrop && !glowBackdrop.style.transform.includes('-50%, -50%')) {
          glowBackdrop.style.transform = `translate(-50%, -50%)`;
        }
      }
    }
    requestAnimationFrame(updatePhysics);
  }

  requestAnimationFrame(updatePhysics);

  function handlePointer(clientX, clientY) {
    if (isSpinning) return;
    const rect = stage.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normX = Math.max(-1, Math.min(1, ((x / rect.width) - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, ((y / rect.height) - 0.5) * 2));

    // Subtle, clean, tasteful tilt (max ±12 degrees)
    targetRotX = -normY * 12;
    targetRotY = normX * 14;
    targetScale = 1.04;
  }

  stage.addEventListener('mousemove', (e) => {
    if (!isHovered) {
      isHovered = true;
      container.classList.add('is-hovered');
    }
    handlePointer(e.clientX, e.clientY);
  });

  stage.addEventListener('mouseleave', () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    targetScale = 1;

    setTimeout(() => {
      if (!isHovered && !isSpinning) {
        container.style.transform = '';
        container.classList.remove('is-hovered');
      }
    }, 280);
  });

  // Touch support for mobile devices
  stage.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      if (!isHovered) {
        isHovered = true;
        container.classList.add('is-hovered');
      }
      handlePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    targetScale = 1;
    setTimeout(() => {
      if (!isHovered && !isSpinning) {
        container.style.transform = '';
        container.classList.remove('is-hovered');
      }
    }, 280);
  });

  // Smooth click spin reaction
  container.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    container.classList.remove('is-hovered');
    container.classList.add('is-clicked');

    setTimeout(() => {
      container.classList.remove('is-clicked');
      isSpinning = false;
      if (isHovered) {
        container.classList.add('is-hovered');
        container.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
      } else {
        container.style.transform = '';
      }
    }, 1000);
  });
}
