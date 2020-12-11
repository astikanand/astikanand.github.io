---
permalink: /techblogs/coding-problem-patterns/modified-binary-search-pattern
topic: modified-binary-search-pattern
---



# Modified Binary Search Pattern

###### Introduction

- This pattern uses binary search in an intelligent way.

<br>

### Problems Following Modified Binary Search Pattern

## 1. Median of Two Sorted Arrays

###### Problem Statement:

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays in **O(log(m+n))**

```
====== Examples ======
Input: nums1 = [1, 3, 8, 9, 15], nums2 = [7, 11, 18, 19, 21, 25]
Output: 11.0
Explanation: merged array = [1, 3, 7, 8, 9, 11, 15, 18, 19, 21, 25] and median is 11.

Input: nums1 = [1, 3, 8, 9, 15], nums2 = [7, 11, 18, 19, 21, 25]
Output: 13.0
Explanation: merged array = [1, 3, 7, 8, 9, 11, 15, 16, 18, 19, 21, 25] and median is 13.

Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
Explanation: merged array = [1,2,3] and median is 2.

Input: nums1 = [2], nums2 = []
Output: 2.0
```

<br>

###### Approach:

- Remember : Median is the middle element in a sorted sequence if total length is odd or avg. of both middle elements if total is even,
- So, in other words, median divides the sorted sequence in 2 parts, left part lesser than median and right part greater than median.
- So here, if some how we are able to partition both of arrays in such a way that total elements in left half (arr1's left + arr2's left) is equal to total elements in right half (arr2's left + arr2's right) we are done.
- If we are able to do that then the 4 elements present at boundary will constitute the median.
- For simplicity purpose we will always consider 1 extra element in left if total lenght is odd and in that case, the 2 elements present on left boundary will be candidate for median.

<br>

###### Implementation:

**Python Code:**

```python
from typing import List


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        m, n = len(A), len(B)

        # Ensure that A is always smaller or equal
        if (m > n):
            A, B = B, A
            m, n = n, m

        # Calculate half length, 1 is added to put an extra element in left if total lenght is odd
        half_total_length = (m + n + 1) // 2

        # Do binary search on smaller array
        low, high = 0, m
        while (low <= high):
            # Find the mid (partition index) for a and correspondingly find partition index for b
            a_partition_index = (low + high) // 2
            b_partition_index = half_total_length - a_partition_index

            # Calculate all 4 elements present at partition boundary
            a_left = float("-inf") if a_partition_index == 0 else A[a_partition_index - 1]
            a_right = float("inf") if a_partition_index == m else A[a_partition_index]
            b_left = float("-inf") if b_partition_index == 0 else B[b_partition_index - 1]
            b_right = float("inf") if b_partition_index == n else B[b_partition_index]

            # Now, if a_left is smaller than b_right and b_left is smaller than a_right
            # We are done with binary search - and we get the required partition index
            if (a_left <= b_right and b_left <= a_right):
                max_left = max(a_left, b_left)
                if ((m + n) % 2 == 1):
                    return float(max_left)
                else:
                    min_right = min(a_right, b_right)
                    return float((max_left + min_right) / 2)
            # if a_left > b_right => we need to move left and search left side for required partition index
            elif (a_left > b_right):
                high = a_partition_index - 1
            # if a_right < b_left => we need to move right and search right side for required partition index
            else:
                low = a_partition_index + 1


arr1 = [1, 3, 8, 9, 15]
arr2 = [7, 11, 18, 19, 21, 25]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [1, 3, 8, 9, 15, 16]
arr2 = [7, 11, 18, 19, 21, 25]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [2, 3, 5, 8]
arr2 = [10, 12, 14, 16, 18, 20, 21]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [22, 23, 25, 28]
arr2 = [10, 12, 14, 16, 18, 20, 21]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [1, 3]
arr2 = [2]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [1, 3]
arr2 = [2, 5]
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [2]
arr2 = []
print(Solution().findMedianSortedArrays(arr1, arr2))

arr1 = [0, 0]
arr2 = [0, 0]
print(Solution().findMedianSortedArrays(arr1, arr2))
```

**Java Code:**

```java
public class Q1MedianTwoSortedArrays {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int[] A = nums1;
        int[] B = nums2;

        if (m > n) {
            int[] temp = A; A = B; B = temp;
            int tmp = m; m = n; n = tmp;
        }

        int halfTotalLength = (m + n + 1) /2;
        int low = 0;
        int high = m;
        double result = 0;

        while(low <= high){
            int partitionIndexA = low + (high-low)/2;
            int partitionIndexB = halfTotalLength - partitionIndexA;

            // Calculate all 4 elements at boundary
            int aLeft = partitionIndexA == 0 ? Integer.MIN_VALUE : A[partitionIndexA-1];
            int aRight = partitionIndexA == m ? Integer.MAX_VALUE : A[partitionIndexA];
            int bLeft = partitionIndexB == 0 ? Integer.MIN_VALUE : B[partitionIndexB-1];
            int bRight = partitionIndexB == n ? Integer.MAX_VALUE : B[partitionIndexB];


            // Now check if this is the partition index required
            if(aLeft <= bRight && bLeft <= aRight){
                // calculate min
                int leftMax = Math.max(aLeft, bLeft);
                if((m + n ) % 2 == 1){
                    result = (double)leftMax;
                } else {
                    int rightMin = Math.min(aRight, bRight);
                    result = (double)(leftMax + rightMin)/2;
                }
                break;
            } else if (aLeft > bRight) {
                low --;
            } else {
                high ++;
            }
        }

        return result;
    }

    public static void main(String[] args){
        int[] arr1, arr2;
        Q1MedianTwoSortedArrays obj = new Q1MedianTwoSortedArrays();

        arr1 = new int[]{1, 3, 8, 9, 15};
        arr2 = new int[]{7, 11, 18, 19, 21, 25};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {1, 3, 8, 9, 15, 16};
        arr2 = new int[] {7, 11, 18, 19, 21, 25};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {2, 3, 5, 8};
        arr2 = new int[] {10, 12, 14, 16, 18, 20, 21};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {22, 23, 25, 28};
        arr2 = new int[] {10, 12, 14, 16, 18, 20, 21};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {1, 3};
        arr2 = new int[] {2};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {1, 3};
        arr2 = new int[] {2, 5};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {2};
        arr2 = new int[] {};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));

        arr1 = new int[] {0, 0};
        arr2 = new int[] {0, 0};
        System.out.println(obj.findMedianSortedArrays(arr1, arr2));
    }
}
```



**Output:**

```
11.0
13.0
12.0
20.0
2.0
2.5
2.0
0.0
```

**Complexity:**

- ***Time: O(log(min(M, N)))*** - We are only doing binary search on the smaller array
- ***Space: O(1)*** 

<br>

<br>



 



