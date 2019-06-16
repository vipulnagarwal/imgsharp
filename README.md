# imgSharp [![Maintainability](https://api.codeclimate.com/v1/badges/ab398b1a9bcb2a2d50a7/maintainability)](https://codeclimate.com/github/vsanse/imgsharp/maintainability) [![npm version](http://img.shields.io/npm/v/imgsharp.svg?style=flat)](https://npmjs.org/package/imgsharp "View this project on npm")
Image conversion and optimization cli tool

![imgsharp](https://imgur.com/zAzeYIt.png)

imgSharp is image optimization utility based on [sharp](https://www.npmjs.com/package/sharp) package. It currently supports optimization for:
- png
- jpg/jpeg

and resize ability

# Usage
imgSharp is simple cli utility tool.
```sh
$ npm install -g imgsharp
$ imgsharp [options]
```

## Options
#### --quality or -q : 
Define quality of images[1-100].  

Type: `number`  
Default: `75`  

#### --progressive, -p : 
If you want progressive.[true/false]  

Type: `boolean`  
Default: `true`  


#### --outputDir or -o  
Default: `Current Directory`  
Define output folder name(Default: replace files with optimized ones at same location.  

#### --inputDir or -i  
Default: `Current Directory`  
Define images folder name(Default: traverse all sub-directories in current directory).  

#### --resize or -r
Default: `true`
Tells imgsharp if you want resize functionality.

#### --minify or -m
Default: `false`
Tells imgsharp if you want image minification/optimization functionality.
if true imgsharp will also optimize the images else will continue with basic functionality of resize.

#### --width or -w: 
Define image width to resize to.  

Type: `number`  
Default: `auto`  

#### --height or --hi: 
Define image height to resize to.  

Type: `number`  
Default: `auto`  

#### --resizeAll or --ra
If you want to resize all images in folder to specified width or height. If undefined only images greater than specified height or width will be resized

Type: `boolean`
Default: `false`

### Development

Want to contribute? Great!
Create a pull request now!


License
----

MIT


**Free Software, Hell Yeah!**
 
