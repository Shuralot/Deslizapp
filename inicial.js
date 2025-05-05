const weatherDiv = document.getElementById('weather');
const apiKey = 'b941751516e9bd396c29ab43040a5c2d'; // Substitua pela sua chave da OpenWeatherMap

// Exibir alerta de deslizamento após 3 segundos
setTimeout(() => {
  const alertBox = document.createElement("div");
  alertBox.className = "live-alert";
  alertBox.innerText = "⚠️ Alerta de deslizamento em Olinda - nível CRÍTICO";
  document.body.appendChild(alertBox);
}, 3000);

// Tentar carregar o clima
document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        buscarClimaPorCoords(latitude, longitude);
      },
      err => {
        console.warn('Geolocalização negada. Tentando usar IP...');
        buscarClimaPorIP();
      }
    );
  } else {
    buscarClimaPorIP();
  }
});

// Clima por coordenadas
function buscarClimaPorCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

  fetch(url)
    .then(res => res.json())
    .then(data => exibirClima(data))
    .catch(() => {
      weatherDiv.innerHTML = '<p>Não foi possível carregar o clima.</p>';
    });
}

// Clima por IP (fallback)
function buscarClimaPorIP() {
  fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(local => {
      const cidade = local.city;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

      fetch(url)
        .then(res => res.json())
        .then(data => exibirClima(data))
        .catch(() => {
          weatherDiv.innerHTML = '<p>Não conseguimos detectar o clima da sua região.</p>';
        });
    })
    .catch(() => {
      weatherDiv.innerHTML = '<p>Não conseguimos detectar sua cidade pelo IP.</p>';
    });
}

// Exibir os dados do clima
function exibirClima(data) {
  const temp = data.main.temp.toFixed(1);
  const desc = data.weather[0].description;
  const cidade = data.name;
  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherDiv.innerHTML = `
    <img src="${iconUrl}" alt="${desc}" />
    <p><strong>${cidade}</strong></p>
    <p>${desc}</p>
    <p>${temp}°C</p>
  `;
}
