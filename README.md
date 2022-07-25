<img src="https://github.com/mariaftavares/encontreiumanjinho/blob/main/imagem/bannerGithub.png"  />    
<a>
    <img alt="Node version" src="https://img.shields.io/badge/node-v16.13.1-%237519C1">
  </a>
<a href="http://encontreiumanjinho.herokuapp.com">
    <img alt="Deploy" src="https://img.shields.io/badge/deploy-heroku-%237519C1">
  </a>
<h1 align="center">Encontrei um Anjinho</h1>

<p align="center">
 <a href="#sobre-o-projeto">Sobre</a> •
 <a href="#funcionalidades">Funcionalidades</a> •
 <a href="#como-executar-o-projeto">Como executar</a> • 
 <a href="#rotas">Rotas</a>
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#autor">Autor</a> • 
</p>


## 💻 Sobre o projeto

### 🎯 Objetivo

O objetivo desse projeto é centralizar publicações de animais para adoções, já que muita das vezes essas publicações são feitas em redes sociais onde ocorre publicações de vários outros temas, e com isso essas publicações de encontro de animais abandonados acabam perdendo visibilidade, dificultando que o autor da publicação consiga alcançar mais pessoas e consequentemente encontre alguém disposto adotar o animalzinho. 

### ✅ Solução

O 👼**Encontrei um Anjinho** disponibilizará uma API que permite cadastrar uma publicação informando o encontro do animal, contendo informações como: imagem, descrição, até qual data que o autor da publicação pode disponibilizar um lar temporário para o animalzinho, cidade em que foi encontrado e o contato do autor da publicação.

---

## ⚙️ Funcionalidades

- A pessoa que encontrou um anjinho e não pode ficar com ele poderá realizar as seguintes atividades:
  - [x] Realizar o cadastro (nome, email, senha, telefone)
  - [x] Realizar o login
  - [x] Criar uma publicação com informações do anjinho (imagem, descrição, cidade/estado onde foi encontrado etc..) 
  - [x] Atualizar/Excluir a publicação feita por ele.
- A pessoa que deseja adotar um anjinho poderá realizar seguintes atividades :
  - [x] Ver todas publicações de anjinhos encontrados.
  - [x] Filtrar publicações de anjinhos encontrados por estado/cidade.
---

## 🚀 Como executar o projeto 

💡Este projeto está disponibilizado pela plataforma Heroku. Caso deseje utilizá-lo, é só acessar este [link](http://encontreiumanjinho.herokuapp.com), e pra verificar as rotas clique [aqui!](#-rotas)

### Pré-requisitos (para rodar localmente)

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

#### 🎲 Rodando a API

```bash

# Clone este repositório
$ git clone https://github.com/mariaftavares/encontreiumanjinho.git

# Acesse a pasta do projeto no terminal/cmd
$ cd encontreiumanjinho

# Instale as dependências
$ npm install

# Crie o arquivo .env para configurar as variavéis de ambiente seguindo o exemplo do env.example
$ touch .env

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:8080(por padrão ou a porta informada no .env) - acesse http://localhost:8080

```
## Rotas
💡 As rotas de **POST** só podem ser utilizadas onde seja simulado um Client, nesse caso você pode utilizar as seguintes plataformas: [Postman](https://www.postman.com) ou [Insomnia](https://insomnia.rest).

💡 As rotas que tiverem esse icone 🔒 antes são rotas onde é necessário que seja informado no **Headers** o token de acesso gerado na rota login. No campo **Key** coloque: Authorization e no **Value**: Bearer token

Se caso estiver utilizando a API de forma local é só trocar https://encontreiumanjinho.herokuapp.com
por http://localhost:`NumeroDaporta` .

|  Método |  Rota  |    Descrição    |
| :---         |     :---:      |          ---: |
| `GET`   | http://encontreiumanjinho.herokuapp.com/   | Rota incial mensagem Bem-Vindo    |
| `GET`   | http://encontreiumanjinho.herokuapp.com/feed |Lista todas as publicações de anjinhos encontrados |
| `GET`   | http://encontreiumanjinho.herokuapp.com/feed`?uf=uf` |Lista todas as publicações de anjinhos encontrados no estado(sigla) informado|
| `GET`   | http://encontreiumanjinho.herokuapp.com/feed`?uf=uf&city=nome da cidade` |Lista todas as publicações de anjinhos encontrados na cidade informada|
| `POST`   | http://encontreiumanjinho.herokuapp.com/logincreate |Nesta rota você pode criar um usuário clique [aqui](#create-user) e veja um exemplo|
| `POST`   | http://encontreiumanjinho.herokuapp.com/login |Nesta rota você pode realizar o login do usuário clique [aqui](#login) e veja um exemplo|
| 🔒 `POST`   | http://encontreiumanjinho.herokuapp.com/postcreate |Nesta rota você pode realizar a publicação do anjinho encontrado clique [aqui](#create-post) e veja um exemplo|
| 🔒 `GET`   | http://encontreiumanjinho.herokuapp.com/myposts |Nesta rota você é listado todos as publicações feitas por você|
| 🔒 `PUT`   | http://encontreiumanjinho.herokuapp.com/changepost/`IDPOST` |Nesta rota você pode alterar as informações da sua publicação do id informado, clique [aqui](#update-post) e veja um exemplo|
| 🔒 `DELETE`   | http://encontreiumanjinho.herokuapp.com/changepost/`IDPOST` |Nesta rota você excluir a publicação do id informado|

## Exemplos 

### Create User
```bash
## Enviar essas informações no body (raw/json)
{
    "name":"Marcela",
    "email":"marcela@gmail.com",
    "password":"123456",
    "phone":"32999332166"

 }

```

### Login
```bash
## Enviar essas informações no body (raw/json)
{
    "email":"marcela@gmail.com",
    "password":"123456"
 }

```

### Create Post
```bash
## Enviar essas informações no body (raw/json)
{
   "description":"Encontrei esse anjinho e não posso ficar com ele, consigo dar um lar temporário para ele a até dia 10/08",
    "finaldate":"09/25/2022", ## mes/dia/ano, esse campo é a data máxima que pode oferar um lar temporário para o anjinho.
    "genre":"f", ## "f" para  fêmea e  "m" para macho
    "species":"c", ## "c" para  cachorro , "g" para gato e "o" para outro (caso não seja nenhum das alternativas anteriores)
    "imagem":["http://s2.glbimg.com/4Ek8CnZSuYyyvaNQEPPiX_d-faA=/e.glbimg.com/og/ed/f/original/2017/11/24/gali1.jpg"] ## Informa a URL da imagem, pode informar mais de uma é so colocar virgula antes.
}
```

### Update Post
```bash
## Enviar essas informações no body (raw/json)
{
	## Só é necessário enviar o campo que deseja alterar.
  "adopted": true
  ## Neste exemplo estou alterando o campo adopted para true (que por padrão na criação da publicação é false) pois esse anjinho foi adotado!
}
```



## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **API**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotenv-safe](https://www.npmjs.com/package/dotenv-safe)**
-   **[mongoose](https://www.npmjs.com/package/mongoose)**
-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
-   **[bcrypt](https://www.npmjs.com/package/bcrypt)**
-   **[nodemon](https://www.npmjs.com/package/nodemon)**
> Veja o arquivo  [package.json](https://github.com/mariaftavares/encontreiumanjinho/blob/main/package.json)


---
## Autora

<a>
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/83185858?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Maria Fernanda Tavares</b></sub></a> <a href="https://github.com/mariaftavares"></a>
 <br />


---