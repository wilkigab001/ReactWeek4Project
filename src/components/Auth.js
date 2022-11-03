import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);

  let authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log("submitHandler called");
    
    const user = {
      username,
      password
    };

    if (register) {
      axios
      //was pointing to https whenever using local host it has to be http
        .post("http://localhost:4000/register", user)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch((err) => {
          setPassword("");
          setUsername("");
        });
    } else if (!register) {
      axios
        .post("http://localhost:4000/login", user)
        .then((res) => {
          console.log(res.data);
          authCtx.login(res.data.token, res.data.exp, res.data.userId);
        })
        .catch((err) => {
          setPassword("");
          setUsername("");
        });
    }
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
