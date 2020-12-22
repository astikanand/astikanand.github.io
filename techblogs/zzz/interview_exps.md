## Microsoft Interview

**Getting Call:**

Got a call from a recruiter on Thursday (10th December 2020) evening and asked me if I am interested in Microsoft and told me that I will be having the series of interviews on Saturday (12th December 2020).



**Interview Process Explanation:**

Scheduled the first 2 rounds and told If I clear these 2 rounds then I will have the 3rd round.

And if I clear 3rd round then there will be 4th and final Managerial round.

<br>

##### Round-1: DS-Algo & Problem Solving (1 Hour)

This round was taken by a very senior engineer.

###### First 15 Mins:

Asked previous project questions and my contributions in detail.

Asked some behavioral questions.

###### Next 45 Mins:

**Q1. Given an unsorted array of n distinct numbers, count the number of binary searchable elements.**

[**Binary Searchable Element:**]() arr = [2, 1, 3, 4, 6, 5]    and   target = 5 

We can not find 5, coz when we reach 4, the right element is 6 and we have to move our pointer to left and we miss the opportunity to find 5. So 5 is not a binary searchable element.

```
====== Examples =======
Input: [1, 3, 2]
Output: 1 
Explanation: However we choose the pivot, we will always find 1. But that's not true for 2 and 3. Total = 1

Input: [2, 1, 3, 5, 4, 6]
Output: 2
Explanation: 3 and 6 are numbers guaranteed to be found.

Input: [1, 5, 7, 11, 12, 18]
Output: 6
Explanation: All numbers in the sorted array is guaranteed to be found.

Inut: [3, 2, 1]
Output: 0
Explanation: No number is guaranteed to be found.
```

> **My Solution:**
>
> 1. Gave an O(n<sup>2</sup>) time and O(1) space solution - an approach similar to the quicksort partition method.
> 2. Suggested an O(nlogn) time and O(n) space AVL Tree solution.
>
> The interviewer asked to code the first approach considering the time constraints.

<br>

**Q2. Given two strings, find out whether any anagram of the second string is a substring of the first one.**

```
====== Examples =====
Input: txt = "BACDGABCDA",  pat = "ABCD"
Output: [0, 5, 6]
Anagrams of the second string are found at 0, 5 and 6
```

> **My Solution:**
>
> Gave an O(n) time and O(1) space solution using two hashmaps.
>
> There was some discussion around my time and space complexity and explained it.
>
> When I started coding, he asked me not to code and is fine with the approach 

<br>

[Recruiter Note:]() After the first round recruiter called me saying that I will have the 3rd round also.

<br>

##### Round-2: Problem Solving + Design (1 Hour)

This round was taken again by a very senior engineer.

###### First 10 Mins:

Asked previous project questions and my contributions in detail again.

Asked some behavioral questions again.

###### Next 50 Mins:

**Q1: Given a binary tree and two nodes nodeA and nodeB, find if they are cousins.**

Notes:

- Make sure these nodeA and nodeB are not a sibling.
- We don't have parent pointers and we can't store parent pointers.

> **My Solution:**
>
> Gave an O(n) time and O(w) space solution using bfs traversal using a queue.

<br>

**Q2:  Design a meeting scheduler for n people with a given start time and end time.**

Asked me to write APIs and their input and outputs.

> **My Solution:**
>
> I created 3 APIs for schedule, update and cancel a meeting.
>
> By taking start_time, end_time, people_list and people_calendars.

**Follow Up: Asked me to write how I will store all these data including calendar data and deal with them?**

And then asked me to explain the algorithm of meeting scheduling.

> **My Solution:**
>
> People Data: List of People => [P1, P2, P3, ............]
>
> Calendar Data: List of People's Calendar Data => [P1C1, P2C2, P3C3, ........]
>
> PiCi Data: [(s1, e1), (s2, e2), (s3, e3), ........]
>
>
> Output: True if every people given in the list is free b/w given start_time and end_time else False

<br>

##### Round-3: Design Round (1 Hour)

This round was taken by an Engineering Manager from the US.

**Q1: Design a Contacts Search functionality based on every field present in the contact.**

Requirements:

- We should get typeahead search results based on every field.
- The fields can be first name, last name, full name, nickname, phone number, company name, or website name.

Asked me to write methods and class definitions and input outputs.

> **My Solution:**
>
> I explained the approach of solving this by using prefix tree (Trie) in a dynamic unfolding way by considering every field of contact as a data point to be inserted in Trie.
>
> I wrote some classes and then methods for :
>
> - Trie Creation (Indexing of data)
> - Searching of data on various fields (Trie Search)

**Follow Up-1:** Asked me to code and explain the insertion into the Trie and how I can process all the fields of the person.

> **My Solution:**
>
> Wrote code to process data to be inserted into trie that will be various different fields and referring to single contact object.
>
> I coded the trie insertion to an extent and he asked my strategy for the way I was doing things like storing children pointers in a hashmap and all that.

**Follow Up-2:** Asked me to estimate the amount of memory needed to store 1000 contacts and 1 Billion contacts.

> **My Solution:**
>
> Couldn't answer this question properly.

<br>

[Recruiter Note:]() The recruiter called after 20 mins and informed me that I will have a 4th and final round with Hiring Manager in 30 mins.

<br>

##### Round-4: Hiring Manager Round (30 Mins)

###### First 5 Mins

Asked about my previous experiences and projects.

###### Next 15 Mins

**Q1: Given a BST convert it into a min-height BST.**

> **My Solution:**
>
> I gave an O(n) time and O(n) space solution by first traversing in an inorder manner  and storing the sorted numbers in an array.
>
> Then I did a binary search approach on sorted arr to build the min-height BST recursively.

###### Next: 10 Mins

He explained about the teams (365 and One Drive.)

He asked about my technology preferences and also explained the role.

And then told that he will be matching with the best team possible along my interest lines.

<br>

<br>

[-- Astik Anand]()

---

