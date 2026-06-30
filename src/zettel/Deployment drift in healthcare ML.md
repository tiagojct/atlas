---
title: "Deployment drift in healthcare ML"
date: 2026-06-12
tags:
  - clinical-ai
  - mlops
  - monitoring
  - data-science
draft: false
maturity: 1
aliases:
  - "Deriva de deployment em ML na saúde"
  - "drift"
  - "model drift"
  - "data drift"
related:
  - "External validation of clinical AI models"
  - "Calibration of clinical prediction models"
  - "HL7 FHIR"
---
The gradual (or sudden) decay of a machine-learning model's performance after deployment, caused by changes in the data distribution, in clinical practice, or in the population.

## Kinds of drift

- **Data drift:** the input distribution shifts (e.g. a new lab replaces an old assay, changing reference ranges).
- **Concept drift:** the relationship between inputs and outputs shifts (e.g. a new treatment alters a disease's natural history, making old predictions obsolete).
- **Label drift:** the definition of the outcome shifts (e.g. diagnostic criteria are revised).

## Why it matters in health

A model deployed in 2022, trained on 2018 data, may already be making systematically wrong predictions in 2026. Unlike consumer software, health models receive no automatic updates — and the consequences of quiet decay are clinical, not cosmetic.
