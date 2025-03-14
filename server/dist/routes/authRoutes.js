"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.post("/register", authController_1.register);
exports.authRoutes.post("/login", authController_1.login);
//# sourceMappingURL=authRoutes.js.map