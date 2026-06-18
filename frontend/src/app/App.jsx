import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./app.routes";
import { useSelector } from "react-redux";
import { useAuth } from "../features/auth/hook/useauth.hook";
import { useEffect } from "react";
function App() {
  const { handlegetme } = useAuth();
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  useEffect(() => {
    handlegetme();
  }, []);
  return <RouterProvider router={Routes} />;
}

export default App;
