---
title: "Acurácia diagnóstica vs eficácia clínica"
date: 2026-06-12
tags:
  - diagnóstico
  - avaliação
  - ia-clínica
  - metodologia
draft: false
maturity: seedling
aliases:
  - "accuracy vs effectiveness"
  - "diagnostic accuracy"
related:
  - "Benchmark vs utilidade clínica"
  - "Validação externa de modelos de IA clínica"
  - "A secção de Métodos como alma de um artigo"
---
Um teste ou modelo pode ser exato sem ser eficaz. A exatidão mede se a resposta certa foi produzida. A eficácia mede se a resposta mudou alguma coisa.

## A distinção

- **Exatidão diagnóstica:** sensibilidade, especificidade, AUC — quão bem o modelo discrimina.
- **Eficácia clínica:** o doente recebeu um tratamento diferente? O resultado melhorou?

Um modelo que deteta uma condição com 95% de sensibilidade mas não leva a nenhuma alteração na conduta tem eficácia clínica zero. Consumiu recursos e produziu calor.

## A cadeia

Diagnóstico exato → decisão terapêutica correta → ação apropriada → resultado melhorado. Cada elo desta cadeia pode quebrar.
