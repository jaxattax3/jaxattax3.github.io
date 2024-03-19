const stateValues = {
    "Maine": 1, "Vermont": 2, "New Hampshire": 3, "New Jersey": 4, "Idaho": 5,
    "Virginia": 6, "Rhode Island": 7, "Connecticut": 8, "Wyoming": 9, "Massachusetts": 10,
    "Pennsylvania": 11, "New York": 12, "Kentucky": 13, "Wisconsin": 14, "Minnesota": 15,
    "West Virginia": 16, "Iowa": 17, "North Dakota": 18, "Nebraska": 19, "Michigan": 20,
    "South Dakota": 21, "Illinois": 22, "Ohio": 23, "Utah": 24, "Hawaii": 25,
    "Mississippi": 26, "Indiana": 27, "North Carolina": 28, "Montana": 29, "Florida": 30,
    "Oregon": 31, "Maryland": 32, "Colorado": 33, "Delaware": 34, "California": 35,
    "Texas": 36, "Georgia": 37, "Washington": 38, "Kansas": 39, "Oklahoma": 40,
    "Nevada": 41, "Missouri": 42, "Arizona": 43, "Alabama": 44, "South Carolina": 45,
    "Arkansas": 46, "Tennessee": 47, "Louisiana": 48, "Alaska": 49, "New Mexico": 50
};


// Function to calculate color based on value
function getColor(value, min, max) {
    // Convert the value to a percentage of the range between min and max
    const ratio = (value - min) / (max - min);
    // Define start (light green) and end (dark red) colors in RGB
    const startColor = {r: 144, g: 238, b: 144}; // Light green
    const endColor = {r: 178, g: 34, b: 34}; // Dark red

    // Calculate new color based on ratio
    const newColor = {
        r: Math.round(startColor.r + ratio * (endColor.r - startColor.r)),
        g: Math.round(startColor.g + ratio * (endColor.g - startColor.g)),
        b: Math.round(startColor.b + ratio * (endColor.b - startColor.b))
    };

    // Return the new color in hex format
    return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
}

window.addEventListener('load', function() {
    const svgObject = document.getElementById('usMapSvg').contentDocument;
    const svg = svgObject.querySelector('svg');
    const minVal = 1;
    const maxVal = 50;

    svg.querySelectorAll('path').forEach(path => {
        const stateName = path.getAttribute('data-name');
        const value = stateValues[stateName];
        const color = getColor(value, minVal, maxVal);
        path.style.fill = color;

        path.addEventListener('mouseover', function() {
            const displayText = `${stateName}, ${value}`;
            const stateNameDiv = document.getElementById('state-name');
            stateNameDiv.innerHTML = displayText;
            stateNameDiv.style.display = 'block';
        });

        path.addEventListener('mousemove', function(e) {
            const stateNameDiv = document.getElementById('state-name');
            stateNameDiv.style.left = e.pageX + 'px';
            stateNameDiv.style.top = e.pageY + 'px';
        });

        path.addEventListener('mouseout', function() {
            document.getElementById('state-name').style.display = 'none';
        });
    });
});
