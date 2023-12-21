import { useState } from "react";
import { useStore } from "../../hooks/useStore";
import { Redirect, Route } from 'react-router-dom';
import OfflineWarning from "../../components/offlineWarning";
import { observer } from "mobx-react-lite";


const ProtectedRoute = observer((props : any) => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const {rootStore: {authStore}} = useStore();

    if (!isOnline){
        setInterval(()=>{
            setIsOnline(navigator.onLine)
        }, 1000)
    }

    if (!isOnline) {
        return <OfflineWarning />
    }

    if (authStore.userDetails?.isAuthenticated && authStore.userDetails.token !== "") {
        return <Route {...props} />
    }  
    return <Redirect to="/login" />
    
});

export default ProtectedRoute