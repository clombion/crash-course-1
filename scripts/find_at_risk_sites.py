import json
import math

def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in km
    R = 6371.0
    
    # Convert latitude and longitude to radians
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    
    # Haversine formula
    a = math.sin(dphi / 2)**2 + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(dlambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c

def find_at_risk_sites():
    # Load flood data
    with open('senegal/senegal_floods.json', 'r') as f:
        floods = json.load(f)
        
    # Load health sites
    with open('senegal/health_sites.json', 'r') as f:
        health = json.load(f)
        
    at_risk_features = []
    
    print("Analyzing 1,861 health sites against flood events...")
    
    for h_feat in health['features']:
        h_lon, h_lat = h_feat['geometry']['coordinates']
        is_at_risk = False
        nearest_flood_dist = float('inf')
        
        for f_feat in floods['features']:
            f_lon, f_lat = f_feat['geometry']['coordinates']
            
            dist = haversine(h_lat, h_lon, f_lat, f_lon)
            
            # Check if within 1km
            if dist <= 1.0:
                is_at_risk = True
                nearest_flood_dist = min(nearest_flood_dist, dist)
        
        if is_at_risk:
            # Add the distance to the properties so we can use it in popups later
            h_feat['properties']['distance_to_flood_km'] = round(nearest_flood_dist, 3)
            at_risk_features.append(h_feat)
            
    at_risk_geojson = {
        "type": "FeatureCollection",
        "features": at_risk_features
    }
    
    output_path = 'senegal/at_risk_health_sites.json'
    with open(output_path, 'w') as f:
        json.dump(at_risk_geojson, f, indent=2)
        
    print(f"Success! Identified {len(at_risk_features)} health sites within 1km of a historical flood event.")
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    find_at_risk_sites()
