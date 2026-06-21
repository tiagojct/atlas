---
title: "Deriva de deployment em ML na saúde"
date: 2026-06-12
tags:
  - ia-clínica
  - mlops
  - monitorização
  - ciência-de-dados
draft: false
maturity: 1
aliases:
  - "drift"
  - "model drift"
  - "data drift"
related:
  - "Validação externa de modelos de IA clínica"
  - "Calibração de modelos de predição clínica"
  - "HL7 FHIR"
---
A degradação gradual (ou súbita) do desempenho de um modelo de machine learning após a implementação, causada por alterações na distribuição dos dados, na prática clínica ou na população.

## Tipos de drift

- **Data drift:** a distribuição dos inputs altera-se (ex.: um novo laboratório substitui um ensaio antigo, mudando os intervalos de referência).
- **Concept drift:** a relação entre inputs e outputs altera-se (ex.: um novo tratamento modifica a história natural de uma doença, tornando obsoletas as predições antigas).
- **Label drift:** a definição do outcome altera-se (ex.: os critérios de diagnóstico são revistos).

## Por que razão é importante em saúde

Um modelo implementado em 2022, treinado com dados de 2018, pode já estar a fazer predições sistematicamente erradas em 2026. Ao contrário do software de consumo, os modelos de saúde não recebem atualizações automáticas — e as consequências da degradação silenciosa são clínicas, não cosméticas.
