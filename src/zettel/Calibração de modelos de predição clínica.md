---
title: Calibração de modelos de predição clínica
date: 2026-06-12
tags:
  - ia-clínica
  - estatística
  - predição
  - validação
draft: false
maturity: 2
aliases:
related:
  - Validação externa de modelos de IA clínica
  - Acurácia diagnóstica vs eficácia clínica
  - Deriva de deployment em ML na saúde
---
A calibração mede quão bem as probabilidades previstas correspondem às frequências observadas. Um modelo que prevê um risco de 30% para um evento deve observar esse evento em aproximadamente 30% dos doentes semelhantes.

## Por que razão a discriminação não é suficiente

- A [AUC](https://en.wikipedia.org/wiki/Receiver_operating_characteristic#Area_under_the_curve) (discriminação) diz *se* o modelo ordena os doentes corretamente.
- A calibração diz se os números significam o que aparentam.
- Um modelo com boa discriminação mas com má calibração sobrestima o risco nuns grupos e subestima noutros, o que pode ser perigoso em contexto clínico.

