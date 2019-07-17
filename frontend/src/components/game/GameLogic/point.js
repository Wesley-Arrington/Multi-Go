export default class Point {
    // constructor( size, above, right, below, left , color="empty") {
    constructor(x, y, color = "empty") {
        this.color = color;
        this.position = [x, y];
        this.neighbors = [];
    }

    toString() {
        return this.color;
    }
}

