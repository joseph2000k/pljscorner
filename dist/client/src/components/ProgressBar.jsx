"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = __importDefault(require("@mui/material/Stack"));
const LinearProgress_1 = __importDefault(require("@mui/material/LinearProgress"));
function ProgressBar() {
    return (<Stack_1.default>
            <LinearProgress_1.default />
            <LinearProgress_1.default color="secondary"/>
        </Stack_1.default>);
}
exports.default = ProgressBar;
