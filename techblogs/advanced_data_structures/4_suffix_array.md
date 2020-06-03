---
permalink: /techblogs/advanced-data-structures/suffix-array
topic: suffix-array
---



# Suffix Array

###### What is Suffix Array ?

- Invented independently by **Manber & Myers** in **1990** and  **Gaston Gonnet** in **1992**.
- **Li, Zhize, Li, Jian and Huo, Hongwei** gave the first in-place **O(n)** time suffix array construction algorithm in **2016**.
- A suffix array is a sorted array of all suffixes of a given string.
- It is a simple, space efficient alternative to suffix tree.

###### Why Suffix Array ?

- A suffix array can be constructed from Suffix tree by doing a DFS traversal of the suffix tree.
- In fact Suffix array and suffix tree both can be constructed from each other in linear time.
- Advantages of suffix arrays over suffix trees include improved space requirements, simpler linear time construction algorithms (Ukkonen’s algorithm) and improved cache locality.

<img src="assets/suffix_array_example_1.png" width="35%">

#### Applications of Suffix Array

- Suffix array is an extremely useful data structure, it can be used for a wide range of problems. 
- Following are some famous problems where Suffix array can be used:
    1. Pattern Searching
    2. Finding the longest repeated substring
    3. Finding the longest common substring
    4. Finding the longest palindrome in a string

## Suffix Array: Naive Method to Build and Search***

###### Build the Suffix Array:

- A simple method to construct suffix array is to make an array of all suffixes and then sort the array.
- **Time Complexity: O(n<sup>2</sup>logn)** 
- Sorting step itself takes O(n<sup>2</sup>Logn) time as every comparison is a comparison of two strings and the comparison takes O(n) time.
- There are many other efficient algorithms to build suffix array.

###### Search a pattern using Suffix Array

-  Since we have a sorted array of all suffixes, we will use Binary Search for searching the pattern pat of length m.
- **Time Complexity: O(mlogn)**
- Logn to search in array and m time for comparing m length string.
- In fact there is a O(m) suffix array based algorithm to search a pattern.

###### Implementation of Naive Method:

```python
def build_suffix_array_naive(word):
    suffixes = []
    n = len(word)
    for i in range(n):
        suffixes.append((i, word[i:]))
    
    suffixes.sort(key=lambda k: k[1])

    suffix_arr = []
    for i, _ in suffixes:
        suffix_arr.append(i)

    print("Built Suffix Array: {}".format(suffix_arr))
    return suffix_arr


def search(pat, suffix_arr, word):
    n = len(suffix_arr)
    l = 0; r = n-1
    flag = False
    while(l<=r):
        mid = (l+r)//2
        if(pat == word[suffix_arr[mid]:]):
            flag = True
            break
        if(pat < word[suffix_arr[mid]:]):
            r = mid-1
        else:
            l = mid+1
    
    if(flag):
        print("Pattern '{}' Found at index: {}.".format(pat, mid))
    else:
        print("Pattern '{}' NOT Found.".format(pat))



print("Suffix Array Naive Example:")
suffix_arr = build_suffix_array_naive("banana")
search("ana", suffix_arr, "banana")
search("nana", suffix_arr, "banana")
search("axy", suffix_arr, "banana")
```

**output:**

![](assets/suffix_array_naive_method_output.png)

###### Time Complexity:

- **Time Complexity: O(n<sup>2</sup>logn)**  - Building
- **Time Complexity: O(mlogn)** - Searching the built suffix array



## Suffix Array: nLogn Algorithm to Build***

###### Problem with Naive Method:

- The Naive algorithm is to consider all suffixes, sort them using a O(nLogn) sorting algorithm and while sorting, maintain original indexes.
- **Time complexity: O(n<sup>2</sup>Logn)** where n is the number of characters in the input string.

###### New Enhanced and Awared Approach:

- Let us first discuss a O(nLognLogn) algorithm for simplicity. 
- The idea is to use the fact that strings that are to be sorted are suffixes of a single string.
- We first sort all suffixes according to first character, then according to first 2 characters, then first 4 characters and so on while the number of characters to be considered is smaller than 2n.
- The important point is, if we have sorted suffixes according to first 2<sup>i</sup> characters, then we can sort suffixes according to first 2<sup>n+1</sup> characters in O(nLogn) time using a nLogn sorting algorithm like Merge Sort.
- This is possible as two suffixes can be compared in O(1) time (we need to compare only two values).
- The sort function is called O(Logn) times (Note that we increase number of characters to be considered in powers of 2).
- Therefore overall time complexity becomes O(nLognLogn).



## LCP Array Construction from Suffix Array to Enhance Search***

- In suffix array, the Binary Search used to search for pat in text takes O(m*Logn) time where m is length of the pattern to be searched and n is length of the text.
- With the help of LCP array, we can search a pattern in O(m + Log n) time.

#### LCP Array:

- LCP Array is an array of size n (like Suffix Array).

- A value **lcp[i]** indicates length of the longest common prefix of the suffixes indexed by suffix[i] and suffix[i+1]. 

- suffix[n-1] is not defined as there is no suffix after it.

    <img src="assets/lcp_array_for_suffixes.png" width="50%">

    

> **Two methods of LCP array construction:**

