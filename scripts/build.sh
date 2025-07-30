#!/bin/bash

set -e

mkdir -p dist

for dir in funcoes/*; do
  if [ -d "$dir" ]; then
    name=$(basename "$dir")
    echo "🔧 Empacotando função: $name"
    zip -j "dist/${name}.zip" "$dir"/*.js
  fi
done
