<?php
$title = 'Detalhes do Pokémon';

// Verificar se foi passado um ID
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    header('Location: index.php');
    exit;
}

$pokemonId = (int)$_GET['id'];

include_once __DIR__ . '/function.php';

// Função para buscar dados do Pokémon na PokeAPI
function fetchPokemonData($id) {
    $url = "https://pokeapi.co/api/v2/pokemon/$id";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || !$response) {
        return null;
    }
    
    return json_decode($response, true);
}

// Função para buscar dados da espécie (para descrição)
function fetchPokemonSpecies($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || !$response) {
        return null;
    }
    
    return json_decode($response, true);
}

// Função para buscar cadeia evolutiva
function fetchEvolutionChain($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || !$response) {
        return null;
    }
    
    return json_decode($response, true);
}

// Função para extrair dados das evoluções
function processEvolutionChain($evolutionData) {
    $evolutions = [];
    
    function extractEvolutions($chain, &$evolutions) {
        // Extrair ID do Pokémon da URL
        $urlParts = explode('/', $chain['species']['url']);
        $speciesId = intval($urlParts[count($urlParts) - 2]);
        
        // Buscar dados básicos do Pokémon para obter os tipos
        $pokemonData = fetchPokemonData($speciesId);
        $types = [];
        if ($pokemonData && isset($pokemonData['types'])) {
            foreach ($pokemonData['types'] as $type) {
                $typeName = $type['type']['name'];
                $types[] = [
                    'nome' => translateType($typeName),
                    'nome_en' => $typeName
                ];
            }
        }
        
        $evolutions[] = [
            'id' => $speciesId,
            'nome' => ucfirst($chain['species']['name']),
            'img' => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/$speciesId.png",
            'types' => $types
        ];
        
        // Processar próximas evoluções
        if (!empty($chain['evolves_to'])) {
            foreach ($chain['evolves_to'] as $evolution) {
                extractEvolutions($evolution, $evolutions);
            }
        }
    }
    
    if ($evolutionData && isset($evolutionData['chain'])) {
        extractEvolutions($evolutionData['chain'], $evolutions);
    }
    
    return $evolutions;
}

// Função para calcular fraquezas baseado nos tipos
function calcularFraquezas($types) {
    // Tabela de efetividade: tipo atacante => [tipos que recebem super effective (2x)]
    $effectiveness = [
        'normal' => [],
        'fire' => ['grass', 'ice', 'bug', 'steel'],
        'water' => ['fire', 'ground', 'rock'],
        'electric' => ['water', 'flying'],
        'grass' => ['water', 'ground', 'rock'],
        'ice' => ['grass', 'ground', 'flying', 'dragon'],
        'fighting' => ['normal', 'ice', 'rock', 'dark', 'steel'],
        'poison' => ['grass', 'fairy'],
        'ground' => ['fire', 'electric', 'poison', 'rock', 'steel'],
        'flying' => ['grass', 'fighting', 'bug'],
        'psychic' => ['fighting', 'poison'],
        'bug' => ['grass', 'psychic', 'dark'],
        'rock' => ['fire', 'ice', 'flying', 'bug'],
        'ghost' => ['psychic', 'ghost'],
        'dragon' => ['dragon'],
        'dark' => ['psychic', 'ghost'],
        'steel' => ['ice', 'rock', 'fairy'],
        'fairy' => ['fighting', 'dragon', 'dark']
    ];
    
    // Tabela de resistências: tipo defensor => [tipos que causam não muito efetivo (0.5x)]
    $resistances = [
        'normal' => [],
        'fire' => ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
        'water' => ['fire', 'water', 'ice', 'steel'],
        'electric' => ['electric', 'flying', 'steel'],
        'grass' => ['water', 'electric', 'grass', 'ground'],
        'ice' => ['ice'],
        'fighting' => ['bug', 'rock', 'dark'],
        'poison' => ['grass', 'fighting', 'poison', 'bug', 'fairy'],
        'ground' => ['poison', 'rock'],
        'flying' => ['grass', 'fighting', 'bug'],
        'psychic' => ['fighting', 'psychic'],
        'bug' => ['grass', 'fighting', 'ground'],
        'rock' => ['normal', 'fire', 'poison', 'flying'],
        'ghost' => ['poison', 'bug'],
        'dragon' => ['fire', 'water', 'electric', 'grass'],
        'dark' => ['ghost', 'dark'],
        'steel' => ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
        'fairy' => ['fighting', 'bug', 'dark']
    ];
    
    // Imunidades: tipo defensor => [tipos que não causam dano (0x)]
    $immunities = [
        'normal' => ['ghost'],
        'fire' => [],
        'water' => [],
        'electric' => ['ground'],
        'grass' => [],
        'ice' => [],
        'fighting' => ['ghost'],
        'poison' => [],
        'ground' => ['electric'],
        'flying' => ['ground'],
        'psychic' => ['dark'],
        'bug' => [],
        'rock' => [],
        'ghost' => ['normal', 'fighting'],
        'dragon' => [],
        'dark' => ['psychic'],
        'steel' => ['poison'],
        'fairy' => ['dragon']
    ];
    
    $translations = [
        'normal' => 'normal',
        'fire' => 'fogo',
        'water' => 'água',
        'electric' => 'elétrico',
        'grass' => 'grama',
        'ice' => 'gelo',
        'fighting' => 'lutador',
        'poison' => 'veneno',
        'ground' => 'terra',
        'flying' => 'voador',
        'psychic' => 'psíquico',
        'bug' => 'inseto',
        'rock' => 'pedra',
        'ghost' => 'fantasma',
        'dragon' => 'dragão',
        'dark' => 'sombrio',
        'steel' => 'aço',
        'fairy' => 'fada'
    ];
    
    // Calcular multiplicadores para cada tipo atacante
    $typeMultipliers = [];
    $defenderTypes = array_map(fn($type) => $type['nome_en'], $types);
    
    foreach (array_keys($effectiveness) as $attackerType) {
        $multiplier = 1.0;
        
        foreach ($defenderTypes as $defenderType) {
            // Verificar imunidade
            if (in_array($attackerType, $immunities[$defenderType] ?? [])) {
                $multiplier = 0;
                break;
            }
            
            // Verificar super efetivo
            if (in_array($defenderType, $effectiveness[$attackerType] ?? [])) {
                $multiplier *= 2;
            }
            
            // Verificar resistência
            if (in_array($attackerType, $resistances[$defenderType] ?? [])) {
                $multiplier *= 0.5;
            }
        }
        
        $typeMultipliers[$attackerType] = $multiplier;
    }
    
    // Filtrar apenas tipos super efetivos (2x ou mais)
    $weaknesses = [];
    foreach ($typeMultipliers as $type => $multiplier) {
        if ($multiplier >= 2) {
            $weaknesses[] = [
                'nome' => $translations[$type] ?? $type,
                'nome_en' => $type,
                'multiplier' => $multiplier
            ];
        }
    }
    
    return $weaknesses;
}

