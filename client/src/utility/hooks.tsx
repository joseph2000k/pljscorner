import {useState} from 'react';

export const useForm = (callback: any, initialState = {}) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        callback();
    }

    return {
        handleChange,
        handleSubmit,
        formData,
    };
}
