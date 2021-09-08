export type player = "a" | "b";
export type gameScoreType = number;
export type setScoreType = number;
export type matchScoreType = 0 | 1 | 2;
export type mode = "normal" | "deuce" | "tiebreakers";

export type gameScores = {
  a: gameScoreType;
  b: gameScoreType;
};

export type setScores = {
  a: setScoreType;
  b: setScoreType;
};

export type matchScore = {
  a: matchScoreType;
  b: matchScoreType;
};
