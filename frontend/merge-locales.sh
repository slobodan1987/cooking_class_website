#!/bin/bash

# Podesi koji je glavni jezik (ide na root /)
DEFAULT_LANG="hr"

# Ostali jezici koji idu u poddirektorijume
OTHER_LANGS=("en-US" "de" "fr" "it" "es" "cs")

# Očisti i pripremi dist/cooking_class_website/merged
rm -rf dist/cooking_class_website/merged
mkdir -p dist/cooking_class_website/merged
echo "✅ dist/cooking_class_website/merged rekreiran"

# HR u root (kao default)
cp -r dist/cooking_class_website/browser/$DEFAULT_LANG/* dist/cooking_class_website/merged/
echo "✅ HR prebacen u dist/cooking_class_website/merged"

# Ostali jezici u podfoldere
for lang in "${OTHER_LANGS[@]}"; do
  mkdir -p dist/cooking_class_website/merged/$lang
  cp -r dist/cooking_class_website/browser/$lang/* dist/cooking_class_website/merged/$lang/
done
echo "✅ svi jezici prebaceni u dist/cooking_class_website/merged"

# Očisti originalne foldere
rm -rf dist/cooking_class_website/browser
echo "✅ originalni folderi obrisani"

# Dodaj 404.html u root (SPA fallback za više jezika)
cp dist/cooking_class_website/merged/assets/404.html dist/cooking_class_website/merged/
echo "✅ 404.html prebacen iz assets u dist/cooking_class_website/merged"

echo "✅ dist/cooking_class_website/merged spreman za deploy:"
echo " - /       → $DEFAULT_LANG"
for lang in "${OTHER_LANGS[@]}"; do
  echo " - /$lang/ → $lang"
done
