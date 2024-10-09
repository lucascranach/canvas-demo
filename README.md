# Cranach Map (WIP)

Prototyp für die Cranach Karte. Basierend auf der Bachelorarbeit von [Julia Voell](https://juliell.github.io). 

## Lokale Entwicklungsumgebung starten

Mithilfe des Befehls `npm run dev` lässt sich eine lokale Version der Cranach Artefacts starten. Da die generierung der Seiten eine Menge Arbeitsspeicher benötigt, muss ggf. die maximal erlaubte Speichergröße angepasst werden. Unter Linux und Mac lässt sich das mit dem Befehl `export NODE_OPTIONS=--max-old-space-size=<size in MB>` (z.B. 4096) erzielen. Diese Änderung ist temporär und bezieht sich nur auf die jeweilige Terminal-Session. Wird die Session beendet, muss das höhere Speicherlimit erneut gesetzt werden.

## Ordnerstruktur

### `/docs`
kompilierter Code


### `/src` hier wird entwickelt

```
_components         Layout- oder Funktionsschnipsel
_data               Zusätzliche Daten oder Hilffunktionen
_layouts            Templates
assets              SCSS, Skripts, Fonts, etc … alles was kein Content ist
compiled-assets     Kompilierte Dateien, z.B. CSS
```

### Weitere Dateien
```
.eleventy.js        Config von 11ty
.eleventyignore     Welche Folder/ Files soll 11ty ignorieren?
.eslintrc.json      
.gitignore          
.stylelintrc.json   
```

## Funktionen

| Befehl    | Funktion |
| -------- | ------- |
| npm run dev  | startet die lokale Entwicklungsumgebung    |
| npm run build | erzeugt einen Build für die [Prod Umgebung](https://lucascranach.org/de/search/)     |
| npm run internal    | erzeugt einen Build für die [Preview Umgebung](https://lucascranach.org/de/intern/search/)    |

