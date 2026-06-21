---
title: "HL7 FHIR"
date: 2026-06-12
tags:
  - interoperabilidade
  - dados-de-saúde
  - normas
  - rse
draft: false
maturity: 1
aliases:
  - "FHIR"
  - "Fast Healthcare Interoperability Resources"
related:
  - "Registos eletrónicos como dados de investigação"
  - "Ensinar informática da saúde — princípios acima de produtos"
  - "Literacia de dados em saúde"
---
O padrão moderno para troca de dados de saúde. FHIR (Fast Healthcare Interoperability Resources) é uma especificação de API RESTful da HL7 que estrutura dados clínicos como **resources** modulares — Patient, Observation, Condition, MedicationRequest, etc.

## Por que razão o FHIR é importante

- **REST + JSON:** acessível a qualquer programador, não apenas a especialistas HL7.
- **Resources granulares:** solicita-se o que é necessário (um único resultado laboratorial, não todo o processo clínico).
- **Profiling:** perfis nacionais e institucionais (ex.: US Core, IPS) definem quais os campos obrigatórios, quais as terminologias a utilizar.

## A realidade

A adoção do FHIR está a acelerar, mas é desigual. Muitos hospitais expõem APIs FHIR incompletas, mal documentadas ou apenas de leitura. O padrão é uma condição necessária para a interoperabilidade, não uma condição suficiente.
