---
permalink: /techblogs/algorithms/miscellaneous
topic: miscellaneous
---



# Miscellaneous Algorithmic Problems

Here are some interesting list of miscellaneous problems.

## 1. Trapping Rain Water Problem

###### Problem:

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

> Example:
>
> Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
>
> Output: 6

###### Approach-1:

- Find left_pole and right_pol array for every element similar to finding leader in array.
- Then iterate over every element and find the water contributed by that particular element by **min(left_pole[i], right_pole[i]) - arr[i]**.

###### Approach-1 Implementation

```python
def trap(height):
    n = len(height)
    right_pole = [0]*n
    right_pole[n-1] = height[n-1]
    for i in range(n-2, -1, -1):
        right_pole[i] = max(right_pole[i+1], height[i])
        
    left_pole = [0]*n
    left_pole[0] = height[0]
    for i in range(1, n):
        left_pole[i] = max(left_pole[i-1], height[i])
        
    water = 0
    for i in range(n):
        water += min(left_pole[i], right_pole[i]) - height[i]
    
    return water
```

###### Complexity:

- **Time: O(n)** 
- **Auxilliary Space: O(n)** 

###### Approach-2:

- Try to eliminate calculating left_pole and right_pole.
- Try doing in the one iteration only.

###### Implementation:

```python
def trap2(height):
    n = len(height)
    i = 0
    j = n-1
    left_max = 0
    right_max = 0
    water = 0
    while(i < j):
        if(height[i] < height[j]):
            left_max = max(left_max, height[i])
            water += left_max - height[i]
            i += 1
        else:
            right_max = max(right_max, height[j])
            water += right_max - height[j]
            j -= 1
    
    return water
```

###### Complexity:

- **Time: O(n)** 
- **Auxilliary Space: O(1)** 

<br>

<br>

##### Problems To Do:

- Find Majority Element in Array

<br>

<br>

------

<a href="branch-and-bound-approach" class="prev-button">&larr; Previous: Branch and Bound Approach</a> 

