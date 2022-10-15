import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import registerPic from "../assets/registerPic.png";
import InputBox from "../components/InputBox";

export default function Register({ setNoHeaderFooter }) {
  useEffect(() => {
    setNoHeaderFooter(true);
    return () => {
      setNoHeaderFooter(false);
    };
  }, []);
  return (
    <>
      <div action="" className="login__container">
        <form
          action=""
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          className="login__container__left"
        >
          <div className="register__section__forms__content__heading">
            Escrow Block KYC Forms
          </div>
          <div className="register__section__forms__content__para">
            Escrow Block KYC Forms Below are links for Individuals or
            Corporations who wish to setup an Escrow Block OTC which will enable
            you easily purchase your bitcoin from us. Please select the form
            that best describes your account type.
          </div>
          <div
            style={{ margin: "1.3em 0em" }}
            className="register__section__forms__content__btns"
          >
            <div className="register__section__forms__register__heading">
              Register as
            </div>
            <Link
              style={{ marginRight: "1em" }}
              to="/individual-register"
              className="button__secondary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Individual
            </Link>
            <Link
              to="/individual-register"
              className="button__secondary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Corporate
            </Link>
          </div>

          <div
            style={{ margin: 0 }}
            className="register__section__forms__content__btns"
          >
            <div style={{ color: "#000000" }} className="new__to__login">
              Already on Escrowblock?
              <span>
                <Link to="/login"> Click here to Login</Link>
              </span>
            </div>
          </div>
        </form>
        <div className="login__container__right">
          <img
            src={registerPic}
            alt="registerPic"
            className="login__container__right__img"
          />
        </div>
      </div>
      {/* <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content">
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            Registration
          </div>
        </div>
      </div>
      <div className="register__section__forms">
        <div className="register__section__forms__content">
          <div className="register__section__forms__content__heading">
            Escrow Block KYC Forms
          </div>
          <div className="register__section__forms__content__para">
            Escrow Block KYC Forms Below are links for Individuals or
            Corporations who wish to setup an Escrow Block OTC which will enable
            you easily purchase your bitcoin from us. Please select the form
            that best describes your account type.
          </div>
          <div className="register__section__forms__content__btns">
            <Link
              style={{ marginRight: "1em" }}
              to="/individual-register"
              className="button__secondary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Individual
            </Link>
            <Link
              to="/individual-register"
              className="button__secondary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Corporate
            </Link>
          </div>
        </div>
      </div> */}
    </>
  );
}
