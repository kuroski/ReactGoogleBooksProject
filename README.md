# Introdução
Projeto da criação de uma aplicação para pesquisa de livros utilizando a API do Google Books e React.
[DEMO](https://kuroski.github.io/ReactGoogleBooksProject/)

## Utilização
Para utilizar a aplicação no ambiente local, basta clonar este repositório, e executar os seguintes comandos:
```bash
cd projeto

// caso você utilize yarn
yarn install
yarn start

// caso você utilize npm
npm install
npm start

// abrir o navegador em "http://localhost:3000/"
```

## Testando
Para executar os testes na aplicação, executar os seguintes comandos:
```bash
// caso você utilizar yarn
yarn test

// caso você utilize npm
npm test

// Irá abrir uma lista de opções
// Selecionando a opção "a", irá ser executados todos os testes da aplicação
``` 

## Motivações/Outros
- Foi escolhido utilizar o React ele é muuito popular no mundo do front
- TDD com o front
- Evolução pessoal
- O projeto está com 93% de cobertura de testes
    - Rodar comando `yarn|npm test -- --coverage` para ver
- Como não tive que lidar com a consistência do state, ainda não foi utilizado o Redux

### O que testar?
- **Se o componente é renderizado**

Pelo menos verificar se o componente está sendo renderizado corretamente, podendo ser uma simples verificação se o output está nulo.
- **O output**

Para esse caso, devemos ver se o componente está renderizando a coisa certa.
Dada uma série de props, qual é o output esperado?
Um componente `Livro` renderiza o seu título e a sua capa, ou ele renderiza um `TODO: capa estará disponível na v2.0`
- **Os states**

Cada condicional deve ser contabilizada, precisamos ter certeza de que aquela lógica da condicional está tendo o comportamento correto.
- **Os eventos**

Se o componente pode receber interações (ex: input ou button), todos os seus eventos devem ser testados, incluíndo os binds.
- **"The edge cases"**

Qualquer item operando em um array pode ter diversos casos: Um array vazio, um array com 1 elemento, um array com 30 elementos, precisa ser testadas todas as possibilidades para verificar se o componente está tendo o comportamento correto.

### Roadmap
- [x] TEESTESS
- [x] Estrutura base da aplicação
- [x] Pesquisa de livros
- [x] Listagem de livros
- [x] Paginação
- [x] Adicionar livro como favorito
- [x] Detalhes de um livro
- [x] Highlight dos termos pesquisados
- [ ] Melhorar toda a interface
- [ ] Inserir animações
- [ ] Inserir loader
- [ ] Estruturar CSS ou styled-components
- [ ] Inserir mais informações dos livros
- [ ] Página de listagem de favoritos
- [ ] yarn add redux pls
