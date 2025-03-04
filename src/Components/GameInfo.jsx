import React from "react";
export function GameInfo({ roundCounter, gameCounter, X_turn, scoreboard }) {
  return (
    <div className="game-info">
      <div className="counter-wrapper">
        <p>Round: {roundCounter}</p>
        <p>Game: {gameCounter}</p>
      </div>
      <div className="score-wrapper">
        <p className={X_turn ? "X-colour" : "O-colour"}>
          {`${X_turn ? "X" : "O"}'s turn`}
        </p>
      </div>
      <div className="score-wrapper">
        <p className="X-colour"> {`X Wins: ${scoreboard.xScore}`} </p>
        <p className="O-colour"> {`O Wins: ${scoreboard.oScore}`} </p>
      </div>
    </div>
  );
}
