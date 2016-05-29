#### Struttura del progetto "Pagina statica"

**OUTPUT FINALE PAGINA STATICA `dist/`**

La pagina è direttamente disponibile per visione aprendo il file `index.html` presente nella cartella [dist/](https://github.com/michele-prandina/FrontendTest/tree/master/dist).

**NB.** 
In questa cartella, la pagina html e i file Css sono stati minimizzati. 
Gli script in ECMAScrip5 sono stati concatenati (vendor.js), minificati e "uglified".


----------

**FILE DEV `dev/`**

In questa cartella è possibile avere la visione dei file realizzati per ottenere l' ouput  nella cartella sopra descritta.

Utilizza `gulp.js` per automatizzare le task e `bower.js` per le dipendenze.


In particolare le librerie utilizzate sono state le seguenti.

**Gulp:**

> "browser-sync": "^2.12.10",
    "del": "^1.1.1",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.0.1",
    "gulp-cssnano": "^2.1.2",
    "gulp-eslint": "^0.13.2",
    "gulp-htmlmin": "^1.3.0",
    "gulp-if": "^1.2.5",
    "gulp-load-plugins": "^0.10.0",
    "gulp-plumber": "^1.0.1",
    "gulp-sass": "^2.3.1",
    "gulp-scss-lint": "^0.4.0",
    "gulp-size": "^1.2.1",
    "gulp-sourcemaps": "^1.5.0",
    "gulp-uglify": "^1.1.0",
    "gulp-useref": "^3.0.0",
    "jshint": "^2.9.2",
    "useref": "^1.2.0",
    "wiredep": "^4.0.0"


**Bower:**

> "html5shiv": "^3.7.3",
    "bootstrap-sass": "^3.3.6",
    "lodash": "^4.13.1"


----------

#### Anteprima live dei file di progetto

Per ottenere una live-preview di questi assets è necessario avere installato `node js` e `npm`.


**Installare le dipendenze necessarie:**

    npm install && bower install

**Servire l'ambiente di stage in locale:**

    gulp serve
    
Utilizzando la libreria browser-sync è possibile accedere sotto la stessa connessione (WI-FI) tramite più dispositivi (Cellulari, tablet e più computer) tramite live-sync.  


#### Linting
Sono state utilizzate librerie per i suggerimenti di correzione tramite gulp, per ECMAScript5 e SASS.

#### Note - Project, CSS & JavaScript Styles Guides

Per i file SASS ho fatto riferimento al CSS style guide di trello (Ref: [https://github.com/trello/trellisheets/blob/master/styleguide.md](https://github.com/trello/trellisheets/blob/master/styleguide.md)) ed usato Bootstrap.

Per ECMAScript 5 (JavaScript)  non segue una particolare linea guida di sviluppo. 

il file `gulpfile.js` è una versione più leggera e semplificata di quello creato dal generatore YEOMAN "Generatr WebApp" (ref: [https://github.com/yeoman/generator-webapp](https://github.com/yeoman/generator-webapp)). 

La struttura di progetto prende spunto in modo incisivo dal generatore sopra riportato, che per questo caso è stato semplificato e creato da zero (Nessun generatore yeaoman è stato utilizzato per questo progetto :) ).


#### Debug & Cross browser tests
E' stata utilizzata tramite bower la libreria `html5shiv` per gestire la retro compatibilità con i browser legacy di IE (ref: [https://github.com/aFarkas/html5shiv](https://github.com/aFarkas/html5shiv)).

Il progetto è realizzato mediante principio mobile-first (media queries incrementali). 

I vari test cross-browser sono stati realizzati su:

 - Chrome Canary (Mac OS)
 - Chrome (Mac OS, iOS e Android)
 - Safari (Mac OS, iOS)
