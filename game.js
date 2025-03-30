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
const tapSound = document.getElementById('tap-sound');
const clickSound = document.getElementById('click-sound');

// Ethers.js Setup
let provider;
let signer;
let account;
let contract;

// Reown AppKit Setup (Following the Reown Guide)
const projectId = '7044f2da2e31ce2e3765424a20c0c63b'; // Your provided Project ID
const metadata = {
    name: 'Rocket Fuel Miner',
    description: 'A fun game to mine rocket fuel on the Monad Testnet',
    url: window.location.origin,
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const monadTestnet = {
    chainId: 10143,
    name: 'Monad Testnet',
    currency: 'MON',
    explorerUrl: 'https://testnet.monadexplorer.com/',
    rpcUrl: 'https://testnet-rpc.monad.xyz/'
};

let modal;

async function initializeAppKit() {
    console.log('Starting Reown AppKit initialization...');
    try {
        // Check if ReownAppKit is available
        if (!window.ReownAppKit) {
            console.error('ReownAppKit not found in window. Ensure the script is loaded in index.html.');
            alert('Failed to initialize wallet connection: ReownAppKit script not loaded.');
            return;
        }

        // Initialize the modal (as per the Reown guide)
        console.log('Creating Reown AppKit modal...');
        modal = new window.ReownAppKit.AppKit({
            projectId: projectId,
            metadata: metadata,
            chains: [monadTestnet],
            defaultChain: monadTestnet,
            features: {
                analytics: true // Optional - enable analytics as per the guide
            }
        });

        console.log('Reown AppKit initialized successfully. Modal created:', modal);
    } catch (error) {
        console.error('Failed to initialize Reown AppKit:', error.message);
        alert('Failed to initialize wallet connection: ' + error.message);
    }
}

// Wallet Connection (Adapted from the Reown Guide)
async function connectWallet() {
    console.log('Connect wallet button clicked.');
    if (!modal) {
        console.error('Reown AppKit modal not initialized.');
        alert('Wallet connection failed: Reown AppKit modal not initialized.');
        return;
    }

    try {
        console.log('Opening Reown AppKit modal...');
        await modal.open(); // Use modal.open() as per the guide
        console.log('Reown AppKit modal opened successfully.');

        // Fallback for Android: Trigger MetaMask deep link if modal doesn't work
        const isAndroid = /Android/i.test(navigator.userAgent);
        if (isAndroid && !window.ethereum) {
            console.log('Android detected, attempting MetaMask deep link...');
            const deepLink = `metamask://wc?uri=${encodeURIComponent(window.location.href)}`;
            window.location.href = deepLink;
            // Give some time for MetaMask to open
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Wait for wallet connection
        const { address, chainId } = await new Promise((resolve, reject) => {
            modal.on('connect', (data) => {
                console.log('Wallet connected:', data);
                resolve(data);
            });
            modal.on('disconnect', () => {
                console.log('Wallet disconnected');
                disconnectWallet();
            });
            // Timeout after 30 seconds if no connection
            setTimeout(() => reject(new Error('Wallet connection timed out')), 30000);
        });

        if (!address) {
            throw new Error('No address returned from Reown AppKit');
        }

        console.log('Connected address:', address);
        console.log('Connected chainId:', chainId);

        // Ensure the wallet is on the Monad Testnet
        const expectedChainId = 10143;
        if (Number(chainId) !== expectedChainId) {
            try {
                console.log('Switching to Monad Testnet (Chain ID: 10143)...');
                await modal.switchNetwork(monadTestnet);
            } catch (switchError) {
                console.error('Network switch failed:', switchError);
                alert('Please manually switch to the Monad Testnet (Chain ID: 10143) in your wallet.');
                tapButton.disabled = true;
                tapDisabledMessage.textContent = 'Please switch to the Monad Testnet (Chain ID: 10143)!';
                tapDisabledMessage.style.display = 'block';
                return;
            }
        }

        // Set up the provider
        const providerFromModal = modal.getProvider();
        provider = new ethers.BrowserProvider(providerFromModal);
        signer = await provider.getSigner();
        account = address;
        console.log('Connected account:', account);

        walletAddressDisplay.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletButton.style.display = 'none';
        disconnectWalletButton.style.display = 'inline-block';
        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';

        contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        await updateStats();
        nonce = Number(await contract.nonces(account));
        await updateMonBalance();
        await authorizeTaps();
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
    if (modal) {
        await modal.close();
    }
    provider = null;
    signer = null;
    account = null;
    contract = null;
    signature = null;
    authorizedTaps = 0;
    nonce = 0;
    monBalance = 0;
    walletAddressDisplay.textContent = '';
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';
    tapButton.disabled = true;
    tapDisabledMessage.textContent = 'Connect Wallet to Tap!';
    tapDisabledMessage.style.display = 'block';
    smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: 0/10000`);
    smoothUpdate(gasBalanceDisplay, `MON Balance: 0`);
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

        const sig = ethers.splitSignature(signature);
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

// Load Game State
const savedState = JSON.parse(localStorage.getItem('gameState')) || {};
totalFuel = savedState.totalFuel || 0;
totalTaps = savedState.totalTaps || 0;
invitesSent = savedState.invitesSent || 0;
smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
smoothUpdate(invitesDisplay, `Invites Sent: ${invitesSent}`);

// Initialize Reown AppKit
initializeAppKit();
