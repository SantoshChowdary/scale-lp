import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { v4 as uuid } from 'uuid';
import CompletionCircle from '../../completionCircle';
import { useStore } from '../../../hooks/useStore';
import './index.css'


const HorizontalCalendar = observer(() => {
  const {rootStore : {scheduleStore}} = useStore();
  scheduleStore.generateDates();
  const dates = scheduleStore?.getDatesArray;
  // const selectedDate = scheduleStore.getSelectedDate;
  const [transform, setTransform] = useState(0);
  const [activeDateIndex, setActiveDateIndex] = useState<number | undefined>();

  const handleLeftArrowClick = (): void => {
    setTransform((prevTransform) => prevTransform + 200)
  };

  const handleRightArrowClick = (): void => {
    setTransform((prevTransform) => prevTransform - 200)
  };

  const handleDayClick = (date : any, index: number) => {
    setActiveDateIndex(index)
    const dRef = document.getElementById(index.toString())
    dRef?.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    });
    scheduleStore.setSelectedDate(date);
  };


  // useEffect(()=>{
  //   handleDayClick(selectedDate, dates.findIndex((item : Date) => scheduleStore.checkTwoDates(item, selectedDate) ));
  // }, [selectedDate])

  

  return (
    <div className="horizontal-calendar">
      <div className="arrow left-arrow" onClick={handleLeftArrowClick}>< AiFillCaretLeft /></div>
      <div className='calendar-menu-wrapper'>
        <div className="calendar-container" style={{transform : `translate3d(${transform}px, 0px, 0px )`}}>
          {dates.map((date :any, index:number) => (
            <button
              key={uuid()}
              id={index.toString()}
              className="day"
              onClick={() => handleDayClick(date, index)}
              disabled={date.getDay() === 0}
            > 
              <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>

              <div className={`date ${activeDateIndex===index ? 'selected' : ''}`}>
                
                  <p>{date.getDate()}</p>
                  {
                    (date.getDay()>0) &&
                      <div className="schedule-completion-circle">
                        <CompletionCircle availability_status={ "" ? "LOCKED" : ""} completion_percentage={100} />
                      </div>
                  }
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="arrow right-arrow" onClick={handleRightArrowClick}><AiFillCaretRight /></div>
    </div>
  );
});

export default HorizontalCalendar;