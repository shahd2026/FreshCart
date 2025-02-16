import { createContext,useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props){

    const [LoginToken, setLoginToken] = useState(localStorage.getItem("userToken")? localStorage.getItem("userToken"): null)
    



    return(<>
    <UserContext.Provider value={{LoginToken ,setLoginToken }}>
        {props.children}

    </UserContext.Provider>
    
    </>)

}