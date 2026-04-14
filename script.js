// Initialize the map and set its view to Bordeaux, France
const map = L.map('map').setView([44.8378, -0.5792], 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Data for Bordeaux Hospitals
const hospitals = [
    { 
        name: "CHU Pellegrin", 
        lat: 44.8310, 
        lng: -0.6060,
        image: "https://placehold.co/200x120/007bff/white?text=CHU+Pellegrin"
    },
    { 
        name: "Hôpital Saint-André", 
        lat: 44.8360, 
        lng: -0.5810,
        image: "https://placehold.co/200x120/28a745/white?text=H%C3%B4pital+Saint-Andr%C3%A9"
    },
    { 
        name: "Hôpital des Enfants", 
        lat: 44.8300, 
        lng: -0.6070,
        image: "https://placehold.co/200x120/dc3545/white?text=H%C3%B4pital+des+Enfants"
    },
    { 
        name: "Polyclinique Bordeaux Nord Aquitaine", 
        lat: 44.8700, 
        lng: -0.5750,
        image: "https://placehold.co/200x120/ffc107/black?text=Polyclinique+Nord"
    },
    { 
        name: "Clinique Mutualiste de Pessac", 
        lat: 44.8100, 
        lng: -0.6350,
        image: "https://placehold.co/200x120/17a2b8/white?text=Clinique+Mutualiste"
    }
];

// Add markers for each hospital
hospitals.forEach(hospital => {
    L.marker([hospital.lat, hospital.lng])
        .addTo(map)
        .bindPopup(`
            <div style="text-align: center;">
                <img src="${hospital.image}" alt="${hospital.name}" style="width: 100%; height: auto; border-radius: 4px; margin-bottom: 8px;">
                <br><b>${hospital.name}</b>
            </div>
        `);
});
