---
title: "HL7 FHIR"
date: 2026-06-12
tags:
  - interoperability
  - health-data
  - standards
  - ehr
draft: false
maturity: 1
aliases:
  - "HL7 FHIR"
  - "FHIR"
  - "Fast Healthcare Interoperability Resources"
related:
  - "Electronic health records as research data"
  - "Teaching health informatics — principles over products"
  - "Health data literacy"
---
The modern standard for exchanging health data. FHIR (Fast Healthcare Interoperability Resources) is an HL7 RESTful API specification that structures clinical data as modular **resources** — Patient, Observation, Condition, MedicationRequest, and so on.

## Why FHIR matters

- **REST + JSON:** accessible to any developer, not only HL7 specialists.
- **Granular resources:** you request what you need (a single lab result, not the whole record).
- **Profiling:** national and institutional profiles (e.g. US Core, IPS) define which fields are mandatory and which terminologies to use.

## The reality

FHIR adoption is accelerating, but uneven. Many hospitals expose incomplete, poorly documented, or read-only FHIR APIs. The standard is a necessary condition for interoperability, not a sufficient one.
