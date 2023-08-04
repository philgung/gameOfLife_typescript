import {v4 as uuidv4} from 'uuid';

// Cell 
//      (live/dead)
// Position (immutable)
//      override equals ?
//      GetNeighbours(cell):cells
export class Cell {
    private readonly _status: string;
    readonly identifier: string;
    static DeadCell = new Cell('.');
    constructor(cell: string) {
        this._status = cell;
        this.identifier = uuidv4();
    }

    toString(): string {
        return this._status;
    }

    isAlive(): boolean {
        return this._status == '*';
    }
}

export class PositionParser {
    static parse(positionInput: string): Position {
        let rows = positionInput.split('\n');
        let grid: Cell[][] = [[]];
        rows.forEach((row, index) => {
            grid[index] = [...(row.trim())].map((cell) => 
                new Cell(cell));
        });
        return new Position(grid);
    }
}

export class Position {
    private readonly _board: Cell [][];

    constructor(initial: Cell[][]) {
        this._board = initial;
    }

    toString(): string {
        let result = '';
        this._board.forEach((row, index, array) => {
            result += `${this.prefix(index)}${row.join('')}${this.suffix(index, array)}`;
        });
        return result;
    }

    private prefix: Function = (index: number) => index === 0 ? '' : ' '.repeat(12);
    private suffix: Function = (index: number, array: string[][]) => index !== array.length - 1 ? '\n' : '';

    GetCells(): Cell[][] {
        return this._board;
    }

    hasFewerThanTwoLiveNeighboors(cell: Cell): boolean {
        this._board.forEach((row, rowIndex) => {
            row.forEach((cellFromRow, columnIndex) =>{
               if (cellFromRow.identifier == cell.identifier){
                   let neighboors:Cell[] = [
                       this._board[rowIndex - 1][columnIndex - 1],this._board[rowIndex - 1][columnIndex], this._board[rowIndex - 1][columnIndex + 1],
                       this._board[rowIndex][columnIndex - 1], this._board[rowIndex][columnIndex + 1],
                       this._board[rowIndex + 1][columnIndex - 1],this._board[rowIndex + 1][columnIndex], this._board[rowIndex + 1][columnIndex + 1]];
                   return neighboors.filter(neighboor => neighboor?.isAlive()).length < 2;
               } 
            });
        });
        return false;
    }
}