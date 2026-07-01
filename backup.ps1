param (
    [string]$File = "index.html",
    [string]$Version = "v5"
)

# Configura diretórios
$currentDir = Get-Location
$siteDir = $currentDir.Path
if ($siteDir -notmatch "Site$") {
    Write-Warning "Por favor, execute este script de dentro da pasta 'Site' para manter os caminhos corretos."
    exit
}

$backupsDir = Join-Path $siteDir "backups"
if (-not (Test-Path $backupsDir)) {
    New-Item -ItemType Directory -Path $backupsDir | Out-Null
}

$sourceFile = Join-Path $siteDir $File
if (-not (Test-Path $sourceFile)) {
    Write-Error "Arquivo de origem não encontrado: $File"
    exit
}

# Gera o nome do backup no padrão: [nome]-[versao]-[data-hora].[ext]
$dateStr = Get-Date -Format "dd-MM-yyyy-HH'h'mm"
$fileBase = [System.IO.Path]::GetFileNameWithoutExtension($File)
$fileExt = [System.IO.Path]::GetExtension($File)
$backupName = "${fileBase}-${Version}-${dateStr}${fileExt}"
$destPath = Join-Path $backupsDir $backupName

# Lê o conteúdo original como UTF-8
$content = [System.IO.File]::ReadAllText($sourceFile, [System.Text.Encoding]::UTF8)

# Se for um arquivo HTML, ajusta os caminhos relativos para funcionar na pasta 'backups'
if ($fileExt -eq ".html") {
    # 1. Ajusta caminhos para pasta src (sobe 1 nível)
    $content = $content -replace 'href=(["''])\./src/', 'href=$1../src/'
    $content = $content -replace 'src=(["''])\./src/', 'src=$1../src/'
    
    # 2. Ajusta caminhos para pasta assets (sobe 2 níveis)
    $content = $content -replace 'href=(["''])\.\./assets/', 'href=$1../../assets/'
    $content = $content -replace 'src=(["''])\.\./assets/', 'src=$1../../assets/'
    
    # 3. Ajusta referências a outros scripts que possam estar salvos localmente na pasta backups
    # Ex: se existir unidades-[versao]-[data].js, redireciona o src para a mesma pasta.
    # (Adicione regras customizadas de arquivos irmãos aqui caso queira congelar componentes específicos)
}

# Salva o arquivo de backup em UTF-8 (sem BOM para evitar incompatibilidades)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($destPath, $content, $utf8NoBom)

Write-Host "==================================================" -ForegroundColor Green
Write-Host "Backup criado com sucesso e caminhos ajustados!" -ForegroundColor Green
Write-Host "Original: $File"
Write-Host "Backup:   backups/$backupName"
Write-Host "==================================================" -ForegroundColor Green
