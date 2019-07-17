import Point from './point';

export default class Board {
    constructor(size = 19) {
        this.size = size;
        this.grid = this.setupBoard();
    }

    setupBoard() {
        let grid = [];

        for (let x = 0; x < this.size; x++) {
            let row = [];

            for (let y = 0; y < this.size; y++) {

                row.push(new Point(x, y));
            }
            grid.push(row);
            row = [];
        }

        return grid;
    }
}