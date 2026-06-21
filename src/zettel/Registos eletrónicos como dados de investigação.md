---
title: "Registos eletrónicos como dados de investigação"
date: 2026-06-12
tags:
  - rse
  - dados-de-saúde
  - investigação
  - qualidade-de-dados
  - dados-do-mundo-real
draft: false
maturity: seedling
aliases:
  - "EHR data"
  - "electronic health record data"
related:
  - "HL7 FHIR"
  - "Literacia de dados em saúde"
  - "Biomarcadores digitais"
---
Os Registos de Saúde Eletrónicos contêm um vasto registo longitudinal de cuidados clínicos — e são cada vez mais usados como dados de investigação. Contudo, os dados de EHR foram **concebidos para faturação e documentação clínica, não para investigação**.

## Oportunidades

- Populações do mundo real, não selecionadas (não voluntários de ensaios).
- Seguimento longitudinal ao longo de anos.
- Detalhe clínico granular: valores laboratoriais, medicação, notas em texto livre.
- Grande escala: milhões de doentes.

## Armadilhas

- A ausência de dados não é aleatória — os doentes mais graves têm mais medições.
- As práticas de codificação variam por instituição, especialidade e incentivos de reembolso.
- Ambiguidade temporal: um código de diagnóstico que aparece numa determinada data pode representar uma condição diagnosticada anos antes.
- Proveniência dos dados: quem inseriu isto? Porquê?

## Regras práticas

Tratar cada variável derivada do EHR como um proxy, não como verdade absoluta. Validar contra um subconjunto com revisão manual de processos.
