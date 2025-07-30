// ===== RENDEZ-VOUS JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAppointmentForm();
    setMinDate();
});

// ===== FORMULAIRE DE RENDEZ-VOUS =====
function initializeAppointmentForm() {
    const form = document.getElementById('appointmentForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Validation en temps réel
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // Validation complète du formulaire
    if (!validateForm(form)) {
        return;
    }
    
    // Animation de chargement
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    
    // Collecte des données
    const formData = new FormData(form);
    const appointmentData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        service: formData.get('service'),
        stylist: formData.get('stylist'),
        date: formData.get('date'),
        time: formData.get('time'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on'
    };
    
    // Simulation d'envoi (remplacer par vraie logique)
    setTimeout(() => {
        console.log('Données de rendez-vous:', appointmentData);
        
        // Afficher le message de succès
        showSuccessMessage(appointmentData);
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Restaurer le bouton
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Supprimer les erreurs précédentes
    clearFieldError(e);
    
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
            
        case 'tel':
            if (field.required && !value) {
                errorMessage = 'Le numéro de téléphone est obligatoire';
                isValid = false;
            } else if (value && !isValidPhone(value)) {
                errorMessage = 'Format de téléphone invalide';
                isValid = false;
            }
            break;
            
        case 'email':
            if (value && !isValidEmail(value)) {
                errorMessage = 'Format d\'email invalide';
                isValid = false;
            }
            break;
            
        case 'date':
            if (field.required && !value) {
                errorMessage = 'La date est obligatoire';
                isValid = false;
            } else if (value && new Date(value) < new Date().setHours(0,0,0,0)) {
                errorMessage = 'La date ne peut pas être dans le passé';
                isValid = false;
            }
            break;
            
        case 'checkbox':
            if (field.required && !field.checked) {
                errorMessage = 'Vous devez accepter les conditions';
                isValid = false;
            }
            break;
    }
    
    // Validation pour les select
    if (field.tagName === 'SELECT' && field.required && !value) {
        errorMessage = 'Veuillez faire une sélection';
        isValid = false;
    }
    
    // Afficher l'erreur si nécessaire
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
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

function clearFieldError(e) {
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

function setMinDate() {
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }
}

function showSuccessMessage(data) {
    // Créer le modal de succès
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="success-modal-content">
            <div class="success-icon">✅</div>
            <h3>Rendez-vous Confirmé !</h3>
            <p>Merci ${data.firstName}, votre demande de rendez-vous a été envoyée avec succès.</p>
            <div class="appointment-summary">
                <p><strong>Service :</strong> ${getServiceName(data.service)}</p>
                <p><strong>Date :</strong> ${formatDate(data.date)}</p>
                <p><strong>Heure :</strong> ${data.time}</p>
            </div>
            <p class="success-note">Nous vous contacterons dans les plus brefs délais pour confirmer votre créneau.</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">Parfait !</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animation d'apparition
    setTimeout(() => {
        modal.classList.add('active');
    }, 100);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

function getServiceName(serviceValue) {
    const services = {
        'coupe': 'Coupe Moderne',
        'coupe-couleur': 'Coupe + Coloration',
        'coloration': 'Coloration Seule',
        'soins': 'Soins Capillaires',
        'tresses': 'Tresses Africaines',
        'extensions': 'Extensions',
        'evenement': 'Coiffure Événement',
        'forfait-decouverte': 'Forfait Découverte',
        'forfait-elegance': 'Forfait Élégance',
        'forfait-prestige': 'Forfait Prestige'
    };
    
    return services[serviceValue] || serviceValue;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Fermer le modal avec Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSuccessModal();
    }
});

