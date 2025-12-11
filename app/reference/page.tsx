'use client';

import Link from 'next/link';
import { useState } from 'react';

interface ReferenceItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  emoji: string;
}

const references: ReferenceItem[] = [
  {
    id: 'strike-zone',
    category: 'Rules',
    question: 'What is the strike zone?',
    answer: 'The strike zone is the area over home plate between the batter\'s knees and the midpoint of their torso. If a pitch passes through this zone and the batter doesn\'t swing, it\'s called a strike.',
    emoji: '🎯'
  },
  {
    id: 'foul-ball',
    category: 'Rules',
    question: 'What happens on a foul ball?',
    answer: 'A foul ball counts as a strike (except if the batter already has 2 strikes - then it doesn\'t count). The ball is dead and runners can\'t advance. If a foul ball is caught in the air, it\'s an out.',
    emoji: '⚠️'
  },
  {
    id: 'walk',
    category: 'Rules',
    question: 'What is a walk?',
    answer: 'A walk (or "base on balls") happens when the pitcher throws 4 balls (pitches outside the strike zone). The batter gets to go to first base for free.',
    emoji: '🚶'
  },
  {
    id: 'force-out',
    category: 'Rules',
    question: 'What is a force out?',
    answer: 'A force out happens when a runner MUST advance to the next base (because the batter hit the ball). The fielder only needs to touch the base with the ball before the runner arrives - they don\'t need to tag the runner.',
    emoji: '⚡'
  },
  {
    id: 'tag-out',
    category: 'Rules',
    question: 'What is a tag out?',
    answer: 'When a runner is not forced to advance, they must be tagged with the ball (or glove holding the ball) while off the base to be out. This happens on stolen base attempts or when runners go back to a base.',
    emoji: '👋'
  },
  {
    id: 'infield-fly',
    category: 'Rules',
    question: 'What is the infield fly rule?',
    answer: 'With runners on 1st & 2nd (or bases loaded) and less than 2 outs, if a batter hits an easy pop-up in the infield, the umpire calls "infield fly" and the batter is automatically out. This prevents the defense from dropping the ball on purpose to get a double play.',
    emoji: '🎈'
  },
  {
    id: 'balk',
    category: 'Rules',
    question: 'What is a balk?',
    answer: 'A balk is an illegal motion by the pitcher that deceives the runners. Common balks: starting the pitching motion and stopping, faking a throw to first base, or not coming to a complete stop in the set position. When called, all runners advance one base.',
    emoji: '🚫'
  },
  {
    id: 'ground-rule-double',
    category: 'Rules',
    question: 'What is a ground rule double?',
    answer: 'When a fair ball bounces over the outfield fence or gets stuck in the fence/ivy, the batter automatically gets a double and all runners advance 2 bases. It\'s called a "ground rule" because it\'s based on the specific ballpark\'s rules.',
    emoji: '⚾'
  },
  {
    id: 'positions-diagram',
    category: 'Positions',
    question: 'Where do players stand on the field?',
    answer: 'Pitcher (P) - on the mound in center. Catcher (C) - behind home plate. Infielders: 1B (first base), 2B (between 1st & 2nd), SS (between 2nd & 3rd), 3B (third base). Outfielders: LF (left field), CF (center field), RF (right field).',
    emoji: '🗺️'
  },
  {
    id: 'pitcher-role',
    category: 'Positions',
    question: 'What does the pitcher do?',
    answer: 'The pitcher throws the ball to the catcher, trying to get strikes or make the batter hit the ball weakly. They also field balls hit near them and cover first base on balls hit to the right side.',
    emoji: '🎯'
  },
  {
    id: 'catcher-role',
    category: 'Positions',
    question: 'What does the catcher do?',
    answer: 'The catcher catches pitches, calls what pitch to throw, blocks wild pitches, throws out runners trying to steal, and fields bunts. They\'re like the quarterback of the defense!',
    emoji: '🧤'
  },
  {
    id: 'shortstop-role',
    category: 'Positions',
    question: 'Why is shortstop important?',
    answer: 'The shortstop covers a lot of ground between 2nd and 3rd base and handles many ground balls. They need quick reflexes, a strong arm, and good instincts. Often the best athlete on the team plays shortstop.',
    emoji: '⭐'
  },
  {
    id: 'batting-order',
    category: 'Strategy',
    question: 'What is the batting order?',
    answer: 'The batting order is the sequence in which players bat. It stays the same throughout the game. In Little League, all players usually bat even if they don\'t play in the field. In MLB, only the 9 players in the field bat (except in the American League with the DH).',
    emoji: '📋'
  },
  {
    id: 'sacrifice-bunt',
    category: 'Strategy',
    question: 'What is a sacrifice bunt?',
    answer: 'A sacrifice bunt is when a batter intentionally taps the ball softly to advance a runner, knowing they\'ll likely be thrown out at first. It\'s called a "sacrifice" because the batter gives up their at-bat to help the team.',
    emoji: '🎁'
  },
  {
    id: 'stolen-base',
    category: 'Strategy',
    question: 'How do stolen bases work?',
    answer: 'A runner can try to advance to the next base while the pitcher is throwing. They take off running and try to reach the base before the catcher throws them out. Fast runners with good timing can steal bases successfully.',
    emoji: '💨'
  },
  {
    id: 'double-play',
    category: 'Strategy',
    question: 'What is a double play?',
    answer: 'A double play is when the defense gets 2 outs on one batted ball. The most common is a ground ball to the shortstop or second baseman, who throws to second base for one out, then to first base for the second out (6-4-3 or 4-6-3).',
    emoji: '⚡⚡'
  },
  {
    id: 'count-strategy',
    category: 'Strategy',
    question: 'How does the count affect strategy?',
    answer: 'The count (balls-strikes) changes everything! 3-0: Pitcher must throw a strike, batter can be picky. 0-2: Batter is defensive, pitcher can throw anything. 3-2: Full count, runners go on the pitch, maximum tension!',
    emoji: '🎲'
  },
  {
    id: 'little-league-pitch-count',
    category: 'Little League',
    question: 'What are pitch count rules?',
    answer: 'Little League has strict pitch count limits to protect young arms: 50 pitches for 7-8 year olds, 75 for 9-10, 85 for 11-12. Pitchers need rest days based on how many pitches they threw. This prevents arm injuries.',
    emoji: '🛡️'
  },
  {
    id: 'little-league-mercy',
    category: 'Little League',
    question: 'What is the mercy rule?',
    answer: 'If one team is ahead by 10 or more runs after 4 innings (or 3.5 if the home team is ahead), the game ends. This keeps games from becoming too lopsided and keeps it fun for everyone.',
    emoji: '🤝'
  },
  {
    id: 'little-league-equipment',
    category: 'Little League',
    question: 'What equipment is required?',
    answer: 'All batters and base runners must wear batting helmets. Catchers need full gear (helmet with face mask, chest protector, shin guards). Some leagues require face guards on helmets. Metal cleats are usually not allowed.',
    emoji: '⛑️'
  },
  {
    id: 'backyard-simplified',
    category: 'Backyard',
    question: 'How can we simplify rules for backyard games?',
    answer: 'For backyard fun: Play fewer innings (3-5), allow unlimited foul balls, don\'t worry about balks or check swings, let everyone bat each inning, use a softer ball, adjust base distances, and focus on having fun rather than perfect rules!',
    emoji: '🏡'
  },
  {
    id: 'backyard-equipment',
    category: 'Backyard',
    question: 'What do we need for backyard baseball?',
    answer: 'Minimum: a bat, a ball (tennis ball or soft baseball), and 4 bases (can use anything - bags, towels, frisbees). Optional: gloves, batting helmet, cones for foul lines. You can play with just 2 people or a whole group!',
    emoji: '🎒'
  },
  {
    id: 'encouragement',
    category: 'Parent Tips',
    question: 'How should I encourage my son?',
    answer: 'Focus on effort and improvement, not results. Celebrate good plays by both teams. Don\'t criticize umpires. Ask "Did you have fun?" not "Did you win?" Be positive even after mistakes - baseball is a game of failure (even .300 hitters fail 70% of the time)!',
    emoji: '❤️'
  },
  {
    id: 'watching-games',
    category: 'Parent Tips',
    question: 'How can I enjoy watching Little League games?',
    answer: 'Learn the basics (you\'re doing that now!), watch your son\'s position closely, notice improvement over time, chat with other parents, bring snacks, take photos, and remember - it\'s about the kids having fun and learning, not about winning.',
    emoji: '📸'
  }
];

