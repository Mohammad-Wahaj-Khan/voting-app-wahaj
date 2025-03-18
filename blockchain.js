"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectWallet = connectWallet;
exports.getContract = getContract;
exports.getCandidates = getCandidates;
exports.vote = vote;
exports.getWinner = getWinner;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.addCandidate = addCandidate;
exports.editCandidate = editCandidate;
exports.deleteCandidate = deleteCandidate;
exports.changeOwner = changeOwner;
/* eslint-disable @typescript-eslint/no-explicit-any */
var ethers_1 = require("ethers");
var contractAddress = "0xf7399984752fc91800CDde89A019f01b5C9F4801";
var contractABI = [
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
];
export function connectWallet() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, signer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!window.ethereum) {
                        alert("Please install MetaMask!");
                        return [2 /*return*/, null];
                    }
                    provider = new ethers_1.ethers.BrowserProvider(window.ethereum);
                    return [4 /*yield*/, provider.getSigner()];
                case 1:
                    signer = _a.sent();
                    return [2 /*return*/, signer];
            }
        });
    });
}
export function getContract(signer) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new ethers_1.ethers.Contract(contractAddress, contractABI, signer)];
        });
    });
}
export function getCandidates() {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, candidates, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/, []];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.getCandidates()];
                case 3:
                    candidates = _a.sent();
                    return [2 /*return*/, candidates.map(function (candidate, index) { return ({
                            name: candidate.name,
                            voteCount: Number(candidate.voteCount),
                            index: index,
                        }); })];
                case 4:
                    error_1 = _a.sent();
                    console.error("Error fetching candidates:", error_1.message);
                    return [2 /*return*/, []];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function vote(candidateIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.vote(candidateIndex)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("Vote submitted for candidate index:", candidateIndex);
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error("Error voting:", error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function getWinner() {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, _a, winnerName, winnerVotes, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _b.sent();
                    if (!signer)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _b.sent();
                    return [4 /*yield*/, contract.getWinner()];
                case 3:
                    _a = _b.sent(), winnerName = _a[0], winnerVotes = _a[1];
                    return [2 /*return*/, { name: winnerName, votes: Number(winnerVotes) }];
                case 4:
                    error_3 = _b.sent();
                    console.error("Error fetching winner:", error_3);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function addUser(userAddress, name) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.addUser(userAddress, name)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("User added:", userAddress);
                    return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    console.error("Error adding user:", error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function deleteUser(userAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.deleteUser(userAddress)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("User deleted:", userAddress);
                    return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    console.error("Error deleting user:", error_5);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function addCandidate(name) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.addCandidate(name)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("Candidate added:", name);
                    return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    console.error("Error adding candidate:", error_6);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function editCandidate(index, newName) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.editCandidate(index, newName)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("Candidate edited:", newName);
                    return [3 /*break*/, 6];
                case 5:
                    error_7 = _a.sent();
                    console.error("Error editing candidate:", error_7);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function deleteCandidate(index) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.deleteCandidate(index)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("Candidate deleted at index:", index);
                    return [3 /*break*/, 6];
                case 5:
                    error_8 = _a.sent();
                    console.error("Error deleting candidate:", error_8);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
export function changeOwner(newOwner) {
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, tx, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, connectWallet()];
                case 1:
                    signer = _a.sent();
                    if (!signer)
                        return [2 /*return*/];
                    return [4 /*yield*/, getContract(signer)];
                case 2:
                    contract = _a.sent();
                    return [4 /*yield*/, contract.changeOwner(newOwner)];
                case 3:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 4:
                    _a.sent();
                    console.log("Ownership transferred to:", newOwner);
                    return [3 /*break*/, 6];
                case 5:
                    error_9 = _a.sent();
                    console.error("Error changing owner:", error_9);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
