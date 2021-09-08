import { useState, useEffect } from "react";
import { player, gameScoreType, gameScores, setScores, matchScore, mode } from "../types";

const initialGameScores: gameScores = { a: 0, b: 0 };
const initialSetScores: setScores = { a: 0, b: 0 };
const initialMatchScores: matchScore = { a: 0, b: 0 };

export const useScoreBoard = () => {
  const [gameScores, setGameScores] = useState<gameScores>(initialGameScores);
  const [setScores, setSetScores] = useState<setScores[]>([initialSetScores]);
  const [matchScore, setMatchScore] = useState<matchScore>(initialMatchScores);
  const [currentSet, setCurrentSet] = useState(0);
  const [mode, setMode] = useState<mode>("normal");

  const hasAdvantage = (gameScores: gameScores) => {
    if (gameScores.a >= 4 && gameScores.a === gameScores.b + 1) {
      return true;
    }
    if (gameScores.b >= 4 && gameScores.b === gameScores.a + 1) {
      return true;
    }
    return false;
  };

  const hasGameWinner = (gameScores: gameScores) => {
    if (gameScores.a >= 4 && gameScores.a >= gameScores.b + 2) {
      return true;
    }
    if (gameScores.b >= 4 && gameScores.b >= gameScores.a + 2) {
      return true;
    }
    return false;
  };

  const hasTiebreakerWinner = (gameScores: gameScores) => {
    if (gameScores.a >= 7 && gameScores.a >= gameScores.b + 2) {
      return true;
    }
    if (gameScores.b >= 7 && gameScores.b >= gameScores.a + 2) {
      return true;
    }
    return false;
  };

  const hasSetWinner = (currentSetScore: setScores) => {
    if (currentSetScore.a === 6 && currentSetScore.b === 6) {
      if (mode === "tiebreakers" && hasTiebreakerWinner(gameScores)) {
        console.log("tiebreaker winner");
        setMode("normal");
        return true;
      }
      setMode("tiebreakers");
      return false;
    }
    if (currentSetScore.a >= 6 && currentSetScore.a >= currentSetScore.b + 2) {
      return true;
    }
    if (currentSetScore.b >= 6 && currentSetScore.b >= currentSetScore.a + 2) {
      return true;
    }
    return false;
  };

  const hasMatchWinner = (matchScore: matchScore): player | false => {
    if (matchScore.a === 2) {
      return "a";
    }
    if (matchScore.b === 2) {
      return "b";
    }
    return false;
  };

  const checkGameHighestScore = (): player => {
    return gameScores.a > gameScores.b ? "a" : "b";
  };

  const checkSetHighestScore = (): player => {
    return setScores[currentSet].a > setScores[currentSet].b ? "a" : "b";
  };

  const incrementScoreA = () => {
    setGameScores((gameScores) => ({ ...gameScores, a: gameScores.a + 1 }));
  };

  const incrementScoreB = () => {
    setGameScores((gameScores) => ({ ...gameScores, b: gameScores.b + 1 }));
  };

  const incrementCurrentSetScore = (player: player) => {
    const currentSetScores = [...setScores];
    const currentSetScore = { ...currentSetScores[currentSet] };
    const newSetScore = { ...currentSetScore, [player]: currentSetScore[player] + 1 };
    currentSetScores[currentSet] = newSetScore;

    setSetScores(currentSetScores);
  };

  const createNewSet = () => {
    if (currentSet < 2) {
      setSetScores((setScores) => [...setScores, initialSetScores]);
      setCurrentSet((currentSet) => currentSet + 1);
    }
  };

  const resetGame = () => {
    setGameScores(initialGameScores);
  };

  const resetMatch = () => {
    setGameScores(initialGameScores);
    setSetScores([initialSetScores]);
    setMatchScore(initialMatchScores);
    setCurrentSet(0);
    setMode("normal");
  };

  useEffect(() => {
    if (hasSetWinner(setScores[currentSet])) {
      const setWinner = checkSetHighestScore();
      setMatchScore((matchScore) => ({ ...matchScore, [setWinner]: matchScore[setWinner] + 1 }));
      createNewSet();
    }
  }, [setScores]);

  useEffect(() => {
    if (mode === "tiebreakers" && hasTiebreakerWinner(gameScores)) {
      const setWinner = checkGameHighestScore();
      incrementCurrentSetScore(setWinner);
      setMatchScore((matchScore) => ({ ...matchScore, [setWinner]: matchScore[setWinner] + 1 }));
      createNewSet();
      resetGame();
      setMode("normal");
    }

    if (mode === "normal" && hasGameWinner(gameScores)) {
      const gameWinner = checkGameHighestScore();
      incrementCurrentSetScore(gameWinner);
      resetGame();
    }
  }, [gameScores, mode]);

  const getScoreString = (score: gameScoreType) => {
    switch (score) {
      case 0:
        return "0";
      case 1:
        return "15";
      case 2:
        return "30";
      case 3:
        return "40";
      default:
        return "40";
    }
  };

  const getGameScore = (player: player): string => {
    if (mode === "tiebreakers") {
      return String(gameScores[player]);
    }

    if (hasAdvantage(gameScores) && checkGameHighestScore() === player) {
      return "adv";
    }

    return getScoreString(gameScores[player]);
  };

  const tiebreakerSet = () => {
    const newSetScores = [...setScores];
    newSetScores[currentSet] = { a: 6, b: 6 };
    setSetScores(newSetScores);
    setGameScores({ a: 0, b: 0 });
  };

  return {
    mode,
    gameScores,
    setGameScores,
    setScores,
    setSetScores,
    matchScore,
    setMatchScore,
    currentSet,
    setCurrentSet,
    hasAdvantage,
    hasGameWinner,
    hasTiebreakerWinner,
    hasSetWinner,
    hasMatchWinner,
    checkGameHighestScore,
    checkSetHighestScore,
    incrementScoreA,
    incrementScoreB,
    incrementCurrentSetScore,
    resetGame,
    resetMatch,
    getGameScore,
    tiebreakerSet,
  };
};
