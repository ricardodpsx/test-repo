fun loops() {
    for ((index, value) in array.withIndex()) {
      println("the element at $index is $value")
    }

    //While
    while (x > 0) { x-- }

    val y = 1
    do {
      println("hello")
    } while (y != null) // y is visible here!

    listOf(1, 2, 3).forEach {
      println("hello2")
    }

}
