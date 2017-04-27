var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),

    postcss = require('gulp-postcss'),
    fonts = require('postcss-font-magician'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),

    del = require('del'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    ftp = require('vinyl-ftp'),
    media = require('gulp-group-css-media-queries'),
    realFavicon = require('gulp-real-favicon'),
    fs = require('fs'),
    notify = require("gulp-notify");


// Скрипты проекта
gulp.task('scripts', function () {
  return gulp.src([
    'app/libs/jquery.min.js',
    'app/libs/owl.carousel.min.js',
    'app/libs/sweetalert/sweetalert2.min.js',
    'app/libs/fancybox/jquery.fancybox.min.js',
    'app/libs/jquery.scrollto/jquery.scrollTo.min.js',
    'app/js/common.js'
  ])
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

gulp.task('postcss', function () {
  const processor = ([
    autoprefixer({browsers: ['last 7 version']}),
    cssnano(),
    fonts()
  ]);
  return gulp.src('app/sass/**/*.sass')
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", notify.onError()))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(media())
      .pipe(postcss(processor))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./app/css'))
      .pipe(browserSync.reload({
        stream: true
      }))
});

gulp.task('watch', ['postcss', 'scripts', 'browser-sync'], function () {
  gulp.watch('app/sass/**/*.sass', ['postcss']);
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['scripts']);
  gulp.watch('app/*.html', browserSync.reload);
});


gulp.task('imagemin', function () {
  return gulp.src('app/img/**/*')
      .pipe(cache(imagemin()))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'postcss', 'scripts'], function () {

  var buildFiles = gulp.src([
    'app/*.html',
    'app/mail.php'
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css'
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/scripts.min.js'
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'app/fonts/**/*']
  ).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function () {

  var conn = ftp.create({
    host: '',
    user: '',
    password: '',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'dist/**',
    'dist/.htaccess'
  ];
  return gulp.src(globs, {buffer: false})
      .pipe(conn.dest('./avia'));

});

gulp.task('removedist', function () {
  return del.sync('dist');
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('default', ['watch']);