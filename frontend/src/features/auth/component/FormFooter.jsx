import { Link } from "react-router-dom";

function FormFooter({ mode = "login" }) {
  const isLogin = mode === "login";

  return (
    <p className="mt-4 text-center text-xs text-[#64748B]">
      {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
      <Link
        to={isLogin ? "/register" : "/login"}
        className="font-semibold text-[#0F172A] hover:text-[#334155] underline underline-offset-2 transition-colors"
      >
        {isLogin ? "Sign up" : "Sign in"}
      </Link>
    </p>
  );
}

export default FormFooter;
