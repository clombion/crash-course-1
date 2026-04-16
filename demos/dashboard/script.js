document.addEventListener('DOMContentLoaded', function() {
    // Path to the CSV file (one level up from the dashboard folder)
    const csvUrl = '../../data/floodarchive_cleaned.csv';

    Papa.parse(csvUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            const data = results.data.filter(row => row.ID); // Filter out empty rows
            renderCharts(data);
        },
        error: function(err) {
            console.error("Error parsing CSV:", err);
        }
    });
});

function renderCharts(data) {
    // 1. Top 20 Countries by Flood Events
    const countryCounts = {};
    data.forEach(row => {
        if (row.Country) {
            countryCounts[row.Country] = (countryCounts[row.Country] || 0) + 1;
        }
    });

    const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

    new Chart(document.getElementById('chart-countries'), {
        type: 'bar',
        data: {
            labels: topCountries.map(c => c[0]),
            datasets: [{
                label: 'Flood Events',
                data: topCountries.map(c => c[1]),
                backgroundColor: '#3498db'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: { legend: { display: false } }
        }
    });

    // 2. Flood Events per Year
    const yearCounts = {};
    data.forEach(row => {
        if (row.Year) {
            yearCounts[row.Year] = (yearCounts[row.Year] || 0) + 1;
        }
    });

    const sortedYears = Object.entries(yearCounts).sort((a, b) => a[0] - b[0]);

    new Chart(document.getElementById('chart-years'), {
        type: 'line',
        data: {
            labels: sortedYears.map(y => y[0]),
            datasets: [{
                label: 'Flood Events',
                data: sortedYears.map(y => y[1]),
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // 3. Events by Category
    const categoryCounts = {};
    data.forEach(row => {
        if (row.categorised_reason) {
            categoryCounts[row.categorised_reason] = (categoryCounts[row.categorised_reason] || 0) + 1;
        }
    });

    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

    new Chart(document.getElementById('chart-categories'), {
        type: 'bar',
        data: {
            labels: sortedCategories.map(c => c[0]),
            datasets: [{
                label: 'Events',
                data: sortedCategories.map(c => c[1]),
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    // 4. Total Displaced by Severity
    const severityDisplaced = {};
    data.forEach(row => {
        if (row.Severity !== undefined && row.Severity !== null) {
            const sev = `Severity ${row.Severity}`;
            severityDisplaced[sev] = (severityDisplaced[sev] || 0) + (row.Displaced || 0);
        }
    });

    const sortedSeverity = Object.entries(severityDisplaced).sort((a, b) => a[0].localeCompare(b[0]));

    new Chart(document.getElementById('chart-severity'), {
        type: 'bar',
        data: {
            labels: sortedSeverity.map(s => s[0]),
            datasets: [{
                label: 'Total Displaced',
                data: sortedSeverity.map(s => s[1]),
                backgroundColor: '#f1c40f'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y.toLocaleString() + ' people';
                        }
                    }
                }
            }
        }
    });
}