1. Compute the LCP array as a byproduct to the suffix array (**Manber & Myers Algorithm**).
2. Use an already constructed suffix array in order to compute the LCP values. (**Kasai Algorithm**).

### Kasai Algorithm

The algorithm constructs LCP array from suffix array and input text in O(n) time. 

**Idea of Algorithm:**

- Let lcp of suffix beginning at txt[i] be k. 
- If k is greater than 0, then lcp for suffix beginning at txt[i+1] will be atleast k-1. 
- The reason is, relative order of characters remain same. 
- If we delete the first character from both suffixes, we know that at least k characters will match. 
- ***Example:*** For substring "ana", lcp is 3, so for string "na" lcp will be atleast 2.

###### Implementation:

```python
def create_lcp_array_kasai(text, suffix_arr):
    n = len(suffix_arr)

    # LCP Araay to store LCPs.
    lcp_arr = [0]*n     

    # Create an inverse of suffix array, it is used to get next suffix string from suffix array.
    # Example:- if suffix_arr[0] is 5, the inv_suffix_arr[5] would store 0.
    inv_suffix_arr = [0]*n
    for i in range(n):
        inv_suffix_arr[suffix_arr[i]] = i
    
    # Initialize length of previous LCP
    k = 0

    # Process all suffixes one by one starting from first suffix in text[].
    for i in range(n):
        # If current suffix is at n-1, then we don’t have next substring to consider.
        # So lcp is not defined for this substring, we put zero.
        if inv_suffix_arr[i] == n-1:
            k = 0
            continue

        # j contains index of the next substring to be considered  to compare with the present 
        # substring, i.e., next string in suffix array.
        j = suffix_arr[inv_suffix_arr[i] + 1]

        # Directly start matching from k'th index as at-least k-1 characters will match
        while (i+k<n and j+k<n and text[i+k]==text[j+k]):
            k += 1
        
        # LCP for the present suffix.
        lcp_arr[inv_suffix_arr[i]] = k

        # Delete the starting character from the string. 
        if k>0: k -= 1
    
    print("Inverse Suffix Array: {}".format(inv_suffix_arr))
    print("LCP Array: {}".format(lcp_arr))

    

print("Kasai - LCP Array Construction Example:")
text = "banana"
suffixes = ["banana", "anana", "nana", "ana", "na", "a"]
sorted_suffixes = ["a", "ana", "anana", "banana", "na", "nana"]
suffix_arr = [5, 3, 1, 0, 4, 2]
print("Given Text: '{}'".format(text))
print("Suffixes: {}".format(suffixes))
print("Sorted Suffixes: {}".format(sorted_suffixes))
print("\nSuffix Array: {}".format(suffix_arr))
create_lcp_array_kasai("banana", [5, 3, 1, 0, 4, 2])
```

**Output:**

![](assets/lcp_array_kasai_output.png)

###### Complexity:

- **Time: O(n)** If the suffix array is already created
- **Space: O(n)** Extra space for storing inverse suffix array.



> **Illustration of Algorithm:**

- We first compute LCP of first suffix in text which is **"banana"**. 

    - We need next suffix in suffix_arr to compute LCP.
    - ***Fact Remember:*** lcp[i] is defined as Longest Common Prefix of suffix[i] and suffix[i+1].
    - To find the next suffix in suffix_arr[], we use inv_suffix_arr[], the **next suffix is "na"**.
    - Since there is no common prefix between "banana" and "na", the value of LCP for "banana" is 0.
    - "banana" is at index 3 in suffix array, so we fill **lcp[3] as 0**.

    

- Next we compute LCP of second suffix in text which is **"anana"**.

    - For "anana" the **next suffix is "banana"**.
    - Since there is no common prefix, the value of LCP for "anana" is 0 and it is at index 2 in suffix array, so we fill **lcp[2] as 0**.

    

- Next we compute LCP of third suffix in text which is **"nana"**.

    - Since there is **no next suffix**, the value of LCP for "nana" is not defined. We fill **lcp[5] as 0**.

    

- Next we compute LCP of third suffix in text which is **"ana"**.

    - For "ana" the **next suffix is "anana"**.

    - Since there is a common prefix of length 3, the value of LCP for "ana" is 3. We fill **lcp[1] as 3**.

        

- Now we compute LCP for fourth suffix in text which is **"na"**. 

    - For "na" the **next suffix is "nana"**.

    - ***This is where Kasai’s algorithm uses the trick that LCP value must be at least 2 because previous LCP value was 3.***

    - Since there is no character after “na”, final value of LCP is 2. We fill **lcp[4] as 2**.

        

- Now we compute LCP for last suffix in text which is **"a"**.

    - For "a" the **next suffix is "ana"**.
    - Using Kasai, LCP value must be at least 1 because previous value was 2. 
    - Since there is no character after "a", final value of LCP is 1. We fill **lcp[0] as 1**.

##### Notes:

- Using binary search with the suffix array still takes O(mlogn) time.
- But we can reduce the search time complexity to O(m + Log n) using the constructed LCP array.





<br><br>

------

<a href="3_avl_tree" class="prev-button">&larr; Previous:  AVL Tree</a>             

<a href="5_suffix_tree" class="next-button">Next: Suffix Tree &rarr;</a>

