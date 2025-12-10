'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Game, saveGame, getCurrentGame, setCurrentGame } from '../lib/storage';
import { getCommentary, getInningCommentary, getGameEndCommentary, getStartGameQuote } from '../lib/commentary';

export default function PlayPage() {
  const [currentGame, setCurrentGameState] = useState<Game | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  
  // Setup form state
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [innings, setInnings] = useState(6);
  const [ruleSet, setRuleSet] = useState<'simplified' | 'little-league' | 'mlb'>('simplified');

  useEffect(() => {
    const game = getCurrentGame();
    if (game && game.status !== 'completed') {
      setCurrentGameState(game);
      setShowSetup(false);
    }
  }, []);

  const startNewGame = () => {
    if (!team1Name.trim() || !team2Name.trim()) {
      alert('Please enter names for both teams!');
      return;
    }

    const newGame: Game = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      team1: team1Name.trim(),
      team2: team2Name.trim(),
      innings,
      ruleSet,
      scores: {
        team1: Array(innings).fill(0),
        team2: Array(innings).fill(0)
      },
      currentInning: 1,
      status: 'in-progress'
    };

    setCurrentGameState(newGame);
    setCurrentGame(newGame);
    saveGame(newGame);
    setShowSetup(false);
  };

  const updateScore = (team: 'team1' | 'team2', inning: number, score: number) => {
    if (!currentGame) return;

    const updatedGame = { ...currentGame };
    updatedGame.scores[team][inning - 1] = Math.max(0, score);
    
    setCurrentGameState(updatedGame);
    setCurrentGame(updatedGame);
    saveGame(updatedGame);
  };

  const endGame = () => {
    if (!currentGame) return;

    const team1Total = currentGame.scores.team1.reduce((a, b) => a + b, 0);
    const team2Total = currentGame.scores.team2.reduce((a, b) => a + b, 0);
    
    const winner = team1Total > team2Total ? currentGame.team1 : 
                   team2Total > team1Total ? currentGame.team2 : 'Tie';

    const completedGame = {
      ...currentGame,
      status: 'completed' as const,
      winner
    };

    saveGame(completedGame);
    setCurrentGame(null);
    setCurrentGameState(completedGame);
  };

  const abandonGame = () => {
    if (confirm('Are you sure you want to abandon this game? This game will not be saved.')) {
      if (currentGame) {
        // Remove from current game
        setCurrentGame(null);
        // Don't save abandoned games - they're already saved as in-progress
        // User can delete them from history if desired
      }
      setCurrentGameState(null);
      setShowSetup(true);
      setTeam1Name('');
      setTeam2Name('');
    }
  };

  const startAnotherGame = () => {
    setCurrentGameState(null);
    setShowSetup(true);
    setTeam1Name('');
    setTeam2Name('');
  };

  const team1Total = currentGame ? currentGame.scores.team1.reduce((a, b) => a + b, 0) : 0;
  const team2Total = currentGame ? currentGame.scores.team2.reduce((a, b) => a + b, 0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-grass/20 to-dirt/30">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl hover:text-secondary transition-colors">
              ← Back
            </Link>
            <h1 className="text-4xl font-bold">⚾ Play Ball!</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showSetup ? (
          /* Game Setup */
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">⚙️ Set Up Your Game</h2>
            
            <div className="bg-yellow-50 rounded-lg p-4 mb-6 border-l-4 border-secondary">
              <p className="text-lg italic">{getStartGameQuote()}</p>
            </div>

            <div className="space-y-6">
              {/* Team Names */}
              <div>
                <label className="block text-lg font-semibold mb-2">Team 1 Name:</label>
                <input
                  type="text"
                  value={team1Name}
                  onChange={(e) => setTeam1Name(e.target.value)}
                  placeholder="e.g., Dad's Team, Tigers, Home Team"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">Team 2 Name:</label>
                <input
                  type="text"
                  value={team2Name}
                  onChange={(e) => setTeam2Name(e.target.value)}
                  placeholder="e.g., Son's Team, Cubs, Away Team"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                />
              </div>

              {/* Number of Innings */}
              <div>
                <label className="block text-lg font-semibold mb-2">Number of Innings:</label>
                <div className="flex gap-3">
                  {[3, 6, 9].map(num => (
                    <button
                      key={num}
                      onClick={() => setInnings(num)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                        innings === num
                          ? 'bg-primary text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {num} innings
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  💡 Backyard: 3, Little League: 6, MLB: 9
                </p>
              </div>

              {/* Rule Set */}
              <div>
                <label className="block text-lg font-semibold mb-2">Rule Set:</label>
                <div className="space-y-3">
                  <button
                    onClick={() => setRuleSet('simplified')}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      ruleSet === 'simplified'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-bold text-lg">🌱 Simplified (Backyard)</div>
                    <div className="text-sm mt-1 opacity-90">
                      Relaxed rules, perfect for casual family games
                    </div>
                  </button>

                  <button
                    onClick={() => setRuleSet('little-league')}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      ruleSet === 'little-league'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-bold text-lg">🏆 Little League</div>
                    <div className="text-sm mt-1 opacity-90">
                      Official youth baseball rules
                    </div>
                  </button>

                  <button
                    onClick={() => setRuleSet('mlb')}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      ruleSet === 'mlb'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-bold text-lg">⚡ MLB Rules</div>
                    <div className="text-sm mt-1 opacity-90">
                      Professional baseball rules
                    </div>
                  </button>
                </div>
              </div>

              <button
                onClick={startNewGame}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                🎮 Start Game!
              </button>
            </div>
          </div>
        ) : currentGame?.status === 'completed' ? (
          /* Game Completed */
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">🎉 Game Over!</h2>
            
            <div className="bg-yellow-50 rounded-lg p-6 mb-6 border-l-4 border-secondary">
              <p className="text-xl text-center">
                {currentGame.winner === 'Tie' ? 
                  getGameEndCommentary('Tie', '', { winner: team1Total, loser: team2Total }) :
                  getGameEndCommentary(
                    currentGame.winner === currentGame.team1 ? currentGame.team1 : currentGame.team2,
                    currentGame.winner === currentGame.team1 ? currentGame.team2 : currentGame.team1,
                    {
                      winner: currentGame.winner === currentGame.team1 ? team1Total : team2Total,
                      loser: currentGame.winner === currentGame.team1 ? team2Total : team1Total
                    }
                  )
                }
              </p>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-4">
                {currentGame.team1}: {team1Total} - {currentGame.team2}: {team2Total}
              </div>
              <div className="text-2xl text-primary font-bold">
                Winner: {currentGame.winner}! 🏆
              </div>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/history"
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg text-xl text-center transition-all"
              >
                📊 View Game History
              </Link>
              <button
                onClick={startAnotherGame}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all"
              >
                🎮 Play Another Game
              </button>
            </div>
          </div>
        ) : currentGame ? (
          /* Active Game - Score Tracking */
          <div className="space-y-6">
            {/* Commentary */}
            <div className="bg-yellow-50 rounded-lg shadow-lg p-6 border-l-4 border-secondary">
              <p className="text-xl text-center font-semibold">
                {getCommentary({
                  team1Score: team1Total,
                  team2Score: team2Total,
                  inning: currentGame.currentInning,
                  team1Name: currentGame.team1,
                  team2Name: currentGame.team2
                })}
              </p>
            </div>

            {/* Current Score */}
            <div className="bg-white rounded-lg shadow-xl p-6">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentGame.team1}</h3>
                  <div className="text-6xl font-bold text-blue-600">{team1Total}</div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{currentGame.team2}</h3>
                  <div className="text-6xl font-bold text-red-600">{team2Total}</div>
                </div>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="bg-white rounded-lg shadow-xl p-6 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-4 text-center">📊 Scoreboard</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="p-3 text-left">Team</th>
                    {Array.from({ length: currentGame.innings }, (_, i) => (
                      <th key={i} className="p-3 text-center">{i + 1}</th>
                    ))}
                    <th className="p-3 text-center font-bold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-bold">{currentGame.team1}</td>
                    {currentGame.scores.team1.map((score, i) => (
                      <td key={i} className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={score}
                          onChange={(e) => updateScore('team1', i + 1, parseInt(e.target.value) || 0)}
                          className="w-12 text-center border-2 border-gray-300 rounded py-1 focus:border-blue-500 focus:outline-none"
                        />
                      </td>
                    ))}
                    <td className="p-3 text-center font-bold text-xl text-blue-600">{team1Total}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">{currentGame.team2}</td>
                    {currentGame.scores.team2.map((score, i) => (
                      <td key={i} className="p-3 text-center">
                        <input
                          type="number"
                          min="0"
                          value={score}
                          onChange={(e) => updateScore('team2', i + 1, parseInt(e.target.value) || 0)}
                          className="w-12 text-center border-2 border-gray-300 rounded py-1 focus:border-red-500 focus:outline-none"
                        />
                      </td>
                    ))}
                    <td className="p-3 text-center font-bold text-xl text-red-600">{team2Total}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Game Controls */}
            <div className="flex gap-4">
              <button
                onClick={endGame}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all shadow-lg"
              >
                🏁 End Game
              </button>
              <button
                onClick={abandonGame}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all shadow-lg"
              >
                ❌ Abandon Game
              </button>
            </div>

            {/* Rule Reference */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <h4 className="font-bold mb-2">📖 Quick Rule Reminder ({currentGame.ruleSet}):</h4>
              {currentGame.ruleSet === 'simplified' && (
                <p>Relaxed backyard rules - have fun and don't worry about the details!</p>
              )}
              {currentGame.ruleSet === 'little-league' && (
                <p>6 innings, all players bat, mercy rule at 10 runs after 4 innings</p>
              )}
              {currentGame.ruleSet === 'mlb' && (
                <p>9 innings, 3 outs per inning, extra innings if tied</p>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

