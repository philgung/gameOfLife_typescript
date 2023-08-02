export class Position {
    private _grid : string [][];
    constructor(initial: string) {
        let rows = initial.split('\n');
        this._grid = [[]];
        rows.forEach((row, index) => {
            this._grid[index] = [...row].map(cell => cell);
        });
    }
    
    toString():string{
        let result = '';
        this._grid.forEach((row, index, array) => {
           if (index === array.length - 1){
               result += `${row.join('')}`;
           }
           else{
               result += `${row.join('')}\n`;
           }
        });
        return result;
    }

}