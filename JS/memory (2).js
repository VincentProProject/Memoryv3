    "use strict";

    // 0 - Préparer votre page HTML - Titres, boutons, div...

    // 1 - Initialiser des variables
    var divPlateau = document.getElementById("idPlateau");
    var btnPlay = document.getElementById("idBtn");
    var titre = document.getElementsByTagName("h1")[0];
   
    var tCartes = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];
    var tDoublons = []; // Contient les 12 images rangées de façon aléatoire
    var tCartesTestees = []; // ETP 5 : Contient les cartes retournées en cours de test
    var nbCartesTestees = 0; // ETP 5
    var nbPairesValides = 0; // ETP 7
    var timerDuree = undefined; // ETP 9 Pour lancer le temps passé
    var duree = 0; // Pour compter le temps passé (en secondes)

/* ETAPE 8
    // 2 - Créer un tableau avec les 12 images de façon aléatoire
    //     (voir méthode sort() sur internet avec un tri aléatoire)
    tDoublons = tCartes.concat(tCartes);
    tDoublons.sort(function() {  return Math.random() - 0.5;  });

console.log(tDoublons);

    // 3 - Remplacer les balise <img> "statique" par des balises "img" créées
    //     en JS (voir méthodes createElement() ... )
    afficherCartes(tDoublons, divPlateau);
*/    

    // 4 - Ajouter le dos aux images + event "click" pour les retourner
    //     (Echange le dos par l'image)

    // 5 - Ajout d'un Timer sur la 2nde carte pour cacher les 2 cartes
    //     (fonction setTimeOut())

    // 6 - Tester si doublon valide (images identiques)
    //     (bloquer le Timer ou ne pas déclencher le Timer ...)

    // 7 - Tester si fin de partie
    //     (idées : 2ème tableau avec les images retournées ???)

    // 8 - Ajouter un bouton pour redémarrer.
    btnPlay.addEventListener("click", init);

// ---------------- MES FONCTIONS --------------------------

    /**
     * ETAPE 3
     * Crée les balises <img> en fonction du tableau passé en paramètre
     * Et les ajoute à l'élément HTML parent passé en paramètre
     * @param {*} tab tableau des fichiers images
     * @param {*} htmlParent div conteneur
     */
    function afficherCartes(tab, htmlParent) {
        // Vider le plateau
        htmlParent.innerHTML = "";

        for (let i=0; i < tDoublons.length; i++) {
            // 3.1 - Créer un élément HTML <img>
            var eltImage = document.createElement("img");
            // 3.2 - Ajouter des attributs HTML
            eltImage.setAttribute("alt", tab[i]);
            // eltImage.setAttribute("src", "images/" + tab[i]);
            eltImage.setAttribute("src", "images/dos.jpg"); // ETAPE 4.1

            // 4.2 - Abonner à l'event "click"
            eltImage.addEventListener("click", retournerCarte); // callback

            // 3.3 - Ajouter <img> dans le plateau
            htmlParent.appendChild(eltImage);

//console.log(eltImage);
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

        // Lancer le Timer de durée
        if (!timerDuree) {
            timerDuree = setInterval(afficheDuree, 1000);
        }

        if (nbCartesTestees < 2) {

            // Récupère la balise <img> source de l'évènement "click"
            var eltImage = event.target;
            
            // Récupère la valeur de son attribut "alt"
            var alt = eltImage.getAttribute("alt");
            //var alt = eltImage.alt;  IDEM getAttribute()

            // Modifier l'attribut "src"
            eltImage.setAttribute("src", "images/" + alt);

            // ETAPE 5
            // 5.1 - Désactiver la carte
            nbCartesTestees++;
            eltImage.removeEventListener("click", retournerCarte);
            
            // 5.1 BIS - OU tester si carte déja retournée
            // if (eltImage.src.includes("dos.jpg")) {
            //     nbCartesTestees++;
            // }

            // 5.2 - Sauvegarde de la carte retournée
            tCartesTestees.push(eltImage);

            // 5.3 - Lancer le test "Doublon ?"
            if (nbCartesTestees == 2) {
                testDoublons();
            }
        }
        
    }

    /**
     * ETAPE 6
     * Test si les 2 cartes ont une image identique sinon lance le Timer pour
     * les cacher après 2 secondes
     */
    function testDoublons() {
        // Test si les 2 cartes ont la même image
        var alt1 = tCartesTestees[0].getAttribute("alt");
        var alt2 = tCartesTestees[1].getAttribute("alt");
        // if (tCartesTestees[0].alt === tCartesTestees[1].alt) {
        if (alt1 === alt2) {
            tCartesTestees = []; // vide le tableau
            nbCartesTestees = 0;
            nbPairesValides++;
console.log(nbPairesValides);
            // ETAPE 7 - Test Fin de partie
            testFinPartie();
        } else {
            // 5.3 - Lancer le timer
            setTimeout(cacheCartes, 2000);
        }
    }
    
    /**
     * ETAPE 5
     * Retourne les cartes testées
     */
    function cacheCartes() {
        console.log("cacheCartes");

        //console.log(tCartesTestees);

        // Cache les cartes testées
        tCartesTestees[0].setAttribute("src", "images/dos.jpg");
        tCartesTestees[1].setAttribute("src", "images/dos.jpg");

        // Abonner à nouveau les images
        tCartesTestees[0].addEventListener("click", retournerCarte);
        tCartesTestees[1].addEventListener("click", retournerCarte);

        // Vide le tableau
        tCartesTestees = [];

        // Réinitialiser le compteur
        nbCartesTestees = 0;
    }

    /**
     * ETAPE 7
     * Test si fin de partie
     */
    function testFinPartie() {
        if (nbPairesValides === tCartes.length) {
            clearInterval(timerDuree); // Stopper le Timer
            timerDuree = undefined;
            titre.innerText = "BRAVO, vous avez gagné en " + duree + " secondes";
            btnPlay.innerText = "Redémarrer";
            
        }
    }
   
    /** ETAPE 8
     * Lance une nouvelle partie
     */
    function init() {
        tCartesTestees = []; // ETP 5 : Contient les cartes retournées en cours de test
        nbCartesTestees = 0; // ETP 5
        nbPairesValides = 0; // ETP 7
        duree = 0;           // ETP 9
    
        titre.innerText = "Cliquez sur une carte";

        tDoublons = tCartes.concat(tCartes);
        tDoublons.sort(function() {  return Math.random() - 0.5;  });
console.log(tDoublons);

        afficherCartes(tDoublons, divPlateau);
    }

    /**
     * ETAPE 9
     */
    function afficheDuree() {
console.log("afficheDuree");
        titre.innerText = duree++;
    }
    