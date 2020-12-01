---
permalink: /techblogs/coding-problem-patterns/two-heaps-pattern
topic: two-heaps-pattern
---



# Two Heaps Pattern

###### Introduction

- This pattern is based on the use of 2 heaps to process the elements.

<br>

### Problems Following Two Heaps Pattern

## 1. Median from Number Stream

###### Problem Statement:

Median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value.

So the median is the mean of the two middle value.
For example:

[2,3,4], the median is 3

[2,3], the median is (2 + 3) / 2 = 2.5

**Design a data structure that supports the following two operations:**

- void addNum(int num) - Add a integer number from the data stream to the data structure.
- double findMedian() - Return the median of all elements so far

```
====== Examples ======
addNum(1)
addNum(2)
findMedian() -> 1.5
addNum(3) 
findMedian() -> 2
```

<br>

###### Approach:

To approach this problem need to keep two things in mind:

1. If we could maintain direct access to median elements at all times, then finding the median would take a constant amount of time.
2. If we could find a reasonably fast way of adding numbers to our containers, additional penalties incurred could be lessened.

Most important thing though to keep in mind is that we only need a consistent way to access the median elements and keeping entire input sorted is not required.

<br>

[Any Data Structure available to satisfy our need ?]()

As it turns out there are two data structures for the job:

1. Heaps (or Priority Queues)
2. *Self-balancing Binary Search Trees*

**Heaps are a natural ingredient for this dish, adding elements to them take logarithmic order of time and also give direct access to the maximal/minimal elements in a group.**

<br>

[What to do ?]()

If we could maintain two heaps in the following way:

1. A max-heap to store the smaller half of the input numbers
2. A min-heap to store the larger half of the input numbers

This gives access to median values in the input: they comprise the top of the heaps!

<br>

[How it works?]()

If the following conditions are met:

- Both the heaps are balanced (or nearly balanced)
- The max-heap contains all the smaller numbers while the min-heap contains all the larger numbers

Then we can say that:

- All the numbers in the max-heap are smaller or equal to the top element of the max-heap (let's call it xxx)
- All the numbers in the min-heap are larger or equal to the top element of the min-heap (let's call it yyy)

Then xxx is smaller than (or equal to) almost half of the elements and yyy is larger than (or equal to) the other half, thats what median is.

<br>

[But then how to Balance two Heaps ?]()

1. Add a num to low max-heap. Since low max-heap received a new element, we must balance high min-heap, so remove the largest element from low max-heap and offer it to high min-heap.
2. As the high min-heap might end holding more elements than the low max-heap after the previous operation, fix that by removing the smallest element from high min-heap and offering it to low max-heap.

<br>

###### Implementation:

**Code:**

```python
from heapq import heappop, heappush


class MedianFinder:
    def __init__(self):
        self.low_max_heap = []
        self.high_min_heap = []

    def addNum(self, num: int) -> None:
        # Add num low_max_heap, since low_max_heap received a new element
        # Balance high_min_heap by removing the largest element from low_max_heap and offer to high_min_heap.
        heappush(self.low_max_heap, -num)
        low_max_heap_largest_element = -heappop(self.low_max_heap)
        heappush(self.high_min_heap, low_max_heap_largest_element)

        # high_min_heap might end having more elements than the low_max_heap, after the previous operation.
        # Fix that by removing the smallest element from high_min_heap and offering it to low_max_heap.
        if (len(self.high_min_heap) > len(self.low_max_heap)):
            high_min_heap_smallest_element = heappop(self.high_min_heap)
            heappush(self.low_max_heap, -high_min_heap_smallest_element)

    def findMedian(self) -> float:
        if ((len(self.high_min_heap) + len(self.low_max_heap)) % 2 == 1):
            return float(-self.low_max_heap[0])
        else:
            return float((-self.low_max_heap[0] + self.high_min_heap[0])/2)


mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())
mf.addNum(3)
print(mf.findMedian())
```

**Output:**

```
1.5
2.0
```

**Complexity:**

- ***Time: O(LogN)*** 
  - At worst, there are three heap insertions and two heap deletions from the top and each of these takes about O(log⁡n) time.
  - Finding the median takes constant O(1) time since the tops of heaps are directly accessible.
- ***Space: O(N)*** - To store input in heaps.

