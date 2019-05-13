# Displays a default Windows text popup.
# Usage: powershell.exe alert.ps1 -title TITLE -description DESCRIPTION
# @author Niko Torvinen
param (
    [Parameter()]$title = "Done",
    [Parameter()]$description = "Operation Completed"
)
(New-Object -ComObject Wscript.Shell).Popup($description, 0, $title, 0x1)