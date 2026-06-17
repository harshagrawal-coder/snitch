import { useState } from "react";
import { motion } from "framer-motion";

import AuthLayout from "../component/AuthLayout";
import AuthCard from "../component/AuthCard";
import InputField from "../component/InputField";
import PasswordInput from "../component/PasswordInput";
import PrimaryButton from "../component/PrimaryButton";
import Divider from "../component/Divider";
import GoogleButton from "../component/GoogleButton";
import FormFooter from "../component/FormFooter";
import TrustElements from "../component/TrustElements";

import { useAuth } from "../hook/useauth.hook.jsx";
import { useNavigate } from "react-router-dom";

const FIELDS = [
  [
    {
      label: "Full Name",
      name: "fullname",
      placeholder: "Enter your name",
      autoComplete: "name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "you@example.com",
      autoComplete: "email",
    },
  ],
  [
    {
      label: "Mobile Number",
      type: "tel",
      name: "contact",
      placeholder: "+91 XXXXXXXXXX",
      autoComplete: "tel",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      placeholder: "Create a password",
      autoComplete: "new-password",
    },
  ],
];

const RULES = {
  fullname: (v) =>
    !v.trim()
      ? "Full name is required"
      : v.length < 3
        ? "Full name must be at least 3 characters"
        : "",

  email: (v) =>
    !v.trim()
      ? "Email is required"
      : !/\S+@\S+\.\S+/.test(v)
        ? "Enter a valid email"
        : "",

  contact: (v) =>
    !v.trim()
      ? "Mobile number is required"
      : !/^[6-9]\d{9}$/.test(v)
        ? "Enter a valid 10-digit mobile number"
        : "",

  password: (v) =>
    !v
      ? "Password is required"
      : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v,
          )
        ? ""
        : "Min 8 chars, uppercase, lowercase, number & special character",

  confirmPassword: (v, form) =>
    !v
      ? "Please confirm your password"
      : v !== form.password
        ? "Passwords do not match"
        : "",
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

function RegisterPage() {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    isSeller: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;

    const error = RULES[name]?.(value, form) ?? "";

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  function validate() {
    const newErrors = {};

    for (const { name } of FIELDS.flat()) {
      const error = RULES[name](form[name], form);

      if (error) {
        newErrors[name] = error;
      }
    }

    const confirmError = RULES.confirmPassword(form.confirmPassword, form);

    if (confirmError) {
      newErrors.confirmPassword = confirmError;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await handleRegister({
        fullname: form.fullname,
        email: form.email,
        contact: form.contact,
        password: form.password,
        isSeller: form.isSeller,
      });
      navigate('/')
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial() {
    try {
      setSocialLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setSocialLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-2.5 mb-5"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1E293B] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">S</span>
            </div>

            <span className="text-sm font-semibold text-[#0F172A]">Snitch</span>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h2 className="text-xl font-semibold text-[#0F172A]">
              Create an account
            </h2>

            <p className="text-sm text-[#64748B] mt-1 mb-4">
              Join us and start shopping
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate>
            <motion.div variants={stagger} initial="hidden" animate="show">
              {FIELDS.map((row, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {row.map((field) =>
                    field.type === "password" ? (
                      <PasswordInput
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[field.name]}
                        required
                      />
                    ) : (
                      <InputField
                        key={field.name}
                        {...field}
                        value={form[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[field.name]}
                        required
                      />
                    ),
                  )}
                </motion.div>
              ))}

              <motion.div variants={fadeIn}>
                <PasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Re-enter your password"
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                  required
                />
              </motion.div>

              {/* Seller Toggle */}

              <motion.div variants={fadeIn} className="mt-4">
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      isSeller: !prev.isSeller,
                    }))
                  }
                  className={`w-full rounded-xl border p-3 text-sm font-medium transition-all duration-200 ${
                    form.isSeller
                      ? "bg-[#1E293B] text-white border-[#1E293B]"
                      : "bg-white text-[#475569] border-[#CBD5E1]"
                  }`}
                >
                  {form.isSeller
                    ? "✓ Registering as Seller"
                    : "Register as Seller"}
                </button>
              </motion.div>

              {form.isSeller && (
                <motion.div
                  variants={fadeIn}
                  className="mt-3 mb-2 rounded-lg border border-amber-200 bg-amber-50 p-3"
                >
                  <p className="text-xs text-amber-700">
                    Seller accounts can create, manage, and sell products on the
                    platform.
                  </p>
                </motion.div>
              )}

              <motion.div variants={fadeIn}>
                <PrimaryButton type="submit" loading={loading}>
                  Create Account
                </PrimaryButton>
              </motion.div>
            </motion.div>
          </form>

          <motion.div variants={fadeIn}>
            <Divider />
          </motion.div>

          <motion.div variants={fadeIn}>
            <GoogleButton loading={socialLoading} onClick={handleSocial} />
          </motion.div>

          <motion.div variants={fadeIn}>
            <FormFooter mode="register" />
          </motion.div>

          <TrustElements />
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}

export default RegisterPage;
