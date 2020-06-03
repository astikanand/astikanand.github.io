---
permalink: /techblogs/advanced-data-structures/skip-list
topic: skip-list
---



# Skip List

###### What is Skip List ?

- Invented around **1990** by **Bill Pugh**.
- Efficient Dynamic Search Structure: Expected search time is O(log n)
- Randomized data structure: Use random coin flips to build the data structure

###### Why Skip List ?

- Worst case search time for a **sorted linked list** is **O(n)** as we can only linearly traverse the list and cannot skip nodes while searching.
- For a **Balanced Binary Search Tree**, we skip almost half of the nodes after one comparison with root and hence **O(logn)**.
- For a **sorted array**, we have random access and we can apply **Binary Search** on arrays and hence **O(logn)**.
- We can do similar things by augmenting list as Skip List.

#### Express and Normal Lane

- We will make use of normal and express lane for understanding this concept.
- ***Example:*** 16 nodes Normal lane with 4 nodes Express Lane

<img src="assets/skip_list.png" width="80%">

###### Exstimating Complexity:

- The worst case time complexity is number of nodes on express lane plus number of nodes in a segment (b/w 2 express lane nodes).
- Here n normal nodes and √n express nodes.
- **Average time complexity:** O(√n) 
- **Auxilliary Space:** O(√n)

#### Doing Better than O(√n) : Increase Levels

- The time complexity of skip lists can be reduced further by adding more layers.
- In fact, the time complexity of search, insert and delete can become **O(Logn)** in average case with **O(n)** extra space.

<img src="assets/randomized_skip_list.png" width="60%">



### Skip List Insertion

<img src="assets/skiplist_insertion.png" width="60%">

###### Deciding nodes level while Insertion:

- Each element in the list is represented by a node, the level of the node is chosen randomly while insertion in the list. 
- **Level does not depend on the number of elements in the node.**
- The level for node is decided by the following algorithm:

```
randomLevel()
	lvl := 1
	//random() that returns a random value in [0...1)
	while random() < p and lvl < MaxLevel do
		lvl := lvl + 1

	return lvl
```

- **MaxLevel** is the upper bound on number of levels in the skip list and can be determined by **L(N) = log<sub>p/2</sub>N**.
- Above algorithm assure that random level will never be greater than MaxLevel.
- Here **p** is the fraction of the nodes with level **i** pointers also having level **i+1** pointers and N is the number of nodes in the list.



###### Implementation

```python
from random import random

class Node:
    def __init__(self, key, level):
        self.key = key
        self.next = [None]*(level+1)


class SkipList:
    def __init__(self, max_level, P):
        # Maximum level for this skip list
        self.max_level = max_level
        # P is the fraction of the nodes with level i references also having level i+1 references
        self.P = P
        # create head node and initialize key to -1
        self.head = Node(-1, max_level)
        # temp level of skip list 
        self.level = 0


    def get_random_level(self): 
        lvl = 0
        while random() < self.P and lvl < self.max_level:
            lvl += 1
        return lvl
    

    def insert_key(self, key):
        # create update array and initialize it 
        update = [None]*(self.max_level+1) 
        temp = self.head

        # start from highest level of skip list move the temp reference next while key  
        # is greater than key of node next to temp, Otherwise inserted temp in update and  
        # move one level down and continue search.
        for i in range(self.level, -1, -1): 
            while temp.next[i] and temp.next[i].key < key: 
                temp = temp.next[i] 
            update[i] = temp
        
        # reached level 0, now get the node next to temp, need to insert b/w temp and next_node
        next_node = temp.next[0]

        # if next_node is NULL that means we have reached to end of the level or 
        # if next_node's key != key to insert that means we have to insert node between update[0] and next_node
        if next_node == None or next_node.key != key:
            # Generate a random level for node 
            random_level = self.get_random_level()

            # If random level is greater than list's next_node level 
            # (node with highest level inserted in list so far),
            # initialize update value with reference to head for further use 
            if random_level > self.level: 
                for i in range(self.level+1, random_level+1): 
                    update[i] = self.head
                self.level = random_level
            
            # create new node with random level generated
            new_node = Node(key, random_level)

            # insert node by rearranging references  
            for i in range(random_level+1): 
                new_node.next[i] = update[i].next[i] 
                update[i].next[i] = new_node
  
            print(key, end=" ")


    def display_list(self): 
        print("\n\nFinal Skip List Level wise:") 
        head = self.head 
        for lvl in range(self.level+1): 
            print("Level - [{}]: ".format(lvl), end=" ") 
            node = head.next[lvl] 
            while(node != None): 
                print(node.key, end=" ") 
                node = node.next[lvl] 
            print()



# Driver Program
print("Skip List Example:")
lst = SkipList(3, 0.5)
print("Insert Keys: ", end=" ")
lst.insert_key(3) 
lst.insert_key(6) 
lst.insert_key(7) 
lst.insert_key(9) 
lst.insert_key(12) 
lst.insert_key(19) 
lst.insert_key(17) 
lst.insert_key(26) 
lst.insert_key(21) 
lst.insert_key(25)
lst.display_list()
```

**Output:**

![](assets/skiplist_insertion_output.png)

###### Complexity:

- **Time:** Search - O(logn) and Insert - O(logn)
- **Auxilliary Space:** O(logn)



### Skip List Deletion

<img src="assets/skiplist_deletion.png" width="60%">





<br>

------

<a href="2_trie" class="next-button">Next: Trie &rarr;</a>



