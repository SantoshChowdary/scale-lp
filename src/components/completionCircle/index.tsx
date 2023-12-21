import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { BsCheckCircleFill  } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import './index.css'

const CompletionCircle = (props : any) => {
    if (props.availability_status === "LOCKED"){
      return (
        <div className="locked-resource">
          <CiLock />
        </div>
      )
    } else if (props.completion_percentage === 100){
      return (
        <div style={{color: "green", width: 30, height: 30}}>
          <BsCheckCircleFill />
        </div>
      )
    } else {
      return (
          <div style={{ width: 30, height: 30 }}>
            <CircularProgressbar value={props.completion_percentage} styles={buildStyles({pathColor: `green`})} />
          </div>
      )
    }
  }

export default CompletionCircle