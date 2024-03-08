import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const loginHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div>
      <section>
        <form onSubmit={loginHandler}>
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h2>Or</h2>
          <Link to="/Register">Register</Link>
        </form>
      </section>
    </div>
  );
};
export default Login;
