
import React from "react";

export default function SelectBox({
  label,
  placeholder,
  required,
  description,
  type,
  name,
  onChange,
  errors,
  children
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
        <select
          list={name}
          //   id="ice-cream-choice"
          type={type}
          name={name}
          placeholder={placeholder}
          className="start__up__container__form__input__box__field"
          onChange={onChange}
          style={errors[name] ? {borderColor: "red"} : {}}
        >
          {children}
        </select>
      </div>
      <p style={{color: "red"}}>{errors[name] && errors[name].message}</p>
    </div>
  );
}
