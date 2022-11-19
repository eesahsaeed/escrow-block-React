
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import sellBictvoinSvg from "../assets/sellBictvoinSvg.svg";
import telegram from "../assets/telegram.png";
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
    currency: "USD", 
    paymentAmount: 0,
    bitcoinAmount: 0,
    country: "us",
    symbol: getSymbolFromCurrency("USD"),
    name: "US Dollar",
    walletAddress: "",
    fullFormat: ""
  });
  const [selectCurrency, setSelectCurrency] = useState(false);
  const [errors, setErrors] = useState({
    error: false,
    errorMessage: ""
  });
  const [bitcoinAmountError, setBitcoinAmountError] = useState({
    error: false,
    errorMessage: ""
  });
  const [walletAddressError, setWalletAddressError] = useState({
    error: false,
    errorMessage: ""
  });

  const [loading, setLoading] = useState(false);

  const [color, setColor] = useState("#f5ca4e");

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

  function validate(){
    let valid = true;

    if (!values.bitcoinAmount){
      valid = false;
      setBitcoinAmountError({
        error: true,
        errorMessage: "Please select a bitcoin amount"
      });
    }

    if (!values.walletAddress){
      valid = false;
      setWalletAddressError({
        error: true,
        errorMessage: "Wallet address is required"
      });
    }

    return valid;
  }

  async function handleClick(e){
    e.preventDefault();

    let valid =  validate();

    let elem = document.getElementById("fullFormat");

    if (valid){
      setLoading(true);

      let response = await fetch(`${getUrl()}/transactions/buy-bitcoin`, {
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
        navigate("/dashboard");
      } else {
        setErrors(rs.errors.errors)
        //console.log(rs.errors.errors)
      }
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function clearErrors(name){
    if (name === "bitcoinAmount"){
      setBitcoinAmountError({
        error: false,
        errorMessage: ""
      })
    }

    if (name === "walletAddress"){
      setWalletAddressError({
        error: false,
        errorMessage: ""
      })
    }
  }

  async function handleChange(e){
    e.preventDefault();
    let name = e.target.name;

    clearErrors(name);

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
            Buy Bitcoin
          </div>
          <div
            style={{ width: "100%", marginBottom: ".4em", marginLeft: ".7em" }}
            className="buy__select__input__content"
          >
            Buy
          </div>
          <div
            style={{border: bitcoinAmountError.error ? "1px solid red" : ""}}
            className="buy__select__input"
          >
            <img src={bitcoin} alt="bitcoin" className="buy__select__img" />
            
            <input
              type="number"
              name="bitcoinAmount"
              required={true}
              placeholder="Bitcoin"
              className="buy__text__input"
              onChange={handleChange}
              min={0}
            />
          </div>
          {bitcoinAmountError.error && <Alert variant={"danger"} className="text-center mt-1">
            {bitcoinAmountError.errorMessage}
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
              style={{ position: "relative" }}
              className="start__up__container__form__input__box"
            >
              <div className="start__up__container__form__input__box__label">
                Pay Via Bank Transfer / Cash
              </div>
              
              <div>
                <input
                  className="styled-checkbox"
                  id="styled-checkbox"
                  type="checkbox"
                  name="walletAddress"
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
                  renderText={value => {
                    return (
                      <input
                        type="text"
                        placeholder="Bitcoin"
                        className="start__up__container__form__input__box__field"
                        style={{borderColor: "lightgray", color: "lightgray"}}
                        value={value}
                        id="fullFormat"
                        readOnly
                      />
                    )
                  }}
                />
              </div>
            </div>
          </div>
          <div className="register__section__forms__content__inputs__one">
            <InputBox placeholder="Wallet Address" type="text" name="walletAddress" errors={errors} onChange={(e) => {
              setValues({...values, walletAddress: e.target.value});
            }}/>
            {walletAddressError.error && <Alert variant={"danger"} className="text-center">
            {walletAddressError.errorMessage}
          </Alert>}
          </div>
          <button
            style={{marginTop: "2em", padding: "1em 4em"}}
            className="button__secondary" onClick={handleClick}>
            Submit Offer Request
          </button>
          <div style={{margin: "30px 0"}}>
            <span>
              <a href="https://t.me/escrowblock">Click the Telegram link for faster transaction <img src={telegram} /></a>
            </span>
          </div>
        </div>
        <div className="login__container__right">
          <img
            src={sellBictvoinSvg}
            alt="sellBitcoinSvg"
            className="login__container__right__img"
          />
        </div>
      </div>
      {loading && <div className="bitcoin-loader">
        <DotLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>}
    </>
  );
}
