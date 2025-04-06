// Mock process for browser compatibility (fix for WalletConnect)
window.process = { env: { NODE_ENV: 'browser' } }; // Enhanced mock

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
let totalTaps = 0;
let invitesSent = 0;
let authorizedTaps = 0;
let signature = null;
let nonce = 0;
let monBalance = 0;

// DOM Elements
const tapButton = document.getElementById('tap-button');
const fuelDisplay = document.getElementById('fuel-display');
const tapsDisplay = document.getElementById('taps-display');
const invitesDisplay = document.getElementById('invites-display');
const authorizedTapsDisplay = document.getElementById('authorized-taps');
const gasBalanceDisplay = document.getElementById('gas-balance');
const tapDisabledMessage = document.getElementById('tap-disabled-message');
const connectWalletButton = document.getElementById('connect-wallet');
const disconnectWalletButton = document.getElementById('disconnect-wallet');
const walletAddressDisplay = document.getElementById('wallet-address');
const authorizeMoreTapsButton = document.getElementById('authorize-more-taps');
const donateButton = document.getElementById('donate-button');
const donateModal = document.getElementById('donate-modal');
const closeDonate = document.getElementById('close-donate');
const backToGameButton = document.getElementById('back-to-game');
const donateAddress = document.getElementById('donate-address');
const copyAddressButton = document.getElementById('copy-address');

// Ethers.js Setup and Error Check
if (typeof ethers === 'undefined') {
    console.error("ethers.js is not loaded. Check the script tag in index.html or ensure ethers.umd.min.js (v6.13.5) is present at the root.");
    walletAddressDisplay.textContent = "Error: ethers.js not loaded.";
    throw new Error("ethers.js not found");
}

let provider;
let signer;
let account;
let contract;
let walletConnectProvider;

// WalletConnect Setup
const projectId = '7044f2da2e31ce2e3765424a20c0c63b';
const EXPECTED_CHAIN_ID = 10143; // Use Number for simplicity

// Connect Wallet
async function connectWallet() {
    try {
        console.log('Attempting to connect wallet...');
        if (window.ethereum) {
            provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const accounts = await provider.listAccounts();
            account = accounts[0];
            console.log('Raw Account:', account, 'Type:', typeof account); // Debug raw account
            if (account && typeof account === 'object' && account.address) {
                account = account.address; // Extract address if object
            } else if (typeof account !== 'string') {
                throw new Error('Invalid account format received from provider.');
            }
            console.log('Processed Account:', account, 'Type:', typeof account); // Debug processed account
            const network = await provider.getNetwork();
            console.log('Current Network:', network, 'Chain ID Type:', typeof network.chainId, 'Chain ID Value:', network.chainId);
            if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
                throw new Error('Please switch to Monad Testnet (Chain ID 10143) in MetaMask manually.');
            }
        } else {
            walletConnectProvider = await window.EthereumProvider.init({
                projectId: projectId,
                chains: [10143], // Enforce 10143
                optionalChains: [],
                showQrModal: true,
                metadata: {
                    name: 'Rocket Fuel Miner',
                    description: 'A fun game to mine rocket fuel on the Monad Testnet',
                    url: window.location.origin,
                    icons: ['https://avatars.githubusercontent.com/u/37784886']
                }
            });
            await walletConnectProvider.connect();
            provider = new ethers.BrowserProvider(walletConnectProvider);
            const accounts = await provider.listAccounts();
            account = accounts[0];
            console.log('Raw Account:', account, 'Type:', typeof account); // Debug raw account
            if (account && typeof account === 'object' && account.address) {
                account = account.address; // Extract address if object
            } else if (typeof account !== 'string') {
                throw new Error('Invalid account format received from provider.');
            }
            console.log('Processed Account:', account, 'Type:', typeof account); // Debug processed account
            const network = await provider.getNetwork();
            console.log('WalletConnect Network:', network, 'Chain ID Type:', typeof network.chainId, 'Chain ID Value:', network.chainId);
            if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
                throw new Error('Please connect WalletConnect to Monad Testnet (Chain ID 10143).');
            }
        }

        signer = await provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        walletAddressDisplay.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletButton.style.display = 'none';
        disconnectWalletButton.style.display = 'inline-block';
        await updateMonBalance();
        await authorizeTaps();
        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';
        updateStats();
    } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Connection failed: ' + (error.message || 'Unknown error. Ensure you are on Monad Testnet (Chain ID 10143).'));
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        walletAddressDisplay.textContent = 'Error: Wrong network or connection failed.';
    }
}

// Disconnect Wallet
async function disconnectWallet() {
    try {
        if (walletConnectProvider) {
            await walletConnectProvider.disconnect();
            walletConnectProvider = null;
        }
        provider = null;
        signer = null;
        account = null;
        contract = null;
        walletAddressDisplay.textContent = '';
        connectWalletButton.style.display = 'inline-block';
        disconnectWalletButton.style.display = 'none';
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
    } catch (error) {
        console.error('Failed to disconnect wallet:', error);
    }
}

