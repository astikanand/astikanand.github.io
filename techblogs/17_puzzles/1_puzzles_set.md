### 12 Coin Puzzle

###### Problem:

Given 12 balls, identical in appearance but one of which is either heavier or lighter than the other eleven.

We are allowed three weighings with a balance, to determine which is the odd ball and to find whether this ball is heavier or lighter than the others. What do we do?

###### Solution

> Label the balls 1, 2, 3,..., 10, 11, 12 so that we can distinguish between and identify them using these labels.
>
> **Weigh 1, 2, 3, 4 against 5, 6, 7, 8**

1. They balance, so 9, 10, 11, 12 contain the odd ball. Weigh 6, 7, 8 against 9, 10, 11.
   - They balance, therefore 12 is the odd ball and so weigh 12 against any other to discover whether it is heavy or light.
   - 9, 10, 11 are heavy and so they contain an odd heavy ball. Weigh 9 against 10. If they balance, 11 is the odd heavy ball, otherwise the heavier of 9 and 10 is the odd ball.
   - If 9, 10, 11 are light, we use the same procedure to reach the same conclusion for the odd light ball.
2. 5, 6, 7, 8 are heavy and so either they contain an odd heavy ball or 1, 2, 3, 4 contain an odd light ball. Weigh 1, 2, 5 against 3, 6, 10.
   - They balance, so the odd ball is 4 (light) or 7 or 8 (heavy). Thus weigh 7 against 8. If they balance 4 is light, otherwise the heavier of 7 and 8 is the odd heavy ball.
   - 3, 6, 10 are heavy, so the odd ball can be 6 (heavy) or 1 or 2 (light). Thus weigh 1 against 2. If they balance 6 is heavy, otherwise the lighter of 1 and 2 is the odd light ball.
   - 3, 6, 10 are light, so the odd ball is 3 and light or 5 and heavy. We thus weigh 3 against 10. If they balance 5 is heavy, otherwise 3 is light.
3. If 5, 6, 7, 8 are light we use a similar procedure to that in 2.



### Josephus Puzzle

