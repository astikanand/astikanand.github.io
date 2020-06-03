---
permalink: /techblogs/algorithms/bit-algorithms
topic: bit-algorithms
---



# Bit Algorithms

Working on bytes, or data types comprising of bytes like ints, floats, doubles or even data structures which stores large amount of bytes is normal for a programmer. In some cases, a programmer needs to go beyond this - that is to say that in a deeper level where the importance of bits is realized.



Operations with bits are used in **Data compression** (data is compressed by converting it from one representation to another, to reduce the space) ,**Exclusive-Or Encryption** (an algorithm to encrypt the data for safety issues). In order to encode, decode or compress files we have to extract the data at bit level. Bitwise Operations are faster and closer to the system and sometimes optimize the program to a good level.

##### We all know that 1 byte comprises of 8 bits and any integer or character can be represented using bits in computers, which we call its binary form(contains only 1 or 0) or in its base 2 form.

> **Example:**
> 1) 14 = {1110 }<sub>2</sub>
> = 1 * 2<sup>3</sup> + 1 * 2<sup>2</sup> + 1 * 2<sup>1</sup> + 0 * 2<sup>0</sup> = 14.
>
> 
>
> 2) 20 = {10100 }<sub>2</sub>
> = 1 * 2<sup>4</sup> + 0 * 2<sup>3</sup> + 1 * 2<sup>2</sup> + 0 * 2<sup>1</sup> + 0 * 2<sup>0</sup> = 20.
>
> For characters, we use ASCII representation, which are in the form of integers which again can be represented using bits.

#### **Bitwise Operators:**

There are different bitwise operations used in the bit manipulation. These bit operations operate on the individual bits of the bit patterns. Bit operations are fast and can be used in optimizing time complexity. 

###### Some common bit operators are:

- **NOT ( ~ ):** Bitwise NOT is an unary operator that flips the bits of the number i.e., if the ith bit is 0, it will change it to 1 and vice versa. Bitwise NOT is nothing but simply the one’s complement of a number. Lets take an example. 

    > N = 5 = (101)<sub>2</sub>
    > ~N = ~5 = ~(101)<sub>2</sub> = (010)<sub>2</sub> = 2

- **AND ( & ):** Bitwise AND is a binary operator that operates on two equal-length bit patterns. If both bits in the compared position of the bit patterns are 1, the bit in the resulting bit pattern is 1, otherwise 0.

    > A = 5 = (101)<sub>2</sub>,  &nbsp; B = 3 = (011)<sub>2</sub> 
    >
    > A & B = (101)<sub>2</sub> & (011)<sub>2</sub>= (001)<sub>2</sub> = 1

- **OR ( | ):** Bitwise OR is also a binary operator that operates on two equal-length bit patterns, similar to bitwise AND. If both bits in the compared position of the bit patterns are 0, the bit in the resulting bit pattern is 0, otherwise 1.

    > A = 5 = (101)<sub>2</sub> , B = 3 = (011)<sub>2</sub>
    > A | B = (101)<sub>2</sub> | (011)<sub>2</sub> = (111)<sub>2</sub> = 7

- **XOR ( ^ ):** Bitwise XOR also takes two equal-length bit patterns. If both bits in the compared position of the bit patterns are 0 or 1, the bit in the resulting bit pattern is 0, otherwise 1.

    > A = 5 = (101)<sub>2</sub> , B = 3 = (011)<sub>2</sub>
    > A ^ B = (101)<sub>2</sub> ^ (011)<sub>2</sub> = (110)<sub>2</sub> = 6

- **Left Shift ( << ):** Left shift operator is a binary operator which shift the some number of bits, in the given bit pattern, to the left and append 0 at the end. Left shift is equivalent to multiplying the bit pattern with 2k ( if we are shifting k bits ).

    > 1 << 1 = 2 = 2<sup>1</sup>
    > 1 << 2 = 4 = 2<sup>2</sup> 
    >
    > 1 << 3 = 8 = 2<sup>3</sup>
    > 1 << 4 = 16 = 2<sup>4</sup>
    > …
    > 1 << n = 2<sup>n</sup>

