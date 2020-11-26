# Breadth First Search Pattern

###### Intorduction

- This pattern is based on the **Breadth First Search (BFS)** technique.
- Any problem involving the traversal of a tree in level-by-level order can be efficiently solved using this approach.
- We can use Queue/Deque to keep track of all the nodes of a level before jumping to next level which make space complexity as O(w).

<br>

### Problems Following BFS Pattern

## 1. Number of Islands

###### Problem Statement:

Given an m x n 2d grid map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 

Assume all four edges of the grid are all surrounded by water.

```
====== Examples ======
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```

<br>

###### Approach

- Simply do the BFS on the matrix considering 4 traversal directions as 4 neighbours.
- The as many calls to BFS made before every land is visited will give the count of islands.

<br>

###### Implementation:

**Code:**

```python
from typing import List
from collections import deque


class Solution:
    DIRECTIONS = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    def numIslands(self, grid: List[List[str]]) -> int:
        islands = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if (grid[i][j] == "1"):
                    islands += 1
                    self.bfs(grid, i, j)

        return islands

    def is_safe(self, x, y, m, n):
        return x >= 0 and y >= 0 and x < m and y < n

    def bfs(self, grid, i, j):
        m, n = len(grid), len(grid[0])
        queue = deque()
        queue.append((i, j))
        grid[i][j] = "#"

        while (queue):
            x, y = queue.popleft()
            # Traverse in 4 directions enqueue and mark visited
            for dx, dy in self.DIRECTIONS:
                if (self.is_safe(x + dx, y + dy, m, n) and grid[x + dx][y + dy] == "1"):
                    queue.append((x + dx, y + dy))
                    grid[x + dx][y + dy] = "#"  # marked visited


grid = [["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"]]
print(Solution().numIslands(grid))

grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
]
print(Solution().numIslands(grid))

```

**Output:**

```
1
3
```

**Complexity:**

- ***Time: O(M\*N)*** - We are visiting every element once during bfs and also during iteration.
- ***Space: O(min(M,N))*** because in worst case where the grid is filled with lands, the size of queue can grow up to min(M,N).

<br>

<br>

## 2. All Nodes at K distance

###### Problem Statement:

Given a binary tree with root node, a target node and an integer value K.

Return a list of the values of all nodes that have a distance K from the target node. The answer can be returned in any order.

```
===== Example =====
Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, K = 2
Output: [7,4,1]

Explanation: 
The nodes that are a distance 2 from the target node (with value 5)
have values 7, 4, and 1.
```

<img src="assets/distance_k_nodes_example.png" width="30%">

<br>

###### Approach:

- If we know the parent of every node x, we know all nodes that are distance 1 from x.
- We can then perform a breadth first search from the target node to find the answer.
- We first do a depth first search where we collect information about every node's parent.
- After, we do a breadth first search to find all nodes a distance K from the target.

<br>

###### Implementation:

**Code:**

```python
from typing import List
from collections import deque


class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, K: int) -> List[int]:
        parents = {root: None}
        self.dfs(root, parents)
        return self.bfs(target, K, parents)

    def dfs(self, node, parents):
        if (node):
            if(node.left):
                parents[node.left] = node
                self.dfs(node.left, parents)

            if(node.right):
                parents[node.right] = node
                self.dfs(node.right, parents)

    def bfs(self, target, K, parents):
        visited = set()
        queue = deque()
        queue.append(target)
        visited.add(target)

        while (queue):
            n = len(queue)
            for _ in range(n):
                if (K == 0):
                    return [node.val for node in queue]

                current = queue.popleft()
                if (current.left and current.left not in visited):
                    visited.add(current.left)
                    queue.append(current.left)

                if (current.right and current.right not in visited):
                    visited.add(current.right)
                    queue.append(current.right)

                if (parents[current] and parents[current] not in visited):
                    visited.add(parents[current])
                    queue.append(parents[current])
            K -= 1

        return []


root = TreeNode(3)
root.left = TreeNode(5)
root.right = TreeNode(1)
root.left.left = TreeNode(6)
root.left.right = TreeNode(2)
root.right.left = TreeNode(0)
root.right.right = TreeNode(8)
root.left.right.left = TreeNode(7)
root.left.right.right = TreeNode(4)

s = Solution()
print(s.distanceK(root, root.left, 2))


root = TreeNode(0)
root.left = TreeNode(1)
root.left.left = TreeNode(3)
root.left.right = TreeNode(2)

s = Solution()
print(s.distanceK(root, root.left.right, 1))


root = TreeNode(0)
root.left = TreeNode(2)
root.right = TreeNode(1)
root.right.right = TreeNode(3)

s = Solution()
print(s.distanceK(root, root.right.right, 3))
print(s.distanceK(root, root.right.right, 4))
```

**Output:**

```
[7, 4, 1]
[1]
[2]
[]
```

**Complexity:**

- ***Time: O(N)*** - We are visiting every node once during bfs and also during dfs. 2n ≈ O(N)
- ***Space: O(N)*** - We need to store parent of every node

<br>

<br>

