import React, { useState } from 'react';
import {useHistory, Redirect, Link} from 'react-router-dom'
import Loader from '../../../components/loader/loader';
import { PhoneNumberValidator } from '../../../utilities/phoneNumberValidator';
import OfflineWarning from '../../../components/offlineWarning';
import { useStore } from '../../../hooks/useStore';
import { loginEnums } from '../../../services/loginEnums';
import './index.css';


const SignIn = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("9000000000");
  const [password, setPassword] = useState<string>("testing");
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const history = useHistory();
  const { rootStore : {authStore} } = useStore();
  const isUserAuthenticated = authStore.userDetails?.isAuthenticated;
  const isOnLine: boolean = navigator.onLine;


  const handlePassword = async (e : React.ChangeEvent<HTMLFormElement>) => {
        setLoadingStatus(true)
        e.preventDefault()

        const fetchResponse = await authStore.checkUserCredentials(phoneNumber, password);
        if (fetchResponse === loginEnums.invalidUser){
            // alert("Invalid User")
            history.replace("/signup")
            setLoadingStatus(false)
            return
        } else if (fetchResponse === loginEnums.invalidPassword){
            alert("Invalid Password")
            setLoadingStatus(false)
            return
        } else if (fetchResponse === loginEnums.loginSuccessFull){
            history.replace("/");
            localStorage.setItem("activeTabId", "");
        }

  };

  if (isUserAuthenticated){
    return <Redirect to="/" />
  } else if(!isOnLine) {
    return <OfflineWarning />
  } else {
    return (
        <div className="sign-in-section">
            <div className="sign-in-section-1">
                <div>
                    <img src="https://nxtwave.imgix.net//logos/Nxtwave_90_48.png" alt="nxtwave-logo" className="nxtwave-logo" />
                </div>
                <div className="sign-in-section-2">
                    <form className="sign-in-form-section" onSubmit={handlePassword}>
                        <p className="login-heading">Login / Sign Up</p>
                        <div className='input-div'>
                            <label htmlFor="phoneNumber">Please enter a valid mobile number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                autoComplete='off'
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />

                            <label htmlFor="UserPassword">Your password</label>
                            <input
                                type="password"
                                id="UserPassword"
                                name="password"
                                autoComplete='off'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="get-otp-button"
                                disabled={ (PhoneNumberValidator(phoneNumber)) && (password.length>0) ? undefined : true }
                            >
                                {isLoading ? <Loader /> : "Continue"}
                            </button>
                        </div>
                        <span><Link to="signup">First time! SignUp</Link></span>
                    </form>
                </div>
            </div>
        </div>
    );
 }
}

export default SignIn;
