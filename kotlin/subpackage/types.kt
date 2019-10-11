val one = 1 // Int
val threeBillion = 3000000000 // Long
val oneLong = 1L // Long
val oneByte: Byte = 1

val pi = 3.14 // Double
val e = 2.7182818284 // Double
val eFloat = 2.7182818284f // Float, actual value is 2.7182817

val oneMillion = 1_000_000
val creditCardNumber = 1234_5678_9012_3456L
val socialSecurityNumber = 999_99_9999L
val hexBytes = 0xFF_EC_DE_5E
val bytes = 0b11010010_01101001_10010100_10010010

val a: Int = 10000
println(a === a) // Prints 'true'
val boxedA: Int? = a
val anotherBoxedA: Int? = a

val i: Int = b.toInt() // OK: explicitly widened
print(i)


val l = 1L + 3 // Long + Int => Long


val x = (1 shl 2) and 0x000FF000


val asc = Array(5) { i -> (i * i).toString() }
asc.forEach { println(it) }


val arr = IntArray(5)

val arr = IntArray(5) { 42 }

var arr = IntArray(5, { it * 1 })

val b: UByte = 1u  // UByte, expected type provided
val s: UShort = 1u // UShort, expected type provided
val l: ULong = 1u  // ULong, expected type provided

val a1 = 42u // UInt: no expected type provided, constant fits in UInt
val a2 = 0xFFFF_FFFF_FFFFu // ULong: no expected type provided, constant doesn't fit in UInt



val s = "abc" + 1
val s = "Hello, world!\n"
val text = """
    for (c in "foo")
        print(c)
"""

val s = "abc"
println("$s.length is ${s.length}")

val i = 10
println("i = $i")