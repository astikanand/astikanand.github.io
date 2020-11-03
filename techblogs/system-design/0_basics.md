---
permalink: /techblogs/system-design/basics
topic: basics
---



# System Design Basics

### ABCDs of System Design

> ***A***sk Good Questions:

1. **What's features to work on?**
    - Ask the good questions and define the Minimum Viable Product(MVP) for the system Design Problem.
    - A problem can have many features, it’s our responsibility to work with the owner and figure out which features he cares about and which features he doesn’t care about.
    - We need to remember that we are working under a very strict time frame, so we need to make sure our feature set is small and go deep into this feature set.
2. **How much to scale ?**
    - How much data we need to store in the database?
    - How many requests/second need to be handled?
    - What kind of latency is expected from the system?

<br>

> ***D***on't  Use Buzzwords

- Make sure whatever technologies or concept we are mentioning we do have some sort of in-depth knowledge on those technologies.

<br>

> ***C***lear and Organized Thinking

- Before jumping into the minor details of the problem first we need to try to define the 50,000 feet view of the problem.
- Need to make sure we have defined all the APIs.
- Need to make sure we have drawn right boxes.
- Need to make sure we know who are the actors for the system.
- Once we have defined all those things then we go deeper into the details working with the product owner.

<br>

> Drive ***D***iscussions (80-20) Rule

- We should be talking 80% of the time and the product owner should be talking 20% of the time.
- Need to make sure we lead the discussions.
- Need to make sure we anticipate the problems which are there in our solution and fix them pre-emptively.

<br>

### Solving System Design

###### Solving system design questions could be broken down into three steps:

1. **Scoping the problem :** Don’t make assumptions; Ask clarifying questions to understand the constraints and use cases.
2. **Sketching up an abstract design** Illustrating the building blocks of the system and the relationships between them.
3. **Identifying and addressing the bottlenecks** by using the fundamental principles of scalable system design.

> [Note:-]() Remember there is no ONE right answer to the question because any system can be built in different ways. The only thing that is going to be looked into is your ability to rationalize ideas and inputs.

###### Whenever we are designing a large system, we need to consider few things:

1. What are different architectural pieces that can be used?
2. How do these pieces work with each other?
3. How can we best utilize these pieces, what are the right tradeoffs?

> [Note:-]() Investing in scaling before it is needed is generally not a smart business proposition; however, some forethought into the design can save valuable time and resources in the future. 

<br>

### Getting to know the Terminologies

###### Designing a Restaurant

1. Once restaurant starts working fine, pay more to chef to increase throughput using samer resource --- **Vertical Scaling**
2. Preparing beforehand during non-peak hours ---- **Preprocessing and Cron jobs.**
3. Keeps backup and avoid single point of failure. **--- Backups (Master - Slave Architecture)**
4. Hire more resources. **--- Horizontal Scaling**
5. Divide responsibility and scale teams at different rate a/c to need. **--- Separation of concerns (Microservice Architecture)**
6. Open new shop with similar functionality at a new location. **--- Distributed System (Partitioning) - Now Fault Tolerant**
7. Routing request b/w shops when order received. **--- Load Balancer**
8. Handling delivery agent and shops separately. **--- Separation of System (Decoupling) - Handle more effectively**
9. If something goes wrong log it to take corrective action quickly **--- Logging and Metrics calculation**
10. Delivery agent should not be bothered if they going to deliver pizza or burger tomorrow. **--- Extensible**

<br>

### High Level Design Vs. Low Level Design

- In High level we mostly talk about server, architecture and all that.
- Low level design deals with how we actually going to code these stuff.
  - Making classes, objects, functions
  - Making signatures

<br>

<br>

------

<a href="concepts-part-1" class="next-button">Next: System Design Concepts -1 &rarr;</a>

