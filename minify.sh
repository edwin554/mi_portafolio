#!/bin/bash

# Script de minificación para el portafolio
# Uso: ./minify.sh

echo "Minificando archivos CSS y JS..."

# Verificar si cssnano y terser están instalados globalmente
if command -v cssnano &> /dev/null; then
    cssnano style.css style.min.css
    echo "CSS minificado: style.min.css"
else
    echo "cssnano no está instalado. Instálalo con: npm install -g cssnano"
fi

if command -v terser &> /dev/null; then
    terser scripts.js -o scripts.min.js -c -m
    echo "JS minificado: scripts.min.js"
else
    echo "terser no está instalado. Instálalo con: npm install -g terser"
fi

echo "Proceso completado."