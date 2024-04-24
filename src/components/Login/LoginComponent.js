import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./LoginComponent.css"

function LoginComponent() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/")
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault();
    let result = await fetch("http://localhost:5000/login", {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(result)

    console.log(result)
    if (result && result.ok) {
      result = await result.json();
      localStorage.setItem('user', JSON.stringify(result));
      // localStorage.setItem('token', JSON.stringify(result.auth));
      navigate("/")
    } else {
      alert("Please enter connect details")
    }
  }
  const toggleContainer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="d-flex justify-content-center login-container">
      <div className={`lgcontainer ${isActive ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form>
            <h1 className="text-center">Sign In</h1>
            <span>Use your email for registration</span>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit" onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form method="post">
            <h1>Sign Up</h1>
            <span>Use your email and password</span>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit" onClick={handleLogin}>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle" onClick={toggleContainer}>
            {/* <div className={isActive ? "toggle-panel toggle-right" : "toggle-panel toggle-left"}>
              <h1>{isActive ? "Hello, Employee!" : "Welcome Admin!"}</h1>
              <p>{isActive ? "Register with your personal details to use all site features" : "Enter your personal details to use all site features"}</p>
              <button id="login" className="border-white">{isActive ? "Employee Login" : "Admin Login"}</button>
            </div> */}
            <div className={isActive ? "toggle-panel toggle-left" : "toggle-panel toggle-right"}>
              <h1>{isActive ? "Welcome Admin!" : "Hello, Employee!"}</h1>
              <p>{isActive ? "Enter your personal details to use all site features" : "Register with your personal details to use all site features"}</p>
              <button id="register" className="border-white" type="submit">{isActive ? "Employee Login" : "Admin Login"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
