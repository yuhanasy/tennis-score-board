import React from "react";
import "tailwindcss/tailwind.css";
import { PlayerMatchScoreBoard, PlayerGameScoreBoard, GameController } from "./components";
import { useScoreBoard } from "./hooks";

function App() {
  const { mode, getGameScore, setScores, currentSet, matchScore, incrementScoreA, incrementScoreB, hasMatchWinner, resetMatch } =
    useScoreBoard();

  return (
    <div className="bg-gray-800 text-white font-mono min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-600 rounded-lg divide-y">
        <div className="relative flex flex-col gap-1 py-4 px-8">
          <div className="absolute top-4 right-8 py-0.5 px-4 rounded-sm bg-yellow-500 text-xs">
            {mode === "tiebreakers" ? "tiebreakers" : ""}
          </div>
          <PlayerMatchScoreBoard
            name="Player A"
            player="a"
            setScores={setScores}
            currentSet={currentSet}
            matchScore={matchScore}
            isWinner={hasMatchWinner(matchScore) === "a"}
          />
          <PlayerMatchScoreBoard
            name="Player A"
            player="b"
            setScores={setScores}
            currentSet={currentSet}
            matchScore={matchScore}
            isWinner={hasMatchWinner(matchScore) === "b"}
          />
        </div>

        <PlayerGameScoreBoard getGameScore={getGameScore} />
      </div>

      <GameController
        hasWinner={!!hasMatchWinner(matchScore)}
        incrementScoreA={incrementScoreA}
        incrementScoreB={incrementScoreB}
        resetMatch={resetMatch}
      />
    </div>
  );
}

export default App;
