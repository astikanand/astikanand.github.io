---
permalink: /techblogs/advanced-data-structures/n-ary-tree
topic: n-ary-tree
---

# N-ary Tree

#### Tree Traversal

A binary tree can be traversed in preorder, inorder, postorder or  level-order.

Among these traversal methods, preorder, postorder and  level-order traversal are suitable to be extended to an `N-ary` tree.

> Retrospect - Traverse a Binary Tree
>
> 1. Preorder Traversal: Visit the root node, then traverse the left subtree and finally traverse the right subtree.
> 2. Inorder Traversal: Traverse the left subtree, then visit the root node and finally traverse the right subtree.
> 3. Postorder Traversal: Traverse the left subtree, then traverse the right subtree and finally visit the root node.
> 4. Level-order Traversal: Traverse the tree level by level.

<br>

[Notes:]() 

- There is no standard definition for in-order traversal in  n-ary trees.
- It probably only makes sense for binary trees.
- While there  are several different possible ways that one could define in-order  traversal for n-ary trees.
- Each of those feels a bit odd and unnatural  and probably not terribly useful in practice.

<br>

###### To generalize the above to n-ary trees, we can simply replace the steps:

> Traverse the left subtree.... Traverse the right subtree....

in the above by:

> For each child:
>     Traverse the subtree rooted at that child by recursively calling the traversal function

We assume that the for-loop will iterate through the children in the  order they are found in the data-structure: typically, in left-to-right  order, for a diagram such as below.

<br>

#### N-ary Tree Traversal Examples

We will use the following 3-ary tree as example:

<img src="assets/nary_tree_example.png" width="20%">

##### 1. Preorder Traversal

In an N-ary tree, preorder means visit the root node first and then  traverse the subtree rooted at its children one by one. For instance,  the preorder of the 3-ary tree above is:  A->B->C->E->F->D->G.

##### 2. Postorder Traversal

In an N-ary tree, postorder means traverse the subtree rooted at its  children first and then visit the root node itself. For instance, the  postorder of the 3-ary tree above is:  B->E->F->C->G->D->A.

##### 3. Level-order Traversal

Level-order traversal in an N-ary tree is the same with a binary  tree. Typically, when we do breadth-first search in a tree, we will  traverse the tree in level order. For instance, the level-order of the  3-ary tree above is: A->B->C->D->E->F->G.

<br>

----

### Some Standard N-ary Tree Problems

## 1. N-ary Tree Preorder Traversal

###### Problem Statement:

Given an n-ary tree, return the *preorder* traversal of its nodes' values.

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See  examples).*

<br>

**Example 1:**

<img src="assets/narytreeexample.png" width="30%">

```
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]
```

**Example 2:**

<img src="assets/sample_4_964.png" width="35%">

```
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]
```

<br>

**Constraints:**

- The height of the n-ary tree is less than or equal to `1000`
- The total number of nodes is between `[0, 10^4]`

<br>

###### Approach:

- First visit the root node and then visit thir children one by one.

**Code:**

```python
from typing import List
from collections import deque


class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = []


class Solution:
    def preorder(self, root: 'Node') -> List[int]:
        # return self._preorder_recursive(root, [])
        return self._preorder_iterative(root, [])

    def _preorder_recursive(self, root, result):
        if(root):
            result.append(root.val)
            for node in root.children:
                self._preorder_recursive(node, result)

        return result

    def _preorder_iterative(self, root, result):
        if not root:
            return result

        stack = deque()
        stack.append(root)

        while (stack):
            current = stack.pop()
            result.append(current.val)
            for i in range(len(current.children) - 1, -1, -1):
                stack.append(current.children[i])

        return result


root = Node(1)

root.children.append(Node(3))
root.children.append(Node(2))
root.children.append(Node(4))

root.children[0].children.append(Node(5))
root.children[0].children.append(Node(6))

print(Solution().preorder(root))
```

**Output:**

```
[1, 3, 5, 6, 2, 4]
```

