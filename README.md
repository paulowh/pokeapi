# 🔥 Pokédex Web App

Uma aplicação web moderna e interativa para explorar o universo Pokémon, construída com React.js e integração com a PokéAPI.

## ✨ Características

- 🎯 **Pokédex Completa**: Navegue por todos os Pokémons organizados por gerações
- 🔍 **Visualização Detalhada**: Informações completas incluindo estatísticas e evoluções
- ❤️ **Coleção Pessoal**: Salve seus Pokémons favoritos no localStorage
- 🎮 **Mini Game**: Jogo interativo "Quem é esse Pokémon?"
- 📖 **Detonado Digital**: Acesso a guia completo em PDF
- 📱 **PWA Ready**: Instale como aplicativo no seu dispositivo
- ⚡ **Interface Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- 🚀 **SPA**: Single Page Application com navegação fluida

## 🚀 Tecnologias

- **React 18**: Biblioteca JavaScript para interfaces
- **React Router**: Navegação entre páginas
- **Vite**: Build tool moderna e rápida
- **Axios**: Cliente HTTP para requisições à API
- **Bootstrap 5**: Framework CSS responsivo
- **PokéAPI**: API REST para dados dos Pokémons
- **PWA**: Progressive Web App com Vite PWA Plugin

## 📋 Requisitos

- **Node.js 18+** ou superior
- **npm** ou **yarn** (gerenciador de pacotes)

## 🛠️ Instalação

### 1. Clone o projeto
```bash
git clone https://github.com/paulowh/pokeapi.git
cd pokeapi
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto em modo desenvolvimento
```bash
npm run dev
```

### 4. Build para produção
```bash
npm run build
- Ter `mod_rewrite` habilitado
- Apontar para a pasta do projeto

### 4. Acesse a aplicação
```
http://localhost/pokeapi
```

## 📁 Estrutura do Projeto

```
pokeapi/
├── 📄 index.php                 # Página principal (Pokédex)
├── 🔍 search-pokemon.php        # Busca detalhada de Pokémons
├── 📝 pokemon-detalhes.php      # Página de detalhes do Pokémon
├── ❤️ meus-pokemon.php          # Coleção pessoal de Pokémons
├── 🎮 mini-game.php             # Mini game "Quem é esse Pokémon?"
├── 📖 detonado.php              # Detonado digital em PDF
├── 🔧 render.php                # Renderizador de templates AJAX
├── 📱 manifest.json             # Configuração PWA
├── 🎛️ .htaccess                 # Regras de URL amigáveis
├── 📦 composer.json             # Dependências do projeto
│
├── 📂 public/                   # Assets públicos
│   ├── 🎨 css/
│   │   ├── bootstrap.min.css    # Framework CSS
│   │   └── style.css            # Estilos customizados
│   ├── 💻 js/
│   │   ├── pokedex.js           # Lógica principal da Pokédex
│   │   └── pokemon-detalhes.js  # Interações da página de detalhes
│   └── 🖼️ img/
│       ├── icons/               # Ícones dos tipos Pokémon
│       └── pdf/                 # Arquivos PDF
│
├── 📂 src/                      # Código fonte
│   ├── 🔧 core.php              # Configurações e funções principais
│   ├── 📂 controllers/          # Controladores (futuro)
│   └── 📂 templates/            # Templates Twig
│       ├── header.php           # Cabeçalho comum
│       ├── pokemon-card.twig    # Card de Pokémon
│       ├── pokemon-detalhes.twig # Página de detalhes
│       ├── pokemon-ficha.twig   # Ficha resumida
│       ├── meu-time-pokemon.twig # Lista pessoal
│       └── detonado.twig        # Template do detonado
│
└── 📂 vendor/                   # Dependências Composer
    └── twig/                    # Engine de templates
```

## 🎮 Funcionalidades

### 🔍 Pokédex Principal
- Lista paginada de todos os Pokémons
- Busca rápida por nome ou número
- Cards informativos com imagem e tipos
- Navegação intuitiva

### 📝 Detalhes do Pokémon
- Informações completas: stats, tipos, habilidades
- Cadeia evolutiva interativa
- Fraquezas e resistências
- Navegação por teclado (setas, Escape)

### ❤️ Meus Pokémons
- Sistema de favoritos local
- Gerenciamento da coleção pessoal
- Persistência no localStorage

### 🎮 Mini Game
- Jogo "Quem é esse Pokémon?"
- Sistema de pontuação
- Dificuldade progressiva

### 📖 Detonado Digital
- Guia completo em PDF
- Download direto
- Informações estratégicas

## 🔧 Configuração Avançada

### URLs Amigáveis
O projeto utiliza `.htaccess` para URLs sem extensão:
- ✅ `/pokemon-detalhes?id=1` 
- ❌ `/pokemon-detalhes.php?id=1`

### PWA (Progressive Web App)
Configure o `manifest.json` para personalizar:
- Nome da aplicação
- Ícones
- Cores do tema
- Modo de exibição

### API Externa
A aplicação consome a [PokéAPI](https://pokeapi.co/):
- Cache inteligente de requisições
- Tratamento de erros robusto
- Timeout configurável

## 🐛 Solução de Problemas

### Erro 500 - Internal Server Error
- Verifique se `mod_rewrite` está habilitado
- Confirme as permissões do arquivo `.htaccess`

### Imagens não carregam
- Verifique a conexão com a internet
- Confirme se o `curl` está habilitado no PHP

### Templates não encontrados
- Execute `composer install`
- Verifique as permissões da pasta `vendor/`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links Úteis

- [PokéAPI Documentation](https://pokeapi.co/docs/v2)
- [Twig Documentation](https://twig.symfony.com/doc/3.x/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)

---

**Desenvolvido com ❤️ por [Paulo](https://github.com/paulowh)**
