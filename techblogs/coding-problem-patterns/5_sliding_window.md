---
permalink: /techblogs/coding-problem-patterns/sliding-window-pattern
topic: sliding-window-pattern
---



# Sliding Window Pattern

###### Introduction

- This pattern makes use of the sliding window concept.

<br>

### Problems Following Sliding Window Pattern

## 1. Sliding Window Maximum

###### Problem Statement:

Given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right.

You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.

Return *the max sliding window*.

```
====== Examples =====
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
 
Input: nums = [1], k = 1
Output: [1]

Input: nums = [1,-1], k = 1
Output: [1,-1]

Input: nums = [9,11], k = 2
Output: [11]

Input: nums = [4,-2], k = 2
Output: [4]
```

<br>

###### Approach: 

- We can make use of deque to keep track of the largest number candidates.
- Remove the largest candidate from deque if window has moved past from largest candidate.
- When new number comes, again check and if possible modify the largest number candidates in the deque.
- And then insert the new number in the deque as the candidate.

<br>

###### Implementation:

**Python Code:**

```python
from typing import List
from collections import deque


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        result = []
        dq = deque()

        # Process first k elements to prepare the window
        for i in range(k):
            # Till current num is greater or equal to the numbers in the deque, remove numbers
            # from deque as they can't be the candidate for max in window
            while (dq and nums[i] >= nums[dq[-1]]):
                dq.pop()
            dq.append(i)  # put the current num in deque

        # Put the max from the first window to our result
        result.append(nums[dq[0]])

        # Now start from the kth index and move window by one element at a time
        for i in range(k, n):
            # Check and remove if the window have moved past the max number available in the deque
            if (dq[0] < i-k+1):
                dq.popleft()

            # Now again process till current num is greater or equal to the numbers in the deque,
            # remove numbers from deque as they can't be the candidate for max in window
            while (dq and nums[i] >= nums[dq[-1]]):
                dq.pop()
            dq.append(i)

            result.append(nums[dq[0]])  # put the current num in deque

        return result


print(Solution().maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
print(Solution().maxSlidingWindow([1], 1))
print(Solution().maxSlidingWindow([1, -1], 1))
print(Solution().maxSlidingWindow([9, 11], 2))
print(Solution().maxSlidingWindow([4, -2], 2))
```

**Java Code:**

```java
import java.util.*;

public class Q1SlidingWindowMaximum {
    public int[] maxSlidingWindow(int[] nums, int k){
        int n = nums.length;
        int[] slidingWindowResult = new int[n-k+1];
        Deque<Integer> deque = new ArrayDeque<>();

        for(int i = 0; i < k; ++i){
            while(!deque.isEmpty() && nums[i] >= nums[deque.getLast()]){
                deque.removeLast();
            }
            deque.addLast(i);
        }

        slidingWindowResult[0] = nums[deque.getFirst()];

        for (int i = k; i < n; ++i){
            if(deque.getFirst() < i-k+1){
                deque.removeFirst();
            }

            while(!deque.isEmpty() && nums[i] >= nums[deque.getLast()]){
                deque.removeLast();
            }
            deque.addLast(i);

            slidingWindowResult[i-k+1] = nums[deque.getFirst()];
        }

        return slidingWindowResult;

    }

    public static void main(String[] args){
        Q1SlidingWindowMaximum obj = new Q1SlidingWindowMaximum();
        System.out.println(Arrays.toString(obj.maxSlidingWindow(new int[] {1, 3, -1, -3, 5, 3, 6, 7}, 3)));
        System.out.println(Arrays.toString(obj.maxSlidingWindow(new int[] {1}, 1)));
        System.out.println(Arrays.toString(obj.maxSlidingWindow(new int[] {1, -1}, 1)));
        System.out.println(Arrays.toString(obj.maxSlidingWindow(new int[] {9, 11}, 2)));
        System.out.println(Arrays.toString(obj.maxSlidingWindow(new int[] {4, -2}, 2)));
    }
}
```

**Output:**

```
[3, 3, 5, 5, 6, 7]
[1]
[1, -1]
[11]
[4]
```

**Complexity:**

- ***Time: O(n)*** - We iterate over our elements and for each element it can be put inside and outside of our deque only once.
- ***Space: O(k)*** - Maximum size of the deque.

<br>

