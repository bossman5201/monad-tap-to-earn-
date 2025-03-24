// Starfield Background Animation with Milky Way Enhancement
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

// Game State
let totalFuel = 0;
let fuelCredits = 10; // Start with 10 fuel credits
let tapCount = 0;
let totalTaps = 0;
let fuelPerTap = 1; // Default fuel per tap
let powerUpsUsed = 0;
let invitesSent = 0;
let isAutoDrillActive = false;

// DOM Elements
const tapSound = document.getElementById('tap-sound');
const powerupSound = document.getElementById('powerup-sound');
const clickSound = document.getElementById('click-sound');
const tapButton = document.getElementById('tap-button');
const particleContainer = document.getElementById('particle-container');
const tapDisabledMessage = document.getElementById('tap-disabled-message');
const fuelDisplay = document.getElementById('fuel-display');
const creditsDisplay = document.getElementById('credits-display');
const creditsWarning = document.getElementById('credits-warning');
const powerupsDisplay = document.getElementById('powerups-display');
const invitesDisplay = document.getElementById('invites-display');
const turboBoosterButton = document.getElementById('turbo-booster-button');
const turboBoosterMessage = document.getElementById('turbo-booster-message');
const autoDrillButton = document.getElementById('auto-drill-button');
const autoDrillMessage = document.getElementById('auto-drill-message');

// Particle System for Enhanced Tap Effect
function spawnParticles() {
    const particleCount = 5; // Number of particles per tap
    const centerX = particleContainer.offsetWidth / 2;
    const centerY = particleContainer.offsetHeight / 2;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        particleContainer.appendChild(particle);
        
        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Load Game State from localStorage
function loadGameState() {
    totalFuel = parseInt(localStorage.getItem('totalFuel')) || 0;
    fuelCredits = parseInt(localStorage.getItem('fuelCredits')) || 10;
    totalTaps = parseInt(localStorage.getItem('totalTaps')) || 0;
    powerUpsUsed = parseInt(localStorage.getItem('powerUpsUsed')) || 0;
    invitesSent = parseInt(localStorage.getItem('invitesSent')) || 0;

    fuelDisplay.textContent = totalFuel;
    creditsDisplay.textContent = fuelCredits;
    powerupsDisplay.textContent = powerUpsUsed;
    invitesDisplay.textContent = invitesSent;
    document.getElementById('taps-display').textContent = totalTaps;

    if (fuelCredits <= 3) {
        creditsWarning.textContent = '(Low credits!)';
    } else {
        creditsWarning.textContent = '';
    }

    if (fuelCredits <= 0) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
    }
}

// Save Game State to localStorage
function saveGameState() {
    localStorage.setItem('totalFuel', totalFuel);
    localStorage.setItem('fuelCredits', fuelCredits);
    localStorage.setItem('totalTaps', totalTaps);
    localStorage.setItem('powerUpsUsed', powerUpsUsed);
    localStorage.setItem('invitesSent', invitesSent);
}

// Initialize UI
loadGameState();

// Smooth Counter Update Function
function smoothUpdate(element, targetValue, duration = 1000) {
    const startValue = parseInt(element.textContent) || 0;
    const startTime = performance.now();
    const update = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    requestAnimationFrame(update);
}

// Tap Interaction with Enhanced Feedback
function handleTap() {
    if (fuelCredits <= 0) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        return;
    }

    fuelCredits--;
    smoothUpdate(creditsDisplay, fuelCredits);

    totalFuel += fuelPerTap;
    smoothUpdate(fuelDisplay, totalFuel);

    tapSound.play();
    spawnParticles();
    totalTaps++;
    smoothUpdate(document.getElementById('taps-display'), totalTaps);
    updateStats();

    if (fuelCredits <= 3) {
        creditsWarning.textContent = '(Low credits!)';
    } else {
        creditsWarning.textContent = '';
    }

    if (fuelCredits <= 0) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
    }

    saveGameState();
}

