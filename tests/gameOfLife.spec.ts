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

        const expectedOutput =
            `........
            ...**...
            ...**...
            ........`;
        expect(next.toString()).toBe(expectedOutput);
    });

    it('Generation 1 -> Generation 3 (Glider)', () => {
        let game = initializeGame(
       `...*....
        ....*...
        ..***...
        ........`);

        const generation2 = game.Generate();
        const expectedOutput2 =
            `........
            ..*.*...
            ...**...
            ...*....`;
        expect(generation2.toString()).toBe(expectedOutput2);
        
        const generation3 = game.Generate();
        const expectedOutput =
            `........
            ....*...
            ..*.*...
            ...**...`;
        expect(generation3.toString()).toBe(expectedOutput);
    });

});

describe('Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', () => {
    const allCellsDied =
        `...
            ...
            ...`;

    it('A live cell with none live neighboors has to die', () => {
        let game = initializeGame(`...
                .*.
                ...`);
        
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it('A live cell with one live neighboor has to die', () => {
        let game = initializeGame(`...
                .**
                ...`);
        
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it('A live cell with two live neighboors has to live', () => {
        let game = initializeGame(`...
                ***
                ...`);
        
        const next = game.Generate();
        expect(next.toString()).toBe(
            `.*.
            .*.
            .*.`);
    });
});

describe('Any dead cell with exactly three live neighboors becomes a live cell.', () => {
    it('A dead cell with three live neighboors has to become a live cell', () => {
        let game = initializeGame(`..*
                *..
                .*.`);

        const next = game.Generate();
        expect(next.toString()).toBe(`...
            .*.
            ...`);
    });

});

describe('Any live cell with more than three live neighboors dies, as if by overcrowding.', ()=>{
    it('A live cell with four live neigboors has to die', ()=> {
        let game = initializeGame(
               `..*
                **.
                .**`);

        const next = game.Generate();
        expect(next.toString()).toBe(
            `.*.
            *..
            ***`);
    });
});

const initializeGame : Function = (initial:string): GameOfLife => 
    new GameOfLife(PositionParser.parse(initial));

// Any live cell with two or three live neighbours lives on to the next generation.

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