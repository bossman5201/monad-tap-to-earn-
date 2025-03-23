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

function handleTap() {
    tapSound.play();
    totalTaps++;
    tapCount++; // Increment tapCount for rocket flyby
    document.getElementById('taps-display').textContent = totalTaps;
    updateStats();
    triggerRocketFlyby();
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

// Wallet Connection with Ethers.js
const connectWalletButton = document.getElementById('connect-wallet');
const disconnectWalletButton = document.getElementById('disconnect-wallet');
const walletAddressDisplay = document.getElementById('wallet-address');

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Show "Connecting..." state immediately
            connectWalletButton.textContent = 'Connecting...';
            connectWalletButton.disabled = true;

            // Request access to the user's wallet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            // Shorten the wallet address (first 5 characters + "...")
            const shortAddress = `${address.slice(0, 5)}...`;

            // Update UI
            walletAddressDisplay.textContent = `Connected: ${shortAddress}`;
            connectWalletButton.style.display = 'none'; // Hide connect button
            disconnectWalletButton.style.display = 'inline-block'; // Show disconnect button
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

function disconnectWallet() {
    // Reset UI
    walletAddressDisplay.textContent = '';
    connectWalletButton.textContent = 'Connect Wallet';
    connectWalletButton.disabled = false;
    connectWalletButton.style.display = 'inline-block'; // Show connect button
    disconnectWalletButton.style.display = 'none'; // Hide disconnect button
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
