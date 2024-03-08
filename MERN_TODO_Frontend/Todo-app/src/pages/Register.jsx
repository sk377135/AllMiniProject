import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const submitHandler = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/new`,
        { name, email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input
            onChange={e => {
              setName(e.target.value);
            }}
            value={name}
            type="text"
            name="name"
            placeholder="User name"
            required
          />
          <input
            onChange={e => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button disabled={loading} type="submit">
            Register
          </button>
        </form>
        <h2>Or</h2>
        <Link to="/Login">Login</Link>
      </section>
    </div>
  );
};
export default Register;
