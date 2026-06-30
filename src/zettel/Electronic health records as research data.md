---
title: "Electronic health records as research data"
date: 2026-06-12
tags:
  - ehr
  - health-data
  - research
  - data-quality
  - real-world-data
draft: false
maturity: 1
aliases:
  - "Registos eletrónicos como dados de investigação"
  - "EHR data"
  - "electronic health record data"
related:
  - "HL7 FHIR"
  - "Health data literacy"
  - "Digital biomarkers"
---
Electronic Health Records hold a vast longitudinal record of clinical care — and are increasingly used as research data. But EHR data were **designed for billing and clinical documentation, not for research**.

## Opportunities

- Real-world, unselected populations (not trial volunteers).
- Longitudinal follow-up over years.
- Granular clinical detail: lab values, medication, free-text notes.
- Large scale: millions of patients.

## Pitfalls

- Missingness is not random — sicker patients have more measurements.
- Coding practices vary by institution, specialty, and reimbursement incentives.
- Temporal ambiguity: a diagnosis code appearing on a given date may stand for a condition diagnosed years earlier.
- Data provenance: who entered this, and why?

## Practical rules

Treat every EHR-derived variable as a proxy, not absolute truth. Validate against a manually chart-reviewed subset.
