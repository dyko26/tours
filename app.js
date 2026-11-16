/*
 * Guia de Campo Chachagua / Chachagua Field Guide
 * Logica de la aplicacion: i18n dinamico, busqueda, filtrado, modal y bitacora (localStorage).
 */
(function () {
  'use strict';

  const DATA = window.GUIDE_DATA;
  const LS_LANG = 'chachagua.lang';
  const LS_LOG = 'chachagua.logbook.v1';

  /* ------------------------------------------------------------------ */
  /* Diccionario de interfaz                                             */
  /* ------------------------------------------------------------------ */
  const I18N = {
    es: {
      appTitle: 'Guía de Campo Chachagua',
      appSubtitle: 'Bosque muy húmedo tropical de transición - La Pechuga, Chachagua, San Carlos',
      metaDescription: 'Guía de campo offline del bosque muy húmedo tropical de La Pechuga, Chachagua, San Carlos, Costa Rica.',
      langLabel: 'Idioma de la interfaz',
      langSwitchAria: 'Cambiar idioma a inglés',
      searchLabel: 'Buscar especies y artículos',
      searchPlaceholder: 'Buscar por nombre común, científico o familia...',
      clearSearch: 'Limpiar búsqueda',
      navGuide: 'Guía',
      navLogbook: 'Bitácora',
      install: 'Instalar',
      online: 'En línea',
      offline: 'Sin conexión',
      categoriesTitle: 'Categorías',
      categoriesIntro: 'Seleccione un grupo para filtrar el catálogo. Los contenidos describen la biota y los procesos ecológicos del sector de La Pechuga y su río.',
      entriesAll: 'Catálogo completo',
      searchResults: 'Resultados de búsqueda',
      count: n => n === 1 ? '1 registro' : n + ' registros',
      entriesWord: n => n === 1 ? 'entrada' : 'entradas',
      showAll: 'Mostrar todo',
      noResults: 'Sin resultados',
      noResultsHint: 'Revise la ortografía o intente con el nombre científico.',
      viewDetails: 'Ver ficha',
      timesLogged: n => n === 1 ? '1 avistamiento' : n + ' avistamientos',
      article: 'Artículo',
      close: 'Cerrar',
      taxonomy: 'Clasificación taxonómica',
      datasheet: 'Ficha técnica',
      ranks: { kingdom: 'Reino', phylum: 'Filo', class: 'Clase', order: 'Orden', family: 'Familia', genus: 'Género', species: 'Especie' },
      iucnLabel: 'UICN',
      iucn: { LC: 'Preocupación menor', NT: 'Casi amenazada', VU: 'Vulnerable', EN: 'En peligro', CR: 'En peligro crítico', DD: 'Datos insuficientes', NE: 'No evaluada' },
      sections: {
        animal: { desc: 'Descripción ecológica', diet: 'Dieta', behavior: 'Comportamiento y observación', role: 'Rol ecológico y conservación' },
        flora: { desc: 'Descripción ecológica', diet: 'Nutrición y fisiología', behavior: 'Reproducción y fenología', role: 'Rol ecológico y mecanismos de adaptación' },
        funga: { desc: 'Descripción', diet: 'Nutrición (trofismo)', behavior: 'Ciclo de vida y observación', role: 'Rol ecológico' },
        article: { desc: 'Descripción', diet: 'Procesos y dinámica', behavior: 'Observación en campo', role: 'Importancia y conservación' }
      },
      logSection: 'Registrar avistamiento',
      logSighting: 'Registrar avistamiento',
      individuals: 'Individuos',
      locationLabel: 'Sitio o tramo del recorrido',
      locationPlaceholder: 'Ej.: vado principal, borde de potrero',
      notes: 'Notas de campo',
      notesPlaceholder: 'Conducta, estrato, microhábitat, condiciones del tiempo...',
      saved: 'Avistamiento registrado',
      deleted: 'Registro eliminado',
      cleared: 'Bitácora vaciada',
      exported: 'Archivo exportado',
      previousSightings: 'Registros previos de este taxón',
      none: 'Sin registros previos.',
      logbookTitle: 'Bitácora de avistamientos',
      logbookIntro: 'Historial personal almacenado únicamente en este dispositivo. Los registros incluyen fecha, hora, número de individuos y notas.',
      totalRecords: 'Registros totales',
      distinctTaxa: 'Taxones distintos',
      totalIndividuals: 'Individuos contabilizados',
      lastRecord: 'Último registro',
      export: 'Exportar JSON',
      clearAll: 'Vaciar',
      confirmClear: 'Se eliminarán todos los registros de la bitácora. Esta acción no se puede deshacer. ¿Desea continuar?',
      confirmDelete: '¿Eliminar este registro?',
      delete: 'Eliminar',
      emptyLogbook: 'La bitácora está vacía',
      emptyLogbookHint: 'Abra la ficha de una especie y utilice el botón Registrar avistamiento.',
      allCategories: 'Todas',
      individualsShort: n => n === 1 ? '1 individuo' : n + ' individuos',
      footer: 'Guía de campo de uso personal para recorridos a caballo en La Pechuga, Chachagua, San Carlos, Costa Rica. Funciona sin conexión una vez cargada. La información ecológica es de carácter divulgativo-académico y debe contrastarse con literatura especializada y observación local. Observe la fauna a distancia, no la manipule ni la alimente.',
      notFound: 'Entrada no encontrada'
    },
    en: {
      appTitle: 'Chachagua Field Guide',
      appSubtitle: 'Transitional tropical wet forest - La Pechuga, Chachagua, San Carlos',
      metaDescription: 'Offline field guide to the tropical wet forest of La Pechuga, Chachagua, San Carlos, Costa Rica.',
      langLabel: 'Interface language',
      langSwitchAria: 'Switch language to Spanish',
      searchLabel: 'Search species and articles',
      searchPlaceholder: 'Search by common name, scientific name or family...',
      clearSearch: 'Clear search',
      navGuide: 'Guide',
      navLogbook: 'Logbook',
      install: 'Install',
      online: 'Online',
      offline: 'Offline',
      categoriesTitle: 'Categories',
      categoriesIntro: 'Select a group to filter the catalogue. Contents describe the biota and ecological processes of the La Pechuga sector and its river.',
      entriesAll: 'Full catalogue',
      searchResults: 'Search results',
      count: n => n === 1 ? '1 record' : n + ' records',
      entriesWord: n => n === 1 ? 'entry' : 'entries',
      showAll: 'Show all',
      noResults: 'No results',
      noResultsHint: 'Check the spelling or try the scientific name.',
      viewDetails: 'View profile',
      timesLogged: n => n === 1 ? '1 sighting' : n + ' sightings',
      article: 'Article',
      close: 'Close',
      taxonomy: 'Taxonomic classification',
      datasheet: 'Data sheet',
      ranks: { kingdom: 'Kingdom', phylum: 'Phylum', class: 'Class', order: 'Order', family: 'Family', genus: 'Genus', species: 'Species' },
      iucnLabel: 'IUCN',
      iucn: { LC: 'Least Concern', NT: 'Near Threatened', VU: 'Vulnerable', EN: 'Endangered', CR: 'Critically Endangered', DD: 'Data Deficient', NE: 'Not Evaluated' },
      sections: {
        animal: { desc: 'Ecological description', diet: 'Diet', behavior: 'Behavior and observation', role: 'Ecological role and conservation' },
        flora: { desc: 'Ecological description', diet: 'Nutrition and physiology', behavior: 'Reproduction and phenology', role: 'Ecological role and adaptive mechanisms' },
        funga: { desc: 'Description', diet: 'Nutrition (trophic mode)', behavior: 'Life cycle and observation', role: 'Ecological role' },
        article: { desc: 'Description', diet: 'Processes and dynamics', behavior: 'Field observation', role: 'Significance and conservation' }
      },
      logSection: 'Log sighting',
      logSighting: 'Log Sighting',
      individuals: 'Individuals',
      locationLabel: 'Site or trail segment',
      locationPlaceholder: 'E.g.: main ford, pasture edge',
      notes: 'Field notes',
      notesPlaceholder: 'Behavior, stratum, microhabitat, weather conditions...',
      saved: 'Sighting logged',
      deleted: 'Record deleted',
      cleared: 'Logbook cleared',
      exported: 'File exported',
      previousSightings: 'Previous records of this taxon',
      none: 'No previous records.',
      logbookTitle: 'Sighting Logbook',
      logbookIntro: 'Personal history stored only on this device. Records include date, time, number of individuals and notes.',
      totalRecords: 'Total records',
      distinctTaxa: 'Distinct taxa',
      totalIndividuals: 'Individuals counted',
      lastRecord: 'Last record',
      export: 'Export JSON',
      clearAll: 'Clear',
      confirmClear: 'All logbook records will be deleted. This action cannot be undone. Continue?',
      confirmDelete: 'Delete this record?',
      delete: 'Delete',
      emptyLogbook: 'The logbook is empty',
      emptyLogbookHint: 'Open a species profile and use the Log Sighting button.',
      allCategories: 'All',
      individualsShort: n => n === 1 ? '1 individual' : n + ' individuals',
      footer: 'Personal field guide for horseback rides in La Pechuga, Chachagua, San Carlos, Costa Rica. Works offline once loaded. Ecological information is academic-outreach in nature and should be cross-checked with specialized literature and local observation. Observe wildlife from a distance; do not handle or feed it.',
      notFound: 'Entry not found'
    }
  };

  /* ------------------------------------------------------------------ */
  /* Iconos SVG (trazos estilo Feather)                                  */
  /* ------------------------------------------------------------------ */
  const ICONS = {
    search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    wifiOff: '<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    mountain: '<path d="M3 20l6.5-11 4 6.5L16 12l5 8z"/><path d="M8 11.5l1.5 1.5 1.5-1.5"/>',
    droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/><path d="M8.5 14.5a3.5 3.5 0 0 0 3.5 3.5"/>',
    paw: '<circle cx="5.5" cy="10" r="1.8"/><circle cx="9" cy="5.5" r="1.8"/><circle cx="15" cy="5.5" r="1.8"/><circle cx="18.5" cy="10" r="1.8"/><path d="M12 11c-2.8 0-5 3.6-5 6a2.6 2.6 0 0 0 2.6 2.6c1 0 1.6-.6 2.4-.6s1.4.6 2.4.6A2.6 2.6 0 0 0 17 17c0-2.4-2.2-6-5-6z"/>',
    frog: '<circle cx="8" cy="7" r="2.5"/><circle cx="16" cy="7" r="2.5"/><path d="M5.6 8.2C4 9.6 3 11.6 3 13.5 3 17.6 7 20 12 20s9-2.4 9-6.5c0-1.9-1-3.9-2.6-5.3"/><path d="M9 14.5c1.8 1 4.2 1 6 0"/>',
    snake: '<path d="M4 18c2.5 0 3-2.5 3-5s1-5 3.5-5S14 10.5 14 13s.5 5 3 5 3-2 3-4"/><path d="M20 14V8.5a2.5 2.5 0 0 0-5 0"/><circle cx="17.5" cy="7.5" r=".3"/>',
    bug: '<rect x="8" y="6" width="8" height="14" rx="4"/><path d="M19 7l-3 2M5 7l3 2M19 19l-3-2M5 19l3-2M20 13h-4M4 13h4M10 4l1 2M14 4l-1 2"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    mushroom: '<path d="M3 12a9 8 0 0 1 18 0z"/><path d="M9.5 12v6.5a2.5 2.5 0 0 0 5 0V12"/><circle cx="9" cy="8.5" r=".6"/><circle cx="14.5" cy="7.5" r=".6"/>'
  };

  function svg(name, cls) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="' + (cls || 'w-5 h-5') + '" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  /* ------------------------------------------------------------------ */
  /* Estado y utilidades                                                 */
  /* ------------------------------------------------------------------ */
  const state = {
    lang: (function () {
      const saved = localStorage.getItem(LS_LANG);
      if (saved === 'es' || saved === 'en') return saved;
      return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
    })(),
    view: 'guide',
    cat: 'all',
    q: '',
    logCat: 'all',
    openId: null,
    log: loadLog()
  };

  const $ = (s, root) => (root || document).querySelector(s);
  const $$ = (s, root) => Array.from((root || document).querySelectorAll(s));
  const t = key => { const v = I18N[state.lang][key]; return v === undefined ? key : v; };
  const tr = v => (v == null ? '' : typeof v === 'string' ? v : (v[state.lang] || v.es || ''));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const byId = id => DATA.entries.find(e => e.id === id);
  const catById = id => DATA.categories.find(c => c.id === id);
  const locale = () => (state.lang === 'es' ? 'es-CR' : 'en-US');

  function sectionGroup(entry) {
    if (entry.kind === 'article') return 'article';
    if (entry.cat === 'flora') return 'flora';
    if (entry.cat === 'funga') return 'funga';
    return 'animal';
  }

  function fmtDate(ts, opts) {
    try {
      return new Intl.DateTimeFormat(locale(), opts || { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ts));
    } catch (e) { return new Date(ts).toLocaleString(); }
  }

  /* Indice de busqueda: incluye ambos idiomas para tolerar consultas mixtas */
  const SEARCH_INDEX = new Map(DATA.entries.map(e => {
    const parts = [
      e.name.es, e.name.en,
      typeof e.sci === 'string' ? e.sci : (e.sci.es + ' ' + e.sci.en),
      e.taxonomy ? Object.values(e.taxonomy).join(' ') : '',
      catById(e.cat).name.es, catById(e.cat).name.en
    ];
    return [e.id, norm(parts.join(' '))];
  }));

  /* ------------------------------------------------------------------ */
  /* Bitacora (localStorage)                                             */
  /* ------------------------------------------------------------------ */
  function loadLog() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_LOG) || '[]');
      return Array.isArray(raw) ? raw : [];
    } catch (e) { return []; }
  }
  function saveLog() {
    try { localStorage.setItem(LS_LOG, JSON.stringify(state.log)); }
    catch (e) { console.error('localStorage write failed', e); }
  }
  function addSighting(entryId, count, place, note) {
    const rec = {
      uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      id: entryId,
      ts: new Date().toISOString(),
      count: Math.max(1, parseInt(count, 10) || 1),
      place: String(place || '').trim().slice(0, 120),
      note: String(note || '').trim().slice(0, 1000)
    };
    state.log.unshift(rec);
    saveLog();
    return rec;
  }
  function removeSighting(uid) {
    state.log = state.log.filter(r => r.uid !== uid);
    saveLog();
  }
  function countFor(id) { return state.log.reduce((n, r) => n + (r.id === id ? 1 : 0), 0); }

  /* ------------------------------------------------------------------ */
  /* Textos estaticos del DOM                                            */
  /* ------------------------------------------------------------------ */
  function applyStatic() {
    document.documentElement.lang = state.lang;
    document.title = t('appTitle');
    const meta = $('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('metaDescription'));

    $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });

    const toggle = $('#lang-toggle');
    toggle.setAttribute('aria-checked', String(state.lang === 'en'));
    toggle.setAttribute('aria-label', t('langSwitchAria'));
    $('#lang-knob').style.transform = state.lang === 'en' ? 'translateX(39px)' : 'translateX(0)';
    $$('[data-lang-opt]').forEach(el => {
      const active = el.dataset.langOpt === state.lang;
      el.classList.toggle('text-white', active);
      el.classList.toggle('text-emerald-800', !active);
    });
    updateNetStatus();
  }

  function injectIcons(root) {
    $$('[data-icon]', root).forEach(el => {
      if (el.dataset.iconDone) return;
      el.innerHTML = svg(el.dataset.icon, 'w-full h-full');
      el.classList.add('inline-block');
      el.dataset.iconDone = '1';
    });
  }

  /* ------------------------------------------------------------------ */
  /* Vista: Guia                                                         */
  /* ------------------------------------------------------------------ */
  function renderCategories() {
    const grid = $('#category-grid');
    grid.innerHTML = DATA.categories.map(c => {
      const n = DATA.entries.filter(e => e.cat === c.id).length;
      const active = state.cat === c.id;
      return (
        '<button type="button" data-cat="' + c.id + '" aria-pressed="' + active + '" class="group text-left p-4 rounded-2xl border transition duration-200 ' +
        (active
          ? 'bg-emerald-700 border-emerald-700 text-white shadow-md'
          : 'bg-white border-amber-900/10 hover:border-emerald-600/40 hover:shadow-md hover:-translate-y-0.5') + '">' +
          '<div class="flex items-start justify-between">' +
            '<span class="w-11 h-11 rounded-xl flex items-center justify-center ' + (active ? 'bg-white/15 text-white' : 'bg-green-50 text-emerald-700 group-hover:bg-emerald-50') + '">' + svg(c.icon, 'w-6 h-6') + '</span>' +
            '<span class="text-xs font-semibold px-2 py-0.5 rounded-full ' + (active ? 'bg-white/20 text-white' : 'bg-amber-50 text-amber-800') + '">' + n + '</span>' +
          '</div>' +
          '<h3 class="mt-3 font-serif text-lg leading-tight ' + (active ? 'text-white' : 'text-green-900') + '">' + esc(tr(c.name)) + '</h3>' +
          '<p class="mt-1 text-xs leading-snug ' + (active ? 'text-green-50' : 'text-stone-600') + '">' + esc(tr(c.desc)) + '</p>' +
        '</button>'
      );
    }).join('');
  }

  function filteredEntries() {
    const q = norm(state.q.trim());
    const terms = q ? q.split(/\s+/) : [];
    return DATA.entries.filter(e => {
      if (state.cat !== 'all' && e.cat !== state.cat) return false;
      if (!terms.length) return true;
      const hay = SEARCH_INDEX.get(e.id);
      return terms.every(term => hay.includes(term));
    });
  }

  function highlight(text) {
    const q = state.q.trim();
    const safe = esc(text);
    if (!q) return safe;
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const normText = norm(text);
    const marks = [];
    terms.forEach(term => {
      let i = normText.indexOf(term);
      while (i !== -1) { marks.push([i, i + term.length]); i = normText.indexOf(term, i + term.length); }
    });
    if (!marks.length) return safe;
    marks.sort((a, b) => a[0] - b[0]);
    let out = '', pos = 0;
    marks.forEach(([s, e]) => {
      if (s < pos) return;
      out += esc(text.slice(pos, s)) + '<mark class="bg-lime-200/70 text-green-950 rounded px-0.5">' + esc(text.slice(s, e)) + '</mark>';
      pos = e;
    });
    return out + esc(text.slice(pos));
  }

  function summary(entry) {
    const s = tr(entry.desc);
    return s.length > 170 ? s.slice(0, s.lastIndexOf(' ', 165)) + '...' : s;
  }

  function renderList() {
    const list = filteredEntries();
    const cat = catById(state.cat);
    $('#list-title').textContent = state.q.trim() ? t('searchResults') : (cat ? tr(cat.name) : t('entriesAll'));
    $('#list-count').textContent = list.length + ' ' + t('entriesWord')(list.length);
    $('#show-all').hidden = state.cat === 'all' && !state.q.trim();
    $('#no-results').hidden = list.length > 0;

    $('#entry-list').innerHTML = list.map((e, i) => {
      const c = catById(e.cat);
      const n = countFor(e.id);
      const isTaxon = e.kind === 'taxon';
      return (
        '<button type="button" data-open="' + e.id + '" style="animation-delay:' + Math.min(i * 25, 300) + 'ms" class="rise-in group text-left flex flex-col bg-white rounded-2xl border border-amber-900/10 p-5 hover:border-emerald-600/40 hover:shadow-lg transition duration-200">' +
          '<div class="flex items-center justify-between gap-2">' +
            '<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800">' + svg(c.icon, 'w-3.5 h-3.5') + esc(tr(c.name)) + '</span>' +
            (isTaxon && e.iucn ? '<span title="' + esc(t('iucn')[e.iucn] || '') + '" class="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded border ' + iucnClass(e.iucn) + '">' + esc(e.iucn) + '</span>' : '<span class="text-[10px] font-semibold uppercase tracking-wider text-stone-500">' + esc(t('article')) + '</span>') +
          '</div>' +
          '<h3 class="mt-2 font-serif text-xl text-green-900 leading-snug">' + highlight(tr(e.name)) + '</h3>' +
          '<p class="text-sm text-emerald-800 ' + (isTaxon ? 'italic' : '') + '">' + highlight(tr(e.sci)) + '</p>' +
          '<p class="mt-3 text-sm text-stone-600 leading-relaxed flex-1">' + esc(summary(e)) + '</p>' +
          '<div class="mt-4 flex items-center justify-between text-xs">' +
            (n ? '<span class="inline-flex items-center gap-1 text-emerald-800 bg-green-50 px-2 py-1 rounded-full">' + svg('check', 'w-3.5 h-3.5') + esc(t('timesLogged')(n)) + '</span>' : '<span></span>') +
            '<span class="inline-flex items-center gap-1 font-medium text-emerald-700 group-hover:gap-2 transition-all">' + esc(t('viewDetails')) + svg('arrow', 'w-3.5 h-3.5') + '</span>' +
          '</div>' +
        '</button>'
      );
    }).join('');
  }

  function iucnClass(code) {
    switch (code) {
      case 'VU': return 'border-amber-600/40 text-amber-800 bg-amber-50';
      case 'EN': case 'CR': return 'border-orange-700/40 text-orange-800 bg-orange-50';
      case 'NT': return 'border-lime-700/40 text-lime-800 bg-lime-50';
      case 'LC': return 'border-emerald-700/30 text-emerald-800 bg-green-50';
      default: return 'border-stone-300 text-stone-600 bg-stone-50';
    }
  }

  /* ------------------------------------------------------------------ */
  /* Modal: ficha de especie                                             */
  /* ------------------------------------------------------------------ */
  function openModal(id) {
    const entry = byId(id);
    if (!entry) return;
    state.openId = id;
    renderModal();
    const modal = $('#modal');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { modal.dataset.state = 'open'; });
    setTimeout(() => { const b = $('[data-close-btn]', modal); if (b) b.focus(); }, 60);
  }

  function closeModal() {
    const modal = $('#modal');
    if (modal.hidden) return;
    modal.dataset.state = 'closed';
    state.openId = null;
    document.body.style.overflow = '';
    setTimeout(() => { if (modal.dataset.state === 'closed') modal.hidden = true; }, 260);
  }

  function renderModal() {
    const e = byId(state.openId);
    if (!e) return;
    const c = catById(e.cat);
    const labels = t('sections')[sectionGroup(e)];
    const isTaxon = e.kind === 'taxon';
    const ranks = t('ranks');

    // Preservar valores del formulario al re-renderizar (p. ej. cambio de idioma)
    const prev = {
      count: $('#f-count') ? $('#f-count').value : '1',
      place: $('#f-place') ? $('#f-place').value : '',
      note: $('#f-note') ? $('#f-note').value : ''
    };

    const taxRows = isTaxon && e.taxonomy
      ? Object.keys(ranks).filter(k => e.taxonomy[k]).map(k =>
          '<div class="flex justify-between gap-4 py-1.5 border-b border-amber-900/5 last:border-0">' +
            '<dt class="text-stone-500">' + esc(ranks[k]) + '</dt>' +
            '<dd class="text-right text-green-900 ' + (k === 'genus' || k === 'species' ? 'italic' : '') + '">' + esc(e.taxonomy[k]) + '</dd>' +
          '</div>').join('')
      : '';

    const factRows = (e.facts || []).map(f =>
      '<div class="flex justify-between gap-4 py-1.5 border-b border-amber-900/5 last:border-0">' +
        '<dt class="text-stone-500">' + esc(tr(f.k)) + '</dt>' +
        '<dd class="text-right text-green-900">' + esc(tr(f.v)) + '</dd>' +
      '</div>').join('') +
      (isTaxon && e.iucn
        ? '<div class="flex justify-between gap-4 py-1.5"><dt class="text-stone-500">' + esc(t('iucnLabel')) + '</dt><dd class="text-right"><span class="text-[11px] font-bold px-1.5 py-0.5 rounded border ' + iucnClass(e.iucn) + '">' + esc(e.iucn) + '</span> <span class="text-green-900">' + esc(t('iucn')[e.iucn] || '') + '</span></dd></div>'
        : '');

    const sections = ['desc', 'diet', 'behavior', 'role'].map(k =>
      '<section class="mt-6">' +
        '<h3 class="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">' + esc(labels[k]) + '</h3>' +
        '<p class="text-[15px] text-stone-700 leading-7">' + esc(tr(e[k])) + '</p>' +
      '</section>').join('');

    const history = state.log.filter(r => r.id === e.id).slice(0, 5);
    const historyHtml = history.length
      ? '<ul class="space-y-1.5">' + history.map(r =>
          '<li class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-stone-600">' +
            '<span class="inline-flex items-center gap-1 text-green-900">' + svg('clock', 'w-3.5 h-3.5') + esc(fmtDate(r.ts)) + '</span>' +
            '<span>' + esc(t('individualsShort')(r.count)) + '</span>' +
            (r.place ? '<span class="inline-flex items-center gap-1">' + svg('pin', 'w-3.5 h-3.5') + esc(r.place) + '</span>' : '') +
          '</li>').join('') + '</ul>'
      : '<p class="text-xs text-stone-500">' + esc(t('none')) + '</p>';

    $('#modal-content').innerHTML =
      '<header class="sticky top-0 z-10 bg-white/95 backdrop-blur px-6 sm:px-8 pt-6 pb-4 border-b border-amber-900/10">' +
        '<div class="flex items-start justify-between gap-4">' +
          '<div class="min-w-0">' +
            '<span class="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800">' + svg(c.icon, 'w-4 h-4') + esc(tr(c.name)) + '</span>' +
            '<h2 id="modal-title" class="mt-1 font-serif text-2xl sm:text-3xl text-green-900 leading-tight">' + esc(tr(e.name)) + '</h2>' +
            '<p class="text-emerald-800 ' + (isTaxon ? 'italic' : '') + '">' + esc(tr(e.sci)) + '</p>' +
          '</div>' +
          '<button type="button" data-close data-close-btn aria-label="' + esc(t('close')) + '" class="shrink-0 w-10 h-10 inline-flex items-center justify-center rounded-xl text-stone-500 hover:bg-green-50 hover:text-green-900 transition">' + svg('x', 'w-5 h-5') + '</button>' +
        '</div>' +
      '</header>' +
      '<div class="px-6 sm:px-8 pb-8">' +
        '<div class="mt-5 grid ' + (taxRows ? 'md:grid-cols-2' : '') + ' gap-4">' +
          (taxRows ? '<div class="rounded-2xl bg-green-50/70 border border-emerald-700/10 p-4"><h3 class="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">' + esc(t('taxonomy')) + '</h3><dl class="text-sm">' + taxRows + '</dl></div>' : '') +
          (factRows ? '<div class="rounded-2xl bg-[#FAF7F0] border border-amber-900/10 p-4"><h3 class="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">' + esc(t('datasheet')) + '</h3><dl class="text-sm">' + factRows + '</dl></div>' : '') +
        '</div>' +
        sections +
        '<section class="mt-8 rounded-2xl border border-emerald-700/20 bg-green-50/60 p-5">' +
          '<h3 class="font-serif text-lg text-green-900 flex items-center gap-2">' + svg('book', 'w-5 h-5 text-emerald-700') + esc(t('logSection')) + '</h3>' +
          '<form id="sighting-form" class="mt-4 grid sm:grid-cols-[110px_1fr] gap-3">' +
            '<label class="text-xs font-medium text-stone-600">' + esc(t('individuals')) +
              '<input id="f-count" type="number" min="1" max="999" value="' + esc(prev.count) + '" class="mt-1 w-full h-10 px-3 rounded-lg bg-white border border-amber-900/15 text-stone-800 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"></label>' +
            '<label class="text-xs font-medium text-stone-600">' + esc(t('locationLabel')) +
              '<input id="f-place" type="text" maxlength="120" value="' + esc(prev.place) + '" placeholder="' + esc(t('locationPlaceholder')) + '" class="mt-1 w-full h-10 px-3 rounded-lg bg-white border border-amber-900/15 text-stone-800 placeholder-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"></label>' +
            '<label class="sm:col-span-2 text-xs font-medium text-stone-600">' + esc(t('notes')) +
              '<textarea id="f-note" rows="2" maxlength="1000" placeholder="' + esc(t('notesPlaceholder')) + '" class="mt-1 w-full px-3 py-2 rounded-lg bg-white border border-amber-900/15 text-stone-800 placeholder-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20">' + esc(prev.note) + '</textarea></label>' +
            '<div class="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">' +
              '<button type="submit" class="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-[.98] text-white font-medium shadow-sm transition">' + svg('plus', 'w-4 h-4') + esc(t('logSighting')) + '</button>' +
              '<span class="text-xs text-stone-500 inline-flex items-center gap-1">' + svg('clock', 'w-3.5 h-3.5') + esc(fmtDate(Date.now())) + '</span>' +
            '</div>' +
          '</form>' +
          '<div class="mt-5 pt-4 border-t border-emerald-700/10">' +
            '<h4 class="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-2">' + esc(t('previousSightings')) + '</h4>' +
            historyHtml +
          '</div>' +
        '</section>' +
      '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Vista: Bitacora                                                     */
  /* ------------------------------------------------------------------ */
  function renderLogbook() {
    const log = state.log;
    const distinct = new Set(log.map(r => r.id)).size;
    const individuals = log.reduce((n, r) => n + (r.count || 1), 0);

    $('#log-stats').innerHTML = [
      [t('totalRecords'), log.length],
      [t('distinctTaxa'), distinct + ' / ' + DATA.entries.length],
      [t('lastRecord'), log.length ? fmtDate(log[0].ts) : '-']
    ].map(([k, v]) =>
      '<div class="rounded-2xl bg-white border border-amber-900/10 p-4">' +
        '<p class="text-xs uppercase tracking-wider text-amber-800 font-semibold">' + esc(k) + '</p>' +
        '<p class="mt-1 font-serif text-2xl text-green-900">' + esc(v) + '</p>' +
      '</div>').join('') +
      '<p class="sm:col-span-3 text-xs text-stone-600">' + esc(t('totalIndividuals')) + ': <span class="font-semibold text-green-900">' + individuals + '</span></p>';

    const usedCats = DATA.categories.filter(c => log.some(r => { const e = byId(r.id); return e && e.cat === c.id; }));
    if (state.logCat !== 'all' && !usedCats.some(c => c.id === state.logCat)) state.logCat = 'all';
    $('#log-filters').innerHTML = log.length
      ? [{ id: 'all', name: { es: t('allCategories'), en: t('allCategories') } }].concat(usedCats).map(c => {
          const active = state.logCat === c.id;
          return '<button type="button" data-logcat="' + c.id + '" class="text-xs font-medium px-3 py-1.5 rounded-full border transition ' +
            (active ? 'bg-emerald-700 border-emerald-700 text-white' : 'bg-white border-amber-900/15 text-stone-600 hover:border-emerald-600/40 hover:text-green-900') + '">' + esc(tr(c.name)) + '</button>';
        }).join('')
      : '';

    const rows = log.filter(r => {
      if (state.logCat === 'all') return true;
      const e = byId(r.id); return e && e.cat === state.logCat;
    });

    $('#log-empty').hidden = log.length > 0;
    $('#clear-btn').disabled = !log.length;
    $('#export-btn').disabled = !log.length;
    $('#clear-btn').classList.toggle('opacity-50', !log.length);
    $('#export-btn').classList.toggle('opacity-50', !log.length);

    $('#log-list').innerHTML = rows.map(r => {
      const e = byId(r.id);
      const c = e ? catById(e.cat) : null;
      return (
        '<li class="fade-in bg-white rounded-2xl border border-amber-900/10 p-4 sm:p-5 flex gap-4">' +
          '<span class="hidden sm:flex w-11 h-11 shrink-0 rounded-xl bg-green-50 text-emerald-700 items-center justify-center">' + (c ? svg(c.icon, 'w-6 h-6') : '') + '</span>' +
          '<div class="flex-1 min-w-0">' +
            '<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">' +
              (e
                ? '<button type="button" data-open="' + e.id + '" class="text-left font-serif text-lg text-green-900 hover:text-emerald-700 hover:underline underline-offset-4">' + esc(tr(e.name)) + '</button>'
                : '<span class="font-serif text-lg text-stone-500">' + esc(t('notFound')) + '</span>') +
              '<time datetime="' + esc(r.ts) + '" class="text-xs text-stone-600 inline-flex items-center gap-1">' + svg('clock', 'w-3.5 h-3.5') + esc(fmtDate(r.ts, { dateStyle: 'full', timeStyle: 'short' })) + '</time>' +
            '</div>' +
            (e ? '<p class="text-sm text-emerald-800 ' + (e.kind === 'taxon' ? 'italic' : '') + '">' + esc(tr(e.sci)) + '</p>' : '') +
            '<div class="mt-2 flex flex-wrap gap-2 text-xs">' +
              (c ? '<span class="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">' + esc(tr(c.name)) + '</span>' : '') +
              '<span class="px-2 py-0.5 rounded-full bg-green-50 text-emerald-800">' + esc(t('individualsShort')(r.count || 1)) + '</span>' +
              (r.place ? '<span class="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 inline-flex items-center gap-1">' + svg('pin', 'w-3 h-3') + esc(r.place) + '</span>' : '') +
            '</div>' +
            (r.note ? '<p class="mt-2 text-sm text-stone-700 leading-relaxed whitespace-pre-line border-l-2 border-amber-800/20 pl-3">' + esc(r.note) + '</p>' : '') +
          '</div>' +
          '<button type="button" data-del="' + esc(r.uid) + '" aria-label="' + esc(t('delete')) + '" title="' + esc(t('delete')) + '" class="self-start shrink-0 w-9 h-9 inline-flex items-center justify-center rounded-lg text-stone-400 hover:text-amber-800 hover:bg-amber-50 transition">' + svg('trash', 'w-4 h-4') + '</button>' +
        '</li>'
      );
    }).join('');
  }

  function updateBadge() { $('#log-badge').textContent = state.log.length; }

  /* ------------------------------------------------------------------ */
  /* Navegacion y orquestacion                                           */
  /* ------------------------------------------------------------------ */
  function setView(view) {
    state.view = view;
    $('#view-guide').hidden = view !== 'guide';
    $('#view-logbook').hidden = view !== 'logbook';
    $$('.tab-btn').forEach(b => {
      const active = b.dataset.view === view;
      b.setAttribute('aria-selected', String(active));
      b.classList.toggle('bg-emerald-700', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('shadow-sm', active);
      b.classList.toggle('text-stone-600', !active);
      b.classList.toggle('hover:text-green-900', !active);
    });
    const main = view === 'guide' ? $('#view-guide') : $('#view-logbook');
    main.classList.remove('fade-in'); void main.offsetWidth; main.classList.add('fade-in');
    if (view === 'logbook') renderLogbook();
  }

  function renderAll() {
    applyStatic();
    renderCategories();
    renderList();
    renderLogbook();
    updateBadge();
    if (state.openId) renderModal();
  }

  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang;
    localStorage.setItem(LS_LANG, lang);
    renderAll();
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.remove('opacity-0', 'translate-y-3');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('opacity-0', 'translate-y-3'), 2200);
  }

  function updateNetStatus() {
    const el = $('#net-status');
    const on = navigator.onLine;
    el.innerHTML = svg(on ? 'wifi' : 'wifiOff', 'w-3.5 h-3.5') + '<span>' + esc(on ? t('online') : t('offline')) + '</span>';
    el.classList.toggle('bg-green-50', on);
    el.classList.toggle('text-green-900', on);
    el.classList.toggle('bg-amber-50', !on);
    el.classList.toggle('text-amber-800', !on);
  }

  function exportLog() {
    const payload = {
      app: 'Chachagua Field Guide',
      exported: new Date().toISOString(),
      records: state.log.map(r => {
        const e = byId(r.id);
        return Object.assign({}, r, {
          scientificName: e ? (typeof e.sci === 'string' ? e.sci : e.sci.en) : null,
          commonName_es: e ? e.name.es : null,
          commonName_en: e ? e.name.en : null,
          category: e ? e.cat : null
        });
      })
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'chachagua-logbook-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast(t('exported'));
  }

  /* ------------------------------------------------------------------ */
  /* Eventos                                                             */
  /* ------------------------------------------------------------------ */
  function bindEvents() {
    $('#lang-toggle').addEventListener('click', () => setLang(state.lang === 'es' ? 'en' : 'es'));

    const search = $('#search');
    search.addEventListener('input', () => {
      state.q = search.value;
      $('#search-clear').hidden = !state.q;
      if (state.view !== 'guide') setView('guide');
      renderList();
    });
    $('#search-clear').addEventListener('click', () => {
      search.value = ''; state.q = ''; $('#search-clear').hidden = true; renderList(); search.focus();
    });

    $('#category-grid').addEventListener('click', ev => {
      const btn = ev.target.closest('[data-cat]');
      if (!btn) return;
      state.cat = state.cat === btn.dataset.cat ? 'all' : btn.dataset.cat;
      renderCategories(); renderList();
      if (state.cat !== 'all') $('#list-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    $('#show-all').addEventListener('click', () => {
      state.cat = 'all'; state.q = ''; search.value = ''; $('#search-clear').hidden = true;
      renderCategories(); renderList();
    });

    document.addEventListener('click', ev => {
      const open = ev.target.closest('[data-open]');
      if (open) { openModal(open.dataset.open); return; }
      if (ev.target.closest('[data-close]')) closeModal();
    });

    $$('.tab-btn').forEach(b => b.addEventListener('click', () => setView(b.dataset.view)));

    $('#modal').addEventListener('submit', ev => {
      if (ev.target.id !== 'sighting-form') return;
      ev.preventDefault();
      const id = state.openId;
      addSighting(id, $('#f-count').value, $('#f-place').value, $('#f-note').value);
      $('#f-count').value = '1'; $('#f-place').value = ''; $('#f-note').value = '';
      renderModal(); renderList(); renderLogbook(); updateBadge();
      toast(t('saved'));
    });

    $('#log-list').addEventListener('click', ev => {
      const del = ev.target.closest('[data-del]');
      if (!del) return;
      if (!confirm(t('confirmDelete'))) return;
      removeSighting(del.dataset.del);
      renderLogbook(); renderList(); updateBadge();
      toast(t('deleted'));
    });

    $('#log-filters').addEventListener('click', ev => {
      const b = ev.target.closest('[data-logcat]');
      if (!b) return;
      state.logCat = b.dataset.logcat; renderLogbook();
    });

    $('#export-btn').addEventListener('click', () => { if (state.log.length) exportLog(); });
    $('#clear-btn').addEventListener('click', () => {
      if (!state.log.length || !confirm(t('confirmClear'))) return;
      state.log = []; saveLog();
      renderLogbook(); renderList(); updateBadge();
      toast(t('cleared'));
    });

    document.addEventListener('keydown', ev => {
      if (ev.key === 'Escape') closeModal();
      if (ev.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        ev.preventDefault(); search.focus();
      }
    });

    window.addEventListener('online', updateNetStatus);
    window.addEventListener('offline', updateNetStatus);

    // Sincronizacion entre pestanas
    window.addEventListener('storage', ev => {
      if (ev.key === LS_LOG) { state.log = loadLog(); renderList(); renderLogbook(); updateBadge(); if (state.openId) renderModal(); }
      if (ev.key === LS_LANG && (ev.newValue === 'es' || ev.newValue === 'en')) { state.lang = ev.newValue; renderAll(); }
    });

    // Instalacion PWA
    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', ev => {
      ev.preventDefault(); deferredPrompt = ev; $('#install-btn').hidden = false;
    });
    $('#install-btn').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null; $('#install-btn').hidden = true;
    });
    window.addEventListener('appinstalled', () => { $('#install-btn').hidden = true; });
  }

  /* ------------------------------------------------------------------ */
  /* Service Worker                                                      */
  /* ------------------------------------------------------------------ */
  function registerSW() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => console.warn('SW registration failed', err));
    });
  }

  /* ------------------------------------------------------------------ */
  /* Inicio                                                              */
  /* ------------------------------------------------------------------ */
  injectIcons(document);
  bindEvents();
  renderAll();
  setView('guide');
  registerSW();
})();
