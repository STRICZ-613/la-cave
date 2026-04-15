// ================================================================
// script.js — La Cave
// Toute la logique JavaScript du site
// Auteur : Membre 2
// ================================================================

// Variable globale pour stocker les données du vin actuellement ouvert
let vinActuel = {};

// ================================================================
// FONCTION 1 : filtrer(categorie)
// Filtre les cartes de vins par catégorie dans la boutique
// ================================================================
function filtrer(categorie) {
  // Récupérer toutes les cartes de vins
  const cartes = document.querySelectorAll('#grille-boutique [data-categorie]');

  // Afficher ou masquer chaque carte selon la catégorie
  cartes.forEach(function(carte) {
    if (categorie === 'tous' || carte.dataset.categorie === categorie) {
      carte.style.display = 'block';
    } else {
      carte.style.display = 'none';
    }
  });

  // Mettre à jour la classe active sur les boutons de filtre
  const boutons = document.querySelectorAll('.btn-filtre');
  boutons.forEach(function(btn) {
    btn.classList.remove('actif-filtre');
    if (btn.dataset.filtre === categorie || btn.getAttribute('onclick') === "filtrer('" + categorie + "')") {
      btn.classList.add('actif-filtre');
    }
  });
}

// ================================================================
// FONCTION 2 : envoyerMessage()
// Gère l'envoi du formulaire de contact
// ================================================================
function envoyerMessage() {
  // Lire les valeurs des champs
  const nom = document.getElementById('nom').value.trim();
  const email = document.getElementById('email').value.trim();
  const sujet = document.getElementById('sujet').value.trim();
  const message = document.getElementById('message').value.trim();

  // Vérifier que tous les champs sont remplis
  if (!nom || !email || !sujet || !message) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Vérifier que l'email contient un "@"
  if (!email.includes('@')) {
    alert('Adresse email invalide.');
    return;
  }

  // Si tout est OK, confirmer et vider les champs
  alert('Merci ' + nom + ', votre message a bien été envoyé !');
  document.getElementById('nom').value = '';
  document.getElementById('email').value = '';
  document.getElementById('sujet').value = '';
  document.getElementById('message').value = '';
}

// ================================================================
// FONCTION 3 : ouvrirModal(carte)
// Ouvre la modale avec les détails d'un vin
// ================================================================
function ouvrirModal(carte) {
  // Stocker les données du vin dans la variable globale
  vinActuel = carte.dataset;

  // Remplir les éléments de la modale
  document.getElementById('modal-img').src = carte.dataset.image;
  document.getElementById('modal-img').alt = carte.dataset.nom;
  document.getElementById('modal-nom').textContent = carte.dataset.nom;
  document.getElementById('modal-categorie').textContent = carte.dataset.categorie;
  document.getElementById('modal-categorie').className = 'carte-categorie ' + carte.dataset.categorie;
  document.getElementById('modal-type-region').textContent = carte.dataset.type + ' — ' + carte.dataset.region;
  document.getElementById('modal-description').textContent = carte.dataset.description;
  document.getElementById('modal-prix').textContent = carte.dataset.prix;

  // Afficher la modale
  document.getElementById('modal-overlay').classList.add('actif');

  // Bloquer le scroll de la page
  document.body.style.overflow = 'hidden';
}

// ================================================================
// FONCTION 4 : fermerModal()
// Ferme la modale et réactive le scroll
// ================================================================
function fermerModal() {
  // Retirer la classe 'actif' pour masquer la modale
  document.getElementById('modal-overlay').classList.remove('actif');

  // Réactiver le scroll de la page
  document.body.style.overflow = '';
}

// ================================================================
// FONCTION 5 : ajouterPanier(nom, prix, image)
// Ajoute un article au panier stocké dans localStorage
// ================================================================
function ajouterPanier(nom, prix, image) {
  // Lire le panier existant depuis localStorage
  let panier = JSON.parse(localStorage.getItem('panier-lacave')) || [];

  // Chercher si l'article existe déjà dans le panier
  const articleExistant = panier.find(function(article) {
    return article.nom === nom;
  });

  if (articleExistant) {
    // Si l'article existe, augmenter la quantité de 1
    articleExistant.quantite += 1;
  } else {
    // Sinon, ajouter le nouvel article avec quantité 1
    panier.push({
      nom: nom,
      prix: prix,
      image: image,
      quantite: 1
    });
  }

  // Sauvegarder le panier mis à jour dans localStorage
  localStorage.setItem('panier-lacave', JSON.stringify(panier));

  // Mettre à jour le compteur dans la navbar
  mettreAJourCompteurPanier();

  // Afficher le popup de confirmation
  afficherPopup();
}

// ================================================================
// FONCTION 6 : ajouterDepuisModal()
// Ajoute au panier le vin actuellement ouvert dans la modale
// ================================================================
function ajouterDepuisModal() {
  // Appeler ajouterPanier avec les données du vin actuel
  ajouterPanier(vinActuel.nom, vinActuel.prix, vinActuel.image);

  // Fermer la modale
  fermerModal();
}

// ================================================================
// FONCTION 7 : afficherPopup()
// Affiche une notification en bas à droite de l'écran
// ================================================================
function afficherPopup() {
  // Supprimer tout popup existant
  const ancienPopup = document.getElementById('popup-panier');
  if (ancienPopup) {
    ancienPopup.remove();
  }

  // Créer le div du popup
  const popup = document.createElement('div');
  popup.id = 'popup-panier';

  // Contenu du popup : message + lien vers le panier
  popup.innerHTML = '✓ Ajouté au panier <a href="panier.html" style="color:#C9A84C; text-decoration:none; font-weight:bold;">Voir le Panier →</a>';

  // Appliquer les styles inline
  popup.style.position = 'fixed';
  popup.style.background = '#1a1a1a';
  popup.style.color = '#FAF3E0';
  popup.style.padding = '0.75rem 1.25rem';
  popup.style.borderLeft = '3px solid #C9A84C';
  popup.style.fontSize = '0.85rem';
  popup.style.zIndex = '9999';
  popup.style.display = 'flex';
  popup.style.gap = '1rem';
  popup.style.alignItems = 'center';
  popup.style.bottom = '2rem';
  popup.style.right = '2rem';
  popup.style.borderRadius = '4px';
  popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';

  // Ajouter le popup au body
  document.body.appendChild(popup);

  // Supprimer automatiquement après 3 secondes
  setTimeout(function() {
    if (popup.parentNode) {
      popup.remove();
    }
  }, 3000);
}

// ================================================================
// FONCTION 8 : mettreAJourCompteurPanier()
// Met à jour le badge compteur du panier dans la navbar
// ================================================================
function mettreAJourCompteurPanier() {
  // Lire le panier depuis localStorage
  const panier = JSON.parse(localStorage.getItem('panier-lacave')) || [];

  // Calculer le nombre total d'articles (somme des quantités)
  const total = panier.reduce(function(acc, article) {
    return acc + article.quantite;
  }, 0);

  // Mettre à jour l'affichage du compteur
  const compteur = document.getElementById('compteur-panier');
  if (compteur) {
    if (total > 0) {
      compteur.textContent = total;
    } else {
      compteur.textContent = '';
    }
  }
}

// ================================================================
// Initialisation au chargement de la page
// ================================================================
document.addEventListener('DOMContentLoaded', mettreAJourCompteurPanier);
