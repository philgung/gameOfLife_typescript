// Cell 
//      (live/dead)
// Position (immutable)
//      override equals ?
//      GetNeighbours(cell):cells
export class Cell {
    private readonly _status: string;
    static DeadCell = new Cell('.');
    constructor(cell: string) {
        this._status = cell;
    }

    toString(): string {
        return this._status;
    }
}

export class PositionParser {
    static parse(positionInput: string): Position {
        let rows = positionInput.split('\n');
        let grid: Cell[][] = [[]];
        rows.forEach((row, index) => {
            grid[index] = [...(row.trim())].map(cell => new Cell(cell));
        });
        return new Position(grid);
    }
}

export class Position {
    private readonly _grid: Cell [][];

    constructor(initial: Cell[][]) {
        this._grid = initial;
    }

    toString(): string {
        let result = '';
        this._grid.forEach((row, index, array) => {
            result += `${this.prefix(index)}${row.join('')}${this.suffix(index, array)}`;
        });
        return result;
    }

    private prefix: Function = (index: number) => index === 0 ? '' : ' '.repeat(12);
    private suffix: Function = (index: number, array: string[][]) => index !== array.length - 1 ? '\n' : '';
}