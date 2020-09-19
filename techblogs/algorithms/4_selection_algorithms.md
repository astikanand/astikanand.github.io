---
permalink: /techblogs/algorithms/selection-algorithms
topic: selection-algorithms
---



# Selection Algorithms

###### Why Selection Algorithms ?

- Many a times, we need to select find kth smallest or largest element from a given list of elments.
- We can make use of selection algorithms to find that elements.

> **Famous Selection Algorithms**

- QuickSelect
- PartialSelectionSort

<br>

<br>

> ### Algo-1: QuickSelect Algorithm

###### What is QuickSelect Algorithm ?

- Quickselect is a selection algorithm to find the kth smallest element in an unsorted list.
- It is closely related to the quicksort sorting algorithm and has **O(N)** average time complexity.
- Like quicksort, it was developed by **Tony Hoare**, and is also known as ***Hoare's selection algorithm***.
- Like quicksort, it is efficient in practice and has good average-case performance, but has poor worst-case performance.
- We can use [Randomized QuickSelect]() to further improve the performance.

![](assets/find_kth_smallest_example.png)

###### Algorithm:

- First find the **pivot point or partition_index (pat_index)** using **quick sort's partition method**.
- **pat_index or pivot** is a position that partitions the list into two parts: every element on the left is less than the pivot and every element on the right is more than the pivot).
- The algorithm recurs only for the part that contains the k-th smallest element.
- If the index of the partitioned element (pivot) is more than k, then the algorithm recurs for the left part.
- If the index (pivot) is same as k, then we have found the k-th smallest element and it is returned.
- If index is less than k, then the algorithm recurs for the right part.

###### Partition Method Implementation

```python
def partition(arr, low, high):
    # Below 2 lines of code is just to make it Randomized QuickSelect
    rand_index = random.randint(low, high)
    arr[high], arr[rand_index] = arr[rand_index], arr[high]
    
    pivot = arr[high]

    for i in range(low, high):
        if arr[i] < pivot:
            arr[i], arr[low] = arr[low], arr[i]
            low += 1

    arr[low], arr[high] = arr[high], arr[low]
    return low
```

###### Kth Smallest Selection Implementation

```python
def find_kth_smallest(arr, low, high, k):
    if (low <= high):
        pat_index = partition(arr, low, high)
        if (pat_index == k - 1):
            return arr[k - 1]
        elif (pat_index > k - 1):
            return find_kth_smallest(arr, low, pat_index - 1, k)
        else:
            return find_kth_smallest(arr, pat_index + 1, high, k)
```

###### Complexity:

- **Time complexity: O(N)** in the average case, **O(N<sup>2</sup>)** in the worst case.
- **Space complexity: O(1)**



[Notes:]()

- Here the array is everytime split into two parts. If that would be a quicksort algorithm, one would proceed recursively to use quicksort for the both parts that would result in **O(NlogN)** time complexity.
- Here there is no need to deal with both parts since now we know in which part to search for kth smallest element, and that reduces average time complexity to **O(N)**.
- As in QuickSort if everytime we get the worst pivot we will end up sorting the complete array and the worst case time complexity will be **O(N<sup>2</sup>)** which in practice is almost impossible as we are using Randomized Version of it.



----

### Standard Selection Algorithms Problems

## 1. Find K<sup>th</sup> Smallest Element in Unsorted Array

###### Problem:

Given a list of elements in unsorted arr, find the kth smallest element.

```
Examples:
Input: [7, 10, 4, 3, 20, 15] and k = 3
Output: 7

Input: [10, 4, 5, 8, 6, 11, 26] and k = 3
Output: 6
```

###### Approach-1: Use Sorting

- We can sort and get the kth smallest element simply by getting element at (k-1)th index.
- **Time Complexity: O(NLogN)**
- **Space Compelxity: O(1)**

###### Approach-2: Use Max-Heap of Size K

- We can use a max-heap of size of K and put K elements into it first.
- Then start process all remaining elements, compare it with the max element at top of heap and ignore all elements that is greater or equal to element at top and only insert element that is smaller thatn elment at top of heap into heap.
- **Time Complexity: O(NLogK)**
- **Space Compelxity: O(K)**

###### Approach-3: Use Randomized QuickSelect

- We can use QuickSelect learned above to solve it.
- **Time complexity: O(N)** in the average case

###### Implementation

```python
import random


def find_kth_smallest(arr, low, high, k):
    if (low <= high):
        pat_index = partition(arr, low, high)
        if (pat_index == k - 1):
            return arr[k - 1]
        elif (pat_index > k - 1):
            return find_kth_smallest(arr, low, pat_index - 1, k)
        else:
            return find_kth_smallest(arr, pat_index + 1, high, k)


def partition(arr, low, high):
    # Below 2 lines of code just to make it Randomized QuickSelect
    rand_index = random.randint(low, high)
    arr[high], arr[rand_index] = arr[rand_index], arr[high]

    pivot = arr[high]

    for i in range(low, high):
        if arr[i] < pivot:
            arr[i], arr[low] = arr[low], arr[i]
            low += 1

    arr[low], arr[high] = arr[high], arr[low]
    return low


# Run Program
assert find_kth_smallest([7, 10, 4, 3, 20, 15], 0, 5, 3) == 7
assert find_kth_smallest([10, 4, 5, 8, 6, 11, 26], 0, 6, 3) == 6
```

