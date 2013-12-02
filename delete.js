var fs = require('fs'),
    exec = require('child_process').exec,

    b = require('./vars');

var mainDir = b.mainLevel + b.level[0] + '/' + b.block;

if (fs.existsSync(mainDir)) {
    var command = 'rm -rf ' + mainDir;
    exec(command, function(error){
        if (error) {
            console.error(error);
        }
    });
}
