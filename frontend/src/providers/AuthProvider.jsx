import React, { createContext } from "react"
import { useEffect } from "react"
import { useState } from "react"
import { token, links } from "../utils"
 
const defaultContextValues = {
  authContext: { user: null, isLoggedIn: false, isLoading: true },
  login: ()=>{},
  logout: () => {} 
}

export const UserContext = createContext(defaultContextValues)

export function AuthProvider({ children }) {
  const [authContext, setAuthContext] = useState(defaultContextValues.authContext)
   
  const login = (user) => {
    setAuthContext({
      user,
      isLoggedIn: true,
      isLoading: false
    })
  }

  const logout = () => {
    token.clearToken()
    setAuthContext({
      user: '',
      isLoggedIn: false,
      isLoading: false
    })
  }

  useEffect(() => {
    const auth_token = token.getToken()
    if (!auth_token) {
      setAuthContext({user: undefined, isLoggedIn: false, isLoading:false})
      return
    }
    fetch(links.backendLink('get-user-info') , {
      method: 'GET',
      headers: {
        'Authorization': "Token " + auth_token,
      },
    })
      .then(response => response.json())
      .then(data => {
        const user = data.data
        if (!user) {
          setAuthContext({user: undefined, isLoggedIn: false, isLoading:false})
          return
        }
        setAuthContext({user:user, isLoggedIn: true, isLoading: false})
      })
  }, [])
  return (
    <UserContext.Provider value={{authContext, login, logout}}>
      {children}
    </UserContext.Provider>
  )
}
