"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const isAuth = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized: No token provided",
        });
    }
    (0, jwt_1.checkToken)(token, (err, data) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized: Invalid token",
            });
        }
        req.user = data;
        next();
    });
};
exports.default = isAuth;
