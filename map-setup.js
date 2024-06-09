// Inicializa o mapa com as coordenadas iniciais de Av. da Saudade, Campinas - SP
var initialLat = -22.914822689607544; // Latitude inicial
var initialLon = -47.05588272446561; // Longitude inicial
 
document.addEventListener('DOMContentLoaded', function() {
    var map = L.map('map').setView([initialLat, initialLon], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
 
    var marker;
 
    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
        var center = e.geocode.center;
        if (marker) map.removeLayer(marker);
        marker = L.marker(center).addTo(map);
        marker.bindPopup(e.geocode.name).openPopup();
        map.setView(center, 16);
 
        // Aqui definimos o valor do input para o endereço encontrado
        document.getElementById('nomeConsulta').value = e.geocode.name;
    })
    .addTo(map);
 
    // Função para buscar endereços e centralizar no mapa
    function searchAddress() {
        var address = document.getElementById('nomeConsulta').value;
        if (address !== '') {
            L.Control.Geocoder.nominatim().geocode(address, function(results) {
                var latLng = [results[0].center.lat, results[0].center.lng];
                if (marker) map.removeLayer(marker);
                marker = L.marker(latLng).addTo(map);
                marker.bindPopup(results[0].name).openPopup();
                map.setView(latLng, 16);
            });
        }
    }
 
    // Adicionando evento de digitação ao campo de entrada
    document.getElementById('nomeConsulta').addEventListener('input', searchAddress);
});