#!/bin/bash

# Podesi koji je glavni jezik (ide na root /)
DEFAULT_LANG="hr"

# Ostali jezici koji idu u poddirektorijume
OTHER_LANGS=("en-US" "de" "fr" "it" "es" "cs")

# Očisti i pripremi dist/cooking_class_website/merged
rm -rf dist/cooking_class_website/merged
mkdir -p dist/cooking_class_website/merged

# HR u root (kao default)
cp -r dist/cooking_class_website/browser/$DEFAULT_LANG/* dist/cooking_class_website/merged/

# Ostali jezici u podfoldere
for lang in "${OTHER_LANGS[@]}"; do
  mkdir -p dist/cooking_class_website/merged/$lang
  cp -r dist/cooking_class_website/browser/$lang/* dist/cooking_class_website/merged/$lang/
done

# Očisti originalne foldere
rm -rf dist/cooking_class_website/browser

echo "✅ dist/cooking_class_website/merged spreman za deploy:"
echo " - /       → $DEFAULT_LANG"
for lang in "${OTHER_LANGS[@]}"; do
  echo " - /$lang/ → $lang"
done
