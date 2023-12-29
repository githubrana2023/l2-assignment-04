"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const globalMiddleware_1 = __importDefault(require("./middlewares/globalMiddleware"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const app = (0, express_1.default)();
//^ middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.json({
        ping: 'Ping Pong 😁',
        message: 'Server is running'
    });
});
app.use('/api', routes_1.default);
app.use('*', notFound_1.default);
app.use(globalMiddleware_1.default);
exports.default = app;
