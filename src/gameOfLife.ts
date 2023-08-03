import {Position, Cell} from "./Position";

export class GameOfLife {
    private _current: Position;
    constructor(initial: Position) {
        this._current = initial;
    }

    Generate(): Position {
        let board : Cell[][] = [[]];
        // TODO : how to navigate in board ? double foreach ? recursive function ? or else ?
        
        return new Position(
            [[Cell.DeadCell, Cell.DeadCell, Cell.DeadCell],
            [Cell.DeadCell, Cell.DeadCell, Cell.DeadCell],
            [Cell.DeadCell, Cell.DeadCell, Cell.DeadCell]]);
    }
}