import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ data,flipCellsAroundMe }) {
  let clases = " Cell "
  if (data.islit === 1 ){
    clases = clases +  "Cell-lit"; 
  } 
  //const classes = `Cell ${data.islit} === 1 ? "Cell-lit" : "no lit"`;
  //console.log('Lit: ', lit);
  //console.log('clases: ', clases);
  
  return <td id={data.x + "-" + data.y} className={clases} onClick={flipCellsAroundMe} />;
}

export default Cell;
