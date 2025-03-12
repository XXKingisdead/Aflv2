fetch('albums.json')
 // Venter på at DOM'en er indlæst, før vi henter albumdata
  .then(response => response.json())
  .then(data => { displayAlbums(data);  // Sender data til displayAlbums-funktionen
  })


function displayAlbums(albums) {
  const container = document.getElementById('albums-container');

  albums.forEach(album => {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album'); // Tilføjer CSS-klasse til styling

    albumDiv.innerHTML = `
      <h2>${album.albumName}</h2>
      <p><strong>Artist:</strong> ${album.artistName}</p>
      <p><strong>Udgivelsesår:</strong> ${album.productionYear}</p>
       <p><strong>artistWebsite:</strong> <a href="${album.artistWebsite}" target="_blank" style="color:#ff9800;">${album.artistName}</a></p>
      <p><strong>Rating:</strong> ${album.rating} </p>
      <p><strong>Antal tracks:</strong> ${album.trackList.length}</p>
      <button onclick="toggleTracks(this)">Vis trackliste</button>
      <ul class="tracklist" style="display: none;">
      
        ${album.trackList.map(track => `<li>${track.trackNumber}. ${track.trackTitle}</li>`).join('')}
      </ul>
    `;

    container.appendChild(albumDiv); // Tilføjer album-div'en til containeren
  });
}

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
