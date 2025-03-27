// Canvas Animation (Milky Way Background)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const maxRadius = Math.min(canvas.width, canvas.height) * 0.6;

const stars = [];
for (let i = 0; i < 200; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 2) * AkismetRadius;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    const size = Math.random() * 3 + 1;
    const alpha = Math.random() * 0.5 + 0.5;
    stars.push({ x, y, size, alpha, angle, radius, speed: Math.random() * 0.005 + 0.002 });
}

let time = 0;
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.angle += star.speed;
        star.x = centerX + Math.cos(star.angle) * star.radius;
        star.y = centerY + Math.sin(star.angle) * star.radius;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

// Game State
let totalFuel = 0;
let totalTaps = 0;

// DOM Elements
const connectWalletButton = document.getElementById('connect-wallet');
const disconnectWalletButton = document.getElementById('disconnect-wallet');
const walletAddressDisplay = document.getElementById('wallet-address');
const tapButton = document.getElementById('tap-button');
const tapDisabledMessage = document.getElementById('tap-disabled-message');
const fuelDisplay = document.getElementById('fuel-display');
const tapsDisplay = document.getElementById('taps-display');
const particleContainer = document.getElementById('particle-container');

// Ethereum Setup
let provider;
let signer;
let account;

const EXPECTED_CHAIN_ID = '0x279f'; // Chain ID 10143 (Monad Testnet)
const NETWORK_DETAILS = {
    chainId: EXPECTED_CHAIN_ID,
    chainName: 'Monad Testnet',
    rpcUrls: ['https://testnet-rpc.monad.xyz/'],
    nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
    blockExplorerUrls: ['https://testnet.monadexplorer.com/']
};

// Wallet Connection
async function connectWallet() {
    if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        signer = provider.getSigner();
        account = await signer.getAddress();
        walletAddressDisplay.textContent = `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletButton.style.display = 'none';
        disconnectWalletButton.style.display = 'inline-block';

        const chainId = await provider.getNetwork().then(net => net.chainId.toString(16));
        console.log(`Current Chain ID: ${chainId}, Expected: ${EXPECTED_CHAIN_ID}`);

        if ('0x' + chainId !== EXPECTED_CHAIN_ID) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: EXPECTED_CHAIN_ID }],
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [NETWORK_DETAILS],
                    });
                } else if (switchError.code !== 4001) { // Ignore user rejection here
                    throw switchError;
                }
            }
            // Verify chain after switch/add
            const newChainId = await provider.getNetwork().then(net => net.chainId.toString(16));
            if ('0x' + newChainId !== EXPECTED_CHAIN_ID) {
                throw new Error('Failed to switch to Monad Testnet');
            }
        }

        tapButton.disabled = false;
        tapDisabledMessage.style.display = 'none';
    } catch (error) {
        console.error('Wallet connection failed:', error);
        let message = 'Failed to connect wallet';
        if (error.code === 4001) {
            message = 'You rejected the connection request.';
        } else if (error.code === 4902) {
            message = 'Failed to add Monad Testnet.';
        } else {
            message += `: ${error.message}`;
        }
        alert(message);
        tapButton.disabled = true;
        tapDisabledMessage.textContent = 'Please connect to Monad Testnet to play!';
        tapDisabledMessage.style.display = 'block';
    }
}

// Disconnect Wallet
function disconnectWallet() {
    provider = null;
    signer = null;
    account = null;
    walletAddressDisplay.textContent = '';
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';
    tapButton.disabled = true;
    tapDisabledMessage.textContent = 'Connect Wallet to Tap!';
    tapDisabledMessage.style.display = 'block';
}

// Tap Action (Placeholder for Contract Interaction)
const CONTRACT_ADDRESS = '0xYourContractAddressHere'; // Replace with actual address
const ABI = [
    {"inputs":[],"name":"tap","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"totalFuel","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}
];

async function handleTap() {
    if (!signer) {
        alert('Please connect your wallet first!');
        return;
    }

    try {
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        const tx = await contract.tap();
        await tx.wait();
        totalTaps++;
        totalFuel = (await contract.totalFuel(account)).toNumber();
        fuelDisplay.textContent = totalFuel;
        tapsDisplay.textContent = totalTaps;
        spawnParticles();
    } catch (error) {
        console.error('Tap failed:', error);
        alert('Tap failed: ' + (error.reason || error.message));
    }
}

// Particle Effects
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

// Event Listeners
connectWalletButton.addEventListener('click', connectWallet);
disconnectWalletButton.addEventListener('click', disconnectWallet);
tapButton.addEventListener('click', handleTap);

// Initial State
tapButton.disabled = true;
tapDisabledMessage.style.display = 'block';
