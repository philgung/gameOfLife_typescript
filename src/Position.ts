import {v4 as uuidv4} from 'uuid';

export class Cell {
    private readonly _status: string;
    readonly identifier: string;
    static DeadCell = new Cell('.');
    static AliveCell = new Cell('*');
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

    isDead() {
        return !this.isAlive();
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

    GetCells(): Cell[][] {
        return this._board;
    }

    hasFewerThanTwoLiveNeighboors(cell: Cell): boolean {
        return this.findCellAndApplyToNeighboors(cell, neighboors =>
            neighboors.filter(neighboor => neighboor?.isAlive()).length < 2);
    }
    hasExactlyThreeLiveNeighboors(cell: Cell): boolean {
        return this.findCellAndApplyToNeighboors(cell, neighboors =>
            neighboors.filter(neighboor => neighboor?.isAlive()).length == 3);
    }

    hasMoreThanThreeLiveNeighboors(cell: Cell) {
        return this.findCellAndApplyToNeighboors(cell, neighboors => 
            neighboors.filter(neighboor => neighboor?.isAlive()).length > 3);
    }
   
    private findCellAndApplyToNeighboors(cell:Cell, predicate:PredicateType):boolean{
        return this._board.some((row, rowIndex) => {
            let columnIndex = row.findIndex(cellFromRow => cellFromRow.identifier == cell.identifier);
            if (columnIndex != -1) {
                return predicate(this.getNeighboors(rowIndex, columnIndex));
            }
        });
    }
    private getNeighboors(row:number, column:number): Cell[]{
        if (row < 0 || column < 0) return [];

        let neighboors: Cell[] = [];
        if (row >= 1){
            if (column >= 1){
                neighboors.push(this._board[row-1][column-1]);
            }
            neighboors.push(this._board[row-1][column]);
            neighboors.push(this._board[row-1][column+1]);
        }
        if (column >= 1){
            neighboors.push(this._board[row][column-1]);
            if (row < this._board.length - 1){
                neighboors.push(this._board[row+1][column-1]);
            }
        }
        if (row < this._board.length - 1) {
            neighboors.push(this._board[row + 1][column]);
        }
        neighboors.push(this._board[row][column+1]);
        if (row < this._board.length - 1) {
            neighboors.push(this._board[row + 1][column + 1]);
        }
        
        return neighboors;
    }

    private prefix: Function = (index: number) => index == 0 ? '' : ' '.repeat(12);

    private suffix: Function = (index: number, array: string[][]) => index !== array.length - 1 ? '\n' : '';
}

type PredicateType = (cell:Cell[]) => boolean;