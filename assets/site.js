// Occitan Rénov : en-tete, menu mobile, apparitions, carrousels,
// leger mouvement de la photo du haut, formulaires de devis.
(function () {
  'use strict';
  var calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* l'en-tete prend une ombre des qu'on descend */
  var entete = document.querySelector('[data-entete]');
  var majEntete = function () {
    if (window.scrollY > 10) entete.setAttribute('data-ombre', '');
    else entete.removeAttribute('data-ombre');
  };
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  /* menu mobile */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu-mobile');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var ouvert = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!ouvert));
      burger.setAttribute('aria-label', ouvert ? 'Ouvrir le menu' : 'Fermer le menu');
      menu.hidden = ouvert;
    });
  }

  /* apparitions au defilement */
  var aReveler = document.querySelectorAll('.reveler');
  if ('IntersectionObserver' in window && !calme) {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        // Les elements d'une meme rangee apparaissent l'un apres l'autre.
        var freres = [].slice.call(e.target.parentNode.children).filter(function (x) { return x.classList.contains('reveler'); });
        e.target.style.transitionDelay = Math.min(freres.indexOf(e.target), 5) * 80 + 'ms';
        e.target.classList.add('vu');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    aReveler.forEach(function (el) { obs.observe(el); });
  } else {
    aReveler.forEach(function (el) { el.classList.add('vu'); });
  }

  /* la photo du haut glisse un peu moins vite que la page */
  var fond = document.querySelector('[data-parallaxe] img');
  if (fond && !calme) {
    var demande = false;
    window.addEventListener('scroll', function () {
      if (demande) return;
      demande = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 800);
        fond.style.translate = '0 ' + (y * 0.22).toFixed(1) + 'px';
        demande = false;
      });
    }, { passive: true });
  }

  /* carrousels : fleches, et fleches masquees aux extremites */
  document.querySelectorAll('[data-carrousel]').forEach(function (c) {
    var piste = c.querySelector('.carrousel-piste');
    var prec = c.querySelector('[data-prec]');
    var suiv = c.querySelector('[data-suiv]');
    var pas = function () { var f = piste.querySelector('.realisation'); return f ? f.getBoundingClientRect().width + 20 : 300; };
    var maj = function () {
      prec.disabled = piste.scrollLeft < 8;
      suiv.disabled = piste.scrollLeft + piste.clientWidth > piste.scrollWidth - 8;
    };
    prec.addEventListener('click', function () { piste.scrollBy({ left: -pas() }); });
    suiv.addEventListener('click', function () { piste.scrollBy({ left: pas() }); });
    piste.addEventListener('scroll', maj, { passive: true });
    window.addEventListener('resize', maj);
    maj();
  });

  /* formulaires de devis : leads-form.js les envoie quand le site est
     relie a son espace LocWeb ; avant ca, on le dit honnetement. */
  document.querySelectorAll('[data-devis]').forEach(function (f) {
    var note = f.querySelector('[data-note]');
    var config = window.LOCWEB_CONFIG || {};
    f.addEventListener('submit', function (e) {
      if (!f.reportValidity()) { e.preventDefault(); return; }
      if (!config.clientId) {
        e.preventDefault();
        note.hidden = false;
        note.textContent = 'Aperçu du site : le formulaire sera relié à votre téléphone et à votre boîte mail à la mise en ligne.';
      }
    });
    f.addEventListener('leadSubmitted', function (ev) {
      note.hidden = false;
      note.textContent = ev.detail && ev.detail.ok
        ? 'Merci, votre demande est bien partie. Nous vous rappelons très vite.'
        : 'L’envoi n’a pas fonctionné. Appelez-nous directement au 07 49 87 98 91.';
      if (ev.detail && ev.detail.ok) f.reset();
    });
  });
})();
