var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename');

gulp.task('jade', function() {
    return gulp.src('app/jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('stylus', function() {
    return gulp.src('app/stylus/**/*.styl')
        .pipe(stylus())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
})

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
             baseDir: 'app' 
            },
            notify: false 
    });
});


gulp.task('css-libs', ['stylus'], function() {
    return gulp.src('app/css/style.css') 
        .pipe(cssnano()) 
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css')); 
});



gulp.task('watch',['browser-sync', 'jade', 'stylus'], function() {
    gulp.watch('app/jade/**/*.jade', ['jade']),
    gulp.watch('app/stylus/**/*.styl', ['stylus']);
});


gulp.task('build', ['jade', 'stylus'], function(){
   var buildCss = gulp.src([
       'app/css/*.css',
   ]) 
   .pipe(gulp.dest('dist/css'))
   
   var buildHtml = gulp.src('app/*.html')
   .pipe(gulp.dest('dist'));
    
   var buildImg = gulp.src('app/img/*.png')
   .pipe(gulp.dest('dist/img'));
    
   var buildJS = gulp.src('app/js/*.js')
   .pipe(gulp.dest('dist/js'));
});