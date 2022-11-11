
import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import logopic from "../assets/logincontainer.png";

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
      <Container>
        <Row>
          <Col xs={12} md={6} className="welcome-col wc-1">
            <div>
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
                  width: "100%",
                  textAlign: "left",
                  margin: "20px"
                }}
                className="home__section__carousel__entry__overlay__content__sub__heading"
              >
                <p style={{marginBottom: "10px"}}>Thank you for choosing Escrow Block!</p>
                <p style={{marginBottom: "10px"}}>Welcome on - board. We are confident that you will have great trading experience with us. Our designated team member would contact you via your preferred Telegram ID</p>
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
          </Col>
          <Col xs={12} md={6} className="welcome-col wc-2">
            <img src={logopic}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}
