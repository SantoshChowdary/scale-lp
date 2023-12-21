import { Suspense } from 'react';
import {observer} from 'mobx-react-lite'
import { useStore } from './hooks/useStore'
import ProtectedRoute from './hocs/protectedRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loader from './components/loader/loader';
import SignIn from './pages/login/signIn';
import SignUp from './pages/login/signUp';
import './App.css';
import MainSchedule from './components/Schedule/Main';

const App = observer(() => {

  const {rootStore: {authStore}} = useStore();
  authStore.checkUsersLocalStorage()

  return (
    <Suspense fallback={<Loader spin_type="LARGE" />}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <ProtectedRoute path="/" component={MainSchedule} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  )

})

export default App;
