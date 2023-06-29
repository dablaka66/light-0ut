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

function Cell({ data,lit,flipCellsAroundMe }) {
  const classes = `Cell ${lit === "1" ? "Cell-lit" : "no lit"}`;
  console.log('Lit: ', lit);
  console.log('classes: ', classes);
  
  return <td id={data.x + "-" + data.y} className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
