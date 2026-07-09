# Directiva: Hosting Local Vértice Studio

## Objetivo
Levantar un servidor de desarrollo local para poder previsualizar la landing page de Vértice Studio.

## Entrada
- Directorio raíz del proyecto (`c:\Users\JuanPelaez\VERTICE.STUDIO`) que contiene el `index.html`.

## Salida
- Servidor web local corriendo en un puerto específico (por ejemplo, el 8080).

## Pasos de Ejecución
1. El script de Python levantará un servidor `http.server` de la librería estándar apuntando al directorio raíz del proyecto.
2. Expondrá una URL local (`http://localhost:8080`).

## Restricciones y Casos Borde
- Asegurarse de usar un puerto que típicamente esté libre como el 8080.
- Evitar emojis en la consola, para evitar el `UnicodeEncodeError`.
