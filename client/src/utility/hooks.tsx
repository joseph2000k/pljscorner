import {useState} from 'react';

export const useForm = (callback: any, initialState = {}) => {
    const [form, setForm] = useState(initialState);

    const handleChange = (e: any) => {
        setForm({
            ...form,
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
        form,
    };
}
