# Niuco Backend Challenge

O desafio foi desenvolvido utilizando o framework NestJS.

## Instalação

Para rodar este serviço em ambiente de desenvolvimento você precisará:

- Ter o serviço, presente no repositório [niuco/backend-challenge](https://github.com/niuco/backend-challenge), rodando em seu computador.
- Executar os seguintes comandos:

````
npm install
````

````
cp .env.example .env
````

````
npm run start
````

## Testes

Para rodar os testes da aplicação, execute os seguintes comandos:

### Testes unitários

````
npm run test
````

### Testes de integração (E2E)

````
npm run test:e2e
````

## CI/CD

A pipeline de CI/CD foi desenvolvida através do GitHub actions e sua configuração está presente em [.github/workflows](https://github.com/filipesiota/niuco-backend-challenge/tree/main/.github/workflows)
