# Maison Durand

Site vitrine consacré aux pruneaux d'Agen : verger, savoir-faire, produits et témoignages. Réalisation RZU Informatique en HTML, CSS et JavaScript.

[Voir le site](https://rzu-it.github.io/maison-durand.fr/)

![Verger Maison Durand](assets/images/verger-prunes.jpg)

## Organisation

Le site tient dans `index.html`. Les fichiers `assets/styles/` et `assets/scripts/` séparent la présentation, la navigation et les interactions. Les éléments communs sont dans `partials/`.

## Consultation locale

Avec Python installé, lancer depuis la racine :

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Ouvrir <http://127.0.0.1:8000/>. Une ouverture directe en `file://` ne permet pas de charger les partials.

Publication statique sur GitHub Pages, sans serveur applicatif.

## Consultation et réutilisation

Ce site est une démonstration réalisée par **RZU Informatique**. Vous pouvez le consulter et explorer les sources. Pour reprendre le code, le design ou les contenus dans un autre projet, merci de demander une autorisation préalable.

Les éléments tiers conservent leurs droits et licences respectifs.
