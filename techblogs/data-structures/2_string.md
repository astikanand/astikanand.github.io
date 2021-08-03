---
permalink: /techblogs/data-structures/string
topic: string
---



# String

###### What is a string ?

- A string is a data type used in programming, such as an integer and floating point unit.
- But it is used to represent text rather than numbers.
- It is comprised of a set of characters that can also contain spaces and numbers.

```
====== Examples ======
1) "hamburger"
2) "I ate 3 hamburgers"
```

#### Applications of String

- Computers are widely used for word processing applications such as creating, inserting, updating, and modifying textual data.
- Besides this, we need to search for a particular pattern within a text, delete it, or replace it with another pattern.
- So, there is a lot that we as users do to manipulate the textual data.

<br>

---

### Standard String Problems

## 1. Find if first string is a subsequence of second***

###### Problem:

Given two strings str1 and str2, find if str1 is a subsequence of str2. A subsequence is a sequence that can be derived from another sequence by deleting some elements without changing the order of the remaining elements.

> **Example:**
>
> ***Input:*** str1 = "AXY", str2 = "ADXCPY" &nbsp; ***Output:*** True
>
> ***Input:*** str1 = "AXY", str2 = "YADXCP" &nbsp; ***Output:*** False
>
> ***Input:*** str1 = "mtsdet", str2 = "meetsandmeets"  &nbsp; ***Output:*** True

###### Approach

- Traverse both strings from one side to other side.
- If a matching character found, move ahead in both strings, otherwise move ahead only in str2.
- **Time Complexity: O(n)**

###### Implementation

```python
def check_subsequence(str1, str2):
    n1 = len(str1)
    n2 = len(str2)
    i = j = 0

    while(i < n1 and j < n2):
        if(str1[i] == str2[j]):
            i += 1
        j += 1
   
    print(i==n1)


print("Example-1: check_subsequence('AXY', 'ADXCPY')")
check_subsequence('AXY', 'ADXCPY')

print("\nExample-2: check_subsequence('AXY', 'YADXCP')")
check_subsequence('AXY', 'YADXCP')

print("\nExample-3: check_subsequence('mtsdet', 'meetsandmeets')")
check_subsequence('mtsdet', 'meetsandmeets')
```

**Output:**

![check_subsequence_output](assets/check_subsequence_output.png)

###### **Complexity:**

- **Time:** **O(n)** 
- **Auxilliary Space: O(1)**

<br>

<br>

---

<a href="array" class="prev-button">&larr; Previous: Array</a>          

<a href="linked-list" class="next-button">Next: Linked List &rarr;</a>