// Funcionalidade da Galeria de Imagens
document.addEventListener('DOMContentLoaded', function() {
    // Filtros da galeria
    const filterButtons = document.querySelectorAll('.gallery-filters .btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        if (item.classList.contains('hidden')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
    
    // Modal da galeria
    const galeriaModal = document.getElementById('galeriaModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('galeriaModalLabel');
    
    if (galeriaModal) {
        galeriaModal.addEventListener('show.bs.modal', function(event) {
            const trigger = event.relatedTarget;
            const imageUrl = trigger.getAttribute('data-image-url');
            const imageTitle = trigger.getAttribute('data-image-title');
            
            modalImage.src = imageUrl;
            modalImage.alt = imageTitle;
            modalTitle.textContent = imageTitle;
        });
        
        // Navegação com teclado no modal
        galeriaModal.addEventListener('shown.bs.modal', function() {
            document.addEventListener('keydown', modalKeyNavigation);
        });
        
        galeriaModal.addEventListener('hidden.bs.modal', function() {
            document.removeEventListener('keydown', modalKeyNavigation);
        });
    }
    
    function modalKeyNavigation(event) {
        if (!galeriaModal.classList.contains('show')) return;
        
        const currentImage = modalImage.src;
        const galleryImages = Array.from(document.querySelectorAll('.gallery-image:not(.hidden)'));
        const currentIndex = galleryImages.findIndex(img => img.src === currentImage);
        
        if (event.key === 'ArrowLeft' && currentIndex > 0) {
            event.preventDefault();
            const prevImage = galleryImages[currentIndex - 1];
            modalImage.src = prevImage.src;
            modalImage.alt = prevImage.alt;
            modalTitle.textContent = prevImage.getAttribute('data-image-title');
        } else if (event.key === 'ArrowRight' && currentIndex < galleryImages.length - 1) {
            event.preventDefault();
            const nextImage = galleryImages[currentIndex + 1];
            modalImage.src = nextImage.src;
            modalImage.alt = nextImage.alt;
            modalTitle.textContent = nextImage.getAttribute('data-image-title');
        } else if (event.key === 'Escape') {
            event.preventDefault();
            const modal = bootstrap.Modal.getInstance(galeriaModal);
            modal.hide();
        }
    }
    
    // Lazy loading para imagens
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.gallery-image[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
});
