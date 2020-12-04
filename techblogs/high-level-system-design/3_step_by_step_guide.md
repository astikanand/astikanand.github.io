---
permalink: /techblogs/high-level-system-design/step-by-step-guide
topic: step-by-step-guide
---



# System Design Step by Step Guide

**Lots of people struggle with system design interviews (SDIs) primarily because of**

1. Unstructured nature of SDIs, where we are asked to work on an open-ended design problem that doesn’t have a standard answer
2. The lack of experience in developing large scale systems
3. We have not spend enough time to prepare for SDIs.

<br>

**Here we’ll follow a step by step approach to solve multiple design problems using these 7 steps.**

> ##### Step-1: Requirements Clarifications

- Always ask questions to find the exact scope of the problem we are solving.
- Design questions are mostly open-ended, and they don’t have ONE correct answer, that’s why clarifying ambiguities early in the
  interview becomes critical.
- Candidates who spend enough time to clearly define the end goals of the system, always have a better chance to be successful.
- Since we only have 35-40 minutes to design a (supposedly) large system, we should clarify what parts of the system to focus on.

###### Twitter Example:

- Will users of our service be able to post tweets and follow other people ?
- Should we also design to create and display user’s timeline ?
- Will tweets contain photos and videos ?
- Are we focusing on backend only or are we developing front-end too ?
- Will users be able to search tweets ?
- Do we need to display hot trending topics ?
- Would there be any push notification for new (or important) tweets ?

All such questions will determine how our end design will look like.

<br>

> ##### Step-2: System interface definition

- Define what APIs are expected from the system.
- This would establish the exact contract expected from the system.
- It would also ensure if we haven’t gotten any requirements wrong.

###### Some examples for our Twitter-like service would be:

- We would discuss later.



<br>

> ##### Step-3: Back-of-the-envelope Estimation

- It’s always a good idea to estimate the scale of the system we are going to design, this would also help later when we will be focusing on scaling, partitioning, load balancing and caching.
- What scale is expected from the system (e.g., no. of new tweets, no. of tweet views, how many timeline generations per sec., etc.) ?
- How much storage would we need ? We’ll have different numbers if users can have photos and videos in their tweets.
- What network bandwidth usage are we expecting ? This would be crucial in deciding how would we manage traffic and balance load between servers.

<br>

> ##### Step-4: Defining data model

- Defining the data model early will clarify how data will flow among different components of the system.
- Later, it will guide towards data partitioning and management.
- Candidate should be able to identify various entities of the system, how they will interact with each other and different aspect of data management like storage, transportation, encryption, etc.

###### Here are some entities for our Twitter-like service:

- **User:** UserID, Name, Email, DoB, CreationData, LastLogin, etc.
- **Tweet:** TweetID, Content, TweetLocation, NumberOfLikes, TimeStamp, etc.
- **UserFollowos:** UserdID1, UserID2
- **FavoriteTweets:** UserID, TweetID, TimeStamp

###### Considerations

- Which database system should we use ?
- Would NoSQL like Cassandra best fits our needs, or we should use MySQL-like solution ? 
- What kind of block storage should we use to store photos and videos ?

<br>

> ##### Step-5: High-Level Design (HLD)

- Draw a block diagram with 5-6 boxes representing core components of your system.
- We should identify enough components that are needed to solve the actual problem from end-to-end.

###### For Twitter, at a high level :

- We will need multiple application servers to serve all the read/write requests with load balancers in front of them for traffic distributions.
- If we’re assuming that we’ll have a lot more read traffic than write, we can decide to have separate servers for handling these scenarios.
- On the backend, we need an efficient database that can store all the tweets and can support a huge number of reads.
- We would also need a distributed file storage system for storing photos and videos.

<img src="assets/twitter_hld.png" style="width:45%;"/>



<br>

> ##### Step-6: Detailed Design

- Digging deeper into 2-3 components; interviewers feedback should always guide us toward which parts of the system they want us to explain further.
- We should be able to provide different approaches, their pros and cons, and why would we choose one ?
- Remember there is no single answer, the only thing important is to consider tradeoffs between different options while keeping system constraints in mind.
- Since we’ll be storing a huge amount of data, how should we partition our data to distribute it to multiple databases ? Should we try to store all the data of a user on the same database? What issue can it cause?
- How would we handle hot users, who tweet a lot or follow lots of people ?
- Since user’s timeline will contain most recent (and relevant) tweets, should we try to store our data in such a way that is optimized to
  scan latest tweets ?
- How much and at which layer should we introduce cache to speed things up ?
- What components need better load balancing ?

<br>

> ##### Step 7: Identifying and resolving bottlenecks

- Try to discuss as many bottlenecks as possible and different approaches to mitigate them.
- Is there any single point of failure in our system ? What are we doing to mitigate it ?
- Do we’ve enough replicas of the data so that if we lose a few servers, we can still serve our users ?
- Similarly, do we’ve enough copies of different services running, such that a few failures will not cause total system shutdown ?
- How are we monitoring the performance of our service ? Do we get alerts whenever critical components fail or their performance degrade ?
- In summary, preparation and being organized during the interview are the keys to be successful in system design interviews.

<br>

<br>

---

<a href="concepts-part-2" class="prev-button">&larr; Previous: System Design Concepts - 2</a> 

<a href="tools-techniques" class="next-button">Next: Tools and Techniques &rarr;</a>

