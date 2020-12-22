---
permalink: /techblogs/software-design-patterns/behavioral-design-pattterns
topic: behavioral-design-pattterns
---

# Behavioral Design Patterns

![](assets/behavioral_design_patterns.png)

<br>

## Strategy Pattern

![Screenshot 2020-12-12 at 9.37.23 AM](assets/Screenshot%202020-12-12%20at%209.37.23%20AM-7746095.png)



![Screenshot 2020-12-12 at 9.24.32 AM](assets/Screenshot%202020-12-12%20at%209.24.32%20AM.png)

> **Code Explanation:**

##### Strategy.java

![Screenshot 2020-12-12 at 9.25.24 AM](assets/Screenshot%202020-12-12%20at%209.25.24%20AM.png)

##### OperationAdd.java

![Screenshot 2020-12-12 at 9.28.24 AM](assets/Screenshot%202020-12-12%20at%209.28.24%20AM.png)

##### OperationSubtract.java

![Screenshot 2020-12-12 at 9.29.58 AM](assets/Screenshot%202020-12-12%20at%209.29.58%20AM.png)

##### OperationMultiply.java

![Screenshot 2020-12-12 at 9.30.49 AM](assets/Screenshot%202020-12-12%20at%209.30.49%20AM.png)

##### Context.java

![Screenshot 2020-12-12 at 9.31.37 AM](assets/Screenshot%202020-12-12%20at%209.31.37%20AM.png)

##### StrategyPatternDemo.java

![Screenshot 2020-12-12 at 9.33.12 AM](assets/Screenshot%202020-12-12%20at%209.33.12%20AM.png)



<br>

## Observer Pattern

![Screenshot 2020-12-12 at 9.36.41 AM](assets/Screenshot%202020-12-12%20at%209.36.41%20AM.png)



![Screenshot 2020-12-12 at 9.41.28 AM](assets/Screenshot%202020-12-12%20at%209.41.28%20AM.png)



> **Note:-** Observers are subscribed to subject and have one to many relationships and whenever subject publishes observers gets notifications. It follows push based approach and whenever they have something they push to the observers.

