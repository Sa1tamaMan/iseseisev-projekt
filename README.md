# 2D Runner

### Autor: Kristjan Petersell
(minu tlu github: https://github.com/kristjan-pet)

[Mängu link](https://www.tlu.ee/~sa1tama/2d-runner/runner.html)

## Funktionaalsus

2D Runner on inspireeritud Google'i mänguga: Dinosaur Game.

Selle mängu põhimõte on joosta nii kaua kuni mängija kaotab ja saada maksimaalselt suure skoori.

Selles mängus mängija jookseb ja hüppab üle erinevaid objekte/vaenlasi.

Mida kauem on mängija elus seda raskemaks läheb mäng, näiteks suureneb kiirus ja ekraanile tuleb rohkem objekte.

### Tehnilisus

* Selleks, et mängu käivitada on vaja seadistada serveri (localhost vms).
* Kui server on tehtud, siis peab selle '_.html_' faili lahti tegema (läbi oma serveri).
* Mäng algab kohe kui 'runner.html' on laetud.
* Hüppamiseks on nupud: W, Space, UpArrow või MouseLeftClick
* Iga mängu 'tick' korra suureneb 'Score' ühe võrra.
* Mängu _difficulty_ suureneb aeglaselt.
* Kui skoor ületab 16000 siis kiirus muutub lineaarselt, muidu enne 16000 on kõik muutujad pandud käsitsi.
* Kui mängija puudutab suvalist 'Obstacle' objekti, siis mängija kaotab, mäng lõpeb ja näidatakse saadud skoori.
* Et mängu uuesti alustada võib vajutada Restart nuppu või ise _refresh_-ida lehekülge.

_!NB selles mängus ei ole võimalik oma Score'i salvestada._

### Visuaal

Alguses tahtsin kopeerida Dinosaur Game visuaali, aga hiljem mõtlesin, et võiks ise visuaali teha. 

Nii, kasutades _Krita_'t, valmistasin oma tehtud '_.png_' failid ja panin neid mängu sisse.

_Sprite_'id tulid välja omapärased ning nende desain tuli suvaliselt pähe.

Mõnedele _Sprite_'idele lisasin ka animatsiooni, et mäng näeks rohkem elus olevat.

### Kasutatud _software_

* Visual Studio Code (addons: open in browser, Live Server)
* Krita (paint, aga mahukam)
* Firefox

## Screenshotid

![Pilt1](https://github.com/Sa1tamaMan/iseseisev-projekt/assets/159195533/d28f1876-aa95-4fd1-ba38-cf9673a47a64)

![Pilt2](https://github.com/Sa1tamaMan/iseseisev-projekt/assets/159195533/7ea3dfa9-7e6d-42b5-9268-873752f5587a)

## Viited

* ChatGpt
* https://www.youtube.com/watch?v=bG2BmmYr9NQ
* https://www.youtube.com/watch?v=K2upGO5Bb48
* https://www.youtube.com/watch?v=4q2vvZn5aoo
