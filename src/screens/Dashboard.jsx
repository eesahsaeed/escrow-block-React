
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Transaction from "../components/Transaction";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';

import IdentificationView from "../components/IdentificationView";
import POAView from "../components/POAView";
import BankStatementView from "../components/BankStatementView";

import authHelper from "../helper/auth-helper";
import {getUrl} from "../helper/url-helper";

function GeneralInfoForm({user, index, drop}){
  const [birthday, setBirthday] = useState(user.dateOfBirth);

  if (index !== drop){
    return "";
  }

  return (
    <Card border="light" className="bg-white shadow-sm mb-4 w-100">
      <Card.Body 
        style={{backgroundColor: "rgb(241 197 71 / 37%)", maxWidth: 1000, margin: "20px auto"}}>
        <h5 className="mb-4">General information</h5>
        <Form className="dash-form">
        <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>User Name</Form.Label>
                <Form.Control required type="text" value={user.userName}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Role</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" value={user.role}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required type="text" placeholder="Enter your first name" value={user.firstName}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Also your last name" value={user.lastName}/>
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
                        type="text"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        onChange={() => { }} />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select defaultValue={user.gender === "Male" ? "2" : "1"}>
                  <option value="0">Gender</option>
                  <option value="1">Female</option>
                  <option value="2">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@company.com" value={user.email}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control required type="text" placeholder="+12-345 678 910" value={user.phoneNumber}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Telegram</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" value={user.telegram}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Country</Form.Label>
                <Form.Control required type="text" value={user.country}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Occupation</Form.Label>
                <Form.Control required type="text" value={user.occupation}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Employment Status</Form.Label>
                <Form.Control required type="text" value={user.employmentStatus}/>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Preferred Communication</Form.Label>
                <Form.Control required type="text" value={user.preferredCommunication}/>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" value={user.address}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Purpose Of Escrow Account</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" value={user.purposeOfEscrowAccount}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Source Of Funds</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" value={user.sourceOfFunds}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={12} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Expected Transaction Size Per Trade</Form.Label>
                <Form.Control required type="text" placeholder="Enter your home address" value={user.expectedTransactionSizePerTrade}/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3" style={{width: "40%"}}>
              <h2 className="my-3">Identification</h2>
              <IdentificationView 
                user={user} 
                type={user.identification.contentType}
              />
            </Col>
            <Col sm={4} className="mb-3 ms-6" style={{width: "40%"}}>
              <h2 className="my-3">Proof Of Address</h2>
              <POAView 
                user={user} 
                type={user.proofOfAddress.contentType}
              />
            </Col>
            <Col sm={4} className="mb-3" style={{width: "40%"}}>
              <h2 className="my-3">Bank Statement</h2>
              <BankStatementView 
                user={user}
                type={user.bankStatement.contentType}
              />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

function TransactionEntry() {
  const [transactions, setTransactions] = useState([]);
  const user = authHelper.isAuthenticated();
  const navigate = useNavigate();

  useEffect(() => {
    async function getInfo(){
      if (user){
        if (user.role === "admin"){
          try{
            let response = await fetch(`${getUrl()}/transactions/allTransactions`, {
              method: "GET",
              headers: {
                "Accept": "application/json",
                "Authorization": user.token
              }
            })

            let rs = await response.json();
            setTransactions(rs)
          } catch(err){
            console.log(err);
          }
        } else {
          try{
            let response = await fetch(`${getUrl()}/transactions/userTransactions/`, {
              method: "GET",
              headers: {
                "Accept": "application/json",
                "Authorization": user.token
              }
            })

            let rs = await response.json();
            setTransactions(rs)
            console.log(rs);
          } catch(err){
            console.log(err);
          }
        }
      } else {
        navigate("/login");
      }
    }

    let t = getInfo();
  }, [])

  return (
    <div className="register__section__forms__content__history">
      <div className="register__section__forms__content__history__content">
        <div className="register__section__forms__content__history__heading__row">
          <div className="register__section__forms__content__history__heading__entry">
            Date
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Transaction ID
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Bitcoins
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Amount
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Type
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Status
          </div>
        </div>
      </div>
      {transactions.map((transaction, i) => (
        <Transaction transact={transaction} key={i} user={user}/>
      ))}
    </div>
  );
}

function UserEntry() {
  const user = authHelper.isAuthenticated();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [drop, setDrop] = useState();
  const [dropdown, setDropdown] = useState();

  useEffect(() => {
    async function getInfo(){
      if (user){
        if (user.role === "admin"){
          try{
            let response = await fetch(`${getUrl()}/users/allUsers`, {
              method: "GET",
              headers: {
                "Accept": "application/json",
                "Authorization": user.token
              }
            })

            let users = await response.json();
            console.log(users);
            setUsers(users)
          } catch(err){
            console.log(err);
          }
        }
      } else {
        navigate("/login");
      }
    }

    let t = getInfo();
  }, [])

  return (
    <div className="register__section__forms__content__history">
      <div className="register__section__forms__content__history__content">
        <div className="register__section__forms__content__history__heading__row">
          <div className="register__section__forms__content__history__heading__entry">
            First Name
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Last Name
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Email
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Mobile
          </div>
          <div className="register__section__forms__content__history__heading__entry">
            Role
          </div>
        </div>
      </div>
      {users.map((user, i) => (
        <div key={i}>
          <div  className="register__section__forms__content__history__details__row" key={i} onClick={() => {
            if (drop === i){
              setDrop(-1)
            } else {
              setDrop(i)
            }
          }}>
            <div className="register__section__forms__content__history__details__entry">
              {user.firstName}
            </div>
            <div className="register__section__forms__content__history__details__entry">
              {user.lastName}
            </div>
            <div className="register__section__forms__content__history__details__entry">
              {user.email}
            </div>
            <div className="register__section__forms__content__history__details__entry">
              {user.phoneNumber}
            </div>
            <div className="register__section__forms__content__history__details__entry">
              {user.role}
            </div>
          </div>
          <GeneralInfoForm user={user} index={i} drop={drop}/>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content">
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            {authHelper.isAuthenticated().role === "admin" ? "Admin" : `${authHelper.isAuthenticated().firstName}'s`} Dashboard
          </div>
        </div>
      </div>
      {authHelper.isAuthenticated().role === "admin" ? <div
        style={{
          color: "#000000",
          textAlign: "center",
          fontSize: 26,
          marginTop: 20,
          fontWeight: 600,
        }}
        className="home__section__carousel__entry__overlay__content__heading"
      >
        <Tabs>
          <TabList>
            <Tab>Transactions</Tab>
            <Tab>Users</Tab>
          </TabList>

          <TabPanel>
            <h2>Transactions</h2>
            <TransactionEntry/>
          </TabPanel>
          <TabPanel>
            <h2>Users</h2>
            <UserEntry/>
          </TabPanel>
        </Tabs>
      </div> : <TransactionEntry />}
    </>
  );
}
