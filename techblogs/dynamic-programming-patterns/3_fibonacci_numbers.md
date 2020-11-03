---
permalink: /techblogs/dynamic-programming-patterns/fibonacci-numbers-pattern
topic: fibonacci-numbers-pattern
---

# Fibonacci Numbers Pattern

### Problems Following Fibonacci Pattern

## 1. Fibonacci Numbers

###### Problem Statement:

Write a function to calculate nth Fibonacci number.

Fibonacci numbers are a series of numbers in which each number is the sum of 2 preceding numbers.

First Few Fibonacci are : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, .........

> **Mathematically:**
>
> Fib(n) = Fib(n-1) + Fib(n-2)   where Fib(0) = 1 and Fib(1) = 1



###### Brute-Force : Recursive Solution

**Code:**

```python
def calculate_fib_recursion(n):
    if (n < 2):
        return n

    return calculate_fib_recursion(n - 1) + calculate_fib_recursion(n - 2)


print("Recursion Method :")
print(f"Fib of 5 : {calculate_fib_recursion(5)}")
print(f"Fib of 6 : {calculate_fib_recursion(6)}")
print(f"Fib of 7 : {calculate_fib_recursion(7)}")
```

**Output:**

```
Recursion Method :
Fib of 5 : 5
Fib of 6 : 8
Fib of 7 : 13
```

**Complexity:**

- ***Time: O(2<sup>N</sup>)*** - Two recursive calls every time.
- ***Space: O(N)*** - To store the recursion stack. Max depth of recurstion stack is N.

<br>

###### DP : Recursion + Memoization (Top-Down) Solution

- We can use memoization to solve in top-down manner.

**Code:**

```python
def calculate_fib_dp_memoization(n):
    memory = [None]*(n+1)
    return calculate_fib_dp_memoization_util(n, memory)

def calculate_fib_dp_memoization_util(n, memory):
    if (n < 2):
        return n

    if (memory[n]):
        return memory[n]

    memory[n] = calculate_fib_dp_memoization_util(n - 1, memory) +\
        calculate_fib_dp_memoization_util(n - 2, memory)

    return memory[n]


print("\nDP -> Recursion + Memoization Method :")
print(f"Fib of 5 : {calculate_fib_dp_memoization(5)}")
print(f"Fib of 6 : {calculate_fib_dp_memoization(6)}")
print(f"Fib of 7 : {calculate_fib_dp_memoization(7)}")
```

**Output:**

```
DP -> Recursion + Memoization Method :
Fib of 5 : 5
Fib of 6 : 8
Fib of 7 : 13
```

**Complexity:**

- ***Time: O(N)*** - At max we need to solve n sub-problems as they are not repeating
- ***Space: O(N)*** - Needed to store the results of the sub-problem.

<br>

###### DP : Iteration + Tabulation (Bottom-Up) Solution

- We can start filling the **1-D table[]**, from start putiing table[0] = 0 and table[1] = 1.
- Then we can simply write table[i] = table[i-1] + table[i-2]

**Code:**

```python
def calculate_fib_dp_tabulation(n):
    table = [0] * (n + 1)
    table[0], table[1] = 0, 1

    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]

    return table[n]


print("\nDP -> Iteration + Tabulation Method :")
print(f"Fib of 5 : {calculate_fib_dp_tabulation(5)}")
print(f"Fib of 6 : {calculate_fib_dp_tabulation(6)}")
print(f"Fib of 7 : {calculate_fib_dp_tabulation(7)}")
```

**Output:**

```
DP -> Iteration + Tabulation Method :
Fib of 5 : 5
Fib of 6 : 8
Fib of 7 : 13
```

**Complexity:**

- ***Time: O(N)*** - At max we need to solve n sub-problems as they are not repeating
- ***Space: O(N)*** - Needed to store the results of the sub-problem.

<br>

###### Space Optimized Solution:

- We need to keep track of only 2 previous sub-problems solution to solve this.

**Code:**

```python
def calculate_fib_dp_tabulation_space_optimized(n):
    if (n < 2):
        return n

    sp1, sp2 = 0, 1

    for i in range(2, n):
        sp1, sp2 = sp2, sp1 + sp2

    return sp1 + sp2


print("\nDP -> Iteration + Tabulation Space Optimized Method :")
print(f"Fib of 5 : {calculate_fib_dp_tabulation_space_optimized(5)}")
print(f"Fib of 6 : {calculate_fib_dp_tabulation_space_optimized(6)}")
print(f"Fib of 7 : {calculate_fib_dp_tabulation_space_optimized(7)}")
```

**Output:**

```
DP -> Iteration + Tabulation Space Optimized Method :
Fib of 5 : 5
Fib of 6 : 8
Fib of 7 : 13
```

**Complexity:**

- ***Time: O(N)*** 
- ***Space: O(1)*** - Needed to store only 2 variables.

<br>

<br>

## 2. Staircase

## 3. Number factors

## 4. Minimum jumps to reach the end

## 5. Minimum jumps with fee

## 6. House thief







<br>

<br>

-----

<a href="unbounded-knapsack-pattern" class="prev-button">&larr; Previous: Unbounded Knapsack Pattern</a> 

<a href="palindromic-subsequence-pattern" class="next-button">Next: Palindromic Subsequence Pattern &rarr;</a>

