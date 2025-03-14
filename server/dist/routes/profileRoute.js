"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoute = void 0;
const authController_1 = require("../controllers/authController");
const express_1 = require("express");
const profileController_1 = require("../controllers/profileController");
exports.profileRoute = (0, express_1.Router)();
exports.profileRoute.use(authController_1.verifyToken);
exports.profileRoute.use("/", profileController_1.index);
//# sourceMappingURL=profileRoute.js.map