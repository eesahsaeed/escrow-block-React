
import React from "react";
import {Link} from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import AboutCards from "../components/AboutCards";
import payments from "../assets/payments.svg";
import international from "../assets/international.png";

export default function AboutUs() {
  return (
    <>
      <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content">
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            About Us
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: 16,
              width: "45%",
              textAlign: "center",
            }}
            className="home__section__carousel__entry__overlay__content__sub__heading"
          >
            Escrow Block is a platform that enables customers to purchase Bitcoins at unbeatable prices
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: 40 }}
        className="forex__management__section__content"
      >
        <div className="forex__management__section__content__left">
          <div className="forex__management__section__content__left__heading">
            BANKS PAYMENT SYSTEMS
          </div>
          <div className="forex__management__section__content__left__para">
            Providing you with an AI-created portfolio, ease of use and setup
            are ensured. Our payment systems also allow token value growth and
            automatic pay-outs.
          </div>
        </div>
        <div className="forex__management__section__content__right">
          <img
            src={payments}
            alt="payments"
            className="forex__management__section__content__right__img"
          />
        </div>
      </div>
      <div
        style={{ marginTop: 40 }}
        className="forex__management__section__content"
      >
        <div className="forex__management__section__content__right">
          <img
            src={international}
            alt="international"
            style={{ width: 300 }}
            className="forex__management__section__content__right__img"
          />
        </div>
        <div className="forex__management__section__content__left">
          <div className="forex__management__section__content__left__heading">
            DIGITAL CURRENCY EVOLUTION
          </div>
          <div className="forex__management__section__content__left__para">
            Crypto-currencies are the future. We provide you with cutting-edge
            tools to jump into the world of Bitcoin investment.
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 40 }} className="register__section__forms">
        <div className="register__section__forms__content__services">
          <AboutCards
            title="ERC-20 UNIVERSAL STANDARD"
            para="Ethereum Request for Comments, also known as ERCs, are application-level standards for Ethereum and can include token standards, name registries, library/package formats, and more. We use ERC-20 which is the standard API used for exchangeable tokens, including transfer and balance tracking functionalities."
          />
          <AboutCards
            title="SMART CONTRACT MANAGEMENT"
            para="Our digital contract is the key to automate processes, transactions, and agreements, helping to minimize costs, increase security and effectively eliminate paperwork."
          />
          <AboutCards
            title="40 ICO FEATURES TO CHOOSE FROM"
            para="With our wide range of ICO features, you can take your investment to the next level."
          />
          <AboutCards
            title="FULLY SCALABLE"
            para="Scalability is the capability of a cryptocurrency to cope with the flood of a large number of transactions at a time. Our optimizations ensure the scalability of Bitcoin."
          />
          <AboutCards
            title="MARKETING SERVICE"
            para="We provide an excellent marketing service, facilitating growth for your investment."
          />
          <AboutCards
            title="ICO RESULT ANALYZE"
            para="We provide expert ICO analysis and feedback, to help you succeed in your crypto-venture."
          />
        </div>
      </div>
    </>
  );
}
