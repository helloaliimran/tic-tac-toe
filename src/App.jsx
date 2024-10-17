import { useState } from "react";
import { WINNING_COMBINATIONS } from "./Winning-Combination";

import Gameboard from "./Gameboard";
import Player from "./Player";
import Log from "./Log";
import GameOver from "./GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function ActivePlayer(playerTurn) {
  let currentPlayer = "X";
  if (playerTurn.length > 0 && playerTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function driveGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function driveWinner(gameBoard, player) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSimble =
      gameBoard[combination[0].row][combination[0].column];
    const secSquareSimble =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSimble =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSimble &&
      firstSquareSimble === secSquareSimble &&
      firstSquareSimble === thirdSquareSimble
    ) {
      winner = player[firstSquareSimble];
    }
  }
  return winner;
}

function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = ActivePlayer(gameTurn);
  const gameBoard = driveGameBoard(gameTurn);
  const winner = driveWinner(gameBoard, player);

  const isDraw = gameTurn.length === 9 && !winner;

  function handlePlayerNameChange(symbol, playerName) {
    setPlayer((laststate) => {
      return { ...laststate, [symbol]: playerName };
    });
  }

  function handleActivePlayerChange(rowIndex, colIndex) {
    setGameTurn((prevTurns) => {
      let currentPlayer = ActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematchClick() {
    setGameTurn([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRematchClick={handleRematchClick} />
        )}
        <Gameboard
          onSelectSquare={handleActivePlayerChange}
          turns={gameBoard}
        />
      </div>
      <Log turns={gameTurn}></Log>
    </main>
  );
}

export default App;
