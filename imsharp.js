#!/usr/bin/env node
const fs = require("fs"),
      path = require("path"),
      yargs = require('yargs'),
      chalk = require("chalk"),
      figlet = require("figlet"),
      clear = require("clear"),
      confirm = require('prompt-confirm'),
      imgEngines   = require('./engine'), 
      CURR_DIR = process.cwd(),
      engines  = new imgEngines(CURR_DIR);
      
clear();
console.log(
    chalk.bold.yellow(
        figlet.textSync("imSharp", { horizontalLayout: "full" })
    )
);

const argv = yargs
    .scriptName('minify')
    .usage('Usage: $0 [options]')
    .option('quality', {
        alias: 'q',
        description: 'Define quality of images[1-100](Default:75)',
        type: 'number'
    })
    .option('progressive', {
        alias: 'p',
        description: 'If want progressive Jpeg (Default:false)',
        type: 'boolean'
    })
    .option('outputDir', {
        alias: 'o',
        description: 'Define output folder name(Default: replace files with optimized ones at same location)',
        type: 'string'
    })
    .option('inputDir', {
        alias: 'i',
        description: 'Define images folder name(Default: traverse all sub-directories in current directory)',
        type: 'string'
    })
    .option('resize',{
        alias: 'r',
        description: 'Tell if resize images: Default- true',
        type: 'boolean'
    })
    .option('minify',{
        alias: 'm',
        description: 'Tell if minify images: Default- false',
        type: 'boolean'
    })
    .option('width',{
        alias: 'w',
        description: 'specify resize width: Default- 5px',
        type: 'number'
    })
    .option('height',{
        alias: 'hi',
        description: 'specify resize height: Default- 5px',
        type: 'number'
    })
    .help()
    .alias('help', 'h')
    .argv;

const outputDir = argv.outputDir,
      inputDir = argv.inputDir,
      inputPath = inputDir?path.join(CURR_DIR, inputDir): CURR_DIR,
      quality  = argv.quality?argv.quality:75,
      progressive = argv.progressive?argv.progressive:false
      resize = argv.resize?argv.resize:true,
      minify = argv.minify?argv.minify:false,
      width = argv.width?argv.width:5,
      height = argv.height?argv.height:5;

function walk(dir, outputPath){
    const filesToWalk = fs.readdirSync(dir);
    // Run optimization engines on directory
    if(minify){
        engines.optimize(dir, outputPath, quality, progressive);
    }
    if(resize){
        engines.resize5px(dir,outputPath);
    }
    // get next directory
    filesToWalk.forEach(file => {
        const origFilePath = path.join(dir, file);
        // get stats about the current file
        const stats = fs.statSync(origFilePath);
        if (stats.isDirectory()) {
            if(outputDir){
                let filePath = path.join(dir, file).split(inputPath)[1];
                outputPath = path.join(CURR_DIR, outputDir, filePath);
            }
            else{
                outputPath = path.join(dir, file);
            }
            // recursive call
            walk(
                path.join(dir, file),
                outputPath
            );
        }
    });
}

function start(){
    if(inputDir){
        walk(
            inputPath,
            outputDir?path.join(CURR_DIR, outputDir,inputDir):path.join(CURR_DIR, inputDir)
        );
    }
    else{
        walk(
            inputPath,
            outputDir?path.join(CURR_DIR, outputDir):CURR_DIR
        );
    }
}

if(!outputDir){
    console.log(chalk.bold.red("This will replace current images with minified/optimized images."));
    const prompt = new confirm(chalk.red("Continue?"));
    prompt.originalDefault = false;
    prompt.run()
    .then(function(answer) {
        if(answer){
            start();
        }
        else{
            yargs.showHelp();
        }
    }); 
}
else{
    start();
}