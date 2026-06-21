---
title: "Calibração de modelos de predição clínica"
date: 2026-06-12
tags:
  - ia-clínica
  - estatística
  - predição
  - validação
draft: false
maturity: seedling
aliases:
  - "calibration"
  - "model calibration"
related:
  - "Validação externa de modelos de IA clínica"
  - "Acurácia diagnóstica vs eficácia clínica"
  - "Deriva de deployment em ML na saúde"
---
A calibração mede quão bem as probabilidades previstas correspondem às frequências observadas. Um modelo que prevê um risco de 30% para um evento deve observar esse evento em aproximadamente 30% dos doentes semelhantes.

## Por que razão a discriminação não é suficiente

- A AUC (discriminação) diz *se* o modelo ordena os doentes corretamente.
- A calibração diz se os números significam o que aparentam.
- Um modelo bem discriminado mas mal calibrado sobrestima o risco nuns grupos e subestima noutros — perigoso em contexto clínico.

## Ferramentas

- Calibration belts (Nattino et al.)
- Calibration-in-the-large
- Análise de curva de decisão — se usar o modelo melhora o benefício líquido
