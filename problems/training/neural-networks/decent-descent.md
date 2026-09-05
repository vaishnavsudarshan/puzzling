---
id: grad
title: A Decent Descent
section: training
topic: ai-neural
difficulty: hard
order: 1
---

Suppose we have a point on a multivariable function with a vector of inputs and a scalar output. To minimize the value of this function, we take the negative gradient of the function at that point, move the input along that negative gradient vector by a small magnitude (the learning rate), and repeat this process over and over again.

## Questions

### Which of the following components of neural networks is this gradient descent algorithm the most directly useful for?
- [ ] Sorting out the most relevant tokens in a chatbot prompt, to figure out what to focus on in the response.
- [x] Minimizing the cost function in order to make a machine learning model more accurate.
- [ ] Applying the activation function between layers of a neural network to make it more complex.
- [ ] Identifying the ethical implications of a model's binary decision.

### Using gradient descent, compute the optimized value of f after 4 iterations with learning rate μ = 0.1, starting from (x₁, x₂) = (4, 6). Round your answer to three decimal places.
```formula
f(x₁, x₂) = x₁² + x₂² − x₁x₂
```
== 10.935

### Why is it important to keep a balanced learning rate μ that's not too high and not too low?
- [x] If μ is too low, the approximation will take a very long time to optimize since each step is more negligible, while if μ is too high, the approximation may go too far, jumping past the minimum value.
- [ ] If μ is too low, the model will forget previous data and lose accuracy, while if μ is too high, the model will memorize the data too quickly and become biased, overfitting the data given.
- [ ] If μ is too low, the gradient becomes zero and no learning happens, while if μ is too high, the gradient becomes infinite and the model cannot compute values.
- [ ] If μ is too low, the algorithm will stop updating entirely and freeze, while if μ is too high, it will always find the exact minimum instantly but risk crashing the computer.

### What does the input of the cost function represent?
- [ ] The vector of learning rates of the predictions based on how correct each one is.
- [x] The vector of the predicted probabilities and also correct answers of the outputs.
- [ ] The 3D-tensor of the updated gradient descent values, compressed into a vector.
- [ ] The scalar value that the model believes is the singular correct identification.
