// ===== CONTACT JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeAnimations();
});

// ===== FORMULAIRE DE CONTACT =====
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateContactField);
            input.addEventListener('input', clearContactFieldError);
        });
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validation complète
    if (!validateContactForm(form)) {
        return;
    }
    
    // Animation de chargement
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Collecte des données
    const formData = new FormData(form);
    const contactData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Simulation d'envoi
    setTimeout(() => {
        console.log('Message de contact envoyé:', contactData);
        showContactSuccess(contactData);
        form.reset();
        
        // Restaurer le bouton
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }, 2000);
}

function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateContactField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateContactField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Supprimer les erreurs précédentes
    clearContactFieldError(e);
    
    // Validation selon le type de champ
    switch (field.type) {
        case 'text':
            if (field.required && !value) {
                errorMessage = 'Ce champ est obligatoire';
                isValid = false;
            } else if (value && value.length < 2) {
                errorMessage = 'Minimum 2 caractères requis';
                isValid = false;
            }
            break;
            
        case 'email':
            if (field.required && !value) {
                errorMessage = 'L\'email est obligatoire';
                isValid = false;
            } else if (value && !isValidEmail(value)) {
                errorMessage = 'Format d\'email invalide';
                isValid = false;
            }
            break;
            
        case 'tel':
            if (value && !isValidPhone(value)) {
                errorMessage = 'Format de téléphone invalide';
                isValid = false;
            }
            break;
            
        case 'checkbox':
            if (field.required && !field.checked) {
                errorMessage = 'Vous devez accepter cette condition';
                isValid = false;
            }
            break;
    }
    
    // Validation pour les select et textarea
    if (field.tagName === 'SELECT' && field.required && !value) {
        errorMessage = 'Veuillez faire une sélection';
        isValid = false;
    }
    
    if (field.tagName === 'TEXTAREA' && field.required && !value) {
        errorMessage = 'Le message est obligatoire';
        isValid = false;
    } else if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        errorMessage = 'Le message doit contenir au moins 10 caractères';
        isValid = false;
    }
    
    // Afficher l'erreur si nécessaire
    if (!isValid) {
        showContactFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showContactFieldError(field, message) {
    field.classList.add('error');
    
    // Créer ou mettre à jour le message d'erreur
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearContactFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
    return phoneRegex.test(phone);
}

function showContactSuccess(data) {
    const modal = document.createElement('div');
    modal.className = 'contact-success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="success-icon">✅</div>
            <h3>Message Envoyé !</h3>
            <p>Merci ${data.firstName}, votre message a été envoyé avec succès.</p>
            <div class="contact-summary">
                <p><strong>Sujet :</strong> ${getSubjectName(data.subject)}</p>
                <p><strong>Email :</strong> ${data.email}</p>
            </div>
            <p class="success-note">Nous vous répondrons dans les plus brefs délais, généralement sous 24h.</p>
            <button class="btn btn-primary" onclick="closeContactModal()">Parfait !</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

function closeContactModal() {
    const modal = document.querySelector('.contact-success-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function getSubjectName(subjectValue) {
    const subjects = {
        'rdv': 'Prise de rendez-vous',
        'info': 'Demande d\'information',
        'tarifs': 'Questions sur les tarifs',
        'services': 'Nos services',
        'reclamation': 'Réclamation',
        'autre': 'Autre'
    };
    
    return subjects[subjectValue] || subjectValue;
}

// ===== ANIMATIONS =====
function initializeAnimations() {
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
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll(
        '.contact-card, .quick-contact-card, .faq-item'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Fermer les modals avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeContactModal();
    }
});

