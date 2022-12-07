
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import sellBictvoinSvg from "../assets/sellBictvoinSvg.svg";
import bitcoin from "../assets/bitcoin.svg";
import InputBox from "../components/InputBox";
import SelectBox from "../components/SelectBox";
import CurrencyFormat from 'react-currency-format';
import {Convert} from "easy-currencies";
import getSymbolFromCurrency from "currency-symbol-map";
import InputField from "../components/InputField";
import {Modal, Alert} from "react-bootstrap";
import {DotLoader} from "react-spinners";

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

import "flag-icons/css/flag-icons.min.css";

import authHelper from "../helper/auth-helper";
import {getUrl} from "../helper/url-helper";
import countries from "../countries.json";
import countriesCurrencies from "../countriesCurrencies.json";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

export default function SellBitCoin({setNoHeaderFooter}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [nationals, setNationals] = useState(Object.keys(countriesCurrencies))
  const [values, setValues] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    sortCode: "",
    otherDetails: "",
    currency: "USD", 
    paymentAmount: 0,
    bitcoinAmount: 0,
    country: "us",
    symbol: getSymbolFromCurrency("USD"),
    name: "US Dollar"
  });
  const [selectCurrency, setSelectCurrency] = useState(false);
  const [errors, setErrors] = useState({
    error: false,
    errorMessage: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setNoHeaderFooter(false);
    return () => {
      setNoHeaderFooter(true);
    };
  }, []);

  useEffect(() => {
    if (!authHelper.isAuthenticated()){
      navigate("/login");
    } else {
      async function getCoin(){
        let response = await fetch("https://api.coinlore.net/api/tickers/?start=0&limit=1", {
          method: "GET"
        })

        let rs = await response.json();

        let value = await Convert(rs.data[0].price_usd).from("USD").to(values.currency);
        setValues({
          ...values,
          paymentAmount: value,
          date: new Date()
        })
      }

      getCoin();
    }
  }, [])

  async function handleClick(e){
    e.preventDefault();
    setLoading(true);

    let elem = document.getElementById("fullFormat");

    let response = await fetch(`${getUrl("transaction")}/transactions/sell-bitcoin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": authHelper.isAuthenticated().token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({...values, fullFormat: elem.value})
    })

    let rs = await response.json()
    console.log(rs);
    setLoading(false);
    if (rs.success){
      let user = authHelper.isAuthenticated();
      let mailList = ["isahsaidu418@gmail.com", "eesahsaeed@gmail.com"];

      for (let i = 0; i < mailList.length; i++){
        let response = fetch(`${getUrl("transaction")}/transactions/send-mail`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization": authHelper.isAuthenticated().token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: mailList[i],
            name: `${user.firstName} ${user.lastName}`,
            fullFormat: elem.value
          })
        })
        
        response.then(d => {
          console.log(d);
        })
      }
      
      navigate("/dashboard");
    } else {
      setErrors(rs)
    }
  }

  function changeCurrency(e){
    //setSymbol(getSymbolFromCurrency(e.target.value));
    setValues({...values, currency: e.target.value});
  }

  async function handleChange(e){
    setErrors({
      error: false,
      errorMessage: ""
    })

    if (e.target.value > 0){
      async function getCoin(){
        let response = await fetch("https://api.coinlore.net/api/tickers/?start=0&limit=1", {
          method: "GET"
        })

        let rs = await response.json();

        return await Convert(rs.data[0].price_usd).from("USD").to(values.currency);
      }

      let pr = await getCoin();
      console.log(pr);

      setValues({
        ...values, 
        paymentAmount: pr,
        bitcoinAmount: e.target.value
      })
    } else {
      setValues({
        ...values, 
        bitcoinAmount: 0
      })
    }
  }

  return (
    <>
      <div style={{ marginTop: "4.6em" }} className="login__container__header">
        {selectCurrency ? (
          <div className="bg-div" onClick={() => setSelectCurrency(false)}></div>
        ) : null}
        <div className="login__container__left">
          <div className="register__section__forms__content__heading">
            Sell Bitcoin
          </div>
          <div
            style={{ width: "100%", marginBottom: ".4em", marginLeft: ".7em" }}
            className="buy__select__input__content"
          >
            Sell
          </div>
          <div className="buy__select__input" style={{border: errors.error ? "1px solid red" : ""}}>
              <img src={bitcoin} alt="bitcoin" className="buy__select__img" />
              
              <input
                type="number"
                required={true}
                placeholder="Bitcoin"
                className="buy__text__input"
                onChange={handleChange}
                min={0}
              />
          </div>
          {errors.error && <Alert variant={"danger"} className="text-center mt-1">
            {errors.errorMessage}
          </Alert>}
          <div className="bitcoin__value__card">
            <span>1 BTC = </span> 
            <CurrencyFormat value={values.paymentAmount} displayType={'text'} thousandSeparator={true} prefix={values.symbol} renderText={value => <span style={{color: "blue"}}>{value}</span>} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.721"
              height="15.521"
              viewBox="0 0 25.721 15.521"
            >
              <g
                id="trending-up-outline-svgrepo-com"
                transform="translate(-45.879 -142.5)"
              >
                <path
                  id="Path_21784"
                  data-name="Path 21784"
                  d="M352,144h5.95v5.95"
                  transform="translate(-287.851)"
                  fill="none"
                  stroke="#005dff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
                <path
                  id="Path_21785"
                  data-name="Path 21785"
                  d="M48,171.049l6.447-6.447a1.7,1.7,0,0,1,2.4,0l2.7,2.7a1.7,1.7,0,0,0,2.4,0l7.3-7.3"
                  transform="translate(0 -15.15)"
                  fill="none"
                  stroke="#005dff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                />
              </g>
            </svg>
          </div>
          <div className="register__section__forms__content__inputs__one">
            <div
              style={{position: "relative"}}
              className="start__up__container__form__input__box"
            >
              <div className="start__up__container__form__input__box__label">
                Get Paid Via Bank Transfer / Cash
              </div>
            </div>
          </div>
          <div className="register__section__forms__content__inputs__one">
            <div
              style={{position: "relative"}}
              className="start__up__container__form__input__box"
            >
              <div className="start__up__container__form__input__box__label">
                <button onClick={() => {
                  selectCurrency
                    ? setSelectCurrency(false)
                    : setSelectCurrency(true);
                  }}
                  className="currency-drop-btn"
                >
                  <span className={`ci fi fi-${values.country}`}></span>
                  <span className="cr-text">{values.currency}</span>
                  <span className="lcr-text">{values.name}</span>
                  <span className="cr-drop">
                    {!selectCurrency ? <MdKeyboardArrowDown/> : <MdKeyboardArrowUp/>}
                  </span>
                </button>
              </div>
              <div className="start__up__container__form__input__box__label" style={{position: "relative"}}>
                {selectCurrency ? (
                  <div className="payments-entry-wrapper">
                    {nationals.map((national, i) => {
                      if (countries[countriesCurrencies[national]]){
                        return <button key={i} onClick={async () => {

                          async function getCoin(){
                            let response = await fetch("https://api.coinlore.net/api/tickers/?start=0&limit=1", {
                              method: "GET"
                            })
                    
                            let rs = await response.json();
                    
                            return await Convert(rs.data[0].price_usd).from(countriesCurrencies[national]).to(values.currency);
                          }
                    
                          let pr = await getCoin();
                          console.log(pr);
                    
                          setValues({
                            ...values, 
                            paymentAmount: pr,
                            currency: countriesCurrencies[national],
                            country: national.toLocaleLowerCase(),
                            symbol: countries[countriesCurrencies[national]].symbol_native,
                            name: countries[countriesCurrencies[national]].name
                          })

                          setSelectCurrency(false);
                        }} className="currency-drop">
                          <span className={`ci fi fi-${national.toLowerCase()}`}></span>
                          <span className="cr-text">{countriesCurrencies[national]}</span>
                          <span className="lcr-text">{countries[countriesCurrencies[national]].name}</span>
                        </button>
                      }
                    })}
                  </div>
                ) : null}
              </div>
              <div className="start__up__container__form__input__box__label">
                Total Amount
              </div>
              <div className="start__up__container__form__input__box__content">
                <CurrencyFormat 
                  value={values.paymentAmount * values.bitcoinAmount} 
                  displayType={'text'} 
                  thousandSeparator={true} 
                  prefix={values.symbol} 
                  renderText={value => (
                    <>
                      <input
                        type="text"
                        placeholder="Bitcoin"
                        className="start__up__container__form__input__box__field"
                        style={{borderColor: "lightgray", color: "lightgray"}}
                        value={value}
                        id="fullFormat"
                        readOnly
                      />
                    </>
                  )} 
                />
              </div>
            </div>
          </div>
          <button
            style={{marginTop: "2em", padding: "1em 4em"}}
            className="button__secondary" onClick={() => {
              if (values.bitcoinAmount){
                setModalShow(true)
              } else {
                setErrors({
                  error: true,
                  errorMessage: "Please select a Bitcoin Amount"
                })
              }
            }}>
            Proceed
          </button>
        </div>
        <div className="login__container__right">
          <img
            src={sellBictvoinSvg}
            alt="sellBitcoinSvg"
            className="login__container__right__img"
          />
        </div>
      </div>
      <Form
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleClick={handleClick}
        values={values}
        setValues={setValues}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

function Form(props){
  const [bankNameError, setBankNameError] = useState(false);
  const [bankNameErrorMessage, setBankNameErrorMessage] = useState("");
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState("");
  const [accountNameError, setAccountNameError] = useState(false);
  const [accountNameErrorMessage, setAccountNameErrorMessage] = useState("");
  const [otherDetailsError, setOtherDetailsError] = useState(false);
  const [otherDetailsErrorMessage, setOtherDetailsErrorMessage] = useState("");

  const [color, setColor] = useState("#f5ca4e");

  function onChangeHandler(e){
    let name = e.target.name;

    clearErrors(name);

    props.setValues({
      ...props.values, [name]: e.target.value
    });
  }

  function clearErrors(name){
    switch(name){
      case "bankName": 
        setBankNameError(false);
        setBankNameErrorMessage("");
        break;

      case "accountNumber": 
        setAccountNumberError(false);
        setAccountNumberErrorMessage("");
        break;

      case "accountName":
        setAccountNameError(false);
        setAccountNameErrorMessage("");
        break;

      case "otherDetails":
        setOtherDetailsError(false);
        setOtherDetailsErrorMessage("");
        break;
    }
  }

  function validate(values){
    let valid = true;

    if (!values.bankName){
      valid = false;
      setBankNameError(true);
      setBankNameErrorMessage("Invalid Bank Name");
    }

    if (!values.accountName){
      valid = false;
      setAccountNameError(true);
      setAccountNameErrorMessage("Invalid Account Name");
    }

    if (!values.accountNumber || !Number(values.accountNumber)){
      valid = false;
      setAccountNumberError(true);
      setAccountNumberErrorMessage("Invalid account Number");
    }

    if (!values.otherDetails){
      valid = false;
      setOtherDetailsError(true);
      setOtherDetailsErrorMessage("Others is required");
    }

    return valid;
  }

  function handleSubmit(e){
    e.preventDefault();
    let valid = validate(props.values);

    if (valid){
      props.handleClick(e);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Account Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bitcoin_up_main_content">
          {props.loading && <div className="bitcoin-loader">
            <DotLoader
              color={color}
              loading={props.loading}
              cssOverride={override}
              size={200}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>}
          <div>
            Please enter name as displayed on official documents
          </div>
          <form style={{position: "relative"}} onSubmit={handleSubmit}>
            <div className="input_container">
              <InputField 
                name="bankName" 
                type="text" 
                onChange={onChangeHandler} 
                label="Bank Name" 
                placeholder="Bank Name"
                error={bankNameError}
                errorMessage={bankNameErrorMessage}
              />
            </div>
            <div className="input_container">
              <InputField 
                name="accountNumber" 
                type="text" 
                onChange={onChangeHandler} 
                label="Account Number" 
                placeholder="Account Number"
                error={accountNumberError}
                errorMessage={accountNumberErrorMessage}
              />
            </div>
            <div className="input_container">
              <InputField 
                name="accountName" 
                type="text" 
                onChange={onChangeHandler} 
                label="Account Name" 
                placeholder="Account Name"
                error={accountNameError}
                errorMessage={accountNameErrorMessage}
              />
            </div>
            <div className="input_container">
              <InputField 
                name="sortCode" 
                type="text" 
                onChange={onChangeHandler} 
                label="Sort Code (If Applicable)" 
                placeholder="Sort Code (If Applicable)"
                error={false}
                errorMessage={""}
              />
            </div>
            <div className="input_container">
              <InputField 
                name="otherDetails" 
                type="otherDetails" 
                onChange={onChangeHandler} 
                label="Other Details" 
                placeholder="Other Details"
                error={otherDetailsError}
                errorMessage={otherDetailsErrorMessage}
              />
            </div>
            <div className="input_container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <button 
                className="button gap" 
                onClick={handleSubmit}
              >Submit</button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}
