// Jeg laver en klasse til albummer, så det er nemmere at arbejde med dem senere i koden
class Album {
  constructor(albumName, artistName, productionYear, rating, trackList) {
    this.albumName = albumName;
    this.artistName = artistName;
    this.productionYear = productionYear;
    this.rating = rating;
    this.trackList = trackList;
  }

  // En metode til at finde ud af hvor mange sange der er i et album
  getNumberOfTracks() {
    return this.trackList.length;
  }
}

// Jeg finder den del af HTML'en hvor jeg gerne vil vise mine albummer
const container = document.getElementById('albums-container');

// Her henter jeg data fra min albums.json-fil og laver objekter ud fra den
fetch('albums.json')
  .then(response => response.json()) // Jeg laver JSON om til JavaScript-objekter
  .then(data => {
    // Jeg bruger Album-klassen til at lave et album-objekt for hver album i JSON-filen
    const albums = data.map(album => new Album(
      album.albumName,
      album.artistName,
      album.productionYear,
      album.rating,
      album.trackList
    ));

    // Nu viser jeg hvert album på siden med de informationer jeg har valgt
    albums.forEach(album => {
      const albumHTML = `
        <table>
          <tr><th>Albumtitel</th><td>${album.albumName}</td></tr>
          <tr><th>Kunstner</th><td>${album.artistName}</td></tr>
          <tr><th>Udgivelsesår</th><td>${album.productionYear}</td></tr>
          <tr><th>Antal sange</th><td>${album.getNumberOfTracks()}</td></tr>
          <tr><th>Rating</th><td>${album.rating} / 5</td></tr>
          <tr>
            <th>Trackliste</th>
            <td>
              <!-- Knap til at vise/skjule tracklisten -->
              <button onclick="toggleTracks(this)">Vis trackliste</button>
              <div class="tracklist" style="display: none;">
                ${album.trackList.map(t => `<p>Track ${t.trackNumber}: ${t.trackTitle}</p>`).join('')}
              </div>
            </td>
          </tr>
        </table>
        <br>
      `;
      // Jeg tilføjer HTML'en til containeren, så det bliver vist i browseren
      container.innerHTML += albumHTML;
    });
  })
  .catch(error => {
    // Hvis der sker en fejl når jeg henter JSON-filen, bliver det vist i konsollen
    console.error("Noget gik galt med at hente JSON-data:", error);
  });

// Her laver jeg funktionen der gør at man kan klikke på en knap for at vise/skjule sangene
function toggleTracks(button) {
  const tracklist = button.nextElementSibling;
  if (tracklist.style.display === "none") {
    tracklist.style.display = "block";
    button.textContent = "Skjul trackliste";
  } else {
    tracklist.style.display = "none";
    button.textContent = "Vis trackliste";
  }
}
