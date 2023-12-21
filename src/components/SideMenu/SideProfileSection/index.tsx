import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BsPersonCheck, BsPauseFill, BsXOctagon, BsFillCaretRightFill } from "react-icons/bs";
import { useStore } from '../../../hooks/useStore';

import "./index.css"


export const ProfileSection = () => {
  const [profileModalStatus, setProfileModalStatus] = useState(false);
  const {rootStore: {authStore}} = useStore();
  const userData = authStore?.userDetails
  const history = useHistory()
  const profileModalDisplayStatus = profileModalStatus ? "block" : "none"

  const displayProfileModal = () => {
    setProfileModalStatus(!profileModalStatus)
  }

  const getLogOutUser = () => {
    authStore.performLogoutUser()
    history.replace("/login")
  }

  return (
    <div className="user-profile-section" onClick={displayProfileModal}>
        <img className="user-profile-icon" alt="profile-img" src="https://media-content.ccbp.in/ccbp_prod/media/profile_pic/edd3cfcb-5b42-42fd-a45d-c4211955291d.jpeg" />
        <p className="user-name">{userData.name}</p>
        <span className="span-arrow"><BsFillCaretRightFill /></span>
        <ul className="profile-modal" style={{display : profileModalDisplayStatus}}>
            <li><Link to="/edit-profile"><BsPersonCheck /> <span className="profile-option">Profile</span></Link></li>
            {/* <li onClick={()=> alert("")}><BsPauseFill /> <span className="profile-option">Pause Learning</span></li> */}
            <li onClick={getLogOutUser}><BsXOctagon /> <span className="profile-option">Log Out</span></li>
        </ul>
    </div>
  )
}

export default ProfileSection
