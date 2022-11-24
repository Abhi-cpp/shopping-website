import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_CLIENT } from "../shared/services/api-client";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@material-ui/core/TextField";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [load, setLoad] = useState(false);

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    setLoad(true);
    console.log(email, password, name);
    API_CLIENT.post(process.env.REACT_APP_REGISTER_URL, {
      email: email,
      password: password,
      name: name,
    })
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          //   alert("Signup success.");
          navigate("/");
        } else {
          setLoad(false);
          alert("User already exists.");
        }
      })
      .catch((err) => {
        setLoad(false);
        alert("User already exists.");

        // alert("fill all the fields");
        console.log(err);
      });
  };

  return (
    <>
      <div className="signup">
        <h1 className="center sign">SIGN UP</h1>
        <div className="outcard Signup-style">
          <h4>Please fill this form to create your account!</h4>
          <hr />
          Name:
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your name"
            value={name}
            className="inputs"
            type="string"
          />{" "}
          <br /> <br />
          <label>
            <b>Email:</b>
          </label>
          <br />
          <input
            placeholder="Enter Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            className="inputs"
            required
            type="email"
          />{" "}
          <br /> <br />
          <label>
            <b>Password:</b>
          </label>
          <input
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="inputs"
            type="password"
          />{" "}
          <br /> <br />
          {/* <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    /> */}
          {/* <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <label className="Signup-style">Are You a Seller?</label> */}
          {load ? (
            <CircularProgress className="redirecting" />
          ) : (
            <div>
              <button
                onClick={() => {
                  if (email === "" || password === "" || name === "") {
                    alert("Please don't leave any field empty!!");
                    console.log("************((((((())))))))))))))))))");
                  } else handleSubmit();
                }}
                className="btns"
              >
                {" "}
                SUBMIT{" "}
              </button>
              <Link
                className="link-bt"
                style={{
                  textAlign: "center",
                  display: "block",
                  marginTop: "5px",
                }}
                to={"/"}
              >
                {" "}
                SIGN IN{" "}
              </Link>
            </div>
          )}
          {/* <div>
        <button onClick={handleSubmit} className="btns">
          {" "}
          SUBMIT{" "}
        </button>
        <Link
        className="link-bt"
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/"}
        >
          {" "}
          SIGN IN{" "}
        </Link>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default Signup;
