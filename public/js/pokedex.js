// ==== Constantes ====
const TOTALPOKEMON = 1025;
const GERACOES = {
    1: { inicio: 1, fim: 151 },
    2: { inicio: 152, fim: 251 },
    3: { inicio: 252, fim: 386 },
    4: { inicio: 387, fim: 493 },
    5: { inicio: 494, fim: 649 },
    6: { inicio: 650, fim: 721 },
    7: { inicio: 722, fim: 809 },
    8: { inicio: 810, fim: 905 },
    9: { inicio: 906, fim: 1025 }
};

let pokemonAtual = '';

// ==== Funções utilitárias ====
const getIcon = type => `/pokeapi/public/img/icons/${type}.svg`;
const imgArtwork = (id, shiny = false) => shiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

const fetchPokemon = id => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json());
};

function mostrarAlerta(mensagem, tipo = 'info') {
    const alertContainer = document.getElementById('alert-container');
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.innerHTML = `
        ${mensagem}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
    `;

    alertContainer.appendChild(alerta);
    setTimeout(() => {
        alerta.classList.remove('show');
        alerta.classList.add('hide');
        setTimeout(() => alerta.remove(), 300);
    }, 2000);
}

function salvarPokemon(id) {
    const lista = sessionStorage.getItem('pokemonsSalvos');
    const pokemons = lista ? JSON.parse(lista) : [];
    const btn = event.currentTarget;
    const icon = btn.querySelector('i');

    if (!pokemons.includes(id)) {
        pokemons.push(id);
        sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
        
        // Atualiza visual do botão
        btn.classList.add('salvo');
        icon.classList.replace('bi-bookmark', 'bi-bookmark-fill');
        btn.setAttribute('onclick', `removerPokemon(${id})`);
        
        mostrarAlerta('Pokémon salvo com sucesso!', 'success');
    } else {
        mostrarAlerta(`Pokémon #${id} já está salvo.`, 'info');
    }

    // Após salvar com sucesso
    const btnSalvar = event.currentTarget;
    btnSalvar.classList.add('salvo');
}

function removerPokemon(id) {
    const lista = sessionStorage.getItem('pokemonsSalvos');
    if (!lista) return;

    const btn = event.currentTarget;
    const icon = btn.querySelector('i');
    const pokemons = JSON.parse(lista).filter(pokemonId => pokemonId !== id);
    
    sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
    
    // Atualiza visual do botão
    btn.classList.remove('salvo');
    icon.classList.replace('bi-bookmark-fill', 'bi-bookmark');
    btn.setAttribute('onclick', `salvarPokemon(${id})`);
    
    mostrarAlerta('Pokémon removido dos salvos!', 'info');
}

function limparPokemon() {
    sessionStorage.removeItem('pokemonsSalvos');
}

function buscarPokemonCompleto(valor = null) {
    // Oculta sugestões quando pesquisa é executada
    ocultarSugestoes();
    
    const entrada = valor || document.getElementById('entrada').value.trim().toLowerCase();
    const resultado = document.getElementById('resultado');

    if (!entrada) {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite algo para buscar.</div>';
        return;
    }

    const numero = Number(entrada);
    if (!isNaN(numero) && numero < 1) {
        resultado.innerHTML = '<div class="alert alert-warning text-center">Digite um número válido maior que 1.</div>';
        return;
    }

    fetchPokemon(entrada)
        .then(pokemon => {
            if (!pokemon) {
                resultado.innerHTML = '<div class="alert alert-danger text-center">Pokémon não encontrado ou inválido.</div>';
                return;
            }

            const data = {
                id: pokemon.id,
                nome: pokemon.name,
                tipos: pokemon.types.map(t => t.type.name),
                habilidades: pokemon.abilities.map(h => h.ability.name),
                stats: pokemon.stats.map(s => ({
                    nome: s.stat.name,
                    valor: s.base_stat
                })),
                altura: (pokemon.height / 10).toFixed(1),
                peso: (pokemon.weight / 10).toFixed(1),
                shiny: [7, 8, 9].includes(pokemon.id),
            };

            fetch('./render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template: '/pokemon-ficha',
                    data: data
                })
            })
                .then(response => response.text())
                .then(html => {
                    resultado.innerHTML = html;
                })
                .catch(() => {
                    resultado.innerHTML = '<div class="alert alert-danger text-center">Erro ao carregar os dados do Pokémon.</div>';
                });
        })
        .catch(() => {
            resultado.innerHTML = '<div class="alert alert-danger text-center">Erro ao buscar o Pokémon.</div>';
        });
}

function buscarPokemonAleatorio() {
    const numero = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    buscarPokemonCompleto(numero);
}

