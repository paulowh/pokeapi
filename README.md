# 🎮 Pokédex Web App

Uma aplicação web moderna e completa para explorar o universo Pokémon, com interface responsiva, recursos avançados e suporte PWA.

## ✨ Recursos Principais

### 🔍 Exploração & Busca
- **Pokédex Completa**: Navegação por todas as gerações de Pokémon
- **Busca Inteligente**: Autocomplete com sugestões em tempo real
- **Filtros Avançados**: Por tipo, geração, nome ou número
- **Detalhes Completos**: Stats, tipos, evoluções e habilidades

### 💾 Gestão Pessoal
- **Meus Pokémon**: Sistema de favoritos e coleção pessoal
- **Cache Inteligente**: Dados salvos localmente para acesso rápido
- **Infinite Scroll**: Carregamento dinâmico e otimizado

### 📱 Experiência Móvel
- **Progressive Web App (PWA)**: Instalável no celular/desktop
- **Interface Responsiva**: Bootstrap 5 mobile-first
- **Touch Friendly**: Otimizado para dispositivos touch

### 🎯 Extras Divertidos
- **Mini Game**: "Quem é esse Pokémon?" com sistema de pontuação
- **Detonado Digital**: Guia completo FireRed/LeafGreen em PDF
- **Aleatorização**: Descubra Pokémon aleatórios

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5/CSS3**: Estrutura semântica e responsiva
- **JavaScript ES6+**: Funcionalidades modernas e assíncronas
- **Bootstrap 5**: Framework CSS com componentes prontos
- **Bootstrap Icons**: Iconografia consistente
- **PWA**: Service Workers e Manifest

### Backend
- **PHP 8.0+**: Linguagem server-side
- **Twig**: Template engine poderoso e seguro
- **Composer**: Gerenciamento de dependências

### APIs & Dados
- **PokeAPI**: API oficial completa do universo Pokémon
- **SessionStorage**: Cache local para performance
- **JSON**: Manipulação de dados estruturados

## 🚀 Instalação e Configuração

### Pré-requisitos
- **PHP 8.0+**
- **Composer**
- **Servidor web** (Apache/Nginx/XAMPP)
- **Git**

### Instalação Local

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/pokeapi.git
cd pokeapi
```

2. **Instale as dependências:**
```bash
composer install
```

3. **Acesse a aplicação:**
```
http://localhost/pokeapi
```

### � Acesso Mobile (Rede Local)

Para testar no celular na mesma rede:

1. **Descubra seu IP local:**
```bash
ipconfig  # Windows
ifconfig  # Linux/Mac
```

2. **Acesse no celular:**
```
http://SEU_IP_LOCAL/pokeapi
```

## 📁 Estrutura do Projeto

```
pokeapi/
├── 📄 index.php                 # Página principal (Pokédex)
├── 🔍 search-pokemon.php        # Busca detalhada
├── ❤️ meus-pokemon.php          # Coleção pessoal  
├── 🎮 mini-game.php             # Mini game
├── 📖 detonado.php              # Detonado digital
├── 📱 manifest.json             # PWA configuration
├── 🎨 css/
│   ├── bootstrap.min.css        # Framework CSS
│   └── style.css                # Estilos customizados
├── 💻 js/
│   ├── bootstrap.min.js         # Componentes Bootstrap
│   ├── jquery-3.7.1.min.js      # Biblioteca jQuery
│   └── pokedex.js               # Lógica principal
├── 🖼️ img/                      # Imagens e ícones
├── 📄 template/                 # Templates Twig
│   ├── header.php               # Cabeçalho comum
│   ├── pokemon-card.twig        # Card de Pokémon
│   ├── pokemon-ficha.twig       # Ficha detalhada
│   ├── meu-time-pokemon.twig    # Lista pessoal
│   └── detonado.twig            # Template do guia
├── 📚 vendor/                   # Dependências Composer
└── 🔧 function.php              # Funções auxiliares
```

## 🎯 Recursos Técnicos Avançados

### Performance
- **Lazy Loading**: Imagens carregadas sob demanda
- **Cache Estratégico**: SessionStorage para dados frequentes
- **Infinite Scroll**: Paginação automática otimizada
- **Debounce**: Busca otimizada com delay inteligente

### UX/UI
- **Autocomplete**: Sugestões em tempo real com dropdown
- **Feedback Visual**: Loading states e animações
- **Alertas Contextuais**: Notificações Bootstrap
- **Navegação Intuitiva**: Menu responsivo e breadcrumbs

### Compatibilidade
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive Design**: Desktop, tablet e mobile
- **PWA Standards**: Instalável e offline-ready
- **Acessibilidade**: ARIA labels e navegação por teclado

## � Roadmap Futuro

## 🔄 Roadmap Futuro

### v1.1 - Autenticação & Usuários
- [ ] Sistema de login/registro
- [ ] Perfis personalizados de treinadores
- [ ] Sincronização de dados na nuvem
- [ ] Preferências e configurações

### v1.2 - Social & Compartilhamento  
- [ ] Compartilhamento de coleções
- [ ] Exportação de dados (JSON/CSV)
- [ ] Sistema de conquistas/badges
- [ ] Integração com redes sociais

### v1.3 - Dados Expandidos
- [ ] Informações de localização nos jogos
- [ ] Sistema completo de movimentos
- [ ] Árvore evolutiva interativa
- [ ] Matriz de efetividade de tipos
- [ ] Calculadora de stats/IV

### v1.4 - Funcionalidades Avançadas
- [ ] Modo offline completo
- [ ] Estatísticas detalhadas da coleção
- [ ] Sistema de teams/equipes
- [ ] Comparador de Pokémon
- [ ] Guias de outras gerações

### v1.5+ - Expansões
- [ ] Novos mini-games e desafios
- [ ] Sistema de notificações push
- [ ] Dark mode/temas personalizáveis
- [ ] API própria para desenvolvedores

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. **Abra** um Pull Request

### Diretrizes de Contribuição
- Siga os padrões de código existentes
- Teste suas modificações em diferentes dispositivos
- Documente novas funcionalidades
- Mantenha commits claros e descritivos


## 📞 Suporte

- **Issues**: Use o sistema de issues do GitHub
- **Documentação**: Verifique o README e comentários no código
- **API**: [PokeAPI Documentation](https://pokeapi.co/docs/v2)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.

---

**Desenvolvido com ❤️ para a comunidade Pokémon**

*Gotta Catch 'Em All!* ⚡🎮
