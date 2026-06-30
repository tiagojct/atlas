---
title: "Calibration of clinical prediction models"
date: 2026-06-12
tags:
  - clinical-ai
  - statistics
  - prediction
  - validation
draft: false
maturity: 2
aliases:
  - "Calibração de modelos de predição clínica"
related:
  - "External validation of clinical AI models"
  - "Diagnostic accuracy vs clinical efficacy"
  - "Deployment drift in healthcare ML"
---
Calibration measures how well predicted probabilities match observed frequencies. A model that predicts a 30% risk for an event should see that event in roughly 30% of similar patients.

## Why discrimination is not enough

- [AUC](https://en.wikipedia.org/wiki/Receiver_operating_characteristic#Area_under_the_curve) (discrimination) tells you *whether* the model ranks patients correctly.
- Calibration tells you whether the numbers mean what they appear to mean.
- A model with good discrimination but poor calibration overestimates risk in some groups and underestimates it in others — which can be dangerous in a clinical setting.
