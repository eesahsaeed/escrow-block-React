
import React, {useState} from "react";
import DatePicker from 'react-date-picker';
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

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
  const [visible, setVisible] = useState(false);

  if (type === "date"){
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
          <DatePicker 
            onChange={onChange} 
            value={new Date()} 
            className="start__up__container__form__input__box__field"
          />
        </div>
        <p style={{color: "red"}}>{errors[name] && errors[name].message}</p>
      </div>
    );  
  }

  if (type === "password"){
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
        <div className="start__up__container__form__input__box__content" style={{position: "relative"}}>
          <input
            type={visible ? "text" : "password"}
            required={required}
            name={name}
            onChange={onChange}
            placeholder={placeholder ? placeholder : "Enter " + label}
            className="start__up__container__form__input__box__field"
            style={{marginBottom: "1px solid black"}}
          />
          <div className="visible_password-login" onClick={() => {
            setVisible(!visible)
          }}>
            {visible ? <AiOutlineEye size={20}/> : <AiOutlineEyeInvisible size={20}/>}
          </div>
        </div>
      </div>
    );
  }

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
        <input
          type={type ? type : "text"}
          required={required}
          name={name}
          onChange={onChange}
          placeholder={placeholder ? placeholder : "Enter " + label}
          className="start__up__container__form__input__box__field"
          style={{marginBottom: "1px solid black"}}
        />
      </div>
    </div>
  );
}

// import React from "react"

// export default function InputBox({
//   name,
//   placeholder,
//   type,
//   variant,
//   onChange,
//   value
// }) {
//   if (variant === "select") {
//     return (
//       <div className="contact__container__form__input">
//         <input
//           list="ice-cream-flavors"
//           // id="ice-cream-choice"
//           name={name}
//           placeholder={placeholder}
//           className="contact__container__form__input__field"
//           onChange={onChange}
//         />

//         <datalist id="ice-cream-flavors">
//           <option value="Chocolate" />
//           <option value="Coconut" />
//           <option value="Mint" />
//           <option value="Strawberry" />
//           <option value="Vanilla" />
//         </datalist>
//         <label
//           htmlFor={placeholder}
//           className="contact__container__form__input__label heading"
//         >
//           {placeholder}
//         </label>
//       </div>
//     )
//   } else if (variant === "textarea") {
//     return (
//       <div
//         className="contact__container__form__input"
//         style={{ marginRight: "0em" }}
//       >
//         <textarea
//           value={value}
//           type={type}
//           placeholder={placeholder}
//           id={placeholder}
//           name={name}
//           rows={5}
//           className="contact__container__form__input__field"
//         />
//         <label
//           htmlFor={placeholder}
//           className="contact__container__form__input__label heading"
//         >
//           {placeholder}
//         </label>
//       </div>
//     )
//   } else {
//     return (
//       <div className="contact__container__form__input">
//         <input
//           value={value}
//           type={type}
//           placeholder={placeholder}
//           id={placeholder}
//           name={name}
//           className="contact__container__form__input__field"
//           onChange={onChange}
//         />
//         <label
//           htmlFor={placeholder}
//           className="contact__container__form__input__label heading"
//         >
//           {placeholder}
//         </label>
//       </div>
//     )
//   }
// }
