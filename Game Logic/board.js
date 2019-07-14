// import {Point} from './point.js';

class Board {
    constructor(players = 2, size = 9) {
        // assume it's 9x9 for simplicity
        // array of array of objects
        this.players = players;
        this.size = size;
        this.history = null;
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

    placeStone(x, y, color = 'B') {
        let placingPoint = this.grid[x][y];
        let captureGroups = [];
        let group = new Set;

        // 1. stone already present?
        if (placingPoint.color !== 'e') return false;

        // 2. check for capture
        this.setStone(x, y, color);
        captureGroups = this.checkCapture(placingPoint);
        if (captureGroups.length > 0) {
            
            // check for ko
            if ((this.players === 2) &&
                (captureGroups.length === 1) && 
                (captureGroups[0].size === 1)) {
                
                if (this.history === placingPoint) {
                    // this is the ko scenario
                    this.setStone(x, y, 'e');
                    return false; 
                } else {
                    // this is the first capture of 1 stone || capture of 1 stone elsewhere.
                    this.history = captureGroups[0].values().next().value;
                    this.removeCapturedGroups(captureGroups);
                    return true;
                }
            }

            this.history = null;
            this.removeCapturedGroups(captureGroups);
            return true;
        }

        // 3. check for suicide
        this.buildGroup(placingPoint, group);
        if (!this.checkLiberties(group)) {
            this.setStone(x,y,'e');
            return false;
        }

        this.history = null;
        return true;
    }

    removeCapturedGroups(groups){
        groups.forEach((group) => {
            group.forEach((point) => {
                point.color = 'e';
            })
        })
    }

    buildGroup(point, group) {
        group.add(point);

        for (let i = 0; i < 4; i++) {
            if ((point.neighbors[i] !== null) &&
                (point.color === point.neighbors[i].color) &&
                (!group.has(point.neighbors[i]))) {

                this.buildGroup(point.neighbors[i], group)
            }
        }
    }

    checkLiberties(group) {
        let liberties = new Set;

        group.forEach(point => {
            point.neighbors.forEach(neighbor => {
                if ((neighbor !== null) && (neighbor.color === "e")) liberties.add(neighbor);
            })
        })

        return liberties.size > 0;
    }

    checkCapture(point) {
        let capturedGroups = [];
        
        // console.log(point.neighbors);

        point.neighbors.forEach((neighbor) => {
            let group = new Set;

            if ((neighbor !== null) &&
                (neighbor.color !== point.color) &&
                (neighbor.color !== 'e')) {

                this.buildGroup(neighbor, group); 
                
                if (!this.checkLiberties(group)) capturedGroups.push(group);

                
            }
        });

        return capturedGroups;
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
b.setStone(1, 1, 'B');
b.setStone(2, 0, 'B');
b.setStone(3, 0, 'W');
b.setStone(2, 1, 'W');

b.setStone(0, 8, 'W');
b.setStone(0, 6, 'W');
b.setStone(1, 7, 'W');
b.setStone(1, 8, 'B');


// b.setStone(1, 1, 'B');
// b.setStone(1, 2, 'B');
// b.setStone(0, 5, 'B');
// b.setStone(1, 5, 'B');
// b.setStone(2, 4, 'B');
// b.setStone(2, 3, 'B');

// b.setStone(1, 4, 'W');
// b.setStone(1, 3, 'W');
// b.setStone(0, 1, 'W');
// b.setStone(0, 2, 'W');
// b.setStone(0, 4, 'W');
// b.setStone(2, 1, 'B');
// b.setStone(1, 1, 'B');
// b.setStone(3, 1, 'B');
// b.setStone(0, 2, 'B');




// b.setStone(1, 2, 'B');
// b.setStone(0, 0, 'b');
// b.displayNeighbors(1,0);
// let groups = b.placeStone(0, 3, 'B');

// console.log(b.placeStone(0, 1, 'W'));
// console.log(b.placeStone(0, 2, 'W'));


// console.log(b.placeStone(8, 8, 'W'));
// console.log(b.placeStone(7, 8, 'B'));
// console.log(b.placeStone(8, 7, 'B'));
// console.log(b.placeStone(8, 8, 'W'));



// b.displayNeighbors(2,2);
// console.log("neighbors count: " + b.grid[1][1].neighbors[3]);
// group.forEach(ele => { 
//     console.log("point: " + ele.position[0] + ',' + ele.position[1]
//     ) });
// b.render();

// groups.forEach((group, idx) => {
//     console.log('group idx: ' + idx)
//     group.forEach((stone) => {
//         console.log("point: " + stone.position[0] + ',' + stone.position[1])
//     })
// });

b.render();