###### Complexity:

- **Time complexity: O(N)** in the average case, **O(N<sup>2</sup>)** in the worst case.
- **Space complexity: O(1)**

<br>

<br>

## 2. Find Kth Largest Element in Unsorted Array

###### Problem:

Find the **k**th largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

```
# Examples:
Input: [3,2,1,5,6,4] and k = 2
Output: 5

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
```

###### Approach: Use Randomized QuickSelect

- Earlier we use to find the Kth smallest element, here we need to find Kth Largest element.
- To find Kth largest element we can simply find the (N-K+1)th smallest element.
- **Time complexity: O(N)** in the average case

###### Implementation:

```python
from typing import List
import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return self.find_kth_smallest_element(nums, 0, len(nums) - 1, len(nums) - k + 1)

    def find_kth_smallest_element(self, arr, low, high, k):
        if (low <= high):
            pat_index = self.partition(arr, low, high)
            if (pat_index == k - 1):
                return arr[k - 1]
            elif (pat_index > k - 1):
                return self.find_kth_smallest_element(arr, low, pat_index - 1, k)
            else:
                return self.find_kth_smallest_element(arr, pat_index + 1, high, k)

    def partition(self, arr, low, high):
        rand_index = random.randint(low, high)
        arr[high], arr[rand_index] = arr[rand_index], arr[high]

        pivot = arr[high]

        for i in range(low, high):
            if arr[i] < pivot:
                arr[i], arr[low] = arr[low], arr[i]
                low += 1

        arr[low], arr[high] = arr[high], arr[low]
        return low


s = Solution()
assert s.findKthLargest([1, 2, 3, 4, 5], 1) == 5
assert s.findKthLargest([1, 2, 3, 4, 5], 1) == 5
assert s.findKthLargest([1, 2, 3, 4, 5], 5) == 1
assert s.findKthLargest([2, 2, 2, 2, 2], 2) == 2
assert s.findKthLargest([3, 2, 1, 5, 6, 4], 2) == 5
assert s.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4) == 4
```

###### Complexity:

- **Time complexity: O(N)** in the average case, **O(N<sup>2</sup>)** in the worst case.
- **Space complexity: O(1)**

<br>

<br>

## 3. Find K Closest Points to Origin

###### Problem:

Given list of points on the plane. Find the k closest points to the origin. You may return the answer in any order.



**Examples:**

```
Input: points = [[1,3],[-2,2]], K = 1
Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].

Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)
```

###### Approach-1: Use Sorting

- Sort the points by distance, then take the closest K points.
- **Time Complexity:** O(NLogN), where N is the length of points.
- **Space Complexity:** O(N).

###### Approach-2: Use Randomized QuickSelect

- Use Randomized QuickSelect to find the Kth smallest element with comparison b/w two elements done on the calculated distance.
- Then return all element upto K coz all these element will be smaller than all elements to the right of K.
- As we only need to give K smallest element in any order simply returning them will suffice.
- If we are asked to return in sorted order sort all elements upto K and return them.
- **Time complexity: O(N)** in the average case

###### Implementation:

```
from typing import List
import random


class Solution:
    def kClosest(self, points: List[List[int]], K: int) -> List[List[int]]:
        return self._kClosestUtil(points, 0, len(points)-1, K)

    def _kClosestUtil(self, points, low, high, K):
        if low <= high:
            partition_index = self._partition(points, low, high)
            if (partition_index == K - 1):
                return points[:K]
            elif (partition_index > K - 1):
                return self._kClosestUtil(points, low, partition_index - 1, K)
            else:
                return self._kClosestUtil(points, partition_index + 1, high, K)

    def _dist_from_origin(self, point):
        return point[0]*point[0] + point[1]*point[1]

    def _partition(self, points, low, high):
        rand_index = random.randint(low, high)
        points[rand_index], points[high] = points[high], points[rand_index]

        pivot = points[high]
        pivot_dist_origin = self._dist_from_origin(pivot)
        for i in range(low, high):
            if (self._dist_from_origin(points[i]) < pivot_dist_origin):
                points[low], points[i] = points[i], points[low]
                low += 1

        points[low], points[high] = points[high], points[low]
        return low


s = Solution()
print(s.kClosest([[1, 3], [-2, 2]], 1))
print(s.kClosest([[3, 3], [5, -1], [-2, 4]], 2))
print(s.kClosest([[3, 3], [5, -1], [-2, 4]], 3))
```

**Output:**

```
[[-2, 2]]
[[3, 3], [-2, 4]]
[[3, 3], [-2, 4], [5, -1]]
```

###### Complexity:

- **Time complexity: O(N)** in the average case, **O(N<sup>2</sup>)** in the worst case.
- **Space complexity: O(1)**



<br>

<br>

------

<a href="sorting-algorithms" class="prev-button">&larr; Previous: Sorting Algorithms</a>   

<a href="recursion-backtrack-approach" class="next-button">Next: Recursion and Backtrack Approach  &rarr;</a>

