---
id: pd
title: "This problem will make you more productive"
section: puzzling
topic: order
difficulty: easy
---

## Intro

A natural language is productive if a finite amount of phonemes can generate an infinite amount of sentences. Productivity, by the way, is a criterion that must be satisfied in order to even be a language, according to most linguists. 

This notion also applies to programming languages. Given a finite set of characters, a language is productive if it can generate infinite programs. 

In the first two tasks, you’re basically supposed to find and explain an example that illustrates sentences or programs that can have indefinite length. 

## Questions

### Show that English is productive. 
type: ai
grade: |
    There must be some example of infinite recursion, with the elements that are being recursed having indefinite cardinality, for an English sentence. For example, you can say "a friend of a friend of a friend of ...", or "guy 1, who guy 3, who guy 4 met, ... met, met guy 2." 
    Make sure to give thorough feedback for what is missing.

### Show that Python is productive.
type: ai
grade: |
    There must be some example of infinite recursion, and the elements being recursed much have infinite cardinality, for a Python program. One such example is a nested if statement;
    if x1 < 0: 
        if x2 < 0: 
            if ...
                ...
            print(" ")
        print(" ")
    Make sure to give thorough feedback for what is missing.


### You meet someone who doesn’t know English, and the very first thing you tell them is an infinitely long sentence using only the word “fish”. They don’t believe that your language really allows this sentence. Provide as few sentences as possible that your friend can use to figure out how exactly you can have an English sentence using infinite occurrences of “fish”. It doesn’t have to be semantically valid, only syntactically.
type: ai
grade: |
    There must be an example showing that "fish" is a plural noun, and also a verb that agrees with the plural. For example, "fish swim" works to show it's a plural noun, and "I fished yesterday" shows it's a verb. then you must show that recursion works without using "that", such as "the dog I saw". the fewer the sentences, the better. This allows a non-English speaker to see why you can have a sentence of infinite "fish"-es. 
    Make sure to give thorough feedback for what is missing. 