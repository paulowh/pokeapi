// Sistema de Filtros Avançados para Pokédx
class PokemonFilters {
    constructor() {
        this.filtros = {
            tipos: [],
            fraquezas: [],
            habilidade: '',
            altura: '',
            peso: '',
            numeroMin: 1,
            numeroMax: 1025,
            ordenacao: 'id'
        };
        
        this.pokemonCache = [];
        this.resultadosFiltrados = [];
        this.paginaAtual = 1;
        this.pokemonsPorPagina = 24;
        
        this.initEventListeners();
        this.carregarPokemons();
    }

    initEventListeners() {
        // Filtros de tipo e fraqueza
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTipoFiltro(btn);
            });
        });

        // Filtros de altura
        document.querySelectorAll('.altura-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleAlturaFiltro(btn);
            });
        });

        // Filtros de peso
        document.querySelectorAll('.peso-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePesoFiltro(btn);
            });
        });

        // Ordenação
        document.getElementById('ordenacao').addEventListener('change', (e) => {
            this.filtros.ordenacao = e.target.value;
            this.aplicarFiltros();
        });

        // Habilidade
        document.getElementById('habilidade').addEventListener('change', (e) => {
            this.filtros.habilidade = e.target.value;
        });

        // Números
        document.getElementById('numeroMin').addEventListener('change', (e) => {
            this.filtros.numeroMin = parseInt(e.target.value) || 1;
        });

        document.getElementById('numeroMax').addEventListener('change', (e) => {
            this.filtros.numeroMax = parseInt(e.target.value) || 1025;
        });
    }

    toggleTipoFiltro(btn) {
        const filter = btn.dataset.filter;
        const value = btn.dataset.value;
        
        btn.classList.toggle('active');
        
        if (filter === 'type') {
            if (btn.classList.contains('active')) {
                if (!this.filtros.tipos.includes(value)) {
                    this.filtros.tipos.push(value);
                }
            } else {
                this.filtros.tipos = this.filtros.tipos.filter(t => t !== value);
            }
        } else if (filter === 'weakness') {
            if (btn.classList.contains('active')) {
                if (!this.filtros.fraquezas.includes(value)) {
                    this.filtros.fraquezas.push(value);
                }
            } else {
                this.filtros.fraquezas = this.filtros.fraquezas.filter(f => f !== value);
            }
        }
    }

    toggleAlturaFiltro(btn) {
        // Remove active de outros botões de altura
        document.querySelectorAll('.altura-btn').forEach(b => b.classList.remove('active'));
        
        if (this.filtros.altura === btn.dataset.value) {
            this.filtros.altura = '';
        } else {
            btn.classList.add('active');
            this.filtros.altura = btn.dataset.value;
        }
    }

    togglePesoFiltro(btn) {
        // Remove active de outros botões de peso
        document.querySelectorAll('.peso-btn').forEach(b => b.classList.remove('active'));
        
        if (this.filtros.peso === btn.dataset.value) {
            this.filtros.peso = '';
        } else {
            btn.classList.add('active');
            this.filtros.peso = btn.dataset.value;
        }
    }

    async carregarPokemons() {
        this.mostrarLoading(true);
        
        try {
            // Carregar todos os Pokémons (ou uma quantidade significativa)
            const promises = [];
            for (let i = 1; i <= 151; i++) { // Começar com a primeira geração
                promises.push(this.buscarPokemon(i));
            }
            
            this.pokemonCache = await Promise.all(promises);
            this.pokemonCache = this.pokemonCache.filter(p => p !== null);
            
            this.aplicarFiltros();
        } catch (error) {
            console.error('Erro ao carregar Pokémons:', error);
            this.mostrarErro();
        } finally {
            this.mostrarLoading(false);
        }
    }

    async buscarPokemon(id) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) return null;
            
            const pokemon = await response.json();
            
            // Buscar dados da espécie para fraquezas
            const speciesResponse = await fetch(pokemon.species.url);
            const speciesData = await speciesResponse.json();
            
            return {
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types.map(t => t.type.name),
                abilities: pokemon.abilities.map(a => a.ability.name),
                height: pokemon.height,
                weight: pokemon.weight,
                sprites: pokemon.sprites,
                stats: pokemon.stats,
                species: speciesData
            };
        } catch (error) {
            console.error(`Erro ao buscar Pokémon ${id}:`, error);
            return null;
        }
    }

    calcularFraquezas(types) {
        // Tabela de efetividade: tipo atacante => [tipos que recebem super effective (2x)]
        const effectiveness = {
            'normal': [],
            'fire': ['grass', 'ice', 'bug', 'steel'],
            'water': ['fire', 'ground', 'rock'],
            'electric': ['water', 'flying'],
            'grass': ['water', 'ground', 'rock'],
            'ice': ['grass', 'ground', 'flying', 'dragon'],
            'fighting': ['normal', 'ice', 'rock', 'dark', 'steel'],
            'poison': ['grass', 'fairy'],
            'ground': ['fire', 'electric', 'poison', 'rock', 'steel'],
            'flying': ['grass', 'fighting', 'bug'],
            'psychic': ['fighting', 'poison'],
            'bug': ['grass', 'psychic', 'dark'],
            'rock': ['fire', 'ice', 'flying', 'bug'],
            'ghost': ['psychic', 'ghost'],
            'dragon': ['dragon'],
            'dark': ['psychic', 'ghost'],
            'steel': ['ice', 'rock', 'fairy'],
            'fairy': ['fighting', 'dragon', 'dark']
        };
        
        // Tabela de resistências: tipo defensor => [tipos que causam não muito efetivo (0.5x)]
        const resistances = {
            'normal': [],
            'fire': ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
            'water': ['fire', 'water', 'ice', 'steel'],
            'electric': ['electric', 'flying', 'steel'],
            'grass': ['water', 'electric', 'grass', 'ground'],
            'ice': ['ice'],
            'fighting': ['bug', 'rock', 'dark'],
            'poison': ['grass', 'fighting', 'poison', 'bug', 'fairy'],
            'ground': ['poison', 'rock'],
            'flying': ['grass', 'fighting', 'bug'],
            'psychic': ['fighting', 'psychic'],
            'bug': ['grass', 'fighting', 'ground'],
            'rock': ['normal', 'fire', 'poison', 'flying'],
            'ghost': ['poison', 'bug'],
            'dragon': ['fire', 'water', 'electric', 'grass'],
            'dark': ['ghost', 'dark'],
            'steel': ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
            'fairy': ['fighting', 'bug', 'dark']
        };
        
        // Imunidades: tipo defensor => [tipos que não causam dano (0x)]
        const immunities = {
            'normal': ['ghost'],
            'fire': [],
            'water': [],
            'electric': ['ground'],
            'grass': [],
            'ice': [],
            'fighting': ['ghost'],
            'poison': [],
            'ground': ['electric'],
            'flying': ['ground'],
            'psychic': ['dark'],
            'bug': [],
            'rock': [],
            'ghost': ['normal', 'fighting'],
            'dragon': [],
            'dark': ['psychic'],
            'steel': ['poison'],
            'fairy': ['dragon']
        };
        
        // Calcular multiplicadores para cada tipo atacante
        const typeMultipliers = {};
        
        for (const attackerType of Object.keys(effectiveness)) {
            let multiplier = 1.0;
            
            for (const defenderType of types) {
                // Verificar imunidade
                if (immunities[defenderType] && immunities[defenderType].includes(attackerType)) {
                    multiplier = 0;
                    break;
                }
                
                // Verificar super efetivo
                if (effectiveness[attackerType] && effectiveness[attackerType].includes(defenderType)) {
                    multiplier *= 2;
                }
                
                // Verificar resistência
                if (resistances[defenderType] && resistances[defenderType].includes(attackerType)) {
                    multiplier *= 0.5;
                }
            }
            
            typeMultipliers[attackerType] = multiplier;
        }
        
        // Filtrar apenas tipos super efetivos (2x ou mais)
        const fraquezas = [];
        for (const [type, multiplier] of Object.entries(typeMultipliers)) {
            if (multiplier >= 2) {
                fraquezas.push(type);
            }
        }
        
        return fraquezas;
    }

    aplicarFiltros() {
        this.resultadosFiltrados = this.pokemonCache.filter(pokemon => {
            // Filtro por tipo
            if (this.filtros.tipos.length > 0) {
                const temTipo = this.filtros.tipos.some(tipo => 
                    pokemon.types.includes(tipo)
                );
                if (!temTipo) return false;
            }

            // Filtro por fraqueza
            if (this.filtros.fraquezas.length > 0) {
                const fraquezasPokemon = this.calcularFraquezas(pokemon.types);
                const temFraqueza = this.filtros.fraquezas.some(fraqueza => 
                    fraquezasPokemon.includes(fraqueza)
                );
                if (!temFraqueza) return false;
            }

            // Filtro por habilidade
            if (this.filtros.habilidade) {
                const temHabilidade = pokemon.abilities.includes(this.filtros.habilidade);
                if (!temHabilidade) return false;
            }

            // Filtro por altura
            if (this.filtros.altura) {
                const altura = pokemon.height / 10; // Converter para metros
                let passaFiltro = false;
                
                switch (this.filtros.altura) {
                    case 'short':
                        passaFiltro = altura < 1.0;
                        break;
                    case 'medium':
                        passaFiltro = altura >= 1.0 && altura < 2.0;
                        break;
                    case 'tall':
                        passaFiltro = altura >= 2.0;
                        break;
                }
                
                if (!passaFiltro) return false;
            }

            // Filtro por peso
            if (this.filtros.peso) {
                const peso = pokemon.weight / 10; // Converter para kg
                let passaFiltro = false;
                
                switch (this.filtros.peso) {
                    case 'light':
                        passaFiltro = peso < 50;
                        break;
                    case 'medium':
                        passaFiltro = peso >= 50 && peso < 100;
                        break;
                    case 'heavy':
                        passaFiltro = peso >= 100;
                        break;
                }
                
                if (!passaFiltro) return false;
            }

            // Filtro por número
            if (pokemon.id < this.filtros.numeroMin || pokemon.id > this.filtros.numeroMax) {
                return false;
            }

            return true;
        });

        // Aplicar ordenação
        this.ordenarResultados();
        
        // Exibir resultados
        this.exibirResultados();
    }

    ordenarResultados() {
        switch (this.filtros.ordenacao) {
            case 'id':
                this.resultadosFiltrados.sort((a, b) => a.id - b.id);
                break;
            case 'id-desc':
                this.resultadosFiltrados.sort((a, b) => b.id - a.id);
                break;
            case 'name':
                this.resultadosFiltrados.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                this.resultadosFiltrados.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'height':
                this.resultadosFiltrados.sort((a, b) => a.height - b.height);
                break;
            case 'height-desc':
                this.resultadosFiltrados.sort((a, b) => b.height - a.height);
                break;
            case 'weight':
                this.resultadosFiltrados.sort((a, b) => a.weight - b.weight);
                break;
            case 'weight-desc':
                this.resultadosFiltrados.sort((a, b) => b.weight - a.weight);
                break;
        }
    }

    exibirResultados() {
        const grid = document.getElementById('pokemon-grid');
        const noResults = document.getElementById('no-results');
        
        if (this.resultadosFiltrados.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('d-none');
            return;
        }
        
        noResults.classList.add('d-none');
        
        // Paginação
        const inicio = (this.paginaAtual - 1) * this.pokemonsPorPagina;
        const fim = inicio + this.pokemonsPorPagina;
        const pokemonsPagina = this.resultadosFiltrados.slice(inicio, fim);
        
        grid.innerHTML = pokemonsPagina.map(pokemon => this.criarCardPokemon(pokemon)).join('');
    }

    criarCardPokemon(pokemon) {
        const tipos = pokemon.types.map(tipo => 
            `<span class="badge type-${tipo} me-1">${this.traduzirTipo(tipo)}</span>`
        ).join('');
        
        return `
            <div class="col-lg-3 col-md-4 col-sm-6">
                <div class="card pokemon-card h-100 shadow-sm" onclick="window.location.href='pokemon-detalhes?id=${pokemon.id}'">
                    <div class="card-body text-center">
                        <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
                             alt="${pokemon.name}" class="img-fluid mb-3" style="height: 120px;">
                        <h6 class="card-title text-capitalize">${pokemon.name}</h6>
                        <small class="text-muted">#${pokemon.id.toString().padStart(3, '0')}</small>
                        <div class="mt-2">${tipos}</div>
                    </div>
                </div>
            </div>
        `;
    }

    traduzirTipo(tipo) {
        const traducoes = {
            'normal': 'Normal',
            'fire': 'Fogo',
            'water': 'Água',
            'electric': 'Elétrico',
            'grass': 'Grama',
            'ice': 'Gelo',
            'fighting': 'Lutador',
            'poison': 'Veneno',
            'ground': 'Terra',
            'flying': 'Voador',
            'psychic': 'Psíquico',
            'bug': 'Inseto',
            'rock': 'Pedra',
            'ghost': 'Fantasma',
            'dragon': 'Dragão',
            'dark': 'Sombrio',
            'steel': 'Aço',
            'fairy': 'Fada'
        };
        
        return traducoes[tipo] || tipo;
    }

    mostrarLoading(mostrar) {
        const loading = document.getElementById('loading');
        if (mostrar) {
            loading.classList.remove('d-none');
        } else {
            loading.classList.add('d-none');
        }
    }

    mostrarErro() {
        const grid = document.getElementById('pokemon-grid');
        grid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="bi bi-exclamation-triangle display-1 text-warning"></i>
                <h4 class="text-muted mt-3">Erro ao carregar Pokémons</h4>
                <p class="text-muted">Verifique sua conexão e tente novamente.</p>
                <button class="btn btn-primary" onclick="location.reload()">Tentar Novamente</button>
            </div>
        `;
    }
}

// Funções globais
function aplicarFiltros() {
    if (window.pokemonFilters) {
        window.pokemonFilters.aplicarFiltros();
    }
}

function resetarFiltros() {
    // Reset visual
    document.querySelectorAll('.type-btn.active').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.altura-btn.active').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.peso-btn.active').forEach(btn => btn.classList.remove('active'));
    
    // Reset values
    document.getElementById('ordenacao').value = 'id';
    document.getElementById('habilidade').value = '';
    document.getElementById('numeroMin').value = '';
    document.getElementById('numeroMax').value = '';
    
    // Reset filtros object
    if (window.pokemonFilters) {
        window.pokemonFilters.filtros = {
            tipos: [],
            fraquezas: [],
            habilidade: '',
            altura: '',
            peso: '',
            numeroMin: 1,
            numeroMax: 1025,
            ordenacao: 'id'
        };
        
        window.pokemonFilters.aplicarFiltros();
    }
}

function surprenderMe() {
    // Gerar Pokémon aleatório
    if (window.pokemonFilters && window.pokemonFilters.pokemonCache.length > 0) {
        const randomIndex = Math.floor(Math.random() * window.pokemonFilters.pokemonCache.length);
        const randomPokemon = window.pokemonFilters.pokemonCache[randomIndex];
        window.location.href = `pokemon-detalhes?id=${randomPokemon.id}`;
    }
}

function setOrdenacao(ordenacao) {
    document.getElementById('ordenacao').value = ordenacao;
    if (window.pokemonFilters) {
        window.pokemonFilters.filtros.ordenacao = ordenacao;
        window.pokemonFilters.aplicarFiltros();
    }
}

function toggleFiltros() {
    const panel = document.querySelector('.filters-panel');
    const btn = event.target;
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="bi bi-chevron-up"></i> Esconder busca avançada';
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="bi bi-chevron-down"></i> Mostrar busca avançada';
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    window.pokemonFilters = new PokemonFilters();
});
