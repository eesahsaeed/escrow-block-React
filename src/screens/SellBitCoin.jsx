
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

import {MdKeyboardArrowDown, MdKeyboardArrowUp} from "react-icons/md";

import "flag-icons/css/flag-icons.min.css";

import authHelper from "../helper/auth-helper";
import {getUrl} from "../helper/url-helper";
import countries from "../countries.json";
import countriesCurrencies from "../countriesCurrencies.json";

console.log(countries);

export default function SellBitCoin({setNoHeaderFooter}) {
  const [currencies, setCurrencies] = useState(Object.keys(countries));
  const [nationals, setNationals] = useState(Object.keys(countriesCurrencies))
  const [values, setValues] = useState({
    currency: "USD", 
    paymentAmount: 0,
    bitcoinAmount: 0,
    country: "us",
    symbol: getSymbolFromCurrency("USD"),
    name: "US Dollar"
  });
  const [selectCurrency, setSelectCurrency] = useState(false);
  const [price, setPrice] = useState(0);
  const [tempPrice, setTempPrice] = useState(0);
  const [errors, setErrors] = useState({});
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
          paymentAmount: value
        })
      }

      getCoin();
    }
  }, [])

  async function handleClick(e){
    e.preventDefault();
    let response = await fetch(`${getUrl()}/transactions/sellBitcoin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": authHelper.isAuthenticated().token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })

    let rs = await response.json()
    if (rs.success){
      navigate("/dashboard");
    } else {
      setErrors(rs.errors.errors)
      //console.log(rs.errors.errors)
    }
  }

  function changeCurrency(e){
    //setSymbol(getSymbolFromCurrency(e.target.value));
    setValues({...values, currency: e.target.value});
  }

  async function handleChange(e){
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
          <div className="register__section__forms__content__para">
            Escrow Block KYC Forms Below are links for Individuals or
            Corporations who wish to setup an Escrow Block OTC which will enable
            you easily purchase your bitcoin from us. Please select the form
            that best describes your account type.
          </div>
          <div
            style={{ width: "100%", marginBottom: ".4em", marginLeft: ".7em" }}
            className="buy__select__input__content"
          >
            Sell
          </div>
          <div
            // onClick={() => {
            //   select ? setSelect(false) : setSelect(true);
            // }}
            className="buy__select__input"
          >
            <CurrencyFormat value={values.paymentAmount} displayType={'text'} thousandSeparator={true} prefix={values.symbol} renderText={value => (
              <>
                <img src={bitcoin} alt="bitcoin" className="buy__select__img" />
                
                <input
                  type="number"
                  required={true}
                  placeholder="Bitcoin"
                  className="buy__text__input"
                  onChange={handleChange}
                  min={0}
                />
              </>
            )} />
            
            {/* {select ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-up"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            )}

            {select ? (
              <div className="buy__select__input__entry__wrapper">
                <button className="buy__select__input__entry">Bitcoin</button>
                <button className="buy__select__input__entry">Bitcoin</button>
                <button className="buy__select__input__entry">Bitcoin</button>
              </div>
            ) : null} */}
          </div>
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
              style={{ position: "relative" }}
              className="start__up__container__form__input__box"
            >
              <div className="start__up__container__form__input__box__label">
                Get Paid Via Bank Transfer / Cash
              </div>
              
              <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox"
                  type="checkbox"
                  name="female"
                  checked
                />
                <label
                  style={{ color: "#1c0a15", fontSize: 16 }}
                  htmlFor="styled-checkbox"
                >
                  Wallet Address
                </label>
              </div>
            </div>
          </div>
          <div className="register__section__forms__content__inputs__one">
            <div
              style={{ position: "relative" }}
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
                    {/**<div onClick={() => {
                      setValues({...values, currency: "USD"});
                      setSymbol("$")
                    }} className="currency">
                      <span className="fi fi-gr fis ci ci-drop"></span>
                    </div> */}
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
            className="button__secondary"
            onClick={handleClick}>
            Submit Offer Request
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
    </>
  );
}

function Form(){
  const [bankNameError, setBankNameError] = useState(false);
  const [bankNameErrorMessage, setBankNameErrorMessage] = useState("");
  const [accountNumberError, setAccountNumberError] = useState(false);
  const [accountNumberErrorMessage, setAccountNumberErrorMessage] = useState("");
  const [accountNameError, setAccountNameError] = useState(false);
  const [accountNameErrorMessage, setAccountNameErrorMessage] = useState("");
  const [otherDetailsError, setOtherDetailsError] = useState(false);
  const [otherDetailsErrorMessage, setOtherDetailsErrorMessage] = useState("");

  function onChangeHandler(){

  }

  return (
    <div className="bitcoin_up_main_content">
      <div style={{marginBottom: 10}}>
        Please enter name as displayed on official documents
      </div>
      <form style={{position: "relative"}}>
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
            onClick={() => {}}
          >Submit</button>
        </div>
      </form>
    </div>
  )
}
