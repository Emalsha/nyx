/**
 * Created by emalsha on 3/9/17.
 */

var Aria2 = require('aria2');

var aria2 = new Aria2();



aria2.onDownloadStart = function (msg) {
    console.log('Download start > GID : '+msg.gid);
};

aria2.onDownloadComplete = function (msg) {
    console.log('Download completed on > GID :'+msg.gid);
};

aria2.open().then(function () {
    console.log('Web socket is open');
}).then(aria2.addUri(['https://www.w3schools.com/css/trolltunga.jpg'],function (err, res) {
    console.log(err || res);
}));