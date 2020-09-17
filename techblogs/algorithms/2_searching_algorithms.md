---
permalink: /techblogs/algorithms/searching-algorithms
topic: searching-algorithms
---



# Searching Algorithms

###### Why Searching Algorithms ?

- Many of the computer science problems require us to search through the data to find certian things or pattern. 
- In these scenarios we need to use the Searching Algorithms.

> **Famous Searching Algorithms:**

- Linear Search
- Binary Search
- Ternary Search
- Jump Search



<br>

<br>

> ### Algo-1: Binary Search***

Given a sorted array arr[ ] of n elements, write a function to search a given element x in arr[ ].

Return the index if it is found or else return -1.

###### Algorithm: Divide and Conquer Approach

- Check the middle element of the array, if **middle element = num** return index. 
- If the **middle element < num**, search the num in right half of the array. 
- Else search in the num in left half of the array.
- If num not found return -1.

###### **Implementation:**

```python
def binary_search(arr, l, r, num):
    if(r>=l):
        mid = (l+r)//2
        # If mid element is equal to num, return index
        if(arr[mid]==num):
            return mid
        # If mid element is lesser than num, search in the right half of the array
        elif(arr[mid] < num):
            return binary_search(arr, mid+1, r, num)
        # If mid element is grater searhc in left half of the array
        else:
            return binary_search(arr, l, mid-1, num)
    
    return -1



print("Example-1: binary_search(arr, num)")
arr = [2, 3, 4, 10, 40]
print(binary_search(arr, 0, 4, 10))

print("Example-2: binary_search(arr, num)")
arr = [2, 3, 4, 10, 40]
print(binary_search(arr, 0, 4, 15))

print("Example-3: binary_search(arr, num)")
arr = [2]
print(binary_search(arr, 0, 0, 2))
```

**Output:**

![binary_search_output](assets/binary_search_output.png)

###### **Complexity:**

- **Time: O(logn)**
- **Auxilliary Space: O(1)**

<br>

---

-----

<br>

### Standard Searching Algorithms Problems









<br>

<br>

------

<a href="complexity-analysis" class="prev-button">&larr; Previous: Complexity Analysis</a>   

<a href="sorting-algorithms" class="next-button">Next: Sorting Algorithms  &rarr;</a>

