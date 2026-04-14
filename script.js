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
            // Afficher la carte
            carte.style.display = 'block';
        } else {
            // Cacher la carte
            carte.style.display = 'none';
        }
    });

    // 3. Gérer l'apparence des boutons (classe active)
    boutons.forEach(btn => {
        // On retire la classe active de tous les boutons
        btn.classList.remove('actif-filtre');
        
        // On l'ajoute uniquement au bouton cliqué (via son attribut onclick)
        // Note : Cette approche suppose que le bouton cliqué déclenche la fonction
        if (btn.getAttribute('onclick').includes(categorie)) {
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
    if (nom.value.trim() === "" || email.value.trim() === "" || 
        sujet.value.trim() === "" || message.value.trim() === "") {
        alert("Erreur : Veuillez remplir tous les champs du formulaire.");
        return; // On arrête la fonction ici
    }

    // 3. Vérification du format de l'email (présence du @)
    if (!email.value.includes('@')) {
        alert("Erreur : Veuillez entrer une adresse email valide (doit contenir un @).");
        return;
    }

    // 4. Succès : Affichage du message de confirmation
    alert("Merci " + nom.value + ", votre message a bien été envoyé !");

    // 5. Vider les champs après l'envoi
    nom.value = "";
    email.value = "";
    sujet.value = "";
    message.value = "";
}