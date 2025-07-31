<?php
$title = 'Pokédx';
$gen = isset($_GET['g']) ? htmlspecialchars($_GET['g']) : 1;
$onLoad = 'loadPokemon(' . $gen. ')';

include_once __DIR__ . '/src/core.php';
include_once __DIR__ . '/src/templates/header.php';

// Função para buscar Pokémon via PokeAPI
function fetchPokemonData($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_USERAGENT, 'PokedexApp/1.0');
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode === 200 && $response !== false) {
        return json_decode($response, true);
    }
    
    return null;
}

// Função para obter lista de Pokémons por geração
function getPokemonByGeneration($generation) {
    $generations = [
        1 => ['limit' => 151, 'offset' => 0],
        2 => ['limit' => 100, 'offset' => 151],
        3 => ['limit' => 135, 'offset' => 251],
        4 => ['limit' => 107, 'offset' => 386],
        5 => ['limit' => 156, 'offset' => 493],
        6 => ['limit' => 72, 'offset' => 649],
        7 => ['limit' => 81, 'offset' => 721],
        8 => ['limit' => 96, 'offset' => 802],
        9 => ['limit' => 103, 'offset' => 898]
    ];
    
    if (!isset($generations[$generation])) {
        return [];
    }
    
    $gen = $generations[$generation];
    $url = "https://pokeapi.co/api/v2/pokemon?limit={$gen['limit']}&offset={$gen['offset']}";
    
    $data = fetchPokemonData($url);
    if (!$data || !isset($data['results'])) {
        return [];
    }
    
    return $data['results'];
}

// Função para obter detalhes completos de um Pokémon
function getPokemonDetails($pokemonUrl) {
    return fetchPokemonData($pokemonUrl);
}

// Função para aplicar filtros individuais
function applyFilters($pokemon, $filters) {
    // Filtro por nome
    if (!empty($filters['nome'])) {
        if (strpos(strtolower($pokemon['name']), strtolower($filters['nome'])) === false) {
            return false;
        }
    }
    
    // Filtro por tipos
    if (!empty($filters['tipos']) && is_array($filters['tipos'])) {
        $pokemonTypes = array_map(function($type) {
            return $type['type']['name'];
        }, $pokemon['types']);
        
        $hasType = false;
        foreach ($filters['tipos'] as $filterType) {
            if (in_array($filterType, $pokemonTypes)) {
                $hasType = true;
                break;
            }
        }
        
        if (!$hasType) {
            return false;
        }
    }
    
    // Filtro por altura
    if (!empty($filters['altura'])) {
        $altura = $pokemon['height'] * 0.1; // Converter para metros
        switch ($filters['altura']) {
            case 'short':
                if ($altura >= 1.0) return false;
                break;
            case 'medium':
                if ($altura < 1.0 || $altura > 2.0) return false;
                break;
            case 'tall':
                if ($altura <= 2.0) return false;
                break;
        }
    }
    
    // Filtro por peso
    if (!empty($filters['peso'])) {
        $peso = $pokemon['weight'] * 0.1; // Converter para kg
        switch ($filters['peso']) {
            case 'light':
                if ($peso >= 25.0) return false;
                break;
            case 'medium':
                if ($peso < 25.0 || $peso > 100.0) return false;
                break;
            case 'heavy':
                if ($peso <= 100.0) return false;
                break;
        }
    }
    
    // Filtro por intervalo de números
    if (!empty($filters['numeroMin']) && $pokemon['id'] < intval($filters['numeroMin'])) {
        return false;
    }
    
    if (!empty($filters['numeroMax']) && $pokemon['id'] > intval($filters['numeroMax'])) {
        return false;
    }
    
    return true;
}

// Função para ordenar Pokémons
function sortPokemon($pokemonList, $ordenacao) {
    switch ($ordenacao) {
        case 'id':
            usort($pokemonList, function($a, $b) {
                return $a['id'] - $b['id'];
            });
            break;
        case 'id-desc':
            usort($pokemonList, function($a, $b) {
                return $b['id'] - $a['id'];
            });
            break;
        case 'name':
            usort($pokemonList, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });
            break;
        case 'name-desc':
            usort($pokemonList, function($a, $b) {
                return strcmp($b['name'], $a['name']);
            });
            break;
        case 'height':
            usort($pokemonList, function($a, $b) {
                return $a['height'] - $b['height'];
            });
            break;
        case 'height-desc':
            usort($pokemonList, function($a, $b) {
                return $b['height'] - $a['height'];
            });
            break;
        case 'weight':
            usort($pokemonList, function($a, $b) {
                return $a['weight'] - $b['weight'];
            });
            break;
        case 'weight-desc':
            usort($pokemonList, function($a, $b) {
                return $b['weight'] - $a['weight'];
            });
            break;
    }
    
    return $pokemonList;
}

