// Contract Addresses (Replace after deployment)
const paymentContracts = {
 mainnet: "MAINNET_PAYMENT_CONTRACT_ADDRESS",
 arbitrum: "ARBITRUM_PAYMENT_CONTRACT_ADDRESS",
 optimism: "OPTIMISM_PAYMENT_CONTRACT_ADDRESS"
};
const gameContractAddress = "MONAD_TESTNET_CONTRACT_ADDRESS";
const trustedSignerAddress = "TRUSTED_SIGNER_ADDRESS"; // Replace with your trusted signer address

// ABIs
const paymentContractABI = [
 {
 "inputs": [],
 "stateMutability": "nonpayable",
 "type": "constructor"
 },
 {
 "anonymous": false,
 "inputs": [
 {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
 {"indexed": false, "internalType": "uint256", "name": "credits", "type": "uint256"},
 {"indexed": false, "internalType": "uint256", "name": "ethSpent", "type": "uint256"},
 {"indexed": false, "internalType": "bytes32", "name": "paymentId", "type": "bytes32"}
 ],
 "name": "FuelCreditsBought",
 "type": "event"
 },
 {
 "anonymous": false,
 "inputs": [
 {"indexed": true, "internalType": "address", "name": "player", "type": "address"},
 {"indexed": false, "internalType": "string", "name": "powerUp", "type": "string"},
 {"indexed": false, "internalType": "uint256", "name": "ethSpent", "type": "uint256"},
 {"indexed": false, "internalType": "bytes32", "name": "paymentId", "type": "bytes32"}
 ],
 "name": "PowerUpActivated",
 "type": "event"
 },
 {
 "inputs": [],
 "name": "AUTO_DRILL_PRICE",
 "outputs": [
 {"internalType": "uint256", "name": "", "type": "uint256"}
 ],
 "stateMutability": "view",
 "type": "function"
 },
 {
 "inputs": [],
 "name": "CREDITS_10000",
 "outputs": [
 {"internalType": "uint256", "name": "", "type": "uint256"}
 ],
 "stateMutability": "view",
 "type": "function"
 },
 {
 "inputs": [],
 "name": "CREDITS_125000",
 "outputs": [
 {"internalType": "uint256", "name": "", "type": "uint256"}
 ],
 "stateMutability": "view",
 "type": "function"
 },
 {
 "inputs": [],
 "name": "CREDITS_50000",
 "outputs": [
 {"internalType": "uint256", "name": "", "type": "uint256"}
 ],
 "stateMutability": "view",
 "type": "function"
 },
 {
 "inputs": [],
 "name": "TURBO 
