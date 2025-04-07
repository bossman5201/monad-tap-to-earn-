// Mock process for browser compatibility (fix for WalletConnect)
window.process = { env: { NODE_ENV: 'browser' } };

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

// Ethers.js Setup
if (typeof ethers === 'undefined') {
    console.error("ethers.js is not loaded. Check index.html script tags.");
    walletAddressDisplay.textContent = "Error: ethers.js not loaded.";
    throw new Error("ethers.js not found");
}

let provider;
let signer;
let account;
let contract;
let walletConnectProvider;

// Contract Details
const projectId = '7044f2da2e31ce2e3765424a20c0c63b';
const EXPECTED_CHAIN_ID = 10143;
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

// Initialize Web3
async function initializeWeb3() {
    try {
        if (!provider) {
            if (window.ethereum) {
                provider = new ethers.BrowserProvider(window.ethereum);
            } else {
                walletConnectProvider = await window.EthereumProvider.init({
                    projectId,
                    chains: [EXPECTED_CHAIN_ID],
                    showQrModal: true,
                    metadata: { name: 'Rocket Fuel Miner', description: 'Mine rocket fuel', url: window.location.origin, icons: ['https://avatars.githubusercontent.com/u/37784886'] }
                });
                await walletConnectProvider.connect();
                provider = new ethers.BrowserProvider(walletConnectProvider);
            }
            const network = await provider.getNetwork();
            if (network.chainId !== EXPECTED_CHAIN_ID) throw new Error(`Wrong network. Expected ${EXPECTED_CHAIN_ID}, got ${network.chainId}`);
            signer = await provider.getSigner();
            contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            console.log('Web3 initialized:', { provider, signer, contract });
        }
        return { provider, signer, contract };
    } catch (error) {
        console.error('Web3 initialization failed:', error);
        throw error;
    }
}

// Connect Wallet
async function connectWallet() {
    try {
        console.log('Connecting wallet...');
        const { provider: p, signer: s, contract: c } = await initializeWeb3();
        provider = p;
        signer = s;
        contract = c;

        await provider.send("eth_requestAccounts", []);
        const accounts = await provider.listAccounts();
        account = accounts[0].address || accounts[0];
        console.log('Account connected:', account);

        walletAddressDisplay.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletButton.style.display = 'none';
        disconnectWalletButton.style.display = 'inline-block';
        await updateMonBalance();
        await updateStats();
        await authorizeTaps();
        if (contract) {
            tapButton.disabled = false;
            tapDisabledMessage.style.display = 'none';
            console.log('Wallet connected, contract ready:', contract);
            tapButton.addEventListener('click', handleTap); // Attach listener here
        } else {
            throw new Error('Contract not initialized');
        }
    } catch (error) {
        console.error('Wallet connection error:', error);
        alert('Connection failed: ' + error.message);
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        walletAddressDisplay.textContent = 'Error: Connection failed.';
    }
}

