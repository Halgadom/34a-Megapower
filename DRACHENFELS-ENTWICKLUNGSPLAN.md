# Drachenfels 3D – Entwicklungsübergabe (Stand: 17.11.2026)

## Ziel
Ein vollständig kostenloses, deutschsprachiges, WoW-inspiriertes Browser-3D-Fantasy-RPG mit §34a-GewO-Sachkunde-Fragen, glaubwürdiger MMO-Vegetation, detaillierten sichtbaren Rüstungen, riesigen magischen Flügeln, Waffen, Animationen, NPCs, Quests, Dungeons, Loot und mobiler Bedienung. Die vom Nutzer hochgeladenen MMORPG-Screenshots sind die Stilvorlage (goldverzierte, teils leuchtende Rüstungen, große Flügel, dunkle Inventarfenster, grüne Fantasylandschaft). Nicht kopieren; eigene kostenlose Assets. Keine Monetarisierung, bezahlten APIs oder Abos.

## Repository / Spiel
- GitHub: https://github.com/Halgadom/34a-Megapower (main)
- Live: https://halgadom.github.io/34a-Megapower/drachenfels.html
- Hauptcode: `drachenfels-3d.js` (~56 KB), `drachenfels.html`, `drachenfels-3d.html`
- Three.js 0.152.2 UMD über CDN. Kein Build-Schritt. Save-Key `drachenfels-3d-save`. Speicherdaten erhalten!
- Vorherige Version 11; aktuell Gelenke und Schwertarm-Kampfanimation implementiert, HTML-Cacheschlüssel auf Version 12 setzen.
- Änderungen **tatsächlich mit GitHub-Tools committen** und Ergebnis verlinken. Nicht nur planen oder behaupten, es sei AAA-fertig.

## Bisherige visuelle Features
- Tausende GPU-instanzierte Grasbüschel, Farne, Blumen; Baumkronen, Bach, Schilf, Brücken, Pilze, Schmetterlinge, Glühwürmchen, Kristalle, Marktstände, Banner, Burg und Brunnen.
- Prozedurale Canvas-Texturen für Gras, Holz, Stein, Dächer.
- Humanoider Held mit Körper, Gesicht, Haaren, animierten Armen/Beinen, neu jetzt Knie- und Ellbogengelenken, Umhang, Kampfanimation.
- Ausrüstung: geformte Brustpanzer, Schulterschichten, Helme, Handschuhe, Stiefel, legendäre Runen, große Federflügel, Edelsteine, extrudierte Großschwerter, Aura-Effekte.
- Drehbare/zoombare 3D-Charaktervorschau im Inventar.
- Spielmechanik: §34a-Fragen, NPCs, Händler, Quests, Mob-Kampf, Arena-Dungeon, Gold, Loot, Seltenheitsgrade, Upgrades, Mobile-Dpad.
- **Realistisch bleiben**: Es sind prozedurale Low-/Mid-Poly-Modelle, keine professionellen PBR-Charaktere. Es fehlt echtes GLTF/GLB-Rigging, hochwertige Skelettanimation, Textur-Atlas/Normalmaps und visuelle Endkontrolle im Browser.

## Wichtigste nächsten Schritte
1. **Browser-Runtime testen**, nicht nur `new Function(js)`-Syntax. Besonders Referenzfehler, WebGL-Performance und mobile Steuerung prüfen.
2. Das Spiel benötigt für MMO-Qualität hochwertige, frei lizenzierte GLB-Modelle mit dokumentierter Lizenz und Animationen (z. B. CC0), die lokal im Repo liegen. Lizenz-/Attributionshinweise anlegen. Keine unüberprüften Assets oder Kosten.
3. GLTFLoader/AnimationMixer einbinden und Fallback-Prozeduralfigur behalten, wenn Asset fehlt. Ausrüstung an Bones attachen und die echten Rüstungssets sichtbar wechseln lassen.
4. Performance/LOD/Drawcalls optimieren; Instanzen, Schatten und Texturen für Mobile prüfen.
5. Spielablauf und §34a-Fragen korrekt halten; keine regressiven Änderungen an Save, Dungeon, Quest, Händler und Inventar.
6. Visuelle Screenshots erst nach tatsächlichem Browser-Test als Spielscreenshots ausgeben.

## Entwicklungsregeln
- 100 % kostenlos, keine Mikrotransaktionen.
- Änderungen auf GitHub committen, HTML-Script-Query-Version erhöhen, damit GitHub Pages neuen Code lädt.
- `new Function(s)` ist nur Syntaxprüfung, **kein Browser-Test**.
- Bei `rebuildGear(g)` vorher alte `userData.rune/wingHalo/swordAura` löschen, um verwaiste Animationsreferenzen zu vermeiden.
- Drei Charakterklassen: Wächter, Waldläufer, Arkanist.

