function functionWith3Params(x, y, z) {

}

function functionWith2Lines(p1, p2) {
  let p3 = 0
  return p1 * p2;   // The function returns the product of p1 and p2
}

function functionWith2NestingLevels() {
  var carName = "Volvo";
  if(carName) {
    console.info("Depth 1")
    if(carName.startsWith("j"))
      console.info("Depth 2")
  }
  return carName
}


var res = functionWith3Params(1, 2, 3);   // Function is called, return value will end up in x

