---
permalink: /techblogs/coding-problem-patterns/quick-select-pattern
topic: quick-select-pattern
---



# Quick Select Pattern

###### Introduction:

- This patterns deals with the use of QuickSelect Algorithm

### Problems Following Quick Select Pattern

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

**Python Code:**

```python
import random


def find_kth_smallest(arr, low, high, k):
    if (low <= high):
        p_index = partition(arr, low, high)
        if (p_index == k - 1):
            return arr[p_index]
        elif (p_index > k - 1):
            return find_kth_smallest(arr, low, p_index-1, k)
        else:
            return find_kth_smallest(arr, p_index + 1, high, k)

    return - 1


def partition(arr, low, high):
    rand_index = random.randint(low, high)
    arr[rand_index], arr[high] = arr[high], arr[rand_index]

    pivot = arr[high]

    for i in range(low, high):
        if (arr[i] < pivot):
            arr[low], arr[i] = arr[i], arr[low]
            low += 1

    arr[low], arr[high] = arr[high], arr[low]

    return low


print(find_kth_smallest([7, 10, 4, 3, 20, 15], 0, 5, 3))
print(find_kth_smallest([10, 4, 5, 8, 6, 11, 26], 0, 6, 3))
print(find_kth_smallest([10, 4, 5, 8, 6, 11, 26], 0, 6, 9))
print(find_kth_smallest([5], 0, 0, 1))
```

**Java Code:**

```java
import java.util.Random;

public class Q1KthSmallestInUnsortedArr {
    public int findKthSmallest(int[] arr, int low, int high, int K){
        if(low <= high){
            int partitionIndex = getPartitionIndex(arr, low, high);
            if(partitionIndex == K - 1){
                return arr[partitionIndex];
            } else if (partitionIndex < K-1){
                return findKthSmallest(arr, partitionIndex+1, high, K);
            } else {
                return findKthSmallest(arr, low, partitionIndex-1, K);
            }
        }
        return -1;
    }

    public int getPartitionIndex(int[] arr, int low, int high){
        int randomIndex = low + new Random().nextInt(high-low+1);
        int temp = arr[high]; arr[high] = arr[randomIndex]; arr[randomIndex] = temp;

        int pivot = arr[high];
        int i = low;
        for(; i < high; ++i){
            if(arr[i] < pivot){
                temp = arr[low]; arr[low] = arr[i]; arr[i] = temp;
                low += 1;
            }
        }
        temp = arr[low]; arr[low] = arr[high]; arr[high] = temp;

        return low;
    }

    public static void main(String[] args){
        Q1KthSmallestInUnsortedArr obj = new Q1KthSmallestInUnsortedArr();
        System.out.println(obj.findKthSmallest(new int[]{7, 10, 4, 3, 20, 15}, 0, 5, 3));
        System.out.println(obj.findKthSmallest(new int[]{10, 4, 5, 8, 6, 11, 26}, 0, 6, 3));
        System.out.println(obj.findKthSmallest(new int[]{10, 4, 5, 8, 6, 11, 26}, 0, 6, 9));
        System.out.println(obj.findKthSmallest(new int[]{5}, 0, 0, 1));
    }
}
```



**Output:**

```
7
6
-1
5
```

**Complexity:**

- **Time: O(N)** in the average case, **O(N<sup>2</sup>)** in the worst case.
- **Space: O(1)**

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

**Code:**

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

**Complexity:**

- ***Time: O(N)*** in the average case, **O(N<sup>2</sup>)** in the worst case.
- ***Space: O(1)***

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

**Code:**

```python
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

**Complexity:**

- ***Time: O(N)*** in the average case, **O(N<sup>2</sup>)** in the worst case.
- ***Space: O(1)***

