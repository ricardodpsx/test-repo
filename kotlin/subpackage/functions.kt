fun double(x: Int): Int {
  return 2 * x
}

//Function usage
val result = double(2)

//Calling member functions uses the dot notation:
Stream().read() // create instance of class Stream and call read()


//Parameters
fun powerOf(number: Int, exponent: Int) { /*...*/ }



//Default arguments
fun read(b: Array<Byte>, off: Int = 0, len: Int = b.size) { /*...*/ }


open class A {
  open fun foo(i: Int = 10) { /*...*/ }
}

class B : A() {
  override fun foo(i: Int) { /*...*/ }  // no default value allowed
}



//Named arguments
fun foo(bar: Int = 0, baz: Int) { /*...*/ }

foo(baz = 1) // The default value bar = 0 is used



fun reformat(str: String,
             normalizeCase: Boolean = true,
             upperCaseFirstLetter: Boolean = true,
             divideByCamelHumps: Boolean = false,
             wordSeparator: Char = ' ') {
/*...*/
}


reformat(str)

reformat(str,
  normalizeCase = true,
  upperCaseFirstLetter = true,
  divideByCamelHumps = false,
  wordSeparator = '_'
)

fun foo(vararg strings: String) { /*...*/ }

foo(strings = *arrayOf("a", "b", "c"))

//Unit-returning functions

fun printHello(name: String?): Unit {
  if (name != null)
    println("Hello ${name}")
  else
    println("Hi there!")
  // `return Unit` or `return` is optional
}


fun printHello(name: String?) { ... }


//Single-expression functions
fun double(x: Int): Int = x * 2



//Infix notation
infix fun Int.shl(x: Int): Int { ... }

// calling the function using the infix notation
1 shl 2

// is the same as
1.shl(2)


    //Scope

//Local functions
fun dfs(graph: Graph) {
  fun dfs(current: Vertex, visited: MutableSet<Vertex>) {
    if (!visited.add(current)) return
    for (v in current.neighbors)
      dfs(v, visited)
  }

  dfs(graph.vertices[0], HashSet())
}

//Member functions
class Sample() {
  fun foo() { print("Foo") }
}



//Generic functions
fun <T> singletonList(item: T): List<T> { /*...*/ }



val eps = 1E-10 // "good enough", could be 10^-15

tailrec fun findFixPoint(x: Double = 1.0): Double
    = if (Math.abs(x - Math.cos(x)) < eps) x else findFixPoint(Math.cos(x))