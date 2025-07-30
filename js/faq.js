// ===== FAQ JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQAccordions();
    initializeFAQFilters();
    initializeScrollAnimations();
});

// ===== ACCORDÉONS FAQ =====
function initializeFAQAccordions() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Fermer tous les autres accordéons
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    closeAccordion(otherItem);
                }
            });
            
            // Basculer l'accordéon actuel
            if (isOpen) {
                closeAccordion(item);
            } else {
                openAccordion(item);
            }
        });
    });
}

function openAccordion(item) {
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    item.classList.add('active');
    toggle.textContent = '−';
    
    // Animation d'ouverture
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.opacity = '1';
    answer.style.paddingTop = '1rem';
}

function closeAccordion(item) {
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    item.classList.remove('active');
    toggle.textContent = '+';
    
    // Animation de fermeture
    answer.style.maxHeight = '0';
    answer.style.opacity = '0';
    answer.style.paddingTop = '0';
}

// ===== FILTRES FAQ =====
function initializeFAQFilters() {
    const filterButtons = document.querySelectorAll('.faq-category-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Fermer tous les accordéons
            faqItems.forEach(item => closeAccordion(item));
            
            // Filtrer les questions
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || category === itemCategory) {
                    showFAQItem(item);
                } else {
                    hideFAQItem(item);
                }
            });
            
            // Réinitialiser les animations
            setTimeout(() => {
                initializeScrollAnimations();
            }, 300);
        });
    });
}

function showFAQItem(item) {
    item.style.display = 'block';
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, 100);
}

function hideFAQItem(item) {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '0';
    item.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        item.style.display = 'none';
    }, 300);
}

// ===== ANIMATIONS AU SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments FAQ visibles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        if (item.style.display !== 'none') {
            item.classList.remove('animate-in');
            observer.observe(item);
        }
    });
}

// ===== RECHERCHE FAQ =====
function initializeFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                    showFAQItem(item);
                    
                    // Surligner les termes trouvés
                    if (searchTerm.length > 2) {
                        highlightSearchTerm(item, searchTerm);
                    }
                } else {
                    hideFAQItem(item);
                }
            });
            
            // Si recherche vide, afficher toutes les questions
            if (searchTerm === '') {
                faqItems.forEach(item => {
                    showFAQItem(item);
                    removeHighlight(item);
                });
            }
        });
    }
}

function highlightSearchTerm(item, term) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer');
    
    // Fonction pour surligner le texte
    function highlight(element) {
        const text = element.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        const highlightedText = text.replace(regex, '<mark>$1</mark>');
        element.innerHTML = highlightedText;
    }
    
    highlight(question);
    highlight(answer);
}

function removeHighlight(item) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer');
    
    // Supprimer les balises mark
    question.innerHTML = question.textContent;
    answer.innerHTML = answer.textContent;
}

// ===== NAVIGATION CLAVIER =====
document.addEventListener('keydown', function(e) {
    const faqItems = document.querySelectorAll('.faq-item:not([style*="display: none"])');
    const activeItem = document.querySelector('.faq-item.active');
    
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        let currentIndex = -1;
        if (activeItem) {
            currentIndex = Array.from(faqItems).indexOf(activeItem);
        }
        
        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = currentIndex + 1;
            if (nextIndex >= faqItems.length) nextIndex = 0;
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = faqItems.length - 1;
        }
        
        if (faqItems[nextIndex]) {
            // Fermer l'accordéon actuel
            if (activeItem) {
                closeAccordion(activeItem);
            }
            
            // Ouvrir le nouvel accordéon
            openAccordion(faqItems[nextIndex]);
            
            // Scroll vers l'élément
            faqItems[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    // Fermer avec Escape
    if (e.key === 'Escape' && activeItem) {
        closeAccordion(activeItem);
    }
});

// Initialiser la recherche si l'élément existe
document.addEventListener('DOMContentLoaded', initializeFAQSearch);

