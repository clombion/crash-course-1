// Initialize the map and set its view to a global scale
const map = L.map('map').setView([20, 0], 2);

// Add standard OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Use a marker cluster group for better performance with 5,000+ points
// Since we don't have the cluster plugin by default, we'll use CircleMarkers for performance
// and add a popup for each event.

fetch('floods.json')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                // Style based on severity
                let color = "#3388ff"; // Default Blue
                if (feature.properties.severity == 2) color = "#ff9900"; // Orange
                if (feature.properties.severity == 3) color = "#ff0000"; // Red
                
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: color,
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            },
            onEachFeature: function (feature, layer) {
                const props = feature.properties;
                layer.bindPopup(`
                    <div style="font-family: sans-serif;">
                        <h3 style="margin: 0 0 5px 0;">Flood in ${props.country}</h3>
                        <p style="margin: 2px 0;"><strong>Date:</strong> ${props.began}</p>
                        <p style="margin: 2px 0;"><strong>Cause:</strong> ${props.cause}</p>
                        <p style="margin: 2px 0;"><strong>Severity:</strong> ${props.severity}</p>
                        <p style="margin: 2px 0;"><strong>Displaced:</strong> ${props.displaced || 'N/A'}</p>
                        <p style="margin: 2px 0;"><strong>Deaths:</strong> ${props.dead || '0'}</p>
                    </div>
                `);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading the flood data:', error));
