# IMG Loader

Simple, lightweight module to load images asynchronously using javascript in browsers.

The main use-case for which the module was written was to load image assets for an HTML game in the
background, and to be informed once the loading was complete so the game could be started.

## Installation

    npm install imgloader
    
This module is written to be used and bundled using Webpack, or another such bundling tool. There is
currently no standalone js script that can be loaded directly.

## Usage

```javascript
var IMGLoader = require('IMGLoader');

//a description of the images to load
var manifest = [
    {
        id:'foo',
        src:'example.com/image1'
    },
    {
        id:'bar',
        src:'example.com/image2'
    }
];

//images are not loaded at this point...this simply creates a queue of images
var loader = new IMGLoader(manifest);

loader.load(function(images){
    var fooImage = images.foo;
    var barImage = images.bar;
    
    //...do whatever you need to do with fooImage and barImage
});

loader.loadSequentially(function(images){
    //...do whatever with loaded images
});
```

### Manifest

The manifest is an array of objects describing the images you want to load, and must be provided
when creating a new IMGLoader. The description of each image requires 2 properties:

1. id - a unique string used to identify the image. This will be used in the object returned
to you once the images are all loaded.
2. src - The URL to the image.

### Load Function

This function actually starts loading the images. It requires a function that is called
once the all the images are loaded. The callback function is provided an object mapping from
the image IDs to the loaded HTMLImageElement.

### LoadSequentially Function

This function is nearly identical to the load function, except it will load the images
in the order specified by the manifest.

## License

MIT.