# Interval Tree

###### What is Interval Tree ?

- A tree data structure to hold intervals. 
- Used to efficiently find all intervals that overlap with any given interval or point.
- **Used in situations when we have a set of intervals and we need following operations to be implemented efficiently.** 
    1. Add an interval
    2. Remove an interval
    3. Given an interval x, find if x overlaps with any of the existing intervals.

###### Why Interval Trees ?

- By augmenting a self-balancing Binary Search Tree (BST) like Red Black Tree, AVL Tree, we can maintain set of intervals so that all operations can be done in **O(Logn)** time.

- Every node of Interval Tree stores following information:

    - **i:** An interval which is represented as a pair [low, high]
    - **max:** Maximum high value in subtree rooted with this node.

- The low value of an interval is used as key to maintain order in BST. 

- The insert and delete operations are same as insert and delete in self-balancing BST used.

    <img src="assets/interval_tree.png" width="40%">



#### Applications

- Used for windowing queries like:
    - To find all roads on a computerized map inside a rectangular viewport.
    -  To find all visible elements inside a three-dimensional scene.

###### Interval Tree vs Segment Tree

- Both segment and interval trees store intervals.
- Segment tree is mainly optimized for queries for a given point.
- Interval trees are mainly optimized for overlapping queries for a given interval.



### Some Standard Interval Tree Problems

## 1. Find  Conflicting  Appointments***

###### Problem:

Given n appointments, find all conflicting appointments.

An appointment is conflicting, if it conflicts with any of the previous appointments in array.

> **Example:**
>
> ***Input:***  appointments[] = { {1, 5},  {3, 7},  {2, 6},  {10, 15},  {5, 6},  {4, 100} }
> ***Output:*** Following are conflicting intervals
> [3,7] Conflicts with [1,5]
> [2,6] Conflicts with [1,5]
> [5,6] Conflicts with [3,7]
> [4,100] Conflicts with [1,5]

###### Approach-1: Brute-Force

- For every appointment check if it conflicts with any other appointement by processing all appointements one-by-one.
- **Time Complexity: O(n<sup>2</sup>)**

###### Approach-2: Interval Tree

- Create an Interval Tree, initially with the first appointment.
- Do following for all other appointments starting from the second one.
    - a) Check if the current appointment conflicts with any of the existing  appointments in Interval Tree.  If conflicts, then print the current appointment.  This step can be done **O(Logn)** time.
    - b) Insert the current appointment in Interval Tree. This step also can be done O(Logn) time.
- Need to do it for n elements and hence O(nlogn) total time.
- **Time Complexity: O(nlogn)**

###### Implementation:

```python
class IntervalTreeNode:
    def __init__(self, low, high):
        self.low = low
        self.high = high
        self.left = None
        self.right = None


def insert(root, low, high):
    if not root:
        return IntervalTreeNode(low, high)
    
    if low <= root.low:
        root.left = insert(root.left, low, high)
    else:
        root.right = insert(root.right, low, high)
    
    return root


def find_conflicting_appointment(root, low, high):
    while root:
        if(root.low < high and low < root.high):
            print("[{}, {}] Conflicts with [{}, {}]".format(low, high, root.low, root.high))
            return
        elif low <= root.low:
            root = root.left
        else:
            root = root.right


def conflicting_appointments(root, appointments):
    for appointment in appointments:
        low = appointment[0]
        high = appointment[1]
        find_conflicting_appointment(root, low, high)
        root = insert(root, low, high)



print("Exampl-1: Conflicting Appointments - Interval Tree")
appointments = [(1, 5), (3, 7), (2, 6), (10, 15), (5, 6), (4, 100)] 
conflicting_appointments(None, appointments)
```

**Output:**

![conflicting_appointments_interval_tree_output](assets/conflicting_appointments_interval_tree_output.png)

###### **Complexity:**

- **Time:** **O(nlogn)** 
- **Auxilliary Space: O(1)**

##### Notes:

- Time complexity of the above implementation may be more than O(nLogn) if skewed trees.
- To avoid that we can use Red-Black Tree or AVL Tree balancing techniques.





<br>

---

<a href="5_segment_tree" class="prev-button">&larr; Previous:  Segment Tree</a>  <a href="7_binary_indexed_fenwick_tree" class="next-button">Next: Binary Indexed / Fenwick Tree &rarr;</a>

