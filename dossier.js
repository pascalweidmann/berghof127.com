/* Baut die Dossier-Seiten einer Ausstellung auf.
   Ordner, Seitenzahl und Titel stehen als data-Attribute am Container, damit
   diese Datei für jeden Jahrgang dieselbe bleibt: neue Ausstellung = neue
   HTML-Seite, hier ändert sich nichts. */
(function(){

  const container = document.getElementById('portfolioPages');
  if(!container) return;

  const folder = container.dataset.folder;
  const pages  = Number(container.dataset.pages);
  const title  = container.dataset.title;

  for(let i = 1; i <= pages; i++){
    const wrapper = document.createElement('div');
    wrapper.className = 'portfolio-page';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = `${folder}/dossier${i}.jpg`;
    img.alt = `${title} – Berghof127 – Seite ${i}`;

    img.onerror = () => wrapper.remove();

    wrapper.appendChild(img);
    container.appendChild(wrapper);
  }

})();
