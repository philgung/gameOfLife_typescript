import {GameOfLife} from "../src/gameOfLife";
import {Cell, Position, PositionParser} from "../src/Position";

describe('GameOfLife - Acceptance tests', () => {
    it('Generation 1 -> Generation 2', () => {
        let game = initializeGame(
            `........
        ....*...
        ...**...
        ........`);
        
        const next = game.Generate();

        //console.log(`${next.toString()}`);
        const expectedOutput =
            `........
            ...**...
            ...**...
            ........`;
        expect(next.toString()).toBe(expectedOutput);
    });
});

describe('Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', () => {
    const allCellsDied =
        `...
            ...
            ...`;

    it('A live cell with none live neighbours has to die', () => {
        let game = initializeGame(`...
                .*.
                ...`);
        
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it('A live cell with one live neighbour has to die', () => {
        let game = initializeGame(`...
                .**
                ...`);
        
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it('A live cell with two live neighbours has to live', () => {
        let game = initializeGame(`...
                ***
                ...`);
        
        const next = game.Generate();
        expect(next.toString()).toBe(
            `...
            .*.
            ...`);
    });
});

describe('Any dead cell with exactly three live neighbours becomes a live cell.', () => {
    it('A dead cell with three live neighbours has to become a live cell', () => {
        let game = initializeGame(`..*
                *..
                .*.`);

        const next = game.Generate();
        console.log(`${next.toString()}`);
        expect(next.toString()).toBe(`...
                .*.
                ...`);
    });

});

const initializeGame : Function = (initial:string): GameOfLife => 
    new GameOfLife(PositionParser.parse(initial));

// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// You should write a program that can accept an arbitrary grid of cells, and will 
// output a similar grid showing the next generation.

describe('Position tests', () =>{
   it('A cell with two live neighboors', () => {
       let cellToTest = new Cell('*');
       let position = new Position([
           [new Cell('.'), new Cell('.'), new Cell('.'), new Cell('.')],
           [new Cell('*'), cellToTest, new Cell('*'), new Cell('.')],
           [new Cell('.'), new Cell('.'), new Cell('.'), new Cell('.')]]);
       expect(position.hasFewerThanTwoLiveNeighboors(cellToTest)).toBe(false);
   });
    it('A cell with one live neighboor', () => {
        let cellToTest = new Cell('*');
        let position = new Position([
            [new Cell('.'), new Cell('.'), new Cell('.'), new Cell('.')],
            [new Cell('*'), new Cell('*'), cellToTest, new Cell('.')],
            [new Cell('.'), new Cell('.'), new Cell('.'), new Cell('.')]]);
        expect(position.hasFewerThanTwoLiveNeighboors(cellToTest)).toBe(true);
    })
});