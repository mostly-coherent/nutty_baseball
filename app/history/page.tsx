'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Game, getGames, deleteGame, setCurrentGame, getCurrentGame } from '../lib/storage';

export default function HistoryPage() {
  const router = useRouter();
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
      // If this was the current game, clear it
      const currentGame = getCurrentGame();
      if (currentGame && currentGame.id === gameId) {
        setCurrentGame(null);
      }
      loadGames();
      setSelectedGame(null);
    }
  };

  const handleResumeGame = (game: Game) => {
    setCurrentGame(game);
    router.push('/play');
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
            <Link 
              href="/" 
              className="text-2xl hover:text-secondary transition-colors"
              aria-label="Back to home page"
            >
              <span aria-hidden="true">←</span> Back
            </Link>
            <h1 className="text-4xl font-bold">
              <span aria-hidden="true">🏆</span> Game History
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {games.length === 0 ? (
          /* No Games Yet */
          <section aria-labelledby="no-games-heading" className="bg-white rounded-lg shadow-xl p-12 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6" aria-hidden="true">⚾</div>
            <h2 id="no-games-heading" className="text-3xl font-bold mb-4">No Games Yet!</h2>
            <p className="text-xl text-gray-700 mb-8">
              You haven't played any games yet. Ready to start your baseball journey?
            </p>
            <Link
              href="/play"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <span aria-hidden="true">🎮</span> Start Your First Game!
            </Link>
            <figure className="mt-8 bg-yellow-50 rounded-lg p-6 border-l-4 border-secondary">
              <blockquote className="text-lg italic">
                "Yesterday I was a dog. Today I'm a dog. Tomorrow I'll probably still be a dog. 
                Sigh! There's so little hope for advancement."
              </blockquote>
              <figcaption className="text-sm text-gray-700 mt-2">
                — Snoopy (But at least you can start playing baseball! <span aria-hidden="true">🐕</span>)
              </figcaption>
            </figure>
          </section>
        ) : (
          <>
            {/* Stats Overview */}
            <section aria-label="Statistics overview" className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2" aria-hidden="true">🎮</div>
                <div className="text-4xl font-bold text-primary" aria-label={`${totalGamesPlayed} games played`}>
                  {totalGamesPlayed}
                </div>
                <div className="text-gray-700">Games Played</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2" aria-hidden="true">⚾</div>
                <div className="text-4xl font-bold text-blue-700" aria-label={`${stats.totalRuns} total runs scored`}>
                  {stats.totalRuns}
                </div>
                <div className="text-gray-700">Total Runs Scored</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-5xl mb-2" aria-hidden="true">🔥</div>
                <div className="text-4xl font-bold text-red-700" aria-label={`${stats.highScore} highest score`}>
                  {stats.highScore}
                </div>
                <div className="text-gray-700">Highest Score</div>
              </div>
            </section>

            {/* Filter */}
            <section aria-labelledby="filter-heading" className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 id="filter-heading" className="text-xl font-bold mb-4">Filter Games:</h2>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by game status">
                <button
                  onClick={() => setFilter('all')}
                  aria-pressed={filter === 'all'}
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
                  aria-pressed={filter === 'completed'}
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
                  aria-pressed={filter === 'in-progress'}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    filter === 'in-progress'
                      ? 'bg-yellow-500 text-white shadow-lg scale-105'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                >
                  In Progress ({games.filter(g => g.status === 'in-progress').length})
                </button>
              </div>
            </section>

            {!selectedGame ? (
              /* Games List */
              <section aria-label="Games list">
                <h2 className="sr-only">Your Games</h2>
                <ul className="space-y-4 list-none">
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
                      <li key={game.id}>
                        <button
                          onClick={() => setSelectedGame(game)}
                          className="w-full bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-[1.02] text-left"
                          aria-label={`${game.team1} vs ${game.team2}, ${team1Total} to ${team2Total}, ${game.status === 'completed' ? 'completed' : 'in progress'}, played on ${gameDate}`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <time className="text-sm text-gray-600" dateTime={game.date}>{gameDate}</time>
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              game.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {game.status === 'completed' ? (
                                <><span aria-hidden="true">✓</span> Completed</>
                              ) : (
                                <><span aria-hidden="true">⏸</span> In Progress</>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="text-right">
                              <div className="text-xl font-bold">{game.team1}</div>
                              <div className="text-3xl font-bold text-blue-700">{team1Total}</div>
                            </div>
                            <div className="text-center text-2xl font-bold text-gray-500" aria-hidden="true">
                              VS
                            </div>
                            <div className="text-left">
                              <div className="text-xl font-bold">{game.team2}</div>
                              <div className="text-3xl font-bold text-red-700">{team2Total}</div>
                            </div>
                          </div>

                          {game.status === 'completed' && game.winner && (
                            <div className="mt-4 text-center text-lg font-semibold text-primary">
                              <span aria-hidden="true">🏆</span> Winner: {game.winner}
                            </div>
                          )}

                          <div className="mt-4 text-sm text-gray-700 text-center">
                            {game.innings} innings • {game.ruleSet} rules
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : (
              /* Game Detail View */
              <article className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto" aria-labelledby="game-detail-heading">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-blue-700 hover:text-blue-900 font-semibold mb-6 flex items-center gap-2"
                  aria-label="Back to all games"
                >
                  <span aria-hidden="true">←</span> Back to All Games
                </button>

                <header className="mb-6">
                  <h2 id="game-detail-heading" className="sr-only">
                    Game: {selectedGame.team1} vs {selectedGame.team2}
                  </h2>
                  <time 
                    className="text-sm text-gray-600 mb-2 block" 
                    dateTime={selectedGame.date}
                  >
                    {new Date(selectedGame.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </time>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedGame.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedGame.status === 'completed' ? (
                      <><span aria-hidden="true">✓</span> Completed</>
                    ) : (
                      <><span aria-hidden="true">⏸</span> In Progress</>
                    )}
                  </div>
                </header>

                {/* Final Score */}
                <section aria-label="Final score" className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{selectedGame.team1}</h3>
                    <div 
                      className="text-6xl font-bold text-blue-700"
                      aria-label={`${selectedGame.team1} score: ${selectedGame.scores.team1.reduce((a, b) => a + b, 0)}`}
                    >
                      {selectedGame.scores.team1.reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <h3 className="text-2xl font-bold mb-2">{selectedGame.team2}</h3>
                    <div 
                      className="text-6xl font-bold text-red-700"
                      aria-label={`${selectedGame.team2} score: ${selectedGame.scores.team2.reduce((a, b) => a + b, 0)}`}
                    >
                      {selectedGame.scores.team2.reduce((a, b) => a + b, 0)}
                    </div>
                  </div>
                </section>

                {selectedGame.status === 'completed' && selectedGame.winner && (
                  <div className="text-center mb-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-secondary" role="status">
                    <div className="text-2xl font-bold text-primary">
                      <span aria-hidden="true">🏆</span> Winner: {selectedGame.winner}!
                    </div>
                  </div>
                )}

                {/* Inning-by-Inning Scoreboard */}
                <section aria-labelledby="history-scoreboard-heading" className="mb-8">
                  <h3 id="history-scoreboard-heading" className="text-2xl font-bold mb-4">
                    <span aria-hidden="true">📊</span> Scoreboard
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse" aria-describedby="history-scoreboard-heading">
                      <caption className="sr-only">
                        Inning-by-inning score for {selectedGame.team1} vs {selectedGame.team2}
                      </caption>
                      <thead>
                        <tr className="border-b-2 border-gray-300">
                          <th scope="col" className="p-3 text-left bg-gray-100">Team</th>
                          {Array.from({ length: selectedGame.innings }, (_, i) => (
                            <th key={i} scope="col" className="p-3 text-center bg-gray-100">
                              <span aria-label={`Inning ${i + 1}`}>{i + 1}</span>
                            </th>
                          ))}
                          <th scope="col" className="p-3 text-center bg-gray-200 font-bold">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <th scope="row" className="p-3 font-bold text-left">{selectedGame.team1}</th>
                          {selectedGame.scores.team1.map((score, i) => (
                            <td key={i} className="p-3 text-center text-lg">{score}</td>
                          ))}
                          <td className="p-3 text-center font-bold text-xl text-blue-700 bg-blue-50">
                            {selectedGame.scores.team1.reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" className="p-3 font-bold text-left">{selectedGame.team2}</th>
                          {selectedGame.scores.team2.map((score, i) => (
                            <td key={i} className="p-3 text-center text-lg">{score}</td>
                          ))}
                          <td className="p-3 text-center font-bold text-xl text-red-700 bg-red-50">
                            {selectedGame.scores.team2.reduce((a, b) => a + b, 0)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Game Info */}
                <dl className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <dt className="text-sm text-gray-700">Innings</dt>
                    <dd className="text-xl font-bold">{selectedGame.innings}</dd>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <dt className="text-sm text-gray-700">Rule Set</dt>
                    <dd className="text-xl font-bold capitalize">{selectedGame.ruleSet}</dd>
                  </div>
                </dl>

                {/* Actions */}
                <div className="flex gap-4" role="group" aria-label="Game actions">
                  {selectedGame.status === 'in-progress' && (
                    <button
                      onClick={() => handleResumeGame(selectedGame)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                    >
                      <span aria-hidden="true">▶</span> Resume Game
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteGame(selectedGame.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  >
                    <span aria-hidden="true">🗑️</span> Delete Game
                  </button>
                </div>
              </article>
            )}
          </>
        )}
      </main>
    </div>
  );
}


