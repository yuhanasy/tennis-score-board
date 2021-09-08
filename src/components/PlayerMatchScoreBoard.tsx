import React from "react";
import { player, setScores, matchScore } from "../types";

interface IPlayerMatchScoreBoard {
  player: player;
  name: string;
  setScores: setScores[];
  currentSet: number;
  matchScore: matchScore;
  isWinner: boolean;
}

const PlayerMatchScoreBoard = ({ player, name, setScores, currentSet, matchScore, isWinner }: IPlayerMatchScoreBoard) => {
  return (
    <div className="flex">
      <div className="w-32 h-8 px-2 flex items-center">{name}</div>
      <div className="flex">
        {setScores.map((setScore, idx) => {
          const className = `w-8 h-8 grid place-items-center font-semibold ${idx === currentSet ? "rounded-sm border" : ""}`;
          return (
            <div className={className} key={idx}>
              {setScore[player]}
            </div>
          );
        })}
      </div>
      <div className="bg-gray-400 rounded-sm w-8 h-8 grid place-items-center font-semibold ml-1">{matchScore[player]}</div>
      {isWinner && <div className="bg-yellow-400 rounded-sm w-8 h-8 grid place-items-center font-semibold ml-1">🏆</div>}
    </div>
  );
};

export default PlayerMatchScoreBoard;
