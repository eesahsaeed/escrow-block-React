
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import InputBox from "../components/InputBox";
import loginSvg from "../assets/loginSvg.svg";
import { getUrl } from "../helper/url-helper";

export default function ForgotPassword({ setNoHeaderFooter }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    token: ""
  })

  const [verify, setVerify] = useState(false);

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value});
  }

  function handleClick(){
    async function handle(){
      try{
        let response = await fetch(`${getUrl()}/users/forgotPassword`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: values.email})
        })

        let rs = await response.json();
        if (rs.success){
          setVerify(true)
        }
      } catch(err){
        console.log(err);
      }
    }

    handle();
  }

  function handleToken(){
    async function handle(){
      try{
        let response = await fetch(`${getUrl()}/users/verifyToken`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })

        let rs = await response.json();
        if (rs.success){
          navigate(`/new-password/${rs.email}/${rs.token}`)
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
            Reset your Password
          </div>
          {verify && <h3>Please enter the 6 digit token emailed to you</h3>}

          <form className="register__section__forms__content__inputs__one">
            <InputBox
              placeholder="Your Phone or Email"
              required={true}
              type="text"
              onChange={handleChange("email")}/>
            <InputBox
              placeholder="Enter token"
              required={true}
              type="text"
              onChange={handleChange("token")}
            />   
          </form>

          <div style={{ marginTop: 50 }}
            className="register__section__forms__content__btns">
            {verify ? <button
              style={{ padding: "1em 4em" }}
              onClick={handleToken}
              className="button__secondary">
              Verify Token
            </button> : <button
              style={{ padding: "1em 4em" }}
              onClick={handleClick}
              className="button__secondary">
              Send Token
            </button>}
            <div style={{ color: "#000000" }} className="new__to__login">
              Did not get Email
              <span>
                <span onClick={handleClick} style={{color: "blue", cursor: "pointer"}}> Click here Resend</span>
              </span>
            </div>
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
