
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from "ethers";

const contractAddress = "0xf7399984752fc91800CDde89A019f01b5C9F4801";

const contractABI =[
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_candidateNames",
                "type": "string[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "CandidateAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "CandidateDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newName",
                "type": "string"
            }
        ],
        "name": "CandidateEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnerChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "UserAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "UserDeleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newName",
                "type": "string"
            }
        ],
        "name": "UserEdited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "candidateIndex",
                "type": "uint256"
            }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "changeOwner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "deleteCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "deleteUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "newName",
                "type": "string"
            }
        ],
        "name": "editCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "newName",
                "type": "string"
            }
        ],
        "name": "editUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCandidates",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Voting.Candidate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getWinner",
        "outputs": [
            {
                "internalType": "string",
                "name": "winnerName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "winnerVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
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
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
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
        "name": "isUser",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "candidateIndex",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const ; 

declare global {
  interface Window {
    ethereum?: any;
  }
}

export async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return signer;
}

export async function getContract(signer: ethers.JsonRpcSigner) {
  return new ethers.Contract(contractAddress, contractABI, signer);
}

export async function getCandidates() {
  try {
    const signer = await connectWallet();
    if (!signer) return [];
    
    const contract = await getContract(signer);
    
    const candidates = await contract.getCandidates();
    return candidates.map((candidate: { name: string; voteCount: bigint }, index: number) => ({
      name: candidate.name,
      voteCount: Number(candidate.voteCount),
      index,
    }));
  } catch (error:any) {
    console.error("Error fetching candidates:", error.message);
    return [];
  }
}

export async function vote(candidateIndex: number) {
  try {
    const signer = await connectWallet();
    if (!signer) return;
    
    const contract = await getContract(signer);
    const tx = await contract.vote(candidateIndex);
    await tx.wait();
    console.log("Vote submitted for candidate index:", candidateIndex);
  } catch (error) {
    console.error("Error voting:", error);
  }
}

export async function getWinner() {
  try {
    const signer = await connectWallet();
    if (!signer) return null;
    
    const contract = await getContract(signer);
    
    const [winnerName, winnerVotes] = await contract.getWinner();
    return { name: winnerName, votes: Number(winnerVotes) };
  } catch (error) {
    console.error("Error fetching winner:", error);
    return null;
  }
}

export async function addUser(userAddress: string, name: string) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.addUser(userAddress, name);
    await tx.wait();
    console.log("User added:", userAddress);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

export async function deleteUser(userAddress: string) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.deleteUser(userAddress);
    await tx.wait();
    console.log("User deleted:", userAddress);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
export async function addCandidate(name: string) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.addCandidate(name);
    await tx.wait();
    console.log("Candidate added:", name);
  } catch (error) {
    console.error("Error adding candidate:", error);
  }
}

export async function editCandidate(index: number, newName: string) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.editCandidate(index, newName);
    await tx.wait();
    console.log("Candidate edited:", newName);
  } catch (error) {
    console.error("Error editing candidate:", error);
  }
}

export async function deleteCandidate(index: number) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.deleteCandidate(index);
    await tx.wait();
    console.log("Candidate deleted at index:", index);
  } catch (error) {
    console.error("Error deleting candidate:", error);
  }
}

export async function changeOwner(newOwner: string) {
  try {
    const signer = await connectWallet();
    if (!signer) return;

    const contract = await getContract(signer);
    const tx = await contract.changeOwner(newOwner);
    await tx.wait();
    console.log("Ownership transferred to:", newOwner);
  } catch (error) {
    console.error("Error changing owner:", error);
  }
}
