import {generate} from "../src/gameOfLife";

describe('GameOfLife - Acceptance tests', () => {
   
    it('Generation 1 -> Generation 2', () => {
        const startingPosition =
            `........
            ....*...
            ...**...
            ........`;
        
        const nextPosition = generate(startingPosition);
        
        const outputPosition =
            `........
            ...**...
            ...**...
            ........`;
        expect(nextPosition).toBe(outputPosition);
   }) 
});


// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell. 
// You should write a program that can accept an arbitrary grid of cells, and will 
// output a similar grid showing the next generation.