// Função para filtrar Pokémons
function filterPokemon($pokemonList, $filters) {
    $filteredPokemon = [];
    
    foreach ($pokemonList as $pokemon) {
        $details = getPokemonDetails($pokemon['url']);
        if (!$details) continue;
        
        // Aplicar filtros
        if (!applyFilters($details, $filters)) {
            continue;
        }
        
        // Formatar dados para o frontend
        $filteredPokemon[] = [
            'id' => $details['id'],
            'name' => $details['name'],
            'types' => array_map(function($type) {
                return $type['type']['name'];
            }, $details['types']),
            'sprites' => $details['sprites'],
            'height' => $details['height'],
            'weight' => $details['weight'],
            'abilities' => array_map(function($ability) {
                return [
                    'name' => $ability['ability']['name'],
                    'is_hidden' => $ability['is_hidden']
                ];
            }, $details['abilities'])
        ];
    }
    
    return $filteredPokemon;
}

// Processar requisição de filtros via GET
if (isset($_GET['action']) && $_GET['action'] === 'filter') {
    header('Content-Type: application/json');
    
    try {
        // Obter filtros dos parâmetros GET
        $filters = [
            'nome' => $_GET['nome'] ?? '',
            'geracao' => !empty($_GET['geracao']) ? intval($_GET['geracao']) : 1,
            'ordenacao' => $_GET['ordenacao'] ?? 'id',
            'tipos' => !empty($_GET['tipos']) ? explode(',', $_GET['tipos']) : [],
            'altura' => $_GET['altura'] ?? '',
            'peso' => $_GET['peso'] ?? '',
            'numeroMin' => $_GET['numeroMin'] ?? '',
            'numeroMax' => $_GET['numeroMax'] ?? ''
        ];
        
        // Buscar Pokémons da geração especificada
        $pokemonList = getPokemonByGeneration($filters['geracao']);
        
        if (empty($pokemonList)) {
            echo json_encode([
                'success' => false,
                'error' => 'Nenhum Pokémon encontrado para esta geração'
            ]);
            exit;
        }
        
        // Aplicar filtros
        $filteredPokemon = filterPokemon($pokemonList, $filters);
        
        // Ordenar resultados
        $sortedPokemon = sortPokemon($filteredPokemon, $filters['ordenacao']);
        
        // Retornar resultados
        echo json_encode([
            'success' => true,
            'data' => $sortedPokemon,
            'total' => count($sortedPokemon),
            'generation' => $filters['geracao']
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => $e->getMessage()
        ]);
    }
    
    exit;
}
?>

