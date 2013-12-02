var PATH = require('path'),
    Q = require('q'),
    BEM = require('bem').api,
    b = require('./vars');

var blocks = b.block,
    techs = b.techs,

    outputDir = PATH.join(__dirname, b.mainLevel),
    level = outputDir+'/'+b.level[0];

man = {
    blocks: b.block,
    techs: b.techs,
    outputDir: outputDir,
    level: level
};

man.init = function(){
    man.createLevel();
}

man.createLevel = function(){
    var opts, args;
    console.log('createLevel');
    opts = {
        outputDir: outputDir
    };
    args = {
        names: b.level
    };
    Q.when(BEM.create.level(opts, args), function() {
        console.log('createLevel done');
        man.createBlock();
    }, function(error){
        console.log(error)
    });
}

man.createBlock = function() {
    var opts, args;
    console.log('createBlock');
    opts = {
        forceTech: techs,
        level: level
    };
    args = {
        names: blocks
    }
    Q.when(BEM.create.block(opts, args), function() {
        console.log('createBlock done');

        man.createMod();
    }, function(error){
        console.log(error)
    });
};

man.createMod = function(){
    var opts, args;
    console.log('createMod');
    opts = {
        addTech: ['css'],
        blockName: b.block,
        level: level
    };
    args = {
        names: b.mods
    }
    Q.when(BEM.create.mod(opts, args), function() {
        console.log('createMod done');

        man.createElements();
    }, function(error){
        console.log(error)
    });
};

man.createElements = function(){
    var opts, args;
    console.log('createElements');
    opts = {
        addTech: ['bemhtml', 'title.txt'],
        blockName: b.block,
        level: level
    };
    args = {
        names: b.elems
    };
    Q.when(BEM.create.elem(opts, args), function() {
        console.log('createElements done');
        man.createBuild();
    }, function(error){
        console.log(error)
    });
};

man.createBuild = function(){
    var opts;
    console.log('createBuild');
    opts = {
        declaration: b.block+'.deps.js',
        outputLevel: level,
        block: b.block
    };
    Q.when(
        BEM.build(opts),
        function() {
            console.log('createBuild done');
        }, function(error){
            console.log(error)
        }
    );
}

man.init();