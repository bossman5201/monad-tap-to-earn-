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

// Game State
let totalFuel = 0;
let fuelCredits = 10; // Start with 10 fuel credits
let tapCount = 0;
let totalTaps = 0;
let fuelPerTap = 1; // Default fuel per tap
let powerUpsUsed = 0;
let isAutoDrillActive = false;

// DOM Elements
const tapSound = document.getElementById('tap-sound');
const powerupSound = document.getElementById('powerup-sound');
const tapButton = document.getElementById('tap-button');
const tapDisabledMessage = document.getElementById('tap-disabled-message');
const fuelDisplay = document.getElementById('fuel-display');
const creditsDisplay = document.getElementById('credits-display');
const creditsWarning = document.getElementById('credits-warning');
const powerupsDisplay = document.getElementById('powerups-display');
const turboBoosterButton = document.getElementById('turbo-booster-button');
const turboBoosterMessage = document.getElementById('turbo-booster-message');
const autoDrillButton = document.getElementById('auto-drill-button');
const autoDrillMessage = document.getElementById('auto-drill-message');

// Initialize UI
fuelDisplay.textContent = totalFuel;
creditsDisplay.textContent = fuelCredits;
powerupsDisplay.textContent = powerUpsUsed;

// Tap Interaction with Sound and Animation
function handleTap() {
    if (fuelCredits <= 0) {
        // Not enough fuel credits to tap
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        return;
    }

    // Consume 1 fuel credit per tap
    fuelCredits--;
    creditsDisplay.textContent = fuelCredits;

    // Earn fuel per tap (modified by power-ups)
    totalFuel += fuelPerTap;
    fuelDisplay.textContent = totalFuel;

    // Play sound and update stats
    tapSound.play();
    totalTaps++;
    tapCount++; // Increment tapCount for rocket flyby
    document.getElementById('taps-display').textContent = totalTaps;
    updateStats();
    triggerRocketFlyby();

    // Update credits warning
    if (fuelCredits <= 3) {
        creditsWarning.textContent = '(Low credits!)';
    } else {
        creditsWarning.textContent = '';
    }

    // Disable tap button if credits run out
    if (fuelCredits <= 0) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
    }
}

tapButton.addEventListener('click', handleTap);
tapButton.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior (e.g., scrolling)
    handleTap();
});

// Rocket Flyby Animation (every 100 taps)
function triggerRocketFlyby() {
    console.log(`Tap count: ${tapCount}`); // Debug log
    if (tapCount % 100 === 0) {
        console.log('Triggering rocket flyby'); // Debug log
        const rocket = document.getElementById('rocket');
        rocket.style.left = '-50px'; // Reset position
        rocket.classList.remove('flyby'); // Remove previous animation
        void rocket.offsetWidth; // Trigger reflow to restart animation
        rocket.classList.add('flyby'); // Start the CSS animation
    }
}

// Stats Animation Trigger
function updateStats() {
    document.querySelectorAll('.stats div').forEach(stat => {
        stat.classList.add('updated');
        setTimeout(() => stat.classList.remove('updated'), 300);
    });
}

