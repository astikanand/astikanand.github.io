---
permalink: /techblogs/machine-learning/neural-networks
topic: neural-networks
---



# Neural Networks

- Neural networks is a learning algorithm, it is a model inspired by how the brain works.
- A **neural network** is a software (or hardware) simulation of a biological brain sometimes called **Artificial Neural Network (ANN)**.
- The **purpose** of a **neural network** is to learn to recognize patterns in your data.
- It is widely used today in many applications: when our phone interprets and understand our voice commands, it is likely that a neural network is helping to understand our speech; when we cash a check, the machines that automatically read the digits also use neural networks.

## Motivations

In todays world it is the state of the art technique for many different machine learning problems.

#### Non-Linear Hypothesis

- It is very much difficult to go for linear regression algorithms when features are more.
- It becomes increasibly difficult to separate the classes.

<img src="assets/non_linear_hypothesis.png" width="80%">

> **Computer Vision:**

<img src="assets/computer_vision.png" width="80%">

#### Neurons and the Brain

- Neural Networks are a pretty old algorithm that was originally motivated by the goal of having machines that can mimic the brain.
- **Origins:** Algorithms that try to mimic the human brain. Was very widely used in 80s and 90s but its popularity diminished in late 90s.
- **Recent Resurgence:** State of the art technique for many applications.

##### The One-Learning-Algorithm Hypothesis:

- The brain can learn to see, learn to process images, learn to hear, learn to process our sense of touch, also learn to do math, learn to do calculus and can do so many different and amazing things. 
- It seems like if we want to mimic the brain we will have to write lots of different pieces of software to mimic all of these different fascinating, amazing things.
- But there is a fascinating hypothesis that the way the brain does all of these different things is not worth like a thousand different programs, but instead, the way the brain does it is worth just a **single learning algorithm**.

<img src="assets/one_learning_algorithm_hypotheis.png" width="70%">

- **Neuro-rewiring experiments** if we can plug in almost any sensor to almost any part of the brain and so, within the reason, the brain will learn to deal with it.

    <img src="assets/neuro_rewring_examples.png" width="45%">



## Model Representation

- Neural networks were developed as simulating neurons or networks of neurons in the brain so to understand that we need to have a look at what a single neuron in the brain looks like.

    <img src="assets/neurons_and_communication.png" width="70%">

- At a simplistic level a neuron is **a computational unit** that gets a number of inputs through **input wires (Dendrites)** does some computation and then outputs via its **Axon** to other nodes or to other neurons in the brain.

- Neurons communicate with each other is with little pulses of electricity (spikes) through Axon.

#### Neuron Model

<img src="assets/neuron_model.png" width="80%">

#### Artificial Neural Network (ANN):

<img src="assets/artificial_neural_network.png" width="50%">

> **Example:** If layer 1 has 2 input nodes and layer 2 has 4 activation nodes. What is the dimension of Θ<sup>(1)</sup> ?
>
> **Solution:**
>
> Here s<sub>j</sub> = 2 and s<sub>j+1</sub>=4, so s<sub>j+1</sub> x  (s<sub>j </sub> + 1) = 4×3.
>
> Hence, dimension of Θ<sup>(1)</sup> is going to be 4×3.

#### Forward Propagation: Vectorized Implementation

<img src="assets/neural_network_forward_propgation_explanation.png" width="60%">

> **Concept:**

<img src="assets/neural_network_forward_propagation.png" width="95%">

##### Notes:

- Neural Network learns its own features coz even if layer-1 is covered the final layer learns its fearures thorugh previous layers.

<img src="assets/neural_network_architecture.png" width="75%">

<br>

## Basic Applications

Here we will see the detailed example showing how a neural network can compute a complex non linear function of the input.

#### Intuitive Examples

![](assets/neural_network_intuition_examples.png)

> **Neural Network: Logical AND** 

<img src="assets/neural_network_logical_and_concept.png" width="90%">

##### Notes:

- We have constructed one of the fundamental operations in computers using a small neural network rather than using actual AND gate. 
- Neural networks can also be used to simulate all the other logical gates. 

> **Designing XNOR using Neural Networks:**

<img src="assets/designing_xnor_concept.png" width="90%">

<img src="assets/designing_xnor_explanation.png" width="60%">

<img src="https://j.gifs.com/4QYB52.gif">

#### Multiclass Classification

<img src="assets/neural_network_multiclass_classification.png" width="90%">

<br>

## Cost Function

###### Some New Notations:

- ***L*** = total number of layers in the network
- ***s<sub>l </sub>***= number of units (not counting bias unit) in layer l
- ***K*** = number of output units/classes

###### Multi-class Classifier Neural Network

- In neural networks, we may have many output nodes, so we denote ***hΘ(x)<sub>k</sub>*** as being a hypothesis that results in the **k<sup>th</sup>** output.
- Our cost function for neural networks is going to be a generalization of the one we used for logistic regression.

###### Cost Function for Neural Networks

<img src="assets/cost_function_neural_network.png" width="90%">

- We have added a few nested summations to account for our multiple output nodes.
- In the first part of the equation, before the square brackets, we have an additional nested summation that loops through the number of output nodes.
- In the regularization part, after the square brackets, we must account for multiple theta matrices.
- The number of columns in our current theta matrix is equal to the number of nodes in our current layer (including the bias unit).
- The number of rows in our current theta matrix is equal to the number of nodes in the next layer (excluding the bias unit).
- As before with logistic regression, we square every term.

##### Notes:

- The double sum simply adds up the logistic regression costs calculated for each cell in the output layer.
- The triple sum simply adds up the squares of all the individual Θs in the entire network.
- The i in the triple sum does **not** refer to training example i.

<br>

## Backpropagation Algorithm

In order to use either gradient descent or one of the advance optimization algorithms, we need to write code that takes the input parameters **Θ** and computes **J(Θ)** of theta and the partial derivative terms.

<img src="assets/gradient_computation.png" width="40%">

#### Computing partial derivative terms.

> **Step-1:** **Forward Propagation** - Calculation of activation values

The Vectorized implementation of forward propagation allows us to compute the activation values for all of the neurons in our neural network.

<img src="assets/calculate_activation_values.png" width="40%">

> **Step-2: Backpropagation** -  Calculate partial derivatives











----

<a href="regularization" class="prev-button">&larr; Previous: Regularization</a> 









