- **Right Shift ( >> ):** Right shift operator is a binary operator which shift the some number of bits, in the given bit pattern, to the right and append 1 at the end. Right shift is equivalent to dividing the bit pattern with 2k ( if we are shifting k bits ).

    > 4 >> 1 = 2
    > 6 >> 1 = 3
    > 5 >> 1 = 2
    > 16 >> 4 = 1

![bit_operations](assets/bit_operations.png)

##### Note:-

Bitwise operators are good for saving space and sometimes to cleverly remove dependencies.

#### Tricks with Bit

1. **x ^ ( x & (x-1)) :** Returns the rightmost 1 in binary representation of x.

    As explained above, (x & (x - 1)) will have all the bits equal to the x except for the rightmost 1 in x.

    So if we do bitwise XOR of x and (x & (x-1)), it will simply return the rightmost 1.

    > **x =** 10 = (1010)<sub>2</sub>  &nbsp; **x & (x-1) =** (1010)<sub>2</sub> & (1001)<sub>2</sub> = (1000)<sub>2</sub>
    > **x ^ (x & (x-1)) =** (1010)<sub>2</sub> ^ (1000)<sub>2</sub> = (0010)<sub>2</sub>

2. **x & (-x) :** Returns the rightmost 1 in binary representation of x

    (-x) is the two’s complement of x. (-x) will be equal to one’s complement of x plus 1. 
    Therefore (-x) will have all the bits flipped that are on the left of the rightmost 1 in x. So x & (-x) will return rightmost 1.

    > **x =** 10 = (1010)<sub>2</sub>
    > **(-x) =** -10 = (0110)<sub>2</sub>
    > **x & (-x) =** (1010)<sub>2</sub> & (0110)<sub>2</sub> = (0010)<sub>2</sub>

3. **x | (1 << n) :** Returns the number x with the nth bit set.

    (1 << n) will return a number with only nth bit set. So if we OR it with x it will set the nth bit of x.

    > **x =** 10 = (1010)<sub>2</sub>   and  n = 2
    > **1 << n =** (0100)<sub>2</sub>
    > **x | (1 << n) =** (1010)<sub>2</sub> | (0100)<sub>2</sub> = (1110)<sub>2</sub>

#### Applications of Bit Operations

1. They are widely used in areas of graphics ,specially XOR(Exclusive OR) operations.
2. They are widely used in the embedded systems, in situations, where we need to set/clear/toggle just one single bit of a specific register without modifying the other contents. We can do OR/AND/XOR operations with the appropriate mask for the bit position.
3. Data structure like n-bit map can be used to allocate n-size resource pool to represent the current status.
4. Bits are used in networking, framing the packets of numerous bits which is sent to another system generally through any type of serial interface.

------

### Standard Bit Operations Problems

## 1. Check for Opposite Sign

###### **Problem:**

Given two signed integers, write a function that returns true if the signs of given integers are different, otherwise false.

The function should not use any of the arithmetic operators.

###### **Approach:**

Let the given integers be x and y. The sign bit is 1 in negative numbers, and 0 in positive numbers. 

The XOR of x and y will have the sign bit as 1 iff they have opposite sign. 

In other words, XOR of x and y will be negative number number iff x and y have opposite signs.

###### **Implementation:**

```python
def check_opposite_sign(x, y):
    return (x^y < 0)


print("Example-1: check_opposite_sign(-2, 7)")
print(check_opposite_sign(-2, 7))

print("Example-2: check_opposite_sign(-2, -7)")
print(check_opposite_sign(-2, -7))
```

**Output:**

![check_opposite_sign_bit](assets/check_opposite_sign_bit.png)

###### **Complexity:**

- **Time: O(1)**
- **Auxilliary Space: O(1)**



## 2. Divisible by 3

###### **Problem:**

Check if a number is divisible by 3.

###### **Naive Approach:**

If sum of digits in a number is divisible by 3 then number is divisible by 3 e.g., for 612 sum of digits is 9 so it is divisible by  3. 

But this solution is not efficient as we will have to get all decimal digits one by one, add them and then check if sum is divisible by 3. 

###### **Efficient Bit Approach:**

