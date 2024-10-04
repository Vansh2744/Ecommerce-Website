import {useState} from 'react'
import { UserContext } from './UserContext'

function UserContextProvider({children}) {

    const [customer, setCustomer] = useState("");
  return (
    <UserContext.Provider value={{customer, setCustomer}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
