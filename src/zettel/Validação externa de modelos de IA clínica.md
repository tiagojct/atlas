---
title: "Validação externa de modelos de IA clínica"
date: 2026-06-12
tags:
  - ia-clínica
  - validação
  - metodologia
  - saúde-digital
draft: false
maturity: seedling
aliases:
  - "external validation"
related:
  - "Benchmark vs utilidade clínica"
  - "Calibração de modelos de predição clínica"
  - "Deriva de deployment em ML na saúde"
---
O processo de avaliar um modelo de IA clínica em dados que **não foram usados durante o desenvolvimento**.

A validação externa é o requisito mínimo antes de qualquer modelo poder ser considerado para uso clínico. Sem ela, está-se apenas a medir quão bem o modelo memorizou o seu ambiente de treino — e não como generaliza.

## Por que razão a validação interna é insuficiente

- **Validação temporal** (mesma instituição, período posterior) já revela degradação substancial.
- **Validação geográfica** (hospital diferente, população diferente) é onde a maioria dos modelos falha silenciosamente.
- Um modelo que atinge AUC 0,95 internamente pode cair para 0,72 quando validado noutro local. Isto não é um bug — é a norma.

## A hierarquia

Validação externa geográfica > validação temporal > validação cruzada interna.
