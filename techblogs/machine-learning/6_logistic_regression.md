---
permalink: /techblogs/machine-learning/logistic-regression
topic: logistic-regression
---



# Logistic Regression

- Logistic regression is a method for classifying data into discrete outcomes.
- For example, we might use logistic regression to classify an email as spam or not spam. 
- Here we will see:
    - The notion of classification
    - The cost function for logistic regression
    - The application of logistic regression to multi-class classification.

## Classification and Representation

### Classification

- The classification problem is just like the regression problem, except that the values we now want to predict take on only a small number of discrete values.

<img src="assets/classification_problem_logistic_regression.png" width="70%">

- Using liner regression in these kind of problems is not a good idea.

### Hypothesis Representation

- We could approach the classification problem ignoring the fact that y is discrete-valued, and use our old linear regression algorithm to try to predict y given x.
- However, it is easy to construct examples where this method performs very poorly.
- Intuitively, it also doesn’t make sense for **h<sub>θ</sub>(x)** to take values larger than 1 or smaller than 0 when we know that **y ∈ {0, 1}**. 

<img src="assets/logistic_regression_hypothesis_repr.png" width="80%">

### Decision Boundary

<img src="assets/decision_boundary_concept.png" width="90%">

<br>

> **Example:**

<img src="assets/decision_boundary.png" width="85%">



## Logistic Regression Model

### Cost Function

We cannot use the same cost function that we use for linear regression because the Logistic Function will cause the output to be wavy, causing many local optima. In other words, it will be a **non-convex** function.

<br>

<img src="assets/logistic_regression_cost_function.png" width="75%">



> **Logistic Regression Cost Function:**

<img src="assets/logistic_regression_cost_function_2.png" width="85%">



<img src="assets/logistic_regression_cost_function_concept.png" width="85%">

### Simplified Cost Function & Gradient Descent

> We can compress our cost function's two conditional cases into one case:
>
> **Cost(h<sub>θ</sub>(x), y) = -ylog(h<sub>θ</sub>(x)) - (1-y)log(1-h<sub>θ</sub>(x))**

![](assets/logistic_regression_simplified_cost_function.png)

<img src="assets/simplified_cost_function_gradient_descent_concept.png" width="85%">

##### Notes:

- Idea of feature scaling also applies to gradient descent for logistic regression.

### Advanced Optimization

![](assets/optimization_algorithm.png)

> **How to use:**

<img src="assets/using_optimization_algo.png" width="40%">



> **Concept:**

<img src="assets/optimization_algo_concept.png" width="90%">



## Multiclass Classification

Now we will approach the classification of data when we have more than two categories. Instead of y = {0,1} we will expand our definition so that y = {0,1...n}.

<img src="assets/multiclass_classification.png" width="70%">

> **One-vs-All Approach:**

<img src="assets/one_vs_all_approach.png" width="70%">



<br>



------

<a href="octave-matlab-tutorial" class="prev-button">&larr; Previous: Octave/Matlab Tutorial</a> 

<a href="regularization" class="next-button">Next: Regularization &rarr;</a>

