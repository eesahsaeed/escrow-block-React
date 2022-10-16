
import React, {useState} from "react";
import DatePicker from 'react-date-picker';

export default function InputField({
  name,
  type,
  onChange,
  required,
  error,
  placeholder,
  value = "",
  label = "",
  children
}){
  if (type === "date"){
    return (
      <>
        <label htmlFor={name}>{label}</label> 
        <div className="sign_up_form_input">
          <DatePicker 
            onChange={onChange} 
            value={new Date()} 
            className="start__up__container__form__input__box__field"
            id={name}
          />
        </div>
      </>
    )
  }

  if (type === "select"){
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <select 
          onChange={onChange} 
          className="sign_up_form_input_text"
          placeholder={placeholder}
          id={name}>
            {children}
          </select>
      </>
    )
  }

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input 
        onChange={onChange} 
        className="sign_up_form_input_text"
        placeholder={placeholder}
        id={name}
      />
    </>
  )
}
