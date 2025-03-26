// Supercharged Milky Way Background with Lower Core Brightness
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
    const color = Math.random() < 0.2 ? '255, 200, 150' : Math.random() < 0.4 ? '255, 255, 200' : Math.random() < 0.7 ? '255, 255, 255' : '180, 200, 255';
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
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius * 1.5);
    gradient.addColorStop(0, 'rgba(180, 140, 255, 0.15)'); // Lowered brightness
    gradient.addColorStop(0.3, 'rgba(120, 80, 200, 0.1)'); // Softer fade
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
let totalTaps = 0;
let fuelPerTap = 1;
let invitesSent = 0;

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
const donateAddress = document.getElementById('donate-address');
const copyAddressButton = document.getElementById('copy-address');
const tapSound = document.getElementById('tap-sound');
const clickSound = document.getElementById('click-sound');

// Ethers.js Setup
let provider, signer;

// Monad Testnet Config
const MONAD_TESTNET_CHAIN_ID = '0x[YourChainID]'; // From docs.monad.xyz
const MONAD_TESTNET_RPC = 'https://testnet.monad.xyz'; // Placeholder

// Wallet Connection
async function connectWallet() {
    if (!window.ethereum) return alert('Install MetaMask!');
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    walletAddressDisplay.textContent = `Connected: ${address.slice(0, 5)}...`;
    connectWalletButton.style.display = 'none';
    disconnectWalletButton.style.display = 'inline-block';
    await switchToMonadTestnet();
    tapButton.disabled = false;
    tapDisabledMessage.style.display = 'none';
}

async function switchToMonadTestnet() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: MONAD_TESTNET_CHAIN_ID }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: MONAD_TESTNET_CHAIN_ID,
                    chainName: 'Monad Testnet',
                    rpcUrls: [MONAD_TESTNET_RPC],
                    nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
                    blockExplorerUrls: ['https://explorer.monad.xyz'] // Check docs
                }],
            });
        }
    }
}

// Tap with Monad Transaction
const CONTRACT_ADDRESS = '0x[YourDeployedContract]';
const ABI = [
    "function tap() external",
    "function totalFuel(address) view returns (uint256)"
];
async function handleTap() {
    if (!signer) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        return;
    }
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    try {
        const tx = await contract.tap();
        await tx.wait();
        totalTaps++;
        tapSound.play();
        spawnParticles();
        fetchFuelFromContract(contract);
        smoothUpdate(tapsDisplay, totalTaps);
        updateStats();
    } catch (error) {
        console.error('Tap failed:', error);
        tapDisabledMessage.textContent = 'Tap failed—check gas!';
        tapDisabledMessage.style.display = 'block';
    }
}

async function fetchFuelFromContract(contract) {
    const address = await signer.getAddress();
    totalFuel = await contract.totalFuel(address);
    smoothUpdate(fuelDisplay, totalFuel);
}

// Stats Update
function updateStats() {
    invitesDisplay.textContent = invitesSent;
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
    setTimeout(() => element.classList.remove('updated'), 300);
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
// Address now in HTML, no need to set here
copyAddressButton.addEventListener('click', () => {
    const address = donateAddress.textContent;
    navigator.clipboard.writeText(address).then(() => {
        copyAddressButton.textContent = 'Copied!';
        clickSound.play();
        setTimeout(() => copyAddressButton.textContent = 'Copy Address', 2000);
    }).catch(err => console.error('Copy failed:', err));
});

// Event Listeners
tapButton.addEventListener('click', handleTap);
connectWalletButton.addEventListener('click', connectWallet);
disconnectWalletButton.addEventListener('click', () => {
    provider = null;
    signer = null;
    walletAddressDisplay.textContent = '';
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';
    tapButton.disabled = true;
    tapDisabledMessage.style.display = 'block';
    clickSound.play();
});

// Load Game State
const savedState = JSON.parse(localStorage.getItem('gameState')) || {};
totalFuel = savedState.totalFuel || 0;
totalTaps = savedState.totalTaps || 0;
invitesSent = savedState.invitesSent || 0;
fuelDisplay.textContent = totalFuel;
tapsDisplay.textContent = totalTaps;
invitesDisplay.textContent = invitesSent;
