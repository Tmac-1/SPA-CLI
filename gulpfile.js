const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const vsftpPro = require('gulp-vsftppro');
const zip = require('gulp-zip');
const moment = require('moment-kirk');
const webpackFile = require("./config/webpack.file.conf");
const packageInfo = require("./package.json");

/* 生成构建时间 存放在 生产目录里*/
gulp.task('buildTime', () =>
    fs.writeFile(path.resolve(webpackFile.proDirectory) + "/buildTime.txt", moment(new Date()).format('YYYY-MM-DD HH:mm:ss') +' '+ packageInfo.version , function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!",path.resolve());
    })
);
/* 打包生产目录 */
gulp.task('zip', () =>
    gulp.src(path.resolve(webpackFile.proDirectory + '/**'))
        .pipe(zip('pc-[' + packageInfo.version +']-['+ moment(new Date()).format('YYYY-MM-DD HH-mm-ss')+'].zip'))
        .pipe(gulp.dest('backup'))
);
/* 上传生产目录到测试环境  */
gulp.task('test', function () {
    return gulp.src('./'+webpackFile.proDirectory+'/**')
        .pipe(vsftpPro.server({
            host: '116.196.70.70',
            user: 'root',
            pass: 'Xinxueshuo2018',
            cleanFiles: true,
            remotePath: '/webapps/test',
            uploadIndexHtml: false, // 是否上传 remotePath 下的 index.html,默认 true
            port:21
        }));
});
/* 上传生产目录到预生成环境 */
gulp.task('pre', function () {
    return gulp.src(webpackFile.proDirectory+'/**')
        .pipe(vsftpPro({
            host: '192.168.1.101',
            user: 'developer',
            pass: 'xxxxxxxxxxxxx',
            cleanFiles: true,
            remotePath: '/data1/docker-developer-test/modules/web/pc/',
        }));
});

/*如果有其他环境,可以继续往下面写*/