<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokédx</h1>
    
    <!-- Painel de Filtros Unificado -->
    <div class="main-filters-panel bg-light border rounded-3 p-3 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h6 class="mb-0"><i class="bi bi-search"></i> Filtros</h6>
            <button class="btn btn-outline-info btn-sm" id="toggle-advanced-filters">
                <i class="bi bi-gear"></i> Filtros Avançados
            </button>
        </div>
        
        <!-- Filtros Básicos (sempre visíveis) -->
        <div class="row g-3 align-items-end">
            <!-- Botão Sortear -->
            <div class="col-md-2">
                <label class="form-label small fw-bold">Ação</label>
                <button class="btn btn-warning w-100" onclick="surprenderMe()">
                    <i class="bi bi-shuffle"></i> Sortear
                </button>
            </div>

            <!-- Busca por Nome -->
            <div class="col-md-3">
                <label class="form-label small fw-bold">Buscar por nome</label>
                <input type="text" class="form-control" id="buscar-nome" placeholder="Digite o nome do Pokémon">
            </div>

            <!-- Geração -->
            <div class="col-md-2">
                <label class="form-label small fw-bold">Geração</label>
                <select class="form-select" id="geracao-filter">
                    <option value="">Todas</option>
                    <option value="1" <?php echo $gen == 1 ? 'selected' : ''; ?>>Geração 1</option>
                    <option value="2" <?php echo $gen == 2 ? 'selected' : ''; ?>>Geração 2</option>
                    <option value="3" <?php echo $gen == 3 ? 'selected' : ''; ?>>Geração 3</option>
                    <option value="4" <?php echo $gen == 4 ? 'selected' : ''; ?>>Geração 4</option>
                    <option value="5" <?php echo $gen == 5 ? 'selected' : ''; ?>>Geração 5</option>
                    <option value="6" <?php echo $gen == 6 ? 'selected' : ''; ?>>Geração 6</option>
                    <option value="7" <?php echo $gen == 7 ? 'selected' : ''; ?>>Geração 7</option>
                    <option value="8" <?php echo $gen == 8 ? 'selected' : ''; ?>>Geração 8</option>
                    <option value="9" <?php echo $gen == 9 ? 'selected' : ''; ?>>Geração 9</option>
                </select>
            </div>

            <!-- Ordenação -->
            <div class="col-md-2">
                <label class="form-label small fw-bold">Ordenar por</label>
                <select class="form-select" id="ordenacao">
                    <option value="id">Número (crescente)</option>
                    <option value="id-desc">Número (decrescente)</option>
                    <option value="name">Nome (A-Z)</option>
                    <option value="name-desc">Nome (Z-A)</option>
                    <option value="height">Altura (menor)</option>
                    <option value="height-desc">Altura (maior)</option>
                    <option value="weight">Peso (menor)</option>
                    <option value="weight-desc">Peso (maior)</option>
                </select>
            </div>

            <!-- Botões de ação -->
            <div class="col-md-3 d-flex gap-2">
                <button class="btn btn-secondary" onclick="resetarFiltros()">
                    <i class="bi bi-arrow-clockwise"></i> Limpar
                </button>
                <button class="btn btn-primary" onclick="aplicarFiltros()">
                    <i class="bi bi-search"></i> Pesquisar
                </button>
            </div>
        </div>

        <!-- Filtros Avançados (accordion interno) -->
        <div id="filters-content" class="collapsed">
            <hr class="my-3">
            <div class="row g-3">
                <!-- Altura -->
                <div class="col-md-3">
                    <label class="form-label small fw-bold">Altura</label>
                    <div class="btn-group w-100" role="group">
                        <input type="radio" class="btn-check" name="altura" id="altura-baixo" value="short">
                        <label class="btn btn-outline-primary btn-sm" for="altura-baixo">Baixo</label>
                        
                        <input type="radio" class="btn-check" name="altura" id="altura-medio" value="medium">
                        <label class="btn btn-outline-primary btn-sm" for="altura-medio">Médio</label>
                        
                        <input type="radio" class="btn-check" name="altura" id="altura-alto" value="tall">
                        <label class="btn btn-outline-primary btn-sm" for="altura-alto">Alto</label>
                    </div>
                </div>

                <!-- Peso -->
                <div class="col-md-3">
                    <label class="form-label small fw-bold">Peso</label>
                    <div class="btn-group w-100" role="group">
                        <input type="radio" class="btn-check" name="peso" id="peso-leve" value="light">
                        <label class="btn btn-outline-success btn-sm" for="peso-leve">Leve</label>
                        
                        <input type="radio" class="btn-check" name="peso" id="peso-medio" value="medium">
                        <label class="btn btn-outline-success btn-sm" for="peso-medio">Médio</label>
                        
                        <input type="radio" class="btn-check" name="peso" id="peso-pesado" value="heavy">
                        <label class="btn btn-outline-success btn-sm" for="peso-pesado">Pesado</label>
                    </div>
                </div>

                <!-- Intervalo de números -->
                <div class="col-md-6">
                    <label class="form-label small fw-bold">Intervalo de números</label>
                    <div class="d-flex gap-2 align-items-center">
                        <input type="number" class="form-control form-control-sm" id="numero-min" placeholder="1" min="1" max="1025">
                        <span class="text-muted">até</span>
                        <input type="number" class="form-control form-control-sm" id="numero-max" placeholder="1025" min="1" max="1025">
                    </div>
                </div>
            </div>

            <!-- Linha 2 - Filtro por Tipos -->
            <div class="row g-3 mt-3">
                <div class="col-12">
                    <label class="form-label small fw-bold">Filtrar por Tipo</label>
                    <div class="types-filter-container">
                        <div class="d-flex flex-wrap gap-2">
                            <!-- Tipos Pokémon -->
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="normal" title="Normal">
                                <img src="public/img/icons/normal.svg" alt="Normal" width="16" height="16"> Normal
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="fire" title="Fogo">
                                <img src="public/img/icons/fire.svg" alt="Fogo" width="16" height="16"> Fogo
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="water" title="Água">
                                <img src="public/img/icons/water.svg" alt="Água" width="16" height="16"> Água
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="electric" title="Elétrico">
                                <img src="public/img/icons/electric.svg" alt="Elétrico" width="16" height="16"> Elétrico
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="grass" title="Planta">
                                <img src="public/img/icons/grass.svg" alt="Planta" width="16" height="16"> Planta
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="ice" title="Gelo">
                                <img src="public/img/icons/ice.svg" alt="Gelo" width="16" height="16"> Gelo
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="fighting" title="Lutador">
                                <img src="public/img/icons/fighting.svg" alt="Lutador" width="16" height="16"> Lutador
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="poison" title="Veneno">
                                <img src="public/img/icons/poison.svg" alt="Veneno" width="16" height="16"> Veneno
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="ground" title="Terra">
                                <img src="public/img/icons/ground.svg" alt="Terra" width="16" height="16"> Terra
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="flying" title="Voador">
                                <img src="public/img/icons/flying.svg" alt="Voador" width="16" height="16"> Voador
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="psychic" title="Psíquico">
                                <img src="public/img/icons/psychic.svg" alt="Psíquico" width="16" height="16"> Psíquico
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="bug" title="Inseto">
                                <img src="public/img/icons/bug.svg" alt="Inseto" width="16" height="16"> Inseto
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="rock" title="Pedra">
                                <img src="public/img/icons/rock.svg" alt="Pedra" width="16" height="16"> Pedra
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="ghost" title="Fantasma">
                                <img src="public/img/icons/ghost.svg" alt="Fantasma" width="16" height="16"> Fantasma
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="dragon" title="Dragão">
                                <img src="public/img/icons/dragon.svg" alt="Dragão" width="16" height="16"> Dragão
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="dark" title="Sombrio">
                                <img src="public/img/icons/dark.svg" alt="Sombrio" width="16" height="16"> Sombrio
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="steel" title="Aço">
                                <img src="public/img/icons/steel.svg" alt="Aço" width="16" height="16"> Aço
                            </button>
                            <button class="btn btn-outline-secondary btn-sm type-filter-btn" data-type="fairy" title="Fada">
                                <img src="public/img/icons/fairy.svg" alt="Fada" width="16" height="16"> Fada
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Grid de Pokémons -->
    <main class="row gy-4 position-relative" id="pokedex">
        <!-- Pokémons serão carregados aqui via JavaScript -->
    </main>
    
    <!-- Loading indicator -->
    <div id="loading-indicator" class="text-center mt-4 d-none">
        <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
    </div>

    <!-- Sem resultados -->
    <div id="no-results" class="text-center py-5 d-none">
        <i class="bi bi-search display-1 text-muted"></i>
        <h4 class="text-muted mt-3">Nenhum Pokémon encontrado</h4>
        <p class="text-muted">Tente ajustar os filtros para encontrar outros Pokémons.</p>
        <button class="btn btn-outline-primary" onclick="resetarFiltros()">Limpar todos os filtros</button>
    </div>
