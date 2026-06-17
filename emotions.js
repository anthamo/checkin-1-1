// SPDX-License-Identifier: MIT
//
// Schéma d'une famille :
//   name   : nom affiché de la famille (ex. "Joie")
//   angle  : position sur la roue en degrés, sens horaire depuis le haut (0 = haut). 8 familles → pas de 45°.
//   color  : couleur du secteur (#hex). Calibrée WCAG AA avec texte sombre : garder des teintes vives mais lisibles.
//   def    : définition courte (affichée en tooltip au survol).
//   levels : 3 intensités, DANS L'ORDRE [intense, modérée, nuancée]. Chaque niveau :
//     word : le mot (ex. "extase")
//     desc : description situationnelle d'une phrase, au "tu" (écran 2)
//     qs   : 2 pistes de discussion "travail" (sûres, OK toute culture)
//     deep : 1 piste "Pour aller plus loin" (plus intime, le garde-fou émotionnel)

const BRANCHES = [
  { name: "Joie", angle: 0, color: "#f7da45", def: "Ce que tu ressens quand quelque chose va dans le bon sens.", levels: [
    { word: "extase",   desc: "L'emballement quand quelque chose dépasse toutes tes attentes.", qs: ["Quelle est la source de cette énergie ?", "Comment la canaliser dans ton travail ?"], deep: "Qu'est-ce que ça révèle de ce qui te fait vibrer ?" },
    { word: "joie",     desc: "La satisfaction nette quand quelque chose s'est bien passé pour toi.", qs: ["Qu'est-ce qui a nourri ce bien-être ?", "Comment en recréer les conditions ?"], deep: "Qu'est-ce que ça t'apprend sur ce dont tu as besoin ?" },
    { word: "sérénité", desc: "Un calme posé, quand tu sens les choses sous contrôle.", qs: ["Qu'as-tu mis en place pour y arriver ?", "Qu'est-ce qui pourrait fragiliser ce calme ?"], deep: "De quoi as-tu eu besoin pour te sentir enfin posé ?" } ] },
  { name: "Confiance", angle: 45, color: "#5ed485", def: "Le sentiment de pouvoir t'appuyer sur quelqu'un ou quelque chose, sans te méfier.", levels: [
    { word: "admiration",  desc: "L'estime forte que t'inspire ce que quelqu'un fait ou réussit.", qs: ["Qui ou quoi force ton respect en ce moment ?", "Qu'aimerais-tu en apprendre ?"], deep: "Qu'est-ce que ça dit de ce qui compte vraiment pour toi ?" },
    { word: "confiance",   desc: "Le sentiment de pouvoir t'appuyer sur quelqu'un ou quelque chose.", qs: ["Sur qui ou quoi t'appuies-tu ?", "Qu'est-ce qui pourrait l'ébranler ?"], deep: "Qu'est-ce qui te permet de te sentir en sécurité, au fond ?" },
    { word: "acceptation", desc: "Composer sereinement avec une situation que tu ne peux pas changer.", qs: ["Qu'est-ce que tu as réussi à lâcher ?", "Reste-t-il quelque chose à accepter ?"], deep: "Qu'est-ce que ça t'a coûté, émotionnellement ?" } ] },
  { name: "Peur", angle: 90, color: "#66ccbe", def: "Ta réaction face à une menace ou un risque, réel ou pressenti.", levels: [
    { word: "terreur",      desc: "Une peur forte, quand une situation te paraît hors de contrôle.", qs: ["Qu'est-ce qui te semble hors de contrôle ?", "Quel premier petit pas est possible ?"], deep: "De quel soutien aurais-tu vraiment besoin, là ?" },
    { word: "peur",         desc: "L'inquiétude nette face à un risque que tu identifies.", qs: ["Quelle menace identifies-tu, concrètement ?", "Qu'est-ce qui dépend de toi, qu'est-ce qui n'en dépend pas ?"], deep: "Qu'est-ce qui t'aiderait à te sentir plus en sécurité ?" },
    { word: "appréhension", desc: "Une légère inquiétude quand tu sens venir une échéance ou un imprévu.", qs: ["Quelle info te manque pour te rassurer ?", "Qu'est-ce qui nourrit cette inquiétude ?"], deep: "De quoi as-tu peur, vraiment, sous la surface ?" } ] },
  { name: "Surprise", angle: 135, color: "#58aae4", def: "Ce que tu ressens face à l'inattendu, avant même de le juger.", levels: [
    { word: "étonnement",  desc: "Ta réaction à une nouvelle ou un changement que tu n'avais pas vu venir.", qs: ["Qu'est-ce qui t'a pris au dépourvu ?", "Qu'est-ce que ça change pour toi ?"], deep: "Qu'est-ce que cette surprise a remué en toi ?" },
    { word: "surprise",    desc: "Le décalage quand la réalité ne colle pas à ce que tu attendais.", qs: ["Qu'est-ce qui a bousculé tes attentes ?", "Comment t'y adaptes-tu ?"], deep: "Qu'est-ce que tu ressens vraiment face à ça ?" },
    { word: "distraction", desc: "Ton attention détournée par un imprévu ou une sollicitation.", qs: ["Qu'est-ce qui détourne ton attention ?", "Sur quoi aimerais-tu te recentrer ?"], deep: "Cette distraction, c'est un répit ou un évitement ?" } ] },
  { name: "Tristesse", angle: 180, color: "#8074dc", def: "Ce que tu ressens face à une perte, un manque ou une déception.", levels: [
    { word: "chagrin",   desc: "Une peine forte, liée à une perte ou un échec qui te marque.", qs: ["Quelle perte pèse en ce moment ?", "Qu'est-ce qui t'aiderait à avancer ?"], deep: "De quoi aurais-tu besoin pour la traverser, et qui peut t'épauler ?" },
    { word: "tristesse", desc: "Le poids d'un manque ou d'une déception que tu portes.", qs: ["Qu'est-ce qui te manque, là ?", "Qu'est-ce qui te ferait du bien ?"], deep: "Depuis quand tu portes ça, au fond ?" },
    { word: "songerie",  desc: "Un état pensif, où tu te sens un peu en retrait.", qs: ["Vers quoi ton esprit dérive-t-il ?", "As-tu besoin de t'y poser ou d'en sortir ?"], deep: "Qu'est-ce que cette mélancolie essaie de te dire ?" } ] },
  { name: "Dégoût", angle: 225, color: "#cb79d8", def: "Le rejet de ce qui te repousse ou heurte tes valeurs.", levels: [
    { word: "aversion", desc: "Un rejet net face à ce qui heurte tes valeurs.", qs: ["Qu'est-ce que tu ne peux plus supporter ?", "Qu'est-ce que tu veux ne plus accepter ?"], deep: "Quelle valeur profonde se sent touchée ?" },
    { word: "dégoût",   desc: "Le refus de quelque chose qui te paraît inacceptable.", qs: ["Qu'est-ce qui te repousse en ce moment ?", "Quel changement appelle ce rejet ?"], deep: "Est-ce la situation, une personne, ou toi-même ?" },
    { word: "ennui",    desc: "La lassitude quand ce que tu fais n'a plus d'intérêt.", qs: ["Qu'est-ce qui a perdu son intérêt pour toi ?", "De quoi aurais-tu envie à la place ?"], deep: "Qu'est-ce qui te manque vraiment pour te sentir engagé ?" } ] },
  { name: "Colère", angle: 270, color: "#ec7765", def: "Ta réaction quand une limite ou un besoin n'a pas été respecté.", levels: [
    { word: "rage",        desc: "Une colère intense, quand une de tes limites est nettement franchie.", qs: ["Quelle limite a été franchie ?", "Comment l'exprimer sans te nuire ?"], deep: "Qu'est-ce que cette colère cherche à protéger ?" },
    { word: "colère",      desc: "Ta réaction à une situation que tu juges injuste ou irrespectueuse.", qs: ["Qu'est-ce qui t'a mis en colère, précisément ?", "Qu'aimerais-tu demander, et à qui ?"], deep: "Quel besoin n'a pas été respecté ?" },
    { word: "contrariété", desc: "L'agacement que tu contiens face à un irritant qui revient.", qs: ["Quel petit irritant revient ces temps-ci ?", "Vaut-il la peine d'être adressé ?"], deep: "Pourquoi ça t'atteint plus que d'habitude ?" } ] },
  { name: "Anticipation", angle: 315, color: "#f6a131", def: "Ton attention tournée vers ce qui vient, ce que tu attends ou surveilles.", levels: [
    { word: "vigilance",    desc: "L'attention soutenue quand tu surveilles ce qui pourrait arriver.", qs: ["Qu'est-ce que tu surveilles de près ?", "Qu'est-ce qui te permettrait de relâcher ?"], deep: "Cette vigilance te protège, ou elle t'épuise ?" },
    { word: "anticipation", desc: "Ton attente tournée vers une échéance ou une décision à venir.", qs: ["Qu'attends-tu de la suite ?", "Sur quoi peux-tu agir dès maintenant ?"], deep: "Qu'est-ce qui te rendrait plus serein face à l'inconnu ?" },
    { word: "intérêt",      desc: "La curiosité qu'éveille en toi un sujet ou une opportunité.", qs: ["Qu'est-ce qui éveille ta curiosité ?", "Comment lui faire une place cette semaine ?"], deep: "Qu'est-ce que cette curiosité dit de ce qui te porte ?" } ] },
];

// dyades : composites entre deux familles voisines (grille de lecture extérieure, non sélectionnable).
// angle = milieu entre deux familles.
const DYADS = [
  { name: "amour",           angle:  22.5 }, { name: "soumission",      angle:  67.5 },
  { name: "crainte",         angle: 112.5 }, { name: "désappointement", angle: 157.5 },
  { name: "remords",         angle: 202.5 }, { name: "mépris",          angle: 247.5 },
  { name: "agressivité",     angle: 292.5 }, { name: "optimisme",       angle: 337.5 },
];
