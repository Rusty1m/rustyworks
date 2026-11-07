(() => {
  const key = 'rw-lang';
  const buttons = document.querySelectorAll('.lang button');
  const nodes = document.querySelectorAll('[data-ja][data-en]');
  function apply(language) {
    document.documentElement.lang = language;
    nodes.forEach(node => { node.textContent = node.dataset[language]; });
    document.querySelectorAll('[data-alt-ja][data-alt-en]').forEach(image => {
      image.alt = image.getAttribute('data-alt-' + language);
    });
    buttons.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.lang === language));
    });
    try { localStorage.setItem(key, language); } catch (_) { /* storage is optional */ }
  }
  buttons.forEach(button => button.addEventListener('click', () => apply(button.dataset.lang)));
  let saved;
  try { saved = localStorage.getItem(key); } catch (_) { /* storage is optional */ }
  const preferred = navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
  apply(saved === 'ja' || saved === 'en' ? saved : preferred);
})();
