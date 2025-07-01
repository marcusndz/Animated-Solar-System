/********************************************************************************************
 📱 Mobile-Friendly Solar System Logic – JavaScript

 Author: Madhurima Rawat 👩‍💻
 Date: July 1, 2025 📅
 Description:
 Optimized script for mobile performance and interaction. Minimizes resource use while keeping
 orbit animation, tooltips, and card generation intact.

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


// 🪐 Planet Rotation (Mobile-Optimized Speed)
const planets_mobile = [
    { id: 'planet-mercury', orbitTime: 20, orbit: '.mercury-orbit' },
    { id: 'planet-venus', orbitTime: 30, orbit: '.venus-orbit' },
    { id: 'planet-earth', orbitTime: 40, orbit: '.earth-orbit' },
    { id: 'planet-mars', orbitTime: 50, orbit: '.mars-orbit' },
    { id: 'planet-jupiter', orbitTime: 60, orbit: '.jupiter-orbit' },
    { id: 'planet-saturn', orbitTime: 70, orbit: '.saturn-orbit' },
    { id: 'planet-uranus', orbitTime: 80, orbit: '.uranus-orbit' },
    { id: 'planet-neptune', orbitTime: 90, orbit: '.neptune-orbit' },
];

planets_mobile.forEach(planet => {
    const element = document.getElementById(planet.id);
    const orbit = document.querySelector(planet.orbit);

    if (element && orbit) {
        const w = orbit.offsetWidth / 2;
        const h = orbit.offsetHeight / 2;
        let angle = 0;

        function rotate() {
            angle += 360 / planet.orbitTime / 60;
            const rad = angle * (Math.PI / 180);
            const x = w * Math.cos(rad);
            const y = h * Math.sin(rad);

            element.style.top = `calc(50% + ${y}px)`;
            element.style.left = `calc(50% + ${x}px)`;

            requestAnimationFrame(rotate);
        }

        rotate();
    }
});

// 💡 Tooltip click (no hover on touch)
const planetElements_mobile = document.querySelectorAll('.planet');
const planetInfoCard_mobile = document.getElementById('planet-info');
const planetName_mobile = document.getElementById('planet-name');
const planetDetails_mobile = document.getElementById('planet-details');

planetElements_mobile.forEach(planet => {
    planet.addEventListener('click', (e) => {
        const info = planet.getAttribute('data-info');
        if (info && info.includes(': ')) {
            const [name, details] = info.split(': ');
            planetName_mobile.textContent = name;
            planetDetails_mobile.textContent = details;
            planetInfoCard_mobile.style.display = 'block';
            planetInfoCard_mobile.style.top = `${e.clientY + 10}px`;
            planetInfoCard_mobile.style.left = `${e.clientX + 10}px`;
        }
    });
});

// ✨ Dismiss tooltip on outside tap
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('planet')) {
        planetInfoCard_mobile.style.display = 'none';
    }
});

// 🏷️ Labels simplified
planets_mobile.forEach(planet => {
    const el = document.getElementById(planet.id);
    const orbit = document.querySelector(planet.orbit);
    if (el && orbit) {
        const lbl = document.createElement('div');
        lbl.className = 'planet-name-label';
        lbl.textContent = planet.id.split('-')[1].toUpperCase();
        orbit.appendChild(lbl);

        const w = orbit.offsetWidth / 2;
        const h = orbit.offsetHeight / 2;
        let angle = 0;

        function rotateLabel() {
            angle += 360 / planet.orbitTime / 60;
            const rad = angle * (Math.PI / 180);
            const x = w * Math.cos(rad);
            const y = h * Math.sin(rad);

            lbl.style.top = `calc(50% + ${y - 15}px)`;
            lbl.style.left = `calc(50% + ${x}px)`;

            requestAnimationFrame(rotateLabel);
        }

        rotateLabel();
    }
});

// 📋 Card Generator
const left = document.querySelector('.planet-cards-left');
const right = document.querySelector('.planet-cards-right');

function getPlanetIcon(name) {
    const n = name.toLowerCase();
    switch (n) {
        case 'mercury': return '<i class="fas fa-thermometer-empty"></i>';
        case 'venus': return '<i class="fas fa-fire"></i>';
        case 'earth': return '<i class="fas fa-globe"></i>';
        case 'moon': return '<i class="fas fa-circle"></i>';
        case 'mars': return '<i class="fas fa-mars"></i>';
        case 'jupiter': return '<i class="fas fa-cloud-meatball"></i>';
        case 'saturn': return '<i class="fas fa-ring"></i>';
        case 'uranus': return '<i class="fas fa-snowflake"></i>';
        case 'neptune': return '<i class="fas fa-water"></i>';
        default: return '<i class="fas fa-star"></i>';
    }
}

planetElements_mobile.forEach((planet, i) => {
    const info = planet.getAttribute('data-info');
    if (info && info.includes(': ')) {
        const [name, details] = info.split(': ');
        const card = document.createElement('div');
        card.className = 'card mb-2';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${getPlanetIcon(name)} ${name}</h5>
                <p class="card-text">${details}</p>
            </div>
        `;
        (i % 2 === 0 ? left : right).appendChild(card);
    }
});
