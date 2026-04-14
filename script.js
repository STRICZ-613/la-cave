/**
 * PROJET LA CAVE - script.js
 * Rôle : Membre 2 (Interactivité du site)
 */

// --- FONCTION 1 : Filtre de la boutique ---
function filtrer(categorie) {
    // 1. Récupérer toutes les cartes de vin et les boutons
    const cartes = document.querySelectorAll('.carte-vin');
    const boutons = document.querySelectorAll('.btn-filtre');

    // 2. Gérer l'affichage des cartes
    cartes.forEach(carte => {
        const categorieCarte = carte.getAttribute('data-categorie');

        if (categorie === 'tous' || categorie === categorieCarte) {
            // Afficher la carte avec un petit effet de transition
            carte.style.display = 'block';
            carte.style.opacity = 1;
        } else {
            // Cacher la carte avec effet fondu
            carte.style.opacity = 0;
            setTimeout(() => {
                carte.style.display = 'none';
            }, 300); // délai pour laisser l’effet se jouer
        }
    });

    // 3. Gérer l'apparence des boutons (classe active)
    boutons.forEach(btn => {
        btn.classList.remove('actif-filtre');
        // Vérification plus robuste : comparer directement la valeur du data-categorie
        if (btn.dataset.categorie === categorie) {
            btn.classList.add('actif-filtre');
        }
    });
}

// --- FONCTION 2 : Validation du formulaire de contact ---
function envoyerMessage() {
    // 1. Récupération des éléments HTML
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');

    // 2. Vérification que les champs ne sont pas vides
    if (!nom.value.trim() || !email.value.trim() || 
        !sujet.value.trim() || !message.value.trim()) {
        alert("Erreur : Veuillez remplir tous les champs du formulaire.");
        return;
    }

    // 3. Vérification du format de l'email avec regex plus robuste
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        alert("Erreur : Veuillez entrer une adresse email valide.");
        return;
    }

    // 4. Succès : Affichage du message de confirmation
    alert(`Merci ${nom.value}, votre message a bien été envoyé !`);

    // 5. Vider les champs après l'envoi
    [nom, email, sujet, message].forEach(input => input.value = "");

    // 6. Effet spécial : petite animation de confirmation
    const confirmation = document.createElement('div');
    confirmation.textContent = "✔ Message envoyé avec succès !";
    confirmation.style.position = "fixed";
    confirmation.style.bottom = "20px";
    confirmation.style.right = "20px";
    confirmation.style.background = "#4CAF50";
    confirmation.style.color = "white";
    confirmation.style.padding = "10px 25px";
    confirmation.style.borderRadius = "5px";
    confirmation.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
    confirmation.style.zIndex = "1000";
    document.body.appendChild(confirmation);

    setTimeout(() => {
        confirmation.style.opacity = "0";
        setTimeout(() => confirmation.remove(), 500);
    }, 2000);
}
