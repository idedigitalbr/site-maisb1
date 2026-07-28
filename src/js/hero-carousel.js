(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.indicator-dot');
    const prevBtn = document.querySelector('.carousel-nav.prev-btn');
    const nextBtn = document.querySelector('.carousel-nav.next-btn');
    const progressBar = document.querySelector('.carousel-progress-bar');
    
    if (!slides.length) return;

    if (slides.length === 1) {
      const activeVideo = slides[0].querySelector('video');
      if (activeVideo) {
        activeVideo.play().catch(() => {});
      }
      return;
    }

    let currentSlide = 0;
    let timer;
    const slideDuration = 7000; // 7 segundos de duração

    function handleVideoEnded() {
      goToSlide((currentSlide + 1) % slides.length);
      startAutoPlay();
    }

    function setProgressBarTransition(durationMs) {
      if (!progressBar) return;
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!progressBar) return;
          progressBar.style.transition = `width ${durationMs}ms linear`;
          progressBar.style.width = '100%';
        });
      });
    }

    function resetProgressBar() {
      if (!progressBar) return;
      
      const activeSlide = slides[currentSlide];
      const video = activeSlide.querySelector('video');
      
      if (video) {
        if (video.duration && !isNaN(video.duration)) {
          setProgressBarTransition(video.duration * 1000);
        } else {
          video.addEventListener('loadedmetadata', function onMetadata() {
            video.removeEventListener('loadedmetadata', onMetadata);
            if (currentSlide === Array.from(slides).indexOf(activeSlide)) {
              setProgressBarTransition(video.duration * 1000);
            }
          });
          setProgressBarTransition(7000);
        }
      } else {
        setProgressBarTransition(slideDuration);
      }
    }

    function goToSlide(index) {
      clearInterval(timer);

      // Pausa e reinicia todos os vídeos, removendo listeners antigos
      slides.forEach((slide) => {
        const video = slide.querySelector('video');
        if (video) {
          video.pause();
          video.currentTime = 0;
          video.removeEventListener('ended', handleVideoEnded);
        }
      });

      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      slides.forEach((slide, i) => {
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        slide.setAttribute('aria-label', `Slide ${i + 1} de ${slides.length}`);
        if (i === index) {
          slide.classList.add('active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('active');
          dot.removeAttribute('aria-current');
        }
      });

      currentSlide = index;
      resetProgressBar();
    }

    function startAutoPlay() {
      clearInterval(timer);
      
      const activeSlide = slides[currentSlide];
      const video = activeSlide.querySelector('video');

      if (video) {
        video.removeEventListener('ended', handleVideoEnded);
        video.currentTime = 0;
        video.play().catch(err => {});
        video.addEventListener('ended', handleVideoEnded);
      } else {
        timer = setInterval(() => {
          goToSlide((currentSlide + 1) % slides.length);
          startAutoPlay();
        }, slideDuration);
      }
    }

    // Ações dos botões indicadores (dots)
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(index);
        startAutoPlay();
      });
    });

    // Ações dos botões de controle de setas (prev / next)
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentSlide - 1);
        startAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentSlide + 1);
        startAutoPlay();
      });
    }

    // Helper seguro para buscar elemento ancestral (resolve problemas de SVG e Nós de Texto)
    function getClosestElement(el, selector) {
      if (!el) return null;
      if (el.nodeType === 3) el = el.parentElement; // normaliza nós de texto
      if (!el) return null;
      if (typeof el.closest === 'function') {
        return el.closest(selector);
      }
      // Fallback manual para navegadores antigos ou elementos SVG sem suporte completo a closest
      let current = el;
      while (current && current !== document.documentElement) {
        if (current.matches && typeof current.matches === 'function' && current.matches(selector)) {
          return current;
        }
        current = current.parentElement || current.parentNode;
      }
      return null;
    }

    // Ações de arrastar (drag) com mouse e deslizar (swipe) com toque
    let startX = 0;
    let isDragging = false;
    const carouselSection = document.querySelector('.hero-carousel-section');

    if (carouselSection) {
      carouselSection.setAttribute('tabindex', '0');
      carouselSection.setAttribute('role', 'region');
      carouselSection.setAttribute('aria-roledescription', 'carousel');
      carouselSection.setAttribute('aria-label', 'Banner principal rotativo');

      carouselSection.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToSlide(currentSlide - 1);
          startAutoPlay();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToSlide(currentSlide + 1);
          startAutoPlay();
        }
      });

      carouselSection.addEventListener('mousedown', (e) => {
        // Ignora drag se clicar em botões, links ou nos indicadores do carrossel
        if (getClosestElement(e.target, '.carousel-nav') || 
            getClosestElement(e.target, '.carousel-indicators') || 
            getClosestElement(e.target, 'a') || 
            getClosestElement(e.target, 'button') || 
            getClosestElement(e.target, '.btn')) return;
        startX = e.clientX;
        isDragging = true;
      });

      carouselSection.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
      });

      carouselSection.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.clientX - startX;
        if (diffX > 80) {
          goToSlide(currentSlide - 1);
          startAutoPlay();
        } else if (diffX < -80) {
          goToSlide(currentSlide + 1);
          startAutoPlay();
        }
      });

      carouselSection.addEventListener('mouseleave', () => {
        isDragging = false;
      });

      // Suporte a gestos de toque (mobile)
      carouselSection.addEventListener('touchstart', (e) => {
        if (getClosestElement(e.target, '.carousel-nav') || 
            getClosestElement(e.target, '.carousel-indicators') || 
            getClosestElement(e.target, 'a') || 
            getClosestElement(e.target, 'button') || 
            getClosestElement(e.target, '.btn')) return;
        startX = e.touches[0].clientX;
        isDragging = true;
      }, { passive: true });

      carouselSection.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.changedTouches[0].clientX - startX;
        if (diffX > 50) {
          goToSlide(currentSlide - 1);
          startAutoPlay();
        } else if (diffX < -50) {
          goToSlide(currentSlide + 1);
          startAutoPlay();
        }
      }, { passive: true });
    }

    // Pausa e retoma carrossel quando muda de aba no navegador (Visibility API)
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearInterval(timer);
        const activeSlide = slides[currentSlide];
        const video = activeSlide.querySelector('video');
        if (video) {
          video.pause();
        }
      } else {
        startAutoPlay();
      }
    });

    // Inicialização do carrossel
    goToSlide(0);
    startAutoPlay();

    // === EFEITO DE GLOW INTERATIVO E ANEL TECNOLÓGICO (OTIMIZADO) ===
    const glowEl = document.querySelector('.hero-interactive-glow');
    const techRingWrapper = document.querySelector('.hero-tech-ring-wrapper');
    
    if ((glowEl || techRingWrapper) && carouselSection) {
      let height = carouselSection.offsetHeight;

      // Posição padrão fixa do glow
      const defaultX = -50;
      const defaultY = height * 0.35;

      // Posições atuais e destino (para interpolação suave - inércia)
      let currentX = defaultX;
      let currentY = defaultY;
      let targetX = defaultX;
      let targetY = defaultY;
      
      let isHeroVisible = true;
      let animationFrameId = null;

      // Intersection Observer para pausar a animação quando a seção não estiver na tela
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible) {
              if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(animate);
              }
            } else {
              if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
              }
            }
          });
        }, { threshold: 0.05 });
        observer.observe(carouselSection);
      }

      // Rastrear mouse no Hero
      carouselSection.addEventListener('mousemove', (e) => {
        const rect = carouselSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Verifica se o mouse está na metade esquerda
        if (x < rect.width / 2) {
          targetX = x;
          targetY = y;
        } else {
          targetX = defaultX;
          targetY = defaultY;
        }

        // Acorda o loop de animação se estiver parado
        if (isHeroVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      });

      carouselSection.addEventListener('mouseleave', () => {
        targetX = defaultX;
        targetY = defaultY;
        
        if (isHeroVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        }
      });

      function animate() {
        if (!isHeroVisible) {
          animationFrameId = null;
          return;
        }

        // Damping/inertia interpolação suave (0.08 é a taxa de suavidade)
        currentX += (targetX - currentX) * 0.08;
        currentY += (targetY - currentY) * 0.08;

        // Atualiza a posição visual via transform GPU (translate3d)
        if (glowEl) {
          glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
        }
        
        // Atualiza a posição do anel tecnológico
        if (techRingWrapper) {
          techRingWrapper.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }

        // Para de rodar o loop se já convergiu para economizar CPU
        const diffX = Math.abs(targetX - currentX);
        const diffY = Math.abs(targetY - currentY);
        
        if (diffX > 0.15 || diffY > 0.15) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          animationFrameId = null;
        }
      }

      // Fallback se não suportar IntersectionObserver
      if (!('IntersectionObserver' in window)) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }
  });
})();
