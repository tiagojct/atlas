---
title: "Benchmark vs clinical utility"
date: 2026-06-12
tags:
  - clinical-ai
  - evaluation
  - benchmarks
  - digital-health
draft: false
maturity: 1
aliases:
  - "Benchmark vs utilidade clínica"
  - "benchmark gap"
  - "clinical utility gap"
related:
  - "External validation of clinical AI models"
  - "Diagnostic accuracy vs clinical efficacy"
  - "Benchmark scepticism"
---
The gap between a model's performance on curated benchmarks and its real benefit to patients, clinicians, or health systems.

## The problem

- Benchmarks measure accuracy on a fixed dataset. Clinical utility measures whether the model changes decisions and improves outcomes.
- A model can top every benchmark and still be useless — or harmful — in practice.
- The history of clinical prediction is littered with models that performed brilliantly in the paper and were never used.

## Why the gap exists

- Benchmarks are static; clinical reality keeps shifting.
- Benchmarks remove ambiguity; clinical decisions are made under uncertainty.
- Benchmarks reward overfitting to the test set, not robustness.

## What matters instead

Impact on the decision, workflow fit, calibration, fairness across subgroups, and sustained performance over time.
