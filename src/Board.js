import React, { useState } from "react";
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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let temp =[]; //
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    temp = Array.from({length: nrows}).map(
      row => Array.from({length: ncols}))
    initialBoard = temp.map(n =>  n.map(m => Math.random() > chanceLightStartsOn ? 1 : 0))
    return initialBoard;
  }
  //JD function to find cell around return a array
  function findCellsAround(x,y) {
      return [ [x,y],[(x -1),y],[x,(y-1)],[x,(y+1)],[(x+1),y] ]
  }
  //end
  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    //stand by to change the array -name  acording with the state parameter
    //
    return !board.map( f => f.some(x => x === 0)).some(x => x === true)//return true if it won
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);

     /*  const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it
          
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          let ini = boardCopy[x][y];
          boardCopy[x][y] = boardCopy[x][y] === 0 ?  1:0;
          console.log("x=" + x + " Y=" + y + "ini =" + ini + "end="+ boardCopy[x][y] );
        } */
        // ? flipCell shuld be defiane as le or const ???
        let flipCells = (cellToChange,boardCopy)=>{
          console.log('cellToChange: ', cellToChange);
          
          cellToChange.map(cell => {
            let x = cell[0];
            let y = cell[1];
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
              let ini = boardCopy[x][y];//where to init this variable ?//temp  to print
              boardCopy[x][y] = boardCopy[x][y] === 0 ?  1:0;
              //console.log("x=" + x + " Y=" + y + "ini =" + ini + "end="+ boardCopy[x][y] );
            } 
          })};
        
      

      // TODO: Make a (deep) copy of the oldBoard
      //const deepCopy = structuredClone(oldBoard);
      const deepCopy = oldBoard.map(row => [...row]);
      // TODO: in the copy, flip this cell and the cells around it
      /* const cellsAround = findCellsAround(x,y);
      cellsAround.map(i => console.log("x,y ",i[0] + " " + i[1]));
      const a = cellsAround.map(i => flipCell(i[0],i[1], deepCopy));
      return deepCopy; */
      flipCells(findCellsAround(x,y),deepCopy);
      //not sure what is the right parameter deepCopy/oldboard -- why we had to create another board
      // TODO: return the copy
      return deepCopy;

    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon(board)) {
    return <div>You Win!</div>;
  }
  // TODO
  function tempfun (evt) {
    console.log("evt ",evt.target.id);
    flipCellsAround(evt.target.id);
  }
  // make table board
  let tableBoard = [];
  let cellData;
  for (let x=0;  x< ncols; x++) {
    let row =[ ];
    for (let y=0 ; y< ncols; y++){
      cellData = {"x": x, "y" : y , "islit": board[x][y]}; 
      //console.log('cellData', cellData);
      row.push(
        <Cell 
          key={cellData.x + "-" + cellData.y}
          data = {cellData}
          lit = {cellData.islit}
          flipCellsAroundMe={(evt) => tempfun(event)}
          />
          );
          //flipCellsAroundMe={(evt) => flipCellsAround(EventTarget.cellData.x + "-" + cellData.y)} />
          //mycellsAround = {findCellsAround(x,y)}
          //
      
    }
    tableBoard.push(<tr key = {x}>{row}</tr>);
  }
  // TODO
  return <table className="Board"> 
    <tbody>{tableBoard}</tbody>
  </table>
}

export default Board;
