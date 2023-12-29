"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const router = (0, express_1.Router)();
const authRoutes = [
    {
        path: '/',
        router: auth_routes_1.default
    },
];
authRoutes.map((route) => router.use(route.path, route.router));
const authRouter = router;
exports.default = authRouter;
