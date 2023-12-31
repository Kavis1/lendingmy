const apiKey = 'b9da9b5bbd39af56896028131b9155c5'; // Замените на ваш API ключ

function getCurrentTrack() {
  fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Kaviser1dhdh&api_key=${apiKey}&format=json&limit=1`)
    .then(response => response.json())
    .then(data => {
      if (data.recenttracks.track.length > 0) {
        const track = data.recenttracks.track[0];
        const trackName = track.name;
        const artistName = track.artist['#text'];

        const spotifyWidget = document.querySelector(".spotify-widget");
        spotifyWidget.innerHTML = `
          <h3>Текущий трек:</h3>
          <p>${trackName} - ${artistName}</p>
        `;
      } else {
        const spotifyWidget = document.querySelector(".spotify-widget");
        spotifyWidget.innerHTML = "Сейчас нет воспроизведения.";
      }
    })
    .catch(error => {
      console.error('Ошибка получения информации о текущем треке:', error);
    });
}

// Вызовите функцию получения информации о текущем треке при загрузке страницы
getCurrentTrack();

// Задайте интервал для периодического обновления информации о текущем треке
setInterval(getCurrentTrack, 30000); // Обновление каждые 30 секунд
