import json

def clean_value(obj):
    if isinstance(obj, list):
        return [clean_value(x) for x in obj]
    if isinstance(obj, dict):
        return {k: clean_value(v) for k, v in obj.items()}
    if isinstance(obj, float):
        # Check if it's NaN or Infinity
        if obj != obj or obj == float('inf') or obj == float('-inf'):
            return ""
    return obj

def main():
    # Read the problematic file
    # We use a trick to read it even with NaN by using a custom decoder or 
    # just reading it as text and replacing NaN
    with open('senegal/senegal_floods.json', 'r') as f:
        content = f.read()
    
    # Replace the text 'NaN' with 'null' so json.loads works
    clean_content = content.replace('NaN', 'null')
    data = json.loads(clean_content)
    
    # Further clean any infinity etc
    final_data = clean_value(data)
    
    with open('senegal/senegal_floods.json', 'w') as f:
        json.dump(final_data, f, indent=2)
    print("Cleaned senegal_floods.json successfully.")

if __name__ == "__main__":
    main()
