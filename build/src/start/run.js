"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runner = void 0;
const config_1 = require("../../config");
const runner = (app) => {
    app.listen(config_1.config.port, () => {
        console.log(`Server is running on port ${config_1.config.port}`);
    });
};
exports.runner = runner;
