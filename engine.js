const sharp = require('sharp'),
      fs = require("fs"),
      readChunk = require('read-chunk'),
      path = require("path"),
      fileType = require('file-type'),
      chalk = require("chalk");

class engine {
    constructor(CURR_DIR) {
        this.CURR_DIR = CURR_DIR;
    }
    optimize(imgpath, outputPath, imgQuality, isProgressive) {
        if(!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath, { recursive: true });
        }
        fs.readdirSync(imgpath).forEach(file=>{
            const filePath = path.join(imgpath, file);
            const stats = fs.statSync(filePath);
            if (!stats.isDirectory()){
                const imageType = this.getFileType(filePath);
                if(imageType==='jpg' || imageType==='jpeg'){
                    sharp(filePath)
                    .jpeg({
                        progressive: isProgressive,
                        quality: imgQuality
                    })
                    .toFile(path.join(outputPath, file))
                    .then(() => {
                        console.log(
                            chalk.yellow("Images(.jpg) optimized:for dir:", imgpath)
                        );
                    });
                }
                if(imageType==='png'){
                    sharp(filePath)
                    .png({
                        progressive: isProgressive
                    })
                    .toFile(path.join(outputPath, file))
                    .then(() => {
                        console.log(
                            chalk.yellow("Images(.jpg) optimized:for dir:", imgpath)
                        );
                    });
                }
            }
        })
    }
    resize(imgpath, outputPath, height, width){
        let minImgPath = path.join(outputPath,'min')
        if(!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath, { recursive: true });
        }if(!fs.existsSync(minImgPath)){
            fs.mkdirSync(minImgPath, { recursive: true });
        }
        fs.readdirSync(imgpath).forEach(file=>{
            const filePath = path.join(imgpath, file);
            const stats = fs.statSync(filePath);
            if (!stats.isDirectory()){
                if((typeof(height)==='string' && height !== 'auto') || (typeof(width)==='string' && width !== 'auto')){
                    return false;
                }
                else if(height==='auto' && width !== 'auto'){
                    sharp(filePath)
                    .resize({width: width})
                    .toFile(path.join(minImgPath,file))
                    .then(() => {
                        console.log(
                            chalk.yellow("Images resized:for dir:", imgpath)
                        );
                    });
                }
                else if(height!=='auto' && width === 'auto'){
                    sharp(filePath)
                    .resize({height: height})
                    .toFile(path.join(minImgPath,file))
                    .then(() => {
                        console.log(
                            chalk.yellow("Images resized:for dir:", imgpath)
                        );
                    });
                }
                else if(height!=='auto' && width!=='auto'){
                    sharp(filePath)
                    .resize(width, height)
                    .toFile(path.join(minImgPath,file))
                    .then(() => {
                        console.log(
                            chalk.yellow("Images resized:for dir:", imgpath)
                        );
                    });
                }
                else{
                    return;
                }
            }
        })
    }
    getFileType(file){
        const buffer = readChunk.sync(file, 0, fileType.minimumBytes);
        return fileType(buffer).ext;
    }
}

module.exports = engine;
