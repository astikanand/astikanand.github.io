---
permalink: /techblogs/advanced-data-structures/suffix-tree
topic: suffix-tree
---



# Suffix Tree

###### What is Suffix Tree ?

- First introduced by **Weiner (1973)**, which Donald Knuth subsequently characterized as **"Algorithm of the Year 1973"**. 
- The construction was greatly simplified by McCreight (1976) , and also by Ukkonen (1995).
- A Suffix Tree for a given text is a **compressed trie** for all suffixes of the given text.

###### Why Suffix Tree ?

- Helps to search pattern pat[0..m-1] in a text txt[0...n-1] where m < n.
- We have different algorithms like KMP Algorithm, Rabin-Karp Algorithm, Finite Automata based Algorithm and Boyer Moore Algorithm for doing the same task.
- All of the above algorithms preprocess the pattern to make the pattern searching faster.
- The best time complexity that we could get by preprocessing pattern is **O(n)** where n is length of the text.
- But in case of suffix trees, once the suffix tree is built after the preprocessing, we can search any pattern in **O(m)** time where m is length of the pattern.
- Preprocessing of text may become costly if the text changes frequently, so it is good for fixed text or less frequently changing text though.

<img src="assets/suffix_tree_example.png" width="50%">



###### Abstract Steps to Build a Suffix Tree?

1. Generate all suffixes of given text.
2. Consider all suffixes as individual words and build a compressed trie.

###### Abstract Steps to Search in Suffix Tree

1. Starting from the first character of the pattern and root of Suffix Tree, do following for every character.
   - For the current character of pattern, if there is an edge from the current node of suffix tree, follow the edge.
   - If there is no edge, print “pattern doesn’t exist in text” and return.
2. If all characters of pattern have been processed, i.e., there is a path from root for characters of the given pattern, then print “Pattern found”.

#### Applications of Suffix Tree

Suffix tree can be used for a wide range of problems. Some famous problems where it provides optimal time complexity solution are:

1. Pattern Searching
2. Finding the longest repeated substring
3. Finding the longest common substring
4. Finding the longest palindrome in a string

## Ukkonen’s Suffix Tree Construction***











<br>

<br>

---

<a href="4_suffix_array" class="prev-button">&larr; Previous: Suffix Array</a>             

<a href="6_segment_tree" class="next-button">Next: Segment Tree &rarr;</a>

