// ===== BLOG JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeBlogFilters();
    initializeNewsletterForm();
    initializeBlogPagination();
    initializeScrollAnimations();
});

// ===== FILTRES BLOG =====
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les articles
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || category === cardCategory) {
                    showBlogCard(card);
                } else {
                    hideBlogCard(card);
                }
            });
            
            // Réinitialiser les animations
            setTimeout(() => {
                initializeScrollAnimations();
            }, 300);
        });
    });
}

function showBlogCard(card) {
    card.style.display = 'block';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

function hideBlogCard(card) {
    card.style.transition = 'all 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        card.style.display = 'none';
    }, 300);
}

// ===== NEWSLETTER =====
function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', handleNewsletterSubmit);
    }
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput.value.trim();
    
    // Validation email
    if (!isValidEmail(email)) {
        showNewsletterMessage('Veuillez entrer une adresse email valide', 'error');
        return;
    }
    
    // Animation de soumission
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Inscription...';
    submitBtn.disabled = true;
    
    // Simulation d'inscription
    setTimeout(() => {
        console.log('Inscription newsletter:', email);
        showNewsletterMessage('Merci ! Vous êtes maintenant abonnée à notre newsletter.', 'success');
        emailInput.value = '';
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function showNewsletterMessage(message, type) {
    // Supprimer les messages précédents
    const existingMessage = document.querySelector('.newsletter-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = `newsletter-message ${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('newsletterForm');
    form.appendChild(messageDiv);
    
    // Masquer après 5 secondes
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== PAGINATION BLOG =====
function initializeBlogPagination() {
    const paginationBtns = document.querySelectorAll('.blog-pagination .pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Suivant') {
                // Logique pour page suivante
                handleNextPage();
            } else if (!isNaN(this.textContent)) {
                // Changer de page
                const pageNum = parseInt(this.textContent);
                changeBlogPage(pageNum);
                
                // Mettre à jour les boutons actifs
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function changeBlogPage(pageNum) {
    // Animation de chargement
    const blogGrid = document.querySelector('.blog-grid');
    blogGrid.style.opacity = '0.5';
    
    // Scroll vers le haut de la section blog
    document.querySelector('.blog-section').scrollIntoView({
        behavior: 'smooth'
    });
    
    setTimeout(() => {
        // Ici on chargerait les nouveaux articles
        console.log(`Chargement de la page ${pageNum}`);
        blogGrid.style.opacity = '1';
        
        // Réinitialiser les animations
        initializeScrollAnimations();
    }, 500);
}

function handleNextPage() {
    const activePage = document.querySelector('.blog-pagination .pagination-btn.active');
    const currentPage = parseInt(activePage.textContent);
    const nextPage = currentPage + 1;
    
    // Vérifier s'il y a une page suivante
    const nextPageBtn = document.querySelector(`.blog-pagination .pagination-btn[data-page="${nextPage}"]`);
    if (nextPageBtn) {
        nextPageBtn.click();
    }
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
    
    // Observer les cartes de blog visibles
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        if (card.style.display !== 'none') {
            card.classList.remove('animate-in');
            observer.observe(card);
        }
    });
}

// ===== LECTURE D'ARTICLES =====
function initializeReadMore() {
    const readMoreLinks = document.querySelectorAll('.blog-read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation de chargement
            this.textContent = 'Chargement...';
            
            setTimeout(() => {
                // Ici on ouvrirait l'article complet
                // Pour la démo, on affiche juste un message
                showArticleModal(this.closest('.blog-card'));
                this.textContent = 'Lire la suite';
            }, 1000);
        });
    });
}

function showArticleModal(blogCard) {
    const title = blogCard.querySelector('h3').textContent;
    const category = blogCard.querySelector('.blog-category').textContent;
    const author = blogCard.querySelector('.blog-author').textContent;
    const date = blogCard.querySelector('.blog-date').textContent;
    
    const modal = document.createElement('div');
    modal.className = 'article-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="article-header">
                <span class="article-category">${category}</span>
                <h2>${title}</h2>
                <div class="article-meta">
                    <span>${date}</span> • <span>${author}</span>
                </div>
            </div>
            <div class="article-content">
                <p>Ceci est un aperçu de l'article complet. Dans une version complète, le contenu détaillé de l'article serait affiché ici avec des images, des conseils détaillés et des astuces pratiques.</p>
                <p>L'article inclurait des sections comme :</p>
                <ul>
                    <li>Introduction au sujet</li>
                    <li>Conseils pratiques étape par étape</li>
                    <li>Photos illustratives</li>
                    <li>Recommandations de produits</li>
                    <li>Conclusion et conseils finaux</li>
                </ul>
                <p>Pour une implémentation complète, chaque article aurait sa propre page dédiée avec un contenu riche et détaillé.</p>
            </div>
            <div class="article-actions">
                <button class="btn btn-primary" onclick="closeArticleModal()">Fermer</button>
                <a href="rendez-vous.html" class="btn btn-secondary">Prendre Rendez-vous</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
    
    // Fermer en cliquant sur la croix
    modal.querySelector('.modal-close').addEventListener('click', closeArticleModal);
    
    // Fermer en cliquant à l'extérieur
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeArticleModal();
        }
    });
}

function closeArticleModal() {
    const modal = document.querySelector('.article-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// Initialiser les liens "Lire la suite"
document.addEventListener('DOMContentLoaded', initializeReadMore);

// Fermer les modals avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeArticleModal();
    }
});

