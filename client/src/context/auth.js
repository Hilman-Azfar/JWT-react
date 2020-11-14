const { createContext, useState, useContext } = require("react");

const authContext = createContext();

// const auth = {
//   isAuthenticated: false,
//   login() {
//     auth.isAuthenticated = true;
//   },
//   logout() {
//     auth.isAuthenticated = false;
//   },
// }

// components interact with this
function useProvideAuth() {
  const [user, setUser] = useState({});

  const login = async ({siusername, sipassword}) => {
    try {
      const url = '/auth/login';
      const request = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username: siusername,
          password: sipassword
        })
      }; 
      const res = await fetch(url, request);
      const data = await res.json();
      
      if (res.ok) {
        // get jwt-payload from cookie
        const payload = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt-payload'))
        .split('=')[1]
        .split('.')[1];

        const payloadJSON = JSON.parse(atob(payload));
        setUser(payloadJSON);
      } else {
        throw new Error(data.errorMessage);
      }
    } catch (err) {
      throw err;
    }
  }

  const register = async ({rgusername, rgpassword}) => {
    try {
      const url = '/auth/register';
      const request = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username: rgusername,
          password: rgpassword
        })
      }; 
      const res = await fetch(url, request);
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.errorMessage);
      }

    } catch (err) {
      throw err;
    }
  }

  const isLoggedIn = async () => {
    try {
      const url = '/auth/verify';
      const res = await fetch(url);

      if (res.ok) {
        const payload = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt-payload'))
        .split('=')[1]
        .split('.')[1];

        const payloadJSON = JSON.parse(atob(payload));
        setUser(payloadJSON);
        return true;
      } else {
        return false;
      }

    } catch (err) {
      throw err;
    }
  }

  const logout = async () => {
    try{
      const url = '/auth/logout';
      const res = await fetch(url);

      if (res.ok) {
        setUser(null);
      } else {
        throw new Error('unable to logout???')
      }
    } catch (err) {
      err.message = err.message + ' -- logout'
      throw err;
    }
  }

  return {
    user,
    login,
    register,
    isLoggedIn,
    logout,
  }
}

function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      { children }
    </authContext.Provider>
  )
}

function useAuth() {
  return useContext(authContext);
}

export {
  ProvideAuth,
  useAuth
}