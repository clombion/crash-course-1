---
name: geodata-visualizer
description: Create and publish standalone web apps for CSV data visualization on Leaflet maps. Use when you need to provide a dedicated tool for exploring specific geographic datasets with automated GitHub Pages publishing.
---

# Geodata Visualizer Skill

This skill allows you to quickly generate and publish a standalone web application that can parse and visualize CSV files on an interactive map.

## Core Functionality

- **CSV Parsing:** Uses PapaParse to handle large CSV/TSV files.
- **Map Visualization:** Uses Leaflet.js with a dark-themed CartoDB tile layer.
- **Smart Column Detection:** Automatically identifies latitude/longitude columns (lat, long, lng, x, y, etc.).
- **Consistent Design:** Midnight blue theme with gold accents, matching the project's design pattern.
- **Standalone Deployment:** Published as a unique subdirectory in the repository.

## Workflow

### 1. Generate the Application
Use `assets/template.html` as the base. If the user's CSV has specific requirements (different columns for deaths, severity, or cause), modify the `processData` function in the template:

```javascript
// Customize these mappings based on the specific CSV structure
_severity: parseNumber(row.Severity || 1),
_dead: parseNumber(row.Dead || 0),
_cause: row.MainCause || 'Unknown'
```

### 2. Customize Examples
Update the `EXAMPLE_DATA` constant in the HTML to reflect a relevant sample of the data being visualized.

### 3. Publishing to GitHub Pages
**Mandatory Process:**
- Always publish from the `main` branch.
- Each app MUST reside in its own unique subdirectory to have a separate URL.
- Use the `scripts/publish.sh` script to automate the process.

**Command:**
```bash
bash scripts/publish.sh <unique-folder-name> <generated-html-file>
```

## Implementation Details

The template includes:
- Drop zone for file uploads.
- "Paste Data" modal for quick testing.
- Search and filtering by "Cause".
- Stats dashboard for Records, Countries, and Deaths.
- "Return to Home" button for integration into a multi-page site.