</section>

<!-- CSS para os filtros -->
<style>
.main-filters-panel {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.advanced-filters-panel {
    background: linear-gradient(135deg, #f1f3f4 0%, #e8eaed 100%);
    border: 1px solid #dadce0;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.type-filter-btn {
    transition: all 0.2s ease;
    border-radius: 20px;
    font-size: 0.8rem;
    padding: 0.25rem 0.75rem;
}

.type-filter-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.type-filter-btn.active {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.type-filter-btn.active:hover {
    background-color: #0b5ed7;
    border-color: #0a58ca;
}

.btn-check:checked + .btn {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    color: white;
}

.types-filter-container {
    max-height: 200px;
    overflow-y: auto;
}

#filters-content.collapsed {
    display: none;
}

.main-filters-panel .form-control,
.main-filters-panel .form-select {
    border-color: #ced4da;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.main-filters-panel .form-control:focus,
.main-filters-panel .form-select:focus {
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

@media (max-width: 768px) {
    .type-filter-btn {
        font-size: 0.7rem;
        padding: 0.2rem 0.5rem;
    }
    
    .types-filter-container {
        max-height: 150px;
    }
    
    .main-filters-panel .row > div {
        margin-bottom: 1rem;
    }
}
</style>

<!-- JavaScript para os filtros -->
<script>
let filtrosAtivos = {
    nome: '',
    geracao: '',
    tipos: [],
    altura: '',
    peso: '',
    numeroMin: '',
    numeroMax: '',
    ordenacao: 'id'
};

// Toggle para mostrar/ocultar filtros
document.addEventListener('DOMContentLoaded', function() {
    const toggleAdvancedBtn = document.getElementById('toggle-advanced-filters');
    const filtersContent = document.getElementById('filters-content');
    
    // Event listener para o botão de filtros avançados
    toggleAdvancedBtn.addEventListener('click', function() {
        const icon = toggleAdvancedBtn.querySelector('i');
        
        if (filtersContent.classList.contains('collapsed')) {
            filtersContent.classList.remove('collapsed');
            icon.className = 'bi bi-chevron-up';
            toggleAdvancedBtn.innerHTML = '<i class="bi bi-chevron-up"></i> Ocultar filtros avançados';
        } else {
            filtersContent.classList.add('collapsed');
            icon.className = 'bi bi-gear';
            toggleAdvancedBtn.innerHTML = '<i class="bi bi-gear"></i> Filtros Avançados';
        }
    });

    // Event listeners para os filtros
    setupFilterListeners();
    
    // Carregar Pokémons iniciais
    aplicarFiltros();
});

function setupFilterListeners() {
    // Busca por nome
    document.getElementById('buscar-nome').addEventListener('input', function() {
        filtrosAtivos.nome = this.value.toLowerCase();
    });

    // Geração
    document.getElementById('geracao-filter').addEventListener('change', function() {
        filtrosAtivos.geracao = this.value;
    });

    // Ordenação
    document.getElementById('ordenacao').addEventListener('change', function() {
        filtrosAtivos.ordenacao = this.value;
    });

    // Tipos
    document.querySelectorAll('.type-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tipo = this.dataset.type;
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                if (!filtrosAtivos.tipos.includes(tipo)) {
                    filtrosAtivos.tipos.push(tipo);
                }
            } else {
                filtrosAtivos.tipos = filtrosAtivos.tipos.filter(t => t !== tipo);
            }
        });
    });

    // Altura
    document.querySelectorAll('input[name="altura"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                filtrosAtivos.altura = this.value;
            }
        });
    });

    // Peso
    document.querySelectorAll('input[name="peso"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                filtrosAtivos.peso = this.value;
            }
        });
    });

    // Intervalo de números
    document.getElementById('numero-min').addEventListener('input', function() {
        filtrosAtivos.numeroMin = this.value;
    });

    document.getElementById('numero-max').addEventListener('input', function() {
        filtrosAtivos.numeroMax = this.value;
    });
}

