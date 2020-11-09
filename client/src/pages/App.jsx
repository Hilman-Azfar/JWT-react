import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import ChatScreen from './ChatScreen';
import Layout from '../components/Layout/Layout';
import { AuthContext } from '../context/auth';

function App() {
  const [user, setUser] = useState('');

  return (
    <AuthContext.Provider value={user}>
      <div className="App">
        <Layout>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/home' component={ChatScreen} />
            <Route path='*' component={Landing} />
          </Switch>
        </Layout>
      </div>
    </AuthContext.Provider>
  );
}
export default App;
