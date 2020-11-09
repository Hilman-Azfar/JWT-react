import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import ChatScreen from './ChatScreen';
import Layout from '../components/Layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/auth';


function App() {
  let history = useHistory();
  let auth = useAuth();

  useEffect(() => {
    
    (async () => {
      const isLoggedIn = await auth.isLoggedIn();
      if (isLoggedIn) {
        history.push('/home');
      }
    })();

  }, [])
  // when app loads 
  // check for cookies
  // if cookies exist
  // verify
  // if valid 
  // redirect to homepage
  // if not do nothing
  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <ProtectedRoute path='/home' component={ChatScreen} />
            <Route path='*' component={Landing} />
          </Switch>
        </Layout>
      </div>
  );
}
export default App;
