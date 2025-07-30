// JavaScript para navegação por teclado na página de detalhes
document.addEventListener('DOMContentLoaded', function() {
    // Navegação por teclado
    document.addEventListener('keydown', function(event) {
        const currentId = parseInt(window.location.search.match(/id=(\d+)/)?.[1]);
        
        if (!currentId) return;
        
        switch(event.key) {
            case 'ArrowLeft':
                // Ir para o Pokémon anterior
                if (currentId > 1) {
                    window.location.href = `pokemon-detalhes?id=${currentId - 1}`;
                }
                break;
                
            case 'ArrowRight':
                // Ir para o próximo Pokémon
                if (currentId < 1025) {
                    window.location.href = `pokemon-detalhes?id=${currentId + 1}`;
                }
                break;
                
            case 'Escape':
                // Voltar para a Pokédex
                window.location.href = 'index';
                break;
        }
    });
    
    // Inicializar tooltips do Bootstrap se disponível
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Animações suaves para as barras de estatísticas
    const statBars = document.querySelectorAll('.progress-bar');
    statBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });
    
    // Adicionar efeito de hover nas badges de tipo
    const typeBadges = document.querySelectorAll('.type-badge');
    typeBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Função para adicionar/remover Pokémon dos favoritos na página de detalhes
function toggleFavorite(id) {
    const lista = sessionStorage.getItem('pokemonsSalvos');
    const pokemons = lista ? JSON.parse(lista) : [];
    
    const btn = document.querySelector('.btn-salvar');
    const icon = btn.querySelector('i');
    
    if (pokemons.includes(id)) {
        // Remover dos favoritos
        const index = pokemons.indexOf(id);
        pokemons.splice(index, 1);
        sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
        
        btn.classList.remove('salvo');
        icon.className = 'bi bi-bookmark';
        btn.setAttribute('onclick', `toggleFavorite(${id})`);
        
        // Mostrar feedback
        showToast('Pokémon removido dos favoritos', 'info');
    } else {
        // Adicionar aos favoritos
        pokemons.push(id);
        sessionStorage.setItem('pokemonsSalvos', JSON.stringify(pokemons));
        
        btn.classList.add('salvo');
        icon.className = 'bi bi-bookmark-fill';
        btn.setAttribute('onclick', `toggleFavorite(${id})`);
        
        // Mostrar feedback
        showToast('Pokémon adicionado aos favoritos', 'success');
    }
}

// Função para mostrar notificações toast
function showToast(message, type = 'info') {
    // Criar o toast se não existir
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="bi bi-${type === 'success' ? 'check-circle-fill text-success' : 'info-circle-fill text-info'} me-2"></i>
                <strong class="me-auto">Pokédex</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    const toastElement = document.getElementById(toastId);
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remover o toast após ser escondido
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    } else {
        // Fallback se Bootstrap não estiver disponível
        setTimeout(() => {
            toastElement.remove();
        }, 3000);
    }
}
