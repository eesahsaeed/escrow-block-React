
import React, { useState, useEffect } from "react";
import HomeSectionSwiperEntry from "../components/HomeSectionSwiperEntry";
import OTCPic1 from "../assets/OTCPic1.svg";
import OTCPic2 from "../assets/OTCPic2.svg";
import OTCPic3 from "../assets/OTCPic3.svg";
import supported1stPic from "../assets/supported1stPic.png";
import supported2Pic from "../assets/supported2Pic.png";
import CTOVSESCROWPic from "../assets/CTOVSESCROWPic.gif";
import Marquee from "react-fast-marquee";
import buy__coin__pic from "../assets/buy__coin__pic.png";
import forex1 from "../assets/forex1.png";
import forex2 from "../assets/forex2.png";
import growing__bg from "../assets/growing__bg.jpg";
import openaccount1 from "../assets/open-account1.svg";
import openaccount2 from "../assets/open-account2.svg";
import openaccount3 from "../assets/open-account3.svg";
import axios from "axios";

function OTCTradingCard({ src, title }) {
  return (
    <div className="otc__trading__section__content__card">
      <img
        src={src}
        alt=""
        className="otc__trading__section__content__card__img"
      />
      {title}
    </div>
  );
}

function OTCVSESCROWCard({ title, para }) {
  return (
    <div className="otc__vs__escrow__section__content__card">
      <img
        src={CTOVSESCROWPic}
        alt="CTOVSESCROWPic"
        className="otc__vs__escrow__section__content__card__img"
      />
      <div className="otc__vs__escrow__section__content__card__overlay">
        <div className="otc__vs__escrow__section__content__card__overlay__content">
          <div className="otc__vs__escrow__section__content__card__overlay__heading">
            {title}
          </div>
          <div className="otc__vs__escrow__section__content__card__overlay__para">
            {para}
          </div>
        </div>
      </div>
    </div>
  );
}

function SwipperCard(props) {
  return (
    <div className="swipper__card">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none">
          <circle cx="16" cy="16" r="16" fill="#23292F" />
          <path
            d="M23.07 8h2.89l-6.015 5.957a5.621 5.621 0 01-7.89 0L6.035 8H8.93l4.57 4.523a3.556 3.556 0 004.996 0L23.07 8zM8.895 24.563H6l6.055-5.993a5.621 5.621 0 017.89 0L26 24.562h-2.895L18.5 20a3.556 3.556 0 00-4.996 0l-4.61 4.563z"
            fill="#FFF"
          />
        </g>
      </svg>

      <t style={{ marginRight: "10px" }}>
        <b>{props.symbol}: </b>
      </t>
      {props.price}
    </div>
  );
}

export default function HomeScreen({setNoHeaderFooter}) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    setNoHeaderFooter(false);
    return () => {
      setNoHeaderFooter(true);
    };
  }, []);

  useEffect(() => {
    coin();
  }, []);
  function coin() {
    axios.get("https://api.binance.com/api/v1/ticker/allPrices").then((res) => {
      const responseData = res.data;
      setData(responseData);
    });
  }

  return (
    <>
      <HomeSectionSwiperEntry />
      <Marquee
        delay={0}
        speed={50}
        pauseOnHover
        style={{
          backgroundColor: "#ffbc00",
          color: "#000000",
          padding: ".5em .5em",
          fontSize: 13,
          fontWeight: 500,
        }}
        gradient={false}
      >
        {Data.map((item, i) => (
          <SwipperCard symbol={item.symbol} price={item.price} key={i}/>
        ))}
      </Marquee>
      <div className="otc__trading__section">
        <div className="otc__trading__section__content">
          <div className="otc__trading__section__content__heading">
            What is OTC Trading?
          </div>

          <div className="otc__trading__section__content__para">
            The phrase “crypto OTC” simply refers to the direct exchange of
            crypto assets between buyers and sellers. Trades can be made using
            crypto assets (for example, trading Tether for Bitcoin) or
            fiat-to-crypto exchanges (trading dollars, euros or pounds for
            Bitcoin and vice versa). It’s similar to traditional broker and
            trading markets, where large institutions trade small stocks on a
            daily basis, but the crypto industry’s technology is far more
            advanced.
          </div>
          <div className="otc__trading__section__content__para">
            At Escrow Block we aim to make the process of trading crypto smooth
            and easy for our highly valued customers. Register today to gain
            access to our amazing services.
          </div>
          <button className="button__secondary">Learn More</button>
          <div className="otc__trading__section__content__card__wrapper">
            <OTCTradingCard src={OTCPic1} title="OTC Learning" />
            <OTCTradingCard src={OTCPic2} title="Learning" />
            <OTCTradingCard src={OTCPic3} title="Event Space" />
          </div>
        </div>
      </div>
      <div className="supported__digital__asests">
        <div className="supported__digital__asests__content">
          <div className="otc__trading__section__content__heading">
            Supported Digital Assets
          </div>
          <div className="otc__trading__section__content__para">
            Supported Digital Assets Genesis Block is here to help you buy,
            sell, or learn anything cryptocurrency and blockchain. There are
            staple cryptos like Bitcoin, Ethereum, USDT, USDC, Litecoin, and
            Bitcoin Cash that we can easily help you transact. However, we can
            also help you acquire or sell most other digital assets upon
            request.
          </div>
          <img
            src={supported1stPic}
            alt="supported1stPic"
            className="supported__digital__asests__content__1st__img"
          />
          <img
            src={supported2Pic}
            alt="supported2Pic"
            className="supported__digital__asests__content__2nd__img"
          />
        </div>
      </div>
      <div className="otc__vs__escrow__section">
        <div className="otc__vs__escrow__section__content">
          <OTCVSESCROWCard
            title="How is Bitcoin Calculated?"
            para="Due to being a decentralised currency, economic factors such as inflation rates and the monetary policy do not affect the value of Bitcoin. On the contrary, Bitcoin prices are calculated with factors like the supply and demand for it, the cost of mining Bitcoin, and the exchanges it trades on."
          />
          <OTCVSESCROWCard
            title="OTC vs Escrow?"
            para="In the escrow process, we act as a neutral middleman to settle a trade brought forward by an agent or buyer/seller mandate. In the OTC space, we act as the agent to negotiate  trade between two parties and conduct settlements.  "
          />
          <OTCVSESCROWCard
            title="How do I purchase Bitcoin?"
            para="Bitcoin is purchasable through Escrowblockhk. This platform has been made available for people all around the world, to enable you to obtain Bitcoin seamlessly from wherever you are."
          />
        </div>
      </div>
      <div className="buy__bitcoin__section">
        <div className="buy__bitcoin__section__content">
          <div className="buy__bitcoin__section__content__left">
            <img
              src={buy__coin__pic}
              alt="buy__coin__pic"
              className="buy__bitcoin__section__content__img"
            />
          </div>
          <div className="buy__bitcoin__section__content__right">
            <div className="buy__bitcoin__section__content__heading">
              BUY BITCOIN - SWIFTLY AND SECURELY, WORLDWIDE
            </div>
            <div
              style={{ fontWeight: 600 }}
              className="buy__bitcoin__section__content__para"
            >
              Bitcoin had VALUE
            </div>
            <div className="buy__bitcoin__section__content__para">
              There will only ever be 21 million bitcoins created, which is
              deflationary and the opposite of paper money which is
              inflationary. Bitcoin’s value and security is derived from the
              fact that it is free from the control of any authority,
              borderless, and apolitical so as to not favor a specific system or
              group of people.
            </div>
            <button className="button__secondary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="forex__management__section">
        <div className="forex__management__section__heading">
          Forex Account Management
        </div>
        <div className="forex__management__section__content">
          <div className="forex__management__section__content__left">
            <div className="forex__management__section__content__left__heading">
              How it Works?
            </div>
            <div className="forex__management__section__content__left__para">
              A managed forex account is where a professional trader conducts
              the trading on the clients’ behalf. It allows even non-informed
              individuals to participate within the exchange market.
            </div>
          </div>
          <div className="forex__management__section__content__right">
            <img
              src={forex1}
              alt="forex1"
              className="forex__management__section__content__right__img"
            />
          </div>
        </div>
        <div className="forex__management__section__content">
          <div className="forex__management__section__content__right">
            <img
              src={forex2}
              alt="forex1"
              className="forex__management__section__content__right__img"
            />
          </div>
          <div className="forex__management__section__content__left">
            <div className="forex__management__section__content__left__heading">
              Should you go for Managed Forex Accounts?
            </div>
            <div className="forex__management__section__content__left__para">
              First time investors might find themselves overwhelmed and
              confused at the amount of information needed to make successful
              investments. Even when putting in the hours to research and study
              these do’s and don’ts, nothing beats experience.
            </div>
            <div className="forex__management__section__content__left__para__sub">
              1 - Managed forex accounts are ideal for investors who have the
              capital to invest but lack time and skills to manage and monitor
              said accounts.
            </div>
            <div className="forex__management__section__content__left__para__sub">
              2 - Provides a sense of security to inexperienced investors.
            </div>
            <div className="forex__management__section__content__left__para__sub">
              3 - Ideal for companies who wants to expand into forex without
              active involvement.
            </div>
            <div className="forex__management__section__content__left__para__sub">
              4 - Highly suitable for investors who want to benefit from
              experience and resources of professional funds manager.
            </div>
            <button className="button__secondary">Learn More</button>
          </div>
        </div>
      </div>
      <div className="get__started__now__section">
        <div className="get__started__now__section__content">
          <div className="get__started__now__section__content__heading">
            Get Started in a Few Minutes
          </div>
          <div className="get__started__now__section__content__card">
            <div className="get__started__now__section__content__card__entry">
              <img
                src={openaccount1}
                alt="openaccount1"
                className="get__started__now__section__content__card__img"
              />
              Open an account
            </div>
            <div className="get__started__now__section__content__card__entry">
              <img
                src={openaccount2}
                alt="openaccount1"
                className="get__started__now__section__content__card__img"
              />
              Meet your account manager
            </div>
            <div className="get__started__now__section__content__card__entry">
              <img
                src={openaccount3}
                alt="openaccount1"
                className="get__started__now__section__content__card__img"
              />
              Buy & sell crypto
            </div>
          </div>
        </div>
      </div>
      <div className="growing__up__section">
        <img
          src={growing__bg}
          alt="growing__bg"
          className="growing__up__section__img"
        />
      </div>
    </>
  );
}
