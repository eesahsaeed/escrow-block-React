
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
  placeholder,
  value = "",
  label = "",
  children
}){
  const [visible, setVisible] = useState(false)

  if (type === "date"){
    return (
      <>
        <label htmlFor={name}>{label}</label> 
        <div className="sign_up_form_input">
          <DatePicker 
            onChange={(v) => {
              onChange({target: {
                value: v,
                name: name
              }})
            }} 
            value={value} 
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

  if (name === "phoneNumber"){
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <div className="sign_up_form_input">
          <PhoneInput 
            inputProps={{
              name: name
            }}
            country={"af"}
            className="start__up__container__form__input__box__field"
            onChange={(v, c, e) => onChange(e)}
            countryCodeEditable={false}/>
        </div>
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
        />
        <div className="visible_password" onClick={() => {
          setVisible(!visible)
        }}>
          {visible ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20}/>}
        </div>
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
      />
    </>
  )
}