## Großes Update Version 13 (17.11.2026)
- Neu gestaltete MMORPG-HUD mit Goldrahmen, Questtracker, 6-Felder-Aktionsleiste und kreisförmiger Live-Minimap.
- Minimap zeigt Spielerrotation, NPCs, Gegner, Straßen und Bach in Echtzeit; Aktionsleiste ist mit bestehenden Kampf-/Menüfunktionen verbunden.
- Beide HTML-Einstiegsseiten synchronisiert; JavaScript auf Syntax geprüft.
- Ein generiertes Fantasy-MMO-Konzeptbild wurde als **Zielbild**, nicht als Screenshot des Spiels, im Chat erstellt.
- **Wichtig:** Trotz großem UI-Update fehlen noch professionell animierte GLB-Charaktere und visuelle Endkontrolle. Nicht als AAA-fertig bezeichnen.

## Release-Sperre und Qualitätssicherung (17.11.2026)
- **Nutzerwunsch:** Keine weiteren unfertigen öffentlichen Spielversionen. Die Seiten `drachenfels.html` und `drachenfels-3d.html` zeigen bis zur Freigabe nur eine Entwicklungsmitteilung. Nicht ohne ausdrückliche Freigabe zurückstellen!
- Statische Prüfsuite `tests/game-check.cjs` ergänzt und GitHub-Actions-Workflow `.github/workflows/drachenfels-quality.yml` angelegt. Beide sind im Repository; Workflow-Ergebnis und echte Browserfunktion müssen separat geprüft werden.
- Direkte JS-Syntax-/Funktions-/Unveröffentlicht-Prüfungen wurden erfolgreich ausgeführt. **Keine vollständige Browser- oder Grafikabnahme erfolgt.**
- Qualitätskriterien für eine spätere Freigabe: (1) Keine Browserkonsolenfehler beim Start, (2) neue und bestehende Speicherstände, (3) PC-/Mobilsteuerung, (4) alle Kernmenüs, §34a-Fragen, Inventar/Equipment, Quests, Händler, Boss, Dungeon, (5) flüssige Framerate auf Zielgeräten, (6) vom Nutzer abgenommene Charakter-/Rüstungsgrafik nach Vorlagen, (7) nur kostenlos nutzbare und sauber lizenzierte Assets.
- Keine Behauptung, ein 100% fertiges MMO sei schon erreicht. Keine öffentliche Test-URL zum Spielen empfehlen, solange gesperrt.

## Grafik-Neustart: verbindlicher Arbeitsplan
**Ziel:** Nicht weitere Deko und Effekte, sondern ein durchgängig stimmiger, kostenloser MMORPG-Look entsprechend den Nutzerreferenzen. Öffentliche Seiten bleiben bis zur Freigabe gesperrt.

### Meilenstein A – Referenzheld (höchste Priorität)
- Ein hochwertiger, humanoider Held mit natürlicher Silhouette, sauber getrennten Materialien und sichtbar getragenem kompletten Rüstungsset.
- Ein in sich geschlossenes Wächter-Rüstungsset (Helm, Torso, Schultern, Handschuhe, Beine, Stiefel, Waffe, Umhang). Später weitere Sets.
- Saubere GLB/GLTF-Assets und AnimationMixer, wenn geeignete überprüft lizenzierte kostenlose Modelle verfügbar sind. Lizenz in `ASSET-LICENSES.md` dokumentieren.
- Mindestens Idle, Walk, Run, Attack, Hit, Death; kein unbeabsichtigtes Clipping durch Flügel/Schwert.
- Charakter in geschlossener lokaler Testumgebung auf PC und Smartphone von vorne, hinten und seitlich kontrollieren.

### Meilenstein B – Referenzgebiet
- Ein kompaktes, hochwertiges Wald-/Burggebiet mit natürlicher Vegetation, konsistenten Materialien und klaren Wegen.
- Reduzierte magische Dauer-Effekte; atmosphärische Beleuchtung, passende Schatten, Gelände und Sichtweite.
- Instancing und LOD, damit Mobilgeräte nicht überlastet werden.

### Meilenstein C – Geschlossene spielbare Strecke
- Start -> NPC -> §34a-Frage -> Quest -> Gegner -> Beute -> Ausrüsten -> Boss -> Abschluss.
- Spielstand neu/alt, Keyboard, Touch, Inventar und alle Menüpfade prüfen.
- Automatische Tests ergänzen; Browser-Laufzeittest und Screenshots mit realem Spiel, nicht mit Konzeptbildern.

### Freigaberegel
- Erst nach vollständig bestandener Funktions- und Grafikabnahme, dokumentierten Asset-Lizenzen und ausdrücklicher Freigabe des Nutzers die öffentliche Seite wieder öffnen.
- Keine kostenpflichtigen Assets, Dienste, Echtgeldkäufe oder Abos.
