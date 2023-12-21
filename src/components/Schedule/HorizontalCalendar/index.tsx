import React, { useState, useRef, useEffect } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../hooks/useStore';
import CompletionCircle from '../../completionCircle';
import { observer } from 'mobx-react-lite';
import './index.css'


const generateDates = () => {
    const currentDate: Date = new Date("08-10-2023");
    const dateArray : Date[] = [];
    for (let i = 0; i < 1000; i++) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
};


const HorizontalCalendar = observer(() => {

  const [dates, setDates] = useState<Date[]>(generateDates())
  const [selectedDate, setSelectedDate] = useState<Date>( new Date() )
  const [transform, setTransform] = useState(0) 
  const dateRef: any = useRef(null)

  const {rootStore : {scheduleStore}} = useStore();

  // const generateFutureDate = () => {
  //   if ((dates[dates.length -1].getFullYear() < 2010) || dates[dates.length -1].getFullYear() >= 2030){
       
  //   } else {
  //     const currentDate = new Date(dates[dates.length-2].getDate() + 1);
  //     const dateArray = [];
  //     for (let i = 0; i < 50; i++) {
  //       dateArray.push(new Date(currentDate));
  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }
  //     const newDatesArr = [ ...dates, ...dateArray];
  //     setDates(newDatesArr)
  //     }
    
  // }


  const handleLeftArrowClick = (): void => {
    console.log("left arrow clicked")
    setTransform(transform + 200)
  };

  const handleRightArrowClick = (): void => {
    console.log("right arrow clicked")
    setTransform(transform - 200)
  };

  const handleDayClick = (date : any, index: number) => {
    setSelectedDate(date);
    scheduleStore.setSelectedDate(selectedDate);
    const dRef = document.getElementById(index.toString())
    // console.log(dateRef.current.scrollIntoView())
    dRef?.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    })
  };

  const getDateFormat = (date : Date) => {
      const day = date.getDate()+1;
      const month = date.getMonth();
      const year = date.getFullYear();
      return day + "-" + month + "-" + year
  }

  useEffect(()=>{
    handleDayClick(selectedDate, dates.findIndex(item => getDateFormat(item) === getDateFormat(selectedDate) ));
  }, [selectedDate])
  

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
              ref={dateRef}
              onClick={() => handleDayClick(date, index)}
              disabled={date.getDay() === 0}
            > 
              <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>

              <div className={`date ${getDateFormat(date) === getDateFormat(selectedDate) ? 'selected' : ''}`}>
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