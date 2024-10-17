import { useState } from "react";


export default function Gameboard({onSelectSquare, turns}) {
    // let gameBoard = initialGameboard;

    // for(const turn of turns){
    //     const {square, player} = turn;
    //     const {row, col} = square;
    //     gameBoard[row][col]=player;
    // }
//   const [gameBoard, setGameBoard] = useState(initialGameboard);

//   function handleClickGameBoard(rowIndex, colIndex) {
//     setGameBoard((preGameBoard) => {
//       const updateGameBoard = [...preGameBoard.map((intarray) => intarray)];
//       updateGameBoard[rowIndex][colIndex] = activePlayerSymbol;
//       return updateGameBoard;
//     });

//     onSelectSquare();
//   }

  return (
    <ol id="game-board">
      {turns.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
