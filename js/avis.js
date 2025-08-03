// ===== AVIS JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeRatingInput();
    initializeReviewForm();
    initializePagination();
});

// ===== SYSTÈME D'ÉTOILES =====

function initializeRatingInput() {
    const ratingStars = document.querySelectorAll('.rating-star');
    const ratingInput = document.getElementById('rating');
    let selectedRating = 0;
    
    ratingStars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('mouseleave', function() {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            highlightStars(selectedRating);
            ratingInput.value = selectedRating;
            
            // Animation de confirmation
            star.style.transform = 'scale(1.2)';
            setTimeout(() => {
                star.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    function highlightStars(rating) {
        ratingStars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('filled');
            } else {
                star.classList.remove('filled');
            }
        });
    }
}

// ===== FORMULAIRE D'AVIS =====

function initializeReviewForm() {
    const form = document.getElementById('reviewForm');
    
    if (form) {
        form.addEventListener('submit', handleReviewSubmit);
    }
}

function handleReviewSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validation
    if (!validateReviewForm(form)) {
        return;
    }
    
    const reviewData = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        rating: parseInt(formData.get('rating')),
        comment: formData.get('comment')
    };
    
    // Animation de soumission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi
    setTimeout(() => {
        console.log('Avis soumis:', reviewData);
        showReviewSuccess(reviewData);
        form.reset();
        resetRatingStars();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateReviewForm(form) {
    const name = form.querySelector('#reviewName').value.trim();
    const rating = form.querySelector('#rating').value;
    const comment = form.querySelector('#reviewComment').value.trim();
    
    if (!name) {
        showFormError('Veuillez entrer votre prénom');
        return false;
    }
    
    if (!rating) {
        showFormError('Veuillez donner une note');
        return false;
    }
    
    if (!comment) {
        showFormError('Veuillez écrire un commentaire');
        return false;
    }
    
    if (comment.length < 10) {
        showFormError('Le commentaire doit contenir au moins 10 caractères');
        return false;
    }
    
    return true;
}

function showFormError(message) {
    // Créer ou mettre à jour le message d'erreur
    let errorDiv = document.querySelector('.form-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        document.querySelector('.review-form').prepend(errorDiv);
    }
    
// Nv formulaire 
    ‎document.addEventListener("DOMContentLoaded", function() {
‎    const reviewForm = document.getElementById("reviewForm");
‎    if (reviewForm) {
‎        reviewForm.addEventListener("submit", function(e) {
‎            e.preventDefault();
‎
‎            const reviewerName = document.getElementById("reviewerName").value;
‎            const reviewService = document.getElementById("reviewService").value;
‎            const testimonialText = document.getElementById("testimonialText").value;
‎
‎            if (reviewerName && testimonialText) {
‎                const phoneNumber = "+243894984591"; // Numéro de téléphone WhatsApp
‎                let message = `Nouveau témoignage de ${reviewerName}:\n`;
‎                if (reviewService) {
‎                    message += `Service: ${reviewService}\n`;
‎                }
‎                message += `\n"${testimonialText}"`;
‎                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
‎
‎                window.open(whatsappUrl, "_blank");
‎
‎                // Optionnel: Réinitialiser le formulaire après soumission
‎                reviewForm.reset();
‎                alert("Votre témoignage a été envoyé via WhatsApp. Merci !");
‎            } else {
‎                alert("Veuillez remplir tous les champs obligatoires (Prénom et Témoignage).");
‎            }
‎        });
‎    }
‎});
‎
‎
// ===== PAGINATION =====
function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent === 'Suivant') {
                // Logique pour page suivante
                console.log('Page suivante');
            } else if (!isNaN(this.textContent)) {
                // Changer de page
                const pageNum = parseInt(this.textContent);
                changePage(pageNum);
                
                // Mettre à jour les boutons actifs
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function changePage(pageNum) {
    // Animation de chargement des avis
    const reviewsGrid = document.querySelector('.reviews-grid');
    reviewsGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        // Ici on chargerait les nouveaux avis
        console.log(`Chargement de la page ${pageNum}`);
        reviewsGrid.style.opacity = '1';
    }, 500);
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
    
    // Observer les cartes d'avis
    const reviewCards = document.querySelectorAll('.review-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    [...reviewCards, ...statCards].forEach(card => {
        observer.observe(card);
    });
}

// Initialiser les animations
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// Fermer les modals avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeReviewModal();
    }
});

