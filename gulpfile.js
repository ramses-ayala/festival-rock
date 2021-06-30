
//const {series, parallel, src, dest} = require("gulp");
//const {series} = require("gulp");

const { parallel,series,src,dest,watch } = require("gulp");

const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const notify = require("gulp-notify");
const webp = require("gulp-webp");
const concat = require("gulp-concat");

// UTILIDADES DE CSS
const autoprefixer = require("autoprefixer"); // AGREGA CODIGO DE ULTIMA GENERACION agrega prefijos 
const postcss = require("gulp-postcss"); // AGREGA CODIGO DE ULTIMA GENERACION agrega cierto procesamiento al css 
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps"); /* mantiene las referencias a los 
archivos de sass en caso de que se necesite hacer un cambio en los estilos */


function css(){
    return src("src/scss/app.scss") // identificar la hoja de estilos
        .pipe(sourcemaps.init())
        .pipe(sass()) // aplicar sass a la hoja de estilos
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("./build/css"))  // guardar la hoja compilada en la ruta
}


function watchFile(){
    watch("src/scss/**/*.scss",css); // * carpeta actual | ** todos los archivos que esten en scss
    watch("src/js/**/*.js", javascript)    
}

function versionwebp(){
    return src("src/img/**/*")
        .pipe(webp())
        .pipe(dest("./build/img"))
        .pipe(notify({"message": "imagenes convertidas a webp", "sound": true, "onLast": true, "wait": true}))
}

function images(){
    return src("src/img/**/*")
        .pipe(imagemin())
        .pipe(dest("./build/img"))
        .pipe(notify({"message": "Imagen minificada", "sound": true, "onLast": true, "wait": true}))
}

function  javascript(){
    return src("src/js/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(concat("bundle.js"))
        .pipe(terser())
        .pipe(sourcemaps.write("."))
        .pipe(rename({"suffix": ".min"}))
        .pipe(dest("./build/js"))
} 

/* function cssMinimalista(){
    return src("src/scss/app.scss") // identificar la hoja de estilos
        .pipe(sass({
            outputStyle:"compressed"
        })) // aplicar sass a la hoja de estilos
        .pipe(dest("./build/css"))  // guardar la hoja compilada en la ruta
} */


/* function hola(done){
    console.log("Hola mundo");
    done();
}

function html(done){
    console.log("FUNCION HTML");

    done();
}

function css(done){
    console.log("FUNCION CSS");

    done();
} */

/*
function html(done){
    console.log("FUNCION HTML");

    done();
}

function css(done){
    console.log("FUNCION CSS");

    done();
}

function javascript(done){
    console.log("FUNCION JS");
    
    done();
} */

exports.watchFile = watchFile;
exports.images = images;
//exports.saludo = hola;
//exports.hola = hola;
//exports.hola = hola;

//exports.cssMinimalista = cssMinimalista;

//exports.tareas = series(hola,html,css,javascript);
exports.default = series(images, javascript, versionwebp, watchFile);
//exports.default = parallel(hola,html,css);