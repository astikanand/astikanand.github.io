---
permalink: /techblogs/coding-problem-patterns/intelligent-hashing-pattern
topic: intelligent-hashing-pattern
---



# Intelligent Hashing Pattern

###### Introduction:

- This pattern is based on the intelligent use of hashing to solve the problems.

<br>

### Problems Following Intelligent Hashing Pattern

## 1. Subarray Sum Equals K

###### Problem Statement:

Given an array of integers `nums` and an integer `k`, return *the total number of continuous subarrays whose sum equals to `k`*.

```
====== Examples ======
Input: nums = [1,1,1], k = 2
Output: 2

Input: nums = [1,2,3], k = 3
Output: 2
```

**Constraints:**

- `1 <= nums.length <= 2 * 104`
- `-1000 <= nums[i] <= 1000`
- `-107 <= k <= 107`

<br>

###### Problem Stats:

- **Difficulty: Medium**
- **Category:** Leetcode - 560
- **Companies:** Amazon, Google

<br>

###### Approach

- **Main Idea for this Approach:** If the cumulative sum (represented by sum[i] for sum upto i<sup>th</sup> index) upto two indices is the same, then the sum of the elements lying in between those indices is zero.
- **Extension of the Idea:** If the cumulative sum upto two indices, say i and j is at a difference of k i.e. if sum[i] − sum[j] = k, then sum of elements lying between indices i and j is k.
- Based on these thoughts, we make use of a hashmap to store the cumulative sum upto all the indices possible along with the number of times the same sum occurs.
- We store the data in the form: (sum<sub>i</sub>, no. of occurences of sum<sub>i</sub>).
- We traverse over the array and keep on finding the cumulative sum.Every time we encounter a new sum, we make a new entry in the hashmap corresponding to that sum. If the same sum occurs again, we increment the count corresponding to that sum in the hashmap. 
- Further, for every sum encountered, we also determine the number of times the sum−k has occured already, since it will determine the number of times a subarray with sum k has occured upto the current index. We increment the count by the same amount.
- After the complete array has been traversed, the count gives the required result.

<br>

###### Implementation:

**Code:**

```python
from typing import List
from collections import defaultdict


class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        cumulative_sums_dict = defaultdict(int)
        cumulative_sums_dict[0] = 1

        curr_sum = 0
        count = 0
        for num in nums:
            curr_sum += num
            if((curr_sum - k) in cumulative_sums_dict):
                count += cumulative_sums_dict[curr_sum - k]

            cumulative_sums_dict[curr_sum] += 1

        return count


s = Solution()
print(s.subarraySum([6, 4, 8, 4, 15, 10, 2, 17], 27))
print(s.subarraySum([1, 1, 1], 2))
print(s.subarraySum([1, -1, 0], 0))
print(s.subarraySum([1, 2, 1, 2, 1], 3))
```

**Output:**

```
2
2
3
4
```

**Complexity:**

- ***Time: O(N)*** - Array is traversed only once.
- ***Space: O(N)*** - Hashmap can contain upto n distinct entries in the worst case.

<br>

<br>

## 2. Copy List with Random Pointer

###### Problem Statement

A linked list is given such that each node contains an additional  random pointer which could point to any node in the list or null.

