---
permalink: /techblogs/coding-problem-patterns/intelligent-hashing-pattern
topic: intelligent-hashing-pattern
---



# Intelligent Hashing Pattern

###### Introduction:

- This pattern is based on the intelligent using of hashing to solve the problems.

<br>

### Problems Following Intelligent Hashing Pattern

## 1. Copy List with Random Pointer

###### Problem Statement

A linked list is given such that each node contains an additional  random pointer which could point to any node in the list or null.

Return a [**deep copy**](https://en.wikipedia.org/wiki/Object_copying#Deep_copy) of the list.

The Linked List is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (range from `0` to `n-1`) where random pointer points to, or `null` if it does not point to any node.

**Example:**

![](assets/copy_list_random_pointer_example.png)

<br>

###### Approach:

- Make use of hashing to store mapping with key as original node and value as created copied node.
- Then traverse over the linked list again and set next and random pointer to all the copied node using original node's next and random pointer.

<br>

###### Implementation:

**Code:**

```python
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        nodes_map = {}

        # Traverse over the linked list and store all the nodes in a hash map
        # with key as original_node and value as copied_node
        original_node = head
        while (original_node):
            nodes_map[original_node] = Node(original_node.val)
            original_node = original_node.next

        # Now again traverse over the linked list and set every copied node with next and random pointers
        original_node = head
        while (original_node):
            # If original_node has next, set the next for copied_node also
            if original_node.next:
                nodes_map[original_node].next = nodes_map[original_node.next]

            # If original_node has random, set the random for copied_node also
            if(original_node.random):
                nodes_map[original_node].random = nodes_map[original_node.random]

            original_node = original_node.next

        # Finally return the copy of the original_node head
        return nodes_map[head]


def print_list(node):
    NODE_VALUE = lambda node: node.val if node else "None"
    while (node):
        print(f"[{NODE_VALUE(node)}] --> {NODE_VALUE(node.next)} ~~~~~~> {NODE_VALUE(node.random)}")
        node = node.next


rl = Node(7)
rl.next = Node(13)
rl.next.next = Node(11)
rl.next.random = rl
rl.next.next.next = Node(10)
rl.next.next.random = Node(1)
rl.next.next.next.next = rl.next.next.random
rl.next.next.next.random = rl.next.next
rl.next.next.random.random = rl

print_list(Solution().copyRandomList(rl))
```

**Output:**

```
[7] --> 13 ~~~~~~> None
[13] --> 11 ~~~~~~> 7
[11] --> 10 ~~~~~~> 1
[10] --> 1 ~~~~~~> 11
[1] --> None ~~~~~~> 7
```

**Complexity:**

- ***Time: O(N)*** - Only traversing the list 2 times.
- ***Space: O(N)*** - Storing all the nodes in a map.

<br>

<br>

