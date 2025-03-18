/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Vote, Trophy, Users, BarChart3, UserPlus, Trash, Edit } from "lucide-react";
import {
  connectWallet,
  getCandidates,
  vote,
  getWinner,
  addUser,
  deleteUser,
  addCandidate,
  editCandidate,
  deleteCandidate,
  changeOwner,
} from "./blockchain";

function App() {
  const [candidates, setCandidates] = useState<
    { name: string; voteCount: number; index: number }[]
  >([]);
  const [users, setUsers] = useState<{ address: string; name: string }[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState<{ name: string; votes: number } | null>(null);
  const [newUser, setNewUser] = useState("");
  const [userName, setUserName] = useState("");
  const [owner, setOwner] = useState("");
  const [newCandidate, setNewCandidate] = useState("");
  const [editName, setEditName] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchCandidates();
    loadLocalData();
  }, []);
  
  function saveLocalData() {
    localStorage.setItem("candidates", JSON.stringify(candidates));
    localStorage.setItem("users", JSON.stringify(users));
  }

  function loadLocalData() {
    const savedCandidates = localStorage.getItem("candidates");
    const savedUsers = localStorage.getItem("users");
    if (savedCandidates) setCandidates(JSON.parse(savedCandidates));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }

  async function fetchCandidates() {
    const data = await getCandidates();
    if (data) {
      setCandidates(data);
      setTotalVotes(data.reduce((sum: number, candidate: { voteCount: number }) => sum + candidate.voteCount, 0));
      saveLocalData();
    }
  }

  async function handleVote(index: number) {
    await vote(index);
    setHasVoted(true);
    fetchCandidates();
  }

  async function fetchWinner() {
    const winnerData = await getWinner();
    if (winnerData) setWinner(winnerData);
  }

  async function handleAddUser() {
    if (newUser && userName) {
      await addUser(newUser, userName);
      setUsers([...users, { address: newUser, name: userName }]);
      setNewUser("");
      setUserName("");
      saveLocalData();
    }
  }


  async function handleDeleteUser(address: string) {
    await deleteUser(address);
    setUsers(users.filter(user => user.address !== address));
    saveLocalData();
  }

  async function handleAddCandidate() {
    if (newCandidate) {
      await addCandidate(newCandidate);
      setNewCandidate("");
      fetchCandidates();
      saveLocalData();
    }
  }

  async function handleEditCandidate() {
    if (editIndex !== null && editName) {
      await editCandidate(editIndex, editName);
      setEditIndex(null);
      setEditName("");
      fetchCandidates();
      saveLocalData();
    }
  }

  async function handleDeleteCandidate(index: number) {
    await deleteCandidate(index);
    fetchCandidates();
    saveLocalData();
  }

  async function handleChangeOwner() {
    if (owner) {
      await changeOwner(owner);
      setOwner("");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-center mb-4">Voting System</h1>
        <button onClick={connectWallet} className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-4 w-full">
          Connect Wallet
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Candidates</h2>
          {candidates.map((candidate, index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded-lg mb-2">
              <span>{candidate.name} - {candidate.voteCount} votes</span>
              <div>
                <button onClick={() => handleDeleteCandidate(index)} className="text-red-500 px-2"><Trash size={16} /></button>
              </div>
            </div>
          ))}
          <input type="text" placeholder="New Candidate" className="p-2 border rounded mr-2" value={newCandidate} onChange={(e) => setNewCandidate(e.target.value)} />
          <button onClick={handleAddCandidate} className="bg-green-600 text-white px-4 py-2 rounded-lg">Add</button>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Vote</h2>
          {candidates.map((candidate, index) => (
            <button key={index} onClick={() => handleVote(index)} className="block w-full text-left p-2 border rounded-lg mb-2">
              {candidate.name}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Manage Users</h2>
          {users.map((user, index) => (
            <div key={index} className="flex justify-between items-center p-2 border rounded-lg mb-2">
              <span>{user.name} ({user.address})</span>
              <button onClick={() => handleDeleteUser(user.address)} className="text-red-500 px-2"><Trash size={16} /></button>
            </div>
          ))}
          <input type="text" placeholder="User Address" className="p-2 border rounded mr-2" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
          <input type="text" placeholder="User Name" className="p-2 border rounded mr-2" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <button onClick={handleAddUser} className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2">Add</button>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Transfer Ownership</h2>
          <input type="text" placeholder="New Owner Address" className="p-2 border rounded mr-2" value={owner} onChange={(e) => setOwner(e.target.value)} />
          <button onClick={handleChangeOwner} className="bg-red-600 text-white px-4 py-2 rounded-lg">Transfer</button>
        </div>
        <div className="space-y-12">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-xl font-semibold">Current Leader</h2>
                </div>
                <div className="text-center">
                  {winner ? (
                    <>
                      <p className="text-2xl font-bold text-gray-900">{winner.name}</p>
                      <p className="text-purple-600 font-medium">{winner.votes} votes</p>
                    </>
                  ) : (
                    <button onClick={fetchWinner} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Get Winner
                    </button>
                  )}
                </div>
              </div>
            </div>
      </div>
      
    </div>
  );
}

export default App;