function aplicarFiltros() {
    mostrarLoading(true);
    
    // Preparar dados dos filtros
    const dadosFiltros = {
        nome: filtrosAtivos.nome || document.getElementById('buscar-nome').value,
        geracao: filtrosAtivos.geracao || document.getElementById('geracao-filter').value || '1',
        tipos: filtrosAtivos.tipos,
        altura: filtrosAtivos.altura,
        peso: filtrosAtivos.peso,
        numeroMin: filtrosAtivos.numeroMin || document.getElementById('numero-min').value,
        numeroMax: filtrosAtivos.numeroMax || document.getElementById('numero-max').value,
        ordenacao: filtrosAtivos.ordenacao || document.getElementById('ordenacao').value
    };

    // Se não há filtros específicos, usar a função existente loadPokemon
    if (!temFiltrosEspecificos()) {
        const geracao = parseInt(dadosFiltros.geracao);
        loadPokemon(geracao);
        return;
    }

    console.log('Aplicando filtros avançados:', dadosFiltros);
    
    // Construir URL com parâmetros GET
    const params = new URLSearchParams();
    params.append('action', 'filter');
    
    Object.keys(dadosFiltros).forEach(key => {
        if (dadosFiltros[key] !== '' && dadosFiltros[key] !== null && dadosFiltros[key] !== undefined) {
            if (Array.isArray(dadosFiltros[key])) {
                if (dadosFiltros[key].length > 0) {
                    params.append(key, dadosFiltros[key].join(','));
                }
            } else {
                params.append(key, dadosFiltros[key]);
            }
        }
    });
    
    // Fazer requisição GET para o próprio arquivo
    fetch(`index.php?${params.toString()}`)
    .then(response => response.json())
    .then(data => {
        mostrarLoading(false);
        
        if (data.success) {
            console.log('Filtros aplicados com sucesso:', data);
            renderizarPokemonsFiltrados(data.data);
            
            if (data.data.length === 0) {
                document.getElementById('no-results').classList.remove('d-none');
            } else {
                document.getElementById('no-results').classList.add('d-none');
            }
        } else {
            console.error('Erro ao aplicar filtros:', data.error);
            alert('Erro ao aplicar filtros: ' + data.error);
        }
    })
    .catch(error => {
        mostrarLoading(false);
        console.error('Erro na requisição:', error);
        alert('Erro ao conectar com o servidor');
    });
}