function carregarPokemonOculto() {
    const id = Math.floor(Math.random() * TOTALPOKEMON) + 1;
    fetchPokemon(id).then(data => {
        pokemonAtual = data.name.toLowerCase();
        document.getElementById('container-pokemon').innerHTML =
            `<img src="${imgArtwork(data.id)}" alt="Quem é esse Pokémon?" id="pokemon-imagem" class="oculto">`;
        document.getElementById('resposta').value = '';
    });
}

function verificarResposta() {
    const resposta = document.getElementById('resposta').value.trim().toLowerCase();
    const imagem = document.getElementById('pokemon-imagem');

    if (resposta === pokemonAtual) {
        imagem.classList.remove('oculto');
        mostrarAlerta('Acertou! miserável', 'success');
    } else {
        mostrarAlerta('Errouuu !!!', 'danger');
    }
}

async function carregarMeusPokemon() {
    const container = document.getElementById('lista-pokemons');
    const salvos = sessionStorage.getItem('pokemonsSalvos');

    if (!salvos || JSON.parse(salvos).length === 0) {
        container.innerHTML = '<div class="alert alert-info text-center">Nenhum Pokémon salvo ainda.</div>';
        return;
    }

    container.innerHTML = ''; // Limpa o container
    const ids = JSON.parse(salvos);

    for (const id of ids) {
        try {
            const pokemon = await fetchPokemon(id);
            const types = pokemon.types.map(t => ({
                nome: t.type.name,
                icon: getIcon(t.type.name)
            }));
            const habilidades = pokemon.abilities.map(a => a.ability.name).join(', ');

            const response = await fetch('./render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template: 'pokemon-card',
                    data: {
                        id: pokemon.id,
                        nome: pokemon.name,
                        img: imgArtwork(pokemon.id),
                        types: types,
                        habilidades: habilidades,
                        meusPokemon: true
                    }
                })
            });

            const html = await response.text();
            const div = document.createElement('div');
            div.innerHTML = html;
            container.appendChild(div.firstChild);

        } catch (erro) {
            console.error(`Erro ao buscar Pokémon com ID ${id}:`, erro);
            mostrarAlerta(`Erro ao carregar Pokémon #${id}`, 'danger');
        }
    }
}

let isLoading = false;
let currentGen = 1;
let currentIndex = 0;
const POKEMON_PER_PAGE = 20;

async function loadPokemon(gen = null) {
    // Se uma geração foi especificada, reinicia o estado
    if (gen !== null) {
        currentGen = gen;
        currentIndex = GERACOES[gen].inicio;
        const pokedex = document.getElementById('pokedex');
        pokedex.innerHTML = '';
    }

    // Evita múltiplas requisições simultâneas
    if (isLoading) return;
    isLoading = true;

    // Mostra indicador de carregamento
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) loadingIndicator.classList.remove('d-none');

    const pokedex = document.getElementById('pokedex');
    const endIndex = Math.min(currentIndex + POKEMON_PER_PAGE, GERACOES[currentGen].fim);
    
    // Obtém lista de pokémons salvos
    const salvos = sessionStorage.getItem('pokemonsSalvos');
    const pokemonsSalvos = salvos ? JSON.parse(salvos) : [];

    try {
        for (let i = currentIndex; i <= endIndex; i++) {
            const pokemon = await fetchPokemon(i);
            const types = pokemon.types.map(t => ({
                nome: t.type.name,
                icon: getIcon(t.type.name)
            }));

            const response = await fetch('./render', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template: 'pokemon-card',
                    data: {
                        id: pokemon.id,
                        nome: pokemon.name,
                        types: types,
                        img: imgArtwork(pokemon.id),
                        meusPokemon: pokemonsSalvos.includes(pokemon.id) // Verifica se está salvo
                    }
                })
            });

            const html = await response.text();
            const div = document.createElement('div');
            div.innerHTML = html;
            pokedex.appendChild(div.firstChild);
        }

        // Atualiza o índice atual
        currentIndex = endIndex + 1;

        // Verifica se chegou ao fim da geração atual
        if (currentIndex > GERACOES[currentGen].fim) {
            document.removeEventListener('scroll', scrollHandler);
            mostrarAlerta('Você chegou ao fim desta geração!', 'info');
        }

    } catch (error) {
        console.error(`Erro ao renderizar Pokémon:`, error);
        mostrarAlerta('Erro ao carregar Pokémon', 'danger');
    } finally {
        isLoading = false;
        if (loadingIndicator) loadingIndicator.classList.add('d-none');
    }
}

