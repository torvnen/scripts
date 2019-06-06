# Deletes all files and folders from target folder.
# Usage: powershell.exe clean-folder.ps1 -path D:\Documents\tmp
# @author Niko Torvinen
param (
    [Parameter()]$path = "D:\Documents\tmp"
)
Get-ChildItem -Path $path -Force -Include * | Foreach-Object { 
    if ((Get-Item $_) -is [System.IO.DirectoryInfo]) {
        # TODO: Recurse items inside folders too
        Write-Host "Removing folder $($_.FullName)"
        Remove-Item $_ -Recurse
    }
    else {
        Write-Host "Removing file $($_.FullName)"
        $_.Delete()
    }
}