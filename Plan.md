# Sandlot-Wisdom - Plan

> **Purpose:** Requirements, research, and planning document
> - Problem statement and user needs
> - Feature requirements and scope
> - Research findings and decisions
> - NO technical implementation details (see CLAUDE.md for that)

## Problem Statement
A parent with minimal baseball knowledge needs an interactive, educational app to learn baseball alongside their 10-year-old son who is starting Little League. The app should make learning fun, provide practical knowledge for both casual backyard games and watching MLB, and include game tracking with playful commentary.

**Target Users:**
- Primary: Parents learning baseball to support their kids
- Secondary: Kids (10+) learning baseball fundamentals
- Context: Inspired by backyard baseball culture and timeless baseball wisdom

## Goals
- Create an engaging, interactive baseball learning experience for beginners
- Provide flexible game tracking for backyard games (simplified rules) and official Little League games
- Make learning fun with Peanuts-themed humor and playful commentary
- Build parent-child bonding through shared baseball knowledge

## Non-Goals
- Not a professional scouting or advanced analytics tool
- Not a replacement for coaching or formal instruction
- Not focused on fantasy baseball or betting
- Not a social network or multiplayer online game

## User Stories
- As a baseball-novice parent, I want to learn basic rules and terminology so I can understand what's happening at my son's games
- As a parent, I want to track scores during backyard games with my son so we can keep things fun and competitive
- As a learner, I want interactive quizzes and fun facts so I can gradually build my baseball knowledge
- As a user, I want to customize game rules (innings, simplified scoring) so we can play age-appropriate backyard games
- As a parent watching Little League, I want quick rule references so I can understand umpire calls and game situations
- As a competitive dad, I want playful commentary when I'm losing so the app keeps things lighthearted
- As a user, I want a nostalgic, encouraging theme that makes learning feel approachable and fun

## Feature Requirements

### MVP (Must Have) ✅ COMPLETE
- [x] **Learning Module**: Interactive baseball basics (positions, rules, terminology)
  - Beginner level: Basic positions, scoring, innings structure ✅
  - Intermediate level: Common plays, umpire signals, Little League rules ✅
  - Advanced level: MLB rules, strategy, game appreciation ✅
- [x] **Game Setup Wizard**: Configure custom games ✅
  - Number of innings (1-9 or unlimited) ✅
  - Rule complexity (simplified backyard vs. official Little League vs. MLB) ✅
  - Player names and team names ✅
- [x] **Score Tracker**: Real-time game scoring ✅
  - Inning-by-inning score entry ✅
  - Current score display ✅
  - Game history/archive ✅
- [x] **Playful Commentary**: Context-aware fun responses ✅
  - Encouraging messages when learning ✅
  - Gentle teasing when parent is losing to kid ✅
  - Sandlot wisdom and timeless baseball quotes ✅
- [x] **Quick Reference**: Searchable rules and situations ✅
  - "What happens if..." scenarios ✅
  - Position diagrams ✅
  - Common umpire calls ✅

### Future (Nice to Have)
- [ ] **Stats Tracking**: Player performance over multiple games
- [ ] **Achievement System**: Badges for learning milestones and game participation
- [ ] **Video Clips**: Short explanatory videos for complex rules
- [ ] **Practice Drills**: Suggested backyard drills with instructions
- [ ] **Little League Calendar**: Game schedule integration
- [ ] **Photo Journal**: Add photos from games with notes
- [ ] **Daily Tips**: Daily baseball tips or trivia notifications
- [ ] **Multi-player Support**: Track more than 2 players/teams
- [ ] **Export Stats**: Share game summaries via text/email

## Research & Decisions

### Platform Choice
- **Options Considered:** Native mobile app, Progressive Web App (PWA), Desktop app
- **Decision:** Progressive Web App (Next.js + React)
- **Rationale:** 
  - Works on any device (phone, tablet, laptop)
  - No app store approval needed
  - Easy to update and maintain
  - Can be "installed" on home screen
  - Single codebase for all platforms

### UI/UX Theme
- **Options Considered:** Realistic baseball aesthetic, Cartoon/playful, Backyard/Sandlot-inspired
- **Decision:** Dual-theme system: Sandlot Wisdom (default) + Private Mode (Peanuts-inspired)
- **Rationale:**
  - Default "Sandlot Wisdom" theme captures nostalgic backyard baseball without copyright concerns
  - Makes learning less intimidating for beginners
  - Differentiates from serious sports apps
  - Appeals to both kids and nostalgic parents
  - Private mode preserves original inspiration for personal use

### Data Storage
- **Options Considered:** Cloud database (Supabase), Local storage only, Hybrid
- **Decision:** Local storage (localStorage/IndexedDB) for MVP
- **Rationale:**
  - No login required (lower friction)
  - Works offline
  - Privacy-friendly (no data collection)
  - Can add cloud sync later if needed

