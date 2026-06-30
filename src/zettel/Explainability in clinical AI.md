---
title: "Explainability in clinical AI"
date: 2026-06-12
tags:
  - clinical-ai
  - explainability
  - xai
  - trust
draft: false
maturity: 1
aliases:
  - "Explicabilidade em IA clínica"
  - "explainability"
  - "XAI clinical"
related:
  - "Human-AI collaboration in healthcare"
  - "AI as a Medical Device (AIaMD)"
  - "Clinical Decision Support — the Five Rights"
---
The ability to describe why a clinical AI model produced a given prediction or recommendation, in terms a clinician can assess.

## Beyond saliency maps

Saliency maps and feature-importance charts are the most common XAI tools. They show *what* the model looked at, not *why* that matters. In a clinical setting, clinicians need:

- Counterfactual explanations: "What would change the prediction?"
- Cohort-based explanations: "Among similar patients, what happened?"
- Mechanistic plausibility: "Does this line up with the pathophysiology?"

## The trust problem

Clinicians don't need to understand backpropagation. They need to know whether the model's reasoning is compatible with their clinical reasoning — and, when it diverges, whether the model saw something they missed.
