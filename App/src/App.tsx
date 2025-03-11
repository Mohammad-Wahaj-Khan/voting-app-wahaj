import React, { useEffect, useState } from "react";
import { Vote, Trophy, Users, BarChart3 } from "lucide-react";
import { connectWallet, getCandidates, vote, getWinner } from "./dist/blockchain.js";

function App() {
  const [candidates, setCandidates] = useState<
    { name: string; voteCount: number; index: number }[]
  >([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState<{ name: string; votes: number } | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  async function fetchCandidates() {
    const data = await getCandidates();
    if (data) {
      setCandidates(data);
      setTotalVotes(
        data.reduce((sum: number, candidate: { voteCount: number }) => sum + candidate.voteCount, 0)
      );      
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Voting System</h1>
              <Vote className="h-12 w-12 text-purple-600" />
            </div>
            <button onClick={connectWallet} className="bg-purple-600 text-white px-4 py-2 rounded-lg">
              Connect Wallet
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Cast Your Vote</h2>
              </div>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.index}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer
                      ${selectedCandidate === candidate.index ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-purple-200"}`}
                    onClick={() => !hasVoted && setSelectedCandidate(candidate.index)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{candidate.name}</span>
                      <span className="text-sm text-gray-500">
                        {((candidate.voteCount / totalVotes) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 rounded-full h-2 transition-all"
                        style={{ width: `${(candidate.voteCount / totalVotes) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => selectedCandidate !== null && handleVote(selectedCandidate)}
                  disabled={hasVoted || selectedCandidate === null}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition
                    ${hasVoted || selectedCandidate === null ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"}`}
                >
                  {hasVoted ? "Vote Recorded" : "Confirm Vote"}
                </button>
              </div>
            </div>

            <div className="space-y-6">
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
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  <h2 className="text-xl font-semibold">Statistics</h2>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Votes Cast</span>
                    <span className="font-medium">{totalVotes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of Candidates</span>
                    <span className="font-medium">{candidates.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default App;
