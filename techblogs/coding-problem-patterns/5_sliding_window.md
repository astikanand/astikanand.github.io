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

**Code:**

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

<br>

## 2. Fruits into Baskets

###### Problem Statement:

In a row of trees, the `i`-th tree produces fruit with type `tree[i]`.

You **start at any tree of your choice**, then repeatedly perform the following steps:

1. Add one piece of fruit from this tree to your baskets. If you cannot, stop.
2. Move to the next tree to the right of the current tree. If there is no tree to the right, stop.

Note that you do not have any choice after the initial choice of starting tree: you must perform step 1, then step 2, then back to step 1, then step 2, and so on until you stop.

You have two baskets, and each basket can carry any quantity of fruit, but you want each basket to only carry one type of fruit each.

What is the total amount of fruit you can collect with this procedure?

```
====== Examples ======
Input: [1,2,1]
Output: 3
Explanation: We can collect [1,2,1].

Input: [0,1,2,2]
Output: 3
Explanation: We can collect [1,2,2].
If we started at the first tree, we would only collect [0, 1].

Input: [1,2,3,2,2]
Output: 4
Explanation: We can collect [2,3,2,2].
If we started at the first tree, we would only collect [1, 2].

Input: [3,3,3,1,2,1,1,2,3,3,4]
Output: 5
Explanation: We can collect [1,2,1,1,2].
If we started at the first tree or the eighth tree, we would only collect 4 fruits.
```

**Constraints:**

1. `1 <= tree.length <= 40000`
2. `0 <= tree[i] < tree.length`



###### Problem Stats:

- **Difficulty: Medium**
- **Category:** Leetcode - 904
- **Companies:** Google

<br>

###### Approach:

- Need to make a sliding window with atmost 2 different elements into it.
- We will keep count of elements in the window to know about if there are more than 2 elements.
- Once there are more than 2 elements shrink the window to have atmost 2 different elements.

<br>

###### Implementation:

**Code:**

```python
from typing import List
from collections import defaultdict


class Solution:
    def totalFruit(self, tree: List[int]) -> int:
        max_count = curr_count = 0

        fruits_count = defaultdict(int)
        i, n = 0, len(tree)

        while i < n:
            if (len(fruits_count) < 2) or (len(fruits_count) == 2 and tree[i] in fruits_count):
                fruits_count[tree[i]] += 1
                curr_count += 1
                i += 1
            else:
                max_count = max(max_count, curr_count)
                j = i - curr_count
                while len(fruits_count) > 1:
                    fruits_count[tree[j]] -= 1
                    curr_count -= 1
                    if fruits_count[tree[j]] == 0:
                        del fruits_count[tree[j]]
                    j += 1

        max_count = max(max_count, curr_count)

        return max_count 


print(Solution().totalFruit([1,2,1]))
print(Solution().totalFruit([0,1,2,2]))
print(Solution().totalFruit([1,2,3,2,2]))
print(Solution().totalFruit([3,3,3,1,2,1,1,2,3,3,4]))
```

**Output:**

```
3
3
4
5
```

**Complexity:**

- ***Time: O(N)*** - Array is traversed only once.
- ***Space: O(1)*** - Hashmap contains atmost 2 keys.

<br>

<br>

