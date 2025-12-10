'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      "Good grief! Let's learn some baseball! ⚾",
      "You're a good man, Charlie Brown! Ready to play? ⚾",
      "Happiness is a warm baseball glove! ⚾",
      "It's not whether you win or lose... wait, yes it is! ⚾",
      "Let's play ball, blockhead! ⚾"
    ];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-grass/20 to-dirt/30">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-3">
            <span className="text-5xl animate-bounce-ball">⚾</span>
            Nutty Baseball
            <span className="text-5xl animate-bounce-ball">⚾</span>
          </h1>
          <p className="text-center text-white/90 mt-2 text-lg">
            Learn baseball with Charlie Brown & friends!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-secondary">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            {greeting}
          </h2>
          <p className="text-center text-lg text-gray-700">
            Whether you're a baseball rookie or just want to track your backyard games,
            <br />
            this app has everything you need to learn and play!
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/learn" className="group">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-blue-500">
              <div className="text-5xl mb-4 text-center">📚</div>
              <h3 className="text-2xl font-bold text-center mb-2 text-blue-600">Learn</h3>
              <p className="text-center text-gray-600">
                Interactive lessons on rules, positions, and strategy
              </p>
            </div>
          </Link>

          <Link href="/play" className="group">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-green-500">
              <div className="text-5xl mb-4 text-center">⚾</div>
              <h3 className="text-2xl font-bold text-center mb-2 text-green-600">Play</h3>
              <p className="text-center text-gray-600">
                Start a new game and track scores inning by inning
              </p>
            </div>
          </Link>

          <Link href="/reference" className="group">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-purple-500">
              <div className="text-5xl mb-4 text-center">📖</div>
              <h3 className="text-2xl font-bold text-center mb-2 text-purple-600">Reference</h3>
              <p className="text-center text-gray-600">
                Quick rule lookups and position diagrams
              </p>
            </div>
          </Link>

          <Link href="/history" className="group">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-orange-500">
              <div className="text-5xl mb-4 text-center">🏆</div>
              <h3 className="text-2xl font-bold text-center mb-2 text-orange-600">History</h3>
              <p className="text-center text-gray-600">
                View past games and your baseball journey
              </p>
            </div>
          </Link>
        </div>

        {/* Fun Facts Section */}
        <div className="bg-yellow-50 rounded-lg shadow-lg p-6 border-l-4 border-secondary">
          <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <span>💡</span> Did You Know?
          </h3>
          <p className="text-gray-700 text-lg">
            In the Peanuts comic strip, Charlie Brown's baseball team never won a game in the entire 50-year run! 
            But that didn't stop him from trying. That's the spirit of baseball - it's about having fun and never giving up!
          </p>
        </div>

        {/* Quick Start Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-center text-foreground mb-4">
            Quick Start Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">1️⃣</div>
              <h4 className="font-bold mb-2">New to Baseball?</h4>
              <p className="text-gray-600">Start with the <strong>Learn</strong> section to understand the basics</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">2️⃣</div>
              <h4 className="font-bold mb-2">Ready to Play?</h4>
              <p className="text-gray-600">Head to <strong>Play</strong> to set up your first backyard game</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">3️⃣</div>
              <h4 className="font-bold mb-2">Need Quick Help?</h4>
              <p className="text-gray-600">Check <strong>Reference</strong> for instant rule lookups</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">
            "In the book of life, the answers aren't in the back." - Charlie Brown
          </p>
          <p className="text-sm text-white/70 mt-2">
            But in baseball, you can always learn the rules! 🥜⚾
          </p>
        </div>
      </footer>
    </div>
  );
}