Return a [**deep copy**](https://en.wikipedia.org/wiki/Object_copying#Deep_copy) of the list.

The Linked List is represented in the input/output as a list of `n` nodes. Each node is represented as a pair of `[val, random_index]` where:

- `val`: an integer representing `Node.val`
- `random_index`: the index of the node (range from `0` to `n-1`) where random pointer points to, or `null` if it does not point to any node.

**Example:**

![](assets/copy_list_random_pointer_example.png)

<br>

###### Problem Stats:

- **Difficulty: Medium**
- **Category:** Leetcode - 138
- **Companies:** Amazon

<br>

###### Approach:

- Make use of hashing to store mapping with key as original node and value as created copied node.
- Then traverse over the linked list again and set next and random pointer to all the copied node using original node's next and random pointer.

<br>

###### Implementation:

**Code:**

```python
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        nodes_map = {}

        # Traverse over the linked list and store all the nodes in a hash map
        # with key as original_node and value as copied_node
        original_node = head
        while (original_node):
            nodes_map[original_node] = Node(original_node.val)
            original_node = original_node.next

        # Now again traverse over the linked list and set every copied node with next and random pointers
        original_node = head
        while (original_node):
            # If original_node has next, set the next for copied_node also
            if original_node.next:
                nodes_map[original_node].next = nodes_map[original_node.next]

            # If original_node has random, set the random for copied_node also
            if(original_node.random):
                nodes_map[original_node].random = nodes_map[original_node.random]

            original_node = original_node.next

        # Finally return the copy of the original_node head
        return nodes_map[head]


def print_list(node):
    NODE_VALUE = lambda node: node.val if node else "None"
    while (node):
        print(f"[{NODE_VALUE(node)}] --> {NODE_VALUE(node.next)} ~~~~~~> {NODE_VALUE(node.random)}")
        node = node.next


rl = Node(7)
rl.next = Node(13)
rl.next.next = Node(11)
rl.next.random = rl
rl.next.next.next = Node(10)
rl.next.next.random = Node(1)
rl.next.next.next.next = rl.next.next.random
rl.next.next.next.random = rl.next.next
rl.next.next.random.random = rl

print_list(Solution().copyRandomList(rl))
```

**Output:**

```
[7] --> 13 ~~~~~~> None
[13] --> 11 ~~~~~~> 7
[11] --> 10 ~~~~~~> 1
[10] --> 1 ~~~~~~> 11
[1] --> None ~~~~~~> 7
```

**Complexity:**

- ***Time: O(N)*** - Only traversing the list 2 times.
- ***Space: O(N)*** - Storing all the nodes in a map.

<br>

<br>

## 3. Anlyze User Website Visit Pattern

###### Problem Statement:

We are given some website visits: the user with name `username[i]` visited the website `website[i]` at time `timestamp[i]`.

A *3-sequence* is a list  of websites of length 3 sorted in ascending order by the time of their  visits. (Websites in a 3-sequence may not distinct.)

Find the 3-sequence visited by the largest number of users. If more than one solution, return the lexicographically smallest such  3-sequence.

```
====== Example ======
Input:
username = ["joe","joe","joe","james","james","james","james","mary","mary","mary"]
timestamp = [1,2,3,4,5,6,7,8,9,10]
website = ["home","about","career","home","cart","maps","home","home","about","career"]

Output: ["home","about","career"]

Explanation: The wesite visited tuples in this example are:
["joe", 1, "home"]
["joe", 2, "about"]
["joe", 3, "career"]
["james", 4, "home"]
["james", 5, "cart"]
["james", 6, "maps"]
["james", 7, "home"]
["mary", 8, "home"]
["mary", 9, "about"]
["mary", 10, "career"]
The 3-sequence ("home", "about", "career") was visited at least once by 2 users.
The 3-sequence ("home", "cart", "maps") was visited at least once by 1 user.
The 3-sequence ("home", "cart", "home") was visited at least once by 1 user.
The 3-sequence ("home", "maps", "home") was visited at least once by 1 user.
The 3-sequence ("cart", "maps", "home") was visited at least once by 1 user.
```

**Notes:**

1. `3 <= N = username.length = timestamp.length = website.length <= 50`
2. `1 <= username[i].length <= 10`
3. `0 <= timestamp[i] <= 10^9`
4. `1 <= website[i].length <= 10`
5. Both `username[i]` and `website[i]` contain only lowercase characters.
6. It is guaranteed that there is at least one user who visited at least 3 websites.
7. No user visits two websites at the same time

<br>

###### Problem Stats:

- **Difficulty: Medium**
- **Category:** Leetcode Premium - 1152
- **Companies:** Amazon

<br>

###### Approach:

- We can first store the websites visited by every user in a map where key is username and value is list of sites visited a/c to timestamp.
- Now go to list of websites visited by every user and make a 3_seq_web_visit_tuple and store it in a yet another map three_seq_visit_map.
- Store key as 3_seq_web_visit_tuple and value as the times they are visited by every user in that 3-sequence.
- Now finally return the max from the three_seq_visit_map and  lexicographically smaller if more candidates.

<br>

###### Implementation:

**Code:**

```python
from typing import List
from collections import defaultdict


class Solution:
    def mostVisitedPattern(self, usernames: List[str], timestamps: List[int], websites: List[str]) -> List[str]:
        # First create the map to store the sites visited by every user
        user_web_visit_history = defaultdict(list)
        for username, website in zip(usernames, websites):
            user_web_visit_history[username].append(website)

        # Now go to list of websites visited by that particular user and make a 3_seq_web_visit_tuple and
        # store it in a yet another map three_seq_visit_map with key as 3_seq_web_visit_tuple and value
        # as the times they are visited by every user in that sequence.
        three_seq_visit_map = defaultdict(int)
        for web_visit_history in user_web_visit_history.values():
            n = len(web_visit_history)
            if (n >= 3):
                self.update_3_seq_web_visit_map(three_seq_visit_map, web_visit_history)

        # Now from three_seq_visit_map get the max visited key
        return self.get_max_freq_3_seq_visit(three_seq_visit_map)

    def update_3_seq_web_visit_map(self, three_seq_visit_map, web_visit_history):
        n = len(web_visit_history)
        for i in range(n - 2):
            for j in range(i + 1, n - 1):
                for k in range(j + 1, n):
                    three_seq_visit_map[(web_visit_history[i], web_visit_history[j], web_visit_history[k])] += 1

    def get_max_freq_3_seq_visit(self, three_seq_visit_map):
        max_candidate = ("~", )
        max_val = -1
        for key, val in three_seq_visit_map.items():
            if (val > max_val or (val == max_val and key < max_candidate)):
                max_candidate = key
                max_val = val

        return list(max_candidate)


username = ["joe", "joe", "joe", "james", "james", "james", "james", "mary", "mary", "mary"]
timestamp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
website = ["home", "about", "career", "home", "cart", "maps", "home", "home", "about", "career"]
print(Solution().mostVisitedPattern(username, timestamp, website))

username = ["u1", "u1", "u1", "u2", "u2", "u2"]
timestamp = [1, 2, 3, 4, 5, 6]
website = ["a", "b", "c", "a", "b", "a"]
print(Solution().mostVisitedPattern(username, timestamp, website))
```

**Output:**

```
['home', 'about', 'career']
['a', 'b', 'a']
```

**Complexity:**

- ***Time: O(N<sup>3</sup>)*** - In worst case if only 1 user, then will have to create tuple of every triplet making it O(N<sup>3</sup>) where N is websites length.
- ***Space: O(N<sup>3</sup>)*** - In worst case if all sites are distinct then will have to store every triplet and hence we need O(N<sup>3</sup>).

