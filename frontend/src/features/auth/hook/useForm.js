import { useState, useCallback } from "react";

export function useForm(initialValues, validators = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validators[name]) {
        const error = validators[name](value, values);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validators, values]
  );

  const validate = useCallback(() => {
    const newErrors = {};
    Object.keys(validators).forEach((key) => {
      const error = validators[key](values[key], values);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched(
      Object.keys(validators).reduce((acc, k) => {
        acc[k] = true;
        return acc;
      }, {})
    );
    return Object.keys(newErrors).length === 0;
  }, [validators, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return { values, errors, touched, handleChange, handleBlur, validate, reset, setValues };
}
