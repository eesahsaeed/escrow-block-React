
// All countries
// length 252

import React, {useState} from "react";
import PI from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneInput = PI.default ? PI.default : PI;

export default function InputBox({
  label,
  placeholder,
  required,
  description,
  type,
  onChange,
  name,
  value,
  errors
}) {

  return (
    <div className="start__up__container__form__input__box">
      <div className="start__up__container__form__input__box__label">
        {placeholder}{" "}
        <div className="start__up__container__form__input__box__label__required">
          {required ? "*" : null}
        </div>
      </div>
      {description ? (
        <div className="start__up__container__form__input__box__label__explain">
          {description}
        </div>
      ) : null}
      <div className="start__up__container__form__input__box__content">
        <PhoneInput 
          inputProps={{
            name: name
          }}
          country={"af"}
          className="start__up__container__form__input__box__field"
          onChange={(v, c, e) => onChange(e)}
          countryCodeEditable={false}/>
      </div>
      <p style={{color: "red"}}>{errors[name] && errors[name].message}</p>
    </div>
  );
}

