import {Cell, Position} from "./Position";

export class GameOfLife {
    private _current: Position;

    constructor(initial: Position) {
        this._current = initial;
    }

    Generate(): Position {
        let board: Cell[][] = [];
        this._current.GetCells().forEach((rows) => {
            board.push(this.getRowFromBoard(rows));
        });
        return new Position(board);
    }

    private getRowFromBoard(rows: Cell[]): Cell[] {
        return rows.map(cell => {
            if (cell.isAlive() && this._current.hasFewerThanTwoLiveNeighboors(cell)) {
                return new Cell('.');
            } else if (cell.isDead() && this._current.hasExactlyThreeLiveNeighboors(cell)) {
                return new Cell('*');
            } else {
                return cell;
            }
        });
    }
}