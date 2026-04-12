(function () {

  /* ── Search index ── */
  var SEARCH_DATA = [
    {
      title: 'Home',
      titleRo: 'Acasă',
      url: '/',
      excerpt: 'Opsistech — Machine Vision and industrial automation specialists in Romania. Automated inspection, robot guidance, AI analysis.',
      excerptRo: 'Opsistech — Specialiști în Machine Vision și automatizare industrială în România. Inspecție automatizată, ghidare robotică, analiză IA.'
    },
    {
      title: 'About Opsistech',
      titleRo: 'Despre Opsistech',
      url: '/#about',
      excerpt: 'Technology firm specialising in machine vision and AI-driven industrial inspection. Precision, Integrity, Innovation, Partnership.',
      excerptRo: 'Companie de tehnologie specializată în machine vision și inspecție industrială bazată pe IA. Precizie, Integritate, Inovație, Parteneriat.'
    },
    {
      title: 'Contact',
      titleRo: 'Contact',
      url: '/#contact',
      excerpt: 'Get in touch with Opsistech. Email: support@opsistech.ro. Phone: 0743 082838. We respond within one business day.',
      excerptRo: 'Contactați Opsistech. Email: support@opsistech.ro. Telefon: 0743 082838. Răspundem în cel mult o zi lucrătoare.'
    },
    {
      title: 'Automated Inspection',
      titleRo: 'Inspecție Automatizată',
      url: '/services/automated-inspection.html',
      excerpt: 'Detect scratches, shape anomalies, missing components, faulty electronics, and packaging defects — 24/7 at production speed.',
      excerptRo: 'Detectați zgârieturi, anomalii de formă, componente lipsă, electronică defectă și defecte de ambalare — 24/7 la viteza producției.'
    },
    {
      title: 'Robot Guidance',
      titleRo: 'Ghidare Robotică',
      url: '/services/robot-guidance.html',
      excerpt: 'Vision-guided robotics for bin picking, assembly, and logistics. 2D and 3D pose estimation for all major robot brands.',
      excerptRo: 'Robotică ghidată vizual pentru bin picking, asamblare și logistică. Estimare de poziție 2D și 3D pentru toți marii producători de roboți.'
    },
    {
      title: 'Measurement & Metrology',
      titleRo: 'Măsurare & Metrologie',
      url: '/services/measurement-metrology.html',
      excerpt: 'Non-contact dimensional verification at micron-level accuracy. Flatness, roundness, gap and flush, thread profiles, SPC.',
      excerptRo: 'Verificare dimensională fără contact la precizie de nivel micron. Planeitate, rotunjime, joc și flush, profile de filete, SPC.'
    },
    {
      title: 'Identification & Tracking',
      titleRo: 'Identificare & Urmărire',
      url: '/services/identification-tracking.html',
      excerpt: 'Barcode, QR, Data Matrix, OCR and DPM reading. Full product traceability integrated with MES and ERP systems.',
      excerptRo: 'Citire coduri de bare, QR, Data Matrix, OCR și DPM. Trasabilitate completă integrată cu sisteme MES și ERP.'
    },
    {
      title: 'AI-Based Analysis',
      titleRo: 'Analiză Bazată pe IA',
      url: '/services/ai-analysis.html',
      excerpt: 'Deep learning for complex defect detection beyond rule-based methods. Anomaly detection, classification, segmentation, edge deployment.',
      excerptRo: 'Deep learning pentru detectarea defectelor complexe dincolo de metodele bazate pe reguli. Detectare anomalii, clasificare, segmentare.'
    },
    {
      title: 'Industries Served',
      titleRo: 'Industrii Deservite',
      url: '/services/industries.html',
      excerpt: 'Automotive, Electronics, Food & Beverage, Logistics, Pharmaceuticals — sector-specific machine vision expertise in Romania.',
      excerptRo: 'Auto, Electronică, Alimentar și Băuturi, Logistică, Farmaceutică — expertiză specifică sectorului în machine vision în România.'
    },
    {
      title: 'Automotive',
      titleRo: 'Auto',
      url: '/services/industries.html',
      excerpt: 'Body panel inspection, weld quality, fastener checks, safety components, robot guidance for assembly — IATF 16949 compliant.',
      excerptRo: 'Inspecție caroserie, calitate suduri, verificare elemente de fixare, componente de siguranță — conform IATF 16949.'
    },
    {
      title: 'Electronics Manufacturing',
      titleRo: 'Fabricare Electronică',
      url: '/services/industries.html',
      excerpt: 'PCB automated optical inspection (AOI), solder paste inspection (SPI), component placement verification.',
      excerptRo: 'Inspecție optică automatizată PCB (AOI), inspecția pastei de lipit (SPI), verificarea plasamentului componentelor.'
    },
    {
      title: 'Pharmaceuticals',
      titleRo: 'Farmaceutică',
      url: '/services/industries.html',
      excerpt: 'Blister pack inspection, tablet verification, serialisation, GMP compliant systems with full audit trails.',
      excerptRo: 'Inspecție blistere, verificare tablete, serializare, sisteme conforme GMP cu trasabilitate completă.'
    }
  ];

  /* ── Resolve URL relative to current page ── */
  function resolveUrl(rootPath) {
    var pathname = window.location.pathname;
    var dir = pathname.replace(/\/[^/]*$/, '');
    var segments = dir.split('/').filter(Boolean);
    var prefix = segments.length > 0 ? segments.map(function () { return '../'; }).join('') : '';
    var hashIdx = rootPath.indexOf('#');
    var path = hashIdx >= 0 ? rootPath.slice(0, hashIdx) : rootPath;
    var hash = hashIdx >= 0 ? rootPath.slice(hashIdx) : '';
    var clean = path.replace(/^\//, '');
    return prefix + clean + hash;
  }

  /* ── Get current lang ── */
  function getLang() {
    return document.documentElement.lang === 'ro' ? 'ro' : 'en';
  }

  /* ── Build overlay ── */
  var overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="search-inner">' +
      '<button class="search-x" id="search-close">Close &times;</button>' +
      '<div class="search-input-wrap">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' +
        '</svg>' +
        '<input type="text" id="search-input" class="search-input" autocomplete="off" spellcheck="false">' +
      '</div>' +
      '<ul id="search-results" class="search-results"></ul>' +
    '</div>';
  document.body.appendChild(overlay);

  /* ── Set placeholder based on lang ── */
  function updatePlaceholder() {
    var inp = document.getElementById('search-input');
    if (inp) inp.placeholder = getLang() === 'ro' ? 'Caută…' : 'Search…';
  }

  /* ── Open / close ── */
  function openSearch() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updatePlaceholder();
    var inp = document.getElementById('search-input');
    if (inp) { inp.value = ''; inp.focus(); }
    var res = document.getElementById('search-results');
    if (res) res.innerHTML = '';
  }

  function closeSearch() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ── Toggle button ── */
  var toggleBtn = document.getElementById('search-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', openSearch);

  /* ── Close on background click or ESC ── */
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSearch();
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
  });

  document.getElementById('search-close').addEventListener('click', closeSearch);

  /* ── Load Fuse.js then wire up search ── */
  var fuseScript = document.createElement('script');
  fuseScript.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.min.js';
  fuseScript.onload = function () {

    var fuse = new Fuse(SEARCH_DATA, {
      keys: [
        { name: 'title',     weight: 0.3 },
        { name: 'titleRo',   weight: 0.3 },
        { name: 'excerpt',   weight: 0.2 },
        { name: 'excerptRo', weight: 0.2 }
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2
    });

    var input = document.getElementById('search-input');
    var results = document.getElementById('search-results');

    input.addEventListener('input', function () {
      var q = input.value.trim();
      results.innerHTML = '';
      if (!q) return;

      var lang = getLang();
      var hits = fuse.search(q, { limit: 7 });

      if (!hits.length) {
        var empty = document.createElement('li');
        empty.className = 'search-empty';
        empty.textContent = lang === 'ro' ? 'Niciun rezultat.' : 'No results found.';
        results.appendChild(empty);
        return;
      }

      hits.forEach(function (hit) {
        var item = hit.item;
        var li = document.createElement('li');
        li.className = 'search-result-item';
        var a = document.createElement('a');
        a.href = resolveUrl(item.url);
        a.innerHTML =
          '<div class="sr-title">' + (lang === 'ro' ? item.titleRo : item.title) + '</div>' +
          '<div class="sr-desc">' + (lang === 'ro' ? item.excerptRo : item.excerpt) + '</div>';
        a.addEventListener('click', closeSearch);
        li.appendChild(a);
        results.appendChild(li);
      });
    });

  };
  document.head.appendChild(fuseScript);

})();
