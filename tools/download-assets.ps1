param(
  [string]$Root = (Split-Path -Parent $PSScriptRoot),
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$manifestPath = Join-Path $Root 'tools\assets-manifest.json'
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
$catalog = [ordered]@{
  schemaVersion = $manifest.schemaVersion
  generatedAt = (Get-Date).ToUniversalTime().ToString('o')
  project = $manifest.project
  policy = $manifest.policy
  assets = @()
}

foreach ($category in $manifest.categories) {
  $categoryPath = Join-Path $Root $category.path
  New-Item -ItemType Directory -Path $categoryPath -Force | Out-Null

  foreach ($asset in $category.assets) {
    $destination = Join-Path $categoryPath $asset.filename
    if ($Force -or -not (Test-Path -LiteralPath $destination)) {
      Write-Host "Descargando [$($category.id)] $($asset.filename)"
      Invoke-WebRequest -Uri $asset.url -OutFile $destination -UseBasicParsing
    } else {
      Write-Host "Existe, se conserva [$($category.id)] $($asset.filename)"
    }

    $fileInfo = Get-Item -LiteralPath $destination
    if ($fileInfo.Length -lt 1024) {
      throw "Archivo sospechosamente pequeño: $destination"
    }

    $hash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
    $metadata = [ordered]@{
      id = $asset.id
      filename = $asset.filename
      path = $destination.Substring($Root.Length).TrimStart('\')
      category = $category.id
      purpose = $category.purpose
      sourcePage = $asset.sourcePage
      downloadUrl = $asset.url
      provider = $asset.provider
      author = $asset.author
      license = $asset.license
      usage = $asset.usage
      alt = $asset.alt
      tags = @($asset.tags)
      bytes = $fileInfo.Length
      sha256 = $hash
      downloadedAt = (Get-Date).ToUniversalTime().ToString('o')
      status = 'reference-only'
    }

    $sidecar = [IO.Path]::ChangeExtension($destination, '.json')
    $metadata | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $sidecar -Encoding utf8
    $catalog.assets += $metadata
  }
}

$catalogPath = Join-Path $Root 'prototype-v2\assets\asset-catalog.json'
New-Item -ItemType Directory -Path (Split-Path -Parent $catalogPath) -Force | Out-Null
$catalog | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $catalogPath -Encoding utf8
Write-Host "Catálogo escrito en $catalogPath"
