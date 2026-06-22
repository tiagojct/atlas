---
title: Cepticismo de benchmark
date: 2026-06-12
tags:
  - ia-clínica
  - avaliação
  - benchmarks
  - epistemologia
draft: false
maturity: 1
aliases:
related:
  - Benchmark vs utilidade clínica
  - Validação externa de modelos de IA clínica
  - Acurácia diagnóstica vs eficácia clínica
---
Uma posição metodológica: os benchmarks públicos para IA clínica não são medidas neutras de capacidade — são artefactos construídos, com pressupostos, pontos cegos e incentivos perversos.

## A crítica

- **Lei de Goodhart:** quando uma métrica se torna um alvo, deixa de ser uma boa métrica.
- **Contaminação de benchmarks:** a contaminação dos dados de treino inflaciona as pontuações silenciosamente.
- **Viés do conjunto de dados:** os benchmarks refletem a população a partir da qual foram construídos, não a população na qual serão usados.
- **Validade da tarefa:** a tarefa do benchmark corresponde a uma tarefa clínica real?

## O corolário clínico

Um modelo que lidera a tabela no MedQA não provou nada sobre a sua capacidade de ajudar um clínico. Demonstrou desempenho numa tarefa restrita de escolha múltipla com distratores curados — uma tarefa que nenhum clínico realiza na prática.

## A alternativa

Avaliação externa, prospetiva, comparativa, no contexto de utilização pretendido. Dispendiosa, lenta, pouco glamorosa — e a única avaliação que importa.
