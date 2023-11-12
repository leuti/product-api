"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertKeysToCamelCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to ensura that the requestor is authorized to use this route.
// The provided token will be validated before allowing access to the protected resource
const verifyAuthToken = (req, res, next) => {
    try {
        const authorisationHeader = req.headers.authorization;
        const token = authorisationHeader?.split(' ')[1];
        if (!token) {
            throw new Error('Token not found');
        }
        const secret = process.env.TOKEN_SECRET;
        if (!secret) {
            throw new Error('Token secret not found');
        }
        jsonwebtoken_1.default.verify(token, secret); // ignore error
        next();
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
};
function toCamelCase(str) {
    return str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));
}
function convertKeysToCamelCase(obj) {
    if (obj instanceof Array) {
        return obj.map((v) => convertKeysToCamelCase(v));
    }
    else if (obj !== null && obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            toCamelCase(key),
            convertKeysToCamelCase(value),
        ]));
    }
    return obj;
}
exports.convertKeysToCamelCase = convertKeysToCamelCase;
exports.default = verifyAuthToken;
