// ===== FILTRES PRESTATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceFilters();
});

function initializeServiceFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCategories = document.querySelectorAll('.service-category');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les catégories
            serviceCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                
                if (filter === 'all' || filter === categoryType) {
                    category.style.display = 'block';
                    // Animation d'entrée
                    category.style.opacity = '0';
                    category.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        category.style.transition = 'all 0.3s ease';
                        category.style.opacity = '1';
                        category.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

