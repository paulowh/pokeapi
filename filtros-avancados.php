<?php
$title = 'Filtros Avançados - Pokédx';
include_once __DIR__ . '/src/core.php';
include_once __DIR__ . '/src/templates/header.php';
?>

<div class="container-fluid py-4">
    <div class="row">
        <!-- Painel de Filtros -->
        <div class="col-lg-4 col-xl-3">
            <div class="filters-panel bg-dark text-light p-4 rounded-3 sticky-top">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h4 class="mb-0">Filtros</h4>
                    <button class="btn btn-info btn-sm" onclick="surprenderMe()">
                        <i class="bi bi-shuffle"></i> Surpreenda-me!
                    </button>
                </div>

                <!-- Ordenação -->
                <div class="mb-4">
                    <label class="form-label">Organizar por</label>
                    <select class="form-select bg-dark text-light border-secondary" id="ordenacao">
                        <option value="id">Menor número primeiro</option>
                        <option value="id-desc">Maior número primeiro</option>
                        <option value="name">Nome A-Z</option>
                        <option value="name-desc">Nome Z-A</option>
                        <option value="height">Menor altura primeiro</option>
                        <option value="height-desc">Maior altura primeiro</option>
                        <option value="weight">Menor peso primeiro</option>
                        <option value="weight-desc">Maior peso primeiro</option>
                    </select>
                </div>

                <!-- Tipo e Fraqueza -->
                <div class="row mb-4">
                    <div class="col-6">
                        <h6>Tipo e Fraqueza</h6>
                        <small class="text-muted">T = Tipo, F = Fraqueza</small>
                        
                        <div class="types-grid mt-3">
                            <div class="type-filter-item mb-2" data-type="bug">
                                <span class="type-badge bug">Bug</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="bug">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="bug">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="dark">
                                <span class="type-badge dark">Dark</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="dark">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="dark">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="dragon">
                                <span class="type-badge dragon">Dragão</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="dragon">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="dragon">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="electric">
                                <span class="type-badge electric">Electric</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="electric">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="electric">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="fairy">
                                <span class="type-badge fairy">Fada</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="fairy">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="fairy">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="fighting">
                                <span class="type-badge fighting">Luta</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="fighting">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="fighting">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="fire">
                                <span class="type-badge fire">Fogo</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="fire">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="fire">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="flying">
                                <span class="type-badge flying">Flying</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="flying">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="flying">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="ghost">
                                <span class="type-badge ghost">Ghost</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="ghost">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="ghost">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="grass">
                                <span class="type-badge grass">Planta</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="grass">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="grass">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="ground">
                                <span class="type-badge ground">Ground</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="ground">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="ground">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="ice">
                                <span class="type-badge ice">Ice</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="ice">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="ice">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="normal">
                                <span class="type-badge normal">Normal</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="normal">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="normal">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="poison">
                                <span class="type-badge poison">Poison</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="poison">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="poison">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="psychic">
                                <span class="type-badge psychic">Psíquico</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="psychic">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="psychic">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="rock">
                                <span class="type-badge rock">Rock</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="rock">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="rock">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="steel">
                                <span class="type-badge steel">Steel</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="steel">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="steel">F</button>
                            </div>
                            <div class="type-filter-item mb-2" data-type="water">
                                <span class="type-badge water">Água</span>
                                <button class="btn btn-sm btn-outline-info type-btn" data-filter="type" data-value="water">T</button>
                                <button class="btn btn-sm btn-outline-danger type-btn" data-filter="weakness" data-value="water">F</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-6">
                        <h6>Habilidade</h6>
                        <select class="form-select bg-dark text-light border-secondary" id="habilidade">
                            <option value="">Todas</option>
                            <option value="overgrow">Overgrow</option>
                            <option value="chlorophyll">Chlorophyll</option>
                            <option value="blaze">Blaze</option>
                            <option value="solar-power">Solar Power</option>
                            <option value="torrent">Torrent</option>
                            <option value="rain-dish">Rain Dish</option>
                        </select>
                    </div>
                </div>

                <!-- Altura -->
                <div class="mb-4">
                    <h6>Altura</h6>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-light btn-sm altura-btn" data-value="short">
                            <i class="bi bi-arrow-down"></i> Baixo
                        </button>
                        <button class="btn btn-outline-light btn-sm altura-btn" data-value="medium">
                            <i class="bi bi-arrow-up-down"></i> Médio
                        </button>
                        <button class="btn btn-outline-light btn-sm altura-btn" data-value="tall">
                            <i class="bi bi-arrow-up"></i> Alto
                        </button>
                    </div>
                </div>

                <!-- Peso -->
                <div class="mb-4">
                    <h6>Peso</h6>
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-light btn-sm peso-btn" data-value="light">
                            <i class="bi bi-circle"></i> Leve
                        </button>
                        <button class="btn btn-outline-light btn-sm peso-btn" data-value="medium">
                            <i class="bi bi-circle-fill"></i> Médio
                        </button>
                        <button class="btn btn-outline-light btn-sm peso-btn" data-value="heavy">
                            <i class="bi bi-record-circle"></i> Pesado
                        </button>
                    </div>
                </div>

                <!-- Intervalo de números -->
                <div class="mb-4">
                    <h6>Intervalo de números</h6>
                    <div class="row g-2">
                        <div class="col-6">
                            <input type="number" class="form-control bg-dark text-light border-secondary" id="numeroMin" placeholder="1" min="1" max="1025">
                        </div>
                        <div class="col-6">
                            <input type="number" class="form-control bg-dark text-light border-secondary" id="numeroMax" placeholder="1025" min="1" max="1025">
                        </div>
                    </div>
                </div>

                <!-- Botões de ação -->
                <div class="d-flex gap-2">
                    <button class="btn btn-secondary flex-fill" onclick="resetarFiltros()">Redefinir</button>
                    <button class="btn btn-primary flex-fill" onclick="aplicarFiltros()">
                        <i class="bi bi-search"></i> Pesquisar
                    </button>
                </div>

                <!-- Botão para esconder filtros -->
                <button class="btn btn-outline-light btn-sm w-100 mt-3" onclick="toggleFiltros()">
                    <i class="bi bi-chevron-up"></i> Esconder busca avançada
                </button>
            </div>
        </div>

        <!-- Área de Resultados -->
        <div class="col-lg-8 col-xl-9">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <button class="btn btn-info" onclick="surprenderMe()">
                    <i class="bi bi-shuffle"></i> Surpreenda-me!
                </button>
                <div class="dropdown">
                    <button class="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-sort-down"></i> Menor número primeiro
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" onclick="setOrdenacao('id')">Menor número primeiro</a></li>
                        <li><a class="dropdown-item" href="#" onclick="setOrdenacao('id-desc')">Maior número primeiro</a></li>
                        <li><a class="dropdown-item" href="#" onclick="setOrdenacao('name')">Nome A-Z</a></li>
                        <li><a class="dropdown-item" href="#" onclick="setOrdenacao('name-desc')">Nome Z-A</a></li>
                    </ul>
                </div>
            </div>

            <!-- Grid de Pokémons -->
            <div class="row gy-4" id="pokemon-grid">
                <!-- Pokémons serão carregados aqui via JavaScript -->
            </div>

            <!-- Loading -->
            <div id="loading" class="text-center py-4 d-none">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Carregando...</span>
                </div>
            </div>

            <!-- Sem resultados -->
            <div id="no-results" class="text-center py-5 d-none">
                <i class="bi bi-search display-1 text-muted"></i>
                <h4 class="text-muted mt-3">Nenhum Pokémon encontrado</h4>
                <p class="text-muted">Tente ajustar os filtros para encontrar outros Pokémons.</p>
            </div>
        </div>
    </div>