// Update MON Balance
async function updateMonBalance() {
    if (provider && account) {
        const balance = await provider.getBalance(account);
        monBalance = ethers.formatEther(balance);
        smoothUpdate(gasBalanceDisplay, `MON Balance: ${parseFloat(monBalance).toFixed(4)}`);
    }
}

// Tap Handler
const CONTRACT_ADDRESS = '0x65b21160b13C9D4F11F58D66327D7916A3E49e0d';
const ABI = [
    {"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"tapCount","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"tapWithSignature","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"tapCount","type":"uint256"}],"name":"setAuthorizedTaps","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalFuel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalTaps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"authorizedTaps","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"fuel","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"taps","type":"uint256"}],"name":"Tap","type":"event"}
];

async function handleTap() {
    if (!provider || !signer || !contract || !signature) {
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        return;
    }

    if (authorizedTaps <= 0) {
        tapDisabledMessage.textContent = 'No authorized taps remaining! Please authorize more taps.';
        tapDisabledMessage.style.display = 'block';
        tapButton.disabled = true;
        authorizeMoreTapsButton.style.display = 'inline-block';
        return;
    }

    const gasEstimate = await contract.estimateGas.tapWithSignature(account, 10000, nonce, 0, '0x', '0x');
    const gasPrice = await provider.getGasPrice();
    const gasCost = ethers.formatEther(gasEstimate * gasPrice);
    if (parseFloat(monBalance) < parseFloat(gasCost)) {
        tapDisabledMessage.textContent = `Insufficient MON for gas fees (${gasCost} MON required). Please add funds to your wallet.`;
        tapDisabledMessage.style.display = 'block';
        tapButton.disabled = true;
        return;
    }

    try {
        totalFuel++;
        totalTaps++;
        authorizedTaps--;
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        spawnParticles();

        const sig = ethers.Signature.from(signature);
        const tx = await contract.tapWithSignature(
            account,
            10000,
            nonce,
            sig.v,
            sig.r,
            sig.s
        );
        await tx.wait();
        nonce++;
        await updateMonBalance();
    } catch (error) {
        console.error('Tap failed:', error);
        totalFuel--;
        totalTaps--;
        authorizedTaps++;
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        tapDisabledMessage.textContent = 'Tap failed—check network or gas!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Authorize Taps
async function authorizeTaps() {
    const tapCount = 10000;
    const domain = {
        name: "RocketFuelMiner",
        version: "1",
        chainId: 10143,
        verifyingContract: CONTRACT_ADDRESS
    };
    const types = {
        TapAuthorization: [
            { name: "user", type: "address" },
            { name: "tapCount", type: "uint256" },
            { name: "nonce", type: "uint256" }
        ]
    };
    const value = {
        user: account,
        tapCount: tapCount,
        nonce: nonce
    };

    try {
        signature = await signer.signTypedData(domain, types, value);
        const tx = await contract.setAuthorizedTaps(account, tapCount);
        await tx.wait();
        authorizedTaps = tapCount;
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';
        authorizeMoreTapsButton.style.display = 'none';
    } catch (error) {
        console.error('Authorization failed:', error);
        tapButton.disabled = true;
        tapDisabledMessage.textContent = 'Authorization failed—please try again!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Stats Update
async function updateStats() {
    if (provider && signer && account && contract) {
        try {
            totalFuel = (await contract.totalFuel(account)).toString();
            totalTaps = (await contract.totalTaps(account)).toString();
            authorizedTaps = Number(await contract.authorizedTaps(account));
            nonce = Number(await contract.nonces(account));
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    }
    smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
    smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
    smoothUpdate(invitesDisplay, `Invites Sent: ${invitesSent}`);
    smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
    localStorage.setItem('gameState', JSON.stringify({ totalFuel, totalTaps, invitesSent }));
}

// Particle Effects
const particleContainer = document.getElementById('particle-container');
function spawnParticles() {
    for (let i = 0; i < 10; i++) {
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

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    connectWalletButton.style.display = 'inline-block';
    connectWalletButton.addEventListener('click', connectWallet);
    disconnectWalletButton.addEventListener('click', disconnectWallet);
    authorizeMoreTapsButton.addEventListener('click', authorizeTaps);
    donateButton.addEventListener('click', () => {
        donateModal.style.display = 'flex';
    });
    closeDonate.addEventListener('click', () => {
        donateModal.style.display = 'none';
    });
    backToGameButton.addEventListener('click', () => {
        donateModal.style.display = 'none';
    });
    copyAddressButton.addEventListener('click', () => {
        const address = donateAddress.textContent;
        navigator.clipboard.writeText(address).then(() => {
            copyAddressButton.textContent = 'Copied!';
            setTimeout(() => copyAddressButton.textContent = 'Copy Address', 2000);
        });
    });
    tapButton.addEventListener('click', handleTap);

    const savedState = JSON.parse(localStorage.getItem('gameState')) || {};
    totalFuel = savedState.totalFuel || 0;
    totalTaps = savedState.totalTaps || 0;
    invitesSent = savedState.invitesSent || 0;
    smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
    smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
    smoothUpdate(invitesDisplay, `Invites Sent: ${invitesSent}`);
});
