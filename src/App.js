import React, {useEffect} from "react";
import {Switch, Route} from 'react-router-dom'; // For switching Route and serving different pages
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import Header from './components/nav/Header';
import RegisterComplete from './pages/auth/RegisterComplete';

import {auth} from './firebase';
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if(user) {
        const idTokenResult = await user.getIdTokenResult()
        console.log('user', user);
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    })

    //Cleanup
    return () => unsubscribe();
  }, [])

  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/Register/complete" component={RegisterComplete}></Route>

      </Switch>
    </>
  )

}

export default App;
