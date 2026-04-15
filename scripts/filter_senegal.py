import pandas as pd

# 1. Load the Excel file
# This tells Python to open your spreadsheet
print("Opening the Excel file...")
df = pd.read_excel('floodarchive.xlsx')

# 2. Filter the data
# This creates a new list that only includes rows where the Country is 'Senegal'
print("Filtering for Senegal...")
senegal_data = df[df['Country'] == 'Senegal']

# 3. Save the result
# This saves the filtered list as a new CSV file
# 'index=False' prevents Python from adding extra row numbers to your file
senegal_data.to_csv('senegal_floods.csv', index=False)

print(f"Success! I found {len(senegal_data)} flood events in Senegal.")
print("The data has been saved to 'senegal_floods.csv'.")
