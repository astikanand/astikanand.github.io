---
permalink: /techblogs/coding-problem-patterns/depth-first-search-pattern
topic: depth-first-search-pattern
---



# Depth First Search Pattern

###### Introduction:

- This pattern is based on **Depath First Search (DFS)** technique.

<br>

### Problems Following DFS Pattern

## 1. Find Critical Connections in Network (Bridges in Graph)

###### Problem:

There are n servers numbered from 0 to n-1 connected by undirected server-to-server connections forming a network.

Here connections[i] = [a, b] represents a connection between servers a and b. 

Any server can reach any other server directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some server unable to reach some other server.

Return all critical connections in the network in any order.

###### Approach-1: Brute-Force

- According to the definition an edge is critical if removing it would disconnect the graph.
- So a brute force solution would look like say we have an edge (u, v).
- We remove that edge and do a DFS on the rest of the graph to find the number of connected components.
- If the number of connected components increase we have found the critical edge.
- We repeat it for every edge in the graph.
- **Time Complexity:  O(E*(V+E))**.  O(V+E) for DFS and to be done for every Edge.

###### Approach-2: Tarjan Algorithm

- Make use of single DFS to find the critical edge.

###### Implementation:

**Code:**

```python
from typing import List
from collections import defaultdict

class Solution:
    def criticalConnections(self, n: int, connections: List[List[int]]) -> List[List[int]]:
        graph = defaultdict(list)
        for u, v in connections:
            graph[u].append(v)
            graph[v].append(u)

        visited, discovery_times, earliest_reachable_times = {}, {}, {}
        for vertex in graph:
            visited[vertex] = False
            discovery_times[vertex] = earliest_reachable_times[vertex] = -1

        current_vertex, parent, time = 0, -1, 0
        critical_connections = []

        self.find_critical_connections_dfs(
            graph, visited, current_vertex, parent, discovery_times, 
            earliest_reachable_times, time, critical_connections)

        return critical_connections

    def find_critical_connections_dfs(
        self, graph, visited, current_vertex, parent, discovery_times, earliest_reachable_times, 
        time, critical_connections):
        
        visited[current_vertex] = True
        discovery_times[current_vertex] = time
        earliest_reachable_times[current_vertex] = time
        time += 1

        for connected_vertex in graph[current_vertex]:
            if (not visited[connected_vertex]):
                self.find_critical_connections_dfs(
                    graph, visited, connected_vertex, current_vertex, discovery_times, 
                    earliest_reachable_times, time, critical_connections)

                # If earliest reachable node from connected vertex is smaller, then update the 
                # earliest reachable node for current vertex also
                earliest_reachable_times[current_vertex] = min(
                    earliest_reachable_times[current_vertex], earliest_reachable_times[connected_vertex])

                # If earliest reachable node from connnected vertex is still greater than disovery time of 
                # current vertex, that means we didn't find any back edge and this edge is critical
                if (earliest_reachable_times[connected_vertex] > discovery_times[current_vertex]):
                    critical_connections.append([current_vertex, connected_vertex])

            # If connected_vertex is visited and it is not it's parent, that mean we found a back edge (circle)
            # That means we are able to reach to an ancestor node from a descendent node
            # That means earliest reachable node from descendent node now is discovery time of ancestor node
            # We take discovery time coz we consider only single back edge and not the multiple or combination
            elif (visited[connected_vertex] and connected_vertex != parent):
                earliest_reachable_times[current_vertex] = min(
                    earliest_reachable_times[current_vertex], discovery_times[connected_vertex])


print(Solution().criticalConnections(4, [[0,1],[1,2],[2,0],[1,3]]))
print(Solution().criticalConnections(6, [[0,1],[1,2],[2,0],[1,3],[3,4],[4,5],[5,3]]))
```

**Output:**

```
[(1, 3)]
[(1, 3)]
```

**Complexity:**

- ***Time: O(V+E)*** Single DFS is needed.
- ***Auxilliary Space: O(V)*** 

<br>

<br>

## 2. Increasing Order Search Tree

###### Problem Statement:

Given the `root` of a binary search tree, rearrange the tree in **in-order** so that the leftmost node in the tree is now the root of the tree, and every node has no left child and only one right child.

![](assets/increasing_order_search_tree_example.png)

**Constraints:**

- The number of nodes in the given tree will be in the range `[1, 100]`.
- `0 <= Node.val <= 1000`

<br>

###### Problem Stats:

- **Difficulty: Easy**
- **Category:** Leetcode - 897
- **Companies:**

<br>

###### Approach:

- As we know doing inorder traversal on  Binary Search Tree gives sorted output we will make use of this concept.
- We will do the inorder traversal and when we reach at a node to process it, we will mark the left of the node as None to avoid loop.
- Then will set that node to be the right of our current result tree node and will move the current to right of the current node.
- And will proceed with the recursion to continue the inorder traversal.
- To verify the final returned result root, we can simply keep on printing node and keep traversing right.
- If the printed input is sorted that means the returned resultant tree is correct.

<br>

###### Implementation:

**Code:**

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def increasingBST(self, root: TreeNode) -> TreeNode:
        def inorder(node):
            if (node):
                inorder(node.left)
                node.left = None
                self.current.right = node
                self.current = self.current.right
                inorder(node.right)

        result = self.current = TreeNode("#")
        inorder(root)
        return result.right


def print_result(result_root):
    while (result_root):
        print(result_root.val, end=" ")
        result_root = result_root.right
    print()


root = TreeNode(5)
root.left = TreeNode(3)
root.right = TreeNode(6)
root.left.left = TreeNode(2)
root.left.right = TreeNode(4)
root.right.right = TreeNode(8)
root.left.left.left = TreeNode(1)
root.right.right.left = TreeNode(7)
root.right.right.right = TreeNode(9)
result_root = Solution().increasingBST(root)
print("Verifying if returned result tree is correct : ")
print_result(result_root)

root = TreeNode(5)
root.left = TreeNode(1)
root.right = TreeNode(7)
result_root = Solution().increasingBST(root)
print("Verifying if returned result tree is correct : ")
print_result(result_root)
```

**Output:**

```
Verifying if returned result tree is correct : 
1 2 3 4 5 6 7 8 9 
Verifying if returned result tree is correct : 
1 5 7 
```

**Complexity:**

- ***Time: O(N)*** -  Need to process every element of the node.
- ***Auxilliary Space: O(H)*** - Total space needed for recursion stack is height of BST.

<br>

<br>