// Disconnect Wallet
async function disconnectWallet() {
    try {
        if (walletConnectProvider) await walletConnectProvider.disconnect();
        provider = null;
        signer = null;
        account = null;
        contract = null;
        signature = null;
        walletAddressDisplay.textContent = '';
        connectWalletButton.style.display = 'inline-block';
        disconnectWalletButton.style.display = 'none';
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
    } catch (error) {
        console.error('Disconnect error:', error);
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

// Authorize Taps
async function authorizeTaps() {
    if (!contract) {
        console.error('Contract not available for authorization');
        return;
    }
    try {
        const tapCount = 10000;
        const domain = { name: 'RocketFuelMiner', version: '1', chainId: EXPECTED_CHAIN_ID, verifyingContract: CONTRACT_ADDRESS };
        const types = { TapAuthorization: [{ name: 'user', type: 'address' }, { name: 'tapCount', type: 'uint256' }, { name: 'nonce', type: 'uint256' }] };
        const value = { user: account, tapCount, nonce };
        signature = await signer.signTypedData(domain, types, value);
        console.log('Authorization signature generated:', signature);

        const tx = await contract.setAuthorizedTaps(account, tapCount);
        console.log('Authorization tx sent:', tx.hash);
        await tx.wait();
        console.log('Authorization tx confirmed:', tx.hash);
        authorizedTaps = tapCount;
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        authorizeMoreTapsButton.style.display = 'none';
        nonce++;
        await updateStats();
    } catch (error) {
        console.error('Authorization failed:', error);
        tapDisabledMessage.textContent = 'Authorization failed—try again!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Tap Handler
async function handleTap() {
    if (!contract || authorizedTaps <= 0) {
        console.log('Tap disabled:', { contract, authorizedTaps });
        tapButton.disabled = true;
        tapDisabledMessage.style.display = 'block';
        if (authorizedTaps <= 0) tapDisabledMessage.textContent = 'No taps remaining—authorize more!';
        return;
    }
    try {
        console.log('Initiating tap:', { account, nonce, authorizedTaps });
        // Generate new signature for each tap
        const domain = { name: 'RocketFuelMiner', version: '1', chainId: EXPECTED_CHAIN_ID, verifyingContract: CONTRACT_ADDRESS };
        const types = { TapAuthorization: [{ name: 'user', type: 'address' }, { name: 'tapCount', type: 'uint256' }, { name: 'nonce', type: 'uint256' }] };
        const value = { user: account, tapCount: 1, nonce };
        const newSignature = await signer.signTypedData(domain, types, value);
        const sig = ethers.Signature.from(newSignature);

        const gasEstimate = await contract.estimateGas.tapWithSignature(account, 1, nonce, sig.v, sig.r, sig.s).catch(err => {
            console.error('Gas estimation failed:', err);
            return null;
        });
        const gasPrice = await provider.getGasPrice();
        const gasCost = gasEstimate ? ethers.formatEther(gasEstimate * gasPrice) : 'N/A';
        console.log('Gas details:', { gasEstimate, gasPrice, gasCost });

        if (gasEstimate && parseFloat(monBalance) < parseFloat(gasCost)) {
            tapDisabledMessage.textContent = `Insufficient MON (${gasCost} required)`;
            tapDisabledMessage.style.display = 'block';
            return;
        }

        totalFuel++;
        totalTaps++;
        authorizedTaps--;
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        spawnParticles();

        const tx = await contract.tapWithSignature(account, 1, nonce, sig.v, sig.r, sig.s, { gasLimit: gasEstimate || 100000 });
        console.log('Tap tx sent:', tx.hash);
        await tx.wait();
        console.log('Tap tx confirmed:', tx.hash);
        nonce++;
        await updateMonBalance();
        await updateStats();
    } catch (error) {
        console.error('Tap failed:', error);
        totalFuel--;
        totalTaps--;
        authorizedTaps++;
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        tapDisabledMessage.textContent = 'Tap failed—check logs!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Stats Update
async function updateStats() {
    if (contract && account) {
        try {
            totalFuel = (await contract.totalFuel(account)).toString();
            totalTaps = (await contract.totalTaps(account)).toString();
            authorizedTaps = Number(await contract.authorizedTaps(account));
            nonce = Number(await contract.nonces(account));
            console.log('Stats updated:', { totalFuel, totalTaps, authorizedTaps, nonce });
        } catch (error) {
            console.error('Stats fetch failed:', error);
        }
    }
    smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
    smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
    smoothUpdate(invitesDisplay, `Invites Sent: ${invitesSent}`);
    smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
    localStorage.setItem('gameState', JSON.stringify({ totalFuel, totalTaps, invitesSent, authorizedTaps, nonce }));
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
    donateButton.addEventListener('click', () => donateModal.style.display = 'flex');
    closeDonate.addEventListener('click', () => donateModal.style.display = 'none');
    backToGameButton.addEventListener('click', () => donateModal.style.display = 'none');
    copyAddressButton.addEventListener('click', () => {
        navigator.clipboard.writeText(donateAddress.textContent).then(() => {
            copyAddressButton.textContent = 'Copied!';
            setTimeout(() => copyAddressButton.textContent = 'Copy Address', 2000);
        });
    });

    const savedState = JSON.parse(localStorage.getItem('gameState') || '{}');
    totalFuel = savedState.totalFuel || 0;
    totalTaps = savedState.totalTaps || 0;
    invitesSent = savedState.invitesSent || 0;
    authorizedTaps = savedState.authorizedTaps || 0;
    nonce = savedState.nonce || 0;
    smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
    smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
    smoothUpdate(invitesDisplay, `Invites Sent: ${invitesSent}`);
    smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
    updateStats().catch(console.error);
});
