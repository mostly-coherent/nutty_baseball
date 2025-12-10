// Playful Peanuts-themed commentary system

interface CommentaryContext {
  team1Score: number;
  team2Score: number;
  inning: number;
  team1Name: string;
  team2Name: string;
}

export const getCommentary = (context: CommentaryContext): string => {
  const { team1Score, team2Score, inning, team1Name, team2Name } = context;
  const scoreDiff = Math.abs(team1Score - team2Score);
  const isWinning = team1Score > team2Score;
  const isTied = team1Score === team2Score;
  const isLosing = team1Score < team2Score;

  // Tied game
  if (isTied) {
    const tiedComments = [
      "It's a tie! Just like Charlie Brown's chances of winning... wait, that's not encouraging! 😅",
      "Tied up! This game is tighter than Linus's grip on his blanket! 🧸",
      "All square! Even Snoopy couldn't predict this one! 🐕",
      "Neck and neck! This is more suspenseful than waiting for the Great Pumpkin! 🎃",
      "Dead even! Lucy would charge 5 cents for advice on how to break this tie! 💰"
    ];
    return tiedComments[Math.floor(Math.random() * tiedComments.length)];
  }

  // Winning by a lot
  if (isWinning && scoreDiff >= 5) {
    const bigWinComments = [
      `${team1Name} is crushing it! Even Charlie Brown would be proud! 🎉`,
      `Wow! ${team1Name} is on fire! Snoopy's doing his happy dance! 🕺`,
      `${team1Name} is dominating! This is better than a kite that actually flies! 🪁`,
      `${team2Name} might need Lucy's psychiatric help after this one! 😂`,
      `${team1Name} is unstoppable! Good grief, what a performance! ⚾`
    ];
    return bigWinComments[Math.floor(Math.random() * bigWinComments.length)];
  }

  // Losing by a lot (gentle teasing)
  if (isLosing && scoreDiff >= 5) {
    const bigLossComments = [
      `${team1Name} is down by ${scoreDiff}... but Charlie Brown lost 999 games in a row and never gave up! 💪`,
      `Oof! ${team2Name} is really bringing it today. Time to channel your inner Peppermint Patty! 🏃`,
      `${team1Name} is struggling, but remember: "In the book of life, the answers aren't in the back!" Keep playing! 📖`,
      `Down by ${scoreDiff}? That's nothing! Charlie Brown once got hit by a line drive and kept playing! 😅`,
      `${team2Name} is ahead, but it ain't over 'til it's over! Even Snoopy believes in comebacks! 🐕`,
      `Losing by ${scoreDiff}? Good grief! But hey, at least the kite isn't stuck in a tree! 🪁`
    ];
    return bigLossComments[Math.floor(Math.random() * bigLossComments.length)];
  }

  // Close game - winning
  if (isWinning && scoreDiff <= 2) {
    const closeWinComments = [
      `${team1Name} leads by ${scoreDiff}! Keep it up, blockhead! 😄`,
      `Narrow lead for ${team1Name}! Don't pull a Charlie Brown and lose it now! ⚾`,
      `${team1Name} is ahead! Snoopy approves! 🐕`,
      `Close game! ${team1Name} is showing some Peppermint Patty energy! 💪`
    ];
    return closeWinComments[Math.floor(Math.random() * closeWinComments.length)];
  }

  // Close game - losing
  if (isLosing && scoreDiff <= 2) {
    const closeLossComments = [
      `${team1Name} is down by just ${scoreDiff}! Rally time! 📣`,
      `Only down by ${scoreDiff}? That's nothing! Time for a comeback! 💪`,
      `${team2Name} leads by ${scoreDiff}, but this game isn't over! Go get 'em! ⚾`,
      `Close game! ${team1Name} can still pull this off! 🎯`
    ];
    return closeLossComments[Math.floor(Math.random() * closeLossComments.length)];
  }

  // Default
  return `${team1Name}: ${team1Score}, ${team2Name}: ${team2Score}. Keep playing! ⚾`;
};

export const getInningCommentary = (inning: number, totalInnings: number): string => {
  if (inning === 1) {
    return "Play ball! Let's have some fun out there! ⚾";
  }
  if (inning === totalInnings) {
    return "Final inning! Give it everything you've got! 🔥";
  }
  if (inning === Math.floor(totalInnings / 2)) {
    return "Halfway there! Time for some Cracker Jack! 🥜";
  }
  return `Inning ${inning}! Keep that baseball spirit alive! 💪`;
};

export const getGameEndCommentary = (winner: string, loser: string, finalScore: { winner: number, loser: number }): string => {
  const scoreDiff = finalScore.winner - finalScore.loser;

  // Handle tie game
  if (scoreDiff === 0 || winner === 'Tie') {
    return `It's a tie, ${finalScore.winner}-${finalScore.loser}! Just like Charlie Brown's kite - stuck in the middle! Nobody wins, nobody loses! 🤝`;
  }

  if (scoreDiff >= 10) {
    return `${winner} wins big, ${finalScore.winner}-${finalScore.loser}! That was a shellacking! Even Lucy would be impressed! 🏆`;
  }
  
  if (scoreDiff >= 5) {
    return `${winner} takes it, ${finalScore.winner}-${finalScore.loser}! Great game! Snoopy's doing his victory dance! 🎉`;
  }
  
  if (scoreDiff <= 2 && scoreDiff > 0) {
    return `${winner} wins a nail-biter, ${finalScore.winner}-${finalScore.loser}! What a game! Charlie Brown would be proud! ⚾`;
  }

  return `${winner} wins, ${finalScore.winner}-${finalScore.loser}! Good game, everyone! 🎊`;
};

export const getStartGameQuote = (): string => {
  const quotes = [
    "\"I've developed a new philosophy... I only dread one day at a time.\" - Charlie Brown (But today, we PLAY! ⚾)",
    "\"Keep looking up... that's the secret of life!\" - Snoopy 🐕",
    "\"In the book of life, the answers aren't in the back.\" - Charlie Brown 📖",
    "\"Learn from yesterday, live for today, look to tomorrow, rest this afternoon.\" - Charlie Brown ☀️",
    "\"All you need is love. But a little chocolate now and then doesn't hurt.\" - Lucy (Or baseball! ⚾)"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