</div>

<!-- CSS para os filtros -->
<style>
.filters-panel {
    max-height: calc(100vh - 100px);
    overflow-y: auto;
}

.type-filter-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.type-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    min-width: 60px;
    text-align: center;
}

/* Cores dos tipos */
.type-badge.bug { background-color: #A8B820; color: white; }
.type-badge.dark { background-color: #705848; color: white; }
.type-badge.dragon { background-color: #7038F8; color: white; }
.type-badge.electric { background-color: #F8D030; color: black; }
.type-badge.fairy { background-color: #EE99AC; color: black; }
.type-badge.fighting { background-color: #C03028; color: white; }
.type-badge.fire { background-color: #F08030; color: white; }
.type-badge.flying { background-color: #A890F0; color: white; }
.type-badge.ghost { background-color: #705898; color: white; }
.type-badge.grass { background-color: #78C850; color: white; }
.type-badge.ground { background-color: #E0C068; color: black; }
.type-badge.ice { background-color: #98D8D8; color: black; }
.type-badge.normal { background-color: #A8A878; color: white; }
.type-badge.poison { background-color: #A040A0; color: white; }
.type-badge.psychic { background-color: #F85888; color: white; }
.type-badge.rock { background-color: #B8A038; color: white; }
.type-badge.steel { background-color: #B8B8D0; color: black; }
.type-badge.water { background-color: #6890F0; color: white; }

.type-btn.active {
    background-color: var(--bs-primary) !important;
    border-color: var(--bs-primary) !important;
    color: white !important;
}

.altura-btn.active, .peso-btn.active {
    background-color: var(--bs-light) !important;
    color: var(--bs-dark) !important;
}

@media (max-width: 991px) {
    .filters-panel {
        position: relative !important;
        max-height: none;
    }
}
</style>

<!-- JavaScript para os filtros -->
<script src="<?= asset('js/filtros-avancados.js') ?>"></script>

</body>
</html>