tapButton.addEventListener('click', () => {
    tapButton.classList.add('tap-active');
    handleTap();
    setTimeout(() => tapButton.classList.remove('tap-active'), 200);
});
tapButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    tapButton.classList.add('tap-active');
    handleTap();
    setTimeout(() => tapButton.classList.remove('tap-active'), 200);
});

// Stats Animation Trigger
function updateStats() {
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.classList.add('updated');
        setTimeout(() => stat.classList.remove('updated'), 300);
    });
}

// Power-Up: Turbo Booster
function activateTurboBooster() {
    const powerUpCost = 5;
    if (fuelCredits < powerUpCost) {
        turboBoosterMessage.textContent = 'Not enough credits! Need 5 credits.';
        turboBoosterMessage.style.display = 'block';
        setTimeout(() => turboBoosterMessage.style.display = 'none', 3000);
        return;
    }

    fuelCredits -= powerUpCost;
    smoothUpdate(creditsDisplay, fuelCredits);
    if (fuelCredits <= 3) creditsWarning.textContent = '(Low credits!)';

    powerUpsUsed++;
    smoothUpdate(powerupsDisplay, powerUpsUsed);

    fuelPerTap = 2;
    turboBoosterButton.disabled = true;
    tapButton.classList.add('glowing');
    powerupSound.play();
    updateStats();

    let timeLeft = 60;
    turboBoosterMessage.textContent = `Turbo Booster active! ${timeLeft}s remaining`;
    turboBoosterMessage.style.display = 'block';

    const timer = setInterval(() => {
        timeLeft--;
        turboBoosterMessage.textContent = `Turbo Booster active! ${timeLeft}s remaining`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            fuelPerTap = 1;
            turboBoosterButton.disabled = false;
            tapButton.classList.remove('glowing');
            turboBoosterMessage.style.display = 'none';
        }
    }, 1000);

    saveGameState();
}

// Power-Up: Auto-Drill
function activateAutoDrill() {
    const powerUpCost = 5;
    if (fuelCredits < powerUpCost) {
        autoDrillMessage.textContent = 'Not enough credits! Need 5 credits.';
        autoDrillMessage.style.display = 'block';
        setTimeout(() => autoDrillMessage.style.display = 'none', 3000);
        return;
    }

    fuelCredits -= powerUpCost;
    smoothUpdate(creditsDisplay, fuelCredits);
    if (fuelCredits <= 3) creditsWarning.textContent = '(Low credits!)';

    powerUpsUsed++;
    smoothUpdate(powerupsDisplay, powerUpsUsed);

    isAutoDrillActive = true;
    autoDrillButton.disabled = true;
    tapButton.classList.add('glowing');
    powerupSound.play();
    updateStats();

    let timeLeft = 120;
    autoDrillMessage.textContent = `Auto-Drill active! ${timeLeft}s remaining`;
    autoDrillMessage.style.display = 'block';

    const totalTapsToAdd = 1000;
    const duration = 120;
    const tapsPerSecond = totalTapsToAdd / duration;
    let tapsRemaining = totalTapsToAdd;

    const autoTap = setInterval(() => {
        if (!isAutoDrillActive || fuelCredits <= 0 || tapsRemaining <= 0) {
            clearInterval(autoTap);
            return;
        }

        const tapsThisSecond = Math.min(tapsPerSecond, tapsRemaining);
        for (let i = 0; i < Math.floor(tapsThisSecond); i++) {
            handleTap();
        }
        if (Math.random() < tapsThisSecond % 1) handleTap();

        tapsRemaining -= tapsThisSecond;
    }, 1000);

    const timer = setInterval(() => {
        timeLeft--;
        autoDrillMessage.textContent = `Auto-Drill active! ${timeLeft}s remaining`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            clearInterval(autoTap);
            isAutoDrillActive = false;
            autoDrillButton.disabled = false;
            tapButton.classList.remove('glowing');
            autoDrillMessage.style.display = 'none';
            tapsRemaining = 0;
        }
    }, 1000);

    saveGameState();
}

