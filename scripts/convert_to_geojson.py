import pandas as pd
import json

def convert_excel_to_geojson(excel_file, output_file):
    # Load the Excel file
    df = pd.read_excel(excel_file)
    
    # Drop rows with missing latitude or longitude
    df = df.dropna(subset=['lat', 'long'])
    
    # Fill other NaNs with empty string or sensible defaults
    df = df.fillna('')
    
    # Convert dates to strings if they are datetime objects
    for col in ['Began', 'Ended']:
        if col in df.columns:
            df[col] = df[col].astype(str)
            
    # Create GeoJSON features
    features = []
    for _, row in df.iterrows():
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [float(row['long']), float(row['lat'])]
            },
            "properties": {
                "country": row.get('Country', ''),
                "began": row.get('Began', ''),
                "ended": row.get('Ended', ''),
                "cause": row.get('MainCause', ''),
                "severity": row.get('Severity', ''),
                "dead": row.get('Dead', ''),
                "displaced": row.get('Displaced', '')
            }
        }
        features.append(feature)
        
    # Create the final GeoJSON object
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }
    
    # Save to file
    with open(output_file, 'w') as f:
        json.dump(geojson, f, indent=2)
    print(f"Successfully converted {len(features)} events to {output_file}")

if __name__ == "__main__":
    convert_excel_to_geojson('floodarchive.xlsx', 'floods.json')