// Função para traduzir tipos para português
function translateType($type) {
    $translations = [
        'normal' => 'normal',
        'fire' => 'fogo',
        'water' => 'água',
        'electric' => 'elétrico',
        'grass' => 'grama',
        'ice' => 'gelo',
        'fighting' => 'lutador',
        'poison' => 'veneno',
        'ground' => 'terra',
        'flying' => 'voador',
        'psychic' => 'psíquico',
        'bug' => 'inseto',
        'rock' => 'pedra',
        'ghost' => 'fantasma',
        'dragon' => 'dragão',
        'dark' => 'sombrio',
        'steel' => 'aço',
        'fairy' => 'fada'
    ];
    
    return $translations[$type] ?? $type;
}

// Buscar dados do Pokémon
$pokemonData = fetchPokemonData($pokemonId);

if (!$pokemonData) {
    header('Location: index.php');
    exit;
}

// Buscar dados da espécie
$speciesData = fetchPokemonSpecies($pokemonData['species']['url']);

// Buscar cadeia evolutiva
$evolucoes = [];
if ($speciesData && isset($speciesData['evolution_chain']['url'])) {
    $evolutionData = fetchEvolutionChain($speciesData['evolution_chain']['url']);
    $evolucoes = processEvolutionChain($evolutionData);
}

// Processar tipos
$types = [];
foreach ($pokemonData['types'] as $type) {
    $typeName = $type['type']['name'];
    $types[] = [
        'nome' => translateType($typeName),
        'nome_en' => $typeName,
        'icon' => "img/icons/$typeName.svg"
    ];
}

// Processar habilidades
$habilidades = [];
foreach ($pokemonData['abilities'] as $ability) {
    $habilidades[] = ucfirst(str_replace('-', ' ', $ability['ability']['name']));
}

// Processar stats
$stats = [];
foreach ($pokemonData['stats'] as $stat) {
    $statName = $stat['stat']['name'];
    $statNames = [
        'hp' => 'HP',
        'attack' => 'Ataque',
        'defense' => 'Defesa',
        'special-attack' => 'Ataque Especial',
        'special-defense' => 'Defesa Especial',
        'speed' => 'Velocidade'
    ];
    
    $stats[] = [
        'nome' => $statNames[$statName] ?? ucfirst(str_replace('-', ' ', $statName)),
        'valor' => $stat['base_stat']
    ];
}

// Buscar descrição em português ou inglês
$descricao = '';
if ($speciesData && isset($speciesData['flavor_text_entries'])) {
    // Primeiro tentar português, depois inglês
    foreach ($speciesData['flavor_text_entries'] as $entry) {
        if ($entry['language']['name'] === 'pt') {
            $descricao = str_replace(["\n", "\f"], ' ', $entry['flavor_text']);
            break;
        }
    }
    
    // Se não encontrou em português, usar inglês
    if (empty($descricao)) {
        foreach ($speciesData['flavor_text_entries'] as $entry) {
            if ($entry['language']['name'] === 'en') {
                $descricao = str_replace(["\n", "\f"], ' ', $entry['flavor_text']);
                break;
            }
        }
    }
}

// Buscar categoria/gênero
$categoria = 'Pokémon';
if ($speciesData && isset($speciesData['genera'])) {
    foreach ($speciesData['genera'] as $genus) {
        if ($genus['language']['name'] === 'en') {
            $categoria = $genus['genus'];
            break;
        }
    }
}

// Calcular fraquezas
$fraquezas = calcularFraquezas($types);

// Dados para o template
$dadosPokemon = [
    'id' => $pokemonData['id'],
    'nome' => ucfirst($pokemonData['name']),
    'img' => "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{$pokemonData['id']}.png",
    'types' => $types,
    'altura' => round($pokemonData['height'] / 10, 1), // Converter de decímetros para metros
    'peso' => round($pokemonData['weight'] / 10, 1), // Converter de hectogramas para kg
    'habilidades' => implode(', ', $habilidades),
    'stats' => $stats,
    'descricao' => $descricao,
    'categoria' => $categoria,
    'experiencia_base' => $pokemonData['base_experience'] ?? 0,
    'fraquezas' => $fraquezas,
    'evolucoes' => $evolucoes
];

include_once __DIR__ . '/template/header.php';
?>

<?= render('pokemon-detalhes', $dadosPokemon) ?>

<script src="js/pokemon-detalhes.js"></script>
</body>
</html>
