
import React from "react";
import {Link} from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import AboutCards from "../components/AboutCards";
import payments from "../assets/payments.svg";
import international from "../assets/international.png";
import aboutUs1 from "../assets/about_us_1.png";
import aboutUs2 from "../assets/about_us_2.png";
import aboutUs3 from "../assets/about_us_3.png";

export default function AboutUs(){
  return (
    <>
      <div className="register__section">
        <div className="register__section__content">
          <div className="about_us_container">
            WE ARE ESCROWBLOCK
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
            Escrowblock.com is a platform that enables customers to purchase Bitcoins at unbeatable prices
          </div>
        </div>
      </div>
      <div className="forex__management__section__content about_us_forex">
        <div className="forex__management__section__content__left">
          <img src={aboutUs1} style={{width: 450}}/>
        </div>
        <div className="forex__management__section__content__right about_us_para">
          Escrowblock provides a secure trading environment which permits individuals and corporations to purchase cryptocurrency exclusively online. <br/>
          Escrowblock started with a simple mission to empower the forgotten four billion unbanked and underbanked citizens of the world, so they have control of their money in a way they've never had before.
        </div>
      </div>
      <div
        style={{ marginTop: -50 }}
        className="forex__management__section__content"
      >
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            <img
              src={aboutUs2}
              style={{ width: 160 }}
              className=""
            />
            <p className="para_header">
              PEOPLE DRIVEN
            </p>
            <p className="para_sub">
              We think about people not profits because the more people in our community the more profit we make. We’re providing services for people the rest of the world has ignored and forgotten. We’re helping families to thrive, and enabling our users to become their own boss.
            </p>
          </div>
        </div>
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            <img
              src={aboutUs3}
              style={{ width: 160 }}
              className=""
            />
            <p className="para_header">
              24/7 Client Support
            </p>
            <p className="para_sub">
              Escrowblock is there for you every step of the way. We offer 24/7 support via our telegram, online chat through the website, allowing clients to speak with any of our friendly and experienced customer service agents throughout the week.
              <br/>
              Whether you have questions or would just like to provide us with feedback regarding our services, we’re here for you.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: -50 }}
        className="forex__management__section__content"
      >
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            <img
              src={aboutUs2}
              style={{ width: 160 }}
              className=""
            />
            <p className="para_header">
              STAY CONNECTED TO THE COMMUNITY
            </p>
            <p className="para_sub">
              We listen to our community 24/7 at Escrowblock. We’re always talking with our users, asking them for their feedback, and creating something even better.
            </p>
          </div>
        </div>
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            <img
              src={aboutUs3}
              style={{ width: 160 }}
              className=""
            />
            <p className="para_header">
              BANKS PAYMENT SYSTEMS
            </p>
            <p className="para_sub">
              Providing you with an AI-created portfolio, ease of use and setup are ensured. Our payment systems also allow token value growth and automatic pay-outs.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: -50 }}
        className="forex__management__section__content"
      >
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            <img
              src={aboutUs3}
              style={{ width: 160 }}
              className=""
            />
            <p className="para_header">
              DIGITAL CURRENCY EVOLUTION
            </p>
            <p className="para_sub">
              Crypto-currencies are the future. We provide you with cutting-edge tools to jump into the world of Bitcoin investment.
            </p>
          </div>
        </div>
        <div className="forex__management__section__content__right">
          <div className="about_us_container_card">
            
          </div>
        </div>
      </div>
    </>
  );
}
