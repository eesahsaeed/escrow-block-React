
import React, {useState} from "react";
import {BsEye, BsEyeSlash} from "react-icons/bs";

export default function PasswordInputBox({
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
          style={errors[name] ? {borderColor: "red"} : {}}
        />
        {visible ? <BsEye style={{position: "absolute", top: "15px", right: "0px"}} onClick={() => setVisible(!visible)}/> : <BsEyeSlash style={{position: "absolute", top: "15px", right: "0px"}} onClick={() => setVisible(!visible)}/>}
      </div>
      <p style={{color: "red"}}>{errors[name] && errors[name].message}</p>
    </div>
  );
}

// import React from "react"

// export default function PasswordInputBox({
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