If difference between count of odd set bits (Bits set at odd positions) and even set bits in binary representation of number is divisible by  3 then number is divisible by 3. 

> **Example:-** 23 (00..10111)
>
> Count of all set bits at odd positions = 3
>
> Count of all set bits at even positions = 1
>
> Difference is 2 not divisible by 3 and hence 23 is not divisible by 3.

###### **Algorithm:**

- Make n positive if n is negative.
- If number is 0 then return 1
- If number is 1 then return 0
- Initialize: odd_count = 0, even_count = 0
- Loop while n != 0
    - a) If rightmost bit is set then increment odd count.
    - b) Right-shift n by 1 bit
    - c) If rightmost bit is set then increment even count.
    - d) Right-shift n by 1 bit
- return is_divisible_by_3(odd_count - even_count)

###### **Implementation:**

```python
def is_divisible_by_3(n):
    # Make n positive coz if +n is divisible by 3 then -n is also divisible.
    n = abs(n)

    if(n == 0):
        return True
    
    if(n == 1):
        return False
    
    odd_count = 0; even_count = 0
    while(n):
        # If odd bit is set then increment odd counter 
        if(n & 1):
            odd_count += 1
        n = n >> 1

        # If even bit is set then increment even counter
        if(n & 1):
            even_count += 1
        n = n >> 1
    
    return is_divisible_by_3(abs(odd_count-even_count))



print("Example-1: is_divisible_by_3(23)")
print(is_divisible_by_3(23))

print("Example-2: is_divisible_by_3(111)")
print(is_divisible_by_3(111))
```

**Output:**

![divisible_by_3_bit](assets/divisible_by_3_bit.png)

###### **Complexity:**

- **Time: O(logn)**
- **Auxilliary Space: O(1)**



## 3. Multiply by 7

###### **Problem:**

Efficiently multiply a number by 7.

###### **Approach:**

Let the number be n. Then **n\*7 = n\*(8-1) = n\*8 - n**

###### **Algorithm:**

**(n << 3) - n**

###### Implementation: 

```python
def multiply_by_7(n):
    print((n<<3) - n)


print("Example-1: multiply_by_7(5)")
multiply_by_7(5)

print("Example-2: multiply_by_7(19)")
multiply_by_7(19)
```

**Output:**

![multiply_by_7](assets/multiply_by_7.png)

###### **Complexity:**

- **Time: O(1)**
- **Space: O(1)**



## 4. Check power of 2***

###### Problem:

Consider a number N and you need to find if N is a power of 2. 

###### Approach:

Binary representation of (x-1) will have all the bits same as x, except for the rightmost 1 in x and all the bits to the right of the rightmost 1. 

> x = 4 = (100)<sub>2</sub>  &nbsp; x - 1 = 3 = (011)<sub>2</sub>
> x = 6 = (110)<sub>2</sub>   &nbsp;x - 1 = 5 = (101)<sub>2</sub>

Binary representation of (x-1) can be obtained by simply flipping all the bits to the right of rightmost 1 in x and also including the rightmost 1.

> **Now:**  x & (x-1) will have all the bits equal to the x except for the rightmost 1 in x.
> **x = 4** = (100)<sub>2</sub>  &nbsp; x - 1 = 3 = (011)<sub>2</sub>
>
> x & (x-1) = 4 & 3 = (100)<sub>2</sub> & (011)<sub>2</sub> = **(000)<sub>2</sub>** 
>
> 
>
> **x = 6** = (110)<sub>2</sub>   &nbsp; x - 1 = 5 = (101)<sub>2</sub> 
> x & (x-1) = 6 & 5 = (110)<sub>2</sub> & (101)<sub>2</sub> = **(100)<sub>2</sub>**



**Properties for numbers which are powers of 2, is that they have one and only one bit set in their binary representation.** 

If the number is neither zero nor a power of two, it will have 1 in more than one place. So if x is a power of 2 then x & (x-1) will be 0.

###### Implementation:

```python
check_power_of_2(x):
    # x will check if x == 0 and !(x & (x - 1)) will check if x is a power of 2 or not
    return (x && !(x & (x - 1)))
```



## 5. Count  1's  in Binary Representation***

###### Problem:

