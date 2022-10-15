import React from "react";

export default function AboutCards({ title, para }) {
  return (
    <div className="about__section__content__card">
      <div className="faq__section__content__card__content">
        <div className="faq__section__content__card__content__heading">
          {title}
        </div>
        <div className="faq__section__content__card__content__para">{para}</div>
      </div>
    </div>
  );
}
