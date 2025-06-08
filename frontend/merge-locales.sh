#!/bin/bash

# Ostali jezici koji idu u poddirektorijume
LANGS=("en-US" "de" "fr" "it" "es" "cs" "hr")

# Očisti i pripremi dist/cooking_class_website/merged
rm -rf dist/cooking_class_website/merged
mkdir -p dist/cooking_class_website/merged

# Ostali jezici u podfoldere
for lang in "${LANGS[@]}"; do
  sed -i "s/main\.js/main-${lang}.js/g" dist/cooking_class_website/browser/$lang/index.html
  mv dist/cooking_class_website/browser/$lang/index.html dist/cooking_class_website/browser/$lang/index-$lang.html
  mv dist/cooking_class_website/browser/$lang/main.js dist/cooking_class_website/browser/$lang/main-$lang.js
  cp -r dist/cooking_class_website/browser/$lang/* dist/cooking_class_website/merged/
done
# Očisti originalne foldere
rm -rf dist/cooking_class_website/browser

echo "✅ dist/cooking_class_website/merged spreman za deploy:"