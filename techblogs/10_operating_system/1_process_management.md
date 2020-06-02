# Process Management

### Deadlock

A process in operating systems uses different resources and uses resources in following way.

1. Requests a resource
2. Use the resource
3. Releases the resource

#### Deadlock Introduction

- ***Deadlock is a situation*** where a set of processes are blocked because each process is holding a resource and waiting for another resource acquired by some other process. 
- Occurs when there are two or more processes hold some resources and wait for resources held by other(s).
- For example: in the below diagram:- Process 1 is holding Resource 1 and waiting for resource 2 which is acquired by process 2, and process 2 is waiting for resource 1.

<img src="assets/deadlock.png" width="40%">

#### Reason for Deadlock

- **Deadlock can arise if following 4 conditions hold simultaneously (Necessary Conditions)** 

    1. ***Mutual Exclusion:*** One or more than one resource are non-sharable (Only one process can use at a time)

    2. ***Hold and Wait:*** A process is holding at least one resource and waiting for resources.

    3. ***No Preemption:*** A resource cannot be taken from a process unless the process releases the resource.

    4. ***Circular Wait:*** A set of processes are waiting for each other in circular form.

#### Method for Handlling Deadlock

- **There are 3 ways to handle deadlock**

    1. ***Deadlock prevention or avoidance:*** The idea is to not let the system into deadlock state.

    2. ***Deadlock detection and recovery:*** Let deadlock occur, then do preemption to handle it once occurred.

    3. ***Ignore the problem all together:*** If deadlock is very rare, then let it happen and reboot the system. This is the approach that both Windows and UNIX take.

#### Deadlock  Prevention

***We can prevent Deadlock by eliminating any of the above four condition.***

- ***Eliminate Mutual Exclusion*** 

    - It is not possible to dis-satisfy the mutual exclusion because some resources, such as the tap drive and printer, are inherently non-shareable.

- ***Eliminate Hold and wait***

    1. Allocate all required resources to the process before start of its execution, this way hold and wait condition is eliminated but it will lead to low device utilization. for example, if a process requires printer at a later time and we have allocated printer before the start of its execution printer will remained blocked till it has completed its execution.

    2. Process will make new request for resources after releasing the current set of resources. This solution may lead to starvation.

- ***Eliminate No Preemption***

    - Preempt resources from process when resources required by other high priority process.

- ***Eliminate Circular Wait***

    - Each resource will be assigned with a numerical number.
    - A process can request for the resources only in increasing order of numbering.
    - For Example, if P1 process is allocated R5 resources, now next time if P1 ask for R4, R3 lesser than R5 such request will not be granted, only request for resources more than R5 will be granted.

#### Deadlock Avoidance

> **Banker’s Algorithm**

Bankers’s Algorithm is resource allocation and deadlock avoidance algorithm which test all the request made by processes for resources, it check for safe state, if after granting request system remains in the safe state it allows the request and if their is no safe state it don’t allow the request made by the process.

**Inputs to Banker’s Algorithm**

1. Max need of resources by each process.
2. Currently allocated resources by each process.
3. Max free available resources in the system.

**Request will only be granted under below condition.**

1. If request made by process is less than equal to max need to that process.
2. If request made by process is less than equal to freely availbale resource in the system.

