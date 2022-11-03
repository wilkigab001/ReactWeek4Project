import { useState, useEffect, useCallback, createContext } from 'react'

let logoutTimer

const AuthContext = createContext({
  token: '',
  login: () => {},
  logout: () => {},
  userId: null
})

const calculateRemainingTime = (exp) => {
  const currentTime = new Date().getTime()
  const expTime = exp 
  const remainingTime = expTime - currentTime
  return remainingTime
}

const getLocalData = () => {
  const storedToken = localStorage.getItem('token')
  const storedExp = localStorage.getItem('exp')

  const remainingTime = calculateRemainingTime(storedExp)

  if (remainingTime <= 1000 * 60 * 30) {
    localStorage.removeItem('token')
    localStorage.removeItem('exp')
    return null
  }


  return {
    token: storedToken,
    duration: remainingTime,
  }
}



export const AuthContextProvider = (props) => {
  const localData = getLocalData()
  
  let initialToken
  if (localData) {
    initialToken = localData.token
  }

  const [token, setToken] = useState(initialToken)
  const [userId, setUserId] = useState(null)
  //As the application boots up it checks the local storage to see if someone is logged in and then it saves that to state
  
  useEffect(() => {
    let storedId = localStorage.getItem('userId')
    if(storedId) {
        setUserId(storedId)
    }
  }, [])

  const logout = (token, userId, logoutTimer) => {
    //Because these variables are just strings and not arrays setting them as null makes sure that they are now null and can't be called. Essentially logging out the user
    setToken(null)
    setUserId(null)

    //By removing the item from the local storage it makes sure that we don't get messed up when we logout and login again. because then we would be checking against a different variable in the local storage.
    localStorage.removeItem('userId')
    localStorage.removeItem('token')
    localStorage.removeItem('exp')

    if(logoutTimer !== null){
      clearTimeout(logoutTimer)
    }
  }

  const login = (token, expTime, userId) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem('userId', userId)
    localStorage.setItem('token', token)
    localStorage.setItem('exp', expTime)

    const remainingTime =calculateRemainingTime(expTime)

    logoutTimer = setTimeout(logout, remainingTime)

  }

  const contextValue = {
    token,
    login,
    logout, 
    userId
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
