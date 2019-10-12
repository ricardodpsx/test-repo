class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const p = new Rectangle(); // ReferenceError



// unnamed
let Rectangle2 = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle2.name);
// output: "Rectangle"

// named
let Rectangle3 = class Rectangle3 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle3.name);


//Prototype method
class Rectangle4 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const square = new Rectangle4(10, 10);

console.log(square.area); // 100


//Static methods

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.distance; //undefined
p2.distance; //undefined

console.log(Point.distance(p1, p2));


//Extends
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.

