"use strict";

// 0 - Préparer votre page HTML - Titres, boutons, div...

// 1 - Initialiser des variables
var tCartes = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
var tDoublons = []; // Contient les 12 images rangées de façon aléatoire
var tCartesTestees = []; // ETP 5 : Contient les cartes retournées en cours de test
var divPlateau = document.getElementById("idPlateau");
var nbCartesTestees = 0; // ETP 5
var nbDoublons = 0; // ETP 7


// 2 - Créer un tableau avec les 12 images de façon aléatoire
tDoublons = tCartes.concat(tCartes);
tDoublons.sort(function() {  return Math.random() - 0.5;  });

console.log(tDoublons);

// 3 - Remplacer les balise <img> "statique" par des balises "img" créées
afficherCartes(tDoublons, divPlateau);

// 4 - Ajouter le dos aux images + event "click" pour les retourner
// (Déjà implémenté dans la fonction `afficherCartes`)

// 5 - Ajout d'un Timer sur la 2nde carte pour cacher les 2 cartes
// (Déjà implémenté dans la fonction `retournerCarte`)

// 6 - Tester si doublon valide (images identiques)
if (tCartesTestees[1].getAttribute("alt") === tCartesTestees[0].getAttribute("alt")) {
    validerCartes();
}

// 7 - Tester si fin de partie
// (sera traité après `validerCartes`)

// 8 - Ajouter un bouton pour redémarrer (à implémenter après)
btn.play
// ---------------- MES FONCTIONS --------------------------

/**
 * ETAPE 3
 * Crée les balises <img> en fonction du tableau passé en paramètre
 * Et les ajoute à l'élément HTML parent passé en paramètre
 */
function afficherCartes(tab, htmlParent) {
    for (let i = 0; i < tab.length; i++) {
        // 3.1 - Créer un élément HTML <img>
        var image = document.createElement("img");
        // 3.2 - Ajouter des attributs HTML
        image.setAttribute("alt", tab[i]);
        image.setAttribute("src", "img/dos.jpg"); // ETAPE 4.1

        // 4.2 - Abonner à l'event "click"
        image.addEventListener("click", retournerCarte); // callback

        // 3.3 - Ajouter <img> dans le plateau
        htmlParent.appendChild(image);
    }
}

/**
 * ETAPE 4
 * Retourne l'image source de l'évènement
 * Si c'est la 2ème carte retournée
 * @param {*} event Evènement origine du "click"
 */
function retournerCarte(event) {
    console.log(event.target); // event.srcElement (déprécié)
    // Récupère la balise <img> source de l'évènement "click"
    var image = event.target;

    // Récupère la valeur de son attribut "alt"
    var alt = image.getAttribute("alt");

    // Modifier l'attribut "src"
    image.setAttribute("src", "img/" + alt);

    // ETAPE 5

    // 5.1 - Désactiver la carte
    nbCartesTestees++;
    image.removeEventListener("click", retournerCarte);

    // 5.2 - Sauvegarde de la carte retournée
    tCartesTestees.push(image);

    // 5.3 - Lancement du Timer
    if (nbCartesTestees === 2) {
        setTimeout(cacheCartes, 2000);
    }
}

function testDoublons() {
    var alt1 = tCartesTestees[0].getAttribute("alt");
    var alt2 = tCartesTestees[1].getAttribute("alt");
    if (alt1 === alt2) {
       tCartesTestees = [];
       nbCartesTestees = 0;
       nbDoublons++; 
    }
}

/**
 * ETAPE 5
 * Retourne les cartes testées
 */
function cacheCartes() {
    console.log("cacheCartes");

    // 6.1 - Tester si les deux cartes retournées sont identiques
    if (tCartesTestees[0].getAttribute("alt") === tCartesTestees[1].getAttribute("alt")) {
        validerCartes();
    } else {
        // Cache les cartes testées si elles ne sont pas identiques
        tCartesTestees[0].setAttribute("src", "img/dos.jpg");
        tCartesTestees[1].setAttribute("src", "img/dos.jpg");

        // Réabonner les images pour pouvoir les retourner à nouveau
        tCartesTestees[0].addEventListener("click", retournerCarte);
        tCartesTestees[1].addEventListener("click", retournerCarte);
    }

    // 6.2 - Dans tous les cas, vider le tableau et réinitialiser le compteur
    tCartesTestees = [];
    nbCartesTestees = 0;
}

/**
 * ETAPE 6
 * Valide les cartes identiques et vérifie la fin de partie
 */
function validerCartes() {
    console.log("validerCartes");

    // 6.1 - Les cartes sont identiques, désactivation définitive du clic
    tCartesTestees[0].removeEventListener("click", retournerCarte);
    tCartesTestees[1].removeEventListener("click", retournerCarte);

    // Incrémenter le nombre de paires trouvées
    nbDoublons++;

    // 7 - Tester si fin de partie
    if (nbPairesTrouvees === tCartes.length) {
        alert("Félicitations, vous avez trouvé toutes les paires !");
        // Ici, vous pouvez ajouter du code pour redémarrer la partie si nécessaire
    }

    // 6.2 - Vider le tableau des cartes testées et réinitialiser le compteur
    tCartesTestees = [];
    nbCartesTestees = 0;
}

functiontestFinPartie() {
    if (nbDoublons === tCartes.length) {
        console.log("Bravo, vous avez fini");
    }    
    
}