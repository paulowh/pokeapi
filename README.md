# 🔥 Pokédx Web App

Uma aplicação web moderna e interativa para explorar o universo Pokémon, construída com PHP, Twig e integração com a PokéAPI.

## ✨ Características

- 🎯 **Pokédx Completa**: Navegue por todos os Pokémons com informações detalhadas
- 🔍 **Busca Avançada**: Encontre Pokémons por nome, tipo ou número
- 🎛️ **Filtros Avançados**: Sistema completo de filtros por tipo, fraqueza, altura, peso e mais
- ❤️ **Coleção Pessoal**: Salve seus Pokémons favoritos
- 🎮 **Mini Game**: Jogo interativo "Quem é esse Pokémon?"
- 📖 **Detonado Digital**: Guia completo em PDF
- 📱 **PWA Ready**: Instale como aplicativo no seu dispositivo
- 🌐 **URLs Amigáveis**: Navegação sem extensões `.php`
- ⚡ **Interface Responsiva**: Funciona em desktop, tablet e mobile

## 🚀 Tecnologias

- **PHP 8+**: Backend e lógica de negócio
- **Twig 3**: Engine de templates
- **Bootstrap 5**: Framework CSS responsivo
- **jQuery**: Manipulação DOM e AJAX
- **PokéAPI**: API externa para dados dos Pokémons
- **PWA**: Progressive Web App

## 📋 Requisitos

- **PHP 8.0+** com extensões:
  - `curl` (para requisições à PokéAPI)
  - `json` (para processamento de dados)
- **Composer** (gerenciador de dependências)
- **Servidor Web** (Apache/Nginx) com suporte a:
  - `.htaccess` (Apache) ou configuração equivalente
  - `mod_rewrite` habilitado

## 🛠️ Instalação

### 1. Clone o projeto
```bash
git clone https://github.com/paulowh/pokeapi.git
cd pokeapi
```

### 2. Instale as dependências
```bash
composer install
```

### 3. Configure o servidor web
Certifique-se de que o servidor web esteja configurado para:
- Suportar `.htaccess` (Apache)
- Ter `mod_rewrite` habilitado
- Apontar para a pasta do projeto

### 4. Acesse a aplicação
```
http://localhost/pokeapi
```

## 📁 Estrutura do Projeto

```
pokeapi/
├── 📄 index.php                 # Página principal (Pokédx)
├── 🔍 search-pokemon.php        # Busca detalhada de Pokémons
├── 🎛️ filtros-avancados.php     # Sistema de filtros avançados
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
│   │   ├── pokedex.js           # Lógica principal da Pokédx
│   │   ├── pokemon-detalhes.js  # Interações da página de detalhes
│   │   └── filtros-avancados.js # Sistema de filtros avançados
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

### 🔍 Pokédx Principal
- Lista paginada de todos os Pokémons
- Busca rápida por nome ou número
- Cards informativos com imagem e tipos
- Navegação intuitiva

### 🎛️ Filtros Avançados
- **Filtros por Tipo**: Selecione tipos específicos (T)
- **Filtros por Fraqueza**: Encontre Pokémons com fraquezas específicas (F)
- **Filtros por Altura**: Baixo, médio ou alto
- **Filtros por Peso**: Leve, médio ou pesado
- **Filtros por Habilidade**: Dropdown com habilidades disponíveis
- **Intervalo de Números**: Defina uma faixa específica
- **Ordenação Múltipla**: Por número, nome, altura ou peso
- **Busca Instantânea**: Resultados em tempo real

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
