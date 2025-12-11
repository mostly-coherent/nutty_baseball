'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const greetings = [
      "Good grief! Let's learn some baseball!",
      "You're a good man, Charlie Brown! Ready to play?",
      "Happiness is a warm baseball glove!",
      "It's not whether you win or lose... wait, yes it is!",
      "Let's play ball, blockhead!"
    ];
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-grass/20 to-dirt/30">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-3">
            <span className="text-5xl animate-bounce-ball" aria-hidden="true">⚾</span>
            Nutty Baseball
            <span className="text-5xl animate-bounce-ball" aria-hidden="true">⚾</span>
          </h1>
          <p className="text-center text-white mt-2 text-lg">
            Learn baseball with Charlie Brown & friends!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-12" tabIndex={-1}>
        {/* Welcome Message */}
        <section aria-labelledby="welcome-heading" className="bg-white rounded-lg shadow-xl p-8 mb-8 border-4 border-secondary">
          <h2 id="welcome-heading" className="text-3xl font-bold text-center text-foreground mb-4" aria-live="polite">
            {greeting} <span aria-hidden="true">⚾</span>
          </h2>
          <p className="text-center text-lg text-gray-700">
            Whether you're a baseball rookie or just want to track your backyard games,
            <br />
            this app has everything you need to learn and play!
          </p>
        </section>

        {/* Navigation Cards */}
        <nav aria-label="Main features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link 
            href="/learn" 
            className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-describedby="learn-desc"
          >
            <div className="text-5xl mb-4 text-center" aria-hidden="true">📚</div>
            <h3 className="text-2xl font-bold text-center mb-2 text-blue-700">Learn</h3>
            <p id="learn-desc" className="text-center text-gray-700">
              Interactive lessons on rules, positions, and strategy
            </p>
          </Link>

          <Link 
            href="/play" 
            className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-green-500 focus-visible:ring-2 focus-visible:ring-green-500"
            aria-describedby="play-desc"
          >
            <div className="text-5xl mb-4 text-center" aria-hidden="true">⚾</div>
            <h3 className="text-2xl font-bold text-center mb-2 text-green-700">Play</h3>
            <p id="play-desc" className="text-center text-gray-700">
              Start a new game and track scores inning by inning
            </p>
          </Link>

          <Link 
            href="/reference" 
            className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-purple-500 focus-visible:ring-2 focus-visible:ring-purple-500"
            aria-describedby="ref-desc"
          >
            <div className="text-5xl mb-4 text-center" aria-hidden="true">📖</div>
            <h3 className="text-2xl font-bold text-center mb-2 text-purple-700">Reference</h3>
            <p id="ref-desc" className="text-center text-gray-700">
              Quick rule lookups and position diagrams
            </p>
          </Link>

          <Link 
            href="/history" 
            className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-orange-500 focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-describedby="history-desc"
          >
            <div className="text-5xl mb-4 text-center" aria-hidden="true">🏆</div>
            <h3 className="text-2xl font-bold text-center mb-2 text-amber-700">History</h3>
            <p id="history-desc" className="text-center text-gray-700">
              View past games and your baseball journey
            </p>
          </Link>
        </nav>

        {/* Fun Facts Section */}
        <section aria-labelledby="funfact-heading" className="bg-yellow-50 rounded-lg shadow-lg p-6 border-l-4 border-secondary">
          <h3 id="funfact-heading" className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <span aria-hidden="true">💡</span> Did You Know?
          </h3>
          <p className="text-gray-700 text-lg">
            In the Peanuts comic strip, Charlie Brown's baseball team never won a game in the entire 50-year run! 
            But that didn't stop him from trying. That's the spirit of baseball - it's about having fun and never giving up!
          </p>
        </section>

        {/* Quick Start Tips */}
        <section aria-labelledby="quickstart-heading" className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 id="quickstart-heading" className="text-2xl font-bold text-center text-foreground mb-4">
            Quick Start Guide
          </h3>
          <ol className="grid md:grid-cols-3 gap-4 list-none">
            <li className="text-center p-4">
              <div className="text-3xl mb-2" aria-hidden="true">1️⃣</div>
              <h4 className="font-bold mb-2">New to Baseball?</h4>
              <p className="text-gray-700">Start with the <strong>Learn</strong> section to understand the basics</p>
            </li>
            <li className="text-center p-4">
              <div className="text-3xl mb-2" aria-hidden="true">2️⃣</div>
              <h4 className="font-bold mb-2">Ready to Play?</h4>
              <p className="text-gray-700">Head to <strong>Play</strong> to set up your first backyard game</p>
            </li>
            <li className="text-center p-4">
              <div className="text-3xl mb-2" aria-hidden="true">3️⃣</div>
              <h4 className="font-bold mb-2">Need Quick Help?</h4>
              <p className="text-gray-700">Check <strong>Reference</strong> for instant rule lookups</p>
            </li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-6 mt-12" role="contentinfo">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-lg">
            <p>"In the book of life, the answers aren't in the back."</p>
            <footer className="text-sm text-white/80 mt-1">— Charlie Brown</footer>
          </blockquote>
          <p className="text-sm text-white/80 mt-2">
            But in baseball, you can always learn the rules! <span aria-hidden="true">🥜⚾</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
