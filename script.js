/* Little Roots Dance — shared script */

(function () {
  'use strict';

  /* ── Active nav link ── */
  function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (
        href === page ||
        (page === '' && href === 'index.html') ||
        (page === 'index.html' && href === 'index.html')
      ) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  /* ── Mobile hamburger ── */
  function initMobileNav() {
    const toggle  = document.querySelector('.nav-toggle');
    const drawer  = document.querySelector('.nav-mobile');
    if (!toggle || !drawer) return;

    toggle.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (
        drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── Newsletter form (UI only) ── */
  function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn   = form.querySelector('button');
      if (!input || !input.value.trim()) return;
      btn.textContent = 'You\'re on the list!';
      btn.disabled = true;
      input.disabled = true;
      input.value = '';
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    setActiveNav();
    initMobileNav();
    initNewsletter();
  });
}());