// Função para verificar o scroll com debounce
let scrollTimeout;
function scrollHandler() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPosition = window.innerHeight + window.scrollY;
        const docHeight = document.documentElement.scrollHeight;

        // Carrega mais pokémon quando estiver próximo do fim da página
        if (scrollPosition >= docHeight - 800) {
            // Só carrega se não estiver no fim da geração
            if (currentIndex <= GERACOES[currentGen].fim) {
                loadPokemon();
            }
        }
    }, 100);
}

// ==== Função para pesquisa no header ====
function pesquisarHeader(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Captura o valor do campo de pesquisa (desktop ou mobile)
    const pesquisaDesktop = document.getElementById('pesquisa-desktop');
    const pesquisaMobile = document.getElementById('pesquisa-mobile');
    
    let termoPesquisa = '';
    if (pesquisaDesktop && pesquisaDesktop.value.trim()) {
        termoPesquisa = pesquisaDesktop.value.trim();
    } else if (pesquisaMobile && pesquisaMobile.value.trim()) {
        termoPesquisa = pesquisaMobile.value.trim();
    }
    
    if (termoPesquisa) {
        // Redireciona para a página de pesquisa com o parâmetro
        window.location.href = `./search-pokemon?q=${encodeURIComponent(termoPesquisa)}`;
    }
}

// ==== Funções para Autocompletar ====
let timeoutSugestoes = null;
let sugestoesCache = new Map();
let indiceSugestaoSelecionada = -1;
let sugestoesAtuais = [];

async function buscarSugestoes(input) {
    const termo = input.value.trim().toLowerCase();
    const sugestoesContainer = input.parentElement.querySelector('.autocomplete-suggestions');
    
    // Limpa o timeout anterior
    if (timeoutSugestoes) {
        clearTimeout(timeoutSugestoes);
    }
    
    // Se o termo for muito curto, oculta as sugestões
    if (termo.length < 2) {
        ocultarSugestoes();
        return;
    }
    
    // Debounce de 300ms
    timeoutSugestoes = setTimeout(async () => {
        try {
            // Verifica se já temos no cache
            if (sugestoesCache.has(termo)) {
                exibirSugestoes(sugestoesCache.get(termo), sugestoesContainer);
                return;
            }
            
            // Mostra indicador de carregamento
            sugestoesContainer.innerHTML = '<div class="autocomplete-loading">Buscando...</div>';
            posicionarDropdown(sugestoesContainer);
            sugestoesContainer.style.display = 'block';
            
            // Busca sugestões da API
            const sugestoes = await obterSugestoesPokemon(termo);
            
            // Armazena no cache
            sugestoesCache.set(termo, sugestoes);
            
            // Exibe as sugestões
            exibirSugestoes(sugestoes, sugestoesContainer);
            
        } catch (error) {
            console.error('Erro ao buscar sugestões:', error);
            sugestoesContainer.innerHTML = '<div class="autocomplete-loading">Erro ao buscar sugestões</div>';
        }
    }, 300);
}

