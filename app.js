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
              <span>Launch Live Site</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 6px; color: #FFF;">${data.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 20px;">Client: ${data.client}</p>

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

      modal.classList.add('active');
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
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
   7. Hero Interactive Spotlight Image (media_1790167990411.png)
   ========================================================================== */
/* ==========================================================================
   7. Hero Interactive 3D Brand Logo Stage (media_1790167990411.png)
   ========================================================================== */
function initHeroBrandStage() {
  const stage = document.getElementById('hero-logo-stage');
  const wrapper = document.getElementById('logo-3d-wrapper');
  const heroImg = document.getElementById('hero-spotlight-image');
  const glare = document.getElementById('logo-3d-glare');
  const shockwave = document.getElementById('logo-shockwave');
  const glowBackdrop = document.getElementById('hero-glow-backdrop');
  const hintChip = document.querySelector('.interaction-hint-chip');

  if (!stage || !wrapper || !heroImg) return;

  // Set initial idle floating state
  wrapper.classList.add('idle-floating');

  let isHovered = false;
  let isSpinning = false;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let targetScale = 1;
  let currentScale = 1;
  let glareOpacity = 0;
  let currentGlareOpacity = 0;
  let lightX = 50;
  let lightY = 50;
  let currentLightX = 50;
  let currentLightY = 50;
  let targetEmbossX = -1;
  let targetEmbossY = -1;
  let currentEmbossX = -1;
  let currentEmbossY = -1;

  // Smooth 60fps physics render loop
  function update3DPhysics() {
    if (!isSpinning) {
      if (isHovered) {
        // Interpolate rotation angles towards target
        currentRotX += (targetRotX - currentRotX) * 0.1;
        currentRotY += (targetRotY - currentRotY) * 0.1;
        currentScale += (targetScale - currentScale) * 0.1;
        currentGlareOpacity += (glareOpacity - currentGlareOpacity) * 0.15;
        currentLightX += (lightX - currentLightX) * 0.12;
        currentLightY += (lightY - currentLightY) * 0.12;
        currentEmbossX += (targetEmbossX - currentEmbossX) * 0.1;
        currentEmbossY += (targetEmbossY - currentEmbossY) * 0.1;

        wrapper.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
        wrapper.style.setProperty('--emboss-x', currentEmbossX.toFixed(3));
        wrapper.style.setProperty('--emboss-y', currentEmbossY.toFixed(3));

        if (glare) {
          glare.style.opacity = currentGlareOpacity.toFixed(2);
          glare.style.background = `radial-gradient(circle at ${currentLightX.toFixed(1)}% ${currentLightY.toFixed(1)}%, rgba(255, 235, 175, 0.42) 0%, rgba(245, 158, 11, 0.18) 32%, transparent 68%)`;
        }

        // Parallax background glow opposite to tilt
        if (glowBackdrop) {
          const glowX = -currentRotY * 1.8;
          const glowY = currentRotX * 1.8;
          glowBackdrop.style.transform = `translate(calc(-50% + ${glowX.toFixed(1)}px), calc(-50% + ${glowY.toFixed(1)}px)) scale(1.12)`;
        }
      } else {
        // Smoothly return emboss variables to classic 315-degree angle
        currentEmbossX += (targetEmbossX - currentEmbossX) * 0.08;
        currentEmbossY += (targetEmbossY - currentEmbossY) * 0.08;
        wrapper.style.setProperty('--emboss-x', currentEmbossX.toFixed(3));
        wrapper.style.setProperty('--emboss-y', currentEmbossY.toFixed(3));

        // Return backdrop glow to center
        if (glowBackdrop && !glowBackdrop.style.transform.includes('-50%, -50%')) {
          glowBackdrop.style.transform = `translate(-50%, -50%)`;
        }
      }
    }

    requestAnimationFrame(update3DPhysics);
  }

  requestAnimationFrame(update3DPhysics);

  // Mouse Move over stage calculates 3D normal vector
  function handlePointerMove(clientX, clientY) {
    if (isSpinning) return;
    const rect = stage.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Normalize from -1 to 1 across stage
    const normX = Math.max(-1, Math.min(1, ((x / rect.width) - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, ((y / rect.height) - 0.5) * 2));

    // Calculate 3D tilt (rotateX inverted for natural surface tilt)
    targetRotX = -normY * 20;
    targetRotY = normX * 22;
    targetScale = 1.05;
    glareOpacity = 0.85;

    // Light source moves with cursor
    lightX = ((normX + 1) / 2) * 100;
    lightY = ((normY + 1) / 2) * 100;

    // Directional relief emboss vectors
    targetEmbossX = normX * 1.35;
    targetEmbossY = normY * 1.35;
  }

  stage.addEventListener('mousemove', (e) => {
    if (!isHovered) {
      isHovered = true;
      wrapper.classList.remove('idle-floating');
      wrapper.classList.add('is-tracking');
    }
    handlePointerMove(e.clientX, e.clientY);
  });

  stage.addEventListener('mouseenter', () => {
    isHovered = true;
    wrapper.classList.remove('idle-floating');
    wrapper.classList.add('is-tracking');
  });

  stage.addEventListener('mouseleave', () => {
    isHovered = false;
    wrapper.classList.remove('is-tracking');
    targetRotX = 0;
    targetRotY = 0;
    targetScale = 1;
    glareOpacity = 0;
    targetEmbossX = -1;
    targetEmbossY = -1;

    // Reset inline transform smoothly before restoring idle orbit
    setTimeout(() => {
      if (!isHovered && !isSpinning) {
        wrapper.style.transform = '';
        wrapper.classList.add('idle-floating');
      }
    }, 280);
  });

  // Touch support for mobile devices
  stage.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      if (!isHovered) {
        isHovered = true;
        wrapper.classList.remove('idle-floating');
        wrapper.classList.add('is-tracking');
      }
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    isHovered = false;
    wrapper.classList.remove('is-tracking');
    targetRotX = 0;
    targetRotY = 0;
    targetScale = 1;
    glareOpacity = 0;
    targetEmbossX = -1;
    targetEmbossY = -1;
    setTimeout(() => {
      if (!isHovered && !isSpinning) {
        wrapper.style.transform = '';
        wrapper.classList.add('idle-floating');
      }
    }, 300);
  });

  // 3D Spin Action on Click
  function trigger3DSpin() {
    if (isSpinning) return;
    isSpinning = true;
    wrapper.classList.remove('idle-floating');
    wrapper.classList.remove('is-tracking');

    // Trigger shockwave
    if (shockwave) {
      shockwave.classList.remove('active');
      void shockwave.offsetWidth; // Force reflow
      shockwave.classList.add('active');
    }

    // Intensify hero image glow during spin
    heroImg.style.filter = 'drop-shadow(0 25px 45px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 65px rgba(245, 158, 11, 0.75))';

    wrapper.classList.add('spinning-3d');

    setTimeout(() => {
      wrapper.classList.remove('spinning-3d');
      heroImg.style.filter = '';
      isSpinning = false;

      if (!isHovered) {
        wrapper.classList.add('idle-floating');
      } else {
        wrapper.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
      }
    }, 1250);
  }

  wrapper.addEventListener('click', trigger3DSpin);

  if (hintChip) {
    hintChip.addEventListener('click', trigger3DSpin);
  }
}
