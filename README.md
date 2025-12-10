# 🔴 Pokédex Web App

Uma aplicação web moderna e responsiva para explorar o universo Pokémon, desenvolvida com **React** e alimentada pela **PokéAPI**. Descubra pokémons, salve seus favoritos, visualize detalhes completos e teste seus conhecimentos com nosso mini-game!

## ✨ Recursos Principais

### 📚 Pokédex Completa
- Browse de todas as 9 gerações de pokémons (1025 pokémons no total)
- Interface intuitiva com cards informativos
- Filtro por geração
- Busca de pokémons em tempo real

### 🔖 Sistema de Favoritos
- Salve seus pokémons favoritos com um clique
- Gerencie sua coleção na página "Meus Pokémon"
- Dados persistidos no localStorage
- Sincronização automática entre páginas

### 📖 Detalhes do Pokémon
- Visualização completa de informações
- Estatísticas (HP, Ataque, Defesa, etc.)
- Tipos e efetividades
- Cadeia evolutiva com imagens
- Descrição e dados da espécie
- Navegação entre pokémons consecutivos

### 🎮 Mini-Game Interativo
- "Quem é esse Pokémon?" - adivinhe baseado na imagem
- Sistema de pontuação
- Contador de erros
- Dica com revelação automática

### 💾 Armazenamento Offline
- Progressive Web App (PWA)
- Funciona sem internet após primeira visita
- Instalável como app nativo
- Sincronização automática de dados

### 📱 Design Responsivo
- Interface mobile-first
- Compatível com todos os dispositivos
- Bootstrap 5 para estilização
- Animações suaves e fluidas

## 🛠️ Stack Tecnológico

```json
{
  "frontend": {
    "React": "18.3.1",
    "React Router": "6.22.0",
    "Axios": "1.6.7",
    "Bootstrap": "5.x"
  },
  "build": {
    "Vite": "5.4.11",
    "@vitejs/plugin-react": "4.3.4"
  },
  "pwa": {
    "vite-plugin-pwa": "0.20.5"
  },
  "api": {
    "PokéAPI": "https://pokeapi.co/api/v2"
  }
}
```

## 📁 Estrutura do Projeto

```
pokeapi-react/
├── public/
│   ├── img/
│   │   ├── icons/           # Ícones de tipos
│   │   └── pokeball.png     # Logo
│   └── pdf/                 # Recursos adicionais
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Barra de navegação
│   │   ├── Header.css
│   │   ├── PokemonCard.jsx  # Card individual
│   │   ├── PokemonCard.css
│   │   ├── Loading.jsx      # Spinner
│   │   └── Loading.css
│   ├── pages/
│   │   ├── Home.jsx         # Lista de pokémons
│   │   ├── Home.css
│   │   ├── PokemonDetalhes.jsx      # Detalhes completos
│   │   ├── PokemonDetalhes.css
│   │   ├── MeusPokemon.jsx  # Favoritos
│   │   ├── MeusPokemon.css
│   │   ├── MiniGame.jsx     # Jogo
│   │   └── MiniGame.css
│   ├── services/
│   │   ├── pokeapi.js       # API requests (Axios)
│   │   └── storage.js       # LocalStorage manager
│   ├── utils/
│   │   └── helpers.js       # Funções utilitárias
│   ├── App.jsx              # Router principal
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── index.html
├── manifest.json
└── README.md
```

## 🚀 Getting Started

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/paulowh/pokeapi.git
   cd pokeapi
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   
   A aplicação abrirá automaticamente em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

Isso gera uma pasta `dist/` otimizada para produção.

### Preview do Build

```bash
npm run preview
```

## 📖 Guia de Uso

### 🏠 Página Inicial (Pokédex)
1. Selecione uma geração clicando nos botões
2. Navegue pelos pokémons em grid
3. Clique no card para ver detalhes completos
4. Use o botão de bookmark para salvar favoritos

### 🔍 Busca
1. Digite o nome de um pokémon na barra de busca
2. Pressione Enter ou clique em Procurar
3. Os resultados serão filtrados automaticamente

### 📖 Detalhes do Pokémon
1. Visualize informações completas do pokémon
2. Veja a cadeia evolutiva
3. Navegue para pokémons anteriores/próximos
4. Salve como favorito

