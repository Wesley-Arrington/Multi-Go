class Point {
    // constructor( size, above, right, below, left , color="empty") {
    constructor(x, y, color = "empty") {
        this.color = color;
        this.position = [x, y];
        this.above;
        this.right;
        this.below;
        this.left;
    }


    toString() {
        return this.color;
    }

}

module.exports = Point;
// export default Point;