async function obterSugestoesPokemon(termo) {
    // Primeiro, tenta buscar diretamente pelo nome/ID
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${termo}`);
        if (response.ok) {
            const pokemon = await response.json();
            return [{
                id: pokemon.id,
                name: pokemon.name
            }];
        }
    } catch (error) {
        // Se não encontrar, busca na lista geral
    }
    
    // Busca na lista de todos os Pokémon (limitando a busca para performance)
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
        const data = await response.json();
        
        // Filtra pokémon que começam com o termo ou contêm o termo
        const sugestoesFiltradas = data.results
            .filter(pokemon => {
                const name = pokemon.name.toLowerCase();
                return name.startsWith(termo) || name.includes(termo);
            })
            .slice(0, 8); // Limita a 8 sugestões
        
        // Extrai o ID da URL e retorna dados simples
        const sugestoesDetalhadas = sugestoesFiltradas.map(pokemon => {
            // Extrai ID da URL: https://pokeapi.co/api/v2/pokemon/25/
            const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0]);
            return {
                id: id,
                name: pokemon.name
            };
        });
        
        return sugestoesDetalhadas;
        
    } catch (error) {
        console.error('Erro ao buscar lista de Pokémon:', error);
        return [];
    }
}

function exibirSugestoes(sugestoes, container) {
    sugestoesAtuais = sugestoes;
    indiceSugestaoSelecionada = -1;
    
    if (sugestoes.length === 0) {
        container.innerHTML = '<div class="autocomplete-loading">Nenhum Pokémon encontrado</div>';
        posicionarDropdown(container);
        container.style.display = 'block';
        return;
    }
    
    const html = sugestoes.map((pokemon, index) => `
        <div class="autocomplete-suggestion" data-index="${index}" onclick="selecionarSugestao('${pokemon.name}')">
            <div class="autocomplete-suggestion-name">${pokemon.name}</div>
            <div class="autocomplete-suggestion-id">#${pokemon.id.toString().padStart(3, '0')}</div>
        </div>
    `).join('');
    
    container.innerHTML = html;
    posicionarDropdown(container);
    container.style.display = 'block';
}

function posicionarDropdown(container) {
    // Com position: absolute e top: 100%, o dropdown se posiciona 
    // automaticamente abaixo do input e acompanha o scroll
    container.style.display = 'block';
}

function selecionarSugestao(nomePokemon) {
    // Identifica qual campo está ativo
    const pesquisaDesktop = document.getElementById('pesquisa-desktop');
    const pesquisaMobile = document.getElementById('pesquisa-mobile');
    const entradaPesquisa = document.getElementById('entrada');
    
    let campoAtivo = null;
    
    // Verifica qual container de sugestões está visível
    if (pesquisaDesktop && pesquisaDesktop.parentElement.querySelector('.autocomplete-suggestions').style.display === 'block') {
        campoAtivo = pesquisaDesktop;
    } else if (pesquisaMobile && pesquisaMobile.parentElement.querySelector('.autocomplete-suggestions').style.display === 'block') {
        campoAtivo = pesquisaMobile;
    } else if (entradaPesquisa && entradaPesquisa.parentElement.querySelector('.autocomplete-suggestions').style.display === 'block') {
        campoAtivo = entradaPesquisa;
    }
    
    if (campoAtivo) {
        campoAtivo.value = nomePokemon;
    }
    
    // Oculta as sugestões imediatamente
    ocultarSugestoesImediato();
    
    // Se estiver na página de pesquisa, executa a busca diretamente
    if (entradaPesquisa && campoAtivo === entradaPesquisa) {
        buscarPokemonCompleto(nomePokemon);
    } else {
        // Se estiver no header, redireciona para a página de pesquisa
        window.location.href = `./search-pokemon?q=${encodeURIComponent(nomePokemon)}`;
    }
}

function navegarSugestoes(event) {
    const sugestoesContainer = event.target.parentElement.querySelector('.autocomplete-suggestions');
    
    if (sugestoesContainer.style.display !== 'block' || sugestoesAtuais.length === 0) {
        return;
    }
    
    const sugestoes = sugestoesContainer.querySelectorAll('.autocomplete-suggestion');
    
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            indiceSugestaoSelecionada = (indiceSugestaoSelecionada + 1) % sugestoes.length;
            atualizarSelecaoVisual(sugestoes);
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            indiceSugestaoSelecionada = indiceSugestaoSelecionada <= 0 ? sugestoes.length - 1 : indiceSugestaoSelecionada - 1;
            atualizarSelecaoVisual(sugestoes);
            break;
            
        case 'Enter':
            if (indiceSugestaoSelecionada >= 0) {
                event.preventDefault();
                const pokemonSelecionado = sugestoesAtuais[indiceSugestaoSelecionada];
                selecionarSugestao(pokemonSelecionado.name);
            } else {
                // Se não há sugestão selecionada, oculta dropdown e deixa o form fazer submit normal
                ocultarSugestoesImediato();
            }
            break;
            
        case 'Escape':
            ocultarSugestoes();
            break;
    }
}

function atualizarSelecaoVisual(sugestoes) {
    sugestoes.forEach((sugestao, index) => {
        sugestao.classList.toggle('selected', index === indiceSugestaoSelecionada);
    });
}

function ocultarSugestoes() {
    setTimeout(() => {
        const sugestoesDesktop = document.getElementById('sugestoes-desktop');
        const sugestoesMobile = document.getElementById('sugestoes-mobile');
        const sugestoesEntrada = document.getElementById('sugestoes-entrada');
        
        if (sugestoesDesktop) sugestoesDesktop.style.display = 'none';
        if (sugestoesMobile) sugestoesMobile.style.display = 'none';
        if (sugestoesEntrada) sugestoesEntrada.style.display = 'none';
        
        indiceSugestaoSelecionada = -1;
    }, 150); // Delay para permitir clique nas sugestões
}

function ocultarSugestoesImediato() {
    const sugestoesDesktop = document.getElementById('sugestoes-desktop');
    const sugestoesMobile = document.getElementById('sugestoes-mobile');
    const sugestoesEntrada = document.getElementById('sugestoes-entrada');
    
    if (sugestoesDesktop) sugestoesDesktop.style.display = 'none';
    if (sugestoesMobile) sugestoesMobile.style.display = 'none';
    if (sugestoesEntrada) sugestoesEntrada.style.display = 'none';
    
    indiceSugestaoSelecionada = -1;
}
