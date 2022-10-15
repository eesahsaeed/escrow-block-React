import React from "react";
import { Link } from "react-router-dom";
import main__bg from "../assets/main__bg.jpg";
import Typewriter from "typewriter-effect";

export default function HomeSectionSwiperEntry({ toPath, isRight, noBtn }) {
  return (
    <div className="home__section__carousel__entry">
      <img
        src={main__bg}
        alt="main__bg"
        className="home__section__carousel__entry__img"
      />
      <div className="home__section__carousel__entry__overlay">
        <div
          className={
            isRight
              ? "home__section__carousel__entry__overlay__content home__section__carousel__entry__overlay__content__right"
              : "home__section__carousel__entry__overlay__content"
          }
        >
          <div className="home__section__carousel__entry__overlay__content__sub__heading">
            WELCOME TO
          </div>
          <div className="home__section__carousel__entry__overlay__content__heading">
            <Typewriter
              options={{
                strings: [
                  "ESCROWBLOCK",
                  "OTC Desk",
                  "Forex Account Management",
                ],
                autoStart: true,
                loop: true,
                delay: 150,
              }}
            />
          </div>
          <div className="home__section__carousel__entry__overlay__content__para">
            We make it safe and easy to buy, store and learn about
            cryptocurrencies.
          </div>
          <div className="home__section__carousel__entry__overlay__content__para">
            With our service you can trade assets without having to worry about
            market liquidity or order book discovery.
          </div>
          <div className="home__section__carousel__entry__overlay__content__para home__section__carousel__entry__overlay__content__para2">
            Experience the peace of mind that come with having Escrowblock
            manage your account. While you're working or sleeping, we'll be
            making money for you.
          </div>
          {noBtn ? null : (
            <Link to={toPath ? toPath : "/register"} className="button">
              Register Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
