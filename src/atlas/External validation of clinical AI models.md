---
title: "External validation of clinical AI models"
date: 2026-06-12
tags:
  - clinical-ai
  - validation
  - methodology
  - digital-health
draft: false
maturity: 1
aliases:
  - "Validação externa de modelos de IA clínica"
  - "external validation"
related:
  - "Benchmark vs clinical utility"
  - "Calibration of clinical prediction models"
  - "Deployment drift in healthcare ML"
---
The process of evaluating a clinical AI model on data that **were not used during development**.

External validation is the minimum requirement before any model can be considered for clinical use. Without it, you are only measuring how well the model memorised its training environment — not how it generalises.

## Why internal validation is not enough

- **Temporal validation** (same institution, later period) already reveals substantial degradation.
- **Geographic validation** (different hospital, different population) is where most models fail quietly.
- A model that reaches AUC 0.95 internally can drop to 0.72 when validated elsewhere. This is not a bug — it is the norm.

## The hierarchy

Geographic external validation > temporal validation > internal cross-validation.
