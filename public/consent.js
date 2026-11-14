/* ==========================================================================
   Google Analytics 4 + Statcounter + zgoda na ciasteczka — wspólny plik dla stron Zalka Books
   (zalkabooks.com, znajdzslowko., puzzles., learnspanish.). Ten sam plik leży
   w każdym repo; zmieniając go, skopiuj do pozostałych.

   - GA ładuje się DOPIERO po kliknięciu „Akceptuję” (Consent Mode, tryb
     podstawowy): bez zgody żadne zapytanie do Google nie wychodzi.
   - Statcounter (projekt zalkabooks.com) ładuje się po tej samej zgodzie i tylko
     na zalkabooks.com / www — na subdomenach nie, bo projekt liczy jedną witrynę.
     Przejścia bez przeładowania (Next.js) zgłasza record_pageview().
   - Wybór zapisuje ciasteczko zb_consent na .zalkabooks.com, więc obowiązuje
     na wszystkich subdomenach naraz (na *.netlify.app — tylko na tym hoście).
   - Język banera z <html lang>: pl / de / reszta po angielsku. Teksty jako
     \uXXXX, żeby plik działał niezależnie od kodowania, z jakim go poda serwer.
   - Link „Ustawienia cookies” w stopce: <a href="#" data-cookie-settings>.
   - Baner linkuje do polityki prywatności na zalkabooks.com (PRIVACY) — także
     z subdomen, bo jedna polityka opisuje wszystkie strony. Na subdomenach tekst
     nie wspomina Statcountera (textSub), bo tam się nie ładuje.
   ========================================================================== */
