# Niuco Backend Challenge

O desafio foi desenvolvido utilizando o framework NestJS e a metodologia TDD (Test Driven Development).

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

## Decisões técnicas, manutenibilidade e escalabilidade da aplicação

O framework NestJS foi escolhido por alguns motivos, dentre eles:

- Permite, de forma simples, a criação de testes unitários e de integração.
- É um dos frameworks mais utilizados na stack de NodeJS para backend.
- Tem alto poder de escalabilidade através da utilização de módulos, os quais permitem que a aplicação seja dividida em partes menores para facilitar sua manutenção e entendimento.

> *Vale ressaltar que para a resolução deste desafio em específico foi utilizado o módulo principal da aplicação `App`, mas em um projeto escalável, o ideal seria desenvolver os endpoints de usuário no próprio módulo de usuário.
