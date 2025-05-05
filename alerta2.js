const map = L.map('map').setView([-8.05, -34.9], 14); // Recife exemplo

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap',
}).addTo(map);

// Marcadores de exemplo
const riscos = [
  { lat: -8.052, lng: -34.9, tipo: 'vermelho' },
  { lat: -8.06, lng: -34.91, tipo: 'amarelo' },
  { lat: -8.055, lng: -34.905, tipo: 'seguro' },
];

riscos.forEach(r => {
  let iconUrl = {
    vermelho: 'alerta-vermelho.png',
    amarelo: 'alerta-amarelo.png',
    seguro: 'ok-verde.png'
  }[r.tipo];

  let icon = L.icon({
    iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });

  L.marker([r.lat, r.lng], { icon }).addTo(map);
});


