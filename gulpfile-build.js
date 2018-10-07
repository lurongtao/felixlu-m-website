/**
  gulp完成的任务：
  1、编译sass, less
  2、CommonJS模块化
  3、版本号控制
  4、打包压缩
 */

const gulp = require('gulp')

const sass = require('gulp-sass')

const webpack = require('webpack-stream')

const sequence = require('gulp-sequence')

const minifyCSS = require('gulp-minify-css')

const rev = require('gulp-rev')

const revCollector = require('gulp-rev-collector')

const minifyHTML = require('gulp-minify-html')

gulp.task('packscss', () => {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rev())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/rev/styles'))
})

gulp.task('packjs', () => {
  return gulp.src('./src/scripts/*.js')
    .pipe(webpack({
      mode: 'production',
      entry: {
        app: ['@babel/polyfill', './src/scripts/app.js']
      },
      output: {
        filename: '[name].js'
      },
      module: {
        rules: [
          {
            test: /\.html$/, 
            use: 'string-loader' 
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }))
    .pipe(rev())
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./dist/rev/scripts'))
})

gulp.task('copyhtml', () => {
  return gulp.src(['./dist/rev/**/*.json', './src/*.html'])
    .pipe(revCollector({
      replaceReved: true
    }))
    .pipe(minifyHTML({
      empty: true,
      spare: true
    }))
    .pipe( gulp.dest('./dist') );
})

gulp.task('copylibs', () => {
  return gulp.src(['./src/libs/**/*'])
    .pipe(gulp.dest('./dist/libs'))
})

gulp.task('copyicons', () => {
  return gulp.src(['./src/iconfonts/**/*'])
    .pipe(gulp.dest('./dist/iconfonts'))
})

gulp.task('copyimages', () => {
  return gulp.src(['./src/images/**/*'])
    .pipe(gulp.dest('./dist/images'))
})

gulp.task('default', (cb) => {
  sequence(['packscss', 'packjs'], ['copyicons', 'copylibs', 'copyimages', 'copyhtml'])(cb)
})