### ⭐ Meus Pokémon
1. Acesse via menu dropdown
2. Veja todos os pokémons que você salvou
3. Clique em qualquer um para ver detalhes
4. Use "Limpar Tudo" para remover todos de uma vez

### 🎮 Mini-Game
1. Veja a imagem do pokémon
2. Digite o nome na caixa de entrada
3. Pressione Enter ou clique em "Responder"
4. Ganhe pontos por acertos
5. Use "Revelar" se quiser saber a resposta

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- React Hooks (useState, useEffect)
- React Router para navegação
- Context API pronta para expansão

### API Integration
- Axios para requisições HTTP
- Tratamento de erros robusto
- Cache de dados com localStorage

### Armazenamento Local
- Salvamento de favoritos em localStorage
- Sincronização automática entre abas
- Limpeza de dados quando necessário

### Helpers e Utilitários
- Tradução de tipos de pokémons
- Formatação de IDs e nomes
- Geração de URLs de imagens
- Normalização de dados

## 🌐 Recursos PWA

A aplicação é um Progressive Web App (PWA) completo:
- 📦 Installável em dispositivos móveis
- 🔌 Funciona offline (após primeira visita)
- ⚡ Carregamento rápido com cache
- 🎨 Design responsivo mobile-first

**Para instalar:**
- No navegador, procure por "Instalar aplicativo" ou similar
- Em dispositivos iOS/Android, procure pelo botão de instalação

## 🎨 Personalização

### Alterar Cores Principais
Edite `src/App.css` e `src/components/Header.css` para modificar a paleta de cores.

### Adicionar Novas Gerações
1. Atualize o array de gerações em `src/services/pokeapi.js`
2. Adicione novos botões em `src/pages/Home.jsx`

### Expandir Mini-Game
Edite `src/pages/MiniGame.jsx` para adicionar novos modos de jogo.

## 📊 Estatísticas

- **Total de Pokémons:** 1.025
- **Gerações Suportadas:** 9
- **Componentes React:** 4 principais + 4 páginas
- **Roteamento:** 4 rotas principais
- **API Calls:** Integração completa com PokéAPI

## 🐛 Troubleshooting

### A aplicação não carrega pokémons
- Verifique sua conexão com a internet
- Confirme que a PokéAPI está acessível (https://pokeapi.co)
- Verifique o console do navegador para erros

### Favoritos não são salvos
- Verifique se o localStorage está habilitado
- Limpe cookies/cache e tente novamente
- Verifique o console para mensagens de erro

### PWA não instala
- Use um navegador moderno (Chrome, Edge, Firefox)
- Acesse via HTTPS (ou localhost)
- Tente adicionar manualmente via menu do navegador

## 📝 Componentes Principais

### Header.jsx
Barra de navegação com:
- Logo e marca
- Links de navegação
- Busca de pokémons
- Menu dropdown

### PokemonCard.jsx
Card exibindo:
- ID formatado
- Imagem do pokémon
- Nome
- Tipos com ícones
- Botão de favorito

### PokemonDetalhes.jsx
Página completa com:
- Informações principais
- Estatísticas detalhadas
- Cadeia evolutiva
- Descrição da espécie
- Navegação entre pokémons

### MiniGame.jsx
Jogo interativo com:
- Exibição aleatória de pokémon
- Sistema de pontuação
- Validação de respostas
- Contagem de erros

## 🔐 Segurança

- Sanitização de entrada de usuário
- Proteção contra XSS via React
- Requisições seguras via HTTPS
- Sem armazenamento de dados sensíveis

## 🤝 Contribuindo

Para contribuir com o projeto:

1. Faça um Fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é de código aberto sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

**Paulo Henrique**  
GitHub: [@paulowh](https://github.com/paulowh)

## 🙏 Agradecimentos

- [PokéAPI](https://pokeapi.co/) - API gratuita e aberta
- [React](https://react.dev/) - Biblioteca de UI
- [Vite](https://vitejs.dev/) - Build tool moderno
- [Bootstrap](https://getbootstrap.com/) - Framework CSS
- [Bootstrap Icons](https://icons.getbootstrap.com/) - Ícones

## 📞 Suporte

Se encontrar algum problema:
1. Verifique a seção Troubleshooting
2. Abra uma issue no GitHub
3. Envie um email para suporte

---

**Divirta-se explorando o universo Pokémon! 🎮✨**
