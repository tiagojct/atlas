---
title: "Explicabilidade em IA clínica"
date: 2026-06-12
tags:
  - ia-clínica
  - explicabilidade
  - xai
  - confiança
draft: false
maturity: seedling
aliases:
  - "explainability"
  - "XAI clinical"
related:
  - "Colaboração humano-IA na saúde"
  - "IA como Dispositivo Médico (AIaMD)"
  - "Apoio à Decisão Clínica — os Cinco Certos"
---
A capacidade de descrever por que razão um modelo de IA clínica produziu uma determinada predição ou recomendação em termos que um clínico possa avaliar.

## Para além dos mapas de saliência

Os mapas de saliência e os gráficos de importância de features são as ferramentas XAI mais comuns. Mostram *o que* o modelo observou, não *por que razão* isso importa. Em contexto clínico, os clínicos precisam de:

- Explicações contrafactuais: «O que alteraria a predição?»
- Explicações baseadas em coorte: «Entre doentes semelhantes, o que aconteceu?»
- Plausibilidade mecanicista: «Isto está alinhado com a fisiopatologia?»

## O problema da confiança

Os clínicos não precisam de compreender backpropagation. Precisam de saber se o raciocínio do modelo é compatível com o seu raciocínio clínico — e quando diverge, se o modelo viu algo que lhes escapou.
