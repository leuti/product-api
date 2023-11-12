"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const debug_1 = __importDefault(require("debug")); // debug package
const log = (0, debug_1.default)('http'); // create log object
// function resizes a given image to a target size
const resize = async function (fullSource, // full path to source file
thumbSource, // full patch to thumb file
width, // target width of the thumb
height, // target height of the thumb
res // express response object
) {
    const thumbDir = path_1.default.join(__dirname, '../../assets/thumb/'); // thumb directory
    // check if thumb dir exists and create if not
    fs_1.default.access(thumbDir, (err) => {
        if (!err) {
            log(thumbDir, 'directory already exists');
        }
        else if (err.code === 'ENOENT') {
            fs_1.default.mkdirSync(thumbDir);
            log(thumbDir, 'created successfully... ');
        }
    });
    try {
        // resize image async using the sharp module
        await (0, sharp_1.default)(fullSource)
            .resize({
            width: parseInt(width),
            height: parseInt(height),
            fit: sharp_1.default.fit.cover,
            position: sharp_1.default.strategy.entropy, //  most visually interesting part of the image will be retained
        })
            .toFile(thumbSource); // save file in given location
        res.status(200).sendFile(thumbSource); // send thumb back to end point
    }
    catch (error) {
        throw new Error(`Error resizing provided source image: ${error}`); // throw error if resize fails
    }
};
// Function to check if arams are provided and data type is OK
const validateParam = function validateParam(paramName, // specifies the param to be validated (filename, width, height)
paramContent, // content of the above param
type // data type expected
) {
    // check if parameter has been provided
    if (!paramContent) {
        throw new Error(`Parameter ${paramName} not provided. Please provide valid ${paramName} of type ${type}`);
    }
    // check if approprate data type
    if (type === 'number' &&
        isNaN(paramContent) &&
        isNaN(parseFloat(paramContent))) {
        throw new Error(`Parameter "${paramName}" should be a number, but the value "${paramContent}" has been provided.`);
    }
    return true;
};
exports.default = { resize, validateParam };
