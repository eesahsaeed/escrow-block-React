
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import InputBox from "../components/InputBox";
import loginSvg from "../assets/loginSvg.svg";
import {getUrl} from "../helper/url-helper";
import {DotLoader} from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

export default function ForgotPassword({setNoHeaderFooter}) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    token: ""
  })
  const [error, setError] = useState({
    error: false,
    errorMessage: ""
  })

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#f5ca4e");

  const [verify, setVerify] = useState(false);

  const handleChange = name => event => {
    setError({error: false, errorMessage: ""});
    setValues({...values, [name]: event.target.value});
  }

  function validateEmail(){
    let valid = true;

    if (!values.email){
      valid = false;
      setError({error: true, errorMessage: "Please Enter Your Email Address"});
    }

    return valid;
  }

  function validateToken(){
    let valid = true;

    if (!values.token){
      valid = false;
      setError({error: true, errorMessage: "Please Enter Token"});
    }

    return valid;
  }

  function handleClick(){
    let valid = validateEmail();

    async function handle(){
      setLoading(true);

      try{
        let response = await fetch(`${getUrl()}/users/forgot-password`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: values.email})
        })

        let rs = await response.json();
        setLoading(false);

        if (rs.success){
          setVerify(true)
        } else if (rs.error){
          setError(rs.error)
        }
      } catch(err){
        console.log(err);
      }
    }

    if (valid){
      handle();
    }
  }

  function handleToken(){
    let valid = validateToken();

    async function handle(){
      setLoading(true);
      
      try{
        let response = await fetch(`${getUrl()}/users/verify-token`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        })

        let rs = await response.json();
        setLoading(false);

        if (rs.success){
          navigate(`/new-password/${rs.email}/${rs.token}`)
        }
      } catch(err){
        console.log(err);
      }
    }

    if (valid){
      handle();
    }
  }

  useEffect(() => {
    setNoHeaderFooter(false);
    return () => {
      setNoHeaderFooter(true);
    };
  }, []);

  return (
    <>
      <div className="login__container">
        <div className="login__container__left" style={{position: "relative"}}>
          {loading && <div className="loading-container-login">
            <DotLoader
              color={color}
              loading={loading}
              cssOverride={override}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>}
          <div className="login__container__left__heading">
            Reset your Password
          </div>
          {verify && <div className="forgot-password-head">
            <div>An email has been sent to <span className="blue-text">{values.email}</span></div>
            <div>Please enter the 6 digit token</div>  
          </div>}

          <form className="register__section__forms__content__inputs__one">
            {verify ? <InputBox
              placeholder="Enter token"
              required={true}
              type="number"
              onChange={handleChange("token")}
            /> : <InputBox
            placeholder="Enter Your Email"
            required={true}
            type="text"
            onChange={handleChange("email")}/>} 
            <div>
              {error.error && <p style={{color: "red"}}>{error.errorMessage}</p>}  
            </div> 
          </form>

          <div style={{ marginTop: 30 }}
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
            <div 
              style={{ color: "#000000", justifyContent: "left"}} 
              className="new__to__login"
            >
              Did not get Email
              <span onClick={handleClick} style={{color: "blue", cursor: "pointer"}}>Click here Resend</span>
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
