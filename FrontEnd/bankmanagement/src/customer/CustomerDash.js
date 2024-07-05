import CustomerNav from "./CustomerNav";
import { useUser } from '../context/UserContext';
import { useEffect } from "react";


function CustomerDash(){
    const { username } = useUser();
   
    
    return(

        <>
        <CustomerNav />
        <h1>Welcome {username}</h1>
       
        
        </>
    )
}

export default CustomerDash