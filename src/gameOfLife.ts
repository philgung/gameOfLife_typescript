import {Position} from "./Position";

// Cell 
//      (live/dead)
//      Neighbours (cells)

// GameOfLife
//      Import Starting Position (ctor ??)
//      Generate -> next Position
//      Current : Position

// Position (immutable)
//      Display output
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