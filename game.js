// Canvas Background Animation
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxRadius = Math.min(canvas.width, canvas.height) * 0.6;

const fgStars = [];
for (let i = 0; i < 250; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 2) * maxRadius;
    const spiralAngle = angle + radius * 0.03;
    const x = centerX + Math.cos(spiralAngle) * radius;
    const y = centerY + Math.sin(spiralAngle) * radius;
    const size = Math.random() * 4 + 1;
    const baseAlpha = Math.random() * 0.6 + 0.4;
    const color = Math.random() < 0.2 ? '255, 200, 150' : Math.random() < 0.4 ? '255, 255, 200' : Math.random() < 0.7 ? '255, 255, 255'

 : '180, 200, 255';
    fgStars.push({ x, y, size, baseAlpha, angle, radius, speed: Math.random() * 0.005 + 0.003, color });
}

const bgStars = [];
for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 1.5) * maxRadius * 0.9;
    const spiralAngle = angle + radius * 0.025;
    const x = centerX + Math.cos(spiralAngle) * radius;
    const y = centerY + Math.sin(spiralAngle) * radius;
    const size = Math.random() * 2 + 0.5;
    const baseAlpha = Math.random() * 0.4 + 0.2;
    const color = Math.random() < 0.5 ? '255, 255, 255' : '200, 220, 255';
    bgStars.push({ x, y, size, baseAlpha, angle, radius, speed: Math.random() * 0.002 + 0.001, color });
}

const dust = [];
for (let i = 0; i < 25; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * maxRadius * 0.6;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = Math.random() * 30 + 20;
    const baseAlpha = Math.random() * 0.15 + 0.05;
    dust.push({ x, y, size, baseAlpha, angle, radius, speed: Math.random() * 0.003 + 0.002 });
}

const dustSmall = [];
for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * maxRadius * 0.8;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = Math.random() * 10 + 5;
    const baseAlpha = Math.random() * 0.1 + 0.03;
    dustSmall.push({ x, y, size, baseAlpha, angle, radius, speed: Math.random() * 0.004 + 0.002 });
}

let time = 0;

function animateMilkyWay() {
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.hypot(canvas.width, canvas.height) / 2);
    gradient.addColorStop(0, 'rgba(180, 140, 255, 0.15)');
    gradient.addColorStop(0.3, 'rgba(120, 80, 200, 0.1)');
    gradient.addColorStop(1, 'rgba(10, 0, 26, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
    bgStars.forEach(star => {
        const twinkle = star.baseAlpha + Math.sin(time + star.angle) * 0.15;
        const pulseRadius = star.radius * (1 + Math.sin(time * 0.5 + star.angle) * 0.05);
        star.x = centerX + Math.cos(star.angle) * pulseRadius;
        star.y = centerY + Math.sin(star.angle) * pulseRadius;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${twinkle})`;
        ctx.fill();
        star.angle += star.speed;
    });

    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(200, 180, 255, 0.2)';
    dust.forEach(d => {
        const pulse = d.baseAlpha + Math.sin(time + d.angle) * 0.03;
        d.angle += d.speed;
        d.x = centerX + Math.cos(d.angle) * d.radius;
        d.y = centerY + Math.sin(d.angle) * d.radius;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 180, 255, ${pulse})`;
        ctx.fill();
    });

    dustSmall.forEach(d => {
        const pulse = d.baseAlpha + Math.sin(time * 2 + d.angle) * 0.02;
        d.angle += d.speed;
        d.x = centerX + Math.cos(d.angle) * d.radius;
        d.y = centerY + Math.sin(d.angle) * d.radius;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 200, 255, ${pulse})`;
        ctx.fill();
    });

    ctx.shadowBlur = 8;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    fgStars.forEach(star => {
        const twinkle = star.baseAlpha + Math.sin(time + star.angle) * 0.2;
        const pulseRadius = star.radius * (1 + Math.sin(time * 0.7 + star.angle) * 0.07);
        star.x = centerX + Math.cos(star.angle) * pulseRadius;
        star.y = centerY + Math.sin(star.angle) * pulseRadius;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${twinkle})`;
        ctx.fill();
        star.angle += star.speed;
    });

    ctx.shadowBlur = 0;
    time += 0.05;
    requestAnimationFrame(animateMilkyWay);
}
animateMilkyWay();

// Game State
let totalFuel = 0;
let totalTaps = 0; // Will be fetched from the contract
let invitesSent = 0;
let tapLimit = 100; // Local tap limit for testing

// DOM Elements
const tapButton = document.getElementById('tap-button');
const fuelDisplay = document.getElementById('fuel-display');
const tapsDisplay = document.getElementById('taps-display');
const invitesDisplay = document.getElementById('invites-display');
const tapDisabledMessage = document.getElementById('tap-disabled-message');
const connectWalletButton = document.getElementById('connect-wallet');
const disconnectWalletButton = document.getElementById('disconnect-wallet');
const walletAddressDisplay = document.getElementById('wallet-address');
const donateButton = document.getElementById('donate-button');
const donateModal = document.getElementById('donate-modal');
const closeDonate = document.getElementById('close-donate');
const backToGameButton = document.getElementById('back-to-game');
const donateAddress = document.getElementById('donate-address');
const copyAddressButton = document.getElementById('copy-address');
const tapSound = document.getElementById('tap-sound');
const clickSound = document.getElementById('click-sound');

// Ethers.js Setup
let provider;
let signer;
let account;

