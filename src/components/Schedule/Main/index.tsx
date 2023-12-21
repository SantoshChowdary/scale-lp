import React from 'react'
import HorizontalCalendar from '../HorizontalCalendar/index'
import ScheduleContent from '../ScheduleContent'
import { useStore } from '../../../hooks/useStore'
import { observer } from 'mobx-react-lite'
import './index.css'

const MainSchedule = observer(() => {
  const {rootStore: {scheduleStore}} = useStore();
  
  const userSelectedDate: any = scheduleStore.getSelectedDate
  console.log("main ", userSelectedDate)
  // const todayDate = new Date()
  return (
    <div>
        <div className="schedule-first-section">
            <div>
                <h1 className='your-schedule'>Your Schedule</h1>
                <span className='date-element'>{userSelectedDate.toLocaleDateString("en-US", {weekday : "short"})}, {userSelectedDate.toLocaleDateString("en-US", {
                  year: "numeric", month: "short", day: "numeric"
                })}</span>
            </div>
            <div className='main-schedule-content-section'>
              <HorizontalCalendar />
              <ScheduleContent />
            </div>
        </div>
    </div>
  )
});

export default MainSchedule