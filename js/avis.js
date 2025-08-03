/*document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const reviewerName = document.getElementById('reviewerName').value;
            const testimonialText = document.getElementById('testimonialText').value;

            if (reviewerName && testimonialText) {
                const phoneNumber = '+243894984591'; // Numéro de téléphone WhatsApp
                const message = `Nouveau témoignage de ${reviewerName}:\n\n"${testimonialText}"`;
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

                window.open(whatsappUrl, '_blank');

                // Optionnel: Réinitialiser le formulaire après soumission
                reviewForm.reset();
                alert('Votre témoignage a été envoyé via WhatsApp. Merci !');
            } else {
                alert('Veuillez remplir tous les champs obligatoires (Prénom et Témoignage).');
            }
        });
    }
});
*/


