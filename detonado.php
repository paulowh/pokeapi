<?php
$tittle = 'Detonado Pokemon Black V2';

include_once __DIR__ . '/template/header.php';

$timePokemon = [
    [
        'id' => 503,
        'nome' => 'Samurott',
        'types' => ['water'],
        'movimentos' => [
            ['nome' => 'Surfar', 'tipo' => 'water', 'origem' => 'TM55'],
            ['nome' => 'Raio de Gelo', 'tipo' => 'ice', 'origem' => 'TM13'],
            ['nome' => 'Megachifre', 'tipo' => 'bug', 'origem' => 'Lv. 62'],
            ['nome' => 'Jato d’Água', 'tipo' => 'water', 'origem' => 'Lv. 19']
        ],
        'papel' => 'Versátil ofensivamente, cobrindo vários tipos ao longo do jogo.',
        'onde_encontrar' => 'inicial do jogo.',
        'evolucoes_anteriores' => [
            ['id' => 501, 'nome' => 'Oshawott'],
            ['id' => 502, 'nome' => 'Dewott', 'nivel' => 'lv. 17'],
            ['id' => 503, 'nome' => 'Samurott', 'nivel' => 'lv. 36']
        ]
    ],
    [
        'id' => 462,
        'nome' => 'Magnezone',
        'types' => ['electric', 'steel'],
        'habilidades' => ['Canhão de Luz', 'Disparo', 'Redemoinho', 'Explosão'],
        'movimentos' => [
            ['nome' => 'Canhão de Luz', 'tipo' => 'steel', 'origem' => 'Lv. 54'], // Flash Cannon
            ['nome' => 'Disparo', 'tipo' => 'electric', 'origem' => 'Lv. 43'], // Discharge
            ['nome' => 'Redemoinho', 'tipo' => 'electric', 'origem' => 'TM73'], // Thunder Wave
            ['nome' => 'Explosão', 'tipo' => 'normal', 'origem' => 'TM64']
        ],
        'papel' => 'Resistência e poder especial; ótimo contra tipos Inseto, Veneno, Voador e Água.',
        'onde_encontrar' => 'Evolui de Magneton ao subir nível na Chargestone Cave.',
        'evolucoes_anteriores' => [
            ['id' => 81, 'nome' => 'Magnemite'],
            ['id' => 82, 'nome' => 'Magneton', 'nivel' => 'lv. 30'],
            ['id' => 462, 'nome' => 'Magnezone', 'nivel' => 'Charg. Cave']
        ]
    ],
    [
        'id' => 59,
        'nome' => 'Arcanine',
        'types' => ['fire'],
        'habilidades' => ['Lança Chamas', 'Presas Trovão', 'Velocidade Extrema', 'Roda de Fogo'],
        'movimentos' => [
            ['nome' => 'Lança Chamas', 'tipo' => 'fire', 'origem' => 'TM35'],
            ['nome' => 'Presas Trovão', 'tipo' => 'electric', 'origem' => 'Lv. 34'],
            ['nome' => 'Velocidade Extrema', 'tipo' => 'normal', 'origem' => 'Lv. 39'],
            ['nome' => 'Roda de Fogo', 'tipo' => 'fire', 'origem' => 'Lv. 23']
        ],
        'papel' => 'Atacante ágil e poderoso, com boas opções de cobertura.',
        'onde_encontrar' => 'Use Fire Stone em Growlithe. Encontra Growlithe na Route 2.',
        'evolucoes_anteriores' => [
            ['id' => 58, 'nome' => 'Growlithe'],
            ['id' => 59, 'nome' => 'Arcanine', 'nivel' => 'Fire Stone']
        ]
    ],
    [
        'id' => 560,
        'nome' => 'Scrafty',
        'types' => ['dark', 'fighting'],
        'habilidades' => ['Chute Altíssimo', 'Mastigada', 'Soco Gélido', 'Força'],
        'movimentos' => [
            ['nome' => 'Chute Altíssimo', 'tipo' => 'fighting', 'origem' => 'Lv. 51'],
            ['nome' => 'Mastigada', 'tipo' => 'dark', 'origem' => 'Lv. 38'],
            ['nome' => 'Soco Gélido', 'tipo' => 'ice', 'origem' => 'Move Tutor'],
            ['nome' => 'Força', 'tipo' => 'normal', 'origem' => 'HM04']
        ],
        'papel' => 'Cobertura contra tipo Dragão e resistência ao tipo Psíquico.',
        'onde_encontrar' => 'Evolui de Scraggy no Lv. 39. Encontra Scraggy na Route 4.',
        'evolucoes_anteriores' => [
            ['id' => 559, 'nome' => 'Scraggy'],
            ['id' => 560, 'nome' => 'Scrafty', 'nivel' => 'lv. 39']
        ]
    ],
    [
        'id' => 330,
        'nome' => 'Flygon',
        'types' => ['dragon', 'ground'],
        'habilidades' => ['Poder da Terra', 'Garra de Dragão', 'Lança-Rochas', 'Mastigada'],
        'movimentos' => [
            ['nome' => 'Poder da Terra', 'tipo' => 'ground', 'origem' => 'Move Tutor'],
            ['nome' => 'Garra de Dragão', 'tipo' => 'dragon', 'origem' => 'TM02'],
            ['nome' => 'Lança-Rochas', 'tipo' => 'rock', 'origem' => 'TM80'],
            ['nome' => 'Mastigada', 'tipo' => 'dark', 'origem' => 'Lv. 35']
        ],
        'papel' => 'Velocidade e cobertura ampla; útil contra Dragão e elétricos.',
        'onde_encontrar' => 'Evolui de Vibrava no Lv. 45. Trapinch está disponível no Desert Resort.',
        'evolucoes_anteriores' => [
            ['id' => 328, 'nome' => 'Trapinch'],
            ['id' => 329, 'nome' => 'Vibrava', 'nivel' => 'lv. 35'],
            ['id' => 330, 'nome' => 'Flygon', 'nivel' => 'lv. 45']
        ]
    ],
    [
        'id' => 561,
        'nome' => 'Sigilyph',
        'types' => ['psychic', 'flying'],
        'habilidades' => ['Voar', 'Poder Aéreo', 'Psíquico', 'Bola Sombria'],
        'movimentos' => [
            ['nome' => 'Voar', 'tipo' => 'flying', 'origem' => 'HM02'],
            ['nome' => 'Poder Aéreo', 'tipo' => 'flying', 'origem' => 'Lv. 38'],
            ['nome' => 'Psíquico', 'tipo' => 'psychic', 'origem' => 'TM29'],
            ['nome' => 'Bola Sombria', 'tipo' => 'ghost', 'origem' => 'TM30']
        ],
        'papel' => 'Resistência ao tipo Lutador e transporte aéreo.',
        'onde_encontrar' => 'Encontrado na Route 7.',
        'evolucoes_anteriores' => [
            ['id' => 561, 'nome' => 'Sigilyph'] // não evolui
        ]
    ],
];

?>

<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokemon Black Version 2</h1>

    <main class="row gy-4 py-5">
        <?php foreach ($timePokemon as $pokemon) { ?>
            <div class="col-12 col-md-6">
                <?= render('pokemon-time', $pokemon) ?>
            </div>
        <?php } ?>
    </main>
    
    <iframe src="./img/pdf/detonado.pdf" width="100%" height="1000px">
        Este navegador não suporta visualização de PDF.
    </iframe>
</section>