'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Game, getGames, deleteGame } from '../lib/storage';

export default function HistoryPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = () => {
    const allGames = getGames().sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setGames(allGames);
  };

  const handleDeleteGame = (gameId: string) => {
    if (confirm('Are you sure you want to delete this game?')) {
      deleteGame(gameId);
      loadGames();
      setSelectedGame(null);
    }
  };

  const filteredGames = games.filter(game => {
    if (filter === 'all') return true;
    return game.status === filter;
  });

  const completedGames = games.filter(g => g.status === 'completed');
  const totalGamesPlayed = completedGames.length;
  
  // Calculate stats
  const stats = completedGames.reduce((acc, game) => {
    const team1Total = game.scores.team1.reduce((a, b) => a + b, 0);
    const team2Total = game.scores.team2.reduce((a, b) => a + b, 0);
    acc.totalRuns += team1Total + team2Total;
    acc.highScore = Math.max(acc.highScore, team1Total, team2Total);
    return acc;
  }, { totalRuns: 0, highScore: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-grass/20 to-dirt/30">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl hover:text-secondary transition-colors">
              ← Back
            </Link>
            <h1 className="text-4xl font-bold">🏆 Game History</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {games.length === 0 ? (
          /* No Games Yet */
          <div className="bg-white rounded-lg shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">⚾</div>
            <h2 className="text-3xl font-bold mb-4">No Games Yet!</h2>
            <p className="text-xl text-gray-600 mb-8">
              You haven't played any games yet. Ready to start your baseball journey?
            </p>
            <Link
              href="/play"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              🎮 Start Your First Game!
            </Link>
            <div className="mt-8 bg-yellow-50 rounded-lg p-6 border-l-4 border-secondary">
              <p className="text-lg italic">
                "Yesterday I was a dog. Today I'm a dog. Tomorrow I'll probably still be a dog. 
                Sigh! There's so little hope for advancement." - Snoopy
              </p>
              <p className="text-sm text-gray-600 mt-2">
                (But at least you can start playing baseball! 🐕)
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2">🎮</div>
                <div className="text-4xl font-bold text-primary">{totalGamesPlayed}</div>
                <div className="text-gray-600">Games Played</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2">⚾</div>
                <div className="text-4xl font-bold text-blue-600">{stats.totalRuns}</div>
                <div className="text-gray-600">Total Runs Scored</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2">🔥</div>
                <div className="text-4xl font-bold text-red-600">{stats.highScore}</div>
                <div className="text-gray-600">Highest Score</div>
              </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Filter Games:</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    filter === 'all'
                      ? 'bg-primary text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Games ({games.length})
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    filter === 'completed'
                      ? 'bg-green-500 text-white shadow-lg scale-105'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  Completed ({games.filter(g => g.status === 'completed').length})
                </button>
                <button
                  onClick={() => setFilter('in-progress')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    filter === 'in-progress'
                      ? 'bg-yellow-500 text-white shadow-lg scale-105'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  In Progress ({games.filter(g => g.status === 'in-progress').length})
                </button>
              </div>
            </div>

            {!selectedGame ? (
              /* Games List */
              <div className="space-y-4">
                {filteredGames.map(game => {
                  const team1Total = game.scores.team1.reduce((a, b) => a + b, 0);
                  const team2Total = game.scores.team2.reduce((a, b) => a + b, 0);
                  const gameDate = new Date(game.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  });

                  return (
                    <button
                      key={game.id}
                      onClick={() => setSelectedGame(game)}
                      className="w-full bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-[1.02] text-left"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-500">{gameDate}</div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          game.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {game.status === 'completed' ? '✓ Completed' : '⏸ In Progress'}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="text-right">
                          <div className="text-xl font-bold">{game.team1}</div>
                          <div className="text-3xl font-bold text-blue-600">{team1Total}</div>
                        </div>
                        <div className="text-center text-2xl font-bold text-gray-400">
                          VS
                        </div>
                        <div className="text-left">
                          <div className="text-xl font-bold">{game.team2}</div>
                          <div className="text-3xl font-bold text-red-600">{team2Total}</div>
                        </div>
                      </div>

                      {game.status === 'completed' && game.winner && (
                        <div className="mt-4 text-center text-lg font-semibold text-primary">
                          🏆 Winner: {game.winner}
                        </div>
                      )}

                      <div className="mt-4 text-sm text-gray-600 text-center">
                        {game.innings} innings • {game.ruleSet} rules
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* Game Detail View */
              <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-blue-600 hover:text-blue-800 font-semibold mb-6 flex items-center gap-2"
                >
                  ← Back to All Games
                </button>

                <div className="mb-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(selectedGame.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedGame.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedGame.status === 'completed' ? '✓ Completed' : '⏸ In Progress'}
                  </div>
                </div>

                {/* Final Score */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{selectedGame.team1}</h3>
                    <div className="text-6xl font-bold text-blue-600">
                      {selectedGame.scores.team1.reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{selectedGame.team2}</h3>
                    <div className="text-6xl font-bold text-red-600">
                      {selectedGame.scores.team2.reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                </div>

                {selectedGame.status === 'completed' && selectedGame.winner && (
                  <div className="text-center mb-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-secondary">
                    <div className="text-2xl font-bold text-primary">
                      🏆 Winner: {selectedGame.winner}!
                    </div>
                  </div>
                )}

                {/* Inning-by-Inning Scoreboard */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4">📊 Scoreboard</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th className="p-3 text-left bg-gray-100">Team</th>
                          {Array.from({ length: selectedGame.innings }, (_, i) => (
                            <th key={i} className="p-3 text-center bg-gray-100">{i + 1}</th>
                          ))}
                          <th className="p-3 text-center bg-gray-200 font-bold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="p-3 font-bold">{selectedGame.team1}</td>
                          {selectedGame.scores.team1.map((score, i) => (
                            <td key={i} className="p-3 text-center text-lg">{score}</td>
                          ))}
                          <td className="p-3 text-center font-bold text-xl text-blue-600 bg-blue-50">
                            {selectedGame.scores.team1.reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold">{selectedGame.team2}</td>
                          {selectedGame.scores.team2.map((score, i) => (
                            <td key={i} className="p-3 text-center text-lg">{score}</td>
                          ))}
                          <td className="p-3 text-center font-bold text-xl text-red-600 bg-red-50">
                            {selectedGame.scores.team2.reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Game Info */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Innings</div>
                    <div className="text-xl font-bold">{selectedGame.innings}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Rule Set</div>
                    <div className="text-xl font-bold capitalize">{selectedGame.ruleSet}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  {selectedGame.status === 'in-progress' && (
                    <Link
                      href="/play"
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-all"
                    >
                      ▶ Resume Game
                    </Link>
                  )}
                  <button
                    onClick={() => handleDeleteGame(selectedGame.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    🗑️ Delete Game
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}


