# Directiva: Inicialización Vértice Studio

## Objetivo
Configurar el proyecto base de la landing page de Vértice Studio, estableciendo la estructura inicial y generando el archivo `index.html` con el código inicial.

## Entrada
- Código HTML provisto por el usuario.

## Salida
- Archivo `index.html` generado autómaticamente en la raíz del proyecto.

## Pasos de Ejecución
1. El script de Python leerá una plantilla o cadena de texto con el código HTML proporcionado.
2. Escribirá este contenido en el archivo `index.html` en la raíz asegurándose de utilizar codificación `utf-8`.

## Restricciones y Casos Borde
- Asegurarse de mantener las variables Javascript para el `GOOGLE_SCRIPT_URL` tal como vienen.
- Asegurar que la estructura esté construida con Vanilla HTML/CSS/JS y codificación `utf-8`.
- Nota: No usar emojis ni caracteres especiales fuera del estándar ASCII dentro de las instrucciones `print()` en scripts de Python ejecutados en Windows, ya que causa un error de `UnicodeEncodeError: 'charmap' codec can't encode character`. En su lugar, asegurar que todas las salidas a consola utilicen puramente texto ASCII.
