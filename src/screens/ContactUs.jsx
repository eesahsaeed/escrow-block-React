
import React from "react";
import {Link} from "react-router-dom";
import InputField from "../components/InputField";

export default function AboutUs(){
  return (
    <>
      <div className="register__section contact-us-head">
        <div className="register__section__content">
          <div className="about_us_container">
            WE ARE HERE TO HELP
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: 22,
              width: "100%",
              textAlign: "center",
              fontWeight: 400,
              marginTop: -15
            }}
            className="home__section__carousel__entry__overlay__content__sub__heading"
          >
            Client support 24/7, send a form or use Live Chat
          </div>
        </div>
      </div>
      <div className="sign_up_container" style={{marginTop: -350}}>
        <div className="about_section__content__card sign_up_form" style={{boxShadow: "none", maxWidth: 1000}}>
          <div className="signup__container__new__form__heading">
            <div style={{fontSize: "24", fontWeight: 600}}>
              Contact and Support Form
            </div>
            <Form/>
          </div>
        </div>
      </div>
    </>
  );
}

function Form(){
  return (
    <form>
      <div className="input_container" style={{display: "flex"}}>
        <input
          type="text" 
          className="sign_up_form_input_text contact-us-input" 
          style={{marginRight: "10px"}}
          placeholder="First Name *"
        />
        <input
          type="text" 
          className="sign_up_form_input_text contact-us-input" 
          placeholder="Last Name *"
        />
      </div>
      <div className="input_container" style={{display: "flex"}}>
        <input
          type="text" 
          className="sign_up_form_input_text contact-us-input" 
          placeholder="Email *"
        />
      </div>
      <div className="input_container" style={{display: "flex"}}>
        <input
          type="text" 
          className="sign_up_form_input_text contact-us-input" 
          placeholder="Subject *"
        />
      </div>
      <div className="input_container" style={{display: "flex"}}>
        <textarea
          type="text" 
          className="sign_up_form_input_text contact-us-input contact-us-textarea" 
          style={{fontSize: "20", fontWeight: "medium"}}
        >
          Message: How can I help you ?
        </textarea>
      </div>
      <div>
        <button 
          className="button__secondary"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
