import React from "react";
import { player } from "../types";

interface IPlayerGameScoreBoard {
  getGameScore: (player: player) => string;
}

const PlayerGameScoreBoard = ({ getGameScore }: IPlayerGameScoreBoard) => {
  return (
    <div className="flex py-4 px-8 divide-x">
      <div>
        <div className="text-sm text-center mb-4">Player A</div>
        <div id="player-a-score" className="font-bold text-8xl w-56 text-center">
          {getGameScore("a")}
        </div>
      </div>
      <div>
        <div className="text-sm text-center mb-4">Player B</div>
        <div id="player-b-score" className="font-bold text-8xl w-56 text-center">
          {getGameScore("b")}
        </div>
      </div>
    </div>
  );
};

export default PlayerGameScoreBoard;
