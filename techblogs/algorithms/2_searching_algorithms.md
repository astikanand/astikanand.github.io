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



----

### Standard Searching Algorithms Problems

## 1. Search in sorted and rotated array***

###### Problem:

An element in a sorted array can be found in O(log n) time via binary search. But suppose we rotate an ascending order sorted array at some pivot unknown to you beforehand. So for instance, 1 2 3 4 5 might become 3 4 5 1 2. Devise a way to find an element in the rotated array in O(log n) time.

> **Example:**
>
> ***Input:*** arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3} &nbsp; key = 3
> ***Output:*** Found at index 8
>
> 
>
> ***Input:*** arr[] = {5, 6, 7, 8, 9, 10, 1, 2, 3} &nbsp; key = 4
> ***Output:*** Not found
>
> 
>
> ***Input:*** arr[] = {30, 40, 50, 10, 20} &nbsp; key = 10
> ***Output:*** Found at index 3

###### Approach-Distorted Binary Search

- Find middle point mid = (l + h)/2
- If key is present at middle point, return mid.
- Else If arr[l..mid] is sorted
  - a) If key to be searched lies in range from arr[l] to arr[mid], recur for arr[l..mid].
  - b) Else recur for arr[mid+1..h]
- Else (arr[mid+1..h] must be sorted)
  - a) If key to be searched lies in range from arr[mid+1] to arr[h], recur for arr[mid+1..h].
  - b) Else recur for arr[l..mid] 

###### Implementation

```python
def search(arr, start, end, key): 
    if start > end:
        print("Key {} : NOT Found".format(key))
        return
      
    mid = (start + end) // 2
    if arr[mid] == key:
        print("Key {} : Found at index {}".format(key, mid))
        return
  
    # If arr[start...mid] i.e 1st half is sorted  
    if arr[start] <= arr[mid]: 
        # As the 1st subarray is sorted, Quickly check if key lies in first half or 2nd half  
        if key >= arr[start] and key <= arr[mid]: 
            return search(arr, start, mid-1, key)
        else:
            return search(arr, mid+1, end, key) 
    # Else arr[start..mid] is not sorted, then arr[mid... end] must be sorted
    else:
        # As the 2nd subarray is sorted, Quickly check if key lies in 2nd half or first half
        if key >= arr[mid] and key <= arr[end]: 
            return search(arr, mid+1, end, key)
        else:
            return search(arr, start, mid-1, key)


print("Example-1: search([5, 6, 7, 8, 9, 10, 1, 2, 3], 0, 8, 3)")
search([5, 6, 7, 8, 9, 10, 1, 2, 3], 0, 8, 3)

print("\nExample-2: search([5, 6, 7, 8, 9, 10, 1, 2, 3], 0, 8, 4)")
search([5, 6, 7, 8, 9, 10, 1, 2, 3], 0, 8, 4)

print("\nExample-3: search([30, 40, 50, 10, 20], 0, 4, 10)")
search([30, 40, 50, 10, 20], 0, 4, 10)
```

**Output:**

![serach_sorted_rotated_array_output](assets/serach_sorted_rotated_array_output.png)

###### Complexity:

- **Time:** **O(LogN)** 
- **Auxilliary Space:** **O(1)**



<br>

<br>

------

<a href="complexity-analysis" class="prev-button">&larr; Previous: Complexity Analysis</a>   

<a href="sorting-algorithms" class="next-button">Next: Sorting Algorithms  &rarr;</a>

