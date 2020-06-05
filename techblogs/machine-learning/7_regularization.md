---
permalink: /techblogs/machine-learning/regularization
topic: regularization
---



# Regularization

- Machine learning models need to generalize well to new examples that the model has not seen in practice.
- Regularization helps prevent models from overfitting the training data.

## Solving the Problem of Overfitting

### The Problem of Overfitting

When we apply machine learining algorithms to certain machine learning applications, they can run into a problem called overfitting that can cause them to perform very poorly.

> **Overfitting Examples:**

![](assets/overfitting_examples.png)



> **Addressing Overfitting:**

![](assets/addressing_overfitting.png)



### Cost Function

If we have overfitting from hypothesis function, we can reduce the weight that some of the terms in function carry by increasing their cost.

##### Intuition:

> Say we wanted to make the following function more quadratic:
>
> **θ<sub>0 </sub>+ θ<sub>1</sub>x + θ<sub>2</sub>x<sup>2</sup> + θ<sub>3</sub>x<sup>3</sup> + θ<sub>4</sub>x<sup>4</sup>** 

We'll want to eliminate the influence of **θ<sub>3</sub>x<sup>3</sup> + θ<sub>4</sub>x<sup>4</sup>**  but without actually getting rid of these features or changing the form of our hypothesis, we can instead modify our **cost function**:

<img src="assets/regularization_cost_function.png" width="50%">

<img src="assets/regularization_intutition.png" width="40%">

##### Regularizing all θ parameters

<img src="assets/regularizing_all_theta_parms.png" width="80%">

<br>

The **λ** is the **regularization parameter**. It determines how much the costs of our theta parameters are inflated.

Using the cost function with the extra summation, we can smooth the output of our hypothesis function to reduce overfitting.

> If lambda is chosen to be too large, it may smooth out the function too much and cause underfitting.

<img src="assets/underfitting_due_to_high-lambda.png" width="45%">

###### Note: For regularization to work properly λ should be choosen appropriately.

### Regularized Linear Regression

We can apply regularization to both linear regression and logistic regression.

#### Gradient Descent

We will modify our gradient descent function to separate out **θ<sub>0</sub>**  from the rest of the parameters because we do not want to penalize **θ<sub>0</sub>**.

<img src="assets/regularized_linear_regression_gradient_descent.png" width="45%">

> **Concept:**

<img src="assets/regularized_linear_regression_gradient_descent_concept.png" width="85%">

#### Normal Equation

Regularization can also be appraoched using the alternate method of the non-iterative normal equation.

To add in regularization, the equation is the same as our original, except that we add another term inside the parentheses:

<img src="assets/normal_equation_method_for_regularized_linear_regression.png" width="85%">

##### Note: 

- If **m < n**, then **X<sup>T</sup>X is non-invertible**. However, when we add the term **λ⋅L**, then **X<sup>T</sup>X + λ⋅L** becomes invertible.

<img src="assets/non_invertibility_regularized_linear_regression.png" width="40%">



### Regularized Logistic Regression

We can regularize logistic regression in a similar way that we regularize linear regression to avoid overfitting. 

<img src="assets/regularized_logistic_cost.png" width="40%">

> **Concept:**

<img src="assets/regularized_logistic_cost_concept.png" width="85%">

#### Gradient Descent

<img src="assets/regularized_logistic_gradient_descent.png" width="45%">



#### Advanced Optimization

<img src="assets/advanced_optimization_regularized_logistic.png" width="45%">





<br>

------

<a href="logistic-regression" class="prev-button">&larr; Previous: Logistic Regression</a> 

<a href="neural-networks" class="next-button">Next: Neural Networks &rarr;</a>



















