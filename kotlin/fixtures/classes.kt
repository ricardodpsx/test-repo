class Invoice { /*...*/ }


class Empty

//Constructors
class Person constructor(firstName: String) { /*...*/ }

class Person(firstName: String) { /*...*/ }

class InitOrderDemo(name: String) {
  val firstProperty = "First property: $name".also(::println)

  init {
    println("First initializer block that prints ${name}")
  }

  val secondProperty = "Second property: ${name.length}".also(::println)

  init {
    println("Second initializer block that prints ${name.length}")
  }
}




class Customer(name: String) {
  val customerKey = name.toUpperCase()
}

class Person(val firstName: String, val lastName: String, var age: Int) { /*...*/ }

class Customer public @Inject constructor(name: String) { /*...*/ }

class Person {
  var children: MutableList<Person> = mutableListOf<Person>();
  constructor(parent: Person) {
    parent.children.add(this)
  }
}

class Person(val name: String) {
  var children: MutableList<Person> = mutableListOf<Person>();
  constructor(name: String, parent: Person) : this(name) {
    parent.children.add(this)
  }
}

class Constructors {
  init {
    println("Init block")
  }

  constructor(i: Int) {
    println("Constructor")
  }
}

class DontCreateMe private constructor () { /*...*/ }

//Instantiation

val invoice = Invoice()

val customer = Customer("Joe Smith")


//Inheritance

open class Base(p: Int)

class Derived(p: Int) : Base(p)


class MyView : View {
  constructor(ctx: Context) : super(ctx)

  constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}

//Overriding methods

open class Shape {
  open fun draw() { /*...*/ }
  fun fill() { /*...*/ }
}

class Circle() : Shape() {
  override fun draw() { /*...*/ }
}

open class Rectangle() : Shape() {
  final override fun draw() { /*...*/ }
}


//Overriding properties

open class Shape {
  open val vertexCount: Int = 0
}

class Rectangle : Shape() {
  override val vertexCount = 4
}

interface Shape {
  val vertexCount: Int
}

class Rectangle(override val vertexCount: Int = 4) : Shape // Always has 4 vertices

class Polygon : Shape {
  override var vertexCount: Int = 0  // Can be set to any number later
}


//Abstract classses

open class Polygon {
  open fun draw() {}
}

abstract class Rectangle4 : Polygon() {
  constructor() {

  }
  override abstract fun draw()
  fun area(): Int {
    return 20
  }

}

//Properties

class Address {
  var name: String = "Holmes, Sherlock"
  var street: String = "Baker"
  var city: String = "London"
  var state: String? = null
  var zip: String = "123456"

  //Getter
  val isEmpty: Boolean
    get() = this.size == 0

  //Setter
  var stringRepresentation: String
    get() = this.toString()
    set(value) {
      setDataFromString(value) // parses the string and assigns values to other properties
    }

  val isEmpty2 get() = this.size == 0  // has type Boolean

  //Backing Field
  var counter = 0 // Note: the initializer assigns the backing field directly
    set(value) {
      if (value >= 0) field = value
    }
}


//Lateinit

public class MyTest {
  lateinit var subject: TestSubject

  @SetUp fun setup() {
    subject = TestSubject()
  }

  @Test fun test() {
    subject.method()  // dereference directly
  }
}


if (foo::bar.isInitialized) {
  println(foo.bar)
}


//Compile time constants
const val SUBSYSTEM_DEPRECATED: String = "This subsystem is deprecated"

@Deprecated(SUBSYSTEM_DEPRECATED) fun foo() { ... }


//Interfaces
interface Animal {
  fun speak()
  fun bar()
  fun foo() {
    // optional body
  }
}

