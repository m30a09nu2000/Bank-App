import StaffNav from "./StaffNav"
import { useUser } from "../context/UserContext";
function StaffDash(){

    const { username } = useUser();
    return(

        <>
       <StaffNav />
        <h1>Welcome {username}</h1>
        </>
    )
}

export default StaffDash