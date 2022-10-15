
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import loginSvg from "../assets/loginSvg.svg";
import telegram from "../assets/telegram.png";
import { getUrl } from "../helper/url-helper";

export default function Login({ setNoHeaderFooter }) {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    setNoHeaderFooter(false);
    return () => {
      setNoHeaderFooter(true);
    };
  }, []);

  const navigate = useNavigate();

  const handleChange = name => event => {
    let value = name === "rememberMe" ? event.target.checked : event.target.value;
    setValues({...values, [name]: value});
  }

  function handleClick(event){
    event.preventDefault();
    
    async function signIn(data){
      let user = await fetch(`${getUrl()}/users/signin`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      return await user.json();
    }

    signIn(values).then(user => {
      if (user.error){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setErrors(user)
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    }).catch(err => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })
  }

  return (
    <>
      <div action="" className="login__container">
        <form action="" className="login__container__left">
          <div className="login__container__left__heading">
            Log In With Escrowblock
          </div>
          <div className="register__section__forms__content">
            {errors && Object.keys(errors).length !== 0 && <div style={{
              color: "",
              border: "1px solid red",
              width: "85%",
              paddingTop: "10px",
              backgroundColor: "#ff8080",
              borderRadius: "5px"
            }}><h3>{errors.error}</h3></div>}
          </div>

          <div className="register__section__forms__content__inputs__one">
            <InputBox
              placeholder="Enter Your Email"
              required={true}
              type="text"
              onChange={handleChange("email")}
              name="email"
              errors={errors}
            />
          </div>
          <div className="register__section__forms__content__inputs__one">
            <InputBox 
              name="password"
              errors={errors} 
              placeholder="Password" 
              required={true} 
              type="password" 
              onChange={handleChange("password")}/>
          </div>
          <div className="login__links__wrapper register__section__forms__content__inputs__one">
            <Link to="/forgot-password" className="login-link">
              Forgot Password ?
            </Link>
          </div>
          <div
            style={{ margin: "20px 0" }}
            className="register__section__forms__content__btns"
          >
            <button
              style={{ padding: "1em 8em" }}
              onClick={handleClick}
              className="button__secondary"
            >
              Login
            </button>
            <div style={{marginTop: 30}}>
              New on Escrowblock?{" "}
              <Link className="login-link" to="/register">Click here to Sign Up</Link>
            </div>
          </div>
          <div>
            <span>
              Click the Telegram link for faster transaction <a href="https://msng.link/telegram.html"><img src={telegram} /></a>
            </span>
          </div>
        </form>
        <div className="login__container__right">
          <img
            src={loginSvg}
            alt="loginSvg"
            className="login__container__right__img"
          />
        </div>
      </div>
    </>
  );
}
