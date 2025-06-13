import { useState } from "react";

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
