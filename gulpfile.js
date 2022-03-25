const gulp = require(`gulp`);
const sass = require(`gulp-sass`);
const cleanCSS = require(`gulp-clean-css`);
const browserSync = require(`browser-sync`).create();
const twig = require(`gulp-twig`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const sourcemaps = require(`gulp-sourcemaps`);
const concat = require(`gulp-concat`);

const getPublicFolderPath = (ext = ``) => gulp.dest(`./public/${ext}`);

gulp.task('svgSprite', function () {
    return gulp
        .src('img/svg/*.svg', {base: `.`})
        .pipe(getPublicFolderPath());
});

gulp.task(`html`, gulp.series(function () {
    return gulp.src(`./html/pages/**/*.html`)
        .pipe(twig({
            data: {
                title: `Главная`,
            }
        }))
        .pipe(getPublicFolderPath())
        .pipe(browserSync.stream());
}));

gulp.task(`img`, gulp.series(function () {
    return gulp
        .src(`./img/[^(svg)]**/*`, {base: `.`})
        .pipe(getPublicFolderPath());
}));

gulp.task(`fonts`, gulp.series(function () {
    return gulp
        .src(`./fonts/**`, {base: `.`})
        .pipe(getPublicFolderPath());
}));

gulp.task(`js`, gulp.series(function () {
    return gulp.src(`js/[^(_)]*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [`@babel/env`]
        }))
        .pipe(concat(`main.mini.js`))
        .pipe(uglify())
        .pipe(sourcemaps.write(`.`))
        .pipe(getPublicFolderPath(`js`))
        .pipe(browserSync.stream());
}));

gulp.task(`jsForPage`, gulp.series(function () {
    return gulp.src(`js/_*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [`@babel/env`]
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write(`.`))
        .pipe(getPublicFolderPath(`js`))
        .pipe(browserSync.stream());
}));

gulp.task(`styles`, gulp.series(function () {
    return gulp.src(`sass/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on(`error`, sass.logError))
        .pipe(cleanCSS({compatibility: ` 'ie8'`}))
        .pipe(sourcemaps.write('.'))
        .pipe(getPublicFolderPath(`css`))
        .pipe(browserSync.stream());
}));

gulp.task(`default`, gulp.parallel(`styles`, `html`, `img`, `js`, `jsForPage`, `svgSprite`, `fonts`, function () {
    gulp.watch(`sass/**/*.scss`, gulp.parallel(`styles`));
    gulp.watch(`html/**/*`).on('change', gulp.parallel(`html`));
    gulp.watch(`img/*`).on('change', gulp.parallel(`img`));
    gulp.watch(`fonts/*`).on('change', gulp.parallel(`fonts`));
    gulp.watch(`js/*`).on('change', gulp.parallel(`js`));
    gulp.watch(`js/*`).on('change', gulp.parallel(`jsForPage`));
    gulp.watch(`img/svg/*`).on('change', gulp.parallel(`svgSprite`));
    gulp.watch(`public/*`).on('change', browserSync.reload);
}));

gulp.task(`build`, gulp.parallel(`styles`, `html`, `img`, `js`, `jsForPage`, `svgSprite`, `fonts`));

gulp.task(`sync`, gulp.parallel(`default`, function () {
    browserSync.init({
        server: `./public`,
        notify: false,
        port: 3005
    });
}));
