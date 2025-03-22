// Starfield Background Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
    });
    requestAnimationFrame(drawStars);
}
drawStars();

// Tap Interaction with Sound and Animation
const tapSound = document.getElementById('tap-sound');
const tapButton = document.getElementById('tap-button');
let tapCount = 0;
let totalTaps = 0;

tapButton.addEventListener('click', () => {
    tapSound.play();
    totalTaps++;
    document.getElementById('taps-display').textContent = totalTaps;
    updateStats();
    triggerRocketFlyby();
});

// Rocket Flyby Animation (every 100 taps)
function triggerRocketFlyby() {
    tapCount++;
    if (tapCount % 100 === 0) {
        const rocket = document.getElementById('rocket');
        rocket.style.display = 'block';
        rocket.style.left = '-50px';
        rocket.style.top = `${Math.random() * window.innerHeight}px`;
        gsap.to(rocket, { 
            x: window.innerWidth + 50, 
            duration: 2, 
            onComplete: () => rocket.style.display = 'none' 
        });
    }
}

// Stats Animation Trigger
function updateStats() {
    document.querySelectorAll('.stats div').forEach(stat => {
        stat.classList.add('updated');
        setTimeout(() => stat.classList.remove('updated'), 300);
    });
}

// Theme Toggle (Purple/White)
function toggleTheme() {
    const root = document.documentElement;
    if (root.style.getPropertyValue('--primary-color') === '#6a0dad') {
        root.style.setProperty('--primary-color', '#fff');
        root.style.setProperty('--secondary-color', '#6a0dad');
        root.style.setProperty('--text-color', '#fff');
    } else {
        root.style.setProperty('--primary-color', '#6a0dad');
        root.style.setProperty('--secondary-color', '#fff');
        root.style.setProperty('--text-color', '#000');
    }
}

// Action Functions with Animations and Sound
function buyFuelCredits() {
    document.getElementById('loader').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('credits-display').textContent = 
            parseInt(document.getElementById('credits-display').textContent) + 10;
        updateStats();
    }, 2000);
}

function activateTurboBooster() {
    document.getElementById('powerup-sound').play();
    document.getElementById('powerups-display').textContent = 
        parseInt(document.getElementById('powerups-display').textContent) + 1;
    updateStats();
}

function activateAutoDrill() {
    document.getElementById('powerup-sound').play();
    document.getElementById('powerups-display').textContent = 
        parseInt(document.getElementById('powerups-display').textContent) + 1;
    updateStats();
}

function inviteFriend() {
    document.getElementById('click-sound').play();
    document.getElementById('invites-display').textContent = 
        parseInt(document.getElementById('invites-display').textContent) + 1;
    updateStats();
}

function claimDailyBonus() {
    document.getElementById('click-sound').play();
    document.getElementById('fuel-display').textContent = 
        parseInt(document.getElementById('fuel-display').textContent) + 50;
    updateStats();
}

function switchPaymentNetwork() {
    document.getElementById('click-sound').play();
    // Add your network switch logic here
}
