import React, { useEffect, useState } from "react";

import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date));

  const indexRadio = (radioIdx) => {
    setIndex(radioIdx);
  }
  
  const nextCard = () => {
    setIndex((previousIndex) => (previousIndex < byDateDesc.length - 1 ? previousIndex + 1 : 0));
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);
    return (
      <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {
      const eventId = event.id || idx; // Utiliser idx comme fallback si event.id est undefined
    return (
      <div key={`container_${eventId}`}>
      <div key={`slide_${eventId}`} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
        <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
        {byDateDesc.map((focus, radioIdx) => {
        const focusId = focus.id || radioIdx; // Utiliser radioIdx comme fallback si focus.id est undefined
          return (
            <input key={`page_${focusId}`} type="radio" name={`radio-button-${radioIdx}`} checked={index === radioIdx}
            onChange={() => indexRadio(radioIdx)} 
            />
          );
        })}
        </div>
      </div>
    </div>
    );
    })}
    </div>
    );
    };

    export default Slider;


