const { createContext } = require("react");

export const AuthContext = createContext({
  user: '',
  setUser: () => {},
})