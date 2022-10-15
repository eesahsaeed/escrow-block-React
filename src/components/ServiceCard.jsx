import React from "react";

export default function ServiceCard({ title, para }) {
  return (
    <div className="faq__section__content__card__trade">
      <div className="faq__section__content__card__content">
        <div className="faq__section__content__card__content__heading__trade">
          {title}
        </div>
        <div className="faq__section__content__card__content__para__trade">
          {para}
        </div>
      </div>
    </div>
  );
}
