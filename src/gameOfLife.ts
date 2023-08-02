import {Position} from "./Position";

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