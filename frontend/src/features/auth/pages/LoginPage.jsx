import { useState } from "react";
import { Link } from "react-router-dom";
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
import { useAuth } from "../hook/useauth.hook";
import { useNavigate } from "react-router-dom";
const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

function LoginPage() {
  const navigate = useNavigate();
  const { handlelogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    let error = "";
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email";
    } else if (name === "password" && !value) {
      error = "Password is required";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function validate() {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);

      await handlelogin({
        email: form.email,
        password: form.password,
      });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSocial() {
    setSocialLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSocialLoading(false);
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
            <h2 className="text-xl font-semibold text-[#0F172A] tracking-tight">
              Welcome back
            </h2>
            <p className="text-sm text-[#64748B] mt-1 mb-4">
              Sign in to your account
            </p>
          </motion.div>
          <form onSubmit={handleSubmit} noValidate>
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeIn}>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  error={errors.email}
                  autoComplete="email"
                  required
                />
              </motion.div>
              <motion.div variants={fadeIn}>
                <PasswordInput
                  label="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  error={errors.password}
                  autoComplete="current-password"
                  required
                />
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="flex items-center justify-between mb-4"
              >
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember((p) => !p)}
                    className="w-3.5 h-3.5 rounded border-[#CBD5E1] text-[#1E293B] accent-[#1E293B]"
                  />
                  <span className="text-xs text-[#64748B] font-medium">
                    Remember me
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#0F172A] hover:text-[#334155] underline underline-offset-2 transition-colors"
                >
                  Forgot password?
                </Link>
              </motion.div>
              <motion.div variants={fadeIn}>
                <PrimaryButton type="submit" loading={loading}>
                  Sign in
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
            <FormFooter mode="login" />
          </motion.div>
          <TrustElements />
        </motion.div>
      </AuthCard>
    </AuthLayout>
  );
}

export default LoginPage;
