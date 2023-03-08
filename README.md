
# Tfc Trybe Futebol Clube

Neste projeto eu desenvolvi um Back-end para um aplicacao em Front-end.

Utilizei pra realizar o projeto o Vscode, DockerFile e docker-compose. 

## Stack utilizada

**Back-end:** Node, Express, Sequelize, JWT, MSC, Middlewares, TypeScript, Express, MySQL e Sequelize, JSON Web Tokens (JWT),
bcrypt (para criptografar as senhas dos Usuarios), Testes de integração, foram utilizados Mocha, Chai e Sinon.
Utilizei a Arquitetura MSC para organizacao do codigo, Validacoes com Middlewares, Express.


## Instruções de utilização

Recomendo utilizar o [Docker](https://www.docker.com/) para rodar o seu projeto, assim como o [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) para testar as rotas diretamente no [VSCode](http://vscode.dev).

### Clone o projeto

- Usando [Github-Cli](https://cli.github.com/):
```bash
 gh repo clone WeydsonCristiano/tfc
```
- Usando SSH:
```bash
  git clone git@github.com:WeydsonCristiano/tfc.git
```
Após isso, acesse a pasta do projeto:
```bash
cd tfc
```

### Rodando com Docker

- Faça o docker-compose
```bash
  npm run compose:up
```
- Instale as dependências

```bash
  npm install
```

- Rode os scripts

//pra baixar o container que esta rodando
```
npm run compose:down 
```
// pra limpar todos os containers da maquina

docker system prune

- Inicie o sistema!
```bash

http://localhost:3000/
```
