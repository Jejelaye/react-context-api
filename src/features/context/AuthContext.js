import { createContext, useState, } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || "")
  const [isLoading, setIsLoading] = useState(false)
  return (
    <AuthContext.Provider value={{
      user, setUser,
      isLoading, setIsLoading,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext