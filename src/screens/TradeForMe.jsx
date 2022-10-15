
import React from "react";
import { Link } from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import ServiceCard from "../components/ServiceCard";

export default function TradeForMe() {
  return (
    <>
      <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content">
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            Trade For Me
          </div>
        </div>
      </div>
      <div className="register__section__forms">
        <div className="register__section__forms__content__services">
          <ServiceCard
            title=""
            para="
            Perhaps, you are someone tempted by investing in the currency exchange market, but right now, you are feeling overwhelmed by the complexity of trading and wondering “how to find someone to trade forex on your behalf”?"
          />
          <ServiceCard
            title=" "
            para="Historically, managed forex accounts have been only accessible to large financial institutions and investors with a lot of money behind them. With the advent of the internet and high speed internet connections, they have become accessible to everyone. "
          />
          <ServiceCard
            title=" "
            para="However, we understand that selecting a professional trader to trade for you is not easy as many opportunities are on the market. The lucrative profit potential of the financial markets attracts many people. Still, the majority of them struggle to find the time or the inclination to learn to trade… And they don’t need to as there are advanced traders who could trade on their behalf. 
 "
          />
          <ServiceCard
            title=""
            para="
            Don't go too far, you're at the right place. At EscrowBlock we have extended knowledge and years in trading practice, and we offer bespoke customer service relationship, giving you daily updates on your account progress. 
            
 "
          />
          <ServiceCard
            title=" "
            para="
            Thousands of investors looking to find a managed FX account provider trust us to help them make the right forex investment. 
            
            
 "
          />
          <ServiceCard
            title=""
            para="
            Providing insight-driven transformation to investment banks, wealth and asset managers, exchanges, clearing houses.
            
            
 "
          />
        </div>
      </div>
    </>
  );
}
