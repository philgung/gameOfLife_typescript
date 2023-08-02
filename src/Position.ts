export class Position {
    private readonly _grid: string [][];

    constructor(initial: string) {
        let rows = initial.split('\n');
        this._grid = [[]];
        rows.forEach((row, index) => {
            this._grid[index] = [...row].map(cell => cell);
        });
    }

    toString(): string {
        let result = '';
        this._grid.forEach((row, index, array) => {
            result += `${row.join('')}${this.newLine(index, array)}`;
        });
        return result;
    }

    private newLine:Function =(index: number, array: string[][]) =>  index !== array.length - 1 ? '\n': '';
}