(function () {
  var GA_ID = 'G-J9DRJJH1T6';
  var SC_PROJECT = 13366457;
  var SC_SECURITY = '8893cf3d';
  var SC_HOSTS = /^(www\.)?zalkabooks\.com$/;
  var COOKIE = 'zb_consent';
  var MAX_AGE = 60 * 60 * 24 * 180; // 180 dni
  var PRIVACY = {
    pl: 'https://zalkabooks.com/pl/prywatnosc',
    de: 'https://zalkabooks.com/de/datenschutz',
    en: 'https://zalkabooks.com/en/privacy',
  };

  var TEXTS = {
    pl: {
      text: 'U\u017cywamy Google Analytics i Statcounter, \u017ceby wiedzie\u0107, kt\u00f3re strony i ksi\u0105\u017cki Was interesuj\u0105. Ciasteczka analityczne zapiszemy tylko za Twoj\u0105 zgod\u0105.',
      textSub: 'U\u017cywamy Google Analytics, \u017ceby wiedzie\u0107, kt\u00f3re strony i ksi\u0105\u017cki Was interesuj\u0105. Ciasteczka analityczne zapiszemy tylko za Twoj\u0105 zgod\u0105.',
      more: 'Polityka prywatno\u015bci',
      accept: 'Akceptuj\u0119', reject: 'Odrzucam', label: 'Zgoda na ciasteczka',
    },
    de: {
      text: 'Wir nutzen Google Analytics und Statcounter, um zu sehen, welche Seiten und B\u00fccher Sie interessieren. Analyse-Cookies setzen wir nur mit Ihrer Zustimmung.',
      textSub: 'Wir nutzen Google Analytics, um zu sehen, welche Seiten und B\u00fccher Sie interessieren. Analyse-Cookies setzen wir nur mit Ihrer Zustimmung.',
      more: 'Datenschutzerkl\u00e4rung',
      accept: 'Akzeptieren', reject: 'Ablehnen', label: 'Cookie-Einwilligung',
    },
    en: {
      text: 'We use Google Analytics and Statcounter to see which pages and books you find useful. Analytics cookies are only set if you agree.',
      textSub: 'We use Google Analytics to see which pages and books you find useful. Analytics cookies are only set if you agree.',
      more: 'Privacy policy',
      accept: 'Accept', reject: 'Decline', label: 'Cookie consent',
    },
  };

  function readChoice() {
    var m = document.cookie.match(/(?:^|;\s*)zb_consent=(granted|denied)/);
    return m ? m[1] : null;
  }

  function saveChoice(value) {
    var host = location.hostname;
    var domain = /(^|\.)zalkabooks\.com$/.test(host) ? '; domain=.zalkabooks.com' : '';
    document.cookie = COOKIE + '=' + value + '; max-age=' + MAX_AGE + '; path=/' + domain + '; SameSite=Lax' +
      (location.protocol === 'https:' ? '; Secure' : '');
  }

  var loaded = false;
  function loadGA() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
    });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    loadStatcounter();
  }

  function loadStatcounter() {
    if (!SC_HOSTS.test(location.hostname)) return;
    window.sc_project = SC_PROJECT;
    window.sc_invisible = 1;
    window.sc_security = SC_SECURITY;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.statcounter.com/counter/counter.js';
    document.head.appendChild(s);

    // Next.js zmienia strony bez przeładowania — zgłoś każdą kolejną odsłonę.
    var last = location.pathname + location.search;
    function pageview() {
      var now = location.pathname + location.search;
      if (now === last) return;
      last = now;
      var sc = window._statcounter;
      if (sc && typeof sc.record_pageview === 'function') sc.record_pageview();
    }
    ['pushState', 'replaceState'].forEach(function (name) {
      var orig = history[name];
      history[name] = function () {
        var r = orig.apply(this, arguments);
        setTimeout(pageview, 0);
        return r;
      };
    });
    window.addEventListener('popstate', function () { setTimeout(pageview, 0); });
  }

  function clearGACookies() {
    var host = location.hostname;
    var domains = ['', '; domain=' + host, '; domain=.zalkabooks.com'];
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === 'sc_is_visitor_unique') {
        domains.forEach(function (d) {
          document.cookie = name + '=; max-age=0; path=/' + d;
        });
      }
    });
  }

  var banner = null;
  function showBanner() {
    if (banner) return;
    var lang = (document.documentElement.lang || 'en').slice(0, 2).toLowerCase();
    if (!TEXTS[lang]) lang = 'en';
    var t = TEXTS[lang];

    var style = document.createElement('style');
    style.textContent =
      '.zb-consent{position:fixed;z-index:2147483000;left:16px;right:16px;bottom:16px;max-width:560px;margin:0 auto;' +
      'background:#fff;color:#2a2140;border:1px solid rgba(42,33,64,.14);border-radius:16px;' +
      'box-shadow:0 18px 40px -18px rgba(42,33,64,.45);padding:18px 20px;font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}' +
      '.zb-consent p{margin:0 0 14px}' +
      '.zb-consent a{color:inherit;text-decoration:underline;text-underline-offset:2px}' +
      '.zb-consent-actions{display:flex;gap:10px;flex-wrap:wrap}' +
      '.zb-consent button{flex:1 1 140px;font:600 15px/1 system-ui,-apple-system,"Segoe UI",sans-serif;padding:12px 16px;' +
      'border-radius:999px;cursor:pointer;border:2px solid #2a2140}' +
      '.zb-consent .zb-accept{background:#2a2140;color:#fff}' +
      '.zb-consent .zb-reject{background:#fff;color:#2a2140}' +
      '.zb-consent button:focus-visible{outline:3px solid #5b3d8f;outline-offset:2px}' +
      '@media (prefers-color-scheme:dark){.zb-consent{background:#221c33;color:#f3eee6;border-color:rgba(255,255,255,.14)}' +
      '.zb-consent button{border-color:#f3eee6}.zb-consent .zb-accept{background:#f3eee6;color:#221c33}' +
      '.zb-consent .zb-reject{background:transparent;color:#f3eee6}}';
    document.head.appendChild(style);

    banner = document.createElement('div');
    banner.className = 'zb-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', t.label);
    banner.innerHTML = '<p></p><div class="zb-consent-actions">' +
      '<button type="button" class="zb-reject"></button><button type="button" class="zb-accept"></button></div>';
    var p = banner.querySelector('p');
    p.textContent = (SC_HOSTS.test(location.hostname) ? t.text : t.textSub) + ' ';
    var more = document.createElement('a');
    more.href = PRIVACY[lang];
    more.textContent = t.more;
    p.appendChild(more);
    banner.querySelector('.zb-reject').textContent = t.reject;
    banner.querySelector('.zb-accept').textContent = t.accept;
    banner.querySelector('.zb-accept').addEventListener('click', function () { decide('granted'); });
    banner.querySelector('.zb-reject').addEventListener('click', function () { decide('denied'); });
    document.body.appendChild(banner);
  }

  function decide(value) {
    saveChoice(value);
    if (banner) { banner.remove(); banner = null; }
    if (value === 'granted') {
      loadGA();
    } else {
      clearGACookies();
      if (loaded) location.reload(); // wycofana zgoda: odcina już załadowany GA
    }
  }

  function start() {
    var choice = readChoice();
    if (choice === 'granted') loadGA();
    else if (choice === null) showBanner();

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (!a) return;
      e.preventDefault();
      showBanner();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
