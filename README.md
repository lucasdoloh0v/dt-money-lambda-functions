# Projeto de Funções Lambda para o projeto DT-Money (Node.js)

Este projeto organiza funções AWS Lambda usando Node.js, com deploy manual ou via GitHub Actions.

## Estrutura
- `funcoes/` — cada pasta é uma função Lambda
- `scripts/build.sh` — empacota todas as funções em ZIPs
- `.github/workflows/deploy.yml` — exemplo de CI/CD

## Como empacotar manualmente

```bash
./scripts/build.sh
