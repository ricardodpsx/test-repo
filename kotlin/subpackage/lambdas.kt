val items = listOf(1, 2, 3, 4, 5)

// Lambdas are code blocks enclosed in curly braces.
items.fold(0, {
  // When a lambda has parameters, they go first, followed by '->'
  acc: Int, i: Int ->
  print("acc = $acc, i = $i, ")
  val result = acc + i
  println("result = $result")
  // The last expression in a lambda is considered the return value:
  result
})

// Parameter types in a lambda are optional if they can be inferred:
val joinedToString = items.fold("Elements:", { acc, i -> acc + " " + i })

// Function references can also be used for higher-order function calls:
val product = items.fold(1, Int::times)


ints.filter {
  val shouldFilter = it > 0
  shouldFilter
}

ints.filter {
  val shouldFilter = it > 0
  return@filter shouldFilter
}


//Anomymous functions
fun(x: Int, y: Int): Int = x + y


fun(x: Int, y: Int): Int {
  return x + y
}


ints.filter(fun(item) = item > 0)

//Closures
var sum = 0
ints.filter { it > 0 }.forEach {
  sum += it
}
print(sum)

//Function literals with receiver
val sum: Int.(Int) -> Int = { other -> plus(other) }
