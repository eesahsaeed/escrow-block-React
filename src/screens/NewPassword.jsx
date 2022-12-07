
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import InputBox from "../components/InputBox";
import loginSvg from "../assets/loginSvg.svg";
import { getUrl } from "../helper/url-helper";

export default function ForgotPassword({ setNoHeaderFooter }) {
  const navigate = useNavigate();
  const {email, token} = useParams();
  const [values, setValues] = useState({
    email,
    token,
    password: "",
    confirmPassword: ""
  })
  const [passwordError, setPasswordErrorMessage] = useState({
    error: false,
    errorMessage: ""
  })
  const [confirmPasswordError, setConfirmPasswordErrorMessage] = useState({
    error: false,
    errorMessage: ""
  })
  
  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  }

  function validate(){
    let valid = true;

    return valid;
  }

  function handleClick(){
    async function handle(){
      try{
        let response = await fetch(`${getUrl()}/users/change-password`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })

        let rs = await response.json();
        if (rs.success){
          navigate(`/login`)
        } else {
          console.log(rs)
        }
      } catch(err){
        console.log(err);
      }
    }

    handle();
  }

  useEffect(() => {
    setNoHeaderFooter(true);
    return () => {
      setNoHeaderFooter(false);
    };
  }, []);

  return (
    <>
      <div action="" className="login__container">
        <div className="login__container__left">
          <div className="login__container__left__heading">
            Enter New Password
          </div>

          <form className="register__section__forms__content__inputs__one">
            <InputBox
              placeholder="Enter New Password"
              required={true}
              type="password"
              onChange={handleChange("password")}
            />
            <InputBox
              placeholder="Confirm New Password"
              required={true}
              type="password"
              onChange={handleChange("confirmPassword")}
            />
          </form>

          <div
            style={{ marginTop: 50 }}
            className="register__section__forms__content__btns"
          >
            <button
              style={{ padding: "1em 4em" }}
              to="/login"
              onClick={handleClick}
              className="button__secondary"
            >
              Confirm New Password
            </button>
          </div>
        </div>
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
