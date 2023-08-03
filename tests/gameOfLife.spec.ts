import {GameOfLife} from "../src/gameOfLife";
import {Position} from "../src/Position";

describe('GameOfLife - Acceptance tests', () => {
    it('Generation 1 -> Generation 2', () => {
        const initial =
            new Position(
                `........
            ....*...
            ...**...
            ........`);

        let game = new GameOfLife(initial);
        const next = game.Generate();

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
        const initial =
            new Position(
                `...
                    .*.
                    ...`);

        let game = new GameOfLife(initial);
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it('A live cell with one live neighbour has to die', () => {
        const initial =
            new Position(
                `...
                    .**
                    ...`);

        let game = new GameOfLife(initial);
        const next = game.Generate();

        expect(next.toString()).toBe(allCellsDied);
    });
    it.skip('A live cell with two live neighbours has to live', () => {
        const initial =
            new Position(
                `...
                    ***
                    ...`);

        let game = new GameOfLife(initial);
        const next = game.Generate();
        expect(next.toString()).toBe(
            `...
            .*.
            ...`);
    });
})

// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell. 
// You should write a program that can accept an arbitrary grid of cells, and will 
// output a similar grid showing the next generation.