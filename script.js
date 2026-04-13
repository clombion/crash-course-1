// Initialize the map and set its view to Bordeaux, France
const map = L.map('map').setView([44.8378, -0.5792], 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Data for Bordeaux Hospitals
const hospitals = [
    { name: "CHU Pellegrin", lat: 44.8310, lng: -0.6060 },
    { name: "Hôpital Saint-André", lat: 44.8360, lng: -0.5810 },
    { name: "Hôpital des Enfants", lat: 44.8300, lng: -0.6070 },
    { name: "Polyclinique Bordeaux Nord Aquitaine", lat: 44.8700, lng: -0.5750 },
    { name: "Clinique Mutualiste de Pessac", lat: 44.8100, lng: -0.6350 }
];

// Add markers for each hospital
hospitals.forEach(hospital => {
    L.marker([hospital.lat, hospital.lng])
        .addTo(map)
        .bindPopup(`<b>${hospital.name}</b>`);
});
