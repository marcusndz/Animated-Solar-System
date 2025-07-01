/*********************************************************************************************
 🌌 Solar System Interactive Logic – JavaScript 🌌

 Author: Madhurima Rawat 👩‍💻
 Date: July 1, 2025 📅
 Repository: https://github.com/madhurimarawat/Animated-Solar-System 🔗

 Description:
 This JavaScript file adds interactivity and animation to the Solar System webpage.
 Features include:
 - 🌞 Planetary orbits simulated using requestAnimationFrame
 - 💡 Dynamic light/dark mode toggle with persistent user setting
 - 🧠 Hoverable planet info tooltips
 - 🏷️ Dynamic labels and Font Awesome icons per planet
 - 📄 Responsive planet information cards generated programmatically

 Dependencies:
 - index.html 🔗
 - index.css 🎨
 - light-mode.css 🌗
 - responsive-styles.css 📱 (optional)

 Usage:
 Place this script at the end of the HTML body. The planets rotate automatically,
 and info cards are generated dynamically on load based on `data-info` attributes.

 Enjoy building your own universe! 🚀
*********************************************************************************************/

/********************************************************************************************
 🌗 Dark/Light Mode Toggle with Persistence

 This script toggles between dark and light modes and saves the preference in localStorage.
 It also ensures that saved preferences are applied even when JS is loaded dynamically.
********************************************************************************************/

// 🌗 Toggle between light and dark mode
function toggleMode() {
    const body = document.body;
    const button = document.querySelector('.mode-toggle');

    if (!button) return; // ⛔ Avoid error if button not found

    // 🌙 Toggle classes
    body.classList.toggle("light-mode");
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");

    if (isDark) {
        button.innerHTML = "☀️ Light Mode";
        button.style.backgroundColor = "whitesmoke";
        localStorage.setItem("mode", "dark"); // 💾 Save preference
    } else {
        button.innerHTML = "🌙 Dark Mode";
        button.style.backgroundColor = "#333";
        localStorage.setItem("mode", "light"); // 💾 Save preference
    }
}

// ✅ Apply saved mode manually (called when script loads)
function applySavedMode() {
    const savedMode = localStorage.getItem("mode") || "dark"; // Default to dark
    const body = document.body;
    const button = document.querySelector('.mode-toggle');

    // First remove both to avoid class stacking
    body.classList.remove("light-mode", "dark-mode");

    if (savedMode === "dark") {
        body.classList.add("dark-mode");
        if (button) {
            button.innerHTML = "☀️ Light Mode";
            button.style.backgroundColor = "whitesmoke";
        }
    } else {
        body.classList.add("light-mode");
        if (button) {
            button.innerHTML = "🌙 Dark Mode";
            button.style.backgroundColor = "#333";

        }
    }
}

// ✅ Immediately apply mode when this script loads
applySavedMode();


// 🌍 Planet data including orbit times and associated orbit classes
const planets = [
    { id: 'planet-mercury', orbitTime: 10, orbit: '.mercury-orbit' },
    { id: 'planet-venus', orbitTime: 20, orbit: '.venus-orbit' },
    { id: 'planet-earth', orbitTime: 30, orbit: '.earth-orbit' },
    { id: 'planet-mars', orbitTime: 40, orbit: '.mars-orbit' },
    { id: 'planet-jupiter', orbitTime: 50, orbit: '.jupiter-orbit' },
    { id: 'planet-saturn', orbitTime: 60, orbit: '.saturn-orbit' },
    { id: 'planet-uranus', orbitTime: 70, orbit: '.uranus-orbit' },
    { id: 'planet-neptune', orbitTime: 80, orbit: '.neptune-orbit' },
];

// 🌀 Animate planet orbits
planets.forEach(planet => {
    const element = document.getElementById(planet.id);
    const orbit = document.querySelector(planet.orbit);

    if (element && orbit) {
        const orbitWidth = orbit.offsetWidth / 2;
        const orbitHeight = orbit.offsetHeight / 2;
        let angle = 0;

        function rotate() {
            angle += 360 / planet.orbitTime / 60; // 🎯 Adjust speed
            const radians = angle * (Math.PI / 180);
            const x = orbitWidth * Math.cos(radians);
            const y = orbitHeight * Math.sin(radians);

            element.style.top = `calc(50% + ${y}px)`;
            element.style.left = `calc(50% + ${x}px)`;
            requestAnimationFrame(rotate); // 🔁 Animate continuously
        }

        rotate();
    } else {
        console.error(`Error: Element or orbit not found for ${planet.id}`);
    }
});

