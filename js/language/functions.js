function noArgs() {

}

function functionWith3Params(x, y, z) {

}

function functionWith2Lines(p1, p2) {
  let p3 = 0
  return p1 * p2;   // The function returns the product of p1 and p2
}



var x = myFunction(4, 3);   // Function is called, return value will end up in x

function myFunction2() {
  var carName = "Volvo";
  // code here CAN use carName
  return carName
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

