"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
function ProgressBar() {
    return ((0, jsx_runtime_1.jsxs)(Stack_1.default, { children: [(0, jsx_runtime_1.jsx)(LinearProgress_1.default, {}), (0, jsx_runtime_1.jsx)(LinearProgress_1.default, { color: "secondary" })] }));
}
exports.default = ProgressBar;