export default function ReferencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(references.map(r => r.category)))];

  const filteredReferences = references.filter(ref => {
    const matchesSearch = ref.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              <span aria-hidden="true">📖</span> Quick Reference
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {/* Search Bar */}
        <section aria-label="Search" className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label htmlFor="reference-search" className="sr-only">
            Search for rules, positions, or situations
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" aria-hidden="true">🔍</span>
            <input
              id="reference-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for rules, positions, or situations..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
              aria-describedby="search-results-status"
            />
          </div>
        </section>

        {/* Category Filter */}
        <section aria-labelledby="category-heading" className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 id="category-heading" className="text-xl font-bold mb-4">Filter by Category:</h2>
          <div className="flex flex-wrap gap-3" role="group" aria-label="Category filter buttons">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </section>

        {/* Results status for screen readers */}
        <div id="search-results-status" className="sr-only" role="status" aria-live="polite">
          {filteredReferences.length === 0 
            ? 'No results found' 
            : `${filteredReferences.length} ${filteredReferences.length === 1 ? 'result' : 'results'} found`
          }
        </div>

        {/* Reference Items */}
        <section aria-label="Reference items">
          <h2 className="sr-only">Reference Questions</h2>
          <div className="space-y-4">
            {filteredReferences.length === 0 ? (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center" role="alert">
                <p className="text-xl text-gray-700">
                  No results found. Try a different search term or category!
                </p>
              </div>
            ) : (
              filteredReferences.map(ref => (
                <article
                  key={ref.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl"
                >
                  <h3>
                    <button
                      onClick={() => setExpandedId(expandedId === ref.id ? null : ref.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      aria-expanded={expandedId === ref.id}
                      aria-controls={`answer-${ref.id}`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-4xl" aria-hidden="true">{ref.emoji}</span>
                        <div>
                          <div className="text-sm text-gray-600 font-semibold mb-1">
                            {ref.category}
                          </div>
                          <div className="text-xl font-bold text-gray-900">
                            {ref.question}
                          </div>
                        </div>
                      </div>
                      <span className="text-2xl text-gray-500" aria-hidden="true">
                        {expandedId === ref.id ? '▼' : '▶'}
                      </span>
                    </button>
                  </h3>
                  
                  <div 
                    id={`answer-${ref.id}`}
                    className={`px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200 ${expandedId === ref.id ? '' : 'hidden'}`}
                    role="region"
                    aria-labelledby={`question-${ref.id}`}
                  >
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {ref.answer}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* Peanuts Quote */}
        <figure className="mt-8 bg-white rounded-lg shadow-lg p-6 text-center">
          <blockquote className="text-xl italic text-gray-700">
            "I think I've discovered the secret of life - you just hang around until you get used to it."
          </blockquote>
          <figcaption className="text-sm text-gray-600 mt-2">
            — Snoopy (Same goes for baseball rules! <span aria-hidden="true">🐕</span>)
          </figcaption>
        </figure>
      </main>
    </div>
  );
}

