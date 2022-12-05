




/*

async function login(request){
  let body = JSON.parse(request.body);

  try{
    const params = {
      TableName: "users-table",
      FilterExpression: "email = :e",
      ExpressionAttributeValues: {
        ":e": body.email
      }
    };

    let tempUsers = await docClient.scan(params).promise()
    let user = tempUsers.Items[0];

    console.log("login user ", user);
    let token = jwt.sign({email: body.email}, "wole-escrow-block");

    console.log("token is ",token);

    let password = await bcrypt.compare(body.password, user.password);
    console.log("password ", password);

    return tempUsers.Items;
  } catch(err){
    console.log(err);
    return err;
  }
}

*/






import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import loginSvg from "../assets/loginSvg.svg";
import telegram from "../assets/telegram.png";
import { getUrl } from "../helper/url-helper";
import {Alert} from "react-bootstrap";

import authHelper from "../helper/auth-helper";

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
      let user = await fetch(`${getUrl()}/users/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })

      return await user.json();
    }

    signIn(values).then(user => {
      console.log(user)
      if (user.error){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setErrors(user)

        if (user.errors.incomplete){
          authHelper.setForm(errors.user);
        }
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
            }}>
              <h3>{errors.error}</h3> {errors.incomplete && <Link className="login-link" to="/register">Click here to finish</Link>}
            </div>}
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
              <a href="https://t.me/escrowblock">Click the Telegram link for faster transaction <img src={telegram} /></a>
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
