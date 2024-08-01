"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.createToken = void 0;
const config_1 = require("../../config");
const jsonwebtoken_1 = require("jsonwebtoken");
const createToken = (payload) => {
    if (!config_1.config.jwtSecret) {
        throw new Error("JWT secret is not defined");
    }
    const options = {
        expiresIn: config_1.config.jwtExpiration,
    };
    return (0, jsonwebtoken_1.sign)(payload, config_1.config.jwtSecret, options);
};
exports.createToken = createToken;
const checkToken = (token, callback) => {
    if (!config_1.config.jwtSecret) {
        throw new Error("JWT secret is not defined");
    }
    (0, jsonwebtoken_1.verify)(token, config_1.config.jwtSecret, callback);
};
exports.checkToken = checkToken;
