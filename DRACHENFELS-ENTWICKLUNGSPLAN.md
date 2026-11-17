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
