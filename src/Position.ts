// Cell 
//      (live/dead)
//      Neighbours (cells)
// Position (immutable)
//      override equals ?
class Cell {
    private readonly _status: string;
    constructor(cell: string) {
        this._status = cell;
    }

    toString(): string {
       return this._status; 
    }
}

export class Position {
    private readonly _grid: Cell [][];

    constructor(initial: string) {
        let rows = initial.split('\n');
        this._grid = [[]];
        rows.forEach((row, index) => {
            this._grid[index] = [...(row.trim())].map(cell => new Cell(cell));
        });
    }

    toString(): string {
        let result = '';
        this._grid.forEach((row, index, array) => {
            result += `${this.prefix(index)}${row.join('')}${this.suffix(index, array)}`;
        });
        return result;
    }   
    private prefix:Function = (index : number) => index === 0 ? '':' '.repeat(12);
    private suffix:Function =(index: number, array: string[][]) =>  index !== array.length - 1 ? '\n': '';
}