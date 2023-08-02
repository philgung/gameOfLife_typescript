import {Position} from "./Position";

// Cell 
//      (live/dead)
//      Neighbours (cells)

// GameOfLife

// Position (immutable)
//      override equals ?

export class GameOfLife {
    private _current: Position;
    constructor(initial: Position) {
        this._current = initial;
    }

    Generate(): Position {
        return new Position(
            `........
            ...**...
            ...**...
            ........`);
    }
}