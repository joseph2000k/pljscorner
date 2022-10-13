"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = void 0;
const react_1 = require("react");
const useForm = (callback, initialState = {}) => {
    const [formData, setFormData] = (0, react_1.useState)(initialState);
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.type === "number"
                ? parseFloat(e.target.value)
                : e.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        callback();
    };
    return {
        handleChange,
        handleSubmit,
        formData,
    };
};
exports.useForm = useForm;