// Wallet Connection with Ethers.js
const connectWalletButton = document.getElementById('connect-wallet');
const disconnectWalletButton = document.getElementById('disconnect-wallet');
const walletAddressDisplay = document.getElementById('wallet-address');
const disconnectInstruction = document.getElementById('disconnect-instruction');
let provider = null;
let signer = null;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            connectWalletButton.textContent = 'Connecting...';
            connectWalletButton.disabled = true;

            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const address = await signer.getAddress();

            const shortAddress = `${address.slice(0, 5)}...`;
            walletAddressDisplay.textContent = `Connected: ${shortAddress}`;
            connectWalletButton.style.display = 'none';
            disconnectWalletButton.style.display = 'inline-block';
            disconnectInstruction.style.display = 'none';

            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', address);

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
        } catch (error) {
            console.error('Wallet connection failed:', error);
            walletAddressDisplay.textContent = 'Connection failed. Please try again.';
            connectWalletButton.textContent = 'Connect Wallet';
            connectWalletButton.disabled = false;
        }
    } else {
        walletAddressDisplay.textContent = 'Please install MetaMask!';
        connectWalletButton.textContent = 'Connect Wallet';
        connectWalletButton.disabled = false;
    }
}

async function disconnectWallet() {
    walletAddressDisplay.textContent = '';
    connectWalletButton.textContent = 'Connect Wallet';
    connectWalletButton.disabled = false;
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';

    disconnectInstruction.textContent = 'To fully disconnect, go to MetaMask > Connected Sites > Disconnect this dApp.';
    disconnectInstruction.style.display = 'block';

    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');

    provider = null;
    signer = null;

    if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else {
        const shortAddress = `${accounts[0].slice(0, 5)}...`;
        walletAddressDisplay.textContent = `Connected: ${shortAddress}`;
        localStorage.setItem('walletAddress', accounts[0]);
    }
}

function handleChainChanged(chainId) {
    window.location.reload();
}

if (localStorage.getItem('walletConnected') === 'true') {
    connectWallet();
}

connectWalletButton.addEventListener('click', connectWallet);
disconnectWalletButton.addEventListener('click', disconnectWallet);

// Action Functions
function buyFuelCredits() {
    document.getElementById('loader').style.display = 'block';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        fuelCredits += 10;
        smoothUpdate(creditsDisplay, fuelCredits);
        creditsWarning.textContent = fuelCredits <= 3 ? '(Low credits!)' : '';
        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';
        updateStats();
        saveGameState();
    }, 2000);
}

function inviteFriend() {
    clickSound.play();
    invitesSent++;
    smoothUpdate(invitesDisplay, invitesSent);
    updateStats();
    saveGameState();
}

function claimDailyBonus() {
    clickSound.play();
    totalFuel += 50;
    smoothUpdate(fuelDisplay, totalFuel);
    updateStats();
    saveGameState();
}

function switchPaymentNetwork() {
    clickSound.play();
    // Add your network switch logic here
}

// Reset Game State
function resetGame() {
    localStorage.removeItem('totalFuel');
    localStorage.removeItem('fuelCredits');
    localStorage.removeItem('totalTaps');
    localStorage.removeItem('powerUpsUsed');
    localStorage.removeItem('invitesSent');

    totalFuel = 0;
    fuelCredits = 10;
    totalTaps = 0;
    tapCount = 0;
    fuelPerTap = 1;
    powerUpsUsed = 0;
    invitesSent = 0;
    isAutoDrillActive = false;

    smoothUpdate(fuelDisplay, totalFuel);
    smoothUpdate(creditsDisplay, fuelCredits);
    smoothUpdate(powerupsDisplay, powerUpsUsed);
    smoothUpdate(invitesDisplay, invitesSent);
    smoothUpdate(document.getElementById('taps-display'), totalTaps);
    creditsWarning.textContent = '';
    tapButton.disabled = false;
    tapButton.classList.remove('glowing');
    tapDisabledMessage.style.display = 'none';
    turboBoosterButton.disabled = false;
    autoDrillButton.disabled = false;
    turboBoosterMessage.style.display = 'none';
    autoDrillMessage.style.display = 'none';

    clickSound.play();
    updateStats();
}
