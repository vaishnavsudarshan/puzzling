// AUTO-GENERATED from problems/*.md by scripts/build.mjs — do not edit by hand.
window.PUZZLE_DATA = {
  "puzzling": {
    "hero": {
      "h1": "Challenge yourself with these linguistics puzzles.",
      "lede": "No background needed — just logic. Pick a topic and have fun."
    },
    "topics": [
      {
        "id": "numbers",
        "name": "Number systems",
        "blurb": "How languages count."
      },
      {
        "id": "sound",
        "name": "Sounds",
        "blurb": "The phonetics, phonology, and sound changes of language."
      },
      {
        "id": "words",
        "name": "Morphology",
        "blurb": "How words are put together."
      },
      {
        "id": "order",
        "name": "Syntax",
        "blurb": "How words are arranged."
      },
      {
        "id": "meaning",
        "name": "Semantics",
        "blurb": "How meaning is formed."
      },
      {
        "id": "writing",
        "name": "Writing",
        "blurb": "How language is captured in symbols and scripts."
      },
      {
        "id": "ai",
        "name": "Computational",
        "blurb": "The computational side of language."
      },
      {
        "id": "misc",
        "name": "Misc",
        "blurb": "Other topics that don't fit elsewhere."
      }
    ],
    "puzzles": [
      {
        "id": "pie",
        "topic": "sound",
        "title": "A Tale of Two Indo-European Languages",
        "diff": "Medium",
        "body": [
          {
            "type": "lead",
            "text": "Proto-Indo-European (PIE) is a language that linguists have reconstructed to be the parent language of all the Indo-European languages. English and Sanskrit are also Indo-European languages."
          },
          {
            "type": "note",
            "text": "Asterisks mean that the word is reconstructed, not documented; dashes mean that the word is not complete, but rather just a stem; “th” is a single sound, like in English; any diacritics imply a different, unrelated sound."
          },
          {
            "type": "text",
            "text": "Below is a chart that shows a few words in Proto-Indo-European and their descendants in English and Sanskrit."
          },
          {
            "type": "table",
            "head": [
              "PIE",
              "English",
              "Sanskrit"
            ],
            "rows": [
              [
                "*pṓds",
                "foot",
                "pād-"
              ],
              [
                "*penkʷe",
                "five",
                "pañca"
              ],
              [
                "*ph₂tḗr",
                "father",
                "pitṛ"
              ],
              [
                "*bhrāter",
                "brother",
                "bhrātṛ"
              ],
              [
                "*tréyes",
                "three",
                "trayas"
              ],
              [
                "*tuH",
                "thou",
                "tvam"
              ],
              [
                "*déḱm̥",
                "ten",
                "daśa"
              ],
              [
                "septm̥",
                "seven",
                "sapta"
              ],
              [
                "*ḱm̥tóm",
                "hundred",
                "śatam"
              ],
              [
                "*kʷetwóres",
                "four",
                "catvāras"
              ],
              [
                "*kḗr",
                "heart",
                "hṛd-"
              ]
            ]
          }
        ],
        "items": [
          {
            "q": "What is the English word that is derived from the PIE word “*ḱwón”?",
            "type": "choice",
            "options": [
              "dog",
              "hound",
              "swan",
              "cat"
            ],
            "answer": 1
          },
          {
            "q": "If the Sanskrit word for “tooth” is “danta”, then what is the PIE root that both of these words descend from?",
            "type": "choice",
            "options": [
              "*dent-",
              "*bhent-",
              "*thent-",
              "*duhʷ-"
            ],
            "answer": 0
          },
          {
            "q": "Which descendant language likely underwent less sound changes from the original PIE and why?",
            "type": "choice",
            "options": [
              "English, because it preserves the consonants and vowel roundedness of PIE better.",
              "Sanskrit, because it preserves the consonants and syllable structures of PIE better.",
              "Sanskrit, because it is written with diacritics, and PIE is also written with diacritics.",
              "Neither, because neither of them is mutually intelligible with PIE."
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "uz",
        "topic": "order",
        "title": "Uzpetistan",
        "diff": "Easy",
        "body": [
          {
            "type": "lead",
            "text": "Uzbek is a language spoken natively by over 34 million people in Uzbekistan, as well as in parts of nearby countries like Afghanistan, Tajikistan, and China."
          },
          {
            "type": "text",
            "text": "You get hired to work at a questionable pet store in Uzbekistan, but you mix up the signs of all the animals, and you don't know any Uzbek!"
          },
          {
            "type": "text",
            "text": "To avoid getting fired, determine the correct correspondences."
          }
        ],
        "items": [
          {
            "q": "Match each Uzbek phrase (left) to its English meaning (right).",
            "type": "match",
            "left": [
              "yovuz mushuk",
              "mushuk yo'q",
              "maymun va sincap",
              "ko'k sincap",
              "yovuz it",
              "non va mushuk",
              "och ko'k mushuk",
              "kulgili quyon",
              "och yashil sarig'i",
              "sincaplar",
              "bo'ri va it",
              "kulgili odam"
            ],
            "right": [
              "blue squirrel",
              "bread and cat",
              "evil cat",
              "evil dog",
              "funny human",
              "funny rabbit",
              "light blue cat",
              "light green yolk",
              "monkey and squirrel",
              "no cat",
              "squirrels",
              "wolf and dog"
            ],
            "answer": [
              2,
              9,
              8,
              0,
              3,
              1,
              6,
              5,
              7,
              10,
              11,
              4
            ]
          }
        ]
      },
      {
        "id": "pd",
        "topic": "order",
        "title": "\"This problem will make you more productive\"",
        "diff": "Easy",
        "body": [
          {
            "type": "lead",
            "text": "## Intro"
          },
          {
            "type": "text",
            "text": "A natural language is productive if a finite amount of phonemes can generate an infinite amount of sentences. Productivity, by the way, is a criterion that must be satisfied in order to even be a language, according to most linguists."
          },
          {
            "type": "text",
            "text": "This notion also applies to programming languages. Given a finite set of characters, a language is productive if it can generate infinite programs."
          },
          {
            "type": "text",
            "text": "In the first two tasks, you’re basically supposed to find and explain an example that illustrates sentences or programs that can have indefinite length."
          }
        ],
        "items": [
          {
            "q": "Show that English is productive.",
            "type": "ai",
            "grade": "There must be some example of infinite recursion, with the elements that are being recursed having indefinite cardinality, for an English sentence. For example, you can say \"a friend of a friend of a friend of ...\", or \"guy 1, who guy 3, who guy 4 met, ... met, met guy 2.\" \n  Make sure to give thorough feedback for what is missing."
          },
          {
            "q": "Show that Python is productive.",
            "type": "ai",
            "grade": "There must be some example of infinite recursion, and the elements being recursed much have infinite cardinality, for a Python program. One such example is a nested if statement;\n  if x1 < 0: \n      if x2 < 0: \n          if ...\n              ...\n          print(\" \")\n      print(\" \")\n  Make sure to give thorough feedback for what is missing."
          },
          {
            "q": "You meet someone who doesn’t know English, and the very first thing you tell them is an infinitely long sentence using only the word “fish”. They don’t believe that your language really allows this sentence. Provide as few sentences as possible that your friend can use to figure out how exactly you can have an English sentence using infinite occurrences of “fish”. It doesn’t have to be semantically valid, only syntactically.",
            "type": "ai",
            "grade": "There must be an example showing that \"fish\" is a plural noun, and also a verb that agrees with the plural. For example, \"fish swim\" works to show it's a plural noun, and \"I fished yesterday\" shows it's a verb. then you must show that recursion works without using \"that\", such as \"the dog I saw\". the fewer the sentences, the better. This allows a non-English speaker to see why you can have a sentence of infinite \"fish\"-es. \n  Make sure to give thorough feedback for what is missing."
          }
        ]
      }
    ]
  },
  "training": {
    "hero": {
      "h1": "Puzzle your way through how AI actually works.",
      "lede": "From tokens to gradients to neural nets — no black boxes, just logic. Pick a topic and dig in."
    },
    "topics": [
      {
        "id": "ai-nlp",
        "name": "NLP",
        "blurb": "Natural language processing — how machines read and represent text."
      },
      {
        "id": "ai-neural",
        "name": "Neural Networks",
        "blurb": "How networks compute, learn, and transform vectors."
      },
      {
        "id": "ai-ml",
        "name": "Classical ML",
        "blurb": "Decision trees, regression, and clustering — the pre-neural-network toolkit."
      },
      {
        "id": "ai-cv",
        "name": "Computer Vision",
        "blurb": "How machines make sense of images."
      },
      {
        "id": "ai-misc",
        "name": "Misc",
        "blurb": "Other corners of AI."
      }
    ],
    "puzzles": [
      {
        "id": "tok",
        "topic": "ai-nlp",
        "title": "Use tiktoken, not tiktok",
        "diff": "Medium",
        "body": [
          {
            "type": "lead",
            "text": "Before a language model can read text, it splits the text into pieces called tokens and turns each one into an integer ID. OpenAI's tiktoken library does exactly this."
          },
          {
            "type": "text",
            "text": "Trace through this snippet:"
          },
          {
            "type": "data",
            "lines": [
              "import tiktoken",
              "encoding = tiktoken.encoding_for_model(\"gpt-5\")",
              "sentence = \"AI is fun\"",
              "tokens = encoding.encode(sentence)",
              "print(tokens)",
              "",
              ">>> [17527, 382, 2827]"
            ]
          }
        ],
        "items": [
          {
            "q": "Which of the following statements could you technically run without causing an error?",
            "type": "choice",
            "options": [
              "tokens[-1] *= 2",
              "tokens[0] += \"Hello world\"",
              "tokens[-1] = len(tokens[-1])",
              "tokens[3] *= 2"
            ],
            "answer": 0
          },
          {
            "q": "Now suppose you write:  mystery = encoding.decode([tokens[0]])  — which value does mystery represent?",
            "type": "choice",
            "options": [
              "17527",
              "\"Artificial\"",
              "2827",
              "\"AI\""
            ],
            "answer": 3
          },
          {
            "q": "Which of the following best explains how a computer will understand these token indices?",
            "type": "choice",
            "options": [
              "Each digit of the index can be extracted to form a component of an embedding vector in semantic space.",
              "The index represents a corresponding row of an embedding matrix, and that row is an embedding vector in semantic space.",
              "The index is converted to binary, and binary is how computers understand human languages such as English.",
              "The magnitude of the index corresponds to the connotation of a token, so a larger index means a word has a more positive connotation."
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "grad",
        "topic": "ai-neural",
        "title": "A Decent Descent",
        "diff": "Hard",
        "body": [
          {
            "type": "lead",
            "text": "Suppose we have a point on a multivariable function with a vector of inputs and a scalar output. To minimize the value of this function, we take the negative gradient of the function at that point, move the input along that negative gradient vector by a small magnitude (the learning rate), and repeat this process over and over again."
          }
        ],
        "items": [
          {
            "q": "Which of the following components of neural networks is this gradient descent algorithm the most directly useful for?",
            "type": "choice",
            "options": [
              "Sorting out the most relevant tokens in a chatbot prompt, to figure out what to focus on in the response.",
              "Minimizing the cost function in order to make a machine learning model more accurate.",
              "Applying the activation function between layers of a neural network to make it more complex.",
              "Identifying the ethical implications of a model's binary decision."
            ],
            "answer": 1
          },
          {
            "q": "Using gradient descent, compute the optimized value of f after 4 iterations with learning rate μ = 0.1, starting from (x₁, x₂) = (4, 6). Round your answer to three decimal places.",
            "pre": [
              {
                "type": "formula",
                "tex": "f(x₁, x₂) = x₁² + x₂² − x₁x₂"
              }
            ],
            "type": "fill",
            "a": "10.935",
            "strict": "exact"
          },
          {
            "q": "Why is it important to keep a balanced learning rate μ that's not too high and not too low?",
            "type": "choice",
            "options": [
              "If μ is too low, the approximation will take a very long time to optimize since each step is more negligible, while if μ is too high, the approximation may go too far, jumping past the minimum value.",
              "If μ is too low, the model will forget previous data and lose accuracy, while if μ is too high, the model will memorize the data too quickly and become biased, overfitting the data given.",
              "If μ is too low, the gradient becomes zero and no learning happens, while if μ is too high, the gradient becomes infinite and the model cannot compute values.",
              "If μ is too low, the algorithm will stop updating entirely and freeze, while if μ is too high, it will always find the exact minimum instantly but risk crashing the computer."
            ],
            "answer": 0
          },
          {
            "q": "What does the input of the cost function represent?",
            "type": "choice",
            "options": [
              "The vector of learning rates of the predictions based on how correct each one is.",
              "The vector of the predicted probabilities and also correct answers of the outputs.",
              "The 3D-tensor of the updated gradient descent values, compressed into a vector.",
              "The scalar value that the model believes is the singular correct identification."
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "nn",
        "topic": "ai-neural",
        "title": "Weight For It",
        "diff": "Medium",
        "body": [
          {
            "type": "lead",
            "text": "A neural network passes a vector from one layer to the next by transforming it with weights and biases, then applying a nonlinear activation function. The code below is a rough sketch of one such step."
          },
          {
            "type": "data",
            "lines": [
              "1   n0 = [3, 7, -4]",
              "2   weights = [[2, -10, 5], [6, -1, 7], [-9, 13, 1]]",
              "3   biases = [8, 0, 12]",
              "4   n1 = []",
              "5   for j in weights:",
              "6       sum = 0",
              "7       for i in range(len(n0)):",
              "8           sum += j[i] + n0[i]",
              "9       n1.append(sum)",
              "10  n1_new = []",
              "11  for k in n0:",
              "12      if k < 0:",
              "13          k *= 0.01",
              "14      n1_new.append(k)"
            ]
          }
        ],
        "items": [
          {
            "q": "Which of the following components of a neural network might this code represent?",
            "type": "choice",
            "options": [
              "Moving from one layer of a neural network to the next layer, each being a vector.",
              "Moving through the entire neural network once to find the probability of each outcome.",
              "Updating the weights and biases using gradient descent after calculating the error.",
              "Normalizing the input data so that all values are between 0 and 1 before processing."
            ],
            "answer": 0
          },
          {
            "q": "What does this line print?  print(n1_new)",
            "type": "fill",
            "a": "[3, 7, -0.04]|3, 7, -0.04",
            "strict": "exact"
          },
          {
            "q": "What would happen if a neural network never had an equivalent of lines 10–14?",
            "type": "choice",
            "options": [
              "The network would be unable to process input vectors of different sizes, because an activation function only works on a set dimension.",
              "The activation function would cause the output of the network to always be bounded between -1 and 1.",
              "The weights in each layer would become identical during training due to symmetry, since there's nothing to make each weight different.",
              "The lack of a nonlinear activation function would result in the entire neural network simplifying to a single affine transformation."
            ],
            "answer": 3
          },
          {
            "q": "Which of the following is true about the transformation that brings the space that n0 is in to the space that n1 is in?",
            "type": "choice",
            "options": [
              "If n0 was multiplied by some constant k, and this transformation was applied, then the result would be n1 multiplied by k.",
              "The origin of the space of n1 is different from the origin of the space of n0 because the transformation is not linear.",
              "Adding a vector m0 to n0 and then applying the transformation gets the same result as first applying the transformation to m0 and adding this to n1.",
              "The gridlines in the space of n0 would not be lines after the transformation."
            ],
            "answer": 1
          }
        ]
      },
      {
        "id": "whynonlin",
        "topic": "ai-neural",
        "title": "Why Go Nonlinear",
        "diff": "Medium",
        "body": [
          {
            "type": "lead",
            "text": "Neural networks stack layers that each apply weights and biases, then an activation function."
          }
        ],
        "items": [
          {
            "q": "In a few sentences, explain why a neural network needs nonlinear activation functions — and what happens without them.",
            "type": "ai",
            "grade": "Full credit if the student explains that without nonlinear activations, stacking linear\nlayers collapses into a single linear (affine) transformation, so the network can only\nrepresent linear relationships no matter how many layers it has — and that nonlinearity is\nwhat lets it approximate complex, non-linear functions. Give partial credit for clearly\nstating just one of those two ideas. Be lenient about wording and notation. Give little or\nno credit for answers that are off-topic or just restate the question without explanation."
          }
        ]
      }
    ]
  }
};
