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

// Reown AppKit Setup
const projectId = '7044f2da2e31ce2e3765424a20c0c63b'; // Your provided Project ID
const metadata = {
    name: 'Rocket Fuel Miner',
    description: 'A fun game to mine rocket fuel on the Monad Testnet',
    url: window.location.origin, // Dynamically set to the current domain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Define the Monad Testnet network
const monadTestnet = {
    chainId: 10143, // Monad Testnet chain ID
    name: 'Monad Testnet',
    currency: 'MON',
    explorerUrl: 'https://testnet.monadexplorer.com/', // Provided Block Explorer URL
    rpcUrl: 'https://testnet-rpc.monad.xyz/' // Provided RPC URL
};

let modal;

async function initializeAppKit() {
    try {
        // Wait for ReownAppKit to be available
        const waitForReownAppKit = () => new Promise((resolve, reject) => {
            const maxAttempts = 10;
            let attempts = 0;
            const interval = setInterval(() => {
                if (window.ReownAppKit) {
                    clearInterval(interval);
                    resolve(window.ReownAppKit);
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    reject(new Error('ReownAppKit failed to load after multiple attempts.'));
                }
                attempts++;
            }, 500); // Check every 500ms
        });

        await waitForReownAppKit();
        modal = await ReownAppKit.createAppKit({
            projectId: projectId,
            metadata: metadata,
            networks: [monadTestnet],
            adapters: [new ReownAppKit.EthersAdapter()],
            features: {
                analytics: false
            }
        });
        console.log('Reown AppKit initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Reown AppKit:', error.message);
        console.error('Error details:', error);
        alert('Failed to initialize wallet connection: ' + error.message);
    }
}

// Wallet Connection with Reown AppKit
async function connectWallet() {
    if (!modal) {
        console.error('Reown AppKit modal not initialized');
        return;
    }

    try {
        console.log('Opening Reown AppKit modal...');
        await modal.open();
        
        // Wait for the user to connect
        const walletProvider = await new Promise((resolve) => {
            modal.subscribeProvider((state) => {
                if (state['eip155']) {
                    resolve(state['eip155']);
                }
            });
        });

        if (!walletProvider) {
            throw new Error('No provider returned from Reown AppKit');
        }

        // Use window.ethereum if available, otherwise use the wallet provider
        provider = new ethers.BrowserProvider(walletProvider || window.ethereum);
        signer = await provider.getSigner();
        account = await signer.getAddress();
        console.log('Connected account:', account);

        const network = await provider.getNetwork();
        const expectedChainId = 10143; // Monad Testnet chain ID
        console.log('Current network chainId:', network.chainId);
        if (Number(network.chainId) !== expectedChainId) {
            try {
                console.log('Switching to Monad Testnet (Chain ID: 10143)...');
                await provider.send('wallet_switchEthereumChain', [{ chainId: '0x27CB' }]); // 10143 in hex
            } catch (switchError) {
                if (switchError.code === 4902) { // Chain not added
                    try {
                        await provider.send('wallet_addEthereumChain', [{
                            chainId: '0x27CB',
                            chainName: 'Monad Testnet',
                            nativeCurrency: {
                                name: 'MON',
                                symbol: 'MON',
                                decimals: 18
                            },
                            rpcUrls: ['https://testnet-rpc.monad.xyz/'],
                            blockExplorerUrls: ['https://testnet.monadexplorer.com/']
                        }]);
                    } catch (addError) {
                        console.error('Failed to add Monad Testnet:', addError);
                        alert('Please manually add the Monad Testnet (Chain ID: 10143) in your wallet.');
                        tapButton.disabled = true;
                        tapDisabledMessage.textContent = 'Please add the Monad Testnet (Chain ID: 10143)!';
                        tapDisabledMessage.style.display = 'block';
                        return;
                    }
                } else {
                    console.error('Network switch failed:', switchError);
                    alert('Please manually switch to the Monad Testnet (Chain ID: 10143) in your wallet.');
                    tapButton.disabled = true;
                    tapDisabledMessage.textContent = 'Please switch to the Monad Testnet (Chain ID: 10143)!';
                    tapDisabledMessage.style.display = 'block';
                    return;
                }
            }
        }

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
        await modal.disconnect();
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
    // clickSound.play();
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
const CONTRACT_ADDRESS = '0x65b21160b13C9D4F11F58D66327D7916A3E49e0d'; // Updated contract address
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

    // Check gas balance
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
        // Optimistically update the UI
        totalFuel++;
        totalTaps++;
        authorizedTaps--;
        smoothUpdate(fuelDisplay, `Total Fuel: ${totalFuel}`);
        smoothUpdate(tapsDisplay, `Total Taps: ${totalTaps}`);
        smoothUpdate(authorizedTapsDisplay, `Authorized Taps Remaining: ${authorizedTaps}/10000`);
        // tapSound.play();
        spawnParticles();

        // Submit the transaction
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
    const tapCount = 10000; // Authorize 10,000 taps
    const domain = {
        name: "RocketFuelMiner",
        version: "1",
        chainId: 10143, // Monad Testnet
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

// Particle Effects (Tap Feedback Animation)
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
    // clickSound.play();
});

closeDonate.addEventListener('click', () => {
    donateModal.style.display = 'none';
    // clickSound.play();
});

backToGameButton.addEventListener('click', () => {
    donateModal.style.display = 'none';
    // clickSound.play();
});

copyAddressButton.addEventListener('click', () => {
    const address = donateAddress.textContent;
    navigator.clipboard.writeText(address).then(() => {
        copyAddressButton.textContent = 'Copied!';
        // clickSound.play();
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
