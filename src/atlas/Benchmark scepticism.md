---
title: "Benchmark scepticism"
date: 2026-06-12
tags:
  - clinical-ai
  - evaluation
  - benchmarks
  - epistemology
draft: false
maturity: 1
aliases:
  - "Cepticismo de benchmark"
related:
  - "Benchmark vs clinical utility"
  - "External validation of clinical AI models"
  - "Diagnostic accuracy vs clinical efficacy"
---
A methodological stance: public benchmarks for clinical AI are not neutral measures of capability — they are constructed artifacts, with assumptions, blind spots, and perverse incentives.

## The critique

- **Goodhart's law:** when a measure becomes a target, it stops being a good measure.
- **Benchmark contamination:** leakage into the training data inflates scores silently.
- **Dataset bias:** benchmarks reflect the population they were built from, not the population they will be used on.
- **Task validity:** does the benchmark task match a real clinical task?

## The clinical corollary

A model that tops the MedQA leaderboard has proved nothing about its ability to help a clinician. It demonstrated performance on a narrow multiple-choice task with curated distractors — a task no clinician actually performs.

## The alternative

External, prospective, comparative evaluation in the intended context of use. Expensive, slow, unglamorous — and the only evaluation that matters.
