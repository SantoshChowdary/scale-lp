import React from 'react';
import { FadeLoader } from 'react-spinners';

export const OfflineWarning = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent:"center", alignItems: "center", height: "100vh", width: "100vw"}}>
        <i>Please check your internet connection</i>
        <FadeLoader color='black' />
    </div>
  )
}

export default OfflineWarning