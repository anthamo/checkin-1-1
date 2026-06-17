# Check-in 1:1

Une **roue des émotions** interactive pour ouvrir un 1:1. La personne choisit jusqu'à 2 émotions qui décrivent son humeur du moment, et repart avec des pistes de discussion pour creuser chacune.

🔗 **Démo** : https://anthamo.github.io/checkin-1-1/

## Pourquoi

En début de 1:1 (ou de réunion), poser une météo émotionnelle aide chacun à prendre en compte l'état de la personne en face, sans surinterpréter. La version "image zoomée sur Notion" était pénible. Celle-ci est cliquable, lisible, et débouche sur une vraie amorce de conversation.

Le **consentement est explicite** : on entre par un sas où l'on peut passer son tour. Un check-in émotionnel ne se subit pas.

## Le parcours (4 écrans)

1. **Sas** : « Prêt·e à partager tes émotions ? » → se lancer, ou passer son tour.
2. **Roue** : 8 familles d'émotions (roue de Plutchik). On survole pour lire une définition, on clique pour choisir.
3. **Intensité** : chaque famille s'ouvre sur ses 3 niveaux (ex. sérénité / joie / extase).
4. **Récap** : les émotions choisies + des pistes de discussion par émotion (2 orientées travail, 1 plus intime). Copiable pour coller dans une note de 1:1.

## Lancer

Aucune installation, aucun build. **Ouvre `index.html`** (double-clic) ou sers le dossier avec n'importe quel serveur statique :

```
python3 -m http.server
```

## Éditer le contenu

Tout le contenu éditorial (familles, définitions, pistes de discussion) vit dans **`emotions.js`**, séparé de la logique. Le schéma est documenté en tête du fichier : tu peux retoucher un mot ou une question sans toucher au code de la roue.

## Stack

- HTML / CSS / JS, **un seul fichier** (`index.html`) + les données (`emotions.js`).
- SVG généré à la volée pour la roue. Police [Archivo](https://fonts.google.com/specimen/Archivo).
- Zéro dépendance, zéro build. Couleurs calibrées WCAG AA.
- Design system « Hot Magenta », partagé avec [Referandom](https://github.com/anthamo/Referandom).

## Licence

MIT · par [anthamo](https://github.com/anthamo)
