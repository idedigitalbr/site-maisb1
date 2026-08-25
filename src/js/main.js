(function () {
  /* Debounce helper for high-performance resize listeners */
  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }
  /* ===================================================================
     Menu Mobile + Dropdown Inteligente
     =================================================================== */
  function initMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('#main-menu');
    const allDropdowns = document.querySelectorAll('.dropdown');

    function closeAllDropdowns(except) {
      allDropdowns.forEach(function (d) {
        if (d !== except) {
          d.classList.remove('is-open');
        }
      });
    }

    if (menuToggle && menu) {
      menuToggle.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        if (window.setLucideIcon) window.setLucideIcon(menuToggle, isOpen ? 'x' : 'menu');
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (e) {
          if (link.classList.contains('drop-link')) {
            if (window.innerWidth <= 980) {
              e.preventDefault();
              return;
            }
          }
          menu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    allDropdowns.forEach(function (dropdown) {
      let dropdownTimer;
      dropdown.addEventListener('mouseenter', function () {
        clearTimeout(dropdownTimer);
        closeAllDropdowns(dropdown);
        dropdown.classList.add('is-open');
      });
      dropdown.addEventListener('mouseleave', function () {
        dropdownTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
        }, 200);
      });
      dropdown.addEventListener('focusin', function () {
        clearTimeout(dropdownTimer);
        closeAllDropdowns(dropdown);
        dropdown.classList.add('is-open');
      });
      dropdown.addEventListener('focusout', function () {
        dropdownTimer = setTimeout(function () {
          dropdown.classList.remove('is-open');
        }, 200);
      });
    });
  }

  /* ===================================================================
     Header Scroll Inteligente
     =================================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastScrollY = window.scrollY;
    function checkScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
      } else {
        header.classList.remove('hidden');
      }
      lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  /* ===================================================================
     Cursor Glow Amarelo Premium (Otimizado)
     =================================================================== */
  function initCursorGlow() {
    if (window.matchMedia('(hover: none)').matches) return;
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = 'position:fixed;pointer-events:none;z-index:99999;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle, rgba(255,196,0,0.13) 0%, rgba(255,196,0,0.055) 40%, rgba(255,196,0,0) 70%);transform:translate3d(-999px,-999px,0) translate(-50%,-50%);transition:opacity 0.5s ease;opacity:0;mix-blend-mode:screen;will-change:transform;';
    document.body.appendChild(glow);
    let targetX = -999, targetY = -999, currentX = -999, currentY = -999;
    let animationFrameId = null;

    document.addEventListener('mousemove', function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = '1';
      
      // Acorda o loop de animação se estiver inativo
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(animate);
      }
    });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    });

    function animate() {
      currentX += (targetX - currentX) * 0.10;
      currentY += (targetY - currentY) * 0.10;
      glow.style.transform = 'translate3d(' + currentX + 'px,' + currentY + 'px,0) translate(-50%,-50%)';
      
      // Se a diferença for muito pequena, para o loop para economizar CPU
      const diffX = Math.abs(targetX - currentX);
      const diffY = Math.abs(targetY - currentY);
      
      if (diffX > 0.1 || diffY > 0.1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        animationFrameId = null;
      }
    }
  }

  /* ===================================================================
     Efeito de Ponto de Luz de Fundo (Mouse Spotlight Global)
     =================================================================== */
  function initSectionSpotlights() {
    if (window.matchMedia('(hover: none)').matches) return;
    
    const targetSections = document.querySelectorAll('.about-premium-dark-section, .brands-black-block, .diretrizes-neon-section, .footer, .dark-slice');
    
    targetSections.forEach(function (section) {
      if (window.getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
      }
      section.style.overflow = 'hidden';
      
      let spotlight = section.querySelector('.mouse-spotlight, .about-mouse-spotlight');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'mouse-spotlight';
        section.appendChild(spotlight);
      }
      
      section.addEventListener('mousemove', function (e) {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlight.style.setProperty('--mouse-x', x + 'px');
        spotlight.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  /* ===================================================================
     FAQ Accordion & Gold Pills
     =================================================================== */
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question, .faq-card-question');
    faqQuestions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const item = btn.closest('.faq-item, .faq-card-item');
        if (!item) return;
        const answer = item.querySelector('.faq-answer, .faq-card-answer');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item, .faq-card-item').forEach(function (el) {
          el.classList.remove('active');
          const ans = el.querySelector('.faq-answer, .faq-card-answer');
          if (ans) ans.style.maxHeight = null;
        });
        if (!isActive && answer) {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });

    // Pílulas de filtro de unidades (Gold Pills)
    const goldPills = document.querySelectorAll('.gold-pill');
    goldPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        goldPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
      });
    });
  }

  /* ===================================================================
     Formulario de Lead
     =================================================================== */
  function initLeadForm() {
    const form = document.querySelector('#lead-form');
    const feedback = document.querySelector('.form-feedback');
    if (!form || !feedback) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.style.display = 'none';
      feedback.className = 'form-feedback';
      const nome = form.querySelector('#nome').value.trim();
      const email = form.querySelector('#email').value.trim();
      const msg = form.querySelector('#mensagem').value.trim();
      if (!nome || !email || !msg) {
        feedback.innerText = 'Por favor, preencha todos os campos obrigatorios.';
        feedback.classList.add('error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        feedback.innerText = 'Por favor, insira um e-mail valido.';
        feedback.classList.add('error');
        return;
      }
      feedback.innerText = 'Obrigado! Seu interesse foi registrado. Nossa equipe entrara em contato em breve.';
      feedback.classList.add('success');
      form.reset();
    });
  }

  /* ===================================================================
     Animacao de Reveal por IntersectionObserver
     =================================================================== */
  function initRevealAnimation() {
    const revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) return;
    document.body.classList.add('animations-ready');
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(function (el) { observer.observe(el); });
  }

  /* ===================================================================
     Controle de Modais e Formulários de Contato
     =================================================================== */
  function initModals() {
    const overlay = document.getElementById('wf-modal-overlay');
    const modals = document.querySelectorAll('.wf-modal');
    let previousFocusedElement = null;
    
    function openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (!modal || modal.classList.contains('open')) return;
      
      previousFocusedElement = document.activeElement;
      modals.forEach(function (m) { m.classList.remove('open'); });
      
      if (overlay) overlay.classList.add('open');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');

      // Move focus inside the modal
      const closeBtn = modal.querySelector('.wf-modal-close');
      if (closeBtn) {
        closeBtn.focus();
      } else {
        modal.setAttribute('tabindex', '-1');
        modal.focus();
      }

      document.addEventListener('keydown', handleEscapeKey);
      modal.addEventListener('keydown', trapFocus);
    }
    
    function closeModal() {
      modals.forEach(function (m) { 
        m.classList.remove('open'); 
        m.removeEventListener('keydown', trapFocus);
        // Pause any video inside modal when closing
        const video = m.querySelector('video');
        if (video) {
          video.pause();
          video.src = "";
        }
      });
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      document.removeEventListener('keydown', handleEscapeKey);

      if (previousFocusedElement && previousFocusedElement.focus) {
        previousFocusedElement.focus();
      }
    }

    // Expose functions globally for external control
    window.openModal = openModal;
    window.closeModal = closeModal;

    function handleEscapeKey(e) {
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const modal = e.currentTarget;
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeModal);
      overlay.addEventListener('touchmove', function (e) {
        e.preventDefault();
      }, { passive: false });
    }
    
    document.querySelectorAll('.wf-modal-close').forEach(function (btn) {
      btn.addEventListener('click', closeModal);
    });

    // Listener de mensagens vindas de iframes (ex: links.html)
    window.addEventListener('message', function (e) {
      if (e.data === 'close-modal' || (e.data && e.data.type === 'close-modal')) {
        closeModal();
      }
    });
    
    const triggerMap = {
      'menu-link-links': 'modal-redes-sociais'
    };
    
    Object.keys(triggerMap).forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', function (e) {
          if (e.ctrlKey || e.metaKey || e.button === 1) return;
          e.preventDefault();
          openModal(triggerMap[id]);
        });
      }
    });

    // Capturar cliques em todos os links que apontam para #links ou links.html para abrir o modal atualizado
    document.querySelectorAll('a[href="#links"], a[href="./links.html"], a[href="links.html"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (e.ctrlKey || e.metaKey || e.button === 1) return;
        e.preventDefault();
        openModal('modal-redes-sociais');
      });
    });

    // Verificar hash ao carregar para suportar links externos
    const checkHash = function () {
      const hash = window.location.hash;
      if (hash === '#links') {
        openModal('modal-redes-sociais');
      }
    };
    
    window.addEventListener('hashchange', checkHash);
    setTimeout(checkHash, 300);


  }

  /* ===================================================================
     Carrossel de Depoimentos (novo: .dep-video-card + play inline)
     =================================================================== */
  function initTestimonialsCarousel() {
    const track      = document.getElementById('dep-track') || document.querySelector('.testimonials-carousel-track');
    const cards      = track ? track.querySelectorAll('.dep-video-card') : [];
    const prevBtn    = document.getElementById('dep-prev-btn') || document.querySelector('.testimonials-prev-btn');
    const nextBtn    = document.getElementById('dep-next-btn') || document.querySelector('.testimonials-next-btn');
    const dotsWrap   = document.getElementById('dep-dots')    || document.querySelector('.testimonials-dots');
    const wrapper    = document.querySelector('.testimonials-carousel-wrapper');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const GAP = 24;

    /* ---- helpers ---- */
    function getVisible() {
      if (window.innerWidth > 768)  return 2;
      return 1;
    }

    function maxIdx() {
      return Math.max(0, cards.length - getVisible());
    }

    function goTo(idx) {
      currentIndex = Math.max(0, Math.min(idx, maxIdx()));
      const cardW  = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${currentIndex * (cardW + GAP)}px)`;

      /* active slide classes for layout visibility */
      cards.forEach((card, i) => {
        card.classList.toggle('active-slide', i === currentIndex);
      });

      /* buttons */
      if (prevBtn) prevBtn.disabled = (currentIndex === 0);
      if (nextBtn) nextBtn.disabled = (currentIndex === maxIdx());

      /* dots active state */
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.testimonial-dot').forEach((d, i) => {
          d.classList.toggle('active', i === currentIndex);
        });
      }
    }

    /* ---- dots geração dinâmica ---- */
    function updateDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      const count = maxIdx() + 1;
      for (let i = 0; i < count; i++) {
        const dot = document.createElement('span');
        dot.className = `testimonial-dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      }
    }

    /* ---- nav buttons ---- */
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

    /* ---- inline video play on card click ---- */
    const fsModal = document.getElementById('dep-fullscreen-modal');
    const fsVideo = document.getElementById('dep-fs-video');

    function openCellularFullscreen(origVideo) {
      if (!fsModal || !fsVideo) return;
      origVideo.pause();
      
      fsVideo.src = origVideo.getAttribute('src');
      fsVideo.currentTime = origVideo.currentTime;
      fsVideo.muted = origVideo.muted;
      
      // Copia a tag de informações do card para o modal
      const cardContainer = origVideo.closest('.dep-video-card');
      if (cardContainer) {
        const origTag = cardContainer.querySelector('.dep-card-tag');
        const fsTag = fsModal.querySelector('#dep-fs-tag');
        if (origTag && fsTag) {
          fsTag.innerHTML = origTag.innerHTML;
          const durationEl = fsTag.querySelector('.dep-tag-duration');
          if (durationEl) durationEl.style.display = 'none';
        }
      }
      
      // Atualiza o estado dos botões do modal ao carregar
      const playPauseBtn = fsModal.querySelector('.dep-play-pause-btn');
      if (playPauseBtn) {
        const iconPlay = playPauseBtn.querySelector('.icon-play');
        const iconPause = playPauseBtn.querySelector('.icon-pause');
        if (origVideo.paused) {
          if (iconPlay) iconPlay.style.display = 'block';
          if (iconPause) iconPause.style.display = 'none';
        } else {
          if (iconPlay) iconPlay.style.display = 'none';
          if (iconPause) iconPause.style.display = 'block';
        }
      }

      // Sincroniza o ícone de volume do modal com o estado do vídeo de origem
      const volumeBtn = fsModal.querySelector('.dep-volume-btn');
      if (volumeBtn) {
        const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
        const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
        if (origVideo.muted) {
          if (iconVolOn) iconVolOn.style.display = 'none';
          if (iconVolOff) iconVolOff.style.display = 'block';
        } else {
          if (iconVolOn) iconVolOn.style.display = 'block';
          if (iconVolOff) iconVolOff.style.display = 'none';
        }
      }
      
      // Sincroniza o slider de volume do modal com o estado do vídeo de origem
      const volumeSlider = fsModal.querySelector('.dep-volume-slider');
      if (volumeSlider) {
        volumeSlider.value = origVideo.muted ? 0 : origVideo.volume;
      }

      fsModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');
      fsVideo.play().catch(() => {});
      fsModal.activeOriginalVideo = origVideo;
    }

    function closeCellularFullscreen() {
      if (!fsModal || !fsVideo) return;
      fsVideo.pause();
      fsModal.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
      
      const origVideo = fsModal.activeOriginalVideo;
      if (origVideo) {
        origVideo.currentTime = fsVideo.currentTime;
        origVideo.muted = fsVideo.muted; // Copia estado de mute de volta
        origVideo.volume = fsVideo.volume; // Copia volume também
        
        // Sincroniza o ícone de volume do card original
        const cardContainer = origVideo.closest('.dep-video-card');
        if (cardContainer) {
          const origVolumeBtn = cardContainer.querySelector('.dep-volume-btn');
          const origVolumeSlider = cardContainer.querySelector('.dep-volume-slider');
          if (origVolumeBtn) {
            const iconVolOn = origVolumeBtn.querySelector('.icon-volume-on');
            const iconVolOff = origVolumeBtn.querySelector('.icon-volume-off');
            if (fsVideo.muted) {
              if (iconVolOn) iconVolOn.style.display = 'none';
              if (iconVolOff) iconVolOff.style.display = 'block';
            } else {
              if (iconVolOn) iconVolOn.style.display = 'block';
              if (iconVolOff) iconVolOff.style.display = 'none';
            }
          }
          if (origVolumeSlider) {
            origVolumeSlider.value = fsVideo.muted ? 0 : fsVideo.volume;
          }
        }
        
        origVideo.play().catch(() => {});
      }
    }

    if (fsModal && fsVideo) {
      const closeBtn = fsModal.querySelector('.dep-fs-close-btn');
      const backdrop = fsModal.querySelector('.dep-fs-backdrop');
      if (closeBtn) closeBtn.addEventListener('click', closeCellularFullscreen);
      if (backdrop) backdrop.addEventListener('click', closeCellularFullscreen);
      
      const phoneFrame = fsModal.querySelector('.dep-fs-phone-frame');
      
      fsVideo.addEventListener('play', () => {
        if (phoneFrame) phoneFrame.classList.add('playing');
      });
      
      fsVideo.addEventListener('pause', () => {
        if (phoneFrame) {
          phoneFrame.classList.remove('playing');
          phoneFrame.classList.remove('touch-active');
        }
      });
      
      fsVideo.addEventListener('ended', () => {
        if (phoneFrame) {
          phoneFrame.classList.remove('playing');
          phoneFrame.classList.remove('touch-active');
        }
      });
      
      const triggerFsPlay = (e) => {
        e.stopPropagation();
        if (fsVideo.paused) {
          fsVideo.play().catch(() => {});
        } else {
          fsVideo.pause();
        }
      };

      if (phoneFrame) {
        phoneFrame.addEventListener('click', (e) => {
          if (phoneFrame.classList.contains('playing') && e.pointerType === 'touch') {
            e.stopPropagation();
            e.preventDefault();
            if (!phoneFrame.classList.contains('touch-active')) {
              phoneFrame.classList.add('touch-active');
              clearTimeout(phoneFrame.touchTimeout);
              phoneFrame.touchTimeout = setTimeout(() => {
                phoneFrame.classList.remove('touch-active');
              }, 3000);
            } else {
              phoneFrame.classList.remove('touch-active');
              triggerFsPlay(e);
            }
          } else if (e.target === fsVideo) {
            triggerFsPlay(e);
          }
        });
      }
      
      // Conecta controles customizados do modal
      setupCustomControls(fsModal, fsVideo);
    }

    // Função modular para inicializar os controles customizados
    function setupCustomControls(container, video) {
      const controls = container.querySelector('.dep-custom-controls');
      if (!controls) return;

      controls.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      const playPauseBtn = controls.querySelector('.dep-play-pause-btn');
      const rewindBtn    = controls.querySelector('.dep-rewind-btn');
      const forwardBtn   = controls.querySelector('.dep-forward-btn');
      const volumeBtn    = controls.querySelector('.dep-volume-btn');
      const volumeSlider = controls.querySelector('.dep-volume-slider');
      const fullscreenBtn = controls.querySelector('.dep-fullscreen-btn');
      const timeline     = controls.querySelector('.dep-controls-timeline-wrapper');
      const progress     = controls.querySelector('.dep-controls-timeline-progress');
      const timeText     = controls.querySelector('.dep-ctrl-time');

      if (!playPauseBtn) return;

      const iconPlay = playPauseBtn.querySelector('.icon-play');
      const iconPause = playPauseBtn.querySelector('.icon-pause');

      playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });

      if (rewindBtn) {
        rewindBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.max(0, video.currentTime - 10);
        });
      }

      if (forwardBtn) {
        forwardBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        });
      }

      if (volumeBtn) {
        const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
        const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
        volumeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          if (video.muted) {
            if (iconVolOn) iconVolOn.style.display = 'none';
            if (iconVolOff) iconVolOff.style.display = 'block';
            if (volumeSlider) volumeSlider.value = 0;
          } else {
            if (iconVolOn) iconVolOn.style.display = 'block';
            if (iconVolOff) iconVolOff.style.display = 'none';
            if (volumeSlider) volumeSlider.value = video.volume || 1;
          }
        });
      }

      if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
          e.stopPropagation();
          const val = parseFloat(e.target.value);
          video.volume = val;
          if (val === 0) {
            video.muted = true;
          } else {
            video.muted = false;
          }
          if (volumeBtn) {
            const iconVolOn = volumeBtn.querySelector('.icon-volume-on');
            const iconVolOff = volumeBtn.querySelector('.icon-volume-off');
            if (video.muted) {
              if (iconVolOn) iconVolOn.style.display = 'none';
              if (iconVolOff) iconVolOff.style.display = 'block';
            } else {
              if (iconVolOn) iconVolOn.style.display = 'block';
              if (iconVolOff) iconVolOff.style.display = 'none';
            }
          }
        });
      }

      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openCellularFullscreen(video);
        });
      }

      function formatTime(secs) {
        if (isNaN(secs)) return '00:00';
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = Math.floor(secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      }

      video.addEventListener('timeupdate', () => {
        if (video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          if (progress) progress.style.width = `${pct}%`;
          if (timeText) {
            timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
          }
        }
      });

      if (timeline) {
        timeline.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = timeline.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          if (video.duration) {
            video.currentTime = (clickX / width) * video.duration;
          }
        });
      }

      video.addEventListener('play', () => {
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      });
      video.addEventListener('pause', () => {
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
      });
    }

    cards.forEach(card => {
      const video   = card.querySelector('.dep-video');
      const playBtn = card.querySelector('.dep-play-btn');

      if (!video) return;

      // Inicializa os controles customizados para este card
      setupCustomControls(card, video);

      // Evento de reprodução nativo do vídeo: sincroniza o visual e pausa outros
      video.addEventListener('play', () => {
        cards.forEach(c => {
          if (c !== card) {
            const v = c.querySelector('.dep-video');
            if (v) v.pause();
          }
        });
        card.classList.add('playing');
      });

      // Evento de pausa nativo do vídeo: restaura botão play customizado e tag glass
      video.addEventListener('pause', () => {
        card.classList.remove('playing');
        card.classList.remove('touch-active');
      });

      // Evento de término do vídeo: limpa estados e retorna ao fragmento da thumbnail
      video.addEventListener('ended', () => {
        card.classList.remove('playing');
        card.classList.remove('touch-active');
        card.removeAttribute('data-started');
        
        // Retornar para o frame inicial
        const src = video.getAttribute('src');
        const tMatch = src.match(/#t=([\d.]+)/);
        if (tMatch) {
          video.currentTime = parseFloat(tMatch[1]);
        } else {
          video.currentTime = 0;
        }
      });

      // Interceptação de Fullscreen Nativo do elemento de vídeo do card
      video.addEventListener('webkitbeginfullscreen', (e) => {
        e.preventDefault();
        video.webkitExitFullscreen();
        openCellularFullscreen(video);
      });
      video.addEventListener('fullscreenchange', (e) => {
        if (document.fullscreenElement === video) {
          document.exitFullscreen().then(() => {
            openCellularFullscreen(video);
          });
        }
      });

      // Função de controle de reprodução
      function triggerPlay(e) {
        e.stopPropagation();
        if (video.paused) {
          if (!card.hasAttribute('data-started')) {
            video.currentTime = 0;
            card.setAttribute('data-started', 'true');
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }

      if (playBtn) playBtn.addEventListener('click', triggerPlay);
      
      // Permite alternar play/pause ao clicar em qualquer lugar do card (fora dos controles)
      card.addEventListener('click', function(e) {
        if (card.classList.contains('playing') && e.pointerType === 'touch') {
          e.stopPropagation();
          e.preventDefault();
          if (!card.classList.contains('touch-active')) {
            card.classList.add('touch-active');
            // Remove a classe após 3 segundos
            clearTimeout(card.touchTimeout);
            card.touchTimeout = setTimeout(() => {
              card.classList.remove('touch-active');
            }, 3000);
          } else {
            card.classList.remove('touch-active');
            triggerPlay(e);
          }
        } else {
          triggerPlay(e);
        }
      });
    });

    /* ---- touch swipe ---- */
    if (wrapper) {
      let startX = 0;
      wrapper.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      wrapper.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) goTo(currentIndex + (dx < 0 ? 1 : -1));
      }, { passive: true });

      wrapper.setAttribute('tabindex', '0');
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', 'Depoimentos de clientes e parceiros');
      wrapper.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goTo(currentIndex - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(currentIndex + 1); }
      });
    }

    /* ---- resize recalc ---- */
    window.addEventListener('resize', debounce(() => {
      updateDots();
      goTo(currentIndex);
    }, 150));

    /* ---- init ---- */
    updateDots();
    setTimeout(() => goTo(0), 300);
  }

    /* ===================================================================
     Carrossel Orbital da Secao Nossas Marcas
     =================================================================== */
  function initBrandsSplit() {
    var orbitBox    = document.getElementById('brands-orbit-box');
    var progressArc = document.getElementById('hub-progress-arc');
    var cards       = document.querySelectorAll('.brand-detail-card');
    var nodes       = document.querySelectorAll('.carousel-node');

    if (!orbitBox || !nodes.length || !cards.length) return;

    var SLIDE_DURATION = 9000;
    var ARC_TOTAL      = 465;

    var BRANDS = ['plaza', 'super', 'wine', 'park', 'farma'];

    var BRAND_COLORS = {
      plaza: '#C89223',
      super: '#C89223',
      wine:  '#C89223',
      park:  '#C89223',
      farma: '#C89223'
    };


    var currentIndex     = 0;
    var autoTimer        = null;
    var progressRaf      = null;
    var progressStart    = null;
    var isAutoplayActive = false;
    var elapsedAtPause   = 0;

    // Rastreamento de ângulos acumulados contínuos para rotação fluida sem sobressaltos
    var lineAngles = {};
    var nodeAngles = {};
    BRANDS.forEach(function(b) {
      lineAngles[b] = 0;
      nodeAngles[b] = 0;
    });

    function getNextClockwiseAngle(currentAngle, targetBaseAngle) {
      var currentMod = ((currentAngle % 360) + 360) % 360;
      var diff = targetBaseAngle - currentMod;
      if (diff < 0) {
        diff += 360;
      }
      return currentAngle + diff;
    }

    function getPreviousCounterClockwiseAngle(currentAngle, targetBaseAngle) {
      var currentMod = ((currentAngle % 360) + 360) % 360;
      var diff = targetBaseAngle - currentMod;
      if (diff > 0) {
        diff -= 360;
      }
      return currentAngle + diff;
    }

    function getShortestPathAngle(currentAngle, targetBaseAngle) {
      var currentMod = ((currentAngle % 360) + 360) % 360;
      var diff = targetBaseAngle - currentMod;
      if (diff > 180) {
        diff -= 360;
      } else if (diff < -180) {
        diff += 360;
      }
      return currentAngle + diff;
    }

    function updateNodesScaleManual(inactiveScale, labelOpacity) {
      var activeBrand = BRANDS[currentIndex];
      nodes.forEach(function(node) {
        var brand = node.getAttribute('data-brand');
        var logoWrapper = node.querySelector('.node-logo-wrapper');
        var label = node.querySelector('.node-label');
        if (!logoWrapper) return;

        if (brand === activeBrand) {
          node.style.opacity = '0';
          node.style.pointerEvents = 'none';
        } else {
          node.style.opacity = '1';
          node.style.pointerEvents = 'auto';
          logoWrapper.style.transform = 'scale(' + inactiveScale + ')';
          
          if (label) {
            label.style.transform = 'translateX(-50%)';
            label.style.opacity = labelOpacity;
          }
        }
      });
    }

    function placeNodes(animated, direction) {
      var count  = BRANDS.length;
      var boxW   = orbitBox.offsetWidth  || 440;
      var radius = boxW * 0.4;
      var isMobile = (window.innerWidth <= 980);

      var activeBrand = BRANDS[currentIndex];

      // 1. Atualizar e posicionar os nós satélites usando transform polar circular
      nodes.forEach(function(node) {
        var brand    = node.getAttribute('data-brand');
        var brandIdx = BRANDS.indexOf(brand);
        if (brandIdx < 0) return;

        node.style.display = 'flex';

        var relIdx   = (currentIndex - brandIdx + count) % count;
        
        // Definição dos ângulos base:
        var baseAngle;
        if (isMobile) {
          // No mobile, os 4 slots inativos formam um "X":
          // relIdx=1 -> 45deg (Região inferior/direita)
          // relIdx=2 -> 135deg (Diagonal inferior esquerda)
          // relIdx=3 -> 225deg (Diagonal superior esquerda)
          // relIdx=4 -> 315deg (Diagonal superior direita)
          if (brand === activeBrand) {
            baseAngle = 90; // Em destaque apontado para baixo
          } else {
            baseAngle = 45 + (relIdx - 1) * 90;
          }
        } else {
          // No desktop, slots igualmente espaçados a cada 72deg
          var step = 360 / count;
          baseAngle = relIdx * step;
        }

        var nextAngle;
        if (!animated) {
          nextAngle = baseAngle;
        } else if (isMobile) {
          nextAngle = getShortestPathAngle(nodeAngles[brand] || 0, baseAngle);
        } else if (direction === 'prev') {
          nextAngle = getPreviousCounterClockwiseAngle(nodeAngles[brand] || 0, baseAngle);
        } else {
          nextAngle = getNextClockwiseAngle(nodeAngles[brand] || 0, baseAngle);
        }
        nodeAngles[brand] = nextAngle;

        if (!animated) node.style.transition = 'none';
        node.style.left = '50%';
        node.style.top  = '50%';
        node.style.transform = "translate(-50%, -50%) rotate(" + nextAngle + "deg) translate(" + radius + "px) rotate(" + (-nextAngle) + "deg)";

        var label = node.querySelector('.node-label');
        if (label) label.style.transform = 'translateX(-50%)';

        if (!animated) {
          void node.offsetWidth;
          node.style.transition = '';
        }
      });

      // 2. Calcular o ângulo e escala dinâmicos para a linha ativa apontar exatamente para o logo no card
      var targetAngleToCard = 0;
      var targetScaleToCard = 2.15; // padrão para desktop (430px)

      if (isMobile) {
        targetAngleToCard = 90; // Ponte apontando diretamente para baixo (card no mobile)
        targetScaleToCard = 1.35;
      } else {
        var activeCard = document.querySelector('.brand-detail-card.active');
        var overlapLogo = activeCard ? activeCard.querySelector('.card-logo-overlap') : null;

        if (overlapLogo && orbitBox) {
          var orbitRect = orbitBox.getBoundingClientRect();
          var logoRect  = overlapLogo.getBoundingClientRect();

          var logoCenterX = logoRect.left + logoRect.width / 2;
          var logoCenterY = logoRect.top + logoRect.height / 2;

          var orbitCenterX = orbitRect.left + orbitRect.width / 2;
          var orbitCenterY = orbitRect.top + orbitRect.height / 2;

          var dx = logoCenterX - orbitCenterX;
          var dy = logoCenterY - orbitCenterY;

          var distanceViewport = Math.sqrt(dx * dx + dy * dy);
          var angleRad = Math.atan2(dy, dx);
          targetAngleToCard = angleRad * (180 / Math.PI);

          var distanceSvg = (distanceViewport / orbitRect.width) * 500;
          targetScaleToCard = distanceSvg / 200;
        }
      }

      // 3. Atualizar a Ponte Ativa Compartilhada (Shared Active Bridge Line)
      var activeBridgeLine = document.getElementById('line-active-bridge');
      if (activeBridgeLine) {
        activeBridgeLine.style.stroke = '#C89223';
        activeBridgeLine.style.strokeWidth = '2px';
        activeBridgeLine.style.filter = 'none';
        activeBridgeLine.style.transform = "rotate(" + targetAngleToCard + "deg) scaleX(" + targetScaleToCard + ")";
        activeBridgeLine.style.opacity = '1';
      }


      // 4. Atualizar as transformações CSS de rotação/escala nas linhas dos satélites inativos
      BRANDS.forEach(function(b) {
        var lineEl = document.getElementById('line-' + b);
        if (!lineEl) return;

        if (!animated) lineEl.style.transition = 'none';

        if (b === activeBrand) {
          // Oculta a linha individual da marca ativa para que a ponte estática assuma
          lineEl.style.opacity = '0';
        } else {
          var bIdx = BRANDS.indexOf(b);
          var rIdx = (currentIndex - bIdx + count) % count;
          
          var baseAngle;
          if (isMobile) {
            baseAngle = 45 + (rIdx - 1) * 90;
          } else {
            var step = 360 / count;
            baseAngle = rIdx * step;
          }

          var nextAngle;
          if (!animated) {
            nextAngle = baseAngle;
          } else if (isMobile) {
            nextAngle = getShortestPathAngle(lineAngles[b] || 0, baseAngle);
          } else if (direction === 'prev') {
            nextAngle = getPreviousCounterClockwiseAngle(lineAngles[b] || 0, baseAngle);
          } else {
            nextAngle = getNextClockwiseAngle(lineAngles[b] || 0, baseAngle);
          }
          lineAngles[b] = nextAngle;

          lineEl.classList.remove('active');
          lineEl.style.opacity = '1';
          lineEl.style.strokeWidth = '1.5px';
          lineEl.style.filter = 'drop-shadow(0 0 2px ' + BRAND_COLORS[b] + ')';
          lineEl.style.transform = "rotate(" + nextAngle + "deg) scaleX(1)";
        }
        lineEl.style.stroke = BRAND_COLORS[b];

        if (!animated) {
          void lineEl.getBoundingClientRect();
          lineEl.style.transition = '';
        }
      });
    }

    function updateArcColor(brand) {
      if (!progressArc) return;
      progressArc.setAttribute('stroke', BRAND_COLORS[brand] || '#ffd000');
    }

    function updateCard(brand) {
      cards.forEach(function(card) {
        if (card.getAttribute('data-brand') === brand) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    }

    function updateActiveNodes(brand) {
      nodes.forEach(function(node) {
        if (node.getAttribute('data-brand') === brand) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });
    }

    var SHRINK_DURATION = 600; // Tempo de encolhimento dos ícones no final do slide antes de avançar

    function startProgressArc(fromPause) {
      if (progressRaf) cancelAnimationFrame(progressRaf);
      if (!progressArc) return;
      
      if (!fromPause) {
        elapsedAtPause = 0;
        progressArc.setAttribute('stroke-dashoffset', ARC_TOTAL);
      }
      
      progressStart = performance.now() - elapsedAtPause;
      
      function tick(now) {
        var elapsed = now - progressStart;
        
        if (!isAutoplayActive) {
          // Se o autoplay estiver pausado, o progresso capta até 100% e para
          var progress = Math.min(elapsed / SLIDE_DURATION, 1);
          var offset = ARC_TOTAL * (1 - progress);
          progressArc.setAttribute('stroke-dashoffset', offset);
          
          var scale = 0.4 + (0.85 - 0.4) * progress;
          updateNodesScaleManual(scale, progress <= 0.12 ? '0' : '1');
          
          if (progress < 1) {
            progressRaf = requestAnimationFrame(tick);
          }
          return;
        }

        // Autoplay Ativo: ciclo com preenchimento total e encolhimento no fim
        if (elapsed <= SLIDE_DURATION) {
          // Fase 1: Carregando e crescendo (0% a 100% do progresso)
          var progress = elapsed / SLIDE_DURATION;
          var offset = ARC_TOTAL * (1 - progress);
          progressArc.setAttribute('stroke-dashoffset', offset);
          
          var scale = 0.4 + (0.85 - 0.4) * progress;
          updateNodesScaleManual(scale, progress <= 0.12 ? '0' : '1');
          
          progressRaf = requestAnimationFrame(tick);
        } else if (elapsed <= SLIDE_DURATION + SHRINK_DURATION) {
          // Fase 2: Encolhendo de volta para 0.4 nos 600ms após preenchimento total
          progressArc.setAttribute('stroke-dashoffset', 0); // Mantém preenchido
          
          var shrinkProgress = (elapsed - SLIDE_DURATION) / SHRINK_DURATION;
          var scale = 0.85 - (0.85 - 0.4) * shrinkProgress;
          updateNodesScaleManual(scale, 1 - shrinkProgress);
          
          progressRaf = requestAnimationFrame(tick);
        } else {
          // Fase 3: Próximo slide
          progressRaf = null;
          nextSlide();
        }
      }
      progressRaf = requestAnimationFrame(tick);
    }

    function goToBrand(brandId, animated, direction) {
      var idx = BRANDS.indexOf(brandId);
      if (idx < 0) return;
      currentIndex = idx;
      
      updateCard(brandId);
      updateActiveNodes(brandId);
      updateArcColor(brandId);
      
      placeNodes(animated !== false, direction || 'next');
      startProgressArc();
    }

    function nextSlide() {
      var nextIndex = (currentIndex + 1) % BRANDS.length;
      goToBrand(BRANDS[nextIndex], true, 'next');
    }

    function startAutoPlay() {
      if (isAutoplayActive) return;
      isAutoplayActive = true;
      startProgressArc(true);
    }

    function stopAutoPlay() {
      isAutoplayActive = false;
      if (progressStart) {
        elapsedAtPause = Math.min(performance.now() - progressStart, SLIDE_DURATION);
      }
      if (progressRaf) {
        cancelAnimationFrame(progressRaf);
        progressRaf = null;
      }
    }

    var hubPauseTimeout = null;
    var hubCenterEl = document.getElementById('brands-hub-center');

    function clearHubPause() {
      if (hubPauseTimeout) {
        clearTimeout(hubPauseTimeout);
        hubPauseTimeout = null;
      }
      if (hubCenterEl) {
        hubCenterEl.classList.remove('active');
      }
    }

    if (hubCenterEl) {
      hubCenterEl.addEventListener('click', function(e) {
        e.stopPropagation();
        if (hubCenterEl.classList.contains('active')) {
          clearHubPause();
          startAutoPlay();
        } else {
          hubCenterEl.classList.add('active');
          stopAutoPlay();
          if (hubPauseTimeout) clearTimeout(hubPauseTimeout);
          hubPauseTimeout = setTimeout(function() {
            clearHubPause();
            startAutoPlay();
          }, 40000);
        }
      });
    }

    nodes.forEach(function(node) {
      node.addEventListener('click', function() {
        var brandId = node.getAttribute('data-brand');
        clearHubPause();
        stopAutoPlay();
        goToBrand(brandId, true, 'next');
        startAutoPlay();
      });
      node.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var brandId = node.getAttribute('data-brand');
          clearHubPause();
          stopAutoPlay();
          goToBrand(brandId, true, 'next');
          startAutoPlay();
        }
      });
    });

    // Removido o evento de clique no corpo do card que rolava automaticamente para o rodapé / localizador.
    // Agora apenas cliques explícitos em "Ver localização" realizam o scroll e ativam o mapa.

    var arrowLeft = document.querySelector('.brands-nav-arrow.arrow-left');
    var arrowRight = document.querySelector('.brands-nav-arrow.arrow-right');
    var arrowScrollSnapshot = null;

    function navigateBrandFromArrow(brandId, direction) {
      var preservedScrollX = arrowScrollSnapshot ? arrowScrollSnapshot.x : window.pageXOffset;
      var preservedScrollY = arrowScrollSnapshot ? arrowScrollSnapshot.y : window.pageYOffset;
      arrowScrollSnapshot = null;

      stopAutoPlay();
      goToBrand(brandId, true, direction);
      startAutoPlay();

      // A troca de card pode reposicionar o botão focado no Chromium. A navegação
      // do slide não deve deslocar a posição que o usuário está lendo.
      window.scrollTo({
        left: preservedScrollX,
        top: preservedScrollY,
        behavior: 'auto'
      });
      requestAnimationFrame(function() {
        if (Math.abs(window.pageYOffset - preservedScrollY) > 1) {
          window.scrollTo({
            left: preservedScrollX,
            top: preservedScrollY,
            behavior: 'auto'
          });
        }
      });
    }

    function preventArrowFocusScroll(e) {
      // O foco automático no mousedown reposiciona a página quando o card troca
      // de altura. O teclado continua podendo focar e acionar as setas normalmente.
      arrowScrollSnapshot = {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
      e.preventDefault();
    }

    function captureArrowScroll() {
      arrowScrollSnapshot = {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
    }

    if (arrowLeft) {
      arrowLeft.addEventListener('pointerdown', captureArrowScroll, { passive: true });
      arrowLeft.addEventListener('mousedown', preventArrowFocusScroll);
      arrowLeft.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearHubPause();
        var prevIndex = (currentIndex - 1 + BRANDS.length) % BRANDS.length;
        navigateBrandFromArrow(BRANDS[prevIndex], 'prev');
      });
    }

    if (arrowRight) {
      arrowRight.addEventListener('pointerdown', captureArrowScroll, { passive: true });
      arrowRight.addEventListener('mousedown', preventArrowFocusScroll);
      arrowRight.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearHubPause();
        var nextIndex = (currentIndex + 1) % BRANDS.length;
        navigateBrandFromArrow(BRANDS[nextIndex], 'next');
      });
    }

    window.goToBrand = goToBrand;

    function scrollBrandsIntoView() {
      var marcasSection = document.getElementById('marcas');
      var target = document.querySelector('.brands-layout-split');
      
      if (window.innerWidth > 980 && target) {
        var targetRect = target.getBoundingClientRect();
        var targetTop = targetRect.top + window.pageYOffset;
        var targetHeight = targetRect.height;
        var viewportHeight = window.innerHeight;
        var header = document.querySelector('.site-header');
        var headerHeight = header ? header.offsetHeight : 80;
        
        // Center the split layout in the remaining viewport space under the sticky header
        var remainingHeight = viewportHeight - headerHeight;
        var offset = headerHeight + (remainingHeight - targetHeight) / 2;
        
        // Ensure safe distance from the header
        if (offset < headerHeight + 20) {
          offset = headerHeight + 20;
        }
        
        window.scrollTo({
          top: targetTop - offset,
          behavior: 'smooth'
        });
      } else if (marcasSection) {
        marcasSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function checkBrandHash() {
      var hash = window.location.hash;
      if (!hash) return;
      var brandMatch = hash.match(/^#marca-(super|farma|plaza|park|wine)$/);
      if (brandMatch && brandMatch[1]) {
        var brandId = brandMatch[1];
        scrollBrandsIntoView();
        clearHubPause();
        stopAutoPlay();
        goToBrand(brandId, true);
        startAutoPlay();
      }
    }

    window.addEventListener('hashchange', checkBrandHash);

    // Capturar cliques em links de marca em tempo real na página
    document.querySelectorAll('a[href*="#marca-"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var href = link.getAttribute('href');
        var brandMatch = href ? href.match(/#marca-(super|farma|plaza|park|wine)$/) : null;
        if (brandMatch && brandMatch[1]) {
          e.preventDefault();
          var brandId = brandMatch[1];
          scrollBrandsIntoView();
          history.pushState(null, null, href);
          clearHubPause();
          stopAutoPlay();
          goToBrand(brandId, true);
          startAutoPlay();
        }
      });
    });

    var initialBrand = 'plaza';
    var hashMatch = window.location.hash ? window.location.hash.match(/^#marca-(super|farma|plaza|park|wine)$/) : null;
    if (hashMatch && hashMatch[1]) {
      initialBrand = hashMatch[1];
      setTimeout(function() {
        scrollBrandsIntoView();
      }, 300);
    }

    goToBrand(initialBrand, false);
    startAutoPlay();

    // Gestos Swipe para navegar pelas marcas no mobile
    var touchStartX = 0;
    var touchStartY = 0;

    function handleBrandsTouchStart(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }

    function handleBrandsTouchEnd(e) {
      if (!touchStartX) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        clearHubPause();
        stopAutoPlay();
        if (dx > 0) {
          // Swipe direita -> Marca anterior
          var prevIndex = (currentIndex - 1 + BRANDS.length) % BRANDS.length;
          goToBrand(BRANDS[prevIndex], true, 'prev');
        } else {
          // Swipe esquerda -> Próxima marca
          var nextIndex = (currentIndex + 1) % BRANDS.length;
          goToBrand(BRANDS[nextIndex], true, 'next');
        }
        startAutoPlay();
      }
      touchStartX = 0;
      touchStartY = 0;
    }

    var rightLayout = document.querySelector('.brands-layout-right');
    [orbitBox, rightLayout].forEach(function(el) {
      if (el) {
        el.addEventListener('touchstart', handleBrandsTouchStart, { passive: true });
        el.addEventListener('touchend', handleBrandsTouchEnd, { passive: true });
      }
    });

    // Pausa automática ao passar o mouse sobre o carrossel / cards para facilitar a leitura
    var carouselStage = document.querySelector('.brands-carousel-stage');
    if (carouselStage) {
      carouselStage.addEventListener('mouseenter', function() {
        if (!hubCenterEl || !hubCenterEl.classList.contains('active')) {
          stopAutoPlay();
        }
      });
      carouselStage.addEventListener('mouseleave', function() {
        if (!hubCenterEl || !hubCenterEl.classList.contains('active')) {
          startAutoPlay();
        }
      });
    }

    window.addEventListener('resize', debounce(function() { placeNodes(false); }, 150));
  }

  /* ===================================================================
     Animação de Scroll da Seção Marcas (Expandir + Escalar)
     =================================================================== */
  function initBrandsScrollAnimation() {
    const scrollContainer = document.querySelector('.brands-scroll-container');
    const blackBlock = document.querySelector('.brands-black-block');
    const headline = document.querySelector('.brands-section-head');
    const orbitBox = document.querySelector('.brands-orbit-box');
    const cards = document.querySelectorAll('.brand-detail-card');

    if (!scrollContainer || !blackBlock || !headline || !orbitBox) return;

    function handleScroll() {
      // Se a tela for menor que 980px, limpamos as propriedades inline para responsividade
      if (window.innerWidth <= 980) {
        blackBlock.style.removeProperty('--brands-width-margin');
        blackBlock.style.removeProperty('--brands-height-margin');
        blackBlock.style.removeProperty('--brands-radius');
        blackBlock.style.removeProperty('--brands-padding');
        headline.style.removeProperty('--brands-head-opacity');
        headline.style.removeProperty('--brands-head-translate');
        orbitBox.style.removeProperty('--brands-orbit-scale');
        orbitBox.style.removeProperty('--brands-orbit-opacity');
        cards.forEach(card => {
          card.style.removeProperty('--brands-card-scale');
          card.style.removeProperty('--brands-glow-opacity');
        });
        return;
      }

      const rect = scrollContainer.getBoundingClientRect();
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = window.innerHeight;
      
      // Calcula o progresso do scroll do container
      const totalScrollable = scrollHeight - clientHeight;
      const currentScroll = -rect.top;
      
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress)); // Clampa entre 0 e 1

      // Interpolações lineares (com base nos requerimentos dos prints):
      // 1. Bloco preto cresce: width calc(100% - 70px) -> 100vw, height 100vh - 60px -> 100vh, padding lateral reduz
      const widthMargin = (1 - progress) * 70; // 70px -> 0px
      const heightMargin = (1 - progress) * 60; // 60px -> 0px
      const verticalPadding = 120 - progress * 40; // 120px -> 80px
      const padding = `${verticalPadding}px ${48 - progress * 24}px ${verticalPadding}px`; // Símétrico (topo e base idênticos)

      blackBlock.style.setProperty('--brands-width-margin', `${widthMargin}px`);
      blackBlock.style.setProperty('--brands-height-margin', `${heightMargin}px`);
      blackBlock.style.setProperty('--brands-padding', padding);

      // 2. Headline do topo some (fade out + translateY): opacity 1 -> 0, translate 0 -> -40px
      const headOpacity = 1 - progress * 1.5; // Some antes da metade do scroll
      const headTranslate = -progress * 40;
      headline.style.setProperty('--brands-head-opacity', Math.max(0, headOpacity));
      headline.style.setProperty('--brands-head-translate', `${headTranslate}px`);

      // 3. Espiral diminui de escala (scale 1.08 -> 0.86, opacity 1 -> 0.85)
      const orbitScale = 1.08 - progress * 0.22;
      const orbitOpacity = 1 - progress * 0.15;
      orbitBox.style.setProperty('--brands-orbit-scale', orbitScale);
      orbitBox.style.setProperty('--brands-orbit-opacity', orbitOpacity);

      // 4. Card da direita cresce (scale 0.82 -> 1.05) e recebe mais glow no final (glow-opacity 0.45 -> 0.95)
      const cardScale = 0.82 + progress * 0.23;
      const glowOpacity = 0.45 + progress * 0.50;
      cards.forEach(card => {
        card.style.setProperty('--brands-card-scale', cardScale);
        card.style.setProperty('--brands-glow-opacity', glowOpacity);
      });
    }

    // Registra listener com requestAnimationFrame para performance ideal
    let active = false;
    function onScroll() {
      if (!active) {
        requestAnimationFrame(() => {
          handleScroll();
          active = false;
        });
        active = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', debounce(handleScroll, 150));
    handleScroll(); // Execução inicial
  }

  /* ===================================================================
     Linha do Tempo Interativa "Nossa Trajetória"
     =================================================================== */
  function initTrajetoriaTimeline() {
    var data = [
      {
        year: "2015",
        title: "Início da história com o Mais Barato Tapanã",
        desc: "Início da trajetória do Grupo com a inauguração da primeira loja no Tapanã, levando variedade, preços justos e atendimento próximo para as famílias paraenses.",
        img: "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-tapana-foto-de-fachada-frontal-da-loja.webp"
      },
      {
        year: "2016",
        title: "Lançamento da +B Farma",
        desc: "Expansão estratégica para a área de saúde, beleza e bem-estar com a criação da +B Farma, integrando drogarias completas e atendimento farmacêutico de excelência.",
        img: "./assets/Fotografias/Mais B Farma/foto-banner-maisb-farmacia.webp"
      },
      {
        year: "2021",
        title: "Inauguração do Mais Barato – Plaza",
        desc: "Abertura do moderno complexo no bairro de São Brás, marcando uma nova era de inovação arquitetônica, conforto e ampla variedade de setores em um único local.",
        img: "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-plaza-foto-de-fachada-vila-plaza.webp"
      },
      {
        year: "2022",
        title: "Lançamento do Mais Barato – Alcindo Cacela",
        desc: "Inauguração da grande unidade na Alcindo Cacela, consolidando a presença do Grupo no centro de Belém com infraestrutura premium e serviços de alta qualidade.",
        img: "./assets/Fotografias/Supermercado +B/01_Fachadas/unid-alcindo-foto-de-fachada-da-loja.webp"
      },
      {
        year: "2022",
        title: "Ampliação do Centro de Distribuição",
        desc: "Forte expansão da infraestrutura logística e tecnologia de ponta no CD, ampliando a frota e garantindo eficiência máxima no abastecimento contínuo de todas as lojas.",
        img: "./assets/Fotografias/CENTRO-DISTRIBUICAO.webp"
      },
      {
        year: "2022",
        title: "Inauguração do The Wine",
        desc: "Lançamento do The Wine Experience, trazendo uma adega sofisticada com rótulos internacionais selecionados, consultoria de sommeliers e experiências enogastronômicas exclusivas.",
        img: "./assets/Fotografias/The Wine Experience/salao-principal-clientes.webp"
      },
      {
        year: "2023",
        title: "Inauguração do Villa Plaza",
        desc: "Inauguração do restaurante Villa Plaza, proporcionando alta gastronomia com buffet premium, churrasco especial e pratos executivos em um espaço elegante para a família.",
        img: "./assets/Fotografias/Villa Plaza (Restaurante)/vila-plaza-restaurante-ambiente.webp"
      },
      {
        year: "2023",
        title: "Inauguração do Villa Plaza Park - Unidade Plaza",
        desc: "Estreia do maior parque infantil indoor monitorado na Unidade Plaza, unindo brinquedos modernos, segurança e diversão completa para as crianças.",
        img: "./assets/Fotografias/Villa Plaza (Park Infantil)/foto-park-infantil (1).webp"
      },
      {
        year: "2025",
        title: "Mudança da marca para +B Supermercados",
        desc: "Evolução histórica do posicionamento institucional do Grupo, apresentando a nova identidade visual '+B Supermercados' com design contemporâneo e foco na experiência.",
        img: "./assets/Fotografias/maisb-supermercados-marca-na-parede.webp"
      },
      {
        year: "2026",
        title: "Inauguração do Villa Plaza Park – Unidade Tapanã",
        desc: "Expansão da rede de entretenimento infantil com a nova unidade do Villa Plaza Park no Tapanã, oferecendo lazer monitorado e atrações de primeira linha para a comunidade.",
        img: "./assets/Fotografias/Villa Plaza (Park Infantil)/villa-plaza-park-tapana.webp"
      },
      {
        year: "2026",
        title: "Inauguração do +B Supermercados – Shopping Bosque Grão Pará",
        desc: "Grande inauguração da loja conceito no Shopping Bosque Grão Pará, integrando conveniência de ponta, adega, padaria artesanal e o melhor do ecossistema +B.",
        img: "./assets/Fotografias/maisb-grao-para.webp"
      }
    ];

    var timelineSec = document.getElementById('linha-tempo');
    if (!timelineSec) return;

    var imgEl = document.getElementById('trajetoria-active-img');
    var yearEl = document.getElementById('trajetoria-active-year');
    var titleEl = document.getElementById('trajetoria-active-title');
    var descEl = document.getElementById('trajetoria-active-desc');
    var nextBtn = document.getElementById('trajetoria-next-arrow-btn');
    var prevBtn = document.getElementById('trajetoria-prev-arrow-btn');
    var progressBar = document.getElementById('trajetoria-track-progress-bar');
    var nodes = document.querySelectorAll('.trajetoria-node');
    var scrollContainer = document.querySelector('.trajetoria-scroll-container');

    if (!imgEl || !yearEl || !titleEl || !descEl || nodes.length === 0) return;

    var currentIndex = 0;

    function updateArrowStates() {
      if (prevBtn) {
        if (currentIndex === 0) {
          prevBtn.classList.add('is-disabled');
        } else {
          prevBtn.classList.remove('is-disabled');
        }
      }
      if (nextBtn) {
        if (currentIndex === data.length - 1) {
          nextBtn.classList.add('is-disabled');
        } else {
          nextBtn.classList.remove('is-disabled');
        }
      }
    }

    function updateTimeline(index, animate) {
      if (index < 0 || index >= data.length) return;
      currentIndex = index;

      var item = data[index];

      // Atualiza nós ativos e completados
      nodes.forEach(function (node, i) {
        if (i === index) {
          node.classList.add('active');
          node.classList.remove('completed');
        } else if (i < index) {
          node.classList.add('completed');
          node.classList.remove('active');
        } else {
          node.classList.remove('active');
          node.classList.remove('completed');
        }
      });

      // Atualiza barra de progresso
      var percentage = (index / (data.length - 1)) * 100;
      if (progressBar) {
        progressBar.style.width = percentage + '%';
      }

      // Atualiza estado visual das setas
      updateArrowStates();

      // Animação de transição
      if (animate) {
        imgEl.classList.add('fade-out');
        yearEl.classList.add('fade-out');
        var detailsContainer = document.querySelector('.trajetoria-event-details');
        if (detailsContainer) {
          detailsContainer.classList.add('fade-out');
        }

        setTimeout(function () {
          imgEl.src = item.img;
          imgEl.alt = item.title;
          yearEl.textContent = item.year;
          titleEl.textContent = item.title;
          descEl.textContent = item.desc;

          imgEl.classList.remove('fade-out');
          yearEl.classList.remove('fade-out');
          if (detailsContainer) {
            detailsContainer.classList.remove('fade-out');
          }
        }, 300);
      } else {
        imgEl.src = item.img;
        imgEl.alt = item.title;
        yearEl.textContent = item.year;
        titleEl.textContent = item.title;
        descEl.textContent = item.desc;
      }

      // Scroll mobile para centralizar nó ativo
      if (window.innerWidth <= 768 && scrollContainer) {
        var activeNode = nodes[index];
        if (activeNode) {
          var containerWidth = scrollContainer.offsetWidth;
          var nodeLeft = activeNode.offsetLeft;
          var nodeWidth = activeNode.offsetWidth;
          scrollContainer.scrollTo({
            left: nodeLeft - (containerWidth / 2) + (nodeWidth / 2),
            behavior: 'smooth'
          });
        }
      }
    }

    // Clique nos nós da timeline
    nodes.forEach(function (node, i) {
      node.addEventListener('click', function () {
        if (currentIndex !== i) {
          updateTimeline(i, true);
        }
      });
    });

    // Botão avançar (Next) - não é carrossel infinito
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var nextIndex = currentIndex + 1;
        if (nextIndex < data.length) {
          updateTimeline(nextIndex, true);
        }
      });
    }

    // Botão voltar (Prev) - não é carrossel infinito
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        var prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
          updateTimeline(prevIndex, true);
        }
      });
    }

    // Gestos Swipe para navegar na timeline pelo mobile (arrastando a seção)
    var contentWrapper = document.querySelector('.trajetoria-content-wrapper');
    if (contentWrapper) {
      var touchStartX = 0;
      var touchStartY = 0;

      contentWrapper.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      contentWrapper.addEventListener('touchend', function (e) {
        if (!touchStartX) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;

        // Verifica se o movimento foi predominantemente horizontal e longo o suficiente
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
          if (dx < 0) {
            // Swipe esquerda -> avançar ano
            var nextIndex = currentIndex + 1;
            if (nextIndex < data.length) {
              updateTimeline(nextIndex, true);
            }
          } else {
            // Swipe direita -> voltar ano
            var prevIndex = currentIndex - 1;
            if (prevIndex >= 0) {
              updateTimeline(prevIndex, true);
            }
          }
        }
        touchStartX = 0;
        touchStartY = 0;
      }, { passive: true });
    }

    updateTimeline(0, false);
  }

  /* ===================================================================
     High-Performance Scroll Highlights Handler (Values + Metrics + Neon Cards)
     =================================================================== */
  function initMobileScrollHighlights() {
    var isMobile = window.innerWidth <= 680;

    // 1. Value blocks (Mobile only) - IntersectionObserver
    var valueBlocks = document.querySelectorAll('.about-premium-dark-section .value-block');
    if (valueBlocks.length > 0 && isMobile) {
      var valueObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        rootMargin: '0px 0px -40% 0px' // Threshold at 60% of viewport
      });
      valueBlocks.forEach(function (block) {
        valueObserver.observe(block);
      });
    }

    // 2. Metric cards (Desktop & Mobile) - IntersectionObserver
    var metricCards = document.querySelectorAll('.about-metrics-grid .metric-card');
    if (metricCards.length > 0) {
      var metricObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, {
        rootMargin: '0px 0px -30% 0px' // Threshold at 70% of viewport
      });
      metricCards.forEach(function (card) {
        metricObserver.observe(card);
      });
    }

    // 3. Neon cards (Missão, Visão, Valores) - Gated Scroll on Mobile / Observer on Desktop
    var neonCards = document.querySelectorAll('#diretrizes .neon-card');
    var diretrizesSection = document.getElementById('diretrizes');

    if (neonCards.length > 0 && diretrizesSection) {
      if (isMobile) {
        var isSectionVisible = false;
        var ticking = false;

        function handleNeonScroll() {
          var viewportHeight = window.innerHeight;
          var closestCard = null;
          var minDistance = Infinity;
          var viewportCenter = viewportHeight * 0.50;

          neonCards.forEach(function (card) {
            var rect = card.getBoundingClientRect();
            var cardCenter = rect.top + rect.height / 2;
            var distance = Math.abs(cardCenter - viewportCenter);

            if (rect.bottom > 0 && rect.top < viewportHeight) {
              if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
              }
            }
          });

          neonCards.forEach(function (card) {
            if (card === closestCard) {
              card.classList.add('active');
            } else {
              card.classList.remove('active');
            }
          });
        }

        function onScrollTick() {
          if (!ticking) {
            window.requestAnimationFrame(function () {
              handleNeonScroll();
              ticking = false;
            });
            ticking = true;
          }
        }

        var sectionObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (!isSectionVisible) {
                isSectionVisible = true;
                window.addEventListener('scroll', onScrollTick, { passive: true });
                handleNeonScroll();
              }
            } else {
              if (isSectionVisible) {
                isSectionVisible = false;
                window.removeEventListener('scroll', onScrollTick);
                neonCards.forEach(function (card) {
                  card.classList.remove('active');
                });
              }
            }
          });
        }, {
          rootMargin: '100px 0px 100px 0px'
        });

        sectionObserver.observe(diretrizesSection);
      } else {
        var neonObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            entry.target.classList.toggle('active', entry.isIntersecting);
          });
        }, {
          rootMargin: '0px 0px -25% 0px'
        });
        neonCards.forEach(function (card) {
          neonObserver.observe(card);
        });
      }
    }
  }

  /* ===================================================================
     Bootstrap
     =================================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initHeaderScroll();
    initCursorGlow();
    initSectionSpotlights();
    initFAQ();
    initLeadForm();
    initRevealAnimation();
    initModals();
    initTestimonialsCarousel();
    initBrandsSplit();
    initTrajetoriaTimeline();
    initMobileScrollHighlights();
    // initBrandsScrollAnimation();
  });
})();
