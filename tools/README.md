# Herramientas de activos

## Descarga recursiva y etiquetado

`assets-manifest.json` organiza los recursos por categoría. `download-assets.ps1` recorre
recursivamente las categorías, crea las carpetas, descarga cada imagen, calcula SHA-256,
escribe un sidecar JSON junto a cada archivo y genera:

```text
prototype-v2/assets/asset-catalog.json
```

Ejecutar desde `D:\dental`:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\download-assets.ps1
```

Para volver a descargar y reemplazar archivos:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\download-assets.ps1 -Force
```

Las fotos Pexels son referencias visuales. No deben asociarse a los nombres, rostros o
credenciales de los profesionales ficticios del seed. La fuente, autoría, licencia, uso,
alt text, tags, tamaño y hash quedan conservados en cada sidecar.
