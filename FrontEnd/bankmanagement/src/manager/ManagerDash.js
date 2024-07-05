import ManagerNav from "./ManagerNav";
import { useUser } from "../context/UserContext";
function ManagerDash(){
    const { username } = useUser();
    return(

        <>
        <ManagerNav />
        <h1>Welcome {username}</h1>
        </>
    )
}

export default ManagerDash