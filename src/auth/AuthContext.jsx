import { useState } from 'react'
import * as service from './authService'
import { AuthContext } from './useAuth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(service.getSession)

  const value = {
    user,
    signUp: async (data) => setUser(await service.signUp(data)),
    logIn: async (data) => setUser(await service.logIn(data)),
    logOut: () => {
      service.logOut()
      setUser(null)
    },
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
