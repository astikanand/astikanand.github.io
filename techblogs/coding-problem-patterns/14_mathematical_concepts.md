---
permalink: /techblogs/coding-problem-patterns/mathematical-concepts-pattern
topic: mathematical-concepts-pattern
---



# Mathematical Concepts Pattern

###### Introduction:

- This pattern deals with the problems solved using the mathematical concepts.

<br>

> ### Concept: Matrix Rotation
>
> ###### Steps to Rotate:
>
> **Step-1:** Take the transpose of the matrix.
>
> **Step-2:** Perform **Vertical Flipping** for clockwise rotation and **Horizontal Flipping** for anticlockwise rotation.
>
> ##### Matrix Transpose:
>
> - To transpose a matrix simply swap the element at Matrix\[row][col] with Matrix\[col][row].
>
> ```python
> for row in range(n):
>     for col in range(row + 1, n):
>         matrix[row][col], matrix[col][row] = matrix[col][row], matrix[row][col]
> ```
>
> ##### Flip (Reverse) Matrix
>
> [`Vertical Flipping`]()
>
> - Vertical Flipping (Reversing) means flipping alongside vertical axis or columns.
> - That means changing first col to last col, 2nd col to 2nd last col and so on.....
>
> ```python
> for row in range(n):
>     for col in range(n // 2):
>         matrix[row][col], matrix[row][n - col - 1] = matrix[row][n - col - 1], matrix[row][col]
> ```
>
> <br>
>
> [`Horizontal Flipping`]()
>
> - Horizontal Flipping (Reversing) means flipping alongside horizontal axis or columns.
> - That means changing first row to last row, 2nd row to 2nd last row and so on.....
>
> ```python
> for row in range(n // 2):
>     for col in range(n):
>         matrix[row][col], matrix[n - row - 1][col] = matrix[n - row - 1][col], matrix[row][col]
> ```
>
>
> **Example:**
>
> ![](assets/matrix_rotation.png)
>
> 

<br>

## 1. Rotate Matrix

###### Problem Statement:

You are given an *n* x *n* 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. 

**DO NOT** allocate another 2D matrix and do the rotation.

```
======= Examples ======
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Input: matrix = [[1]]
Output: [[1]]
```

<img src="assets/rotate_matrix_example.png" width="35%">

**Constraints:**

- `matrix.length == n`
- `matrix[i].length == n`
- `1 <= n <= 20`
- `-1000 <= matrix[i][j] <= 1000`

<br>

###### Problem Stats:

- **Difficulty: Medium**
- **Category:** Leetcode - 48
- **Companies:** Amazon

<br>

###### Approach:

- Take the transpose of the matrix and do the vertical flipping.

<br>

###### Implementation:

**Code:**

```python
from typing import List


class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)

        # To Rotate the matrix, first take the transpose of the matrix
        for row in range(n):
            for col in range(row + 1, n):
                matrix[row][col], matrix[col][row] = matrix[col][row], matrix[row][col]

        # To rotate 90˚ clockwise, swap 1st and last, 2nd and 2nd last columns and so on
        # To rotate 90˚ anticlockwise, swap 1st and last, 2nd and 2nd last rows and so on
        for row in range(n):
            for col in range(n // 2):
                matrix[row][col], matrix[row][n - col - 1] = matrix[row][n - col - 1], matrix[row][col]


matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]
Solution().rotate(matrix)
print(matrix)

matrix = [[1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16]]
Solution().rotate(matrix)
print(matrix)

matrix = [[1]]
Solution().rotate(matrix)
print(matrix)

matrix = [[1, 2],
          [3, 4]]
Solution().rotate(matrix)
print(matrix)
```

**Output:**

```
[[7, 4, 1], [8, 5, 2], [9, 6, 3]]
[[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]
[[1]]
[[3, 1], [4, 2]]
```

**Complexity:**

- ***Time: O(N<sup>2</sup>)*** - Need to process all N<sup>2</sup> elements in matrix.
- ***Space: O(1)***

<br>

<br>