Count number of 1's present in binary representation of the given number.

###### Approach:

In x-1, the rightmost 1 and bits right to it are flipped, then by performing **x&(x-1)**, and storing it in x, will reduce x to a number containing number of ones(in its binary form) less than the previous state of x, thus increasing the value of count in each iteration.



###### Implementation:

```python
count_ones(n):
    while(n):
        n = n&(n-1)
        count += 1

    return count
```

##### Explanation

> **Example:**
> n = 23 = {10111}2 .
>
> 
>
> Initially **n = 23,  count = 0**
>
> 
>
> Now, n will change to n&(n-1)
>
> n-1 = 22 = {10110}2  &nbsp;  n&(n-1) = {101112 & {10110}2 = {10110}2 = 22
>
> **n = 22,  count = 1**
>
> 
>
> n-1 = 21 = {10101}2  &nbsp;  n&(n-1) = {10110}2 & {10101}2 = {10100}2 = 20
>
> **n = 20,  count = 2**
>
> 
>
> n-1 = 19 = {10011}2  &nbsp;  n&(n-1) = {10100}2 & {10011}2 = {10000}2 =16
>
> **n = 16,  count = 3**
>
> 
>
> n-1 = 15 = {01111}2  &nbsp;  n&(n-1) = {10000}2 & {01111}2 = {00000}2 = 0
>
> **n = 0,  count = 4**
>
> 
>
> ***n = 0, the the loop will terminate and gives the result as 4.***

###### **Complexity:**

- **Time: O(k)**



## 6. Check if i<sup>th</sup> bit is set***

###### Problem:

Check if i<sup>th</sup> bit is set or not in a given number.

###### Approach:

To check whether it’s ith bit is set or not, we can **AND** it with the number **2<sup>i</sup>** . 

The binary form of **2<sup>i</sup>** contains only ith bit as set (or 1), else every bit is 0 there. 



**When we will AND it with N, and if the ith bit of N is set, then it will return a non zero number (2<sup>i</sup> to be specific), else 0 will be returned.**

###### Implementation

```python
check_ith_bit_set(N, i):
    if( N & (1 << i) ):
        return True
    else:
        return False;
```

##### Explanation:

> **Example:**
> **N = 20** = {10100}<sub>2</sub>.&nbsp; Check if it’s **2nd bit** is set or not(starting from 0).
>
> 
>
> For that, we have to AND it with 2<sup>2</sup> = 1<<2 = {100}<sub>2</sub> 
> **20 & 4 =** {10100} & {100} = {100} = 22 = 4 (non-zero number)
>
> Which means it’s 2nd bit is set.



## 7. Generate all Possible Subsets of a Set***

###### Problem:

Given a set generate all its possible subsets.

###### Approach:

Represent each element in a subset with a bit.

A bit can be either 0 or 1, thus we can use this to denote whether the corresponding element belongs to this given subset or not.

So each bit pattern will represent a subset.

> **Example:**
>
> Consider a set A of 3 elements:  &nbsp; **A = {a, b, c}**
>
> Now, we need 3 bits, one bit for each element.
>
> 1 represent that the corresponding element is present in the subset, whereas 0 represent the corresponding element is not in the subset. 
>
> 
>
> **All the possible combination of these 3 bits.**
>
> 0 = (000)<sub>2</sub> = {}
> 1 = (001)<sub>2</sub> = {c}
> 2 = (010)<sub>2</sub> = {b}
> 3 = (011)<sub>2</sub> = {b, c}
> 4 = (100)<sub>2</sub> = {a}
> 5 = (101)<sub>2</sub> = {a, c}
> 6 = (110)<sub>2</sub> = {a, b}
> 7 = (111)<sub>2</sub> = {a, b, c}

###### Implementation:

```python
print_possible_subsets(A[]):
    n = len(A)
    N = 1<<n
    for i in range(N):
        for j in range(n):
            if(i & (1 << j)):
                print(A[j], end="")
        print()
```





------

<a href="7_pattern_searching" class="prev-button">&larr; Previous: Pattern Searching</a>       <a href="9_mathematical_algorithms" class="next-button">Next: Mathematical Algorithms &rarr;</a>

