
import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import logo from "../assets/logo.png";

export default function Welcome({setNoHeaderFooter}) {
  const {firstName} = useParams(); 

  useEffect(() => {
    setNoHeaderFooter(true);
    return () => {
      setNoHeaderFooter(false);
    };
  }, []);

  return (
    <>
      <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content" style={{justifyContent: "center"}}>
          <img src={logo} alt="Logo" style={{justifyContent: "flex-start", margin: "50px"}}/>
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            Welcome {firstName}
          </div>
          <div
            style={{
              color: "#000000",
              fontSize: 16,
              width: "45%",
              textAlign: "left",
              margin: "20px"
            }}
            className="home__section__carousel__entry__overlay__content__sub__heading"
          >
            <p style={{marginBottom: "10px"}}>Thank you for choosing Escrow Block!</p>
            <p style={{marginBottom: "10px"}}>Welcome on-board. We are confident that you will have great trading experience with us.</p>
            <p style={{marginBottom: "10px"}}>Should you need further assistance, do not hesitate to contact us. We have a dedicated support team available via Live Chat, Emails and Telegram.</p>
            <p style={{marginBottom: "10px"}}>Kind Regards,</p>
            <p style={{marginBottom: "10px"}}>Escrowblock Team</p>
            <div style={{textAlign: "right"}}>
              <Link
                style={{ marginRight: "1em" }}
                to="/login"
                className="button__secondary"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}
