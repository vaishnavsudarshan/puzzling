---
id: tok
title: Use tiktoken, not tiktok
section: training
topic: ai-nlp
difficulty: medium
---

Before a language model can read text, it splits the text into pieces called tokens and turns each one into an integer ID. OpenAI's tiktoken library does exactly this.

Trace through this snippet:

```
import tiktoken
encoding = tiktoken.encoding_for_model("gpt-5")
sentence = "AI is fun"
tokens = encoding.encode(sentence)
print(tokens)

>>> [17527, 382, 2827]
```

## Questions

### Which of the following statements could you technically run without causing an error?
- [x] tokens[-1] *= 2
- [ ] tokens[0] += "Hello world"
- [ ] tokens[-1] = len(tokens[-1])
- [ ] tokens[3] *= 2

### Now suppose you write:  mystery = encoding.decode([tokens[0]])  — which value does mystery represent?
- [ ] 17527
- [ ] "Artificial"
- [ ] 2827
- [x] "AI"

### Which of the following best explains how a computer will understand these token indices?
- [ ] Each digit of the index can be extracted to form a component of an embedding vector in semantic space.
- [x] The index represents a corresponding row of an embedding matrix, and that row is an embedding vector in semantic space.
- [ ] The index is converted to binary, and binary is how computers understand human languages such as English.
- [ ] The magnitude of the index corresponds to the connotation of a token, so a larger index means a word has a more positive connotation.
