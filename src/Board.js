import React, {useState} from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({nrows = 5, ncols = 5, chanceLightStartsOn = 0.25}) {
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    return Array.from({length: nrows}).map(
        row => Array.from({length: ncols}).map(
            cell => Math.random() < chanceLightStartsOn
        )
    );
  }

  /** Check if the player has won */
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /** Flip cells around a given cell */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };


      //TODO: Make a (deep) copy of the oldBoard

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // make table board: rows of Cell components

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
  );
}

export default Board;


// import React, { useState } from "react";
// import Cell from "./Cell";
// import "./Board.css";

// /** Game board of Lights out.
//  *
//  * Properties:
//  *
//  * - nrows: number of rows of board
//  * - ncols: number of cols of board
//  * - chanceLightStartsOn: float, chance any cell is lit at start of game
//  *
//  * State:
//  *
//  * - board: array-of-arrays of true/false
//  *
//  *    For this board:
//  *       .  .  .
//  *       O  O  .     (where . is off, and O is on)
//  *       .  .  .
//  *
//  *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
//  *
//  *  This should render an HTML table of individual <Cell /> components.
//  *
//  *  This doesn't handle any clicks --- clicks are on individual cells
//  *
//  **/

// function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.25 }) {
//   const [board, setBoard] = useState(createBoard);

//   /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  
//   function createBoard() {
//     let initialBoard = [];
//     // TODO: create array-of-arrays of true/false values

//     let trueFalse = ()=> (Math.random()*1 < chanceLightStartsOn? true : false)

//     for(let i=0; i < nrows; i++) {
//       let row = []
//       for(let j = 0 ; j < ncols; j++) {
//         row.push(trueFalse())
//       }
//       initialBoard.push(row)
//     }

//     return initialBoard;
//   }

//   function hasWon() {
//     // TODO: check the board in state to determine whether the player has won.
//     return board.every(row => row.every(cell => !cell))
//   }

//   function flipCellsAround(coord) {
//     setBoard(oldBoard => {
//       const [y, x] = coord.split("-").map(Number); //splits coord (0-2) into two variables y=0, x=2

//       const flipCell = (y, x, boardCopy) => {
//         // if this coord is actually on board, flip it

//         if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
//           boardCopy[y][x] = !boardCopy[y][x];
//         }
//       };

//       // TODO: Make a (deep) copy of the oldBoard

//       function deepCopyArray(arr) {
//         return arr.map(item => deepCopyArray(item));
//       }

//       const newBoard = deepCopyArray(oldBoard)

//       // TODO: in the copy, flip this cell and the cells around it
//       flipCell(y, x, newBoard)

//       const directions = [
//         { y: -1, x: 0 }, // Up
//         { y: 1, x: 0 },  // Down
//         { y: 0, x: -1 }, // Left
//         { y: 0, x: 1 },  // Right
//       ];
      
//       function getAdjacentCells(board, y, x) {
//         const adjacentCells = [];
      
//         for (const direction of directions) {
//           const newY = y + direction.y;
//           const newX = x + direction.x;
      
//           // Check if the new indices are within bounds
//           if (
//             newY >= 0 &&
//             newY < board.length &&
//             newX >= 0 &&
//             newX < board[0].length
//           ) {
//             // Add the adjacent cell to the result
//             adjacentCells.push({ y: newY, x: newX });
//           }
//         }
      
//         return adjacentCells;
//       }
      
//       const adjacentCells = getAdjacentCells(oldBoard, y, x)


//       for(let cell of adjacentCells){
//       flipCell(cell.y, cell.x, newBoard)
    
//       }
     

//       // TODO: return the copy

//       return newBoard;
//     });
//   }

//   // if the game is won, just show a winning msg & render nothing else

//   if(hasWon()) return <div>You Win!</div>

//   // TODO

//   // make table board

//   let tblBoard = [];

//   for(let y=0; y < nrows; y++){
//     let row = []
//     for(let x = 0; x < ncols; x++){
//       let coord = `${y}-${x}`
//       row.push*=(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={evt => {flipCellsAround(coord)}} />)
//     }
//     tblBoard.push(<tr key={y}>{row}</tr>)
//   }

//   return (
//     <div className="Board">
//       <table>
//         <tbody>
//         {tblBoard}
//         </tbody>
//       </table>
//     </div>
//   );
  

//   // TODO
// }

// export default Board;