function renderizarPokemonsFiltrados(pokemonList) {
    const pokedex = document.getElementById('pokedex');
    pokedex.innerHTML = '';
    
    pokemonList.forEach(pokemon => {
        const pokemonCard = criarCardPokemon(pokemon);
        pokedex.appendChild(pokemonCard);
    });
}

function criarCardPokemon(pokemon) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3';
    
    // Obter a imagem principal
    const imagemPrincipal = pokemon.sprites?.other?.['official-artwork']?.front_default || 
                           pokemon.sprites?.front_default || 
                           'public/img/pokeball.png';
    
    // Criar badges dos tipos
    const tiposBadges = pokemon.types.map(type => {
        return `<span class="badge type-badge ${type}">${type}</span>`;
    }).join(' ');
    
    col.innerHTML = `
        <div class="card pokemon-card h-100" style="cursor: pointer;" onclick="window.location.href='pokemon-detalhes.php?id=${pokemon.id}'">
            <div class="text-center p-3">
                <img src="${imagemPrincipal}" alt="${pokemon.name}" class="pokemon-img">
            </div>
            <div class="card-body text-center">
                <h6 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h6>
                <p class="text-muted small">#${pokemon.id.toString().padStart(3, '0')}</p>
                <div class="types-container">
                    ${tiposBadges}
                </div>
                <div class="pokemon-stats mt-2">
                    <small class="text-muted">
                        <i class="bi bi-arrows-vertical"></i> ${(pokemon.height * 0.1).toFixed(1)}m
                        <i class="bi bi-circle-fill ms-2"></i> ${(pokemon.weight * 0.1).toFixed(1)}kg
                    </small>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function resetarFiltros() {
    // Limpar objeto de filtros
    filtrosAtivos = {
        nome: '',
        geracao: '',
        tipos: [],
        altura: '',
        peso: '',
        numeroMin: '',
        numeroMax: '',
        ordenacao: 'id'
    };

    // Limpar formulário
    document.getElementById('buscar-nome').value = '';
    document.getElementById('geracao-filter').value = '';
    document.getElementById('ordenacao').value = 'id';
    document.getElementById('numero-min').value = '';
    document.getElementById('numero-max').value = '';

    // Limpar tipos selecionados
    document.querySelectorAll('.type-filter-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });

    // Limpar radio buttons
    document.querySelectorAll('input[name="altura"]:checked').forEach(radio => {
        radio.checked = false;
    });
    document.querySelectorAll('input[name="peso"]:checked').forEach(radio => {
        radio.checked = false;
    });

    // Recarregar primeira geração
    loadPokemon(1);
    
    // Ocultar mensagem de "sem resultados"
    document.getElementById('no-results').classList.add('d-none');
}

function temFiltrosEspecificos() {
    return filtrosAtivos.nome !== '' || 
           filtrosAtivos.tipos.length > 0 || 
           filtrosAtivos.altura !== '' || 
           filtrosAtivos.peso !== '' || 
           filtrosAtivos.numeroMin !== '' || 
           filtrosAtivos.numeroMax !== '';
}

function surprenderMe() {
    // Gerar número aleatório entre 1 e 1025
    const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
    
    // Redirecionar para a página de detalhes do Pokémon
    window.location.href = `pokemon-detalhes.php?id=${numeroAleatorio}`;
}

function mostrarLoading(mostrar) {
    const loading = document.getElementById('loading-indicator');
    if (mostrar) {
        loading.classList.remove('d-none');
    } else {
        loading.classList.add('d-none');
    }
}

// Compatibilidade com o código existente
document.addEventListener('scroll', scrollHandler);
</script>

</body>
</html>