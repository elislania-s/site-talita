/* ===========================================================
   THAIS BELDEL — script.js
   Navbar transparente > sólida, menu mobile, accordion FAQ,
   reveal on scroll, parallax sutil no hero, envio de formulário.
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- NAVBAR: transparente -> sólida ao rolar ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- MENU MOBILE ---------- */
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMenu');

  const closeMenu = () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ---------- ACCORDION (FAQ) ---------- */
  const triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach(trigger => {
    const panel = trigger.nextElementSibling;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // fecha os outros itens
      triggers.forEach(t => {
        if (t !== trigger) {
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = (i % 4) * 70;
          setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(el => io.observe(el));
  } else {
    // fallback: mostra tudo
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- PARALLAX SUTIL NO HERO ---------- */
  const heroMedia = document.querySelector('.hero__media');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroMedia && !prefersReducedMotion) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMedia.style.transform = `translateY(${y * 0.18}px)`;
      }
    }, { passive: true });
  }

  /* ---------- FORMULÁRIO DE CONTATO ---------- */
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = 'Preencha os campos obrigatórios antes de enviar.';
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      // Simulação de envio — substituir por integração real (API, e-mail, CRM, etc.)
      setTimeout(() => {
        feedback.textContent = 'Mensagem enviada! Retornarei o contato em breve.';
        feedback.style.color = '#6F1023';
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 900);
    });
  }

  /* ---------- ANO NO RODAPÉ ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});