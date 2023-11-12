"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// import own functions
const utilsImg_1 = __importDefault(require("../services/utilsImg"));
const routes = express_1.default.Router(); // create router
// return welcome message if root location is visited
routes.get('/', (req, res) => {
    res.status(200).send('Welcome to the image processor');
});
// process requests sent to api/images
routes.get('/images', (req, res) => {
    try {
        // Derive required variables
        const filename = req.query.filename; // filename provided by the endpoint
        const width = req.query.width; // width provided
        const height = req.query.height; // height provided
        const thumbName = path_1.default.parse(filename).name + '_' + width + '_' + height + '.jpg'; // target name of the thumb file
        const fullSource = path_1.default.join(__dirname, '../../assets/full/', filename); // path to full source file
        const thumbSource = path_1.default.join(__dirname, '../../assets/thumb/', thumbName); // patch to thumb file
        // Valdiate the params
        utilsImg_1.default.validateParam('filename', filename, 'string'); // Valdiate the filename param
        utilsImg_1.default.validateParam('width', width, 'number'); // Valdiate the width param
        utilsImg_1.default.validateParam('height', height, 'number'); // validate the height
        //  First check if requested image already exists as thumb
        fs_1.promises.stat(thumbSource)
            .then(() => {
            // if thumb file exists, the the thumb is directly returned
            res.status(200).sendFile(thumbSource); // send thumb back to end point
        })
            // if thumb is not found, the catch is triggered and thumb is generated
            .catch(() => {
            // first we check if the requested image exists in full format
            fs_1.promises.stat(fullSource)
                .then(() => {
                // If full image exists, it is resized
                utilsImg_1.default.resize(fullSource, thumbSource, width, height, res);
            })
                // if the resize returns an error, this catch is called
                .catch(() => {
                res.status(400).send(`Requested file ${filename} was not found.`);
            });
        });
    }
    catch (error) {
        // return any other encountered error
        const errorMsg = error;
        res.status(400).send(errorMsg.message);
    }
});
exports.default = routes;
