<?php
$tittle = 'Detonado Pokemon Fire Red';

include_once __DIR__ . '/template/header.php';

$timePokemon = [
    [
        'id' => 7,
        'nome' => 'Blastoise',
        'types' => ['water'],
        'movimentos' => [
            ['nome' => 'Surf', 'tipo' => 'water', 'origem' => 'HM03 (Safari Zone)'],
            ['nome' => 'Ice Beam', 'tipo' => 'ice', 'origem' => 'TM13 (Game Corner)'],
            ['nome' => 'Bite', 'tipo' => 'dark', 'origem' => 'Lv. 24'],
            ['nome' => 'Protect', 'tipo' => 'normal', 'origem' => 'TM17 (Celadon Store)']
        ],
        'papel' => 'Tanque versátil com cobertura especial contra vários tipos.',
        'onde_encontrar' => 'Inicial do jogo (Pallet Town)',
        'evolucoes_anteriores' => [
            ['id' => 7, 'nome' => 'Squirtle'],
            ['id' => 8, 'nome' => 'Wartortle', 'nivel' => 'lv. 16'],
            ['id' => 9, 'nome' => 'Blastoise', 'nivel' => 'lv. 36']
        ]
    ],
    [
        'id' => 63,
        'nome' => 'Alakazam',
        'types' => ['psychic'],
        'movimentos' => [
            ['nome' => 'Psychic', 'tipo' => 'psychic', 'origem' => 'Lv. 38 (como Alakazam)'],
            ['nome' => 'Calm Mind', 'tipo' => 'psychic', 'origem' => 'TM04 (Celadon Store)'],
            ['nome' => 'ThunderPunch', 'tipo' => 'electric', 'origem' => 'Move Tutor (Two Island)'],
            ['nome' => 'Reflect', 'tipo' => 'psychic', 'origem' => 'TM33 (Power Plant)']
        ],
        'papel' => 'Especialista em ataque especial, com muita velocidade.',
        'onde_encontrar' => 'Rota 24 e 25 (próximo a Cerulean City)',
        'evolucoes_anteriores' => [
            ['id' => 63, 'nome' => 'Abra'],
            ['id' => 64, 'nome' => 'Kadabra', 'nivel' => 'lv. 16'],
            ['id' => 65, 'nome' => 'Alakazam', 'nivel' => 'troca']
        ]
    ],
    [
        'id' => 94,
        'nome' => 'Gengar',
        'types' => ['ghost', 'poison'],
        'movimentos' => [
            ['nome' => 'Shadow Ball', 'tipo' => 'ghost', 'origem' => 'TM30 (Pokémon Tower)'],
            ['nome' => 'Thunderbolt', 'tipo' => 'electric', 'origem' => 'TM24 (Game Corner)'],
            ['nome' => 'Hypnosis', 'tipo' => 'psychic', 'origem' => 'Lv. 8 (Gastly)'],
            ['nome' => 'Dream Eater', 'tipo' => 'psychic', 'origem' => 'Lv. 39 (Haunter)']
        ],
        'papel' => 'Status, velocidade e ataque especial devastador.',
        'onde_encontrar' => 'Pokémon Tower (Lavender Town, após o evento do Poké Flute)',
        'evolucoes_anteriores' => [
            ['id' => 92, 'nome' => 'Gastly'],
            ['id' => 93, 'nome' => 'Haunter', 'nivel' => 'lv. 25'],
            ['id' => 94, 'nome' => 'Gengar', 'nivel' => 'troca']
        ]
    ],
    [
        'id' => 58,
        'nome' => 'Arcanine',
        'types' => ['fire'],
        'movimentos' => [
            ['nome' => 'Flamethrower', 'tipo' => 'fire', 'origem' => 'Lv. 49 (Growlithe)'],
            ['nome' => 'Toxic', 'tipo' => 'poison', 'origem' => 'TM06 (Celadon Store)'],
            ['nome' => 'Iron Tail', 'tipo' => 'steel', 'origem' => 'TM23 (Silph Co.)'],
            ['nome' => 'Roar', 'tipo' => 'normal', 'origem' => 'TM05 (Route 4 / Celadon Store)']
        ],
        'papel' => 'Atacante físico rápido com cobertura contra diversos tipos.',
        'onde_encontrar' => 'Rotas 7 e 8 (perto de Celadon City)',
        'evolucoes_anteriores' => [
            ['id' => 58, 'nome' => 'Growlithe'],
            ['id' => 59, 'nome' => 'Arcanine', 'nivel' => 'Fire Stone']
        ]
    ],
    [
        'id' => 84,
        'nome' => 'Dodrio',
        'types' => ['normal', 'flying'],
        'movimentos' => [
            ['nome' => 'Drill Peck', 'tipo' => 'flying', 'origem' => 'Lv. 47 (Dodrio)'],
            ['nome' => 'Return', 'tipo' => 'normal', 'origem' => 'TM27 (alta felicidade)'],
            ['nome' => 'Steel Wing', 'tipo' => 'steel', 'origem' => 'TM47 (Victory Road)'],
            ['nome' => 'Fly', 'tipo' => 'flying', 'origem' => 'HM02 (Route 16)']
        ],
        'papel' => 'Responsável por transporte (Fly) e ataques físicos rápidos.',
        'onde_encontrar' => 'Safari Zone ou Route 16',
        'evolucoes_anteriores' => [
            ['id' => 84, 'nome' => 'Doduo'],
            ['id' => 85, 'nome' => 'Dodrio', 'nivel' => 'lv. 31']
        ]
    ],
    [
        'id' => 133,
        'nome' => 'Jolteon',
        'types' => ['normal'],
        'movimentos' => [
            ['nome' => 'Thunderbolt', 'tipo' => 'electric', 'origem' => 'TM24 (Game Corner)'],
            ['nome' => 'Shadow Ball', 'tipo' => 'ghost', 'origem' => 'TM30 (Pokémon Tower)'],
            ['nome' => 'Substitute', 'tipo' => 'normal', 'origem' => 'TM90 (Safari Zone)'],
            ['nome' => 'Double Kick', 'tipo' => 'fighting', 'origem' => 'Lv. 16']
        ],
        'papel' => 'Velocidade e ataque especial elétrico para cobertura de fraquezas.',
        'onde_encontrar' => 'Celadon Mansion (é dado como presente pelo cientista)',
        'evolucoes_anteriores' => [
            ['id' => 133, 'nome' => 'Eevee'],
            ['id' => 135, 'nome' => 'Jolteon', 'nivel' => 'Thunder Stone']
        ]
    ],
];

?>

<section class="container py-4">
    <h1 class="text-center text-danger mb-4">Pokemon Fire Red</h1>

    <main class="row gy-4 py-5">
        <?php foreach ($timePokemon as $pokemon) { ?>
            <div class="col-12 col-md-6">
                <?= render('meu-time-pokemon', $pokemon) ?>
            </div>
        <?php } ?>
    </main>

    <?= render('detonado') ?>

    <!-- <iframe src="./img/pdf/detonado.pdf" width="100%" height="1000px">
        Este navegador não suporta visualização de PDF.
    </iframe> -->
</section>