const gulp = require('gulp');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const svgSprite = require('gulp-svg-sprite');
const autoprefixer = require('gulp-autoprefixer');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const del = require('del');

const browserSync = require('browser-sync').create();

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const paths = {
    root: './build',    
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'build/styles/'
    },
    images: {
        src: 'src/img/**/*.*',
        dest: 'build/img/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/scripts/'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/fonts/'
    }
}

//sprite
function svg() {
    return gulp.src('./src/img/**/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg",
                    example: {
                        dest: 'spriteSvgDemo.html'
                    }
                }
            }
        }))
        .pipe(gulp.dest(paths.images.dest));
}

// scss
function styles() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.styles.dest))
}

// очистка
function clean() {
    return del(paths.root);
}

// webpack
function scripts() {
    return gulp.src('src/scripts/*.js')
        //.pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

//переносим html
function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(paths.root));
}

// галповский вотчер
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch('src/**/*.html', html);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// просто переносим картинки
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}

//переносим шрифты
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}

//перенос общих стилей
function commonCss() {
    return gulp.src('./src/styles/**/*.*')
        .pipe(gulp.dest(paths.styles.dest))

}

exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.svg = svg;
exports.fonts = fonts;
exports.commonCss = commonCss;
exports.html = html;


gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, images, scripts, svg, fonts, commonCss, html),
    gulp.parallel(watch, server)
));