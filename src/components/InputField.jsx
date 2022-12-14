
import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import PI from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

const PhoneInput = PI.default ? PI.default : PI;

export default function InputField({
  name,
  type,
  onChange,
  required,
  error,
  errorMessage,
  placeholder,
  value = "",
  label = "",
  defaultValue = "",
  children
}){
  const [visible, setVisible] = useState(false);

  if (type === "date"){
    return (
      <>
        <label htmlFor={name}>{label}</label> 
        <div 
          className="sign_up_form_input"
          style={{borderColor: error ? "red" : ""}}
        >
          <DatePicker 
            onChange={(v) => {
              onChange({target: {
                value: v,
                name: name
              }})
            }} 
            value={value} 
            className="start__up__container__form__input__box__field no-border"
            id={name}
          />
        </div>
        {error && <p style={{color: "red"}}>{errorMessage}</p>}
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
          id={name}
          name={name}
          style={{borderColor: error ? "red" : ""}}
          defaultValue={defaultValue}
        >
          {children}
        </select>
        {error && <p style={{color: "red"}}>{errorMessage}</p>}
      </>
    )
  }

  if (name === "phoneNumber"){
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <div 
          className="sign_up_form_input" 
          style={{borderColor: error ? "red" : ""}}
        >
          <PhoneInput 
            inputProps={{
              name: name
            }}
            value={value}
            country={"af"}
            className="start__up__container__form__input__box__field no-border"
            onChange={(v, c, e) => onChange(e)}
            countryCodeEditable={false}
          />
        </div>
        {error && <p style={{color: "red"}}>{errorMessage}</p>}
      </>
    )
  }

  if (type === "file"){
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input 
          onChange={onChange} 
          className="sign_up_form_input_text"
          placeholder={placeholder}
          id={name}
          type={type}
          name={name}
          style={{borderColor: error ? "red" : ""}}
          accept="image/*, application/pdf"
          defaultValue={defaultValue}
        />
        {error && <p style={{color: "red"}}>{errorMessage}</p>}
      </>
    )
  }

  if (type === "password"){
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <input 
          onChange={onChange} 
          className="sign_up_form_input_text"
          placeholder={placeholder}
          id={name}
          type={visible ? "text" : type}
          name={name}
          style={{borderColor: error ? "red" : ""}}
          defaultValue={defaultValue}
        />
        <div className="visible_password" onClick={() => {
          setVisible(!visible)
        }}>
          {visible ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20}/>}
        </div>
        {error && <p style={{color: "red"}}>{errorMessage}</p>}
      </>
    )
  }

  if (type === "checkbox"){
    return (
      <div>
        <input type="checkbox" id={name} name="checkbox"/>
        <label htmlFor={name} className="check">
          {label}
        </label>
      </div>
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
        type={type}
        name={name}
        style={{borderColor: error ? "red" : ""}}
        defaultValue={defaultValue}
      />
      {error && <p style={{color: "red"}}>{errorMessage}</p>}
    </>
  )
}
