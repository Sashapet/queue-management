import React from 'react'
import Main from './components/Main'
import SignIn from './components/SignIn'
import Reservation from './components/Reservation'
import Dashboard from './components/Dashboard'
import CustomerDashboard from './components/CustomerDashboard'
import Queue from './components/Queue'
import PageNotFound from './components/PageNotFound/PageNotFound'
import '../src/css/style.css'
import {Route, Switch} from "react-router-dom";
import {useAuth} from './context/AuthContext';
function App() {
  const {currentUser} = useAuth();
  let routes;
  if(currentUser){
    routes = (
      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/display/:id' component={CustomerDashboard} />
        <Route path='/reservation' component={Reservation} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }else if(currentUser === null){
    routes = (
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/signin' component={SignIn} />
        <Route path='/display/:id' component={CustomerDashboard} />
        <Route path='/reservation' component={Reservation} />
        <Route component={PageNotFound} />
      </Switch>
    )
  }
  return (
      <div className="App">
        <div className='main-container'>
          <h1>Queue Management System</h1>
            {routes}
        </div>
      </div>   
  );
}

export default App;
