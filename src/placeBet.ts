// src/interactWithContract.ts
import { ethers } from 'ethers';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { CONTRACT_ADDRESS, PRIVATE_KEY, PROVIDER_URL } = process.env;

async function main() {
    if (!CONTRACT_ADDRESS || !PRIVATE_KEY || !PROVIDER_URL) {
        console.error("Please set the CONTRACT_ADDRESS, PRIVATE_KEY, and PROVIDER_URL in your .env file");
        return;
    }

    const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const betHigh = true; 
    
    const CONTRACT_ABI = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "betHigh",
              "type": "bool"
            }
          ],
          "name": "BetPlaced",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "result",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "bool",
              "name": "won",
              "type": "bool"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "payout",
              "type": "uint256"
            }
          ],
          "name": "GameResult",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "newPayoutRate",
              "type": "uint256"
            }
          ],
          "name": "PayoutRateChanged",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "RewardAccumulated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "RewardWithdrawn",
          "type": "event"
        },
        {
          "inputs": [],
          "name": "checkRewardBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "minimumBet",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "payoutRate",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "bool",
              "name": "betHigh",
              "type": "bool"
            }
          ],
          "name": "placeBet",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "playerRewards",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "newMinimumBet",
              "type": "uint256"
            }
          ],
          "name": "setMinimumBet",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "newPayoutRate",
              "type": "uint256"
            }
          ],
          "name": "setPayoutRate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdrawFunds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "withdrawReward",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "stateMutability": "payable",
          "type": "receive"
        }
      ];

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

    try {
        const transactionResponse = await contract.placeBet(betHigh, {
            value: ethers.parseEther("0.001"),
            gasLimit: 10000000,
        });
        const receipt = await transactionResponse.wait();
        console.log(`Transaction was confirmed in block ${receipt.blockNumber}`);
    } catch (error) {
        console.error("Failed to interact with the contract:", error);
    }
}

main().catch(console.error);
