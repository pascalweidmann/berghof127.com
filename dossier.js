/* Baut die Dossier-Seiten einer Ausstellung auf.
   Ordner, Seitenzahl und Titel stehen als data-Attribute am Container, damit
   diese Datei für jeden Jahrgang dieselbe bleibt: neue Ausstellung = neue
   HTML-Seite, hier ändert sich nichts.

   Die Werkangaben kommen deshalb auch von der Seite selbst: ein JSON-Block
   #werkangaben, Seitenzahl -> Text. Daraus wird der alt-Text des Bildes.
   Im Dossier stehen Name, Werktitel, Material und Masse nur als Pixel und
   existieren damit für Screenreader, Suche und Ctrl+F gar nicht. Fehlt ein
   Eintrag, bleibt es beim bisherigen "… – Seite N". */
(function(){

  const container = document.getElementById('portfolioPages');
  if(!container) return;

  const folder = container.dataset.folder;
  const pages  = Number(container.dataset.pages);
  const title  = container.dataset.title;

  let werke = {};
  const quelle = document.getElementById('werkangaben');
  if(quelle){
    // Kaputtes JSON darf die Bilder nicht verhindern, nur die Angaben.
    try { werke = JSON.parse(quelle.textContent); } catch(e){}
  }

  for(let i = 1; i <= pages; i++){
    const wrapper = document.createElement('div');
    wrapper.className = 'portfolio-page';

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = `${folder}/dossier${i}.jpg`;
    img.alt = werke[i] || `${title} – Berghof127 – Seite ${i}`;

    img.onerror = () => wrapper.remove();

    wrapper.appendChild(img);
    container.appendChild(wrapper);
  }

})();
