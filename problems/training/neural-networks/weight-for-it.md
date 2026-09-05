---
id: nn
title: Weight For It
section: training
topic: ai-neural
difficulty: medium
order: 2
---

A neural network passes a vector from one layer to the next by transforming it with weights and biases, then applying a nonlinear activation function. The code below is a rough sketch of one such step.

```
1   n0 = [3, 7, -4]
2   weights = [[2, -10, 5], [6, -1, 7], [-9, 13, 1]]
3   biases = [8, 0, 12]
4   n1 = []
5   for j in weights:
6       sum = 0
7       for i in range(len(n0)):
8           sum += j[i] + n0[i]
9       n1.append(sum)
10  n1_new = []
11  for k in n0:
12      if k < 0:
13          k *= 0.01
14      n1_new.append(k)
```

## Questions

### Which of the following components of a neural network might this code represent?
- [x] Moving from one layer of a neural network to the next layer, each being a vector.
- [ ] Moving through the entire neural network once to find the probability of each outcome.
- [ ] Updating the weights and biases using gradient descent after calculating the error.
- [ ] Normalizing the input data so that all values are between 0 and 1 before processing.

### What does this line print?  print(n1_new)
== [3, 7, -0.04] | 3, 7, -0.04

### What would happen if a neural network never had an equivalent of lines 10–14?
- [ ] The network would be unable to process input vectors of different sizes, because an activation function only works on a set dimension.
- [ ] The activation function would cause the output of the network to always be bounded between -1 and 1.
- [ ] The weights in each layer would become identical during training due to symmetry, since there's nothing to make each weight different.
- [x] The lack of a nonlinear activation function would result in the entire neural network simplifying to a single affine transformation.

### Which of the following is true about the transformation that brings the space that n0 is in to the space that n1 is in?
- [ ] If n0 was multiplied by some constant k, and this transformation was applied, then the result would be n1 multiplied by k.
- [x] The origin of the space of n1 is different from the origin of the space of n0 because the transformation is not linear.
- [ ] Adding a vector m0 to n0 and then applying the transformation gets the same result as first applying the transformation to m0 and adding this to n1.
- [ ] The gridlines in the space of n0 would not be lines after the transformation.
