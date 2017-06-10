/**
 * Function to be called once all the images are loaded.
 * @callback IMGLoader~AllLoadedCallback
 * @param {object.<string, HTMLImageElement>} images - Map from the image ids to the loaded img HTML elements.
 */

/**
 * @typedef {object} IMGLoader~ImageDescription
 * @property {string} id - The id of the image. This is used in the object that is returned once all images are loaded.
 * @property {string} src - The source of the image.
 */

/**
 * Creates a queue of images to load. This does not actually load the images.
 * @param {IMGLoader~ImageDescription []} manifest
 * @constructor
 */
function IMGLoader(manifest) {
    this.manifest = manifest;
}

/**
 * Loads the images in the order they are provided in the manifest.
 * @param {IMGLoader~AllLoadedCallback} onload
 */
IMGLoader.prototype.loadSequentially = function (onload) {

    var next;

    //map from image id to image element
    var loadedImages = {};

    //the sequence of functions to call - each function will automatically call the next function in the sequence once the current image is loaded
    var nextFunctions = [];

    //create the sequence of functions to call
    this.manifest.forEach(function (image, i) {
        next = function (image, i) {
            var imageElement = new Image();
            imageElement.onload = nextFunctions[i + 1];
            loadedImages[image.id] = imageElement;
            imageElement.src = image.src;
        }.bind(null, image, i);
        nextFunctions.push(next);
    });

    //final function to call in sequence once all assets are loaded
    nextFunctions.push(onload.bind(null, loadedImages));

    //call first function to get sequence started
    nextFunctions[0]();

};

/**
 * Loads all the images, without regard for the order provided in the manifest.
 * @param {IMGLoader~AllLoadedCallback} onload
 */
IMGLoader.prototype.load = function (onload) {

    //map from image id to loaded image element
    var loadedImages = {};

    //number of images that have loaded so far
    var numberLoaded = 0;

    //number of images to load
    var numberOfImages = this.manifest.length;

    //start creating the image elements
    this.manifest.forEach(function (image) {
        var imageElement = new Image();

        imageElement.onload = function () {
            numberLoaded++;
            loadedImages[image.id] = imageElement;

            //all images have loaded
            if (numberLoaded === numberOfImages) {
                onload(loadedImages);
            }
        };

        imageElement.src = image.src;
    })
};

module.exports = IMGLoader;