// Wallet Connection with Network Check
async function connectWallet() {
    console.log('connectWallet function called');

    if (typeof ethers === 'undefined') {
        console.error('Ethers.js is not loaded.');
        alert('Ethers.js failed to load. Please check if ethers-5.7.2.umd.min.js is in the correct directory.');
        return;
    }
    console.log('Ethers.js is loaded');

    if (!window.ethereum) {
        console.error('MetaMask is not installed or not detected.');
        alert('Please install MetaMask to connect your wallet!');
        return;
    }
    console.log('MetaMask detected:', window.ethereum);

    try {
        console.log('Requesting accounts from MetaMask...');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Accounts received:', accounts);

        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts returned from MetaMask.');
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        account = await signer.getAddress();
        console.log('Account connected:', account);

        // Check the current network
        const network = await provider.getNetwork();
        const expectedChainId = 10143; // Monad Testnet chain ID
        console.log('Current network chain ID:', network.chainId);

        if (network.chainId !== expectedChainId) {
            console.log('User is on the wrong network. Prompting to switch to Monad Testnet (chain ID 10143)...');
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x27CB' }], // 10143 in hex
                });
                console.log('Successfully switched to Monad Testnet');
            } catch (switchError) {
                console.error('Network switch failed:', switchError);
                alert('Please manually switch to the Monad Testnet (Chain ID: 10143) in MetaMask to continue.');
                tapButton.disabled = true;
                tapDisabledMessage.textContent = 'Please switch to the Monad Testnet (Chain ID: 10143)!';
                tapDisabledMessage.style.display = 'block';
                return;
            }
        }

        // Update UI after successful connection
        walletAddressDisplay.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletButton.style.display = 'none';
        disconnectWalletButton.style.display = 'inline-block';
        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';

        // Fetch initial stats after connecting
        await updateStats();
    } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Failed to connect wallet: ' + (error.message || 'Unknown error'));
        tapButton.disabled = true;
        tapDisabledMessage.textContent = 'Please connect to the Monad Testnet (Chain ID: 10143)!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Disconnect Wallet
async function disconnectWallet() {
    provider = null;
    signer = null;
    account = null;
    walletAddressDisplay.textContent = '';
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';
    tapButton.disabled = true;
    tapDisabledMessage.textContent = 'Connect Wallet to Tap!';
    tapDisabledMessage.style.display = 'block';
    clickSound.play();
}

// Tap with Transaction
const CONTRACT_ADDRESS = '0x1a55edebe68acb4509e1bf77deea5ce0dfdbbc58'; // Your deployed contract address
const ABI = [
    {"inputs":[],"name":"tap","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalFuel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalTaps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

async function handleTap() {
    if (!provider || !signer) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        return;
    }

    // Check if there are taps remaining within the local limit
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const currentTaps = Number(await contract.totalTaps(account));
    if (currentTaps >= tapLimit) {
        tapDisabledMessage.textContent = 'No taps remaining!';
        tapDisabledMessage.style.display = 'block';
        tapButton.disabled = true;
        return;
    }

    try {
        const tx = await contract.tap();
        await tx.wait();
        tapSound.play();
        spawnParticles();
        // Fetch updated stats from the contract
        totalFuel = (await contract.totalFuel(account)).toString();
        totalTaps = (await contract.totalTaps(account)).toString();
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        updateStats();
    } catch (error) {
        console.error('Tap failed:', error);
        tapDisabledMessage.textContent = 'Tap failed—check network or gas!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Stats Update
async function updateStats() {
    if (provider && signer && account) {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            totalFuel = (await contract.totalFuel(account)).toString();
            totalTaps = (await contract.totalTaps(account)).toString();
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }
    fuelDisplay.textContent = `Total Fuel: ${totalFuel}`;
    tapsDisplay.textContent = `Total Taps: ${totalTaps}`;
    invitesDisplay.textContent = `Invites Sent: ${invitesSent}`;
    localStorage.setItem('gameState', JSON.stringify({ totalFuel, totalTaps, invitesSent }));
}

// Particle Effects
const particleContainer = document.getElementById('particle-container');
function spawnParticles() {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${tapButton.offsetLeft + tapButton.offsetWidth / 2}px`;
        particle.style.top = `${tapButton.offsetTop + tapButton.offsetHeight / 2}px`;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 50 + 50;
        particle.style.setProperty('--x', `${Math.cos(angle) * speed}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * speed}px`);
        particleContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 500);
    }
}

// Smooth Update
function smoothUpdate(element, newValue) {
    element.classList.add('updated');
    element.textContent = newValue;
}

// Donate Button Logic
donateButton.addEventListener('click', () => {
    donateModal.style.display = 'flex';
    clickSound.play();
});

closeDonate.addEventListener('click', () => {
    donateModal.style.display = 'none';
    clickSound.play();
});

backToGameButton.addEventListener('click', () => {
    donateModal.style.display = 'none';
    clickSound.play();
});

copyAddressButton.addEventListener('click', () => {
    const address = donateAddress.textContent;
    navigator.clipboard.writeText(address).then(() => {
        copyAddressButton.textContent = 'Copied!';
        clickSound.play();
        setTimeout(() => copyAddressButton.textContent = 'Copy Address', 2000);
    });
});

// Event Listeners
tapButton.addEventListener('click', handleTap);
connectWalletButton.addEventListener('click', () => {
    console.log('Connect Wallet button clicked');
    connectWallet();
});
disconnectWalletButton.addEventListener('click', disconnectWallet);

// Load Game State
const savedState = JSON.parse(localStorage.getItem('gameState')) || {};
totalFuel = savedState.totalFuel || 0;
totalTaps = savedState.totalTaps || 0; // Will be overridden by contract value
invitesSent = savedState.invitesSent || 0;
fuelDisplay.textContent = `Total Fuel: ${totalFuel}`;
tapsDisplay.textContent = `Total Taps: ${totalTaps}`;
invitesDisplay.textContent = `Invites Sent: ${invitesSent}`;
