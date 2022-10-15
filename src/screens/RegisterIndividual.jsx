import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import InputBox from "../components/InputBox";
import PasswordInputBox from "../components/PasswordInputBox";
import SelectBox from "../components/SelectBox";
import SelectDropdown from "../components/SelectDropdown";
import PhoneInput from "../components/PhoneInput";

import {getUrl} from "../helper/url-helper";

export default function RegisterIndividual() {
  const [errors, setErrors] = useState({});
  const [exist, setExist] = useState(null);
  const [wrong, setWrong] = useState("");
  const [values, setValues] = useState({
    userName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    preferredCommunication: "Telegram",
    gender: "Male",
    country: "",
    phoneNumber: "",
    dateOfBirth: "",
    telegram: "",
    employmentStatus: "Employed",
    occupation: "Not Applicable",
    purposeOfEscrowAccount: "",
    sourceOfFunds: "Retained Earnings",
    expectedTransactionSizePerTrade: "",
    password: "",
    confirmPassword: ""
  });
  const [value, onChange] = useState(new Date());

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = null;

    switch (name){
      case "passportIdCopy":
        value = e.target.files[0];
        break;
      case "proofOfAddress":
        value = e.target.files[0];
        break;
      case "bankStatement":
        value = e.target.files[0];
        break;
      case "photo":
        value = e.target.files[0];
        break;
      default:
        value = e.target.value;
        break;
    }
    
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function SignUp(event) {
    event.preventDefault();
    let userData = new FormData();
    values.userName && userData.append("userName", values.userName);
    values.firstName && userData.append("firstName", values.firstName);
    values.lastName && userData.append("lastName", values.lastName);
    values.email && userData.append("email", values.email);
    values.preferredCommunication && userData.append("preferredCommunication", values.preferredCommunication);
    values.gender && userData.append("gender", values.gender);
    values.countryOfOrigin && userData.append("country", values.countryOfOrigin);
    values.phoneNumber && userData.append("phoneNumber", values.phoneNumber);
    values.dateOfBirth && userData.append("dateOfBirth", values.dateOfBirth);
    values.occupation && userData.append("occupation", values.occupation);
    values.employmentStatus && userData.append("employmentStatus", values.employmentStatus);
    values.telegram && userData.append("telegram", values.telegram);
    values.sourceOfFunds && userData.append("sourceOfFunds", values.sourceOfFunds);
    values.purposeOfEscrowAccount && userData.append("purposeOfEscrowAccount", values.purposeOfEscrowAccount);
    values.expectedTransactionSizePerTrade && userData.append("expectedTransactionSizePerTrade", values.expectedTransactionSizePerTrade);
    values.password && userData.append("password", values.password);
    values.confirmPassword && userData.append("confirmPassword", values.confirmPassword);

    const abortController = new AbortController();
    const signal = abortController.signal;

    async function register(user){
      try{
       let response = await fetch(`${getUrl()}/users/register`, {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: user
        })

        return await response.json();
      } catch(err){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    register(userData).then(data => {
      console.log(data);
      if (data.success){
        navigate("/welcome/" + values.firstName);
      } else if (data.errors){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setErrors(data.errors)
      } else if (data.message){
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setExist(data)
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        setWrong(data.error)
      }
    }).catch(err => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    })

    /*const config = {
      headers: { 
        "Accept": "application/json" 
      },
    };

    axios.post(
      "https://escrow-block.herokuapp.com//users/register",
      {body: userData},
      config
    ).then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });*/
  }

  return (
    <>
      <div className="register__section">
        <img src={waveBG} alt="waveBG" className="register__section__img" />
        <div className="register__section__content">
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading__sub"
          >
            Already Registered? <Link to="/login"> Click here to Login</Link>
          </div>
          <div
            style={{ color: "#000000" }}
            className="home__section__carousel__entry__overlay__content__heading"
          >
            Individual Account Registration
          </div>
        </div>
      </div>
      <div className="register__section__forms">
        <div className="register__section__forms__content">
          <div className="register__section__forms__content__para">
            Thank you for your interest in registering for an Escrow Block
            account. You will be required to upload your Passport and Proof of
            Residential Address (bank statement/utility bill no older than 3
            months) at the end of this form. Please have them ready before you
            begin. Once you have submitted your application, we aim to process
            your account as soon as possible. Our compliance officer will notify
            you by email upon successful verification and a dedicated trading
            group will be set up for you. Should you have any questions, please
            contact us at contact@escrowblock.com. Please note the minimum
            deposit or withdrawal size is $10,000
          </div>
          {errors && Object.keys(errors).length !== 0 && <div style={{
            color: "",
            border: "1px solid red",
            width: "85%",
            paddingTop: "10px",
            backgroundColor: "#ff8080",
            borderRadius: "5px"
          }}><h3>Error Occurred {
            exist && (<span>: {exist.message} <Link to="/login">Login</Link></span>)
          }
          {
            wrong && wrong
          }</h3></div>}
        </div>
      </div>
      <form onSubmit={SignUp}
        className="register__section__forms__content__inputs__wrapper"
      >
        <div className="register__section__forms__content__inputs__one">
          <InputBox
            name="userName"
            placeholder="username"
            required={true}
            // value={username}
            type="text"
            errors={errors}
            onChange={onChangeHandler}
          />
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <InputBox
              name="firstName"
              placeholder="First Name"
              required={true}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
          <div className="register__section__forms__content__inputs__one">
            <InputBox
              name="lastName"
              placeholder="Last Name"
              required={true}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__one">
          <InputBox
            name="email"
            placeholder="E-mail Address"
            required={true}
            type="email"
            onChange={onChangeHandler}
            errors={errors}
          />
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <SelectBox
              name="preferredCommunication"
              placeholder="Preferred Communication"
              option1={<option value="Telegram" />}
              value="Telegram"
              required={true}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__one">
          <SelectDropdown
            name="gender"
            placeholder="Gender"
            required={true}
            type="text"
            onChange={onChangeHandler}
            errors={errors}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </SelectDropdown>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <InputBox
              name="countryOfOrigin"
              placeholder="Country of Origin"
              required={true}
              option1={<option value="Middle East/Africa " />}
              option2={<option value="Asia" />}
              option3={<option value="Europe" />}
              option4={<option value="South America" />}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <InputBox
              name="telegram"
              placeholder="Telegram (If Any)"
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <InputBox
              name="dateOfBirth"
              placeholder="Date Of Birth"
              required={true}
              type="date"
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <PhoneInput
              name="phoneNumber"
              placeholder="Phone Number"
              required={true}
              onChange={onChangeHandler}
              errors={errors}
            />
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <SelectDropdown
              name="employmentStatus"
              placeholder="Employment Status"
              required={true}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            >
              <option value="Employed">Employed</option>
              <option value="Self Employed">Self Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </SelectDropdown>
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <SelectDropdown
              name="sourceOfFunds"
              placeholder="Source Of Funds"
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            >
              <option value="Retained Earnings">Retained Earnings</option>
              <option value="Dept Capital">Dept Capital</option>
              <option value="Equity Capital">Equity Capital</option>
            </SelectDropdown>
          </div>
        </div>
        <div className="register__section__forms__content__inputs__two">
          <div className="register__section__forms__content__inputs__one">
            <SelectDropdown
              name="occupation"
              placeholder="Occupation"
              required={true}
              type="text"
              onChange={onChangeHandler}
              errors={errors}
            >
              {getOccupations()}
            </SelectDropdown>
          </div>
        </div>
        <div className="register__section__forms__content__inputs__one">
          <InputBox
            name="purposeOfEscrowAccount"
            placeholder="Please state your Purpose of Opening an Escrowblock account              "
            required={true}
            type="text"
            onChange={onChangeHandler}
            errors={errors}
          />
        </div>
        <div className="register__section__forms__content__inputs__one">
          <InputBox
            name="expectedTransactionSizePerTrade"
            placeholder="Expected Transaction Size Per Trade"
            required={true}
            variant="select"
            type="text"
            onChange={onChangeHandler}
            errors={errors}
          />
        </div>
        <div className="register__section__forms__content__inputs__one">
          <PasswordInputBox
            name="password"
            placeholder="Password"
            required={true}
            type="password"
            onChange={onChangeHandler}
            errors={errors}
          />
        </div>{" "}
        <div className="register__section__forms__content__inputs__one">
          <PasswordInputBox
            name="confirmPassword"
            placeholder="Confirm Password"
            required={true}
            type="password"
            onChange={onChangeHandler}
            errors={errors}
          />
        </div>
        <input
          // onClick={() => {
          //   window.scrollTo
          //     top: 0,
          //     behavior: "smooth"
          //
          //
          type="submit"
          onClick={SignUp}
          style={{
            marginTop: 40,
            width: 250,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
          className="button"
          value="Register"/>
      </form>
    </>
  );
}

function getOccupations(){
  return (
    <>
      <option value="">-- select an occupation --</option>
    <optgroup label="Healthcare Practitioners and Technical Occupations:">
      <option value="Chiropractor">-  Chiropractor</option>
      <option value="Dentist">-  Dentist</option>
      <option value="Dietitian or Nutritionist">-  Dietitian or Nutritionist</option>
      <option value="Optometrist">-  Optometrist</option>
      <option value="Pharmacist">-  Pharmacist</option>
      <option value="Physician">-  Physician</option>
      <option value="Physician Assistant">-  Physician Assistant</option>
      <option value="Podiatrist">-  Podiatrist</option>
      <option value="Registered Nurse">-  Registered Nurse</option>
      <option value="Therapist">-  Therapist</option>
      <option value="Veterinarian">-  Veterinarian</option>
      <option value="Health Technologist or Technician">-  Health Technologist or Technician</option>
      <option value="Other Healthcare Practitioners and Technical Occupation">-  Other Healthcare Practitioners and Technical Occupation</option>
    </optgroup>
    <optgroup label="Healthcare Support Occupations:">
      <option value="Nursing, Psychiatric, or Home Health Aide">-  Nursing, Psychiatric, or Home Health Aide</option>
      <option value="Occupational and Physical Therapist Assistant or Aide">-  Occupational and Physical Therapist Assistant or Aide</option>
      <option value="Other Healthcare Support Occupation">-  Other Healthcare Support Occupation</option>
    </optgroup>
    <optgroup label="Business, Executive, Management, and Financial Occupations:">
      <option value="Chief Executive">-  Chief Executive</option>
      <option value="General and Operations Manager">-  General and Operations Manager</option>
      <option value="Advertising, Marketing, Promotions, Public Relations, and Sales Manager">-  Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
      <option value="Operations Specialties Manager (e.g., IT or HR Manager)">-  Operations Specialties Manager (e.g., IT or HR Manager)</option>
      <option value="Construction Manager">-  Construction Manager</option>
      <option value="Engineering Manager">-  Engineering Manager</option>
      <option value="Accountant, Auditor">-  Accountant, Auditor</option>
      <option value="Business Operations or Financial Specialist">-  Business Operations or Financial Specialist</option>
      <option value="Business Owner">-  Business Owner</option>
      <option value="Other Business, Executive, Management, Financial Occupation">-  Other Business, Executive, Management, Financial Occupation</option>
    </optgroup>
    <optgroup label="Architecture and Engineering Occupations:">
      <option value="Architect, Surveyor, or Cartographer">-  Architect, Surveyor, or Cartographer</option>
      <option value="Engineer">-  Engineer</option>
      <option value="Other Architecture and Engineering Occupation">-  Other Architecture and Engineering Occupation</option>
    </optgroup>
    <optgroup label="Education, Training, and Library Occupations:">
      <option value="Postsecondary Teacher (e.g., College Professor)">-  Postsecondary Teacher (e.g., College Professor)</option>
      <option value="Primary, Secondary, or Special Education School Teacher">-  Primary, Secondary, or Special Education School Teacher</option>
      <option value="Other Teacher or Instructor">-  Other Teacher or Instructor</option>
      <option value="Other Education, Training, and Library Occupation">-  Other Education, Training, and Library Occupation</option>
    </optgroup>
    <optgroup label="Other Professional Occupations:">
      <option value="Arts, Design, Entertainment, Sports, and Media Occupations">-  Arts, Design, Entertainment, Sports, and Media Occupations</option>
      <option value="Computer Specialist, Mathematical Science">-  Computer Specialist, Mathematical Science</option>
      <option value="Counselor, Social Worker, or Other Community and Social Service Specialist">-  Counselor, Social Worker, or Other Community and Social Service Specialist</option>
      <option value="Lawyer, Judge">-  Lawyer, Judge</option>
      <option value="Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)">-  Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
      <option value="Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)">-  Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
      <option value="Religious Worker (e.g., Clergy, Director of Religious Activities or Education)">-  Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
      <option value="Social Scientist and Related Worker">-  Social Scientist and Related Worker</option>
      <option value="Other Professional Occupation">-  Other Professional Occupation</option>
    </optgroup>
    <optgroup label="Office and Administrative Support Occupations:">
      <option value="Supervisor of Administrative Support Workers">-  Supervisor of Administrative Support Workers</option>
      <option value="Financial Clerk">-  Financial Clerk</option>
      <option value="Secretary or Administrative Assistant">-  Secretary or Administrative Assistant</option>
      <option value="Material Recording, Scheduling, and Dispatching Worker">-  Material Recording, Scheduling, and Dispatching Worker</option>
      <option value="Other Office and Administrative Support Occupation">-  Other Office and Administrative Support Occupation</option>
    </optgroup>
    <optgroup label="Services Occupations:">
      <option value="Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)">-  Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
      <option value="Chef or Head Cook">-  Chef or Head Cook</option>
      <option value="Cook or Food Preparation Worker">-  Cook or Food Preparation Worker</option>
      <option value="Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)">-  Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
      <option value="Building and Grounds Cleaning and Maintenance">-  Building and Grounds Cleaning and Maintenance</option>
      <option value="Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)">-  Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
      <option value="Sales Supervisor, Retail Sales">-  Sales Supervisor, Retail Sales</option>
      <option value="Retail Sales Worker">-  Retail Sales Worker</option>
      <option value="Insurance Sales Agent">-  Insurance Sales Agent</option>
      <option value="Sales Representative">-  Sales Representative</option>
      <option value="Real Estate Sales Agent">-  Real Estate Sales Agent</option>
      <option value="Other Services Occupation">-  Other Services Occupation</option>
    </optgroup>
    <optgroup label="Agriculture, Maintenance, Repair, and Skilled Crafts Occupations:">
      <option value="Construction and Extraction (e.g., Construction Laborer, Electrician)">-  Construction and Extraction (e.g., Construction Laborer, Electrician)</option>
      <option value="Farming, Fishing, and Forestry">-  Farming, Fishing, and Forestry</option>
      <option value="Installation, Maintenance, and Repair">-  Installation, Maintenance, and Repair</option>
      <option value="Production Occupations">-  Production Occupations</option>
      <option value="Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation">-  Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation</option>
    </optgroup>
    <optgroup label="Transportation Occupations:">
      <option value="Aircraft Pilot or Flight Engineer">-  Aircraft Pilot or Flight Engineer</option>
      <option value="Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)">-  Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
      <option value="Other Transportation Occupation">-  Other Transportation Occupation</option>
    </optgroup>
    <optgroup label="Other Occupations:">
      <option value="Military">-  Military</option>
      <option value="Homemaker">-  Homemaker</option>
      <option value="Other Occupation">-  Other Occupation</option>
      <option value="Don't Know">-  Don't Know</option>
      <option value="Not Applicable">-  Not Applicable</option>
    </optgroup>
    </>
  )
}