// Power-Up: Turbo Booster (2x fuel per tap for 60 seconds)
function activateTurboBooster() {
    const powerUpCost = 5; // Cost in fuel credits
    if (fuelCredits < powerUpCost) {
        turboBoosterMessage.textContent = 'Not enough credits! Need 5 credits.';
        turboBoosterMessage.style.display = 'block';
        setTimeout(() => {
            turboBoosterMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Consume credits
    fuelCredits -= powerUpCost;
    creditsDisplay.textContent = fuelCredits;
    if (fuelCredits <= 3) {
        creditsWarning.textContent = '(Low credits!)';
    }

    // Increment power-ups used
    powerUpsUsed++;
    powerupsDisplay.textContent = powerUpsUsed;

    // Activate power-up
    fuelPerTap = 2; // Double fuel per tap
    turboBoosterButton.disabled = true;
    powerupSound.play();
    updateStats();

    // Show timer
    let timeLeft = 60; // Duration set to 60 seconds
    turboBoosterMessage.textContent = `Turbo Booster active! ${timeLeft}s remaining`;
    turboBoosterMessage.style.display = 'block';

    const timer = setInterval(() => {
        timeLeft--;
        turboBoosterMessage.textContent = `Turbo Booster active! ${timeLeft}s remaining`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            fuelPerTap = 1; // Reset fuel per tap
            turboBoosterButton.disabled = false;
            turboBoosterMessage.style.display = 'none'; // Hide timer after 60 seconds
        }
    }, 1000);
}

// Power-Up: Auto-Drill (1000 taps over 120 seconds)
function activateAutoDrill() {
    const powerUpCost = 5; // Cost in fuel credits
    if (fuelCredits < powerUpCost) {
        autoDrillMessage.textContent = 'Not enough credits! Need 5 credits.';
        autoDrillMessage.style.display = 'block';
        setTimeout(() => {
            autoDrillMessage.style.display = 'none';
        }, 3000);
        return;
    }

    // Consume credits
    fuelCredits -= powerUpCost;
    creditsDisplay.textContent = fuelCredits;
    if (fuelCredits <= 3) {
        creditsWarning.textContent = '(Low credits!)';
    }

    // Increment power-ups used
    powerUpsUsed++;
    powerupsDisplay.textContent = powerUpsUsed;

    // Activate power-up
    isAutoDrillActive = true;
    autoDrillButton.disabled = true;
    powerupSound.play();
    updateStats();

    // Show timer
    let timeLeft = 120; // Duration set to 120 seconds
    autoDrillMessage.textContent = `Auto-Drill active! ${timeLeft}s remaining`;
    autoDrillMessage.style.display = 'block';

    // Calculate taps per second for 1000 taps over 120 seconds
    const totalTapsToAdd = 1000;
    const duration = 120; // 120 seconds
    const tapsPerSecond = totalTapsToAdd / duration; // ~8.33 taps per second
    const intervalTime = 1000; // 1 second intervals
    let tapsRemaining = totalTapsToAdd;

    const autoTap = setInterval(() => {
        if (!isAutoDrillActive || fuelCredits <= 0 || tapsRemaining <= 0) {
            clearInterval(autoTap);
            return;
        }

        // Calculate how many taps to add this second
        const tapsThisSecond = Math.min(tapsPerSecond, tapsRemaining);
        for (let i = 0; i < Math.floor(tapsThisSecond); i++) {
            handleTap(); // Simulate a full tap
        }
        // Handle fractional taps (e.g., 0.33 taps)
        if (Math.random() < tapsThisSecond % 1) {
            handleTap(); // Add an extra tap based on the fractional chance
        }

        tapsRemaining -= tapsThisSecond;
    }, intervalTime);

    const timer = setInterval(() => {
        timeLeft--;
        autoDrillMessage.textContent = `Auto-Drill active! ${timeLeft}s remaining`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            clearInterval(autoTap);
            isAutoDrillActive = false;
            autoDrillButton.disabled = false;
            autoDrillMessage.style.display = 'none'; // Hide timer after 120 seconds
            tapsRemaining = 0; // Ensure no more taps are added
        }
    }, 1000);
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
            // Show "Connecting..." state immediately
            connectWalletButton.textContent = 'Connecting...';
            connectWalletButton.disabled = true;

            // Request access to the user's wallet
            provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            signer = provider.getSigner();
            const address = await signer.getAddress();

            // Shorten the wallet address (first 5 characters + "...")
            const shortAddress = `${address.slice(0, 5)}...`;

            // Update UI
            walletAddressDisplay.textContent = `Connected: ${shortAddress}`;
            connectWalletButton.style.display = 'none'; // Hide connect button
            disconnectWalletButton.style.display = 'inline-block'; // Show disconnect button
            disconnectInstruction.style.display = 'none'; // Hide instruction if visible

            // Store connection state in localStorage
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', address);

            // Listen for account and network changes
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
    // Reset UI
    walletAddressDisplay.textContent = '';
    connectWalletButton.textContent = 'Connect Wallet';
    connectWalletButton.disabled = false;
    connectWalletButton.style.display = 'inline-block'; // Show connect button
    disconnectWalletButton.style.display = 'none'; // Hide disconnect button

    // Show instructions for manual disconnection in MetaMask
    disconnectInstruction.textContent = 'To fully disconnect, go to MetaMask > Connected Sites > Disconnect this dApp.';
    disconnectInstruction.style.display = 'block';

    // Clear localStorage
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');

    // Reset provider and signer
    provider = null;
    signer = null;

    // Remove event listeners
    if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
}

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected or switched accounts to none
        disconnectWallet();
    } else {
        // User switched accounts
        const shortAddress = `${accounts[0].slice(0, 5)}...`;
        walletAddressDisplay.textContent = `Connected: ${shortAddress}`;
        localStorage.setItem('walletAddress', accounts[0]);
    }
}

function handleChainChanged(chainId) {
    // Network changed, reload the page to ensure compatibility
    window.location.reload();
}

// Check if wallet was previously connected
if (localStorage.getItem('walletConnected') === 'true') {
    connectWallet();
}

connectWalletButton.addEventListener('click', connectWallet);
disconnectWalletButton.addEventListener('click', disconnectWallet);

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
        fuelCredits += 10; // Add 10 fuel credits
        creditsDisplay.textContent = fuelCredits;
        creditsWarning.textContent = fuelCredits <= 3 ? '(Low credits!)' : '';
        tapButton.disabled = false; // Re-enable tap button
        tapDisabledMessage.style.display = 'none'; // Hide disabled message
        updateStats();
    }, 2000);
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