// 🧠 Tooltip display logic
const planetElements = document.querySelectorAll('.planet');
const planetInfoCard = document.getElementById('planet-info');
const planetName = document.getElementById('planet-name');
const planetDetails = document.getElementById('planet-details');

// 🧾 Show planet info card on hover or click
function showPlanetInfo(e) {
    if (e.target && e.target.hasAttribute('data-info')) {
        const info = e.target.getAttribute('data-info').split(': ');
        if (info.length === 2) {
            planetName.textContent = info[0];
            planetDetails.textContent = info[1];
            planetInfoCard.style.display = 'block';
            planetInfoCard.style.top = `${e.clientY + 10}px`;
            planetInfoCard.style.left = `${e.clientX + 10}px`;
        } else {
            console.error('Error: Data-info attribute does not have the correct format');
        }
    } else {
        console.error('Error: No data-info attribute found');
    }
}

// ❌ Hide info card on mouse out
function hidePlanetInfo() {
    planetInfoCard.style.display = 'none';
}

// 🎯 Attach hover and click events to all planet elements
planetElements.forEach(planet => {
    planet.addEventListener('mouseover', showPlanetInfo);
    planet.addEventListener('mouseout', hidePlanetInfo);
    planet.addEventListener('click', showPlanetInfo);
});

// 🏷️ Add planet name labels to each orbit
planets.forEach(planet => {
    const element = document.getElementById(planet.id);
    const orbit = document.querySelector(planet.orbit);

    const label = document.createElement('div');
    label.className = 'planet-name-label';
    label.textContent = planet.id.split('-')[1].toUpperCase(); // Ex: "earth" → "EARTH"
    orbit.appendChild(label);
    planet.label = label; // Store label reference for animation

    if (element && orbit) {
        const orbitWidth = orbit.offsetWidth / 2;
        const orbitHeight = orbit.offsetHeight / 2;
        let angle = 0;

        function rotate() {
            angle += 360 / planet.orbitTime / 60;
            const radians = angle * (Math.PI / 180);
            const x = orbitWidth * Math.cos(radians);
            const y = orbitHeight * Math.sin(radians);

            element.style.top = `calc(50% + ${y}px)`;
            element.style.left = `calc(50% + ${x}px)`;

            // ✨ Move label with the planet
            planet.label.style.top = `calc(50% + ${y - 20}px)`;
            planet.label.style.left = `calc(50% + ${x}px)`;

            requestAnimationFrame(rotate);
        }

        rotate();
    }
});

// 🌟 Return a Font Awesome icon based on planet name
function getPlanetIcon(name) {
    const planet = name.toLowerCase();
    switch (planet) {
        case 'mercury': return '<i class="fas fa-thermometer-empty"></i>';
        case 'venus': return '<i class="fas fa-fire"></i>';
        case 'earth': return '<i class="fas fa-globe"></i>';
        case 'moon': return '<i class="fas fa-circle"></i>';
        case 'mars': return '<i class="fas fa-mars"></i>';
        case 'jupiter': return '<i class="fas fa-cloud-meatball"></i>';
        case 'saturn': return '<i class="fas fa-ring"></i>'; // Optional: may need alternative
        case 'uranus': return '<i class="fas fa-snowflake"></i>';
        case 'neptune': return '<i class="fas fa-water"></i>';
        default: return '<i class="fas fa-star"></i>';
    }
}

// 📦 Select planet card containers
const leftContainer = document.querySelector('.planet-cards-left');
const rightContainer = document.querySelector('.planet-cards-right');

// 📄 Generate and insert planet info cards with icons
planetElements.forEach((planet, index) => {
    const info = planet.getAttribute('data-info');
    if (info && info.includes(': ')) {
        const [name, details] = info.split(': ');
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.maxWidth = '100%';

        // 🔤 Insert icon and name
        const icon = getPlanetIcon(name);
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${icon} ${name}</h5>
                <p class="card-text">${details}</p>
            </div>
        `;

        // ↔️ Distribute cards to left/right alternately
        if (index % 2 === 0) {
            leftContainer.appendChild(card);
        } else {
            rightContainer.appendChild(card);
        }
    }
});