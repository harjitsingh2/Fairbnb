import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./SignupForm.css";

function SignupForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.signup({ email, first_name: firstName, last_name: lastName, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if, e.g., server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="signupForm">
      <h1>Sign Up</h1>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <br></br>
        <label>
          Email
          <input
            type="text"
            className="user-input-field"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br></br><br></br>
        <label>
          First Name
          <input
            type="text"
            className="user-input-field"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br></br><br></br>
        <label>
          Last Name
          <input
            type="text"
            className="user-input-field"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br></br><br></br>
        <label>
          Password
          <input
            type="password"
            className="user-input-field"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br><br></br>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default SignupForm;