import React from "react";

interface IGameController {
  hasWinner: boolean;
  incrementScoreA: () => void;
  incrementScoreB: () => void;
  resetMatch: () => void;
}

const GameController = ({ incrementScoreA, incrementScoreB, hasWinner, resetMatch }: IGameController) => {
  return (
    <>
      <div className="flex gap-8 mt-12">
        <button
          id="player-a-btn"
          onClick={incrementScoreA}
          disabled={hasWinner}
          className="py-4 px-8 bg-green-400 hover:bg-green-500 disabled:bg-green-200 rounded-md font-bold"
        >
          🎾 for A
        </button>
        <button
          id="player-b-btn"
          onClick={incrementScoreB}
          disabled={hasWinner}
          className="py-4 px-8 bg-red-400 hover:bg-red-500 disabled:bg-red-200 rounded-md font-bold"
        >
          🎾 for B
        </button>
      </div>

      <div className="mt-4">
        <button id="reset-btn" onClick={resetMatch} className="py-4 px-8 rounded-md hover:underline font-bold text-sm">
          reset match
        </button>
      </div>
    </>
  );
};

export default GameController;
