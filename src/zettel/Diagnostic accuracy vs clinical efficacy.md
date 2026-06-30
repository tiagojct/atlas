---
title: "Diagnostic accuracy vs clinical efficacy"
date: 2026-06-12
tags:
  - diagnosis
  - evaluation
  - clinical-ai
  - methodology
draft: false
maturity: 1
aliases:
  - "Acurácia diagnóstica vs eficácia clínica"
  - "accuracy vs effectiveness"
  - "diagnostic accuracy"
related:
  - "Benchmark vs clinical utility"
  - "External validation of clinical AI models"
  - "The Methods section as the soul of a paper"
---
A test or model can be accurate without being effective. Accuracy measures whether the right answer was produced. Effectiveness measures whether the answer changed anything.

## The distinction

- **Diagnostic accuracy:** sensitivity, specificity, AUC — how well the model discriminates.
- **Clinical effectiveness:** did the patient receive different treatment? Did the outcome improve?

A model that detects a condition with 95% sensitivity but leads to no change in management has zero clinical effectiveness. It consumed resources and produced heat.

## The chain

Accurate diagnosis → correct treatment decision → appropriate action → improved outcome. Every link in this chain can break.