### Learning Content Structure
- **Options Considered:** Linear lessons, Choose-your-own-path, Topic-based modules
- **Decision:** Topic-based modules with difficulty levels
- **Rationale:**
  - Users can jump to what they need (e.g., just learn positions)
  - Progressive difficulty accommodates different knowledge levels
  - Easy to expand content over time

## Success Metrics
- Parent can explain basic baseball rules after 30 minutes of app use
- Successfully track at least 5 backyard games
- User returns to app for quick rule lookups during Little League games
- Positive feedback on playful commentary (makes learning fun)
- Parent and child both engage with the app together

## Implementation Phases

### Phase 1: Ambient Listening for Game Tracking (Next - Priority)
**Goal:** Track backyard game scores from natural conversation

**The Challenge:** Filtering signal from noise when "that's a strike!" gets mixed with regular chatter. Unlike formal voice commands, backyard games have overlapping voices, excitement, disputes, and casual commentary.

**Tasks:**
- [ ] Research speech-to-text APIs with real-time streaming (Whisper, Deepgram, AssemblyAI)
- [ ] Build intent classifier: game events vs. casual conversation
- [ ] Handle ambiguity: "was that a strike?" vs. "that's a strike!"
- [ ] Multi-speaker detection (parent vs. kid voices)
- [ ] Confidence threshold for auto-logging vs. confirmation prompts
- [ ] "Undo last score" voice command for disputes
- [ ] Background listening mode with battery optimization
- [ ] Test in real backyard conditions (wind, distance, excitement levels)

**Success Criteria:**
- 80%+ accuracy distinguishing game events from chatter
- Works in noisy outdoor conditions
- No manual button presses during gameplay
- Natural dispute resolution ("wait, that wasn't a strike")

### Phase 2: Learning Module Enhancements (Future)
**Goal:** Enhance existing learning module with quizzes and visual aids

**Tasks:**
- [ ] Interactive quizzes after each module (not yet implemented)
- [ ] Visual diagrams for positions and field layout (enhance existing content)
- [ ] Common scenarios and umpire calls (expand existing quick reference)
- [ ] Store learning progress in localStorage (track quiz completion)

**Success Criteria:**
- Quizzes reinforce learning
- Progress tracked across sessions
- Enhanced visual aids for complex concepts

**Note:** Core learning module is complete with 3 difficulty levels and topic-based structure. This phase adds interactivity and progress tracking.

### Phase 3: Playful Commentary & Quick Reference (Week 5)
**Goal:** Fun engagement and rule lookups

**Tasks:**
- [ ] Context-aware commentary system
- [ ] Sandlot wisdom quotes and references
- [ ] Gentle teasing when parent losing
- [ ] Quick reference search (rules, situations)
- [ ] Position diagrams
- [ ] "What happens if..." scenarios

**Success Criteria:**
- Commentary feels natural and fun
- Parents laugh at playful teasing
- Quick reference is actually useful during games
- Theme captures nostalgic backyard baseball spirit

### Phase 4: Stats & Achievements (Week 6-7)
**Goal:** Track progress and celebrate milestones

**Tasks:**
- [ ] Player stats over multiple games
- [ ] Achievement badges (learning milestones, games played)
- [ ] Best game highlights
- [ ] Win/loss records
- [ ] Practice drill suggestions
- [ ] Share game summaries

**Success Criteria:**
- Stats motivate continued play
- Achievements feel rewarding
- Easy to share accomplishments
- Drills improve skills

### Phase 5: Enhanced Content (Week 8-9)
**Goal:** Richer learning materials

**Tasks:**
- [ ] Short video clips for complex rules
- [ ] Practice drill video demonstrations
- [ ] Daily baseball tips
- [ ] Little League calendar integration
- [ ] Photo journal (add photos from games)
- [ ] Multi-player game tracking

**Success Criteria:**
- Videos clarify confusing rules
- Drills are easy to follow
- Calendar keeps games organized
- Photos preserve memories

## Open Questions
- [ ] Should we include pitch counting for Little League safety rules?
- [ ] How detailed should position-specific learning be (e.g., catcher signals)?
- [ ] Should we include any video content or stick to text/images?
- [ ] Do we need a "coach mode" for parents who become team coaches?
- [ ] Should game history be exportable/shareable?

---

## 🎯 NEXT FOCUS

**Priority:** Phase 1 - Ambient Listening for Game Tracking

**Current Status:** MVP features complete (Learning Module, Game Setup, Score Tracker, Commentary, Quick Reference all working). Ready to build voice-based game tracking.

**Next Steps:**
1. Research speech-to-text APIs (Whisper, Deepgram, AssemblyAI)
2. Build intent classifier (game events vs. casual conversation)
3. Handle ambiguity and multi-speaker detection
4. Implement background listening mode
5. Test in real backyard conditions

**Note:** MVP is fully functional for manual game tracking. Phase 1 adds hands-free voice tracking for a more seamless experience.

---

**Last Updated:** 2025-12-24
