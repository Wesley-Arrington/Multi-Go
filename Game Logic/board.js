// import {Point} from './point.js';

class Board {
    constructor() {
        // assume it's 9x9 for simplicity
        // array of array of objects

        this.size = 9
        this.grid = this.setupBoard();
        this.setNeighbors();

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

    setNeighbors() {
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size; y++) {
                this.grid[x][y].neighbors.push(this.checkBounds(x, y - 1));
                this.grid[x][y].neighbors.push(this.checkBounds(x + 1, y));
                this.grid[x][y].neighbors.push(this.checkBounds(x, y + 1));
                this.grid[x][y].neighbors.push(this.checkBounds(x - 1, y));
            }
        }
    }

    displayNeighbors(x, y) {

        if (this.grid[x][y].neighbors[0] === null) console.log('out-of-bounds');
        else console.log('above: ' + this.grid[x][y].neighbors[0].toString());

        if (this.grid[x][y].neighbors[1] === null) console.log('out-of-bounds');
        else console.log('right: ' + this.grid[x][y].neighbors[1].toString());

        if (this.grid[x][y].neighbors[2] === null) console.log('out-of-bounds');
        else console.log('below: ' + this.grid[x][y].neighbors[2].toString());

        if (this.grid[x][y].neighbors[3] === null) console.log('out-of-bounds');
        else console.log('left: ' + this.grid[x][y].neighbors[3].toString());
    }

    checkBounds(x, y) {
        if (x === this.size || x < 0) return null;
        if (y === this.size || y < 0) return null;
        return this.grid[x][y];
    }

    setStone(x, y, color) {
        if (x === this.size || x < 0) throw "x out of bounds";
        if (y === this.size || y < 0) throw "y out of bounds";

        this.grid[x][y].color = color;

    }

    render() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                process.stdout.write(this.grid[x][y].color + " ");
            }
            console.log('');
        }
        console.log('');
    }

    placeStone(x, y) {
        if (x === this.size || x < 0) throw "x out of bounds";
        if (y === this.size || y < 0) throw "y out of bounds";

        let group = new Set;
        let liberties = new Set;
        this.setStone(x, y, 'B');
        this.checkGroup(this.grid[x][y], group);
        liberties = this.checkLiberties(group)
        return group;
        return liberties;
  

    }

    checkGroup(point, group) {
        group.add(point);

        for (let i = 0; i < 4; i++) {
            if ((point.neighbors[i] !== null) &&
                (point.color === point.neighbors[i].color) &&
                (!group.has(point.neighbors[i]))) {

                this.checkGroup(point.neighbors[i], group)
            }
        }
    }

    checkLiberties(group) {
        let liberties = new Set;

        group.forEach(point => {
            point.neighbors.forEach(neighbor => {
                if ((neighbor !== null) && (neighbor.color === "e")) liberties.add(neighbor)
            })
        })

        return liberties > 0

    }

    capture() {
        
    }
}




class Point {
    // constructor( size, above, right, below, left , color="empty") {
    constructor(x, y, color = "e") {
        this.color = color;
        this.position = [x, y];
        this.neighbors = [];
    }


    toString() {
        return this.color;
    }

}


b = new Board;
b.setStone(0, 0, 'B');
b.setStone(1, 0, 'B');
b.setStone(1, 2, 'B');
b.setStone(2, 1, 'B');
b.setStone(3, 0, 'B');
b.setStone(3, 1, 'B');


// b.setStone(1, 2, 'B');
// b.setStone(0, 0, 'b');
// b.displayNeighbors(1,0);
let group = b.placeStone(1, 1, 'B');
b.displayNeighbors(2,2);
// console.log("neighbors count: " + b.grid[1][1].neighbors[3]);
// group.forEach(ele => { 
//     console.log("point: " + ele.position[0] + ',' + ele.position[1]
//     ) });
// b.render();

group.forEach(ele => {
    console.log("point: " + ele.position[0] + ',' + ele.position[1]
    )
});
b.render();
