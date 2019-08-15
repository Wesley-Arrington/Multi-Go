import Point from './point';

export default class Game {
    constructor(players = 2, size = 19) {
        this.size = size;
        this.players = players;
        this.history = null;
        this.grid = this.setupBoard();
        this.setNeighbors();
    }

    setupBoard() {
        // KC: really? no syntax to initialize a 2d array in js?
        let grid = new Array(this.size);
        
        for (let i = 0; i<this.size; i++) {
            grid[i] = new Array(this.size);
        }

        for (let x=0; x<this.size; x++) {
            for (let y=0; y<this.size; y++) {
                grid[x][y] = new Point(x,y)
            }
        }

        return grid;
		}
		
    // takes a 1-d array of pojos and returns a 2-d grid of points
    unflatten(arr) {
        let counter = 0;
        for (let x = 0; x < this.size; x++) {

            for (let y = 0; y < this.size; y++) {
                this.grid[x][y].color = arr[counter].color;
                counter++;
            } 
        
        }
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

    checkBounds(x, y) {
        if (x >= this.size || x < 0) return null;
				if (y >= this.size || y < 0) return null;
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

        }

    }

    placeStone(x, y, color = 'B') {
        let placingPoint = this.grid[x][y];
        let captureGroups = [];
        let group = new Set;

        // 1. stone already present?
        if (placingPoint.color !== 'empty') {
            throw "stone already here";
       
        }

        // 2. check for capture
        this.setStone(x, y, color);
        captureGroups = this.checkCapture(placingPoint);
        if (captureGroups.length > 0) {

            // check for ko
            if ((this.players === 2) &&
                (captureGroups.length === 1) &&
                (captureGroups[0].size === 1)) {

                if (this.history === null) {
                    // kc: Ok, I understand the problem.
                    // kc: b/c we are creating new instances of game every move
                    // kc: the history checking condition does not work.
                    this.history = captureGroups[0].values().next().value;
                    this.removeCapturedGroups(captureGroups);
                    return true;
                } else {
                    if (this.history === placingPoint) {
                        this.setStone(x, y, 'empty');
                        throw "Ko: wait a turn";
                      
                    } else {
                        this.history = captureGroups[0].values().next().value;
                        this.removeCapturedGroups(captureGroups);
                        return true;
                    }
                }
            } else {
                this.history = null;
                this.removeCapturedGroups(captureGroups);
                return true;
            }
        }

        // 3. check for suicide
        this.buildGroup(placingPoint, group);
        if (!this.checkLiberties(group)) {
            this.setStone(x, y, 'empty');
            throw "suicide not allowed";
 
        }

        this.history = null;
        return true;
    }

    removeCapturedGroups(groups) {
        groups.forEach((group) => {
            group.forEach((point) => {
                point.color = 'empty';
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
                if ((neighbor !== null) && (neighbor.color === 'empty')) liberties.add(neighbor);
            })
        })

        return liberties.size > 0;
    }

    checkCapture(point) {
        let capturedGroups = [];

        point.neighbors.forEach((neighbor) => {
            let group = new Set;

            if ((neighbor !== null) &&
                (neighbor.color !== point.color) &&
                (neighbor.color !== 'empty')) {

                this.buildGroup(neighbor, group);

                if (!this.checkLiberties(group)) capturedGroups.push(group);


            }
        });

        return capturedGroups;
    }

}