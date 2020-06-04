---
permalink: /techblogs/advanced-data-structures/binary-indexed-or-fenwick-tree
topic: binary-indexed-or-fenwick-tree
---



# Binary Indexed / Fenwick Tree

###### What is Fenwick Tree ?

- Published by **Fenwick** in **1994**.
- Can efficiently update elements and calculate prefix sums in a table of numbers.
- Achieves a much better balance between two operations: ***element update*** and ***prefix sum calculation***.
- Allows both operations to be performed in **O(logn)** .

### Calculating Prefix Sum Problem***

We are given an array a[], and we want to be able to perform two types of operations on it.

1. Change the value stored at an index i. (**point update** operation)
2. Find the sum of a prefix of length k. (**range sum** query)

###### Approach-1: Simple

- Go over the array and calculate the sum of all **a[i]** such that **0 <= i < k** .
- For update: assign value v to a[i].
- **Time Complexity:** **O(n)** for query and **O(1)** for update.

###### Approach-2: Simple Enhanced

- Maintain another array **prefix_sum[]** for storing sum till **i<sup>th</sup>** element at index **i** .
- For update: assign value v to a[i] and update the **prefix_sum[]**.
- **Time Complexity:** **O(1)** for query and **O(n)** for update.
- **Auxilliary Space: O(1)**

###### Approach-3: Use Segment Tree

- Performs both the tasks in **O(logn)** time.
- **Auxilliary Space:** O(N) but uses 4N extra space.

###### Approach-4: Use Fenwick Tree

- Performs both the tasks in **O(logn)** time.
- Uses lesser space than segment tree.
- Require less space and are **very easy to implement** .

#### Representation:

- Fenwick Tree is represented as an array, let the array be BITree[].
- Each node of the Binary Indexed Tree stores the sum of some elements of the input array.
- The size of the Binary Indexed Tree is equal to the size of the input array, denoted as n.
- In the code below, we use a size of n+1 for ease of implementation.

#### Updating the Value

<img src="assets/fenwick_update.png" width="50%">

#### Getting Sum 

<img src="assets/fenwick_get_sum.png" width="50%">



#### Implementation

```python
class FenwickTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.fenwick_tree = [0]*(self.n+1)

        for i in range(self.n):
            self.update(i, arr[i])
        
    
    def update(self, i, val): 
        i += 1       # index in fenwick_tree[] is 1 more than the index in arr[]

        # Traverse all ancestors and add 'val' 
        while i <= self.n: 
            self.fenwick_tree[i] += val        # Add 'val' to current node of Fenwick Tree 
            i += i & (-i)         # Update index to that of parent in update View
    

    def query(self, i):
        total_sum = 0
        i += 1
    
        # Traverse ancestors of fenwick_tree[index] and the value to sum
        while i > 0:  
            total_sum += self.fenwick_tree[i]      # Add current element of fenwick_tree to sum 
            i -= i & (-i)          # Move index to parent node in getSum View

        return total_sum



print("Fenwick Tree Example:")
arr = [2, 1, 1, 3, 2, 3, 4, 5, 6, 7, 8, 9]
fen_tree = FenwickTree(arr)
print("Sum of elements in arr[0..5] is : {}".format(fen_tree.query(5)))
fen_tree.update(3, 6)
print("Sum of elements in arr[0..5] after update is : {}".format(fen_tree.query(5)))
```

**Output:**

![](assets/fenwick_tree_output.png)

###### Complexity:

- **Time:** O(logn) for both query and update
- **Auxilliary Space:** O(n)



## 2-D Binary Indexed / Fenwick Tree













<br>



------

<a href="interval-tree" class="prev-button">&larr; Previous: Interval Tree</a>  

<a href="splay-tree" class="next-button">Next: Splay Tree &rarr;</a>

