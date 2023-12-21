import React from 'react'
import {ClimbingBoxLoader} from 'react-spinners'
import './loader.css'

const Loader = (props: any) => {

  if (props.spin_type === "LARGE"){
    return (
      <div className='main-loader'>
        <ClimbingBoxLoader color="black" />
      </div>
    )
  } else {
    return (
      <div className="round-loader">
        <div className="loader"></div>
      </div>
    )
  }

}

export default Loader