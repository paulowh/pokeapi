# Projeto Pokémon API

## 📖 Sobre
Uma aplicação web que permite aos usuários pesquisar e interagir com dados de Pokémon usando a PokéAPI. O projeto inclui funcionalidades como busca de Pokémon por nome ou número, visualização de informações detalhadas e um mini-game "Quem é esse Pokémon?".

## 🚀 Funcionalidades
- Pesquisa de Pokémon por nome ou número
- Visualização de informações detalhadas do Pokémon:
  - Estatísticas
  - Tipos
  - Habilidades
  - Altura e peso
- Gerador de Pokémon aleatório
- Mini-game "Quem é esse Pokémon?"
- Sistema para salvar Pokémon favoritos
- Suporte para variantes shiny

## 🛠️ Tecnologias Utilizadas
- HTML5
- CSS3
- JavaScript (Vanilla)
- Bootstrap
- PokéAPI

## 🔧 Instalação
1. Clone o repositório
2. Coloque os arquivos no diretório do seu servidor web (ex: xampp/htdocs/pokeapi)
3. Inicie seu servidor web
4. Acesse através do navegador em `http://localhost/pokeapi`

## 💻 Como Usar

### Pesquisar um Pokémon
```javascript
// Digite o nome ou número do Pokémon no campo de busca
buscarPokemonCompleto('pikachu'); // ou buscarPokemonCompleto(25);
```

### Pokémon Aleatório
```javascript
// Clique no botão aleatório ou chame
buscarPokemonAleatorio();
```

### Jogar "Quem é esse Pokémon?"
```javascript
// Iniciar o jogo
carregarPokemonOculto();
// Enviar sua resposta
verificarResposta();
```

## 🎮 Funções Principais

### `buscarPokemonCompleto(valor)`
- Busca informações completas de um Pokémon
- Parâmetros: nome ou número do Pokémon

### `buscarPokemonAleatorio()`
- Seleciona e exibe um Pokémon aleatório

### `salvarPokemon(id)`
- Salva um Pokémon na lista de favoritos
- Utiliza sessionStorage para persistência

### `carregarPokemonOculto()`
- Inicia o mini-game com um Pokémon aleatório oculto

## 🌐 Referência da API
Este projeto utiliza a [PokéAPI](https://pokeapi.co/) para obter dados dos Pokémon.

## 📝 Observações
- Total de Pokémon disponíveis: 1025
- Suporte a todas as gerações
- Alguns Pokémon possuem variantes shiny (IDs 7, 8, 9)

## 🤝 Contribuição
Sinta-se à vontade para enviar issues e sugestões de melhorias.

## 📜 Licença
Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).