import { register, login } from "../service/auth.service.js";
import { setloading, seterror, setuser } from "../state/auth.slice.js";
import { useDispatch } from "react-redux";
export const useAuth = () => {
  const dispatch = useDispatch();
  async function handleRegister({
    fullname,
    email,
    contact,
    password,
    isSeller = false,
  }) {
    const data = await register({
      fullname,
      email,
      contact,
      password,
      isSeller,
    });
    dispatch(setuser(data.user));
  }
  async function handlelogin({ email, password }) {
    const data = await login({ email, password });
    dispatch(setuser(data.user));
  }
  return { handleRegister, handlelogin };
};
